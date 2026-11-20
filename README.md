# ZeroMX

**A mailbox only you can open. And you own it.**

Email has sovereignty without privacy: an address on your own domain is yours, and whoever stores your mailbox can read all of it. Messengers have privacy without sovereignty. ZeroMX is built to give both.

It has four parts, and each can be replaced without changing your address:

- **Relays** are the mail servers the world sees for your domain (`@yourdomain.com`). A relay seals each message to your public key inside an attested confidential VM, writes the sealed file to your storage, and keeps nothing.
- **Storage you control** holds only sealed files: ZeroMX Storage by default, or your own S3-compatible bucket.
- **Your devices** hold the private key and a full local copy, and search locally. On a computer, **ZeroMX Bridge** (a local IMAP/SMTP server) serves the mail to Apple Mail, Outlook or Thunderbird. On a phone you use the ZeroMX app.
- **A public directory** of keys, relay measurements and operators that nobody can quietly rewrite, including the ZeroMX team. It is deployed on **Polkadot**: a signed log first, a contract on Polkadot Hub at the beta, a JAM service as the target.

Privacy does not depend on a blockchain. Polkadot is what keeps the directory, the operator list and your name out of any company's hands, including ours. The product never requires the Polkadot app.

**Status: design stage.** Nothing here is in production. The first alpha is desktop only, with relays run by the team. What the system protects, what it does not, and who is still trusted are stated in [docs/07](docs/07-threat-model-and-limits.md).

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
│   ├── 01-architecture.md             # Relays, storage, devices, directory: flows, storage options, clients, tiers
│   ├── 02-technical-specification.md  # Sealed file format, storage & sync, directory, relay daemon, Bridge & clients
│   ├── 03-business-model.md           # Who buys, cost structure, pricing, optional DOT stake & B2B gateway
│   ├── 04-roadmap.md                  # Private alpha to open network, week-1 gates, external gates & top risks
│   ├── 05-development-plan.md         # Target Rust monorepo layout, guardrails, reproducible builds & QA matrix
│   ├── 06-backlog-and-issues.md       # 10 Epics & 47 issue entries (ZMX-000..ZMX-046): 42 active, 5 dropped
│   ├── 07-threat-model-and-limits.md  # What is protected, who is trusted, known limits, claims we do not make
│   ├── 08-why-polkadot-jam.md         # Why Polkadot, what it gives and does not, and the "only JAM" argument reviewed
│   └── 09-validation-and-launch-plan.md # 14-day demand validation, WTP test & launch playbook
└── vercel.json                        # Zero-config static deployment configuration for Vercel
```

---

## Documentation Index

1. **[01 — Architecture Overview](docs/01-architecture.md)**: The thesis, the four planes (relays, storage, devices, directory), the mail flows, storage options, clients, relay operators, and the three assurance tiers.
2. **[02 — Technical Specification](docs/02-technical-specification.md)**: The hybrid post-quantum `HPKE` sealed file format with Padmé padding, storage layout and adapters, write-only relay credentials, accept-after-write delivery, state sync through per-device sealed logs, the public directory (signed log, Polkadot Hub contract, JAM service), the relay daemon, device keys and recovery, local search with Gmail-style operators, ZeroMX Bridge, the phone app, and the local MCP server.
3. **[03 — Business Model](docs/03-business-model.md)**: Who buys this, cost structure, subscription pricing, the planned free tier, optional Stake-to-Use, the B2B gateway's requirements, and where DOT demand comes from.
4. **[04 — Product & Engineering Roadmap](docs/04-roadmap.md)**: Private alpha to open network, with week-1 gates, external gates and top risks.
5. **[05 — Development Plan](docs/05-development-plan.md)**: Proposed Rust monorepo architecture, release integrity, storage-credential scoping tests, platform independence in CI, and the QA matrix.
6. **[06 — Epics, Backlog & GitHub Issues](docs/06-backlog-and-issues.md)**: Engineering backlog with acceptance criteria.
7. **[07 — Threat Model, Trust Boundaries & Known Limits](docs/07-threat-model-and-limits.md)**: What is protected, who is still trusted, why the design changed, and the claims the project does not make. **Start here.**
8. **[08 — Why Polkadot](docs/08-why-polkadot-jam.md)**: Why ZeroMX is not an "only JAM" product, what Polkadot adds, how its pieces are used without depending on the Polkadot app, what ZeroMX gives the ecosystem, and what is still unverified.
9. **[09 — Validation & Launch Plan](docs/09-validation-and-launch-plan.md)**: The 14-day demand test, the willingness-to-pay signal, the distribution waves, and the go / pivot / kill gate.

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

Every waitlist signup captures the email, current email provider (`gmail`, `outlook`, `icloud`, `other`), the app the person reads mail in (`webmail`, `apple-mail`, `spark`, `outlook-app`, `other-app`, `phone`, or `unspecified` if left blank; this shows how many signups the desktop-only alpha with ZeroMX Bridge can serve), custom-domain ownership, and what brings the person here (`fiat-sub`, `stake-dot`, `b2b-team`, `run-node`, `invest`, `contribute`). The investor and developer buttons on the page open the same form with `invest` or `contribute` preselected.

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
