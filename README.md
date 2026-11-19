# ZeroMX

**Keep your inbox. Make it blind.**

ZeroMX seals the mail sent to your custom domain (`@yourdomain.com`) before it reaches your mailbox provider. Your provider stores ciphertext it cannot read, search, or scan. On desktop you keep reading and replying inside your normal webmail through a browser extension, or in a desktop mail app (Apple Mail, Spark, Outlook, Thunderbird) through **ZeroMX Bridge**, a local IMAP/SMTP proxy. On your phone you use the ZeroMX app.

Relays run in attested confidential VMs. Keys, relay measurements, and operators are recorded in a public control plane designed for **Polkadot JAM**. Gmail on desktop Chrome is the first supported vault. Outlook, iCloud, Fastmail and generic IMAP follow.

**Status: design stage.** Nothing here is in production. What the system protects, what it does not, and who is still trusted are stated in [docs/07](docs/07-threat-model-and-limits.md).

---

## Repository Structure

```text
.
├── site/                              # Landing page and interactive prototype (EN + PT), no build step
│   ├── index.html                     # Consumer & developer landing page: lens, demo, trust, waitlist
│   ├── investors.html                 # Dedicated /investors brief + direct founder contact form
│   ├── investors.js                   # Investor brief localization & submission logic
│   ├── styles.css                     # "Sealed post" identity: paper, ink, seal red
│   ├── i18n.js                        # All copy, English and Brazilian Portuguese
│   ├── app.js                         # Lens, inbox simulator, 2-step waitlist + WTP test, funnel events
│   ├── fonts/                         # Self-hosted Instrument Serif, Instrument Sans, IBM Plex Mono (OFL)
│   ├── favicon.svg
│   └── og.png                         # Crisp 1200x630 social share preview image
├── api/
│   ├── waitlist.js                    # POST /api/waitlist multi-step lead + WTP + investor/dev handler
│   └── event.js                       # POST /api/event zero-cookie aggregate funnel counter
├── docs/                              # Architecture, Technical Spec, Business Model, Roadmap & Backlog
│   ├── 01-architecture.md             # System architecture, Mermaid sequence diagrams & assurance tiers
│   ├── 02-technical-specification.md  # Cryptographic envelope, Polkadot JAM PVM service, TEE relays & MCP
│   ├── 03-business-model.md           # Storage arbitrage unit economics, Stake-to-Use (DOT) & B2B gateway
│   ├── 04-roadmap.md                  # Private alpha to open network, external gates & top risks
│   ├── 05-development-plan.md         # Target Rust/TS monorepo layout, reproducible TEE builds & QA plan
│   ├── 06-backlog-and-issues.md       # Prioritized Epics & 37 actionable GitHub issues (ZMX-000..ZMX-036)
│   ├── 07-threat-model-and-limits.md  # What is protected, who is trusted, known limits, claims we do not make
│   ├── 08-why-polkadot-jam.md         # What JAM adds, what it lacks today, and a review of the "only JAM" argument
│   └── 09-validation-and-launch-plan.md # 14-day demand validation, WTP test & launch playbook
└── vercel.json                        # Zero-config static deployment configuration for Vercel
```

---

## Documentation Index

1. **[01 — Architecture Overview](docs/01-architecture.md)**: Data plane vs. control plane, the three mail flows, relay operators, and the three assurance tiers.
2. **[02 — Technical Specification](docs/02-technical-specification.md)**: Hybrid post-quantum `HPKE` envelopes with `RFC 9788` protected headers, pseudonymized threading, Padmé padding, the control plane (transparency log, then JAM service), relay daemon, Passkey (`WebAuthn PRF`) keys, local search with Gmail-style operators, ZeroMX Bridge for desktop mail apps, and Local MCP server.
3. **[03 — Business Model](docs/03-business-model.md)**: Who buys this, cost structure, subscription pricing, optional Stake-to-Use, and the B2B gateway's requirements.
4. **[04 — Product & Engineering Roadmap](docs/04-roadmap.md)**: Private alpha to open network, with external gates and top risks.
5. **[05 — Development Plan](docs/05-development-plan.md)**: Proposed Rust + TypeScript monorepo architecture, reproducible enclave builds, security auditing, and test harnesses.
6. **[06 — Epics, Backlog & GitHub Issues](docs/06-backlog-and-issues.md)**: Engineering backlog with acceptance criteria.
7. **[07 — Threat Model, Trust Boundaries & Known Limits](docs/07-threat-model-and-limits.md)**: What is protected, who is still trusted, the corrections made to the original design, and the claims the project does not make. **Start here.**
8. **[08 — Why Polkadot JAM](docs/08-why-polkadot-jam.md)**: What JAM genuinely adds to the control plane, what it does not provide yet, the alternatives compared, and what that means for the plan.

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

Every waitlist signup captures the email, current email provider (`gmail`, `outlook`, `icloud`, `other`), the app the person reads mail in (`webmail`, `apple-mail`, `spark`, `outlook-app`, `other-app`, `phone`, or `unspecified` if left blank; this sizes the demand for ZeroMX Bridge), custom-domain ownership, and what brings the person here (`fiat-sub`, `stake-dot`, `b2b-team`, `run-node`, `invest`, `contribute`). The investor and developer buttons on the page open the same form with `invest` or `contribute` preselected.

> [!IMPORTANT]
> **Configure at least one storage backend before sharing the link.** Vercel runtime logs expire, so they are not a waitlist. If no backend below stores the entry, the endpoint answers `503` and the form shows an error, instead of confirming a signup that was never saved.

Configure **any** of the following Environment Variables in Vercel:

1. **Vercel Marketplace Upstash Redis (Recommended, 1-click free tier):**
   - In your Vercel project dashboard, go to **Storage -> Create Database -> Upstash Redis** and link it to the project (`KV_REST_API_URL` + `KV_REST_API_TOKEN` or `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` are injected automatically). Signups are stored deduplicated under `zeromx:waitlist:entries`.
2. **Slack / Discord / Telegram / n8n Webhook:**
   - Set `WAITLIST_WEBHOOK_URL` to receive real-time notifications on every signup.
3. **Private GitHub Repo Issues:**
   - Set `GITHUB_TOKEN` (fine-grained token with `Issues: Read & Write`) + `WAITLIST_GITHUB_REPO` (e.g. `youruser/zeromx-waitlist` — enforced private-only so emails never leak publicly).
4. **Email Notification via Resend:**
   - Set `RESEND_API_KEY` + `WAITLIST_NOTIFY_EMAIL`.
