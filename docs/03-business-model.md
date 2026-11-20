# 03 — Business Model, Unit Economics & Tokenomics

> All prices and costs in this document are planning figures. None has been validated with paying users. Estimates are labeled where they appear.

## 1. Market Diagnosis: Why Private Email Stayed Small

Private email has a proven market and has never become the default. The existing options each ask people to give up something they value ([01, section 1](01-architecture.md)):

1. **Encrypted providers (Proton, Tuta).**
   - The mailbox moves to the provider's servers, in the provider's format, read through the provider's apps. A desktop mail app needs a bridge that is sold on paid plans.
   - The subscription pays for a bundle: web client, calendar, drive, apps and support, on top of storage.
   - The user trusts one company's servers and the web code it serves on each visit, and cannot change the storage host or the mail servers without changing provider.
2. **Forwarders and aliases (SimpleLogin, Addy.io), and PGP plugins.**
   - A forwarder is one company's servers reading every message in passing.
   - PGP needs both sides to set it up and leaves sender and subject visible.

**ZeroMX targets the unserved combination: a private mailbox, an address and storage the user controls, and the desktop mail app the user already has.**

### Who Actually Buys This

The buyer is narrower than "everyone who uses email", and the plan is sized to it:

1. **People who already own a domain and read mail in a desktop app.** Founders, freelancers, consultants and developers. They hold client contracts, health and financial mail. Their address does not change, their mail app does not change, and ZeroMX Bridge is what serves them from the alpha.
2. **People in the Polkadot ecosystem.** They reach ZeroMX through the product platform (the ZeroMX Product in the Polkadot hosts, `.dot` names, Proof of Personhood for the free tier). This is a distribution channel, not a requirement: the account never depends on the Polkadot app ([08, section 5](08-why-polkadot-jam.md)).
3. **Small regulated firms** (law, accounting, clinics). This is the B2B gateway, with different requirements (section 3, Model C).

**The closest alternative, stated plainly, is an encrypted provider plus its paid bridge.** ZeroMX's differences are:

- **You choose and can change every part:** storage, relays and client, while the address and keys stay the same.
- **Mail from anyone is sealed, including sender and subject.** Nothing about who wrote or what about is left outside the ciphertext.
- **A lower price.**
- **A public directory no company can rewrite,** including ZeroMX.

**Who is not served yet:** people who read mail only in a browser tab. They need a desktop mail app (any free one works through the Bridge) until the pinned web client ships in the open network phase. People who read mail mostly on a phone are not served by the alpha, which is desktop only. The waitlist asks where people read mail, so both groups are measured before anything is scheduled around them.

Owning a custom domain is the main funnel constraint. Onboarding must be able to **register a domain for the user, in the user's name**, in the same flow. A trial address on a shared domain is planned for the beta (`ZMX-046`) and is labeled as a trial address ([07, L9](07-threat-model-and-limits.md)).

---

## 2. Cost Structure: Storage Is Cheap, the Bundle Is Not

The first design assumed storage had to be free and borrowed it from the user's existing mailbox provider. That assumption was wrong, and the dependency it created was not worth it ([07, section 6.1](07-threat-model-and-limits.md)). Storage is a small line. What encrypted providers charge for is the bundle around it.

- **Storage.** Object storage list prices, quoted from memory and to be re-checked before they go into any deck: about $6 per TB-month at Backblaze B2, $15 at Cloudflare R2, $23 at AWS S3. A 10 GB quota therefore costs roughly **$0.06 to $0.23 per month** before replication, and most mailboxes sit far below their quota. A user who brings their own bucket costs ZeroMX nothing for storage.
- **Relay compute: a few cents per user per month (estimate).**
  - A heavy user receives about 150 emails a day.
  - Sealing a typical message costs milliseconds of CPU. Large attachments and spam scoring cost more, and inbound mail is bursty, so capacity is planned on peak concurrent connections and RAM, not on average CPU.
  - Planning figure: one confidential VM per roughly 5,000 active users, at least three relays per domain for redundancy.
- **Planning estimate for infrastructure, unvalidated: $0.15 to $0.45 per user per month** (storage plus relay compute).
- **The costs that actually dominate are not infrastructure:**
  - **Outbound IP reputation and deliverability operations** (warm-up, feedback loops, blocklist handling).
  - **Abuse handling and support.**
  - **Security audits** of the relay image, the crypto library, the Bridge and the apps.
  - **People.** The unit economics below are infrastructure only.
- **Chain cost is negligible.** The directory is touched once per relay per epoch and once per key change, never per message. No per-user chain cost figure is quoted before the benchmark in [`ZMX-033`](06-backlog-and-issues.md) exists ([08, section 2](08-why-polkadot-jam.md)).

| | Encrypted provider | ZeroMX |
| :--- | :--- | :--- |
| **Where the mailbox is stored** | The provider's servers, in its format | ZeroMX Storage by default, or a bucket the user rents or runs |
| **Who can change the storage host** | Nobody but the provider | The user, without changing address or keys |
| **Desktop mail app** | Through a bridge on paid plans | Through ZeroMX Bridge, included |
| **Sender and subject sealed for mail from anyone** | Varies | Yes |
| **Infrastructure cost per user per month** | Not public | **About $0.15 to $0.45** (planning estimate, unvalidated) |
| **Retail price** | Roughly $5 to $12 per month (list prices, to re-check) | **$3 per month or $29 per year** (planned) |
| **Is it a new mailbox?** | Yes | **Yes.** The address and the desktop mail app stay. Old mail is imported. On the phone it is the ZeroMX app. |

### Platform and adoption risks

The old risk, a vault that belonged to the company being blinded, is gone. The risks that replace it:

- **It is a new mailbox.** Adoption needs a working import and, for webmail users, a mail-app habit they may not have. This is the main demand risk and the first thing the validation plan measures ([09](09-validation-and-launch-plan.md)).
- **App-store dependence on phones.** The ZeroMX app reaches users through Apple's and Google's stores, which can delay or remove it. The Bridge has no such gate.
- **Mail-app behavior.** The Bridge depends on how third-party mail apps treat a local IMAP account. Apple Mail, Outlook and Thunderbird are the first targets, and Spark is tested before it is promised ([04, risks](04-roadmap.md)).
- **Polkadot platform timing.** JAM, Levity mainnet, the Polkadot app and Proof of Personhood from third-party apps have no committed dates. Nothing before Phase 2 depends on any of them, and the product never requires the Polkadot app.

---

## 3. Monetization

Subscription by card is the primary model. Everything involving DOT is optional for the user.

### Model A — Subscription (Primary)

Users never have to see a wallet or a token:

- **ZeroMX Personal (`$3 / month` or `$29 / year`):** one custom domain, unlimited addresses and per-sender aliases, 10 GB of ZeroMX Storage or your own bucket with no size limit, ZeroMX Bridge, the phone app, local search, and the local MCP server.
- **ZeroMX Pro (`$7 / month`):** up to 5 custom domains, 50 GB of ZeroMX Storage, and Tier-3 split-trust ingress when available.
- **Extra ZeroMX Storage** is sold near cost.
- **Founding-member test.** The site offers a locked `$2 / month` rate against a refundable `$15` deposit. It is a willingness-to-pay test ([09](09-validation-and-launch-plan.md)), and nothing is charged until the alpha invite is live.
- **Payment:** card first. dotUSD is an optional payment method at the public beta, if it is live by then.
- Revenue pays relay operators, storage, audits and development.

### Free Tier (Planned, Not Promised)

One free account per verified person, with a small quota and limited outbound volume. Proof of Personhood replaces the payment as the anti-abuse anchor. **This depends on Proof of Personhood being usable from our apps**, which is unverified ([08, section 9](08-why-polkadot-jam.md), `ZMX-037`). Until it is verified the free tier is a plan, and paid accounts need nothing from the Polkadot app.

### Model B — "Stake-to-Use" (Optional, Phase 2)

For users who hold DOT and would rather lock capital than pay a bill:

1. The user stakes DOT through a **nomination pool** dedicated to ZeroMX. Principal stays the user's and can be unbonded under the normal Polkadot unbonding rules.
2. The pool's staking rewards are routed to the network: operators, storage and the protocol treasury.
3. **Sizing must follow current yield.** Polkadot's 2026 issuance changes cut inflation to roughly 3%, and staking returns fell with it. The required stake is `annual price / (DOT price × current net yield)` and is recomputed each era. At low yields the stake needed for a $29/year plan is several hundred dollars of DOT.
4. **What this is and is not.** It is "no monthly bill". It is not "free": the user forgoes the staking rewards and carries DOT price risk and slashing risk. The website must say so, and the offer needs a legal review per market before launch.

Open design question: how a JAM service receives rewards from relay-chain staking is not specified by JAM itself. The nomination-pool route works without it.

### Model C — B2B Compliance & Sovereignty Gateway (`$6 – $9 / seat / month`, planning price)

Law firms, clinics, accounting firms, fintechs and European or Brazilian companies (`GDPR` / `LGPD` / `HIPAA` / US Cloud Act exposure) increasingly cannot leave confidential client mail readable by a US cloud provider or its AI features. Most of them keep Google Workspace or Microsoft 365 for identity, documents and meetings.

- **Enterprise value proposition:** the firm keeps its identity provider and office suite, points the corporate domain's `MX` to **dedicated, single-tenant** ZeroMX relays in a chosen jurisdiction, and stores sealed mail in **the firm's own bucket in that jurisdiction**. Staff read through the Bridge in the desktop mail app they already use, and through the ZeroMX app on managed phones. Enterprises do not route mail through community operators.
- **What this asks of the firm, stated plainly:** mail leaves the Workspace or Exchange mailbox. Firms that must keep mail inside an existing mailbox are the main case for the existing-IMAP-mailbox storage adapter ([02, section 2.7](02-technical-specification.md)), and the B2B interviews measure how many there are.
- **Requirements the consumer design does not meet, and which gate this offer:**
  - **Organization-held keys.** The firm, not the employee, must be able to decrypt: for offboarding, legal hold, eDiscovery, and supervision rules that bind law firms and financial firms. This means an org key service with audited access.
  - **Journaling and archiving.** Regulated firms must retain readable copies. The gateway needs an encrypted journal the firm's compliance tooling can open.
  - **Mobile device management.** The phone app and the Bridge must be deployable and configurable through MDM.
- **Sequence:** B2B starts after the consumer product has a published audit and deliverability history. It is not a launch market.
- **Pricing note:** $6 to $9 per seat is the planning price. The validation interviews ask for $15 per seat ([09](09-validation-and-launch-plan.md)). That figure is a willingness-to-pay test, not a price list.

---

## 4. Supply Side: Operators and DOT

1. **Ingress operators.** Run by the ZeroMX team in the alpha, then by vetted, publicly listed operators who can show they have no physical access to their hosts ([07, section 4](07-threat-model-and-limits.md)). They are **bonded in DOT and paid from subscriptions**: availability payments and a per-message fee. A bond is forfeited for downtime or a failed attestation. Silent copying of mail leaves nothing to slash, which is why admission is vetted.
2. **Egress operators.** Higher bond, reflecting the value of clean IP ranges. Protected by per-account quotas, later by `RLN` proofs.
3. **Users choose their relays** from the public list once more than one operator exists. Anyone can already run the open-source relay for their own domain.
4. **Opening the operator set** is tied to Tier-3 split-trust ingress, not to a date.
5. **Where DOT demand comes from:** operator bonds, subscriptions paid in dotUSD (which is backed by DOT), optional stake-to-use, and Hub fees for directory transactions. This is the basis of the ecosystem funding case in [08, section 8](08-why-polkadot-jam.md).
6. **Open-source sustainability.** The clients, the relay, the storage and sync library and the directory code stay open source with reproducible builds. Paid ZeroMX Storage, managed onboarding, the B2B admin console and compliance reporting are what generate revenue.
