# 07 — Threat Model, Trust Boundaries & Known Limits

This document states what ZeroMX protects, what it does not, and who you still have to trust. Every public claim on the website must be traceable to a row here. If a claim is not backed by this document, the claim is wrong, not the document.

---

## 1. What ZeroMX Actually Protects

**The asset:** the contents and metadata of your mailbox *as stored by your mailbox provider* (Gmail, Outlook, iCloud, any IMAP host).

**The guarantee:** for mail addressed to your custom domain, your mailbox provider stores only padded ciphertext. It cannot read, index, scan, profile, train on, or hand over the plaintext of that mail, because it never receives it. Only a key that lives on your devices can open it.

This removes the largest single exposure in ordinary email: one company holding a searchable, decades-long plaintext archive of your life.

---

## 2. What ZeroMX Does Not Protect

| # | Limit | Why | What we do about it |
| :- | :--- | :--- | :--- |
| **L1** | **The other side's copy.** If your correspondent uses Gmail or Microsoft 365, Google or Microsoft holds their copy in plaintext. | Email has two ends. We only control yours. | Automatic end-to-end encryption when both ends use ZeroMX (Tier 1). Say this plainly on the website. |
| **L2** | **Mail from legacy senders is plaintext at the relay for a moment.** | SMTP ends its TLS session at the receiving MX. Someone has to hold the plaintext to encrypt it. | Relays run in attested confidential VMs and seal the message before forwarding (Tier 2). This reduces trust. It does not remove it. See section 4. |
| **L3** | **Mail sent to your old `@gmail.com` / `@outlook.com` address.** | It resolves to the provider's own MX. We never see it. | Move accounts to the custom-domain address over time. Optional at-rest sweeper is hygiene only: the provider already saw that mail. |
| **L4** | **Timing and volume.** Your provider sees when a message arrives and its padded size. | Unavoidable for a store that receives the message. | Padmé padding (section 6) and delivery jitter. We do not claim traffic-analysis immunity. |
| **L5** | **No forward secrecy for stored mail.** If your key is ever stolen, every archived ciphertext can be opened, and your provider keeps all of it. | Store-and-forward mail is encrypted to a long-lived key. The same is true of PGP and of Proton. | Hybrid post-quantum encryption from v1.0. Hardware-bound keys. Yearly key epochs so a stolen key opens one epoch, not the whole archive. Never describe the product as "Signal-grade". |
| **L6** | **A compromised device.** Malware on your laptop reads what you read. | The plaintext exists on your screen. | Out of scope. |
| **L7** | **Outbound mail to non-ZeroMX recipients** is plaintext at the egress relay and at the recipient's provider. | Same as L1 and L2. | Egress runs in an attested VM. The recipient's copy is theirs. |

---

## 3. Who You Still Trust

"Trustless" is not an honest word for this system. The honest phrase is **trust-minimized, with every remaining trust point named.**

| Trust point | What it could do if malicious | Mitigation | Residual risk |
| :--- | :--- | :--- | :--- |
| **Extension publisher** (whoever ships the browser extension update) | Push an update that exfiltrates keys. This is the single most powerful position in the system. | Reproducible builds. Signed releases from at least two independent builders. Update delay with public diff. Optional self-built install. External audit before public beta. | High until multi-party release signing exists. |
| **Relay operator** | Read legacy inbound and outbound mail in RAM. | Confidential VM attestation plus the operator rules in section 4. | See section 4. |
| **CPU vendor** (AMD, Intel) | Break confidentiality of every relay on that silicon. | Tier 3 split-trust ingress across two vendors. | Accepted for Tier 2. |
| **Owner of the MX hostnames and DNS zone** | Repoint MX hostnames at a rogue server and read inbound mail before any enclave sees it. | DNSSEC, MTA-STS in `enforce` mode, DANE `TLSA` pinned to enclave-born keys, TLS-RPT monitoring, and per-envelope enclave signatures the client verifies (section 5). | Senders that validate neither MTA-STS nor DANE can still be intercepted by an active network attacker. This is a property of SMTP. |
| **Measurement allowlist governance** | Approve a relay build that logs mail. | Reproducible builds, public timelock, on-chain allowlist, client-side pinning with a warning on change. | Governance capture. |
| **Passkey sync provider** | Whoever syncs your passkey can derive your root secret if their sync encryption fails. | Recommend a hardware security key or a device-bound passkey for the root. Document the choice at onboarding. | User choice. |
| **Your mailbox provider** | Delete, withhold, or reorder ciphertext. Refuse service. | Anti-rollback roots. Vault is portable: change the forwarding target and keep your address and keys. | Availability only, not confidentiality. |

---

## 4. Why Relays Cannot Be Permissionless (Yet)

The original design said any operator with a confidential-compute CPU and a stake could run a relay, and that attestation makes the operator unable to read mail. **That is false when the operator has physical access to the machine.**

- AMD SEV-SNP and Intel TDX both exclude physical attacks from their threat model.
- Published 2025 attacks (Battering RAM, WireTap, TEE.fail) use a memory-bus interposer costing under $1,000 to read enclave memory and, on Intel, extract attestation keys. With a stolen attestation key an attacker can produce valid quotes for software that is not running in an enclave at all.
- A remote verifier, including a JAM `Refine` function, cannot tell an honest quote from one produced with an extracted key.

**Consequences for the design:**

1. **Attestation proves which code booted on genuine silicon. It never proves that nobody read your mail.** No copy may say otherwise.
2. **Operator admission is permissioned at launch.** An operator must show that it has no physical access to the hardware: confidential VMs rented from a cloud or colocation provider whose own attestation or signed attestation-of-location binds the VM to a facility the operator cannot enter.
3. **Stake and slashing deter, they do not prevent.** A relay that silently copies mail leaves no on-chain evidence to slash.
4. **Permissionless operation is unlocked only by Tier 3.** When no single operator and no single vendor ever holds the full session key, one physical attack is not enough. Until Tier 3 ships, the operator set stays vetted and public.
5. **The first relays are run by the ZeroMX team.** The beta says so. Decentralization is a roadmap item with a date, not a launch claim.

---

## 5. Closing the SMTP Interception Gap

A legacy sender never checks attestation. It looks up the MX record and talks to whatever answers, usually accepting any certificate. Without countermeasures, an attacker who can tamper with DNS or routing sits in front of the enclave, reads the mail, and passes it along.

Required for every onboarded domain:

1. **DNSSEC** on the user's zone (checked by the onboarding verifier, warned if absent).
2. **MTA-STS** policy in `enforce` mode listing only attested MX hostnames, hosted for the user.
3. **DANE `TLSA`** records pinning the SPKI of enclave-generated TLS keys, for senders that validate DANE.
4. **TLS-RPT** reports sent to the client so failed or downgraded deliveries are visible.
5. **Per-envelope enclave signature.** The relay signs every sealed envelope with a key bound to its attestation. The client verifies it and shows which relay sealed the message. An envelope with no valid signature is shown as unverified.
6. **Canary probes.** The network sends itself marked messages along every MX path and alerts on any that arrive unsealed or by an unattested path.

Measures 1 to 4 stop interception for senders that validate them, which includes the largest mailbox providers. Measures 5 and 6 detect a rogue MX that seals mail itself. Nothing detects a transparent proxy in front of a real relay for a sender that validates nothing. That residual is stated on the website.

---

## 6. Corrections to the Original Envelope Design

| Topic | Original | Problem | Now |
| :--- | :--- | :--- | :--- |
| **Outer `Message-ID` / `References`** | "Preserved (or pseudonymized)" | Real Message-IDs embed the sender's domain (`<…@mail.chase.com>`), so the provider learns who writes to you. | **Always pseudonymized** with a per-mailbox keyed hash. Real IDs live in the protected inner headers. |
| **Padding** | Power-of-four buckets | Up to 4x storage overhead. Fills a free mailbox fast. The website said "512 KB bucket", which is not a power of four. | **Padmé** padding: at most about 12% overhead, leaks O(log log n) bits of length. |
| **Cipher suite** | Classical X25519 at v1.0, hybrid "v1.1 ready" | The adversary in this threat model archives every ciphertext indefinitely. Harvest-now-decrypt-later is the default case, not an edge case. | **Hybrid X25519 + ML-KEM-768 from v1.0.** No classical-only mode. |
| **Outbound DKIM** | Egress enclave signs with a delegated key | A "stateless" enclave cannot hold a per-domain long-term key, and any relay holding it could forge mail from your domain. | **The client signs DKIM** (RSA-2048, since major receivers do not verify Ed25519 DKIM). The key is generated on the device and wrapped under the root key. Egress relays the bytes unmodified and cannot forge. |
| **Sent copies** | Appended through the Gmail / Graph API | Needs restricted OAuth scopes, a yearly Google-mandated security assessment, and lets the provider being blinded revoke the product's access. | **Sent-to-self over SMTP.** The client seals a copy to its own key and submits it through ingress like any inbound message. It threads through the pseudonymous `References` chain. No mailbox API permission is needed to read, reply, or keep sent mail. |
| **Mobile notifications** | PWA decrypts pushes in the background with FaceID | A PWA cannot do this, and a biometric-gated key is not available in the background. | **Native app.** The ingress relay seals a short preview to a device-bound notification key and sends it through the platform push service. A notification extension decrypts it on the device. No mailbox API access and no polling. |
| **Anti-abuse** | ZK rate-limiting nullifiers verified on-chain for every send | Heavy for a first release, and the egress relay sees the sender domain anyway. | **v1: signed per-account quota tokens** checked inside the egress relay. RLN stays the design for the permissionless phase. |
| **Light client** | Smoldot verifies JAM state in the browser | Smoldot is a Substrate light client. JAM has no light client today. | See section 7. |

---

## 7. The Polkadot JAM Dependency

JAM is the right long-term home for the control plane: an append-only key directory, an operator registry, attestation verification in `Refine`, and stake accounting are all a natural fit. Two facts keep it off the critical path for the first releases:

1. **JAM is not yet live on Polkadot mainnet**, and the date is set by governance, not by us.
2. **There is no JAM light client.** The trust argument "your browser verifies keys with no RPC" depends on one. Until it exists, a browser reading JAM state trusts an RPC node.

**Design rule:** the product must be useful and honest without JAM, and strictly better with it.

- **v0 to v1:** key directory is a public append-only transparency log, signed by the operator and by independent witnesses, with inclusion and consistency proofs the client verifies (the Certificate Transparency and key-transparency model). Roots are anchored to Polkadot periodically.
- **JAM testnet:** the same log and the operator registry run as a JAM service. Clients verify through at least two independent RPC endpoints and compare against witness-signed roots.
- **JAM mainnet plus a light client:** the client verifies state directly. Only at this point may the website say "no RPC to trust".

Other teams are building JAM light clients. ZeroMX does not build its own and adopts one when it is ready for a browser extension.

The full case for JAM, a claim-by-claim review of the "only JAM" argument, and the alternatives are in [08 — Why Polkadot JAM](08-why-polkadot-jam.md).

---

## 8. Claims We Do Not Make

| Do not say | Say instead |
| :--- | :--- |
| "Google and Microsoft can't read your email." | "Your mailbox provider stores ciphertext for mail sent to your domain. It cannot read your archive." |
| "JAM proves nobody read your mail." | "Relays must prove which open-source code they run before they are admitted. That removes the operator's software access to your mail." |
| "No company to trust." / "Trustless." | "Every remaining trust point is listed, and each has a plan to shrink it." |
| "Signal-grade." | "End-to-end encrypted when both sides use ZeroMX." |
| "$0 per month forever." | "No monthly bill if you stake. Your stake carries token price risk." |
| "No second app." | "On desktop you stay inside your webmail. On your phone you use the ZeroMX app." |
| "Works with Gmail, Outlook, iCloud, any IMAP." | "Gmail on desktop Chrome first. Outlook and others follow." |
| "Works with Spark / Apple Mail." (before the Bridge ships) | "Desktop mail apps connect through ZeroMX Bridge, planned for the public beta, on the computers where it runs." |
| "Same search as Gmail." | "Gmail-style search operators over your decrypted mail, on your device. Search inside attachments comes later." |
