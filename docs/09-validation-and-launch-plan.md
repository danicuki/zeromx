# 09 — 14-Day Demand Validation & Announcement Playbook

## 1. Core Principle: Test Willingness to Pay Before Writing Production Code

A free waitlist of 1,000 people does **not** prove willingness to pay — especially in privacy software, where stated preference ("I care about privacy!") far exceeds revealed preference ("I will point my domain's DNS at a new service, import my mailbox, install a Bridge, use a separate phone app, and pay $3/month").

Conversely, **1 signup from a cold personal link drop on X/LinkedIn is not statistically meaningful** — cold link drops without native video or a valid `og:image` get throttled by algorithms and typically pull <100 clicks from non-target followers.

The goal of this 14-day sprint is to put **1,000–5,000 high-intent eyeballs** in front of `https://zeromx.cukier.xyz/` AND run **30 direct customer interviews** to make a hard, data-driven **Go / Pivot-to-B2B / Kill** decision before investing months into relay, storage and Bridge engineering.

**The question this sprint has to answer** changed with the design. The product is no longer a layer over Gmail. It is a new mailbox with the same address and the same desktop mail app. So the thing to measure is whether people who own a domain will move their mailbox for privacy and control, knowing the trade-offs in advance.

---

## 2. Metrics Built Into the Site Right Now

Every visitor action emits first-party, cookie-free aggregate counts via `POST /api/event` (and stores leads/intent via `POST /api/waitlist`):

| Funnel Metric | Redis Key | What It Measures |
| :--- | :--- | :--- |
| **Visitors & Sources** | `zeromx:funnel:total` (`pageview`) & `zeromx:sources:total` | Which channels (`reddit`, `x`, `hn`, `polkadot`, `linkedin`) actually drive clicks. |
| **Product Hook Engagement** | `lens_drag`, `demo_provider_view`, `demo_compose` | Whether visitors understand and play with the core mechanism. (`demo_provider_view` keeps its name; it now counts switches to "What the storage holds".) |
| **Top-of-Funnel Demand** | `waitlist_open` -> `waitlist_submit` | Step-1 email capture conversion rate. |
| **Setup Segmentation** | `zeromx:waitlist:entries` (`provider`, `mailClient`, `ownsDomain`, `planInterest`) | Where mail lives today (import source), % reading in a desktop mail app (served by the Bridge from the alpha), % reading only in a browser or mostly on a phone (not served by the alpha), % owning a domain, % B2B Team interest. |
| **Willingness-to-Pay Signal** | `zeromx:waitlist:wtp` (`wtp_founding_click`) | % of signups who explicitly click **"Reserve Founding Slot ($15 refundable)"** on Step 2. |

The `mailClient` split matters more than before: it says how many signups the desktop-only alpha can actually serve.

---

## 3. Pre-Launch Checklist (Before Posting Anywhere)

1. **Verify Live Storage & Funnel:** Ensure Upstash Redis (`KV_REST_API_*` or `UPSTASH_REDIS_REST_*`) is linked in Vercel -> Storage, and test one real signup end-to-end on `https://zeromx.cukier.xyz/` (both Step 1 signup and Step 2 Founding Slot click).
2. **Verify Social Card Cache:** Paste `https://zeromx.cukier.xyz/` into LinkedIn Post Inspector (`linkedin.com/post-inspector`) and `opengraph.xyz` to confirm the 1200×630 `og.png` loads cleanly and carries the current headline.
3. **Public GitHub Repo (`docs/` + `site/`):** DONE — live at `https://github.com/danicuki/zeromx` (including public `docs/07-threat-model-and-limits.md` and `docs/08-why-polkadot-jam.md`).
4. **Enable Vercel Web Analytics** (1 click in Vercel Dashboard -> Analytics; already wired to `/_vercel/insights/script.js` under CSP `'self'`).
5. **Read every post against [07, section 8](07-threat-model-and-limits.md)** ("Claims we do not make") before it goes out. No post may promise staying in Gmail, "no migration", "works with every mail app", or anything about the Polkadot app.

---

## 4. The 45-Second Native Demo Video (Mandatory for X & LinkedIn)

Never post a bare link on X or LinkedIn. Record a crisp 45-second screen capture (1080p, no fluff, crisp mic):

- **0:00–0:08 (Hook):** *"Email is the one address that's really yours. And whoever stores your mailbox can read all of it. Here's what we're building: a mailbox only you can open, and you own it."*
- **0:08–0:24 (The Magic):** Drag the hero lens slowly from **"On your screen"** to **"In storage"** -> scroll to the Inbox Simulator -> flip to **"What the storage holds"** (the screen turns to sealed files) -> search for a word from the message (nothing to match: storage holds no sender, no subject, no text) -> flip back to **"What you see"** (instant match from the local copy, available to your own AI through local MCP).
- **0:24–0:38 (Honest Trade-Offs):** *"What's the catch? You need your own domain. It's a new mailbox, and your old mail is imported. On your computer you keep your mail app, through a small Bridge. On your phone you'll use the ZeroMX app, and the first alpha is desktop only."*
- **0:38–0:45 (CTA):** *"Full threat model and interactive prototype in the first reply — tear it apart."*

Upload the video **natively** on X and LinkedIn; put `https://zeromx.cukier.xyz/?utm_source=x` (or `?utm_source=linkedin`) in the **first reply/comment**.

---

## 5. Staggered 14-Day Distribution Plan

### Wave 1 (Days 1–3): Privacy, Self-Hosting & DeGoogle Communities (High-Intent Consumers)
Target subreddits with 2M+ combined members already fighting this exact problem:
- `r/selfhosted` (~450k) — the bring-your-own-bucket and run-your-own-relay audience
- `r/degoogle` (~180k)
- `r/ProtonMail` (~140k)
- `r/privacy` (~1.5M)

**Exact Post Formula (Authentic Engineering Story, Zero Marketing Pitch):**
> **Title:** *POP3 kept mail on your machine, IMAP moved it to the server, webmail gave the provider everything. I designed an open architecture that seals mail before storage and puts the mailbox back in your hands. Roast our threat model.*
>
> **Body:** Share the real dilemma (an address on your own domain is yours, but the mailbox sits readable at one company; encrypted providers fix that by becoming a new island with their storage, their apps and a paid bridge). Describe the design in four lines: relays seal on arrival inside attested confidential VMs, sealed files go to storage you choose (ours or your own bucket), your devices hold the key and a full local copy, and a local Bridge serves Apple Mail, Outlook or Thunderbird. Summarize the exact honest limits from `docs/07` upfront (TEE physical-access limits, the relay's moment with outside mail, the other side's copy, a separate phone app, desktop-only alpha, the team runs the relays at first). Link directly to the public GitHub `docs/07-threat-model-and-limits.md` + `https://zeromx.cukier.xyz/?utm_source=reddit`. Ask: *"Would you actually move your domain's mail to this for $3/mo, or is a new mailbox plus a separate phone app a dealbreaker?"*

### Wave 2 (Days 4–6): Hacker News & Lobste.rs (Technical Credibility + Early Adopters)
- **Rule:** Do NOT post a pure waitlist page to Hacker News. Post the **public threat model & architecture** (or a small Week-1 open-source artifact: the `zeromx-crypto` sealing CLI, or the mail-app compatibility table from `ZMX-000`).
- **Title:** *Email sealed before storage, in a mailbox you own: architecture, honest threat model, and interactive prototype* -> `https://zeromx.cukier.xyz/?utm_source=hn` (with link to public GitHub docs in first author comment).
- Expect and prepare for three questions: "how is this different from Proton plus its bridge" ([03, section 1](03-business-model.md)), "attestation does not prove nobody read it" ([07, section 4](07-threat-model-and-limits.md)), and "why is there a blockchain" ([08, section 2](08-why-polkadot-jam.md)).

### Wave 3 (Days 5–8): Polkadot / JAM & Web3 Privacy Ecosystem (Devs + Funding)
- Post in **Polkadot Forum**, **JAM Implementers channels**, and **Web3 Privacy Now** using `docs/08-why-polkadot-jam.md` as the centerpiece. Lead with its honesty, in this order:
  1. *"This is not a product only JAM makes possible, and its privacy does not depend on a chain. Here is the one thing the chain does: a key directory and operator list nobody can rewrite, including us."*
  2. *What ZeroMX gives Polkadot* ([08, section 8](08-why-polkadot-jam.md)): a product people open every day, measured in people; operator bonds in DOT; subscriptions payable in dotUSD; `.dot` names and Proof of Personhood in use; an open-source SEV-SNP and TDX verifier for PVM.
  3. *What is unverified and how we test it* ([08, section 9](08-why-polkadot-jam.md)): the Product spike.
- **Funding route:** the Web3 Foundation grants programs are closed. Open a conversation with the Polkadot Community Foundation and prepare a milestone-based OpenGov treasury proposal, with the milestones in [08, section 8](08-why-polkadot-jam.md). Promise no user numbers before the alpha and no JAM date.
- Separate investor/grant conversations cleanly through `https://zeromx.cukier.xyz/investors?utm_source=polkadot`.

### Wave 4 (Days 7–10): $100–$150 Cold Reddit Ad Smoke Test (Zero Bias!)
- Run a 72-hour Reddit Ads test targeting **only** `r/privacy`, `r/degoogle`, `r/ProtonMail`, `r/selfhosted` (`?utm_source=reddit_ads`).
- Headline: *"A mailbox only you can open. And you own it."*
- Budget: $100–$150 (~300–500 targeted cold visitors). Gives unbiased conversion numbers completely independent of your personal social graph.

### Wave 5 (Parallel, Days 1–14): 30 Direct 1-on-1 Discovery Calls / DMs (Highest Signal!)
Split strictly into two cohorts:
1. **15 Individual Power Users** (founders, devs, consultants who own a domain and read mail in a desktop app):
   - *"Walk me through where your mail lives today and which app you read it in. If I set up ZeroMX on your domain next week for $3/mo — knowing it's a new mailbox with your old mail imported, that you keep your desktop mail app through a Bridge, and that there's no phone app until the beta — would you actually put down $15 refundable today? If not, which of those stops you?"*
   - Record the mail app and whether they read mostly on a phone. Those two answers decide who the alpha can serve.
2. **15 B2B Decision-Makers** (managing partners at 5–50 person law firms, tax/accounting boutiques, clinics, fintechs, or VC funds running Google Workspace / M365):
   - *"You keep Workspace or M365 for sign-in and documents, but client contracts and privileged mail sit readable in a US cloud. Would you pilot dedicated mail relays in your jurisdiction that seal every inbound message into a bucket your firm owns, with staff reading in Outlook or Apple Mail, at $15/seat/month, if it includes org-held keys and compliance journaling?"*
   - Ask one more: *"Does your mail have to stay inside the Exchange or Gmail mailbox, or only be unreadable to the provider?"* The answer sizes the demand for the existing-IMAP-mailbox adapter ([02, section 2.7](02-technical-specification.md)).
   - The $15/seat ask is a willingness-to-pay test. The planning price is $6–$9 per seat ([03, Model C](03-business-model.md)).

---

## 6. Day-14 Decision Gate (Go / Pivot / Kill)

Evaluate ruthlessly after **>= 1,000 targeted visitors** and **30 direct interviews**, together with the week-1 engineering gates in `ZMX-000` (mail-app compatibility, outbound deliverability, accept-after-write):

| Outcome | Quantitative Threshold | Action |
| :--- | :--- | :--- |
| **🟢 GO (Consumer, Bridge first)** | `>= 8%` cold visitor -> waitlist conversion **AND** `>= 15–20` users click/commit to the `$15` refundable Founding Slot **AND** at least a third of signups read mail in a desktop app **AND** `ZMX-000` passes: Apple Mail and Thunderbird work against the local server, client-signed mail reaches the inbox at Gmail and Microsoft, and a sender retries successfully after a `451`. | Build Phase 0 Private Alpha immediately; invoice founding batch via Stripe when alpha opens. |
| **🟡 PIVOT TO B2B GATEWAY** | Consumer waitlist <5% or WTP <1% (own domain + new mailbox + separate phone app kills consumer urgency), **BUT** `>= 3` regulated Workspace/M365 firms commit to a paid `$15/seat/mo` pilot. | Drop $3/mo consumer positioning; build single-tenant relays, the firm's-own-bucket storage and the org-held key service first. |
| **🟡 RE-SEQUENCE** | Demand passes, but most signups read only in a browser or mostly on a phone. | Keep the plan and move the phone app or the pinned web client ahead of other work, and say so to the waitlist. |
| **🔴 KILL / RE-SCOPE** | `< 2%` cold waitlist conversion across privacy communities **AND** `< 5` WTP clicks **AND** zero B2B pilot pull (or `ZMX-000` fails with no workaround: no major mail app accepts a local account, or relay mail cannot reach the inbox). | Stop before investing 6–12 months; extract reusable open-source assets (the PVM attestation verifier, the storage and sync library). |
