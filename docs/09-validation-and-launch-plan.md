# 09 — 14-Day Demand Validation & Announcement Playbook

## 1. Core Principle: Test Willingness to Pay Before Writing Production Code

A free waitlist of 1,000 people does **not** prove willingness to pay — especially in privacy software, where stated preference ("I care about privacy!") dramatically exceeds revealed preference ("I will configure DNS, install an extension, use a second phone app, and pay $3/month").

Conversely, **1 signup from a cold personal link drop on X/LinkedIn is not statistically meaningful** — cold link drops without native video or a valid `og:image` get throttled by algorithms and typically pull <100 clicks from non-target followers.

The goal of this 14-day sprint is to put **1,000–5,000 high-intent eyeballs** in front of `https://zeromx.cukier.xyz/` AND run **30 direct customer interviews** to make a hard, data-driven **Go / Pivot-to-B2B / Kill** decision before investing months into Rust/TEE/JAM engineering.

---

## 2. Metrics Built Into the Site Right Now

Every visitor action emits first-party, cookie-free aggregate counts via `POST /api/event` (and stores leads/intent via `POST /api/waitlist`):

| Funnel Metric | Redis Key | What It Measures |
| :--- | :--- | :--- |
| **Visitors & Sources** | `zeromx:funnel:total` (`pageview`) & `zeromx:sources:total` | Which channels (`reddit`, `x`, `hn`, `polkadot`, `linkedin`) actually drive clicks. |
| **Product Hook Engagement** | `lens_drag`, `demo_provider_view`, `demo_compose` | Whether visitors understand and play with the core mechanism. |
| **Top-of-Funnel Demand** | `waitlist_open` -> `waitlist_submit` | Step-1 email capture conversion rate. |
| **Setup Segmentation** | `zeromx:waitlist:entries` (`provider`, `mailClient`, `ownsDomain`, `planInterest`) | % on Gmail vs. Outlook, % in Spark/Apple Mail (Bridge demand), % owning a domain, % B2B Team interest. |
| **Willingness-to-Pay Signal** | `zeromx:waitlist:wtp` (`wtp_founding_click`) | % of signups who explicitly click **"Reserve Founding Slot ($15 refundable)"** on Step 2. |

---

## 3. Pre-Launch Checklist (Before Posting Anywhere)

1. **Verify Live Storage & Funnel:** Ensure Upstash Redis (`KV_REST_API_*` or `UPSTASH_REDIS_REST_*`) is linked in Vercel -> Storage, and test one real signup end-to-end on `https://zeromx.cukier.xyz/` (both Step 1 signup and Step 2 Founding Slot click).
2. **Verify Social Card Cache:** Paste `https://zeromx.cukier.xyz/` into LinkedIn Post Inspector (`linkedin.com/post-inspector`) and `opengraph.xyz` to confirm the new 1200×630 `og.png` loads cleanly with zero overlap.
3. **Public GitHub Repo (`docs/` + `site/`):** DONE — live at `https://github.com/danicuki/zeromx` (including public `docs/07-threat-model-and-limits.md` and `docs/08-why-polkadot-jam.md`).
4. **Enable Vercel Web Analytics** (1 click in Vercel Dashboard -> Analytics; already wired to `/_vercel/insights/script.js` under CSP `'self'`).

---

## 4. The 45-Second Native Demo Video (Mandatory for X & LinkedIn)

Never post a bare link on X or LinkedIn. Record a crisp 45-second screen capture (1080p, no fluff, crisp mic):

- **0:00–0:08 (Hook):** *"A friend quit Proton and went back to Gmail because nobody wants a second inbox — and corporate Google SSO makes leaving impossible. Here's the alternative we're building."*
- **0:08–0:24 (The Magic):** Drag the hero lens slowly across the Mount Sinai lab report -> scroll to the Inbox Simulator -> flip to **"What the provider stores"** (screen snaps to black ciphertext) -> type `Sinai` in search (0 results for Google) -> flip back to **"What you see"** (instant match + Local MCP).
- **0:24–0:38 (Honest Trade-Offs):** *"What's the catch? You need a custom domain, and on your phone you read sealed mail in the ZeroMX app. Everything else stays in Gmail."*
- **0:38–0:45 (CTA):** *"Full threat model and interactive prototype in the first reply — tear it apart."*

Upload the video **natively** on X and LinkedIn; put `https://zeromx.cukier.xyz/?utm_source=x` (or `?utm_source=linkedin`) in the **first reply/comment**.

---

## 5. Staggered 14-Day Distribution Plan

### Wave 1 (Days 1–3): Privacy & DeGoogle Communities (High-Intent Consumers)
Target subreddits with 2M+ combined members already fighting this exact problem:
- `r/ProtonMail` (~140k)
- `r/degoogle` (~180k)
- `r/privacy` (~1.5M)
- `r/selfhosted` (~450k)

**Exact Post Formula (Authentic Engineering Story, Zero Marketing Pitch):**
> **Title:** *A friend quit Proton back to Gmail because of multi-inbox friction — so I designed an open architecture to make Gmail store ciphertext instead. Roast our threat model.*
>
> **Body:** Share the real dilemma (cannot leave Google/M365 workflow & SSO, hate paying $5–$12/mo for a second desktop inbox, don't want Google Gemini scanning decades of personal/medical/financial mail). Summarize the exact honest limits from `docs/07` upfront (TEE physical-access limits, second phone app, other side's copy). Link directly to the public GitHub `docs/07-threat-model-and-limits.md` + `https://zeromx.cukier.xyz/?utm_source=reddit`. Ask: *"Would you actually switch your domain to this for $3/mo, or is the separate phone app a dealbreaker?"*

### Wave 2 (Days 4–6): Hacker News & Lobste.rs (Technical Credibility + Early Adopters)
- **Rule:** Do NOT post a pure waitlist page to Hacker News. Post the **public threat model & architecture** (or a 200-line Week-1 open-source `zeromx-crypto` CLI + Gmail deliverability benchmark results!).
- **Title:** *Blinding Gmail without leaving Gmail: architecture, honest threat model, and interactive prototype* -> `https://zeromx.cukier.xyz/?utm_source=hn` (with link to public GitHub docs in first author comment).

### Wave 3 (Days 5–8): Polkadot / JAM & Web3 Privacy Ecosystem (Devs + Grants)
- Post in **Polkadot Forum**, **JAM Implementers channels**, and **Web3 Privacy Now** using `docs/08-why-polkadot-jam.md` as the centerpiece:
  - Angle: *"A real non-financial verification-heavy workload for Polkadot JAM (`Refine` SEV-SNP/TDX quote checks) + why we're funding/building a browser JAM light client."*
- Separate investor/grant conversations cleanly through `https://zeromx.cukier.xyz/investors?utm_source=polkadot`.

### Wave 4 (Days 7–10): $100–$150 Cold Reddit Ad Smoke Test (Zero Bias!)
- Run a 72-hour Reddit Ads test targeting **only** `r/privacy`, `r/degoogle`, `r/ProtonMail`, `r/selfhosted` (`?utm_source=reddit_ads`).
- Headline: *"Keep Gmail. Stop Google from reading it."*
- Budget: $100–$150 (~300–500 targeted cold visitors). Gives unbiased conversion numbers completely independent of your personal social graph.

### Wave 5 (Parallel, Days 1–14): 30 Direct 1-on-1 Discovery Calls / DMs (Highest Signal!)
Split strictly into two cohorts:
1. **15 Individual Power Users** (founders, devs, consultants who own a domain on Gmail/Workspace):
   - *"Walk me through the last time you worried about Gmail scanning your mail. If I set up ZeroMX on your domain next week for $3/mo — knowing you'll use a separate ZeroMX app on your phone — would you actually put down $15 refundable today? If not, why?"*
2. **15 B2B Decision-Makers** (managing partners at 5–50 person law firms, tax/accounting boutiques, clinics, fintechs, or VC funds running Google Workspace / M365):
   - *"You're locked into Google Workspace/M365 for SSO and Docs, but Gemini/cloud subpoenas can read client contracts and privileged mail. Google CSE is $30/seat and ignores inbound external client mail. Would you pilot a drop-in MX gateway at $15/seat/month if it includes org-held keys and compliance journaling?"*

---

## 6. Day-14 Decision Gate (Go / Pivot / Kill)

Evaluate ruthlessly after **>= 1,000 targeted visitors** and **30 direct interviews** (plus Week-1 Deliverability Test `ZMX-000`):

| Outcome | Quantitative Threshold | Action |
| :--- | :--- | :--- |
| **🟢 GO (Consumer + Bridge)** | `>= 8%` cold visitor -> waitlist conversion **AND** `>= 15–20` users click/commit to the `$15` refundable Founding Slot **AND** `ZMX-000` Gmail deliverability passes >99.5%. | Build Phase 0 Private Alpha immediately; invoice founding batch via Stripe when alpha opens. |
| **🟡 PIVOT TO B2B GATEWAY** | Consumer waitlist <5% or WTP <1% (custom-domain + second phone app kills consumer urgency), **BUT** `>= 3` regulated Workspace/M365 firms commit to a paid `$15/seat/mo` pilot. | Drop $3/mo consumer positioning; build single-tenant B2B Workspace/M365 gateway + org-held key server first. |
| **🔴 KILL / RE-SCOPE** | `< 2%` cold waitlist conversion across privacy communities **AND** `< 5` WTP clicks **AND** zero B2B pilot pull (or Google blocks sealed relay forwarding in `ZMX-000`). | Stop before investing 6–12 months; extract reusable open-source assets (e.g., JAM attestation verifier or browser JAM light client grant). |
