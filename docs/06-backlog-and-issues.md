# 06 — Epics & Actionable GitHub Issue Backlog

This document breaks the ZeroMX roadmap into **8 Epics** and **33 concrete engineering issues** ready to be imported into GitHub Issues / Projects. Phase numbers follow [04 — Roadmap](04-roadmap.md). Design constraints follow [07 — Threat Model](07-threat-model-and-limits.md).

---

## Epic Summary

| Epic ID | Name | Phase | Focus |
| :--- | :--- | :--- | :--- |
| **EPIC-1** | Cryptographic Core & MIME Envelope | Phase 0 | `HPKE`, `RFC 9788` metadata hiding, thread tokens, padding |
| **EPIC-2** | Blind SMTP Relay Engine (`zeromx-relay`) | Phase 0–2 | Stateless Rust MTA, RAM spam filter, DKIM signing, TEE build |
| **EPIC-3** | Browser Extension & Isolated Composer | Phase 0–1 | Gmail/Outlook cross-origin iframe decryptor & zero-leak reply |
| **EPIC-4** | Control Plane: Transparency Log, JAM Service & Directory Client | Phase 1–2 | PVM RISC-V `Refine`/`Accumulate`, key transparency, TEE & RLN |
| **EPIC-5** | Local Encrypted Search & MCP Server | Phase 1 | `wa-sqlite` `FTS5`, cloud delta sync, `zeromx-mcp` local AI |
| **EPIC-6** | Mobile Companion & UX Gap Closers | Phase 2 | FaceID push decryptor PWA, `.ics` calendar helper, Vault Sweeper |
| **EPIC-7** | Onboarding, DNS Automation & Stake-to-Use | Phase 0–2 | Cloudflare 1-click DNS, subscriptions, optional DOT staking |
| **EPIC-8** | Trust Minimization & Release Integrity | Phase 0–2 | SMTP pinning, envelope signatures, transparency log, release signing, operator admission |

---

## Detailed Issue Backlog

### EPIC-1: Cryptographic Core & MIME Envelope (`crates/zeromx-crypto`)

- **`ZMX-001` [P0] — Implement `ZeroMX/1.0` Hybrid HPKE Envelope Library (Rust + Wasm)**
  - **Scope:** Implement `seal_mime()` and `open_mime()` using `HPKE` with the hybrid `X25519` + `ML-KEM-768` KEM, `HKDF-SHA256`, and `ChaCha20Poly1305`, compiling to both native x86_64 and `wasm32-unknown-unknown`. No classical-only mode.
  - **Acceptance Criteria:** Encrypts/decrypts multipart HTML + binary attachments up to 25 MiB in <40ms in Chrome Wasm; zeroes plaintext buffers on drop.

- **`ZMX-002` [P0] — Implement `RFC 9788` Protected Headers & Deterministic Thread Token (`🔒 Thread #<id>`)**
  - **Scope:** Seal real `From`, `To`, `Cc`, `Subject`, and `Reply-To` inside the encrypted payload while rewriting outer `From` to opaque relay address and outer `Subject` to keyed `HMAC` thread token; **pseudonymize** `Message-ID` / `In-Reply-To` / `References` with the per-mailbox tagging key.
  - **Acceptance Criteria:** A 10-message reply chain groups into a single Gmail conversation with no real subject, sender, or original `Message-ID` domain visible in raw MIME source.

- **`ZMX-003` [P0] — Padmé Padding & Yearly Key Epochs**
  - **Scope:** Pad pre-encryption payloads with Padmé (4 KiB floor). Add key-epoch identifier to the envelope and directory record.
  - **Acceptance Criteria:** Padding overhead never exceeds 12% above the floor; property test shows padded lengths fall only on Padmé-valid sizes; a message sealed to a previous epoch still opens after rotation.

---

### EPIC-2: Blind SMTP Relay Engine (`crates/zeromx-relay`)

- **`ZMX-004` [P0] — Stateless In-Memory Inbound SMTP Daemon (`STARTTLS` -> Encrypt -> Forward)**
  - **Scope:** Build async Rust SMTP server (`tokio` + `rustls`), lookup recipient domain's public key & vault forwarding target, seal incoming MIME in RAM, and forward over SMTP TLS to Gmail/Outlook.
  - **Acceptance Criteria:** Zero disk writes (`strace` verified); `mlockall` enabled; handles 100 concurrent inbound deliveries cleanly.

- **`ZMX-005` [P1] — Pre-Encryption RAM Anti-Spam Pipeline (`SPF`/`DKIM`/`DMARC` + `Rspamd`)**
  - **Scope:** Validate sender authentication in RAM before encryption; drop hard spam (`550`) and tag borderline messages with `X-ZeroMX-Spam-Level: suspect` outer header.
  - **Acceptance Criteria:** Spoofed `DMARC=reject` phishing emails are rejected at SMTP edge; legitimate `DKIM=pass` mail preserves verification summary inside encrypted inner header.

- **`ZMX-006` [P0] — Outbound Egress Relay with Client-Side DKIM**
  - **Scope:** Client generates an RSA-2048 DKIM key on device, publishes the selector (`zmx1._domainkey.<userdomain>`), and signs every outbound message. Egress accepts the encrypted submission over HTTPS/QUIC with a per-account quota token, unwraps in RAM, and delivers the signed bytes unmodified.
  - **Acceptance Criteria:** External Gmail/Outlook recipient sees `DKIM=PASS` and `DMARC=PASS` aligned with `@yourdomain.com`; the relay image contains no code path that can produce a DKIM signature.

- **`ZMX-007` [P1] — Reproducible Nix Enclave Image for AMD SEV-SNP & Intel TDX**
  - **Scope:** Package `zeromx-relay` via `flake.nix` into a deterministic confidential VM image with in-enclave ACME TLS key generation.
  - **Acceptance Criteria:** Two independent machines running `nix build` produce identical SHA-384 enclave measurements.

---

### EPIC-3: Browser Extension & Isolated Composer (`packages/extension`)

- **`ZMX-008` [P0] — Manifest V3 Extension Skeleton + Passkey (`WebAuthn PRF`) Key Vault**
  - **Scope:** Implement Passkey registration/unlock flow deriving `HPKE`, `SQLite`, and `RLN` subkeys via `HKDF`, plus printable 2-of-3 Shamir recovery share generator.
  - **Acceptance Criteria:** User creates and unlocks keys using macOS TouchID / Windows Hello / iOS Passkey sync with zero passwords typed.

- **`ZMX-009` [P0] — Cross-Origin Isolated Decryptor Frame for Gmail Web & Outlook Web**
  - **Scope:** Detect `ZeroMX/1.0` envelopes in inbox list and message view; replace opaque `🔒 Thread #<id>` and `relay-*` metadata seamlessly and render decrypted body/attachments inside a `chrome-extension://` sandboxed iframe.
  - **Acceptance Criteria:** Host page (`mail.google.com`) scripts cannot read decrypted iframe DOM (`DOMException` verified under test); renders in <15ms.

- **`ZMX-010` [P0] — Zero-Draft-Leak Isolated Composer & Sent-to-Self Copies**
  - **Scope:** Intercept *Compose* and *Reply* actions on ZeroMX threads, open the composer in an extension-origin frame, submit the encrypted payload to egress, and deliver a self-sealed copy through ingress so it threads in the mailbox. No mailbox API scope is requested.
  - **Acceptance Criteria:** Network capture confirms zero plaintext keystrokes or drafts sent to the provider; the extension manifest requests no Gmail or Graph OAuth scope; sent copies appear in the correct conversation.

- **`ZMX-011` [P1] — Built-in Fallback Vault Reader Tab (DOM-Breakage Immunity)**
  - **Scope:** Add standalone inbox view inside the extension itself reading raw encrypted messages via standard OAuth APIs so users are never blocked if Gmail/Outlook alters webmail HTML.
  - **Acceptance Criteria:** Full read/search/reply functionality works even with webmail content scripts disabled.

---

### EPIC-4: Control Plane & Directory Client (`crates/zeromx-jam-service`)

- **`ZMX-012` [P0] — Polkadot JAM Service State & Key Transparency Log (`Accumulate` + `Refine`)**
  - **Scope:** Implement append-only Merkleized domain key registry (`PublishDomainKey`) in Rust targeting Polkadot JAM PVM; verify DNSSEC/TXT ownership proof + owner signature.
  - **Acceptance Criteria:** Compiles cleanly to PVM RISC-V; rejects unauthorized key rotation; exposes compact Merkle inclusion proofs.

- **`ZMX-013` [P0] — Directory Verifier in Extension + Auto `ZeroMX <-> ZeroMX` Upgrade**
  - **Scope:** Verify recipient key records with inclusion and consistency proofs against witness-signed tree heads in an extension Web Worker; auto-upgrade outbound mail to client-to-client encryption when the recipient is in the directory. On JAM, read through two independent RPC endpoints until a JAM light client exists.
  - **Acceptance Criteria:** A directory that serves a substituted key or a forked tree head is detected and the send is blocked; `ZeroMX <-> ZeroMX` mail is encrypted directly to the recipient's public key in the browser.

- **`ZMX-014` [P1] — `no_std` AMD SEV-SNP & Intel TDX Quote Verifier inside JAM `Refine`**
  - **Scope:** Verify CPU hardware attestation chains and check enclave `MEASUREMENT` against governed allowlist inside JAM `Refine`; bind operator stake and slashing rules.
  - **Acceptance Criteria:** Modified or unattested relay binaries fail `Refine` verification deterministically; valid SEV-SNP/TDX quotes register within PVM cycle budget.

- **`ZMX-015` [P1] — ZK Rate-Limiting Nullifier (`RLN`) Anti-Spam Verifier in JAM `Refine`**
  - **Scope:** Implement Wasm client prover + PVM batch verifier enforcing per-epoch anonymous outbound send quotas and automatic spammer secret recovery/slashing on quota breach.
  - **Acceptance Criteria:** Honest sender identity remains unlinkable; exceeding epoch rate limit reveals secret share and slashes spammer stake.

---

### EPIC-5: Local Encrypted Search & Sovereign MCP (`packages/search-worker`, `crates/zeromx-mcp`)

- **`ZMX-016` [P0] — Encrypted Local `SQLite Wasm` (`FTS5`) Index + Webmail Search Hook**
  - **Scope:** Index decrypted sender, subject, body, and attachment filenames locally inside AES-GCM encrypted OPFS SQLite; display instant local search results inside Gmail/Outlook search dropdown.
  - **Acceptance Criteria:** Keyword search across 10,000 encrypted messages completes in <10ms offline.

- **`ZMX-017` [P1] — Encrypted Index Delta Sync via `_zeromx_index` + JAM Anti-Rollback Root**
  - **Scope:** Sync compressed encrypted index checkpoints across desktop and mobile using the user's own Gmail/Outlook storage, verifying monotonic state hash against JAM.
  - **Acceptance Criteria:** Linking a second laptop restores full search index in <5s without re-downloading entire mailbox history; stale rollback snapshots are rejected.

- **`ZMX-018` [P0] — `zeromx-mcp` Local MCP Server for Personal AI Agents**
  - **Scope:** Build `stdio`/localhost MCP server bridging to the local decrypted index (`search_messages`, `get_thread`, `create_encrypted_draft`, `extract_calendar_events`) with granular per-tool user consent.
  - **Acceptance Criteria:** Claude Desktop and Cursor can summarize encrypted threads and stage encrypted draft replies locally without exposing data to Google/Microsoft cloud AI.

---

### EPIC-6: Mobile Companion & UX Gap Closers (`packages/mobile-companion`)

- **`ZMX-019` [P1] — Native Mobile App with Relay-Sealed Push Previews (iOS first)**
  - **Scope:** Native app with a notification service extension. Ingress seals a preview to a device-bound notification key and sends it through the platform push service; the extension decrypts it on device. Full messages unlock with the passkey. A PWA cannot do background decryption and is not used.
  - **Acceptance Criteria:** A notification shows the real sender and subject with the app closed; the push gateway logs contain ciphertext only; tapping opens the decrypted thread in <1.5s.

- **`ZMX-020` [P1] — 1-Click Decrypted `.ics` Calendar Invite Injector**
  - **Scope:** Parse `text/calendar` MIME parts inside the decryptor frame, render meeting summary card (time, organizer, Meet/Zoom link), and offer 1-click insertion into Google/Outlook Calendar.
  - **Acceptance Criteria:** Encrypted `.ics` invites add accurately with timezone and conferencing links preserved.

- **`ZMX-021` [P2] — Smart Selective Encryption Policy & Legacy `@gmail.com` Vault Sweeper**
  - **Scope:** Allow optional sender-category rules (e.g., pass public Substack newsletters unencrypted) + local background worker that encrypts historical plaintext emails in `@gmail.com` at rest and trashes originals.
  - **Acceptance Criteria:** Sweeper safely processes 5,000 archival emails idempotently with local backup verification prior to purge.

---

### EPIC-7: Onboarding, DNS Automation & Stake-to-Use Economics

- **`ZMX-022` [P1] — 3-Minute Custom Domain Wizard + Cloudflare 1-Click DNS Connect**
  - **Scope:** Guided web onboarding configuring `MX`, `SPF`, delegated `DKIM`, and `_zeromx` TXT records automatically via Cloudflare OAuth / Domain Connect, plus health-check verifier.
  - **Acceptance Criteria:** Non-technical custom-domain owner completes end-to-end setup in under 3 minutes.

- **`ZMX-023` [P1] — Polkadot JAM `Stake-to-Use` DOT Vault & Operator Reward Distributor**
  - **Scope:** Non-custodial staking vault directing DOT yield to attested Ingress/Egress operators and JAM Coretime renewal while keeping user principal withdrawable.
  - **Acceptance Criteria:** Staking principal remains 100% user-recoverable after unbonding period; yield settles accurately per epoch.

- **`ZMX-024` [P2] — Automated Nightly Playwright E2E Canary (Gmail & Outlook Live Regression)**
  - **Scope:** CI pipeline sending real encrypted emails through testnet TEE relays into live Gmail & Outlook test accounts to detect webmail DOM changes immediately.
  - **Acceptance Criteria:** Alerts engineering channel within 1 hour of any upstream Gmail/Outlook Web selector change.

---

### EPIC-8: Trust Minimization & Release Integrity

- **`ZMX-025` [P0] — SMTP Path Pinning: MTA-STS, DANE, TLS-RPT**
  - **Scope:** Onboarding publishes and verifies an MTA-STS `enforce` policy, DANE `TLSA` records pinned to relay keys, and TLS-RPT for every user domain. Relay key rotation updates the records.
  - **Acceptance Criteria:** A test sender that validates MTA-STS refuses delivery to an MX presenting any other certificate; TLS-RPT failures surface in the client.

- **`ZMX-026` [P0] — Attested Envelope Signatures & Per-Message Provenance UI**
  - **Scope:** Relays sign each sealed envelope with a key bound to their attestation. The client verifies it and shows which relay sealed the message.
  - **Acceptance Criteria:** An envelope sealed by a non-registered key renders with an "unverified" marker; canary messages detect an unsealed MX path within one hour.

- **`ZMX-027` [P0] — Mailbox Leak Audit Tool**
  - **Scope:** CLI that scans a raw mailbox export and reports any sealed message exposing plaintext, real sender, real subject, or an original `Message-ID`.
  - **Acceptance Criteria:** Runs in CI against the test mailbox; shipped to users as a verification tool.

- **`ZMX-028` [P1] — Witnessed Transparency Log for Keys, Operators & Measurements**
  - **Scope:** Append-only Merkle log with signed tree heads, independent witness co-signatures, and periodic anchoring to Polkadot. Same data model as the JAM service.
  - **Acceptance Criteria:** Clients reject tree heads without witness quorum; a split-view attack is detected by gossip between two clients.

- **`ZMX-029` [P1] — Reproducible Extension Builds & Two-Party Release Signing**
  - **Scope:** Deterministic extension build; releases require matching outputs from two independent builders; delayed auto-update with public diff.
  - **Acceptance Criteria:** A third party reproduces the published package byte-for-byte from the tag.

- **`ZMX-030` [P1] — Operator Admission & Attestation-of-Location**
  - **Scope:** Admission record proving the operator has no physical access to its hosts; public operator list; revocation path for measurements and operators.
  - **Acceptance Criteria:** A valid quote from a host without an admission record is rejected; revocation propagates to clients within one epoch.

- **`ZMX-031` [P1] — In-Flow Domain Registration**
  - **Scope:** Register a domain in the user's own name during onboarding and configure all records automatically.
  - **Acceptance Criteria:** A user with no domain reaches a working sealed inbox in under 10 minutes.

- **`ZMX-032` [P1] — Private Key Lookups**
  - **Scope:** The client must not reveal which recipient it is looking up to the node that serves directory data. Implement hash-prefix bucket fetches with local filtering, with compact snapshot sync for small directories. Evaluate an oblivious relay.
  - **Acceptance Criteria:** A directory server's logs cannot distinguish a lookup for one address from at least 1,000 others; documented in [08, section 5](08-why-polkadot-jam.md).

- **`ZMX-033` [P2] — Benchmark the Attestation Verifier on PVM (Polkadot Hub Bridge Decision)**
  - **Scope:** Compile the `no_std` SEV-SNP and TDX verifier to PVM. Measure instruction counts and run it as a contract on a Polkadot Hub testnet. Confirm whether Smoldot can prove the contract storage the client reads.
  - **Acceptance Criteria:** Published numbers for one SEV-SNP chain and one TDX quote; a written go or no-go on using a Hub contract as the step between the transparency log and the JAM service.

