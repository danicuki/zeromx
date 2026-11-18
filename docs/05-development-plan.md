# 05 — Engineering & Development Plan

## 1. Target Monorepo Architecture

ZeroMX is structured as a Rust + TypeScript workspace sharing a single canonical cryptographic core (`zeromx-crypto`) compiled natively for TEE relays, `no_std` RISC-V for Polkadot JAM, and `wasm32-unknown-unknown` for browser/mobile clients.

```text
zeromx/
├── Cargo.toml                         # Rust workspace root
├── pnpm-workspace.yaml                # TypeScript workspace root
├── flake.nix                          # Reproducible builds for TEE enclave images & PVM blobs
├── site/                              # Product vision & interactive UX simulator (live on Vercel)
├── docs/                              # Architecture, specs, tokenomics, roadmap & issue backlog
├── crates/
│   ├── zeromx-crypto/                 # Shared HPKE, RFC 9788 headers, HMAC thread tokens, padding (Wasm + Native)
│   ├── zeromx-jam-service/            # Polkadot JAM service (Refine + Accumulate targeting RISC-V PVM)
│   ├── zeromx-attest/                 # AMD SEV-SNP & Intel TDX quote generation + no_std verification
│   ├── zeromx-rln/                    # ZK Rate-Limiting Nullifier prover (Wasm) & verifier (PVM)
│   ├── zeromx-relay/                  # Stateless Rust SMTP Ingress & Egress daemon for TEE Confidential VMs
│   └── zeromx-mcp/                    # Local Model Context Protocol server binary / native messaging host
└── packages/
    ├── extension/                     # Manifest V3 WebExtension (Gmail & Outlook Web adapters + Shadow Composer)
    ├── search-worker/                 # Encrypted wa-sqlite (FTS5 + OPFS) Web Worker & cloud delta syncer
    ├── directory-client/              # Key directory verifier: transparency proofs now, JAM light client when one exists
    └── mobile-app/                    # Native iOS / Android app with notification-extension decryption
```

---

## 2. Technology Choices & Rationale

| Layer | Selected Stack | Why This Choice |
| :--- | :--- | :--- |
| **Shared Cryptography** | Rust (`hpke`, `chacha20poly1305`, `ml-kem`, `mail-parser`, `zeroize`) -> `wasm-bindgen` | Single audited codebase across server TEE and browser extension; eliminates JS crypto footguns and guarantees byte-identical MIME framing. |
| **Polkadot JAM Service** | Rust `no_std` targeting **PVM (RISC-V)** | Native RISC-V performance allows verifying ASN.1/ECDSA P-384 AMD SEV-SNP certificates and ZK `RLN` proofs inside `Refine` at a fraction of EVM gas cost. |
| **Directory Verification** | Merkle inclusion + consistency proofs with witness co-signatures (Web Worker). JAM light client when available. | A lying directory is the way to substitute a recipient's key. Proofs plus independent witnesses make substitution detectable without a live chain. Smoldot does not speak JAM, and no JAM light client exists yet, so RPC-free verification is a later milestone ([07, section 7](07-threat-model-and-limits.md)). |
| **Confidential Relay OS** | NixOS minimal initramfs on **AMD SEV-SNP** / **Intel TDX** | Bit-for-bit reproducible builds (`flake.nix`) ensure anyone can compile `zeromx-relay` from source and verify its exact SHA-384 measurement on Polkadot JAM. |
| **SMTP & Auth Stack** | Rust (`tokio`, `rustls`, `mail-auth` for SPF/DKIM/DMARC/ARC) | Memory-safe async parser immune to C buffer-overflow exploits on Port 25 (`Exim`/`Sendmail` class vulnerabilities). |
| **Webmail UI Layer** | TypeScript + cross-origin **extension iframes** (Shadow DOM for mount-point styling only) | The same-origin policy keeps host-page scripts out of an extension-origin frame. Shadow DOM is not a security boundary and is never relied on as one. |
| **Local Search Engine** | `wa-sqlite` (`FTS5`) over Browser `OPFS` with AES-256-GCM VFS | Delivers <5ms full-text search across 50,000+ messages purely locally without external daemons. |
| **Sovereign AI Bridge** | `@modelcontextprotocol/sdk` (`zeromx-mcp`) | Out-of-the-box compatibility with Claude Desktop, Cursor, Zed, Windsurf, and custom local agent workflows. |

---

## 3. Critical Engineering Guardrails

### 3.1 Strict Host-Page Isolation in Gmail & Outlook Web
Webmail pages execute megabytes of Google/Microsoft JavaScript. To ensure the host page cannot inspect decrypted emails even if Big Tech scripts observe the DOM:
1. Decrypted message bodies and the Reply Composer MUST render inside **extension-origin `chrome-extension://<id>/frame.html` iframes** (Cross-Origin Isolated from `mail.google.com` and `outlook.office.com`).
2. Because browser Same-Origin Policy (`SOP`) strictly blocks `mail.google.com` scripts from reading inside a `chrome-extension://` iframe, **not even malicious or curious JavaScript served by Google/Microsoft can scrape the decrypted text on screen**.
3. Private keys derived from `WebAuthn PRF` stay exclusively inside the Extension Offscreen/Service Worker memory as non-extractable `CryptoKey` / Wasm-isolated buffers.

### 3.2 Reproducible Enclave Builds & Transparent Supply Chain
An enclave attestation is meaningless if users cannot verify what source code produced the binary hash:
1. GitHub Actions + independent community builders compile `crates/zeromx-relay` inside a pinned Nix derivation (`nix build .#sev-snp-image`).
2. The resulting `MEASUREMENT` digest is published with SLSA Provenance and registered in `allowed_enclave_measurements` on the ZeroMX JAM service via a transparent 7-day timelock.

### 3.3 Extension Release Integrity
The extension publisher can read every user's mail by shipping one malicious update. This is the most powerful position in the system and gets the strictest process:
1. Reproducible extension builds from a tagged commit.
2. Releases require signatures from **two independent builders** whose outputs match.
3. Updates are published with a public diff and a delay before auto-update, with a documented path to install a self-built copy.
4. No remote code, no remote configuration that changes behavior.

### 3.4 Resilient Webmail Adapter Strategy (Anti-DOM-Breakage)
Instead of brittle CSS class scraping (`.a3s.aiL` in Gmail):
- Match structural ARIA landmarks (`role="main"`, `role="listitem"`, RFC armor markers `-----BEGIN ZEROMX`) and run automated **nightly Playwright canary tests** against live Gmail & Outlook accounts to catch frontend rollouts within hours.
- Provide a 1-click fallback **"Open in ZeroMX Local Vault View"** tab inside the extension itself (powered via standard OAuth/IMAP `messages.get` raw fetch) so even if Gmail completely rewrites its HTML overnight, users experience **zero downtime** reading or sending mail.

---

## 4. Verification & QA Matrix

0. **Mailbox Leak Audit:** export the raw test mailbox and assert it contains no plaintext body, real sender, real subject, or real `Message-ID` for any sealed message.
1. **Cryptographic & MIME Corpus Suite:** Property-based tests (`proptest`) over 10,000 real-world malformed MIME emails (nested multiparts, inline CID images, 25 MB attachments, non-UTF8 charsets, calendar `.ics` files).
2. **Zero-Leak Network Audit:** Automated Playwright + MITM proxy test asserting that typing a 500-word reply inside Gmail triggers **zero** `mail.google.com` draft-save requests containing any substring of the plaintext.
3. **Deliverability & Postmaster Harness:** Automated inbound/outbound test matrix validating `SPF=pass`, `DKIM=pass`, `DMARC=pass`, and Gmail/Outlook thread grouping across 10-message back-and-forth replies.
4. **PVM Cycle & Coretime Benchmarks:** Continuous benchmarking of `Refine` RISC-V instruction counts for `AttestOperator` and `VerifyEgressBatch` to keep per-user JAM Coretime cost below `$0.02/month`.
