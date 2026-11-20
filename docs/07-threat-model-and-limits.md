# 07 — Threat Model, Trust Boundaries & Known Limits

This document states what ZeroMX protects, what it does not, and who you still have to trust. Every public claim on the website must be traceable to a row here. If a claim is not backed by this document, the claim is wrong, not the document.

---

## 1. What ZeroMX Actually Protects

**Two assets:**

1. **Privacy of the mailbox at rest.** The contents and metadata of your mail as stored, wherever it is stored.
2. **Control of the mailbox.** Your address, your keys, and the ability to move your mail and change any supplier without asking anyone.

**The guarantees:**

- For mail addressed to your domain, **whoever hosts your storage holds only padded ciphertext**: no body, no attachment, no sender, no subject, no thread. It cannot read, index, scan, profile, train on, or hand over the plaintext, because it never receives it. This holds for ZeroMX Storage exactly as it holds for a bucket you rent yourself.
- **Only keys on your devices open it.** ZeroMX has no copy of your private key and cannot reset it.
- **Every part can be replaced.** Relays, storage and client apps can each be changed while the address and the keys stay the same. A complete local copy and an export in standard formats exist at all times.

This removes the largest single exposure in ordinary email: one company holding a searchable, decades-long plaintext archive of your life, together with the account that controls it.

---

## 2. What ZeroMX Does Not Protect

| # | Limit | Why | What we do about it |
| :- | :--- | :--- | :--- |
| **L1** | **The other side's copy.** If your correspondent uses Gmail or Microsoft 365, Google or Microsoft holds their copy in plaintext. | Email has two ends. We only control yours. | Automatic end-to-end encryption when both ends use ZeroMX (Tier 1). Say this plainly on the website. |
| **L2** | **Mail from outside senders is plaintext at the relay for a moment.** | SMTP ends its TLS session at the receiving MX. Someone has to hold the plaintext to encrypt it. | Relays run in attested confidential VMs and seal the message before writing it (Tier 2). This reduces trust. It does not remove it. See section 4. |
| **L3** | **Mail still sent to an old address at another provider.** | It resolves to that provider's servers. We never see it first. | Change the address account by account. Forwarding to the new address works, and the old provider still reads what it forwards. Importing old mail protects it from future storage hosts only: the old provider already had it. |
| **L4** | **Timing, volume and size.** The storage host sees when each sealed file arrives, its padded size, how many there are, and when your devices fetch them. | Unavoidable for a store. | Padmé padding and delivery jitter. We do not claim traffic-analysis immunity. A bucket you host yourself removes the third party. |
| **L5** | **No forward secrecy for stored mail.** If your key is ever stolen, every stored ciphertext of that key period can be opened. | Store-and-forward mail is encrypted to a long-lived key. The same is true of PGP and of encrypted providers. | Hybrid post-quantum encryption from v1.0. Hardware-bound keys. Yearly key epochs so a stolen key opens one epoch, not the whole archive. Never describe the product as "Signal-grade". |
| **L6** | **A compromised, lost or seized device.** Each device holds a full decrypted-on-demand copy, and a desktop mail app keeps its own decrypted cache. | The mail has to be readable where you read it. | Local copy encrypted under a hardware-backed key. Onboarding checks for full-disk encryption. A lost device is cut off from new mail by rotating credentials and the key epoch. What it already downloaded is protected only by its own lock. |
| **L7** | **Outbound mail to non-ZeroMX recipients** is plaintext at the egress relay and at the recipient's provider. | Same as L1 and L2. | Egress runs in an attested VM. The recipient's copy is theirs. |
| **L8** | **Ciphertext on open storage is public forever.** On Polkadot Levity anyone who knows a content identifier can copy the sealed file and keep it. | That storage is designed to be readable by anyone. | Offered only as an opt-in arrival box, with this sentence shown. Never the default. Hybrid post-quantum suite and key epochs limit, and do not remove, the consequence of a later key theft. |
| **L9** | **An address on a shared domain is not sovereign.** Whoever administers the domain can redirect future mail. | The domain owner controls its `MX` records. | Full sovereignty needs a domain registered in your own name. Onboarding offers to register one. Shared-domain addresses are labeled as trial addresses. |
| **L10** | **Your domain's registrar and registry** can suspend or transfer a domain. | That is how the DNS works. | Registered in your name, with registrar lock and DNSSEC. Out of our hands beyond that. |

---

## 3. Who You Still Trust

"Trustless" is not an honest word for this system. The honest phrase is **trust-minimized, with every remaining trust point named.**

| Trust point | What it could do if malicious | Mitigation | Residual risk |
| :--- | :--- | :--- | :--- |
| **Client publisher** (whoever ships the Bridge and the apps) | Ship an update that exfiltrates keys. This is the single most powerful position in the system. | Open source. Reproducible builds. Releases signed by at least two independent builders. Update delay with public diff. Self-built install documented. External audit before public beta. | High until multi-party release signing exists. On phones the app store is also in this path. |
| **Relay operator** | Read inbound and outbound mail from outside senders in RAM. | Confidential VM attestation plus the operator rules in section 4. | See section 4. |
| **CPU vendor** (AMD, Intel) | Break confidentiality of every relay on that silicon. | Tier 3 split-trust ingress across two vendors. | Accepted for Tier 2. |
| **Owner of the MX hostnames and DNS zone** | Repoint MX hostnames at a rogue server and read inbound mail before any enclave sees it. | DNSSEC, MTA-STS in `enforce` mode, DANE `TLSA` pinned to enclave-born keys, TLS-RPT monitoring, and per-file relay signatures the client verifies (section 5). | Senders that validate neither MTA-STS nor DANE can still be intercepted by an active network attacker. This is a property of SMTP. |
| **Storage host** (ZeroMX Storage, or the provider of your bucket) | Delete, withhold or roll back sealed files. Observe the metadata in L4. Refuse service. | Hash-chained state logs and file hashes in notifications detect rollback and missing mail. Every desktop device holds a full copy and can repopulate a new host. Optional second storage target. | Availability and metadata only, not confidentiality. |
| **Measurement allowlist governance** | Approve a relay build that logs mail. | Reproducible builds, public timelock, allowlist in the public directory, client-side pinning with a warning on change. | Governance capture. |
| **Directory operator** | Serve a different key for a recipient, or hide a relay revocation. | Alpha: signed append-only log with inclusion and consistency proofs. Beta: contract on Polkadot Hub. Target: JAM service. | Alpha: the ZeroMX team, with detection but not prevention. From beta: Polkadot's validators and governance, and the RPC endpoints until a light client verifies the state. |
| **Passkey or keystore provider** | Whoever syncs a passkey can derive the root secret if their sync encryption fails. | Recommend a device-bound key or a hardware security key for the root. State the choice at onboarding. | User choice. |
| **The mail app you choose** (through the Bridge) | Read everything the Bridge serves it, and send it anywhere. | The user's choice, stated at setup. Prefer apps that do not copy mail to a vendor cloud. | User choice. |

---

## 4. Why Relays Cannot Be Permissionless (Yet)

The original design said any operator with a confidential-compute CPU and a stake could run a relay, and that attestation makes the operator unable to read mail. **That is false when the operator has physical access to the machine.**

- AMD SEV-SNP and Intel TDX both exclude physical attacks from their threat model.
- Published 2025 attacks (Battering RAM, WireTap, TEE.fail) use a memory-bus interposer costing under $1,000 to read enclave memory and, on Intel, extract attestation keys. With a stolen attestation key an attacker can produce valid quotes for software that is not running in an enclave at all.
- A remote verifier, including a contract or a JAM `Refine` function, cannot tell an honest quote from one produced with an extracted key.

**Consequences for the design:**

1. **Attestation proves which code booted on genuine silicon. It never proves that nobody read your mail.** No copy may say otherwise.
2. **Operator admission is permissioned at launch.** An operator must show that it has no physical access to the hardware: confidential VMs rented from a cloud or colocation provider whose own attestation or signed attestation-of-location binds the VM to a facility the operator cannot enter.
3. **Stake and slashing deter, they do not prevent.** A relay that silently copies mail leaves no on-chain evidence to slash.
4. **Permissionless operation is unlocked only by Tier 3.** When no single operator and no single vendor ever holds the full session key, one physical attack is not enough. Until Tier 3 ships, the operator set stays vetted and public.
5. **The first relays are run by the ZeroMX team.** The alpha says so. Decentralization is a roadmap item, not a launch claim.
6. **Anyone can run the relay for their own domain.** That moves the trust to themselves and to their hosting.

---

## 5. Closing the SMTP Interception Gap

An ordinary sender never checks attestation. It looks up the MX record and talks to whatever answers, usually accepting any certificate. Without countermeasures, an attacker who can tamper with DNS or routing sits in front of the enclave, reads the mail, and passes it along.

Required for every onboarded domain:

1. **DNSSEC** on the user's zone (checked by the onboarding verifier, warned if absent).
2. **MTA-STS** policy in `enforce` mode listing only attested MX hostnames, hosted for the user.
3. **DANE `TLSA`** records pinning the SPKI of enclave-generated TLS keys, for senders that validate DANE.
4. **TLS-RPT** reports sent to the client so failed or downgraded deliveries are visible.
5. **Per-file relay signature.** The relay signs every sealed file with a key bound to its attestation. The client verifies it and shows which relay sealed the message. A file with no valid signature is discarded or shown as unverified.
6. **Canary probes.** The network sends itself marked messages along every MX path and alerts on any that arrive by an unattested path.

Measures 1 to 4 stop interception for senders that validate them, which includes the largest mailbox providers. Measures 5 and 6 detect a rogue MX that seals mail itself. Nothing detects a transparent proxy in front of a real relay for a sender that validates nothing. That residual is stated on the website.

---

## 6. Design History: What Changed and Why

### 6.1 November 2026: from "Gmail as the vault" to storage the user controls

The first design delivered sealed envelopes into the user's existing Gmail mailbox and decrypted them inside the Gmail web page with a browser extension. The pitch was "no migration". It was replaced as the default for these reasons:

| Problem with the Gmail-vault design | Consequence |
| :--- | :--- |
| The store belonged to the company being blinded. It could spam-folder, throttle or block relay mail, and nothing in the design could prevent it. | The product's existence depended on a party with every reason to end it. |
| It served only people who read Gmail in desktop Chrome. Early readers used Apple Mail and Spark on several computers. | The first users we spoke to could not use it. |
| The phone's Gmail app showed sealed envelopes, so a second app was needed anyway. | "No migration" was only true on one screen. |
| Reading the archive needed restricted OAuth scopes with a yearly assessment run by the same provider. | A second veto. |
| The extension depended on Gmail's page markup. | Breakage on every redesign. |
| Storage is cheap: a typical mailbox costs cents per month at list prices. | Free storage was never worth the dependency. |
| The user still did not control the store, the account or the client. | Privacy without sovereignty, which is the trade email users should not have to make. |

What replaced it: relays write sealed files to storage the user controls, devices sync through it and keep full local copies, and standard mail apps connect through a local Bridge. An existing IMAP mailbox remains an optional storage adapter ([02, section 2.7](02-technical-specification.md)).

**What this costs, stated plainly:** it is now a new mailbox, not a layer over the old one. Mail has to be imported, and people who read mail only in a browser tab need a desktop mail app until the pinned web client ships.

### 6.2 Earlier corrections that still hold

| Topic | Original | Problem | Now |
| :--- | :--- | :--- | :--- |
| **Metadata** | Outer `Message-ID` / `References` preserved | Real Message-IDs embed the sender's domain, so the host learns who writes to you. | The whole message, headers included, is inside the ciphertext. Nothing about sender or thread is outside. |
| **Padding** | Power-of-four buckets | Up to 4x storage overhead. | **Padmé** padding: at most about 12% overhead, leaks O(log log n) bits of length. |
| **Cipher suite** | Classical X25519 at v1.0, hybrid later | Stored ciphertext is archived for years. Harvest-now-decrypt-later is the default case. | **Hybrid X25519 + ML-KEM-768 from v1.0.** No classical-only mode. |
| **Outbound DKIM** | Egress enclave signs with a delegated key | A relay holding it could forge mail from your domain. | **The client signs DKIM** (RSA-2048). The key is generated on the device. Egress relays the bytes unmodified and cannot forge. |
| **Relay queue** | Relay forwards over SMTP and retries | A retry queue means disk, or mail held only in one machine's RAM. | **Accept only after the storage confirms the write.** Otherwise a temporary error, and the sender retries. |
| **Mobile notifications** | PWA decrypts pushes in the background | A PWA cannot do this, and push payloads cap at 4 KB. | **Native app.** The relay seals a short preview to a device-bound key. The full message is fetched from storage. |
| **Anti-abuse** | Zero-knowledge rate limiting verified on-chain for every send | Heavy for a first release, and the egress relay sees the sender domain anyway. | **Signed per-account quota tokens** checked inside the egress relay. `RLN` stays the design for the permissionless phase. |
| **Light client** | Smoldot verifies JAM state in the browser | Smoldot is a Substrate light client. JAM has no light client today. | See section 7. |

---

## 7. The Polkadot Dependency, Stated Honestly

1. **Privacy does not depend on any chain.** The relay, the sealed format, the storage and the sync give the same confidentiality with the directory deployed as a plain signed log. A project that says a blockchain makes mail private is wrong.
2. **What the chain adds is one specific thing:** a key directory, an operator list and a measurement allowlist that nobody can rewrite or roll back, including the ZeroMX team, and whose every change is public. Without it, whoever runs the log is trusted not to fork it.
3. **ZeroMX is not something only JAM makes possible.** The on-chain work is per relay per epoch, not per user or per message, and it is cheap on any platform. See [08, section 2](08-why-polkadot-jam.md).
4. **Why Polkadot then:** the pieces fit (contracts on Polkadot Hub today, JAM as the target for attestation checks), the ecosystem's stated strategy is private products for people, and it offers distribution and funding. That is a business choice with a technical fit, and it is presented as such.
5. **External gates.** Polkadot Hub contracts are live. JAM mainnet, a JAM light client, Levity mainnet, the Polkadot app and Proof of Personhood outside that app are each controlled by others and have no committed date. No release before the open network phase depends on any of them, and the product never requires the Polkadot app.

**Design rule:** the product must be useful and honest with none of these, and better with each one.

---

## 8. Claims We Do Not Make

| Do not say | Say instead |
| :--- | :--- |
| "Nobody can read your email." / "Email only you can read." | "A mailbox only you can open." / "Whoever stores your mailbox holds only sealed files. Mail from outside senders passes through a relay's memory for a moment before it is sealed." |
| "Google and Microsoft can't read your email." | "Your mailbox is no longer stored with them. They still hold their own users' copies of what those users send you." |
| "The blockchain makes your mail private." / "Only possible with JAM." | "Privacy does not depend on a blockchain. Polkadot is what keeps the directory, the operator list and your name out of any company's hands, including ours." |
| "JAM proves nobody read your mail." | "Relays must prove which open-source code they run before they are admitted. That removes the operator's software access to your mail." |
| "No company to trust." / "Trustless." | "Every remaining trust point is listed, and each has a plan to shrink it." |
| "Signal-grade." | "End-to-end encrypted when both sides use ZeroMX." |
| "Decentralized." (at alpha) | "The team runs the relays in the alpha. Independent operators come later, and the code to run your own is open." |
| "$0 per month forever." | "No monthly bill if you stake. Your stake carries token price risk." |
| "No new app." / "No migration." | "Your address and your desktop mail app stay. The mailbox is new, old mail is imported, and on your phone you use the ZeroMX app." |
| "Works with every mail app." | "Apple Mail, Outlook and Thunderbird through ZeroMX Bridge on a computer. Other IMAP apps as they are tested. Not the phone's built-in mail app." |
| "Zero-knowledge storage." | "ZeroMX Storage holds only sealed files. It can see how many there are, their padded sizes and when they arrive." |
| "Works with the Polkadot app." (before the spike) | "A ZeroMX Product for the Polkadot hosts is being tested. The account never depends on it." |
| "Free for everyone." | "A free tier for verified people is planned and depends on Polkadot's Proof of Personhood being usable from our apps." |
| "Same search as Gmail." | "Gmail-style search operators over your mail, on your device. Search inside attachments comes later." |
