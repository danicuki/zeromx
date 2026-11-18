# ZeroMX

**Keep Gmail or Outlook. Strip away their power to read your life.**

ZeroMX is a decentralized, provider-agnostic email privacy protocol and client layer powered by **Polkadot JAM** and hardware-attested **Blind MX Enclaves (TEEs)**.

By pointing a custom domain (`@yourdomain.com`) to the ZeroMX relay network, any existing email provider — **Gmail, Google Workspace, Outlook / Microsoft 365, iCloud Mail, Fastmail, or standard IMAP** — is reduced to a **free, blind ciphertext database**. Users keep their everyday inbox, corporate SSO/IdP, unified workflows, instant search, and local AI/MCP integrations without adopting "yet another siloed email app" or trusting a centralized proxy startup.

---

## Repository Structure

```text
.
├── site/                              # Interactive Product Vision & Live UX Simulator (EN default + PT)
│   ├── index.html                     # Landing page + Inbox Simulator + Architecture Explorer + UX Gap Radar
│   ├── styles.css                     # Design system & responsive layout
│   └── app.js                         # Interactive simulator state, bilingual i18n (EN/PT), modals & flows
├── docs/                              # Architecture, Technical Spec, Business Model, Roadmap & Backlog
│   ├── 01-architecture.md             # System architecture, Mermaid sequence diagrams & assurance tiers
│   ├── 02-technical-specification.md  # Cryptographic envelope, Polkadot JAM PVM service, TEE relays & MCP
│   ├── 03-business-model.md           # Storage arbitrage unit economics, Stake-to-Use (DOT) & B2B gateway
│   ├── 04-roadmap.md                  # Phased milestones from PoC (M0) to Mainnet & Enterprise (M4)
│   ├── 05-development-plan.md         # Target Rust/TS monorepo layout, reproducible TEE builds & QA plan
│   └── 06-backlog-and-issues.md       # Prioritized Epics & 24 actionable GitHub issues (ZMX-001..ZMX-024)
└── vercel.json                        # Zero-config static deployment configuration for Vercel
```

---

## Documentation Index

1. **[01 — Architecture Overview](docs/01-architecture.md)**: Data Plane vs. Polkadot JAM Control Plane, provider-agnostic flows, autonomous SMTP operators, and the 3 cryptographic assurance tiers.
2. **[02 — Technical Specification](docs/02-technical-specification.md)**: `HPKE` + `RFC 9788` metadata-hiding envelopes, deterministic thread tokens, SEV-SNP/TDX remote attestation in JAM `Refine` (RISC-V PVM), `Smoldot` P2P verification, ZK `RLN` anti-spam, Passkey (`WebAuthn PRF`) keys, local `SQLite` search, and Local MCP server.
3. **[03 — Business Model & Tokenomics](docs/03-business-model.md)**: Why privacy email failed mainstream adoption, Big Tech storage arbitrage (`$0` archival COGS), `Stake-to-Use` via DOT yield, micro-subscriptions, and B2B Workspace/M365 compliance gateways.
4. **[04 — Product & Engineering Roadmap](docs/04-roadmap.md)**: Milestone breakdown across cryptography, Polkadot JAM service, TEE relays, browser/mobile clients, and enterprise rollout.
5. **[05 — Development Plan](docs/05-development-plan.md)**: Proposed Rust + TypeScript monorepo architecture, reproducible enclave builds, security auditing, and test harnesses.
6. **[06 — Epics, Backlog & GitHub Issues](docs/06-backlog-and-issues.md)**: Ready-to-execute engineering backlog with acceptance criteria and UX gap mitigations.

---

## Running the Interactive Website Locally

No build step or external dependencies are required:

```bash
python3 -m http.server 8420 --directory site
```

Then open `http://localhost:8420` in your browser.

---

## Deploying to Vercel

This repository includes a pre-configured `vercel.json` pointing `outputDirectory` to `site/`.

### Option A — Deploy directly from your terminal (Vercel CLI)

```bash
vercel login
vercel          # Deploy a preview URL
vercel --prod   # Deploy to production
```

### Option B — Continuous Deployment via GitHub

1. Push this repository to GitHub.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Leave all settings at their defaults (`vercel.json` automatically publishes `site/` and deploys `api/waitlist.js` as a Serverless Function).

---

## Capturing Waitlist Signups (`POST /api/waitlist`)

Every waitlist signup captures the user's email, current email provider (`gmail`, `outlook`, `icloud`, `other`), custom-domain ownership, and preferred model (`stake-dot`, `fiat-sub`, `b2b-team`, `run-node`).

Out of the box, signups emit structured `[ZEROMX_WAITLIST]` JSON entries to **Vercel Logs**. For permanent storage + instant alerts, configure **any** of the following optional Environment Variables in Vercel:

1. **Vercel Marketplace Upstash Redis (Recommended, 1-click free tier):**
   - In your Vercel project dashboard, go to **Storage -> Create Database -> Upstash Redis** and link it to the project (`KV_REST_API_URL` + `KV_REST_API_TOKEN` or `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` are injected automatically). Signups are stored deduplicated under `zeromx:waitlist:entries`.
2. **Slack / Discord / Telegram / n8n Webhook:**
   - Set `WAITLIST_WEBHOOK_URL` to receive real-time notifications on every signup.
3. **Private GitHub Repo Issues:**
   - Set `GITHUB_TOKEN` (fine-grained token with `Issues: Read & Write`) + `WAITLIST_GITHUB_REPO` (e.g. `youruser/zeromx-waitlist` — enforced private-only so emails never leak publicly).
4. **Email Notification via Resend:**
   - Set `RESEND_API_KEY` + `WAITLIST_NOTIFY_EMAIL`.
