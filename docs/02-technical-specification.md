# 02 — Detailed Technical Specification

## 1. Cryptographic Envelope & Wire Format (`ZeroMX/1.0`)

ZeroMX wraps inbound and outbound email payloads inside a standard `multipart/encrypted` MIME container (`RFC 3156` compatible structure carrying an `HPKE` `RFC 9180` payload) so every existing email server — Gmail, Exchange Online / Outlook, iCloud, Dovecot, Fastmail — stores, syncs, and threads messages without custom server extensions.

### 1.1 Cipher Suite & Post-Quantum Readiness

- **Default Suite (v1.0):** `HPKE` (`RFC 9180`) Base Mode
  - **KEM:** `DHKEM(X25519, HKDF-SHA256)`
  - **KDF:** `HKDF-SHA256`
  - **AEAD:** `ChaCha20Poly1305`
- **Hybrid Post-Quantum Suite (v1.1 Ready):** `X25519MLKEM768` (`draft-irtf-cfrg-concrete-hybrid-kem`), protecting archived ciphertexts stored on Google/Microsoft disks against *"harvest now, decrypt later"* attacks.
- **Legacy OpenPGP Interop Mode:** Optional `PGP/MIME` (`SEIPDv2` / `RFC 9580`) output for users who also read mail via standard PGP clients (e.g., Thunderbird).

### 1.2 Full Metadata Sealing & Deterministic Thread Continuity

Standard PGP leaves `From:` and `Subject:` exposed in outer headers, allowing Big Tech to build complete social, medical, and financial graphs even without reading message bodies. ZeroMX eliminates outer metadata leakage while **preserving native conversation threading**:

1. **Protected Inner Headers (`RFC 9788` / Memory Hole):**
   Inside the encrypted MIME root, the full original headers (`From`, `To`, `Cc`, `Subject`, `Date`, `Reply-To`, and raw `DKIM-Signature` verification summary) are serialized inside a signed/encrypted `multipart/mixed` header block.
2. **Outer Envelope Rewriting:**
   - **Outer `From:`** `relay-<random_or_hmac_id>@ingress.zeromx.network` (prevents social-graph profiling by the storage provider).
   - **Outer `Subject:`** `🔒 Thread #<thread_token>` where:
     $$\text{thread\_token} = \text{Hex}\big(\text{HMAC-SHA256}(K_{\text{thread}}, \text{CanonicalThreadRoot})[0..3]\big)$$
     Here $K_{\text{thread}}$ is a public-derivable or blind-tagging token registered per mailbox policy, or derived from the root `Message-ID` in `References`/`In-Reply-To`.
   - **Outer `Message-ID` / `In-Reply-To` / `References`:** Preserved (or deterministically pseudonymized via keyed hash) so Gmail and Outlook group all replies into a single conversation thread automatically.

### 1.3 Traffic-Analysis Resistance (Size Padding & Timing Jitter)

To prevent observers correlating an inbound 412,319-byte hospital PDF arriving at an MX relay with a 412,500-byte encrypted email landing in Gmail 180 ms later:
- **Bucket Padding:** Prior to AEAD encryption, payloads are padded to power-of-four buckets (`4 KiB`, `16 KiB`, `64 KiB`, `256 KiB`, `1 MiB`, `4 MiB`, `16 MiB`).
- **Delivery Jitter:** Relays apply a randomized exponential delay ($50\text{ ms} \le \Delta t \le 1500\text{ ms}$, configurable per domain) before forwarding to the vault inbox.

---

## 2. Polkadot JAM Service Design (`zeromx-jam-service`)

Polkadot JAM's **Refine -> Accumulate** execution model over the deterministic **RISC-V Polkadot Virtual Machine (PVM)** provides two capabilities unavailable on conventional EVM smart-contract chains:
1. **High-throughput, low-cost stateless cryptographic verification in `Refine`** (verifying x509/ASN.1 AMD SEV-SNP & Intel TDX silicon quotes, RSA-2048/4096 `ZK-Email` DKIM proofs, and Groth16/Plonky2 `RLN` proofs directly in compiled `no_std` Rust RISC-V).
2. **Browser-native trustless state verification via `Smoldot`** (eliminating centralized RPC providers like Infura/Alchemy).

### 2.1 Service State (`Accumulate`)

```rust
pub struct ZeroMxServiceState {
    /// Merkle Mountain Range / Append-only Key Transparency log mapping
    /// blake2b_256(normalized_domain_or_address) -> KeyRecord
    pub key_directory_root: Hash256,

    /// Active attested Ingress & Egress relay operators, staked balances,
    /// enclave measurement hashes, and IP/ASN diversity metadata
    pub operator_registry: Map<OperatorId, OperatorRecord>,

    /// Approved reproducible binary measurements (SHA-384 / MRTD / Measurement)
    /// governed via protocol upgrade timelock
    pub allowed_enclave_measurements: BTreeSet<[u8; 48]>,

    /// Current & recent Merkle roots of Rate-Limiting Nullifier (RLN) identity commitments
    pub rln_epoch_roots: RingBuffer<Hash256, 64>,

    /// Optional per-user anti-rollback root for encrypted search index snapshots
    pub vault_sync_roots: Map<AccountKeyHash, (u64, Hash256)>,
}
```

### 2.2 Work Items Verified in `Refine` (Stateless PVM RISC-V)

| Work Item Type | `Refine` Computation (Stateless, Parallel) | `Accumulate` State Transition |
| :--- | :--- | :--- |
| **`AttestOperator`** | Parses AMD `SEV-SNP` Attestation Report (verifies ARK -> ASK -> VCEK ECDSA P-384 chain) or Intel `TDX` DCAP quote; checks `MEASUREMENT` against `allowed_enclave_measurements`; extracts enclave-generated TLS SubjectPublicKeyInfo + HPKE key. | Registers or refreshes `OperatorRecord` for epoch $E+1$; locks operator bond. |
| **`PublishDomainKey`** | Verifies WebAuthn P-256 / Ed25519 owner signature + DNSSEC TXT ownership proof (`_zeromx.yourdomain.com`) or recovery threshold quorum. | Appends new `KeyRecord` to `key_directory_root` transparency log (preventing silent key substitution). |
| **`VerifyEgressBatch`** | Batch-verifies $N$ anonymous `RLN` zero-knowledge proofs submitted by an Egress Relay for epoch $E$; checks nullifiers for double-sign / spam burst violations. | Credits relay delivery units; if duplicate nullifier reveals a spammer's secret share, slashes spammer's stake automatically. |
| **`SlashAbuseProof`** | Verifies a `ZK-Email` proof over a signed ISP/MTA abuse feedback loop (`ARF`) or bounce proving spam originated from a specific `RLN` epoch slot. | Penalizes abuser commitment / revokes quota without exposing benign user traffic. |

---

## 3. Blind SMTP Relay Daemon (`zeromx-relay`)

Written in memory-safe Rust (`tokio` + `rustls`), compiled via deterministic Nix/Docker builds into a minimal unikernel/initramfs image booted inside an `AMD SEV-SNP` or `Intel TDX` Confidential VM:

1. **Zero Persistent Storage:** Booted with rootfs as read-only measured image in RAM; swap disabled; `mlockall(MCL_CURRENT | MCL_FUTURE)` enforced; core dumps disabled at kernel level.
2. **In-Enclave Key Generation:** On boot, the daemon generates ephemeral TLS (`ACME TLS-ALPN-01` inside enclave!) and `HPKE` keypairs in encrypted RAM and submits its hardware attestation quote to the Polkadot JAM service. Even the datacenter host OS cannot extract the TLS private key to MITM port 25.
3. **Pre-Encryption Anti-Spam Pipeline (RAM):**
   - Validates `SPF`, `DKIM`, `DMARC`, and `ARC` signatures.
   - Evaluates lightweight heuristic/statistical rules (embedded `rspamd` / `mail-auth` crate) in RAM.
   - Maps spam verdict into coarse outer header (`X-ZeroMX-Spam-Level: clean | suspect | reject`). High-confidence spam (`reject`) is dropped at SMTP `DATA` stage with `550` before polluting the user's inbox; `suspect` is encrypted and tagged so a simple Gmail/Outlook filter moves it to `Spam`.
4. **Immediate Zeroization:** All plaintext buffers implement `zeroize::ZeroizeOnDrop` immediately after AEAD sealing.

---

## 4. Client Architecture: Passkeys, Local Search & Local MCP

### 4.1 Passwordless Key Hierarchy via `WebAuthn PRF`

PGP failed consumers largely due to key management disasters. ZeroMX derives deterministic cryptographic keys from hardware-backed **Passkeys** (`WebAuthn PRF` extension, supported in Chromium, Safari/iOS, and Android):

```text
Passkey Hardware Authenticator (FaceID / TouchID / YubiKey)
   └── WebAuthn PRF Output (32-byte high-entropy secret)
          ├── HKDF("zeromx/v1/hpke-inbox")   -> X25519 + ML-KEM Private Key
          ├── HKDF("zeromx/v1/index-db-key") -> AES-256-GCM Local SQLite Encryption Key
          └── HKDF("zeromx/v1/rln-identity") -> ZK RLN Outbound Quota Secret
```

- **Device Loss Protection:** On onboarding, the root secret is split into a $2\text{-of-}3$ Shamir/FROST recovery share set (Device Passkey + Printable Recovery Kit + Optional Encrypted Guardian Share coordinated via JAM).

### 4.2 Local Encrypted Search (`SQLite Wasm` + Cloud Blob Sync)

- **Engine:** `wa-sqlite` compiled to WebAssembly with `FTS5` full-text tokenizer running inside a dedicated Web Worker backed by the browser's Origin Private File System (`OPFS`), encrypted page-by-page with `HKDF("zeromx/v1/index-db-key")`.
- **Zero-Cost Multi-Device Index Sync:** Compact, encrypted index segments (`WAL` checkpoints) are stored directly inside a hidden `_zeromx_index` folder in the user's own Gmail/Outlook account (or Google Drive `appDataFolder`). The latest snapshot SHA-256 + monotonic counter is anchored to JAM (`vault_sync_roots`) to prevent rollback or tampering by the cloud provider.

### 4.3 Sovereign AI via Local MCP Server (`zeromx-mcp`)

To replace cloud-side AI features lost when blinding Google/Microsoft, ZeroMX ships a local `Model Context Protocol` daemon exposing strictly permissioned tools over `stdio` / `127.0.0.1`:

- `zeromx.search_messages(query, date_range, sender_filter)` — Runs sub-5ms local `FTS5` + optional local embedding vector search.
- `zeromx.get_thread(thread_id)` — Returns decrypted conversation context to the user's chosen local/private LLM (Claude Desktop, Cursor, Ollama, etc.).
- `zeromx.create_encrypted_draft(to, subject, body, in_reply_to)` — Stages an encrypted draft inside the isolated composer awaiting human confirmation (never auto-sends without explicit user click).
- `zeromx.extract_calendar_events()` — Parses decrypted `.ics` invites and prepares 1-click calendar insertion.
