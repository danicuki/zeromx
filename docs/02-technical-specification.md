# 02 — Detailed Technical Specification

> Trust assumptions and known limits for everything below are defined in [07 — Threat Model, Trust Boundaries & Known Limits](07-threat-model-and-limits.md).

## 1. Sealed Message Format (`ZeroMX/1.0`)

A sealed message is one opaque file. The whole original `RFC 5322` message, with every header, is inside the ciphertext. Nothing about the sender, the subject or the thread is outside it.

```text
sealed file  =  header  ||  HPKE encapsulated key  ||  AEAD ciphertext  ||  signature

header       =  version, suite id, recipient key id, key epoch,
                sealer key id (relay or device), padded length
ciphertext   =  AEAD( Padme( original RFC 5322 message || inner metadata ) )
inner meta   =  authentication results (SPF / DKIM / DMARC), spam verdict,
                receiving relay id, receive time
signature    =  Ed25519 over everything before it, by the sealer's key
```

### 1.1 Cipher Suite & Post-Quantum Readiness

- **Only suite (v1.0):** `HPKE` (`RFC 9180`) Base Mode with a **hybrid post-quantum KEM**
  - **KEM:** `X25519` + `ML-KEM-768` hybrid (X-Wing construction)
  - **KDF:** `HKDF-SHA256`
  - **AEAD:** `ChaCha20Poly1305`
- **Why hybrid is mandatory from day one:** sealed files sit in storage for years, and on some storage options anyone can copy them ([07, L8](07-threat-model-and-limits.md)). "Harvest now, decrypt later" is the default case. There is no classical-only mode to downgrade to.
- **Key epochs:** the mailbox key pair rotates yearly. Old private keys stay on the user's devices to read old mail. A stolen key opens one epoch, not the whole archive. Stored mail has no forward secrecy beyond this.
- **Signature:** every sealed file carries an `Ed25519` signature from the sealing relay's attested signing key, or from the sender's device for Tier 1 and for files the user's own devices write. Clients discard files with no valid signature from a registered sealer.

### 1.2 What Is Outside the Ciphertext

| Visible to the storage host | Why |
| :--- | :--- |
| Object name: a time-ordered random identifier | Devices list new files in order. The name carries the arrival time, which the host sees anyway. |
| Padded size | Unavoidable for a store. |
| Recipient key id and key epoch | Devices need them to pick the key. They are the same for every message in a mailbox. |
| Sealer key id | Lets a client reject junk before decrypting. It reveals which relay or device wrote the file. |

The sender, subject, `Message-ID`, thread, body, attachments and spam verdict are all inside. Threading is done on the device from the real headers.

### 1.3 Traffic-Analysis Resistance

- **Padmé padding:** before AEAD encryption the payload is padded with the Padmé scheme, with a `4 KiB` floor. Overhead is at most about 12% and shrinks with size, and the padded length leaks only $O(\log \log n)$ bits. Power-of-four buckets were rejected: they waste up to 4x storage.
- **Delivery jitter:** relays apply a randomized delay ($50\text{ ms} \le \Delta t \le 1500\text{ ms}$, configurable per domain) before writing to storage, so an observer of both the relay's network and the storage cannot match messages by exact timing.
- **Not claimed:** resistance to a global observer, or hiding how often a mailbox receives mail from its storage host.

---

## 2. Storage & Sync (`crates/zeromx-store`)

### 2.1 Layout

Storage is a flat key-value object store. Every object is a sealed file.

```text
<mailbox>/
├── in/<id>            sealed messages written by relays (immutable)
├── own/<id>           sealed messages written by the user's devices: sent copies, imports
├── state/<device>/<seq>   sealed operation log, one per device (append-only)
├── snap/<epoch>/<n>   sealed state snapshots, written by devices to bound replay time
└── draft/<id>         sealed drafts (replaced or deleted by devices)
```

`<id>` is a 128-bit identifier whose first 48 bits are a millisecond timestamp, so a device lists what is new with one `list(after = last seen)` call.

### 2.2 Adapter Interface

A storage adapter implements four operations and nothing else:

| Operation | Used by |
| :--- | :--- |
| `put(key, bytes)` with create-only semantics | Relays (only under `in/`), devices |
| `get(key)` | Devices |
| `list(prefix, after)` | Devices |
| `delete(key)` | Devices |

Adapters shipped first: **ZeroMX Storage** and **S3-compatible**. Planned: WebDAV, an existing IMAP mailbox (section 2.7), Polkadot Levity (section 2.8). The interface is small on purpose, so a third party can write an adapter in a day.

### 2.3 Credentials: Relays Can Only Add

- **Devices** hold a full-access credential for the mailbox prefix.
- **Relays** get a **write-only credential limited to `in/`**. For an S3-compatible bucket this is an access key with a policy that allows only `PutObject` on that prefix. For ZeroMX Storage it is a capability token with the same scope.
- The write-only credential is stored in the user's directory record **wrapped to the attested keys of the relays the user listed**. A relay unwraps it in encrypted RAM for the duration of a delivery and never persists it. When the relay set or the measurement allowlist changes, a device re-wraps it.
- **If the write-only credential leaks,** the holder can add junk files. It cannot read, list, overwrite or delete. Junk carries no valid signature from a registered relay, so devices discard it. The user then rotates the credential.

### 2.4 Delivery Semantics

1. The relay seals the message in RAM.
2. It calls `put` on the user's storage and waits for a durable acknowledgement.
3. Only then does it answer `250` to the sending server.
4. If the write fails or times out, it answers `451` and wipes the message. The sending server retries by its own schedule, typically for 4 to 5 days.

The relay therefore has **no queue, no disk, and no window in which it is the only holder of a message**. The cost is that a storage outage longer than the sender's retry window bounces mail. ZeroMX Storage is run for availability with that in mind, and a user-run bucket on a home server should have a second target (section 2.6).

### 2.5 State Sync

Messages never change. Everything that changes is state, and state is a set of per-device logs.

- **Operations:** `set-flags(msg, flags)`, `move(msg, folder)`, `label(msg, +/-label)`, `delete(msg)`, `put-draft`, `drop-draft`, `folder-create/rename/delete`, `rule-set`. Each carries a hybrid logical clock and the device id.
- **Each device appends only to its own log.** No two writers ever touch the same object, so plain object storage needs no locking.
- **Merge rule:** per message and per field, the operation with the highest clock wins, with the device id as tie-breaker. Label changes are add-wins sets. Deletion is a tombstone. The result is the same on every device whatever the order of arrival.
- **Encryption:** logs and snapshots are sealed with a symmetric key derived from the root secret (`AEAD`, same padding rule).
- **Integrity:** each log entry includes the hash of the previous entry. A device that sees its own or another device's log go backwards or fork reports a storage rollback. The latest log heads can optionally be anchored in the directory record.
- **Missing mail:** push previews and wake-ups carry the hash of the sealed file. A device that was told about a file that is not in storage raises an alert.
- **Snapshots:** any device may write a sealed snapshot of merged state and then delete log entries older than the snapshot, after all known devices have acknowledged it.
- **Wake-ups:** after a write, a relay (for mail) or a device (for state) sends an opaque "changed" hint through a relay notification channel. Devices also poll, so a lost hint only delays sync.

This is the model used by local-first note applications that sync through a dumb file store. It gives IMAP-style multi-device state with no server that understands mail.

### 2.6 Redundancy & Moving

- A directory record may list **two storage targets**. The relay writes to both before answering `250`.
- Every desktop device holds the full set of sealed files. Changing storage host is: write the new target in the directory record, let one device upload its copy, remove the old target.
- **Deletion is real.** When the user deletes a message and the snapshot covering it is acknowledged, devices delete the sealed file from storage.

### 2.7 Compatibility Adapter: An Existing IMAP Mailbox

For people who want sealed mail to sit in a mailbox they already have:

- The relay wraps the sealed file in a `multipart/encrypted` MIME shell and delivers it over SMTP to the mailbox.
- Outer headers are rewritten so the host learns nothing: outer `From` is an opaque relay address, outer `Subject` is a keyed thread token, and `Message-ID` / `References` are replaced by `HMAC-SHA256(K_thread, original_id)` so the host's own threading still groups conversations. Real headers stay inside.
- The Bridge reads the mailbox over IMAP and keeps state in sealed objects in a dedicated folder.
- **Why it is not the default:** the mailbox host can spam-folder, throttle or block relay deliveries, and reading over IMAP at Gmail needs an app password or a restricted OAuth scope with a yearly assessment. Reading sealed mail inside the Gmail web page would need a browser extension that depends on Gmail's markup. That extension is not planned unless demand is shown.

### 2.8 Experimental Adapter: Polkadot Levity (Bulletin Chain)

- **Fit:** an arrival box. Relays write sealed files, devices fetch them within the retention period and keep them locally or copy them to another target.
- **Constraints as documented in November 2026:** testnet only, retention of about two weeks unless renewed, a transaction limit of a few MiB with larger files chunked, write access granted by authorization, and reads open to anyone who knows the content identifier.
- **Consequence:** ciphertext stored there must be treated as public forever. It is acceptable only because the suite is hybrid post-quantum and keys rotate, and it is offered only as an opt-in with that sentence shown to the user.
- **Not suitable** as the long-term archive at current capacity. See [08, section 5](08-why-polkadot-jam.md).

---

## 3. Control Plane: The Public Directory (`crates/zeromx-directory`)

One data model, three deployments.

| Stage | Deployment | What the client verifies |
| :--- | :--- | :--- |
| **Alpha** | An append-only Merkle log signed by the ZeroMX team, mirrored to a contract on a Polkadot Hub testnet | Inclusion and consistency proofs against signed tree heads |
| **Public beta** | **A contract on Polkadot Hub** (PVM, `pallet-revive`). Attestation quotes are checked off-chain by independent witnesses who co-sign, and on-chain once the verifier fits a contract call ([`ZMX-033`](06-backlog-and-issues.md)) | Contract state through a light client where storage proofs are available, otherwise through two independent RPC endpoints that must agree |
| **Target** | **A Polkadot JAM service.** `Refine` does the heavy stateless verification (x509/ASN.1 AMD SEV-SNP and Intel TDX quotes, later `RLN` proofs) in `no_std` Rust on the PVM, and `Accumulate` applies small state updates | JAM state through a JAM light client when one exists |

The JAM stage has two external gates that are tracked as risks, not assumed: JAM mainnet, and a JAM light client usable from an application. Nothing before that stage depends on either. See [08](08-why-polkadot-jam.md).

### 3.1 State

```rust
pub struct ZeroMxDirectoryState {
    /// Append-only key transparency log:
    /// blake2b_256(normalized_address_or_domain) -> KeyRecord
    pub key_directory_root: Hash256,

    /// Admitted ingress and egress relays: operator, bond,
    /// enclave measurement, attested keys, IP/ASN diversity metadata
    pub operator_registry: Map<OperatorId, OperatorRecord>,

    /// Approved reproducible relay measurements, changed only through a public timelock
    pub allowed_enclave_measurements: BTreeSet<[u8; 48]>,

    /// Roots of rate-limiting identity commitments (permissionless phase)
    pub rln_epoch_roots: RingBuffer<Hash256, 64>,
}

pub struct KeyRecord {
    pub mailbox_key: HybridPublicKey,        // X25519 + ML-KEM-768
    pub key_epoch: u32,
    pub owner_key: PublicKey,                // signs every update to this record
    pub relays: Vec<OperatorId>,             // relays the user accepts mail from
    pub storage: Vec<StorageTarget>,         // endpoint + wrapped write-only credential
    pub state_heads: Option<Hash256>,        // optional anti-rollback anchor
}
```

A `KeyRecord` contains no private key, no mail, and no plaintext credential. The storage endpoint is public by necessity: relays must know where to write.

### 3.2 State Transitions

| Transition | Verification | Effect |
| :--- | :--- | :--- |
| **`PublishKey`** | Owner signature, plus a DNSSEC `TXT` ownership proof (`_zeromx.yourdomain.com`) or a recovery quorum | Appends a new `KeyRecord`. Old records stay in the log, so a silent key substitution is visible. |
| **`AttestOperator`** | AMD `SEV-SNP` report (ARK -> ASK -> VCEK, ECDSA P-384) or Intel `TDX` DCAP quote, measurement in the allowlist, vendor collateral inside its validity window, and the operator's admission record | Registers or refreshes the relay for the next epoch and locks the operator bond. |
| **`UpdateAllowlist`** | Governance signature and elapsed timelock | Adds or revokes a relay measurement. |
| **`VerifyEgressBatch`** *(permissionless phase)* | Batch of anonymous `RLN` proofs for an epoch | Credits the relay. A duplicate nullifier reveals a spammer's secret and slashes their stake. |

`AttestOperator` also checks the operator's **admission record**: evidence that the operator has no physical access to the host. A valid quote alone is not sufficient, because attestation keys can be extracted by an attacker with physical access ([07, section 4](07-threat-model-and-limits.md)).

Until the permissionless phase, outbound abuse control is a **signed per-account quota token** issued by the account service and checked inside the egress relay. It is simpler than `RLN` and sufficient while every account is tied to a payment, a stake, or a proof of personhood.

### 3.3 Private Lookups

A client must not ask a server for one recipient's key, because that reveals who it is about to write to. Clients sync compact directory snapshots or fetch by hash-prefix bucket and filter locally ([`ZMX-032`](06-backlog-and-issues.md)).

---

## 4. Relay Daemon (`crates/zeromx-relay`)

Memory-safe Rust (`tokio` + `rustls`), built deterministically with Nix into a minimal image booted inside an `AMD SEV-SNP` or `Intel TDX` confidential VM.

1. **No persistent storage.** The root filesystem is a read-only measured image in RAM. Swap and core dumps are disabled. `mlockall(MCL_CURRENT | MCL_FUTURE)` is enforced.
2. **Keys are born in the enclave.** On boot the daemon generates its TLS key (`ACME TLS-ALPN-01` inside the VM), signing key and `HPKE` key in encrypted RAM and submits its attestation quote to the directory. The host OS cannot extract them.
   - **Sender-side pinning and DANE rollover:** a public CA certificate does not stop whoever controls the MX hostname's DNS from obtaining their own. Each user domain publishes **DNSSEC**, **MTA-STS (`enforce`)** and **TLS-RPT**, and the DNSSEC-signed relay zone publishes **DANE `TLSA`** records pinned to relay keys. To avoid DANE failures across a reboot, relay TLS keys are either derived by hardware sealing bound to the measurement (`SNP_GET_DERIVED_KEY`) or rolled with `current + standby` `TLSA` records staged two TTLs ahead. See [07, section 5](07-threat-model-and-limits.md).
   - **No long-term user secrets.** The relay holds no per-domain key. Outbound DKIM is signed by the client (RSA-2048, because major receivers do not verify Ed25519 DKIM), and the relay forwards the signed bytes unmodified.
3. **Checks before sealing (in RAM).** `SPF`, `DKIM`, `DMARC` and `ARC` validation, then lightweight spam scoring (`mail-auth` plus embedded rules). High-confidence spam is refused at SMTP `DATA` with `550`. Everything else is sealed with its verdict inside the ciphertext, and the device files it. This is weaker than a large provider's filter, which learns from billions of mailboxes.
4. **Seal, write, acknowledge, wipe.** Section 2.4. All plaintext buffers implement `zeroize::ZeroizeOnDrop`.
5. **Notification preview.** The relay seals a short preview (sender, subject, first line, hash of the sealed file) to the mailbox's device-bound notification keys and hands it to the platform push service. The push gateway sees ciphertext and timing only. Payloads stay under the 4 KB platform limit.
6. **Wake channel.** Devices hold a connection on which the relay sends opaque "changed" hints. The channel carries no mail.
7. **Egress.** Accepts a message encrypted to the relay's attested key with a quota token, unwraps it in RAM, delivers the client-signed bytes over TLS to the recipient's MX, and wipes.

---

## 5. Clients

### 5.1 Key Hierarchy

PGP failed with ordinary people largely because of key management. In ZeroMX the user never sees a key.

```text
Root secret (256 bits, generated on the first device, never leaves a device unwrapped)
   ├── HKDF("zeromx/v1/mailbox")      -> X25519 + ML-KEM-768 private key, per epoch
   ├── HKDF("zeromx/v1/state")        -> AEAD key for state logs, snapshots and drafts
   ├── HKDF("zeromx/v1/local-store")  -> encryption key for the local copy and index
   ├── HKDF("zeromx/v1/owner")        -> key that signs directory updates
   ├── HKDF("zeromx/v1/rln-identity") -> outbound quota secret (permissionless phase)
   ├── wrap(DKIM RSA-2048 key)        -> client-side outbound DKIM
   └── wrap(notification key, per device) -> push preview decryption
```

- **Where the root secret lives.** In the operating system's hardware-backed keystore (Secure Enclave, Android Keystore, TPM), released by biometrics or the device passcode. Where the platform supports the `WebAuthn PRF` extension, a passkey can derive or unwrap it instead, which lets a hardware security key hold the root.
- **Adding a device.** The new device shows a QR code with an ephemeral public key. An existing device scans it, the user compares a short code on both screens, and the existing device sends the root secret sealed to the new one.
- **Recovery.** At onboarding the root secret is split into a 2-of-3 Shamir set: a device, a printable recovery kit, and an optional share held by a person or service the user chooses. Without two of them nobody can recover the mailbox, including ZeroMX.
- **Losing a device.** The user rotates the storage credentials and the key epoch from another device. New mail is sealed to the new key. Mail the lost device already downloaded is protected only by that device's own lock and disk encryption ([07, L6](07-threat-model-and-limits.md)).
- **Passkey providers matter.** A synced passkey is only as private as its sync provider's encryption. Onboarding states the trade-off when the user chooses one.

### 5.2 Local Copy & Local Search

- **Store:** native `SQLite` with `FTS5`, encrypted with the `local-store` key, plus the sealed files themselves on disk. Shared by the Bridge, the ZeroMX app and `zeromx-mcp` through one Rust core.
- **Every desktop device indexes the whole mailbox.** Phones index headers for everything and bodies for the mail they have downloaded.
- **Query language:** the Gmail operators people already use: `from:`, `to:`, `cc:`, `subject:`, `has:attachment`, `filename:`, `before:`/`after:`/`older_than:`/`newer_than:`, `larger:`/`smaller:`, `label:`, `in:`, `is:unread`/`is:starred`, `OR`, `-` for negation, quoted phrases and parentheses. A small parser maps them to `FTS5` `MATCH` terms plus filters on metadata columns. This is ordinary engineering, not research.
- **What is harder than the syntax:** searching inside attachment content (PDF text extraction, OCR on images), typo tolerance, and relevance ranking at Gmail's level. These ship after the basic operators, in that order.
- **Optional on-device semantic search:** a small local embedding model adds "find the email about the lease renewal" style queries, and a local LLM can turn a natural-language question into operators. Both are opt-in, run only on the device, and are skipped on hardware too small to run them well.

### 5.3 ZeroMX Bridge (`crates/zeromx-bridge`)

Most people who care about their mail on a computer read it in a mail app. The Bridge lets them keep that app. It is the same idea as Proton Mail Bridge: a local server that speaks standard IMAP and SMTP to the mail app and does the cryptography in between.

```text
Mail app (Apple Mail / Outlook / Thunderbird / other IMAP app)
   │  IMAP + SMTP over TLS, 127.0.0.1 only, per-install credentials
   ▼
ZeroMX Bridge (Rust daemon: sync engine, zeromx-crypto, local encrypted copy and index)
   │  storage adapter                   │  outbound
   ▼                                    ▼
Your storage (sealed files)       ZeroMX egress relay, or direct end-to-end seal
```

- **Inbound:** the Bridge syncs sealed files from storage, opens them, and serves the original messages over IMAP with their real headers. The mail app shows and threads them normally.
- **State:** flags, moves and deletions made in the mail app become operations in this device's state log (section 2.5). Operations from other devices appear in the mail app as ordinary IMAP changes.
- **Every write is sealed:** a draft, a sent copy or a message dragged in from another account is sealed on the device before it goes to storage.
- **Outbound:** SMTP submission on localhost. The Bridge seals end to end for ZeroMX recipients, signs `DKIM` with the wrapped key from section 5.1, and hands other mail to the egress relay.
- **Search:** the Bridge answers IMAP `SEARCH` from its local index. Most desktop apps also search their own cache.
- **IMAP surface:** `IDLE`, `UIDPLUS`, `MOVE`, `SPECIAL-USE`, `CONDSTORE`. The exact set each target app needs is measured in the first week ([`ZMX-000`](06-backlog-and-issues.md)).
- **Limits, stated to the user:**
  - The mail app's cloud features stop working for this account: vendor push, Send Later, shared inboxes, vendor AI. Their servers cannot reach `127.0.0.1`.
  - Apps that route the account through their own servers may refuse a local account or lose features. Spark is in this group and is tested before it is promised.
  - The account works only on computers where the Bridge runs. Phones use the ZeroMX app.
  - The mail app keeps its own decrypted cache on disk. That falls under device security ([07, L6](07-threat-model-and-limits.md)). Onboarding checks for full-disk encryption.

### 5.4 ZeroMX App (Phone)

- Native, iOS first. A notification service extension decrypts the sealed preview on the device, so a notification shows the real sender and subject with the app closed.
- Syncs through the same storage adapter and state logs as the Bridge.
- Keeps headers for everything and bodies for recent mail, and fetches the rest on demand.
- **Why not the phone's built-in mail app:** iOS suspends background apps, so a local IMAP server cannot stay reachable. Android allows a foreground service, with time limits on recent versions. A Bridge on a home computer reached over a private VPN works for people who want that, and it is documented as an advanced setup, not a product promise.

### 5.5 Local MCP Server (`zeromx-mcp`)

A local `Model Context Protocol` server over `stdio` or `127.0.0.1`, with per-tool consent:

- `zeromx.search_messages(query, date_range, sender_filter)`
- `zeromx.get_thread(thread_id)`
- `zeromx.create_draft(to, subject, body, in_reply_to)` (never sends without a click)
- `zeromx.extract_calendar_events()`

The user's own agents (Claude Desktop, Cursor, a local model) work with the mailbox on the user's machine. What the agent then does with the text is governed by that agent, and the consent screen says so.

### 5.6 Web Client & Polkadot Product

- **The problem with webmail:** a page that decrypts mail runs whatever code the server sends on that visit. A server under pressure can send one user different code.
- **The rule:** a browser client ships only where the code is pinned. A Polkadot Product is loaded by resolving a `.dot` name to a content hash recorded in contract state on Polkadot Hub, so the publisher cannot give one user a different build without changing a public record.
- **Unverified, tested in a spike before anything is promised ([`ZMX-037`](06-backlog-and-issues.md)):** whether a Product can hold or derive decryption keys safely inside the host sandbox, whether it can run in the background or receive notifications, and what storage it may reach.
- **Independence:** the Product is one client among several. The same account works in the Bridge and in the ZeroMX app. If the Polkadot hosts change or disappear, no user loses an address, a key or a mailbox.

### 5.7 Import & Export

- **Import:** the device connects to the old mailbox over IMAP (or reads Maildir / mbox), seals each message under `own/`, and records folder and flag state in its log. The old host's access is used once and can be revoked after.
- **Export:** Maildir or mbox, from the local copy, at any time and without any server.
