# 06 — Epics & Actionable GitHub Issue Backlog

This document breaks the ZeroMX roadmap into **10 Epics** and **47 issue entries (`ZMX-000` to `ZMX-046`)**: **42 active issues** and **5 dropped** when the design moved from "Gmail as the vault" to storage the user controls ([07, section 6.1](07-threat-model-and-limits.md)). Issue IDs are stable. A dropped issue keeps its number and one line of reason, so older references still resolve. Phase numbers follow [04 — Roadmap](04-roadmap.md). Design constraints follow [07 — Threat Model](07-threat-model-and-limits.md).

---

## Epic Summary

| Epic ID | Name | Phase | Issues |
| :--- | :--- | :--- | :--- |
| **EPIC-1** | Week-1 Gates, Cryptographic Core & Sealed Format | Phase 0 | `ZMX-000` `001` `002` `003` |
| **EPIC-2** | Relay (`zeromx-relay`) | Phase 0–1 | `ZMX-004` `005` `006` `007` |
| **EPIC-3** | Device Keys & Desktop Bridge | Phase 0 | `ZMX-008` `034` `041` (dropped: `009` `010` `011`) |
| **EPIC-4** | Public Directory: Signed Log, Polkadot Hub Contract, JAM Service | Phase 0–3 | `ZMX-012` `013` `014` `015` `043` |
| **EPIC-5** | Local Copy, Search & MCP | Phase 0–1 | `ZMX-016` `018` `035` `036` (dropped: `017`) |
| **EPIC-6** | Phone App & UX Gap Closers | Phase 1 | `ZMX-019` `020` `021` |
| **EPIC-7** | Onboarding, Payments & DOT | Phase 0–2 | `ZMX-022` `023` `044` `046` (dropped: `024`) |
| **EPIC-8** | Trust Minimization & Release Integrity | Phase 0–2 | `ZMX-025` to `033` |
| **EPIC-9** | Storage & Sync (`zeromx-store`) | Phase 0–2 | `ZMX-038` `039` `040` `042` |
| **EPIC-10** | Polkadot Product & Web Client | Phase 0–2 | `ZMX-037` `045` |

---

## Detailed Issue Backlog

### EPIC-1: Week-1 Gates, Cryptographic Core & Sealed Format (`crates/zeromx-crypto`)

- **`ZMX-000` [P0 Week-1 Blocker] — Week-1 Gates: Mail-App Compatibility, Outbound Deliverability, Accept-After-Write**
  - **Scope:** Three tests before the full stack is built. (a) **Mail-app compatibility:** Apple Mail, Outlook, Thunderbird and Spark against a prototype local IMAP/SMTP server, recording which IMAP extensions each needs (`IDLE`, `UIDPLUS`, `MOVE`, `SPECIAL-USE`, `CONDSTORE`) and whether Spark accepts a localhost account at all. (b) **Outbound deliverability:** client-signed DKIM mail from relay IPs reaching the inbox at Gmail and Microsoft. (c) **Accept-after-write:** a relay that answers `451` when storage is down, and a real sending server retrying successfully.
  - **Acceptance Criteria:** A written go or no-go for each part. A compatibility table per app. Inbox placement measured over 7 days. A captured SMTP session showing `451`, the sender's retry, and the later `250`.
  - **Note:** This replaces the earlier week-1 test of sealed envelopes delivered into Gmail, which no longer gates the product.

- **`ZMX-001` [P0] — `ZeroMX/1.0` Hybrid HPKE Sealing Library**
  - **Scope:** `seal()` and `open()` using `HPKE` with the hybrid `X25519` + `ML-KEM-768` KEM, `HKDF-SHA256`, and `ChaCha20Poly1305`. Native targets first. No classical-only mode.
  - **Acceptance Criteria:** Seals and opens multipart HTML plus binary attachments up to 25 MiB; zeroes plaintext buffers on drop; test vectors published.

- **`ZMX-002` [P0] — Sealed File Container: Whole-Message Sealing, Inner Metadata, Sealer Signature**
  - **Scope:** The container in [02, section 1](02-technical-specification.md): header (version, suite, recipient key id, key epoch, sealer key id, padded length), encapsulated key, ciphertext of the whole `RFC 5322` message plus inner metadata (authentication results, spam verdict, relay id, receive time), and an `Ed25519` signature by the sealer. Time-ordered random object identifiers.
  - **Acceptance Criteria:** A raw sealed file contains no sender, subject, `Message-ID` or thread information outside the ciphertext; a file with a missing or invalid signature, or from an unregistered sealer, is rejected.
  - **Re-scoped:** was protected outer headers and a keyed thread token for Gmail threading. That outer-header scheme now exists only in the optional IMAP-mailbox adapter ([02, section 2.7](02-technical-specification.md)).

- **`ZMX-003` [P0] — Padmé Padding & Yearly Key Epochs**
  - **Scope:** Pad pre-encryption payloads with Padmé (4 KiB floor). Add the key-epoch identifier to the container and the directory record.
  - **Acceptance Criteria:** Padding overhead never exceeds 12% above the floor; property test shows padded lengths fall only on Padmé-valid sizes; a message sealed to a previous epoch still opens after rotation.

---

### EPIC-2: Relay (`crates/zeromx-relay`)

- **`ZMX-004` [P0] — Ingress Relay: Seal in RAM, Write to Storage, Accept After Write**
  - **Scope:** Async Rust SMTP server (`tokio` + `rustls`). Looks up the recipient's key and storage target in the directory, seals the message in RAM, unwraps the write-only storage credential in RAM, calls `put`, and answers `250` only after a durable acknowledgement. Answers `451` on failure or timeout and wipes. No queue. Applies delivery jitter.
  - **Acceptance Criteria:** Zero disk writes (`strace` verified); `mlockall` enabled; never answers `250` without a confirmed write under fault injection; handles 100 concurrent inbound deliveries.
  - **Re-scoped:** was "encrypt and forward over SMTP to Gmail/Outlook".

- **`ZMX-005` [P1] — Checks Before Sealing (`SPF`/`DKIM`/`DMARC` + Spam Scoring in RAM)**
  - **Scope:** Validate sender authentication and score spam in RAM before sealing. Refuse high-confidence spam with `550`. Put the verdict and authentication results inside the ciphertext so the device files the message.
  - **Acceptance Criteria:** Spoofed `DMARC=reject` mail is refused at SMTP; the verdict is not visible to the storage host; a legitimate `DKIM=pass` message carries its verification summary inside the sealed file.

- **`ZMX-006` [P0] — Egress Relay with Client-Side DKIM**
  - **Scope:** The client generates an RSA-2048 DKIM key on the device, publishes the selector (`zmx1._domainkey.<userdomain>`), and signs every outbound message. Egress accepts the encrypted submission with a per-account quota token, unwraps in RAM, and delivers the signed bytes unmodified.
  - **Acceptance Criteria:** External Gmail and Outlook recipients see `DKIM=PASS` and `DMARC=PASS` aligned with `@yourdomain.com`; the relay image contains no code path that can produce a DKIM signature.

- **`ZMX-007` [P1] — Reproducible Nix Relay Image for AMD SEV-SNP & Intel TDX**
  - **Scope:** Package `zeromx-relay` via `flake.nix` into a deterministic confidential VM image with in-enclave ACME TLS key generation, push previews and the wake channel.
  - **Acceptance Criteria:** Two independent machines running `nix build` produce identical SHA-384 measurements.

---

### EPIC-3: Device Keys & Desktop Bridge (`crates/zeromx-bridge`)

- **`ZMX-008` [P0] — Key Hierarchy & Hardware-Backed Keystore**
  - **Scope:** Root secret generated on the first device and held in the OS hardware-backed keystore (Secure Enclave, TPM, Android Keystore). `HKDF` subkeys for the mailbox, state, local store, owner and quota identities ([02, section 5.1](02-technical-specification.md)). Optional unlock or derivation through `WebAuthn PRF` where the platform supports it.
  - **Acceptance Criteria:** A user creates and unlocks keys with Touch ID or the platform equivalent and types no passphrase; the root secret never leaves the device unwrapped.
  - **Re-scoped:** was the Manifest V3 extension skeleton plus passkey vault. The extension part is dropped.

- **`ZMX-009` [Dropped] — Cross-Origin Decryptor Frame for Gmail Web & Outlook Web**
  - **Reason:** Sealed mail is no longer stored in or read through a webmail page. The Bridge serves the mail app instead.

- **`ZMX-010` [Dropped] — Isolated Composer & Sent-to-Self Copies in Webmail**
  - **Reason:** Drafts are written in the user's mail app and sealed by the Bridge on the device. Sent copies are written straight to storage by the device (`ZMX-034`).

- **`ZMX-011` [Dropped] — Fallback Vault Reader Tab in the Extension**
  - **Reason:** There is no extension and no webmail markup to break.

- **`ZMX-034` [P0 for alpha] — ZeroMX Bridge: Local IMAP/SMTP Server for Desktop Mail Apps**
  - **Scope:** Rust daemon for macOS and Linux (Windows in Phase 1) that listens only on `127.0.0.1` with TLS and per-install credentials. Serves the local copy over IMAP with real headers, turns flags, moves and deletions into state-log operations, seals every draft and sent copy before it goes to storage, answers IMAP `SEARCH` from the local index, and accepts SMTP submission (end-to-end seal for ZeroMX recipients, client-side `DKIM`, egress relay for the rest). Checks for full-disk encryption at setup. Spec in [02, section 5.3](02-technical-specification.md).
  - **Acceptance Criteria:** Apple Mail, Outlook for Mac and Thunderbird each read, thread, search and reply. A capture of all traffic leaving the machine shows no plaintext body, subject, sender or draft. Two computers running their own Bridge converge on the same mailbox state through storage alone.
  - **Re-scoped:** was P0 for the beta and read sealed envelopes from a Gmail vault over IMAP.

- **`ZMX-041` [P0] — Device Pairing & Recovery Kit**
  - **Scope:** Add a device by QR code with an ephemeral key and a short code compared on both screens. Split the root secret into a 2-of-3 Shamir set: a device, a printable recovery kit, and an optional share held by a person or service the user chooses. Lost-device flow: rotate storage credentials and the key epoch from another device.
  - **Acceptance Criteria:** A second computer is paired in under one minute; a mailbox is restored from the kit plus one other share with no ZeroMX server involved; a device removed by rotation receives no mail sealed afterwards.

---

### EPIC-4: Public Directory (`crates/zeromx-directory`, `crates/zeromx-attest`)

- **`ZMX-012` [P0] — Directory Data Model, Adapter Interface & Signed-Log Adapter**
  - **Scope:** `KeyRecord`, operator registry and measurement allowlist with the transitions in [02, section 3.2](02-technical-specification.md) (`PublishKey`, `AttestOperator`, `UpdateAllowlist`). One adapter interface with two implementations: the signed append-only Merkle log (this issue) and the Polkadot Hub contract (`ZMX-043`). One conformance suite both must pass.
  - **Acceptance Criteria:** Rejects an unauthorized key rotation; exposes compact inclusion and consistency proofs; the conformance suite runs in CI against every adapter.
  - **Re-scoped:** was "JAM service state and key transparency log". The JAM service is now the third adapter, built when its gates open.

- **`ZMX-013` [P0] — Directory Verifier in the Clients + Automatic `ZeroMX <-> ZeroMX` Upgrade**
  - **Scope:** In the shared Rust core: verify recipient key records against the directory (proofs against signed tree heads for the log; a light client or two agreeing RPC endpoints for the Hub contract). Upgrade outbound mail to device-to-device encryption when the recipient is in the directory.
  - **Acceptance Criteria:** A directory that serves a substituted key or a forked head is detected and the send is blocked; `ZeroMX <-> ZeroMX` mail is encrypted to the recipient's key on the device.

- **`ZMX-014` [P1] — `no_std` AMD SEV-SNP & Intel TDX Quote Verifier (Native and PVM)**
  - **Scope:** Verify CPU attestation chains and check the measurement against the allowlist. One crate, compiled to native for off-chain witnesses, to PVM for the Polkadot Hub contract, and later for JAM `Refine`. Checks vendor collateral freshness against chain time.
  - **Acceptance Criteria:** Modified or unattested relay binaries fail verification deterministically; stale collateral is rejected; the same test vectors pass on native and on PVM.

- **`ZMX-015` [P1, Phase 3] — Rate-Limiting Nullifier (`RLN`) Anti-Spam Verifier**
  - **Scope:** Client prover and batch verifier enforcing per-epoch anonymous outbound quotas, with automatic secret recovery and slashing on a quota breach.
  - **Acceptance Criteria:** An honest sender stays unlinkable; exceeding the epoch limit reveals the secret share and slashes the stake.

- **`ZMX-043` [P1] — Directory Contract on Polkadot Hub**
  - **Scope:** The second directory adapter: a PVM contract (`pallet-revive`) holding the key directory, operator registry and allowlist. Testnet mirror of the signed log in the alpha, mainnet in the beta. Updates are signed by the user's owner key and fees are paid by the service on the user's behalf, so no wallet is needed to receive mail. Attestation results are co-signed by witnesses until the verifier fits a contract call (`ZMX-033`).
  - **Acceptance Criteria:** Passes the `ZMX-012` conformance suite; a user with no wallet publishes and rotates a key; clients read it through two independent RPC endpoints and refuse on disagreement.

---

### EPIC-5: Local Copy, Search & MCP (`crates/zeromx-store`, `crates/zeromx-mcp`)

- **`ZMX-016` [P0] — Encrypted Local Copy & `SQLite FTS5` Index**
  - **Scope:** Native `SQLite` with `FTS5`, encrypted under the `local-store` key, plus the sealed files on disk. Indexes sender, recipients, subject, body and attachment filenames. One Rust core shared by the Bridge, the phone app and `zeromx-mcp`.
  - **Acceptance Criteria:** Keyword search across 10,000 messages completes in under 10 ms offline; the database file is unreadable without the device key.
  - **Re-scoped:** was `SQLite` compiled to WebAssembly inside the browser extension.

- **`ZMX-017` [Dropped] — Encrypted Index Delta Sync Between Devices**
  - **Reason:** Every desktop device holds the full mailbox and builds its own index. There is no index to sync. State sync is `ZMX-040`.

- **`ZMX-018` [P0 for beta] — `zeromx-mcp` Local MCP Server for Personal AI Agents**
  - **Scope:** `stdio` / localhost MCP server over the local copy (`search_messages`, `get_thread`, `create_draft`, `extract_calendar_events`) with per-tool consent. Never sends without a click.
  - **Acceptance Criteria:** Claude Desktop and Cursor can summarize threads and stage draft replies locally; the consent screen states that what the agent does with the text is governed by that agent.

- **`ZMX-035` [P1] — Gmail-Style Search Operators over the Local Index**
  - **Scope:** Parser for `from:`, `to:`, `cc:`, `subject:`, `has:attachment`, `filename:`, `before:`/`after:`/`older_than:`/`newer_than:`, `larger:`/`smaller:`, `label:`, `in:`, `is:unread`/`is:starred`, `OR`, `-`, quoted phrases and parentheses, mapped to `FTS5` `MATCH` plus metadata filters. Shared by the Bridge (IMAP `SEARCH`), the phone app and `zeromx-mcp`. Then attachment text extraction for PDFs.
  - **Acceptance Criteria:** A test suite of real Gmail queries returns the same message set as Gmail does on an identical plaintext corpus. Queries over 50,000 messages answer in under 50 ms on a mid-range laptop.

- **`ZMX-036` [P2] — Optional On-Device Semantic Search**
  - **Scope:** Opt-in local embedding index next to `FTS5`, and natural-language queries translated to operators by a local model. Nothing leaves the device. Disabled by default on hardware below a measured threshold.
  - **Acceptance Criteria:** Published recall numbers on a labeled query set against keyword-only search; a network capture shows no outbound traffic during indexing or querying.

---

### EPIC-6: Phone App & UX Gap Closers (`apps/mobile`)

- **`ZMX-019` [P0 for beta] — ZeroMX App with Relay-Sealed Push Previews (iOS first, then Android)**
  - **Scope:** Native app over the shared Rust core with a notification service extension. Ingress seals a preview (sender, subject, first line, hash of the sealed file) to a device-bound notification key and sends it through the platform push service. The app syncs through the same storage adapter and state logs as the Bridge, keeps headers for everything and bodies for recent mail, and fetches the rest on demand.
  - **Acceptance Criteria:** A notification shows the real sender and subject with the app closed; the push gateway sees ciphertext only; a notification for a file that is missing from storage raises an alert; tapping opens the thread in under 1.5 s.

- **`ZMX-020` [P1] — One-Click `.ics` Calendar Invites in the ZeroMX App**
  - **Scope:** Parse `text/calendar` parts of decrypted mail in the phone app, show a meeting card, and offer a one-click add to the device calendar. Desktop mail apps handle invites themselves.
  - **Acceptance Criteria:** Invites add with timezone and conferencing links preserved.

- **`ZMX-021` [P2] — Old-Address Migration Helper**
  - **Scope:** A checklist of accounts still using the old address, built from the imported mailbox's senders, with guided change of address and optional forwarding from the old provider. States that the old provider still reads what it forwards ([07, L3](07-threat-model-and-limits.md)).
  - **Acceptance Criteria:** A user sees which senders still write to the old address and how many have moved.
  - **Re-scoped:** was a selective-encryption policy plus an at-rest sweeper for a Gmail mailbox. Both are dropped: all mail to the domain is sealed, and there is no provider mailbox to sweep.

---

### EPIC-7: Onboarding, Payments & DOT

- **`ZMX-022` [P1] — Custom Domain Wizard, DNS Connect & Storage Choice**
  - **Scope:** Guided onboarding that configures `MX`, `SPF`, the client `DKIM` selector and the `_zeromx` TXT record through Cloudflare OAuth or Domain Connect, with a health-check verifier. One screen to choose ZeroMX Storage or connect a bucket, including creation of the two credentials.
  - **Acceptance Criteria:** A non-technical custom-domain owner completes setup in under 3 minutes with ZeroMX Storage; a technical user connects their own bucket in under 10.

- **`ZMX-023` [P2, Phase 2] — Stake-to-Use Through a Nomination Pool**
  - **Scope:** A ZeroMX nomination pool whose rewards pay for the staker's plan while the principal stays the user's. Required stake recomputed each era from current yield. Legal review per market before launch ([03, Model B](03-business-model.md)).
  - **Acceptance Criteria:** Principal is fully recoverable after the unbonding period; the site states the yield, price and slashing risks next to the offer.

- **`ZMX-024` [Dropped] — Nightly Playwright Canary Against Live Gmail & Outlook Web**
  - **Reason:** There is no webmail markup to monitor. Its role is taken by the mail-app compatibility matrix in [05, section 4](05-development-plan.md).

- **`ZMX-044` [P1–P2] — dotUSD Payment & DOT Operator Bonds**
  - **Scope:** (a) Phase 1: accept subscription payment in dotUSD next to card, if dotUSD is live. (b) Phase 2: operator bonds in DOT recorded in the directory, with forfeiture for downtime or a failed attestation, and operator payouts from subscription revenue.
  - **Acceptance Criteria:** A user pays a yearly plan in dotUSD without ZeroMX holding their keys; an operator without the required bond cannot be admitted; a bond forfeiture is visible in the directory.

- **`ZMX-046` [P2, Phase 1] — Trial Addresses on a Shared Domain**
  - **Scope:** Let a person without a domain try the product with an address on a ZeroMX-run domain. The address is labeled as a trial in every client, with the limit from [07, L9](07-threat-model-and-limits.md) shown: whoever administers the domain can redirect future mail. Outbound volume is capped and sent from a separate IP pool, so abuse cannot hurt custom-domain senders. One step moves the mailbox, keys and storage to a domain registered in the user's name (`ZMX-031`).
  - **Acceptance Criteria:** A trial user moves to their own domain without re-importing or re-keying; the trial label and its limit are visible before the first message is sent; a blocklisting of the trial pool does not affect custom-domain deliverability.

---

### EPIC-8: Trust Minimization & Release Integrity

- **`ZMX-025` [P0] — SMTP Path Pinning: MTA-STS, DANE, TLS-RPT**
  - **Scope:** Onboarding publishes and verifies an MTA-STS `enforce` policy, DANE `TLSA` records pinned to relay keys, and TLS-RPT for every user domain. Relay key rotation updates the records.
  - **Acceptance Criteria:** A test sender that validates MTA-STS refuses delivery to an MX presenting any other certificate; TLS-RPT failures surface in the client.

- **`ZMX-026` [P0] — Relay Signatures & Per-Message Provenance in the Clients**
  - **Scope:** Relays sign each sealed file with a key bound to their attestation. The client verifies it and shows which relay sealed the message.
  - **Acceptance Criteria:** A file sealed by an unregistered key is discarded or shown as unverified; canary messages detect an unattested MX path within one hour.

- **`ZMX-027` [P0] — Storage Leak Audit Tool**
  - **Scope:** CLI that scans a raw dump of a bucket and reports any object exposing plaintext, a sender, a subject or a `Message-ID`, or any metadata beyond what [02, section 1.2](02-technical-specification.md) lists.
  - **Acceptance Criteria:** Runs in CI against the test bucket; shipped to users as a verification tool.

- **`ZMX-028` [P1] — Witnesses for the Signed Log & for Attestation Results**
  - **Scope:** Independent witnesses co-sign log tree heads and re-run relay quote verification off-chain, co-signing the result. Used with the signed log in the alpha and with the Hub contract until on-chain verification is possible.
  - **Acceptance Criteria:** Clients reject tree heads and attestation results without a witness quorum; a split-view attack is detected by gossip between two clients.

- **`ZMX-029` [P1] — Reproducible Client Builds & Two-Party Release Signing**
  - **Scope:** Deterministic builds of the Bridge and the apps; releases require matching outputs from two independent builders; delayed auto-update with public diff.
  - **Acceptance Criteria:** A third party reproduces the published Bridge package byte for byte from the tag.

- **`ZMX-030` [P1] — Operator Admission & Attestation-of-Location**
  - **Scope:** Admission record proving the operator has no physical access to its hosts; public operator list; revocation path for measurements and operators.
  - **Acceptance Criteria:** A valid quote from a host without an admission record is rejected; revocation reaches clients within one epoch.

- **`ZMX-031` [P1] — In-Flow Domain Registration**
  - **Scope:** Register a domain in the user's own name during onboarding, with registrar lock and DNSSEC, and configure all records automatically.
  - **Acceptance Criteria:** A user with no domain reaches a working sealed mailbox in under 10 minutes.

- **`ZMX-032` [P1] — Private Key Lookups**
  - **Scope:** The client must not reveal which recipient it is looking up to the node that serves directory data. Hash-prefix bucket fetches with local filtering, with compact snapshot sync for small directories. Evaluate an oblivious relay.
  - **Acceptance Criteria:** A directory server's logs cannot distinguish a lookup for one address from at least 1,000 others; documented in [02, section 3.3](02-technical-specification.md).

- **`ZMX-033` [P1] — Benchmark the Attestation Verifier on PVM & Confirm Light-Client Proofs for Contract Storage**
  - **Scope:** Compile the `no_std` SEV-SNP and TDX verifier to PVM. Measure instruction counts and run it as a contract on a Polkadot Hub testnet. Confirm whether Smoldot can prove the `pallet-revive` contract storage the client reads.
  - **Acceptance Criteria:** Published numbers for one SEV-SNP chain and one TDX quote; a written answer on whether attestation is checked on-chain before JAM, and on whether clients can drop the two-RPC cross-check.
  - **Priority raised** from P2: the beta directory depends on the answer.

---

### EPIC-9: Storage & Sync (`crates/zeromx-store`)

- **`ZMX-039` [P0] — Storage Adapter Interface, ZeroMX Storage & S3-Compatible Adapter**
  - **Scope:** The four-operation interface (`put` create-only, `get`, `list(prefix, after)`, `delete`) and the layout in [02, section 2.1](02-technical-specification.md). ZeroMX Storage with capability tokens. The S3-compatible adapter for a bucket the user brings. The write-only relay credential, limited to `in/`, wrapped to the attested keys of the user's relays and stored in the directory record. Optional second storage target.
  - **Acceptance Criteria:** With a relay credential, `get`, `list`, overwrite, `put` outside `in/` and `delete` all fail, on every adapter; a leaked relay credential produces only junk that clients discard; rotating the credential takes one action on a device.

- **`ZMX-040` [P0] — State Sync: Per-Device Sealed Logs, Merge Rule, Snapshots, Rollback Detection**
  - **Scope:** The operations and merge rule in [02, section 2.5](02-technical-specification.md): hybrid logical clocks, highest-clock-wins per field, add-wins label sets, tombstones. Hash-chained logs, sealed snapshots with acknowledgement before compaction, opaque wake-ups plus polling, and real deletion of sealed files.
  - **Acceptance Criteria:** Property tests show every device converges whatever the order of arrival; a log that goes backwards or forks is reported as a storage rollback; no two writers ever write the same object.

- **`ZMX-042` [P0] — Import over IMAP & Export to Maildir / mbox**
  - **Scope:** On the device: read an existing mailbox over IMAP (or Maildir / mbox), seal each message under `own/`, and record folder and flag state. Export the local copy to Maildir or mbox with no server involved. Change of storage host by re-upload from a device.
  - **Acceptance Criteria:** A 20,000-message Gmail mailbox imports with folders and flags intact and resumes after interruption; an exported Maildir opens in a standard mail app; the mailbox moves to a new bucket with the address and keys unchanged.

- **`ZMX-038` [P2, Phase 2, gated] — Experimental Levity Arrival-Box Adapter**
  - **Scope:** A storage adapter for Polkadot's Bulletin Chain used as an arrival box only: relays write sealed files, devices fetch them within the retention period and keep them locally or copy them to another target. Chunking for large messages. Opt-in, with the sentence from [07, L8](07-threat-model-and-limits.md) shown to the user.
  - **Gates:** Levity mainnet, a relay authorization path, and shown demand.
  - **Acceptance Criteria:** A written assessment of the mainnet authorization and capacity model before any code ships; no message is lost when a device stays offline for less than the retention period.

---

### EPIC-10: Polkadot Product & Web Client (`apps/product`)

- **`ZMX-037` [P0 spike, Phase 0] — Polkadot Product Spike**
  - **Scope:** Build a minimal ZeroMX Product on the Products devnet and answer, in writing: (1) can a Product hold or derive decryption keys safely inside the host sandbox; (2) can a Product run in the background or receive notifications; (3) what storage may a Product reach; (4) can a third-party app use Proof of Personhood without sending the user through the Polkadot app.
  - **Acceptance Criteria:** A written go or no-go on shipping the Product as a mail client, as onboarding and settings only, or not at all, and on whether the free tier can be offered. Nothing about the Product or the free tier is promised publicly before this exists.

- **`ZMX-045` [P2, Phase 2] — Pinned Web Client**
  - **Scope:** A browser mail client shipped only where the code is pinned: as a Polkadot Product loaded through a `.dot` name whose content hash is recorded on Polkadot Hub, or as an installed app. Uses the shared core compiled to WebAssembly.
  - **Acceptance Criteria:** The bundle a user runs matches the hash in the public record; a changed bundle is visible as a change to that record; the same account works unchanged in the Bridge and the phone app.
