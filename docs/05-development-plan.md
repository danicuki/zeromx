# 05 — Engineering & Development Plan

## 1. Target Monorepo Architecture

ZeroMX is a Rust workspace with one cryptographic core (`zeromx-crypto`) and one storage and sync core (`zeromx-store`). Both compile natively for relays, the Bridge and the phone app, and the crypto and verifier crates also compile to `no_std` RISC-V (PVM) for the Polkadot Hub contract and, later, the JAM service.

```text
zeromx/
├── Cargo.toml                         # Rust workspace root
├── flake.nix                          # Reproducible builds: relay images, client binaries, PVM blobs
├── site/                              # Landing page and interactive prototype (live on Vercel)
├── docs/                              # Architecture, specs, business model, roadmap & issue backlog
├── crates/
│   ├── zeromx-crypto/                 # Hybrid HPKE, sealed file container, Padmé padding, key epochs, signatures
│   ├── zeromx-store/                  # Storage adapters (ZeroMX Storage, S3-compatible), sync engine, state logs,
│   │                                  #   local encrypted copy and SQLite FTS5 index
│   ├── zeromx-relay/                  # Ingress and egress daemon for confidential VMs (no disk, accept-after-write)
│   ├── zeromx-bridge/                 # Local IMAP/SMTP server for Apple Mail, Outlook, Thunderbird
│   ├── zeromx-mcp/                    # Local Model Context Protocol server over the local copy
│   ├── zeromx-attest/                 # AMD SEV-SNP & Intel TDX quote generation + no_std verification
│   ├── zeromx-directory/              # Directory data model, signed-log adapter, Polkadot Hub contract,
│   │                                  #   later the JAM service
│   └── zeromx-rln/                    # Rate-limiting nullifier prover and verifier (permissionless phase)
└── apps/
    ├── mobile/                        # iOS and Android apps over the shared Rust core
    └── product/                       # Polkadot Product (spike in the alpha)
```

There is no browser extension package, and no in-browser database. The local store is native `SQLite` with `FTS5` inside one Rust core that the Bridge, the phone app and `zeromx-mcp` all link.

---

## 2. Technology Choices & Rationale

| Layer | Selected stack | Why this choice |
| :--- | :--- | :--- |
| **Shared cryptography** | Rust (`hpke`, `chacha20poly1305`, `ml-kem`, `mail-parser`, `zeroize`) | One audited codebase in the relay, the Bridge and the apps, with byte-identical sealed files everywhere. |
| **Storage and sync** | Rust core over a four-operation adapter interface (`put`, `get`, `list`, `delete`) | Any dumb object store works. Per-device append-only logs mean no two writers touch the same object, so no locking and no server that understands mail ([02, section 2](02-technical-specification.md)). |
| **Local copy and search** | Native `SQLite` (`FTS5`), encrypted under a hardware-backed key | Full-text search over the whole mailbox on the device, shared by every client. |
| **Bridge** | Rust daemon, IMAP and SMTP on `127.0.0.1` only | The user keeps the desktop mail app they already have. The IMAP surface is fixed by the week-1 compatibility test (`ZMX-000`). |
| **Phone apps** | Native shells (Swift, Kotlin) over the shared Rust core | A notification service extension must decrypt previews in the background, which a web app cannot do. |
| **Relay OS** | NixOS minimal initramfs on **AMD SEV-SNP** / **Intel TDX** | Bit-for-bit reproducible builds, so anyone can compile `zeromx-relay` and compare its SHA-384 measurement with the one in the directory. |
| **SMTP and auth stack** | Rust (`tokio`, `rustls`, `mail-auth` for SPF/DKIM/DMARC/ARC) | A memory-safe parser on port 25. |
| **Directory** | One data model, two adapters: a signed append-only log and a PVM contract on Polkadot Hub. JAM service later | A lying directory is the way to substitute a recipient's key. The Hub contract makes the directory impossible for us to fork. The log adapter keeps the platform replaceable ([08, section 5](08-why-polkadot-jam.md)). |
| **Attestation verifier** | `no_std` Rust, compiled to native for witnesses and to PVM for the contract | The same crate runs in every deployment. Whether it fits a contract call is benchmarked before anything is claimed (`ZMX-033`). |
| **Local AI access** | `zeromx-mcp` on the MCP SDK | Works with Claude Desktop, Cursor, Zed and local models, on the user's machine, with per-tool consent. |

---

## 3. Critical Engineering Guardrails

### 3.1 Client Release Integrity
Whoever ships the Bridge and the apps can read every user's mail with one malicious update. This is the most powerful position in the system ([07, section 3](07-threat-model-and-limits.md)) and gets the strictest process:
1. Reproducible builds from a tagged commit.
2. Releases require signatures from **two independent builders** whose outputs match.
3. Updates are published with a public diff and a delay before auto-update, with a documented path to install a self-built copy.
4. No remote code, and no remote configuration that changes behavior.
5. On phones the app store is also in the release path. That is stated, and Android builds are also distributed outside the store.

### 3.2 Reproducible Relay Builds
An attestation is meaningless if nobody can check which source produced the measured binary:
1. CI and independent community builders compile `crates/zeromx-relay` inside a pinned Nix derivation (`nix build .#sev-snp-image`).
2. The resulting measurement is published with SLSA provenance and added to `allowed_enclave_measurements` in the directory through a public 7-day timelock.

### 3.3 Storage Credential Scoping
The claim "relays can only add" ([02, section 2.3](02-technical-specification.md)) is tested, not assumed. For every storage adapter, CI takes a relay credential and asserts that each of these fails:
1. `get` of any object.
2. `list` of any prefix.
3. `put` over an existing key.
4. `put` outside `in/`.
5. `delete` of any object.

A storage adapter that cannot express this scope is not shipped as a relay target.

### 3.4 Platform Independence, Tested in CI
The directory adapter has two implementations, the signed log and the Polkadot Hub contract. One conformance suite runs against both on every commit. If the suite ever passes on only one, the ability to leave the platform has been lost, and that is treated as a failing build.

### 3.5 No Disk in the Relay
The relay image has no writable filesystem, swap or core dumps. A test under `strace` asserts zero disk writes across a full inbound and outbound run, and the accept-after-write rule ([02, section 2.4](02-technical-specification.md)) is what makes a queue unnecessary.

---

## 4. Verification & QA Matrix

1. **Storage leak audit.** Dump the raw test bucket and assert it contains no plaintext body, sender, subject or `Message-ID` for any message, and that object names and sizes match only what [02, section 1.2](02-technical-specification.md) lists as visible. Shipped to users as a tool.
2. **Sync convergence property tests.** Generate random operation sequences on several simulated devices with arbitrary offline periods and delivery orders (`proptest`), and assert that every device reaches the same merged state. Separate tests for snapshot compaction and for rollback and fork detection.
3. **Mail-app compatibility matrix.** Apple Mail, Outlook and Thunderbird (and Spark, if it passed `ZMX-000`) against the Bridge on every release: read, thread, flag, move, delete, search, draft, send, and a second device's changes appearing.
4. **Deliverability harness.** Automated outbound matrix asserting `SPF=pass`, `DKIM=pass`, `DMARC=pass` and inbox placement at Gmail and Microsoft, for client-signed mail from relay IPs.
5. **Accept-after-write fault injection.** Make storage slow, failing and unreachable during delivery. Assert the relay answers `451`, holds nothing afterwards, never answers `250` without a durable write, and that a real sending server's retry succeeds once storage returns.
6. **Cryptographic and MIME corpus suite.** Property-based tests over 10,000 real-world malformed MIME messages (nested multiparts, inline images, 25 MB attachments, non-UTF8 charsets, calendar files), asserting that what a device opens is byte-identical to what the relay received.
7. **PVM benchmarks.** Instruction counts for one SEV-SNP chain and one TDX quote on PVM, published before any cost or throughput figure is quoted (`ZMX-033`).
