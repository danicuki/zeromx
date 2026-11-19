# 03 — Business Model, Unit Economics & Tokenomics

## 1. Market Diagnosis: Why Existing Privacy Email Churned Pragmatic Users

The email privacy market has historically been polarized into two flawed models:

1. **Full-Stack Siloed Replacements (Proton Mail, Tuta):**
   - Force users to maintain a second email client alongside unavoidable corporate Google Workspace / Microsoft 365 accounts.
   - Must charge **$5–$12/user/month** because they operate massive replicated storage clusters, custom webmail apps, calendars, and support teams.
   - Suffer from **low daily perceived value**: because privacy feels "invisible" when nothing bad happens, paying $10/month for *less* convenience triggers churn back to Gmail/Outlook.
2. **Centralized Alias Forwarders (SimpleLogin, Addy.io) + DIY PGP Plugins:**
   - Centralize trust in a single company's MX servers.
   - Fragmented UX: broken webmail search, broken conversation threads, leaked plaintext drafts, broken mobile apps, and broken AI/MCP workflows.

**ZeroMX targets the unserved quadrant: strong mailbox privacy, no desktop workflow migration, and low marginal cost.**

### Who Actually Buys This

The buyer is narrower than "everyone who uses Gmail", and the plan should be sized to it:

1. **Founders, freelancers and consultants who already own a domain** and run it on Gmail or Google Workspace. They hold client contracts, health and financial mail, and will not move to another mail app.
2. **Crypto-native users**, for whom a wallet, a stake, and a custom domain are normal.
3. **Small regulated firms** (law, accounting, clinics) on Workspace or Microsoft 365. This is the B2B gateway, with different requirements (section 3, Model C).

**People who read mail in a desktop app** (Apple Mail, Spark, Outlook) sit across all three groups. The extension does nothing for them, and ZeroMX Bridge (Phase 1) is what serves them. For them the closest alternative is Proton plus Proton Mail Bridge, and the advantage narrows to three things: a lower price, no account migration, and relays with attestation instead of one company's servers. The waitlist asks which app people read mail in, so the size of this group is measured before the Bridge is scheduled.

Owning a custom domain is the main funnel constraint. Onboarding must be able to **register a domain for the user, in the user's name**, in the same flow.

---

## 2. Structural Cost Advantage: "Big Tech Storage Arbitrage"

Traditional email providers spend 70–85% of their infrastructure COGS on **durable, multi-region storage and IMAP/webmail serving** for decades of user attachments.

ZeroMX stores **zero bytes of user email**:
- **Storage & Bandwidth COGS = $0.00:** Google (15 GB–2 TB) or Microsoft (50 GB–1 TB) pays the entire storage, replication, CDN, and archival bill for the user's encrypted blobs.
- **Relay Compute COGS: a few cents per user per month.**
  - A heavy user receives ~150 emails/day (~4,500/month).
  - Sealing a typical message costs milliseconds of CPU. Large attachments and spam scoring cost more, and inbound mail is bursty, so capacity is planned on peak concurrent connections and RAM, not on average CPU.
  - Planning figure: one confidential VM per ~5,000 active users, at least three operators per domain for redundancy.
- **The costs that actually dominate are not compute:**
  - **Outbound IP reputation and deliverability operations** (warm-up, feedback loops, blocklist handling).
  - **Abuse handling and support.**
  - **Security audits and provider verification** (extension audit, relay audit, yearly mailbox-API security assessment).
  - **People.** The unit economics below are infrastructure only.
- **Platform risk of the arbitrage:** the vault is someone else's product. A provider can rate-limit, spam-folder, or block relay deliveries, or change webmail in ways that break the extension. Mitigations: the vault is portable (repoint forwarding to any IMAP host and keep address and keys), the format is standard MIME, and the extension ships a standalone reader that does not depend on the webmail page.
- **Polkadot JAM Coretime COGS < $0.02 / user / month (estimate, to be benchmarked):**
  - ZeroMX never posts emails on-chain. Only operator hardware attestations (1x per epoch), domain key updates (rare), and batched `RLN` quota roots touch JAM — amortizing Polkadot Agile Coretime across tens of thousands of users.

| Metric | Siloed Encrypted Provider (e.g., Proton) | ZeroMX Network |
| :--- | :--- | :--- |
| **Archival Storage Provider** | Self-hosted Swiss servers (High COGS) | Piggybacks on Gmail / Outlook ($0 COGS) |
| **Infrastructure Cost / User / Mo** | ~$1.20 – $2.50 | **~$0.10 – $0.25** (planning estimate, unvalidated) |
| **Retail Price** | $5.00 – $12.00 / mo | **$3 / mo or $29 / year**, or stake |
| **User Inbox Migration Required?** | Yes (new app, new habits) | **Desktop: no. Phone: the ZeroMX app.** |

The earlier $1.99 price left no room for audits, deliverability, or support. $3 is still well under the incumbents, and the pitch is the workflow, not the price.

---

## 3. Monetization

Fiat subscription is the primary model. Staking is an option for users who already hold DOT, added once the control plane runs on JAM.

### Model A — Subscription (Primary)

Users never see wallets, gas, or tokens:
- **ZeroMX Personal (`$3 / month` or `$29 / year`):** One custom domain, unlimited addresses and per-sender aliases, desktop extension, mobile app, local search, and Local MCP server.
- **ZeroMX Pro (`$7 / month`):** Up to 5 custom domains, full-archive indexing, legacy-address migration tools, and Tier-3 split-trust ingress when available.
- Revenue pays relay operators, coretime, audits, and development.

### Model B — "Stake-to-Use" (Optional, Later)

For users who hold DOT and would rather lock capital than pay a bill:
1. The user stakes DOT through a **nomination pool** dedicated to ZeroMX. Principal stays the user's and can be unbonded under the normal Polkadot unbonding rules.
2. The pool's staking rewards are routed to the network: operators, coretime, and the protocol treasury.
3. **Sizing must follow current yield.** Polkadot's 2026 issuance changes cut inflation to roughly 3%, and staking returns fell with it. The original "25–40 DOT at 10–14% APR" no longer holds. The required stake is `annual price / (DOT price × current net yield)` and is recomputed each era. At low yields the stake needed for a $29/year plan is several hundred dollars of DOT.
4. **What this is and is not.** It is "no monthly bill". It is not "free": the user forgoes the staking rewards and carries DOT price risk and slashing risk. The website must say so, and the offer needs a legal review per market before launch.

Open design question: how a JAM service receives rewards from relay-chain staking is not specified by JAM itself. The nomination-pool route works today without it.

### Model C — B2B Compliance & Sovereignty Gateway (`$6 – $9 / seat / month`)

Remember why companies stay locked into Google Workspace and Microsoft 365: **SSO/IdP, Docs, Meet/Teams, and Admin UX**. Yet law firms, fintechs, healthcare providers, defense contractors, and European/Brazilian enterprises (`GDPR` / `LGPD` / `HIPAA` / US Cloud Act exposure) increasingly cannot allow US cloud providers or cloud LLMs to scan confidential client communications.

- **Enterprise Value Proposition:** IT keeps Google Workspace or Microsoft 365 intact, points the corporate domain's `MX` to **dedicated, single-tenant** ZeroMX relays in a chosen jurisdiction (e.g., EU-only or Brazil-only), and deploys the extension via Chrome Enterprise Policy / Intune MDM. Enterprises do not route mail through community operators.
- **Requirements the consumer design does not meet, and which gate this offer:**
  - **Organization-held keys.** The firm, not the employee, must be able to decrypt: for offboarding, legal hold, eDiscovery, and supervision rules that bind law firms and financial firms. This means an org key service (the role a KACLS plays in Google CSE), with audited access.
  - **Journaling and archiving.** Regulated firms must retain readable copies. The gateway needs an encrypted journal the firm's compliance tooling can open.
  - **Mobile device management.** Most corporate mail is read on phones, so the mobile app must be MDM-deployable.
- **Sequence:** B2B starts after the consumer product has an audit and a year of deliverability history. It is not a launch market.
- **High-Margin Recurring Revenue:** Priced far below Google Workspace Enterprise Plus + third-party CSE KACLS ($25–$35/seat), while actually encrypting *inbound external mail* (which Google CSE cannot do!).

---

## 4. Supply-Side Operator Economics (DePIN Flywheel)

1. **Ingress Operators:** Run by the ZeroMX team at launch, then by vetted, publicly listed operators who can show they have no physical access to their hosts ([07, section 4](07-threat-model-and-limits.md)). Earn availability rewards and per-envelope fees. Bond is forfeited for downtime or a failed attestation. Note that silent copying of mail leaves nothing to slash, which is why admission is vetted.
2. **Egress Operators:** Higher bond, reflecting the value of clean IP ranges. Earn a multiplier per delivered message. Protected by per-account quotas, later by `RLN` proofs.
3. **Opening the operator set** is tied to Tier-3 split-trust ingress, not to a date.
4. **Client Open-Source Sustainability:** Core client, directory verifier, and `zeromx-relay` remain 100% open-source (auditable reproducible builds), while the B2B Admin Policy Console, managed fiat onboarding, and turnkey enterprise compliance reporting generate high-margin software revenue.
