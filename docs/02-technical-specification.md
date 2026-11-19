# 02 — Detailed Technical Specification

> Trust assumptions and known limits for everything below are defined in [07 — Threat Model, Trust Boundaries & Known Limits](07-threat-model-and-limits.md).

## 1. Cryptographic Envelope & Wire Format (`ZeroMX/1.0`)

ZeroMX wraps inbound and outbound email payloads inside a standard `multipart/encrypted` MIME container (`RFC 3156` compatible structure carrying an `HPKE` `RFC 9180` payload) so every existing email server — Gmail, Exchange Online / Outlook, iCloud, Dovecot, Fastmail — stores, syncs, and threads messages without custom server extensions.

### 1.1 Cipher Suite & Post-Quantum Readiness

- **Only Suite (v1.0):** `HPKE` (`RFC 9180`) Base Mode with a **hybrid post-quantum KEM**
  - **KEM:** `X25519` + `ML-KEM-768` hybrid (X-Wing construction)
  - **KDF:** `HKDF-SHA256`
  - **AEAD:** `ChaCha20Poly1305`
- **Why hybrid is mandatory from day one:** the adversary in this threat model is the mailbox provider, which archives every ciphertext indefinitely. "Harvest now, decrypt later" is the default case. There is no classical-only mode to downgrade to.
- **Key epochs:** the inbox key pair rotates yearly. Old private keys stay on the user's devices to read old mail. A stolen key opens one epoch, not the whole archive. Stored mail has no forward secrecy beyond this.
- **Envelope signature:** every sealed envelope carries an `Ed25519` signature from the sealing relay's attested signing key (or from the sender's client for Tier 1). Clients show unsigned or unverifiable envelopes as unverified.
- **Legacy OpenPGP Interop Mode:** Optional `PGP/MIME` (`SEIPDv2` / `RFC 9580`) output for users who also read mail via standard PGP clients (e.g., Thunderbird). Classical only, and marked as such.

### 1.2 Full Metadata Sealing & Deterministic Thread Continuity

Standard PGP leaves `From:` and `Subject:` exposed in outer headers, allowing Big Tech to build complete social, medical, and financial graphs even without reading message bodies. ZeroMX eliminates outer metadata leakage while **preserving native conversation threading**:

1. **Protected Inner Headers (`RFC 9788` / Memory Hole):**
   Inside the encrypted MIME root, the full original headers (`From`, `To`, `Cc`, `Subject`, `Date`, `Reply-To`, and raw `DKIM-Signature` verification summary) are serialized inside a signed/encrypted `multipart/mixed` header block.
2. **Outer Envelope Rewriting:**
   - **Outer `From:`** `relay-<random_or_hmac_id>@ingress.zeromx.network` (prevents social-graph profiling by the storage provider).
   - **Outer `Subject:`** `🔒 Thread #<thread_token>` where:
     $$\text{thread\_token} = \text{Hex}\big(\text{HMAC-SHA256}(K_{\text{thread}}, \text{CanonicalThreadRoot})[0..5]\big)$$
     Here $K_{\text{thread}}$ is a per-mailbox tagging key published in the mailbox's directory record, so relays and the owner's client compute the same token. The displayed token uses 6 bytes to keep collisions negligible.
   - **Outer `Message-ID` / `In-Reply-To` / `References`:** **always pseudonymized** as `<Hex(HMAC-SHA256(K_thread, original_id))@t.zeromx.network>`. Real Message-IDs embed the sender's domain (`<…@mail.chase.com>`), so preserving them would tell the provider who writes to you. The mapping is deterministic, so every reply maps to the same chain and the webmail groups the conversation. When legacy senders (banks, Exchange, ticket systems) strip `References`/`In-Reply-To` on reply, the relay falls back to deriving the thread token from `HMAC-SHA256(K_thread, canonicalize_subject(Subject))` so replies still group cleanly. Real IDs are kept in the protected inner headers.
   - **Known residual:** $K_{\text{thread}}$ is public, so a party that already knows a real `Message-ID` can confirm that a stored envelope belongs to that thread. A provider only knows the ID when one of its own users sent the message, in which case it already holds the plaintext.

### 1.3 Traffic-Analysis Resistance (Size Padding & Timing Jitter)

To prevent observers correlating an inbound 412,319-byte hospital PDF arriving at an MX relay with a 412,500-byte encrypted email landing in Gmail 180 ms later:
- **Padmé Padding:** Prior to AEAD encryption, payloads are padded with the Padmé scheme, with a `4 KiB` floor. Overhead is at most about 12% and shrinks with size, and the padded length leaks only $O(\log \log n)$ bits. Power-of-four buckets were rejected: they waste up to 4x storage in a mailbox the user has a fixed quota for.
- **Delivery Jitter:** Relays apply a randomized exponential delay ($50\text{ ms} \le \Delta t \le 1500\text{ ms}$, configurable per domain) before forwarding to the vault inbox.
- **Not claimed:** resistance to a global observer, or to a provider correlating send and arrival times for mail sent by its own users.

---

## 2. Control Plane Design (`zeromx-jam-service`)

The control plane has one data model and two deployments.

- **v0 / v1 — Witnessed transparency log.** An append-only Merkle log of key records, operator records, and the measurement allowlist. The log operator signs each tree head. Independent witnesses co-sign it. Clients verify inclusion and consistency proofs and refuse a tree head without a witness quorum. Tree heads are anchored to Polkadot periodically. This is the Certificate Transparency model and needs no chain to be live.
- **Target — Polkadot JAM service.** The same state and transitions as a JAM service. JAM's **Refine -> Accumulate** model over the **RISC-V PVM** fits the workload: `Refine` does heavy stateless verification (x509/ASN.1 AMD SEV-SNP and Intel TDX quotes, signature checks, later `RLN` proofs) in `no_std` Rust, and `Accumulate` applies small state updates.

**Two external dependencies gate the JAM deployment** and are tracked as risks, not assumed:
1. JAM mainnet availability, which is decided by Polkadot governance.
2. A **JAM light client usable from a browser extension**. None is ready today, and other teams are building them. Smoldot is a Substrate light client and does not speak JAM. Until one exists, clients read JAM state through at least two independent RPC endpoints and cross-check witness-signed roots.

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
| **`VerifyEgressBatch`** *(permissionless phase)* | Batch-verifies $N$ anonymous `RLN` zero-knowledge proofs submitted by an Egress Relay for epoch $E$; checks nullifiers for double-sign / spam burst violations. | Credits relay delivery units; if duplicate nullifier reveals a spammer's secret share, slashes spammer's stake automatically. |
| **`SlashAbuseProof`** *(permissionless phase)* | Verifies a `ZK-Email` proof over a signed ISP/MTA abuse feedback loop (`ARF`) or bounce proving spam originated from a specific `RLN` epoch slot. | Penalizes abuser commitment / revokes quota without exposing benign user traffic. |

`AttestOperator` also checks the operator's **admission record**: evidence that the operator has no physical access to the host. A valid quote alone is not sufficient, because attestation keys can be extracted by an attacker with physical access ([07, section 4](07-threat-model-and-limits.md)).

Until the permissionless phase, outbound abuse control is a **signed per-account quota token** issued by the account service and checked inside the egress relay. It is simpler than `RLN` and sufficient while every account is tied to a payment or a stake.

---

## 3. Blind SMTP Relay Daemon (`zeromx-relay`)

Written in memory-safe Rust (`tokio` + `rustls`), compiled via deterministic Nix/Docker builds into a minimal unikernel/initramfs image booted inside an `AMD SEV-SNP` or `Intel TDX` Confidential VM:

1. **Zero Persistent Storage:** Booted with rootfs as read-only measured image in RAM; swap disabled; `mlockall(MCL_CURRENT | MCL_FUTURE)` enforced; core dumps disabled at kernel level.
2. **In-Enclave Key Generation:** On boot, the daemon generates TLS (`ACME TLS-ALPN-01` inside the VM), envelope-signing, and `HPKE` keypairs in encrypted RAM and submits its attestation quote to the control plane. The host OS cannot extract the TLS private key.
   - **Sender-side pinning & DANE rollover:** a public CA certificate does not stop whoever controls the MX hostname's DNS from obtaining their own. Each user domain therefore publishes **DNSSEC** on its `MX` records, **MTA-STS (`enforce`)**, and **TLS-RPT**, while ZeroMX's DNSSEC-signed MX zone publishes **DANE `TLSA`** records (`_25._tcp.mx*.zeromx.network`) pinned to relay keys. To prevent DANE hard-failures across DNS TTL windows on VM reboot, relay TLS keys are either derived via hardware sealing bound strictly to the enclave `MEASUREMENT` (`SNP_GET_DERIVED_KEY`) or rolled over with dual-pinned `current + standby` `TLSA` records staged `2x TTL` ahead of rotation. See [07, section 5](07-threat-model-and-limits.md).
   - **No long-term user secrets:** the relay holds no per-domain key. Outbound DKIM is signed by the client (RSA-2048, because major receivers do not verify Ed25519 DKIM), and the relay forwards the signed bytes unmodified.
3. **Pre-Encryption Anti-Spam Pipeline (RAM):**
   - Validates `SPF`, `DKIM`, `DMARC`, and `ARC` signatures.
   - Evaluates lightweight heuristic/statistical rules (embedded `rspamd` / `mail-auth` crate) in RAM. This is weaker than a large provider's filter, which learns from billions of mailboxes. Per-sender aliases are the main defense.
   - Maps spam verdict into coarse outer header (`X-ZeroMX-Spam-Level: clean | suspect | reject`). High-confidence spam (`reject`) is dropped at SMTP `DATA` stage with `550` before polluting the user's inbox; `suspect` is encrypted and tagged so a simple Gmail/Outlook filter moves it to `Spam`.
4. **Immediate Zeroization:** All plaintext buffers implement `zeroize::ZeroizeOnDrop` immediately after AEAD sealing.
5. **Mobile Notification Preview:** After sealing, the relay seals a short preview (sender, subject, first line) to the mailbox's device-bound notification key and hands it to the platform push service. The push gateway sees ciphertext and timing only.
6. **Sent-to-Self Path:** The relay accepts already-sealed envelopes from the owner's client for the owner's own mailbox and delivers them unchanged. This is how sent copies and drafts reach the vault without a mailbox API.

---

## 4. Client Architecture: Passkeys, Local Search, Local MCP & Bridge

### 4.1 Passwordless Key Hierarchy via `WebAuthn PRF`

PGP failed consumers largely due to key management disasters. ZeroMX derives deterministic cryptographic keys from hardware-backed **Passkeys** (`WebAuthn PRF` extension, supported in Chromium, Safari/iOS, and Android):

```text
Passkey Hardware Authenticator (FaceID / TouchID / YubiKey)
   └── WebAuthn PRF Output (32-byte high-entropy secret)
          ├── HKDF("zeromx/v1/hpke-inbox")   -> X25519 + ML-KEM Private Key
          ├── HKDF("zeromx/v1/index-db-key") -> AES-256-GCM Local SQLite Encryption Key
          ├── HKDF("zeromx/v1/rln-identity") -> ZK RLN Outbound Quota Secret (permissionless phase)
          ├── wrap(DKIM RSA-2048 signing key)     -> Client-Side Outbound DKIM
          └── wrap(notification key, device-bound) -> Mobile Push Preview Decryption
```

- **Device Loss Protection:** On onboarding, the root secret is split into a $2\text{-of-}3$ Shamir recovery share set (Device Passkey + Printable Recovery Kit + Optional Encrypted Guardian Share).
- **WebAuthn RP-ID & Cross-Platform Fallback:** Because a Passkey registered under RP ID `zeromx.io` cannot be directly asserted from a `chrome-extension://<id>` origin, key unlock runs through a dedicated auth origin (`unlock.zeromx.io` -> verified extension messaging bridge) that releases only the derived session key into extension memory. For browsers or authenticators that do not yet support the `WebAuthn PRF` extension (e.g., Firefox or certain Linux/third-party managers), onboarding provides an Argon2id-hardened local passphrase option protecting the same root secret.
- **Passkey Provider Matters:** a synced passkey is only as private as its sync provider's encryption. Onboarding recommends a hardware security key or a device-bound passkey for the root, and states the trade-off if the user picks a synced one.

### 4.2 Local Encrypted Search (`SQLite Wasm` + Cloud Blob Sync)

- **Engine:** `wa-sqlite` compiled to WebAssembly with `FTS5` full-text tokenizer running inside a dedicated Web Worker backed by the browser's Origin Private File System (`OPFS`), encrypted page-by-page with `HKDF("zeromx/v1/index-db-key")`.
- **What gets indexed without any mailbox API:** every message the extension has rendered, plus every new message from the moment of install (the client receives the notification preview and fetches the envelope from the open webmail session).
- **Full-archive indexing is opt-in** and needs read access to the mailbox through the provider API or IMAP. For Gmail this is a restricted OAuth scope with a provider-run verification and a yearly security assessment. It is a gating item with its own budget, not an assumed capability.
- **Multi-Device Index Sync (browser only):** Compact, encrypted index segments are sent to the user's own mailbox through the sent-to-self path under a dedicated label. The latest snapshot hash and a monotonic counter are recorded in the control plane (`vault_sync_roots`) to detect rollback by the provider. A Bridge does not need this: it has IMAP access and indexes the mailbox itself (section 4.4).
- **Query language:** the search box and `zeromx.search_messages` accept the Gmail operators people already use: `from:`, `to:`, `cc:`, `subject:`, `has:attachment`, `filename:`, `before:`/`after:`/`older_than:`/`newer_than:`, `larger:`/`smaller:`, `label:`, `in:`, `is:unread`/`is:starred`, `OR`, `-` for negation, quoted phrases and parentheses. A small parser maps them to `FTS5` `MATCH` terms plus filters on metadata columns. This is ordinary engineering, not research.
- **What is harder than the syntax:** searching inside attachment content (PDF text extraction, OCR on images), typo tolerance, and relevance ranking at Gmail's level. These ship after the basic operators, in that order.
- **Mail from before ZeroMX** stays plaintext at the provider and keeps the provider's own search. The local index covers sealed mail. The UI says which of the two a result came from.
- **Optional on-device semantic search:** a small local embedding model adds "find the email about the lease renewal" style queries, and a local LLM can turn a natural-language question into operators. Both are opt-in, run only on the device, and are skipped on hardware too small to run them well.

### 4.3 Sovereign AI via Local MCP Server (`zeromx-mcp`)

To replace cloud-side AI features lost when blinding Google/Microsoft, ZeroMX ships a local `Model Context Protocol` daemon exposing strictly permissioned tools over `stdio` / `127.0.0.1`:

- `zeromx.search_messages(query, date_range, sender_filter)` — Runs sub-5ms local `FTS5` + optional local embedding vector search.
- `zeromx.get_thread(thread_id)` — Returns decrypted conversation context to the user's chosen local/private LLM (Claude Desktop, Cursor, Ollama, etc.).
- `zeromx.create_encrypted_draft(to, subject, body, in_reply_to)` — Stages an encrypted draft inside the isolated composer awaiting human confirmation (never auto-sends without explicit user click).
- `zeromx.extract_calendar_events()` — Parses decrypted `.ics` invites and prepares 1-click calendar insertion.

### 4.4 ZeroMX Bridge for Desktop Mail Apps (`crates/zeromx-bridge`)

Many people read mail in Apple Mail, Spark, Outlook or Thunderbird, not in a browser tab. These apps cannot run the extension and most have no plugin API. The Bridge serves them the way Proton Mail Bridge serves Proton users: a local proxy that speaks standard IMAP and SMTP to the mail app and handles the cryptography in between.

```text
Mail app (Apple Mail / Spark / Outlook / Thunderbird)
   │  IMAP + SMTP over TLS, 127.0.0.1 only, per-install credentials
   ▼
ZeroMX Bridge (Rust daemon, zeromx-crypto, local encrypted index)
   │  IMAP to the vault                 │  SMTP submission
   ▼                                    ▼
Gmail (ciphertext store)          ZeroMX egress relay, or direct E2E seal
```

- **Inbound:** the Bridge fetches sealed envelopes over IMAP, opens them, and serves the inner `RFC 9788` message with the real `From`, `Subject`, `Message-ID` and `References`, so the mail app shows and threads it normally.
- **Every write is sealed:** any `APPEND` from the mail app (drafts, sent copies, messages moved in from another account) is sealed to the user's key before it reaches the provider. A draft typed in Spark never reaches Gmail in plaintext.
- **Outbound:** SMTP submission on localhost. The Bridge seals end to end for ZeroMX recipients, signs `DKIM` client-side with the wrapped key from section 4.1, and hands other mail to the egress relay. The sent copy is sealed and appended to the Sent folder.
- **Search:** the Bridge answers IMAP `SEARCH` from its own index, because the provider's server-side search sees only envelopes. Most desktop apps also search their own local cache, which works once messages are downloaded.
- **Keys:** unlocked with the same passkey through the operating system's passkey API, or by pairing with the extension. The unwrapped key stays in the OS keychain.
- **Upstream sign-in:** an **app password** (personal Google accounts with 2-Step Verification; not available under Advanced Protection; Workspace admins can disable it) or **OAuth**, which needs Google's restricted-scope verification and yearly assessment. Beta starts with app passwords, and OAuth follows once that assessment is budgeted.
- **Multi-device:** each computer runs its own Bridge and builds its own index from the mailbox. There is nothing to sync between them.
- **Limits, stated to the user:**
  - The mail app's cloud features stop working for this account: vendor push notifications, Send Later, shared inboxes, vendor AI. Their servers cannot reach `127.0.0.1`, and if they could they would only see sealed mail. For apps such as Spark, whose servers hold mailbox credentials to send push notifications, this is a privacy gain.
  - The account works only on computers where the Bridge runs. Phones use the ZeroMX app.
  - The mail app keeps its own decrypted cache on disk. That falls under device security ([07, L6](07-threat-model-and-limits.md)); onboarding recommends full-disk encryption.
  - Folder names, labels and flags the user sets travel to the provider as before. They are metadata the provider can see.
