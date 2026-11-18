# 06 — Epics & Actionable GitHub Issue Backlog

This document breaks the ZeroMX roadmap into **7 Epics** and **24 concrete engineering issues** ready to be imported into GitHub Issues / Projects.

---

## Epic Summary

| Epic ID | Name | Phase | Focus |
| :--- | :--- | :--- | :--- |
| **EPIC-1** | Cryptographic Core & MIME Envelope | Phase 0 | `HPKE`, `RFC 9788` metadata hiding, thread tokens, padding |
| **EPIC-2** | Blind SMTP Relay Engine (`zeromx-relay`) | Phase 0–2 | Stateless Rust MTA, RAM spam filter, DKIM signing, TEE build |
| **EPIC-3** | Browser Extension & Isolated Composer | Phase 0–1 | Gmail/Outlook cross-origin iframe decryptor & zero-leak reply |
| **EPIC-4** | Polkadot JAM Service & `Smoldot` Client | Phase 1–2 | PVM RISC-V `Refine`/`Accumulate`, key transparency, TEE & RLN |
| **EPIC-5** | Local Encrypted Search & MCP Server | Phase 1 | `wa-sqlite` `FTS5`, cloud delta sync, `zeromx-mcp` local AI |
| **EPIC-6** | Mobile Companion & UX Gap Closers | Phase 2 | FaceID push decryptor PWA, `.ics` calendar helper, Vault Sweeper |
| **EPIC-7** | Onboarding, DNS Automation & Stake-to-Use | Phase 3 | Cloudflare 1-click DNS, DOT staking vault, fiat bridge |

---

## Detailed Issue Backlog

### EPIC-1: Cryptographic Core & MIME Envelope (`crates/zeromx-crypto`)

- **`ZMX-001` [P0] — Implement `ZeroMX/1.0` HPKE + ChaCha20Poly1305 Envelope Library (Rust + Wasm)**
  - **Scope:** Implement `seal_mime()` and `open_mime()` using `HPKE` (`X25519` + `HKDF-SHA256` + `ChaCha20Poly1305`), compiling to both native x86_64 and `wasm32-unknown-unknown`.
  - **Acceptance Criteria:** Encrypts/decrypts multipart HTML + binary attachments up to 25 MiB in <40ms in Chrome Wasm; zeroes plaintext buffers on drop.

- **`ZMX-002` [P0] — Implement `RFC 9788` Protected Headers & Deterministic Thread Token (`🔒 Thread #<id>`)**
  - **Scope:** Seal real `From`, `To`, `Cc`, `Subject`, and `Reply-To` inside the encrypted payload while rewriting outer `From` to opaque relay address and outer `Subject` to keyed `HMAC` thread token; preserve `Message-ID` / `In-Reply-To` / `References`.
  - **Acceptance Criteria:** A 5-message reply chain imported into Gmail and Outlook Web groups into a single conversation thread with zero real subject or sender visible in raw MIME source.

- **`ZMX-003` [P1] — Bucket Size Padding & Hybrid Post-Quantum `X25519MLKEM768` Flag**
  - **Scope:** Pad pre-encryption payloads to fixed buckets (`4 KiB` .. `16 MiB`) and add suite negotiation byte for `X25519MLKEM768`.
  - **Acceptance Criteria:** Two emails of `180 KiB` and `240 KiB` produce identical `256 KiB` outer ciphertext sizes.

---

### EPIC-2: Blind SMTP Relay Engine (`crates/zeromx-relay`)

- **`ZMX-004` [P0] — Stateless In-Memory Inbound SMTP Daemon (`STARTTLS` -> Encrypt -> Forward)**
  - **Scope:** Build async Rust SMTP server (`tokio` + `rustls`), lookup recipient domain's public key & vault forwarding target, seal incoming MIME in RAM, and forward over SMTP TLS to Gmail/Outlook.
  - **Acceptance Criteria:** Zero disk writes (`strace` verified); `mlockall` enabled; handles 100 concurrent inbound deliveries cleanly.

- **`ZMX-005` [P1] — Pre-Encryption RAM Anti-Spam Pipeline (`SPF`/`DKIM`/`DMARC` + `Rspamd`)**
  - **Scope:** Validate sender authentication in RAM before encryption; drop hard spam (`550`) and tag borderline messages with `X-ZeroMX-Spam-Level: suspect` outer header.
  - **Acceptance Criteria:** Spoofed `DMARC=reject` phishing emails are rejected at SMTP edge; legitimate `DKIM=pass` mail preserves verification summary inside encrypted inner header.

- **`ZMX-006` [P0] — Authenticated Outbound Egress Relay & Delegated DKIM Signing**
  - **Scope:** Accept encrypted outbound submission from client over HTTPS/QUIC, unwrap inside Egress enclave RAM, sign with `zmx1._domainkey.<userdomain>` DKIM key, and deliver to external recipient MX.
  - **Acceptance Criteria:** External Gmail/Outlook recipient sees `SPF=PASS`, `DKIM=PASS`, `DMARC=PASS` aligned with `@yourdomain.com`.

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

- **`ZMX-010` [P0] — Zero-Draft-Leak Shadow Composer & Encrypted `Sent` Appender**
  - **Scope:** Intercept *Compose* and *Reply* actions on ZeroMX threads, open isolated composer, submit encrypted payload to Egress Relay, and append self-encrypted copy to mailbox `Sent` folder via Gmail API / IMAP / Graph API.
  - **Acceptance Criteria:** Network capture confirms zero plaintext keystrokes or drafts ever sent to `google.com` or `office.com`.

- **`ZMX-011` [P1] — Built-in Fallback Vault Reader Tab (DOM-Breakage Immunity)**
  - **Scope:** Add standalone inbox view inside the extension itself reading raw encrypted messages via standard OAuth APIs so users are never blocked if Gmail/Outlook alters webmail HTML.
  - **Acceptance Criteria:** Full read/search/reply functionality works even with webmail content scripts disabled.

---

### EPIC-4: Polkadot JAM Service & `Smoldot` Integration (`crates/zeromx-jam-service`)

- **`ZMX-012` [P0] — Polkadot JAM Service State & Key Transparency Log (`Accumulate` + `Refine`)**
  - **Scope:** Implement append-only Merkleized domain key registry (`PublishDomainKey`) in Rust targeting Polkadot JAM PVM; verify DNSSEC/TXT ownership proof + owner signature.
  - **Acceptance Criteria:** Compiles cleanly to PVM RISC-V; rejects unauthorized key rotation; exposes compact Merkle inclusion proofs.

- **`ZMX-013` [P0] — Embed `Smoldot` Light Client in Extension + Auto `ZeroMX <-> ZeroMX` Upgrade**
  - **Scope:** Run `@substrate/smoldot-light` in extension Web Worker; verify recipient domain keys trustlessly and auto-upgrade outbound mail to pure client-to-client E2EE when recipient is registered on JAM.
  - **Acceptance Criteria:** Zero HTTP calls to centralized blockchain RPCs; `ZeroMX <-> ZeroMX` mail is encrypted directly to recipient's public key in browser.

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

- **`ZMX-019` [P1] — Lightweight Mobile Passkey Companion PWA/App (iOS & Android)**
  - **Scope:** Solve Mobile Gap #1: connect via Gmail/Microsoft OAuth read-only/send scopes, unlock key via iOS/Android Passkey (`FaceID`/`TouchID`), decrypt push notifications locally, and support fast mobile replies.
  - **Acceptance Criteria:** Tapping an incoming notification unlocks via FaceID and renders decrypted thread in <1.2s.

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
