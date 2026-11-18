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
3. Leave all settings at their defaults (`vercel.json` automatically publishes `site/`).
