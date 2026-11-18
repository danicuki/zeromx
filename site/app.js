const TRANSLATIONS = {
  en: {
    pageTitle: 'ZeroMX — Sovereign Email Inside Gmail or Outlook (Powered by Polkadot JAM)',
    nav_sim: 'Inbox Simulator',
    nav_arch: 'How It Works',
    nav_proofs: 'Operators & Proofs',
    nav_onboard: 'Custom Domain',
    nav_gaps: 'UX Gap Radar',
    nav_cta: 'Join Waitlist',

    hero_eyebrow: 'True Sovereignty + Zero-Friction UX • Any Email Provider',
    hero_title: 'Keep using <span class="gradient-text">Gmail or Outlook</span>.<br />Strip away their power to read your life.',
    hero_sub: 'Point your custom domain (<code>@yourdomain.com</code>) to a decentralized network of blind MX nodes coordinated by <strong>Polkadot JAM</strong>. Google and Microsoft become dumb, free ciphertext storage — while you read, search, reply, and run local AI/MCP agents without juggling "yet another email app".',
    hero_btn_waitlist: '🚀 Join Early Access Waitlist',
    hero_btn_primary: 'Try Live Inbox Simulator',
    hero_btn_secondary: 'Who Runs SMTP & How Is Privacy Proven?',
    hero_providers_label: 'Works with any destination inbox:',
    hero_provider_imap: '⚡ Fastmail / Any IMAP',

    pillar1_title: 'Zero "Island Effect"',
    pillar1_desc: 'No separate siloed email app to check. Your encrypted personal emails live inside the exact same inbox as your work accounts while keeping corporate SSO/IdP intact.',
    pillar2_title: 'No Central Proxy Company',
    pillar2_desc: 'Unlike centralized alias proxies, there is no startup server to trust. SMTP edge nodes run inside hardware enclaves (TEEs) cryptographically attested on Polkadot JAM.',
    pillar3_title: 'Local MCP for Your AI Agents',
    pillar3_desc: 'Cloud AI (Gemini / Copilot) sees pure gibberish. Meanwhile, a built-in Local MCP server unlocks full semantic search and automation on your own machine for your own LLMs.',
    pillar4_title: 'Big Tech Pays the Storage Bill',
    pillar4_desc: 'Because encrypted blobs sit inside your free 15 GB / 50 GB Gmail or Outlook storage, network cost is tiny — or <strong>$0/month forever</strong> via reversible DOT staking.',

    sim_tag: '01 // User Perspective',
    sim_title: 'Live Inbox Simulator: Blind Cloud Server vs. Your Screen',
    sim_desc: 'Switch between <strong>Gmail</strong> and <strong>Outlook</strong> below, toggle to the <strong>Big Tech Disk View</strong> to inspect what actually lands on their servers, and test local instant search and zero-leak replies.',
    sim_provider_label: 'Your Provider:',
    sim_view_label: 'Perspective:',
    sim_view_user: '🟢 What YOU See (ZeroMX Active)',
    sim_view_bigtech: '🔴 What GOOGLE / MICROSOFT Sees on Disk',
    sim_mobile_btn: '📱 What About Mobile? (Inspect UX Gap)',
    sim_search_placeholder: '🔍 Search emails (try: Sinai, wire, DOT, Acme)...',
    sim_compose_btn: '✍️ Encrypted Compose',
    folder_inbox: 'Inbox',
    folder_starred: 'Starred',
    folder_sent: 'Sent (Ciphertext)',
    origins_title: 'Unified Sources',
    originPersonal: '🛡️ <code>@yourdomain.com</code> (ZeroMX)',
    originWork: '🏢 <code>@acme.io</code> (Work IdP)',

    providerTitleGmail: 'Google Workspace — you@yourdomain.com',
    providerTitleOutlook: 'Microsoft Outlook 365 — you@yourdomain.com',
    extActive: '⚡ ZeroMX Active • Smoldot P2P + Passkey',
    extRawPrefix: '👁️ Raw Disk on:',
    bannerUser: (p) => `<strong>User View:</strong> You use the familiar ${p} UI, with instant local search and a Local MCP endpoint ready for your personal AI agents.`,
    bannerBigTech: (bt) => `<strong>Server Disk View (${bt}):</strong> This is literally all that sits in their data centers. Try typing "Sinai" or "Chase" in the search bar above!`,
    searchStatusUser: '🔍 Search: Local Encrypted SQLite',
    searchStatusBigTech: (p) => `🔍 Server-Side Search (${p}): Blind`,
    noResultsTitle: (q) => `No results for "${q}"`,
    noResultsBigTech: (p) => `Because @yourdomain.com emails are stored as ciphertext, ${p}'s server search finds ZERO keywords! Switch back to "What YOU See" above to watch the local SQLite index find it instantly.`,
    noResultsUser: 'Try terms like Sinai, wire, DOT, or Acme.',
    noMailSelected: 'No email selected for this filter.',
    serverCipherBadge: '🧱 Ciphertext on Server',
    envelopeFromLabel: 'Envelope From visible to server:',
    toLabel: 'To:',
    fromLabel: 'From:',
    sovereigntyLabel: 'Sovereignty Tier:',
    aiProbeFailTitle: (bt) => `🤖 Cloud Inspection Attempt by ${bt}:`,
    aiProbeFailDesc: 'Real sender: <em>Unknown (masked by relay)</em> • Real subject: <em>Hidden (RFC 9788)</em> • Body & Attachments: <em>Mathematically inaccessible without your local private key</em>.',
    switchBackUserBtn: '🟢 View Decrypted (User Perspective)',
    mcpReadyTitle: '🔌 Local MCP Server (localhost:4190):',
    mcpReadyDesc: 'Indexed locally and ready for your own agents (Claude Desktop, Cursor, local scripts) with explicit permission — zero Big Tech cloud exposure.',
    replySecureBtn: '↩️ Encrypted Reply (Zero Draft Leak)',
    peekServerBtn: (p) => `🔴 Peek at how ${p} sees this email`,

    arch_tag: '02 // Architecture Demystified',
    arch_title: 'Follow an Email Step by Step (Click Any Stage)',
    arch_desc: 'Inspect what happens across all 3 real-world scenarios — receiving legacy mail from banks/hospitals, replying without leaking drafts, and messaging another ZeroMX user.',
    flow_tab_inbound: '1. Inbound Legacy Mail (Bank / Hospital → You)',
    flow_tab_outbound: '2. Replying from Gmail / Outlook (You → World)',
    flow_tab_native: '3. ZeroMX ↔ ZeroMX (Pure Mathematical E2EE)',
    visMatrixTitle: 'Visibility Matrix at This Stage',

    proof_tag: '03 // Sovereignty & Port 25 Physics',
    proof_title: 'Who Runs the SMTP Servers? And How Does JAM Prove Nobody Read Your Mail?',
    proof_desc: 'Zero hand-waving: here is who operates the physical relays and the <strong>3 cryptographic assurance tiers</strong> achievable today with Polkadot JAM.',

    onboard_tag: '04 // Universal Onboarding',
    onboard_title: 'Only Prerequisite: Owning a Custom Domain',
    onboard_desc: 'Whether you live in Gmail, Google Workspace, Outlook 365, iCloud, or Fastmail, your custom domain becomes a sovereign cryptographic shield in 3 minutes.',

    gaps_tag: '05 // Critical Product Lens',
    gaps_title: 'UX Gap Radar: Where Could This Break in Daily Life?',
    gaps_desc: 'Looking strictly from a demanding user\'s perspective, blinding Gmail/Outlook introduces <strong>6 real-world friction points</strong> that the product design must solve head-on:',
    footer_text: 'ZeroMX — Product Vision & Interactive Architecture Prototype (Polkadot JAM + Blind MX + Provider-Agnostic)',

    composeModal: {
      tag: 'ISOLATED SHADOW DOM • GMAIL/OUTLOOK DRAFT AUTO-SAVE BLOCKED',
      title: 'Compose / Reply via ZeroMX Network',
      fromLabel: 'From (Your Sovereign Domain)',
      fromAddr: 'you@yourdomain.com',
      toLabel: 'To',
      defaultTo: 'partner@company.com',
      subjLabel: 'Real Subject (hidden from Big Tech in your Sent folder)',
      defaultSubj: 'Confidential Term Sheet',
      bodyLabel: 'Message',
      defaultBody: 'Replying right from my everyday inbox — yet this plaintext never touches Google or Microsoft servers. It leaves encrypted to an attested Egress TEE (with an anonymous JAM RLN anti-spam proof) and stores an encrypted copy in my thread.',
      footerNote: '🔑 Generating ZK rate-limit proof (RLN) + encrypting Sent copy',
      sendBtn: '🚀 Send Encrypted',
      sentNow: 'Just now',
      youLabel: 'You',
      sentTierE2ee: '⚡ Sent with Mathematical E2EE (ZeroMX ↔ ZeroMX)',
      sentTierTee: '🛡️ Sent via Attested Egress TEE + Stored Encrypted'
    },

    mobileModal: {
      tag: 'MOBILE UX SIMULATION (CRITICAL GAP #1)',
      title: 'What happens when your phone buzzes in your pocket?',
      badTitle: '❌ Official Gmail / Outlook Mobile App',
      badDesc: 'Because iOS and Android forbid browser extensions inside native apps, a raw Gmail/Outlook push notification looks like this:',
      goodTitle: '✅ ZeroMX Companion (Lightweight PWA / App)',
      goodDesc: 'Mute the raw encrypted label in Gmail mobile and let the lightweight Companion decrypt notifications locally via iOS/Android Passkey:',
      goodSample: 'Mount Sinai Health\nYour lab results are ready...\n[Unlocked locally via FaceID]',
      summary: '<strong>Why spotting this UX gap matters:</strong> On desktop, reading inside Gmail/Outlook Web is seamless. On mobile, we must choose between a super-fast Passkey Companion reader OR letting users set smart rules (e.g., newsletters pass in cleartext, while banks/health/conversations are encrypted).',
      okBtn: 'Got the trade-off'
    },

    emails: [
      {
        id: 'm1',
        protected: true,
        trustTier: 'e2ee',
        trustLabel: '⚡ Mathematical E2EE (ZeroMX ↔ ZeroMX)',
        realFrom: 'Alice <alice@sovereign.dev>',
        realTo: 'you@yourdomain.com',
        realSubject: 'Polkadot JAM architecture + killing the "second app" problem',
        time: '11:42 AM',
        opaqueFrom: 'relay-91f0a8@ingress.zeromx.network',
        opaqueSubject: '🔒 Thread #9f2c41',
        realBody: `Hey!\n\nSwitching to a siloed encrypted email provider failed for a simple reason: nobody wants to pay $10/month just to babysit a second inbox while staying locked into Google Workspace or Microsoft 365 for corporate SSO/IdP.\n\nWith ZeroMX on Polkadot JAM:\n- You keep living inside Gmail or Outlook.\n- Because both of us use ZeroMX, my browser fetched your public key via Smoldot P2P and encrypted this end-to-end BEFORE it ever left my laptop.\n- Neither Google, Microsoft, nor any SMTP relay operator ever saw a single plaintext byte.`,
        cipherBlob: `-----BEGIN ZEROMX HPKE-X25519 ENVELOPE-----\nVersion: ZeroMX/1.0 (Polkadot-JAM KeyState #4,819,204)\nProtected-Headers: MemoryHole-RFC9788 (From, Subject, Reply-To)\nPadding-Block: 16384 bytes (anti-size-correlation)\n\nhQEMA9z8L2kPq91xAQf/b8K3vN9mQ1x7Lp2wR0tY6uJ4hG8fD2sA5zX9cV1bN3mQ\n7wE4rT6yU8iO0pA2sD4fG6hJ8kL0zX2cV4bN6mQ8wE0rT2yU4iO6pA8sD0fG2hJ4\nkL6zX8cV0bN2mQ4wE6rT8yU0iO2pA4sD6fG8hJ0kL2zX4cV6bN8mQ0wE2rT4yU6i\n=9xQv\n-----END ZEROMX HPKE-X25519 ENVELOPE-----`
      },
      {
        id: 'm2',
        protected: true,
        trustTier: 'tee',
        trustLabel: '🛡️ Blind MX (AMD SEV-SNP TEE Attested on JAM)',
        realFrom: 'Mount Sinai Lab <results@mountsinai.org>',
        realTo: 'you@yourdomain.com',
        realSubject: 'Your blood panel & diagnostic report (PDF attached)',
        time: '09:15 AM',
        opaqueFrom: 'relay-3d7b12@ingress.zeromx.network',
        opaqueSubject: '🔒 Thread #a72f91',
        realBody: `Hello,\n\nYour laboratory panel collected on Nov 16 is now ready.\nSummary: Lipid panel, fasting glucose, and CBC within normal reference ranges.\n\nLocally decrypted attachment: bloodwork_panel_2026.pdf (412 KB)\n\n(ZeroMX Note: The hospital sent standard legacy SMTP. Enclave #14 verified DKIM in encrypted RAM, wrapped sender + subject + PDF with your JAM-certified public key, padded to 512 KB, and wiped RAM in 3.1ms.)`,
        cipherBlob: `-----BEGIN ZEROMX HPKE-X25519 ENVELOPE-----\nVersion: ZeroMX/1.0 (JAM Attested Enclave: sev-snp-0x88f1...2c)\nSpam-Check-RAM: PASS (DKIM=mountsinai.org verified inside enclave)\nPadding-Block: 524288 bytes (uniform 512KB bucket)\n\n9mK2pL5vR8xT1wQ4zY7uN0jH3gF6dS9aZ2xC5vB8nM1qW4eR7tY0uI3oP6aS9dF2\ngH5jK8lZ1xC4vB7nM0qW3eR6tY9uI2oP5aS8dF1gH4jK7lZ0xC3vB6nM9qW2eR5t\nY8uI1oP4aS7dF0gH3jK6lZ9xC2vB5nM8qW1eR4tY7uI0oP3aS6dF9gH2jK5lZ8xC\n=k2Lm\n-----END ZEROMX HPKE-X25519 ENVELOPE-----`
      },
      {
        id: 'm3',
        protected: true,
        trustTier: 'tee',
        trustLabel: '🛡️ Blind MX (Intel TDX TEE Attested on JAM)',
        realFrom: 'Chase Private Client <wires@chase.com>',
        realTo: 'you@yourdomain.com',
        realSubject: 'International wire settlement & November statement',
        time: 'Yesterday',
        opaqueFrom: 'relay-c40e55@ingress.zeromx.network',
        opaqueSubject: '🔒 Thread #44e01b',
        realBody: `Dear Client,\n\nYour international wire transfer #884920 for $14,500.00 USD has settled.\nYour consolidated portfolio statement and tax summary are attached inside this encrypted envelope.\n\nZero ad-targeting models or cloud LLMs had access to your financial records.`,
        cipherBlob: `-----BEGIN ZEROMX HPKE-X25519 ENVELOPE-----\nVersion: ZeroMX/1.0 (JAM Attested Enclave: tdx-0x41a9...9b)\nSpam-Check-RAM: PASS (DMARC=pass)\nPadding-Block: 65536 bytes\n\nLp9wR2tY5uI8oP1aS4dF7gH0jK3lZ6xC9vB2nM5qW8eR1tY4uI7oP0aS3dF6gH9j\nK2lZ5xC8vB1nM4qW7eR0tY3uI6oP9aS2dF5gH8jK1lZ4xC7vB0nM3qW6eR9tY2uI\n=7pZa\n-----END ZEROMX HPKE-X25519 ENVELOPE-----`
      },
      {
        id: 'm4',
        protected: false,
        trustTier: 'plain',
        trustLabel: '⚠️ External Corporate Domain (Company Controls MX)',
        realFrom: 'Acme Security <secops@acme.io>',
        realTo: 'alex@acme.io',
        realSubject: 'Weekly SSO / Google IdP & OAuth audit digest',
        time: 'Yesterday',
        opaqueFrom: 'Acme Security <secops@acme.io>',
        opaqueSubject: 'Weekly SSO / Google IdP & OAuth audit digest',
        realBody: `Team,\n\nAll 42 engineers authenticated via Google Workspace IdP with hardware 2FA enforced this week.\n\n(Why is this message readable even in Big Tech Disk View? Because it was sent to @acme.io whose DNS MX is owned by your employer — demonstrating how unencrypted work mail and 100% sovereign personal mail (@yourdomain.com) coexist peacefully inside one unified inbox!)`,
        cipherBlob: null
      }
    ],

    flows: {
      inbound: [
        {
          step: 'Step 1 • DNS MX',
          title: 'Bank / Hospital sends standard SMTP',
          short: 'Looks up @yourdomain.com MX and connects via TLS.',
          detailTitle: '1. Zero changes required from the sender',
          detailBody: 'When Mount Sinai or Chase emails you@yourdomain.com, their mail server queries your domain\'s DNS MX records and receives 3 IPs belonging to autonomous ZeroMX operators. If one node goes offline, standard SMTP automatically fails over to the next.',
          vis: {
            'Human Server Operator': '❌ Blind (CPU hardware-encrypts RAM)',
            'Hardware Enclave (TEE)': '⚡ Processes in RAM for ~3ms & wipes',
            'Polkadot JAM Validators': '❌ Never receives email bytes',
            'Google / Microsoft': '❌ Has not received anything yet',
            'You': '⏳ Awaiting delivery'
          }
        },
        {
          step: 'Step 2 • TEE Enclave',
          title: 'Spam Filter + Encryption in RAM',
          short: 'Checks DKIM/SPF and encrypts with your public key.',
          detailTitle: '2. Blind MX wraps sender, subject, body & attachments',
          detailBody: 'Inside an AMD SEV-SNP / Intel TDX enclave (whose open-source binary hash was cryptographically attested inside Polkadot JAM\'s RISC-V PVM), the node validates SPF/DKIM/spam in RAM, fetches your JAM-certified public key, encrypts everything (including real From and Subject!), pads to a fixed block size, and zeroes memory.',
          vis: {
            'Human Server Operator': '❌ Blocked by silicon (SEV-SNP / TDX)',
            'Hardware Enclave (TEE)': '🔒 Converts plaintext into Ciphertext',
            'Polkadot JAM Validators': '✅ Certifies chip quote & public key only',
            'Google / Microsoft': '❌ Zero plaintext',
            'You': '🔑 Sole holder of private key'
          }
        },
        {
          step: 'Step 3 • Dumb Storage',
          title: 'Blind Delivery to Gmail / Outlook',
          short: 'Your provider stores ciphertext for free.',
          detailTitle: '3. Gmail or Outlook becomes a free, blind database',
          detailBody: 'The enclave delivers the encrypted MIME envelope to your Gmail or Outlook using an opaque sender (relay-3d7b@...) and a deterministic HMAC thread token (🔒 Thread #a72f91). Native conversation threading keeps working, while Big Tech cloud AI and ad scanners see random noise.',
          vis: {
            'Human Server Operator': '❌ Nothing written to disk',
            'Hardware Enclave (TEE)': '🧹 Memory already wiped',
            'Polkadot JAM Validators': '❌ Zero access',
            'Google / Microsoft': '🧱 Sees padded ciphertext bytes only',
            'You': '📥 Lands in your everyday inbox'
          }
        },
        {
          step: 'Step 4 • Screen + Local MCP',
          title: 'Seamless Decryption + Local Search',
          short: 'Smoldot verifies keys P2P; browser decrypts in 4ms.',
          detailTitle: '4. Native UX + Sovereign Local AI',
          detailBody: 'In your browser or app, the embedded Smoldot Wasm light client verifies key state directly against Polkadot JAM P2P (no centralized RPC). Your Passkey-unlocked local key decrypts the view in real time, updates your local encrypted SQLite search index, and powers your Local MCP server.',
          vis: {
            'Human Server Operator': '❌ Zero access',
            'Hardware Enclave (TEE)': '❌ Out of the loop',
            'Polkadot JAM Validators': '✅ Serves state proof via Smoldot P2P',
            'Google / Microsoft': '❌ Still blind while you read',
            'You': '🟢 Read, search & run local AI seamlessly'
          }
        }
      ],
      outbound: [
        {
          step: 'Step 1 • Shadow Composer',
          title: 'Reply without leaking drafts',
          short: 'Isolated frame blocks Gmail/Outlook auto-save.',
          detailTitle: '1. Plugging the silent Drafts leak',
          detailBody: 'If you typed inside Gmail or Outlook\'s native reply box, every keystroke would auto-save in plaintext to their cloud every 3 seconds. ZeroMX opens an isolated Shadow DOM composer: drafts are encrypted locally before anything touches the network.',
          vis: {
            'Human Server Operator': '❌ Zero access',
            'Egress Enclave (TEE)': '⏳ Awaiting send',
            'Polkadot JAM Validators': '❌ Zero access',
            'Google / Microsoft': '❌ Plaintext draft auto-save blocked',
            'You': '✍️ Composing in complete privacy'
          }
        },
        {
          step: 'Step 2 • ZK Anti-Spam Proof',
          title: 'Anonymous quota proof (RLN on JAM)',
          short: 'Stops spammers without revealing your identity.',
          detailTitle: '2. Protecting outbound IP reputation via Polkadot JAM',
          detailBody: 'To prevent spammers from abusing decentralized relays and blacklisting outbound IPs, your client attaches a Zero-Knowledge Rate-Limiting Nullifier (RLN) proof verified inside JAM Refine — proving you are within your send quota without exposing who you are or whom you are emailing.',
          vis: {
            'Human Server Operator': '❌ Zero access',
            'Egress Enclave (TEE)': '✅ Verifies valid quota proof',
            'Polkadot JAM Validators': '✅ Verifies ZK RLN proof in Refine',
            'Google / Microsoft': '❌ Bypasses Big Tech SMTP completely',
            'You': '🛡️ Sender anonymity preserved'
          }
        },
        {
          step: 'Step 3 • DKIM Send + Sent Copy',
          title: 'Domain-signed SMTP + Encrypted Sent folder',
          short: 'Recipient gets clean mail; Sent stores ciphertext.',
          detailTitle: '3. Clean delivery to the world + Encrypted thread history',
          detailBody: 'The high-reputation Egress Enclave unwraps in RAM, signs with your delegated @yourdomain.com DKIM key, and delivers over TLS to the recipient. Simultaneously, your client appends a copy encrypted with YOUR public key into Gmail/Outlook\'s Sent folder so the full thread stays intact.',
          vis: {
            'Human Server Operator': '❌ Blocked by TEE silicon',
            'Egress Enclave (TEE)': '⚡ Signs DKIM in RAM & wipes',
            'Polkadot JAM Validators': '❌ Zero access to message content',
            'Google / Microsoft': '🧱 Sent folder holds Ciphertext only',
            'You': '✅ Full conversation organized in one thread'
          }
        }
      ],
      native: [
        {
          step: 'Step 1 • P2P Discovery',
          title: 'Smoldot detects another ZeroMX user',
          short: 'Fetches recipient public key directly from JAM.',
          detailTitle: '1. Automatic upgrade to pure End-to-End Encryption',
          detailBody: 'When you address alice@sovereign.dev, the Smoldot light client inside your extension queries the Polkadot JAM service state and automatically discovers her authenticated ZeroMX public key.',
          vis: {
            'Human Server Operator': '❌ Zero access',
            'Hardware Enclave (TEE)': '❌ Never decrypts anything!',
            'Polkadot JAM Validators': '✅ Serves authenticated public key',
            'Google / Microsoft': '❌ Zero access',
            'You': '⚡ Invisible Signal-grade upgrade'
          }
        },
        {
          step: 'Step 2 • Browser E2EE',
          title: 'Encrypted before leaving your device',
          short: 'Zero trust even in chip manufacturers.',
          detailTitle: '2. 100% Mathematical Guarantee — Signal-equivalent',
          detailBody: 'Your browser encrypts the message directly to the recipient\'s public key using HPKE/X25519 (or hybrid post-quantum ML-KEM). Even if AMD, Intel, the SMTP operator, and Google colluded simultaneously, not a single bit could be decrypted.',
          vis: {
            'Human Server Operator': '❌ Routes pre-encrypted bytes only',
            'Hardware Enclave (TEE)': '❌ Blind packet transport only',
            'Polkadot JAM Validators': '❌ Zero access',
            'Google / Microsoft (Both Ends)': '🧱 Blind at both ends',
            'You & Recipient': '🔐 Sole keyholders in the universe'
          }
        }
      ]
    },

    proofCards: [
      {
        title: '🌐 Who Are the SMTP Operators?',
        intro: 'Yes — they are <strong>autonomous, permissionless operators</strong> (DePIN / validator style), split into two distinct roles due to internet anti-spam physics:',
        items: [
          {
            color: '#7dd3fc',
            heading: '1. Inbound Nodes (Blind MX Ingress)',
            body: 'Any independent operator with a clean static datacenter IP + confidential-compute CPU (AMD SEV-SNP / Intel TDX) + stake locked in JAM. Your domain\'s DNS lists 3+ independent operators so SMTP fails over automatically if any node goes down.'
          },
          {
            color: '#6ee7b7',
            heading: '2. Outbound Nodes (Reputed SMTP Egress)',
            body: 'Home residential IPs cannot send email (Port 25 is blocked and Spamhaus drops them). Egress operators stake significant capital behind clean, high-reputation IP blocks, protected from spammer abuse by JAM\'s ZK rate-limiting (RLN).'
          },
          {
            color: '#f472b6',
            heading: 'Why Plaintext NEVER Touches Polkadot JAM',
            body: 'JAM validators must inspect Refine inputs to audit work packages. Therefore, <strong>zero email content ever enters JAM</strong>: JAM only verifies hardware attestation quotes, public keys, stake/slashing, and ZK anti-spam proofs.'
          }
        ]
      },
      {
        title: '🔐 How Does JAM Prove Nodes Didn\'t Read Your Mail?',
        intro: 'When a legacy sender (e.g. Chase Bank) sends standard SMTP, it isn\'t encrypted at the source. On a normal Linux VPS, root could dump RAM undetected. Here is how we solve that:',
        items: [
          {
            color: '#6ee7b7',
            heading: 'Tier A — ZeroMX ↔ ZeroMX (100% Mathematical Proof)',
            body: 'When both sides use ZeroMX, the sender\'s browser encrypts end-to-end via Smoldot before touching the network. Even the server CPU sees nothing (Signal-equivalent).'
          },
          {
            color: '#7dd3fc',
            heading: 'Tier B — Legacy Mail via TEE + JAM PVM Attestation (Default)',
            body: 'The SMTP daemon runs inside a silicon enclave (AMD SEV-SNP / Intel TDX) that encrypts physical RAM against the host OS/root. The CPU signs an attestation quote proving the TLS key was born inside the enclave and runs the exact open-source no-log binary. <strong>JAM\'s RISC-V PVM</strong> verifies that silicon signature on-chain. <em>(Honest boundary: zero trust in human operators; trusts AMD/Intel silicon).</em>'
          },
          {
            color: '#fcd34d',
            heading: 'Tier C — Paranoid Mode: Split MPC-TLS Across 2 Operators',
            body: 'Eliminates single-vendor silicon trust: the inbound Port 25 TLS session key is split via Multi-Party Computation (2PC-TLS) across 2 independent nodes (e.g. 1 Intel + 1 AMD). Neither node alone can reconstruct plaintext bytes.'
          }
        ]
      }
    ],

    onboardingSteps: [
      {
        num: '1',
        title: 'Create Key with FaceID',
        desc: 'No PGP <code>.asc</code> files or 30-char passphrases. Your private key is derived locally via <strong>Passkey (WebAuthn PRF)</strong> + threshold social recovery anchored on JAM.',
        code: null
      },
      {
        num: '2',
        title: 'Point Domain DNS',
        desc: 'In Cloudflare/Route53 for <code>@yourdomain.com</code>, add 2 standard DNS records pointing to decentralized Blind Relays:',
        code: 'MX 10 mx1.zeromx.network<br />MX 20 mx2.zeromx.network<br />TXT "v=spf1 include:egress.zeromx.network -all"'
      },
      {
        num: '3',
        title: 'Pick Your "Vault" Inbox',
        desc: 'Choose where encrypted envelopes should land: your existing <code>@gmail.com</code>, Google Workspace, <code>@outlook.com</code>, or iCloud. They store everything while reading nothing.',
        code: null
      },
      {
        num: '4',
        title: '$0/mo via Stake-to-Use',
        desc: 'Why pay $10/mo when Big Tech already pays for storage? Pay $1.50/mo micro-billing OR <strong>Stake DOT</strong>: keep 100% of your principal while a fraction of staking yield pays relay operators.',
        code: null
      }
    ],

    gaps: [
      {
        title: '1. Native Mobile Apps & Push Notifications',
        sevClass: 'sev-high',
        sevLabel: 'High Friction',
        desc: 'Official iOS/Android Gmail and Outlook apps block extensions. Raw push notifications show <code>🔒 Thread #a72f91</code> and opening them displays ciphertext.',
        sol: '<strong>Product Fix:</strong> Lightweight Passkey Companion PWA/App that decrypts background push notifications locally with FaceID (plus optional rules to leave low-sensitivity newsletters unencrypted).'
      },
      {
        title: '2. Calendar Invites (.ics) & Flight Cards',
        sevClass: 'sev-med',
        sevLabel: 'Medium Friction',
        desc: 'Once Google/Microsoft is blind, meeting invites and flight itineraries stop auto-populating Google/Outlook Calendar.',
        sol: '<strong>Product Fix:</strong> Client extension detects decrypted <code>.ics</code> payloads locally and offers 1-click (or automatic local) Calendar injection.'
      },
      {
        title: '3. Employer Domains Where You Don\'t Own DNS',
        sevClass: 'sev-med',
        sevLabel: 'Scope Boundary',
        desc: 'Works in 3 minutes for <code>@yourdomain.com</code>, but employees cannot repoint their company\'s corporate <code>@acme.io</code> MX record on their own.',
        sol: '<strong>Product Fix:</strong> Protects your personal/independent life inside the same inbox today; unlocks a clear B2B Enterprise Gateway offering for IT teams tomorrow.'
      },
      {
        title: '4. Legacy Mail Sent Directly to @gmail/@outlook',
        sevClass: 'sev-med',
        sevLabel: 'Migration',
        desc: 'Old accounts still sending directly to <code>john@gmail.com</code> hit Google\'s MX servers before any external network.',
        sol: '<strong>Product Fix:</strong> "Vault Sweeper" mode retroactively encrypts legacy emails at rest and deletes plaintext originals while guiding high-value account migration to <code>@yourdomain.com</code>.'
      },
      {
        title: '5. Webmail DOM Mutation Fragility',
        sevClass: 'sev-high',
        sevLabel: 'Tech Risk',
        desc: 'Relying purely on mutating Gmail/Outlook Web\'s internal HTML classes risks UI breakage whenever Big Tech ships frontend updates.',
        sol: '<strong>Product Fix:</strong> Keep DOM overlay ultra-minimal (docked Shadow DOM drawer) AND ship an optional Superhuman-fast unified web/desktop client over standard IMAP/JMAP/OAuth.'
      },
      {
        title: '6. Pre-Encryption Spam & Phishing Filtering',
        sevClass: 'sev-med',
        sevLabel: 'Operational',
        desc: 'Once the MX node encrypts the body, Gmail/Outlook can no longer inspect content keywords to filter spam or phishing.',
        sol: '<strong>Product Fix:</strong> The attested TEE runs strict SPF/DKIM/DMARC + Rspamd scoring in RAM <em>before</em> encrypting, tagging spam headers so Gmail routes junk straight to Spam.'
      }
    ],

    wl_tag: '06 // Early Access & Testnet',
    wl_title: 'Want sovereign email inside your current inbox?',
    wl_desc: 'Join the early access cohort as we roll out the browser extension, Mobile Passkey Companion, and Polkadot JAM Blind MX testnet.',
    wl_perk1: '✅ Priority invite for Gmail & Outlook custom-domain beta',
    wl_perk2: '✅ Early Stake-to-Use ($0/mo via DOT) & TEE Node Operator slots',
    wl_perk3: '🔒 Zero spam — we will only email you when your slot opens',

    waitlistForm: {
      modalTag: 'EARLY ACCESS COHORT • POLKADOT JAM TESTNET',
      modalTitle: 'Join the ZeroMX Waitlist',
      modalSub: 'Reserve early access for your custom domain or register interest in running an attested Blind MX node.',
      emailPlaceholder: 'you@yourdomain.com',
      submitBtn: 'Join Waitlist',
      submittingBtn: 'Joining...',
      providerLabel: 'Current Inbox Provider',
      providers: [
        { id: 'gmail', label: 'Gmail / Workspace' },
        { id: 'outlook', label: 'Outlook / M365' },
        { id: 'icloud', label: 'Apple / iCloud' },
        { id: 'other', label: 'Proton / Other' }
      ],
      domainLabel: 'Custom Domain',
      domains: [
        { id: 'yes', label: 'I own a domain' },
        { id: 'not-yet', label: 'Need a domain' }
      ],
      planLabel: 'Most Interested In',
      plans: [
        { id: 'stake-dot', label: '💎 Stake DOT ($0/mo)' },
        { id: 'fiat-sub', label: '💳 $2/mo Plan' },
        { id: 'b2b-team', label: '🏢 B2B Team Gateway' },
        { id: 'run-node', label: '🖥️ Run an SMTP TEE Node' }
      ],
      privacyNote: '🔒 No spam, no trackers. Unsubscribe anytime.',
      invalidEmail: 'Please enter a valid email address.',
      genericError: 'Could not submit right now. Please try again.',
      successTitle: 'You\'re on the Early Access list!',
      successBody: (email) => `We reserved a spot for <strong>${email}</strong>. Want to move up the queue? Share ZeroMX with a privacy-minded friend:`,
      shareBtn: '🔗 Copy Link to Share',
      copiedBtn: '✅ Link Copied!'
    }
  },

  pt: {
    pageTitle: 'ZeroMX — E-mail Soberano dentro do seu Gmail ou Outlook (Powered by Polkadot JAM)',
    nav_sim: 'Simulador de Caixa',
    nav_arch: 'Como Funciona',
    nav_proofs: 'Operadores & Provas',
    nav_onboard: 'Domínio Próprio',
    nav_gaps: 'Radar de Gaps',
    nav_cta: 'Entrar na Waitlist',

    hero_eyebrow: 'Soberania Real + Conveniência Zero-Fricção • Qualquer Provedor de E-mail',
    hero_title: 'Continue usando <span class="gradient-text">Gmail ou Outlook</span>.<br />Tire deles o poder de ler sua vida.',
    hero_sub: 'Você aponta o seu domínio próprio (<code>@voce.com</code>) para uma rede descentralizada de nós cegos coordenada pelo <strong>Polkadot JAM</strong>. Google e Microsoft viram apenas HDs gratuitos de texto cifrado — enquanto você lê, pesquisa, responde e usa IA/MCP localmente sem criar "mais um app".',
    hero_btn_waitlist: '🚀 Entrar na Lista de Espera',
    hero_btn_primary: 'Testar Simulador ao Vivo',
    hero_btn_secondary: 'Quem roda o SMTP e como provar sigilo?',
    hero_providers_label: 'Funciona com qualquer caixa de destino:',
    hero_provider_imap: '⚡ Fastmail / Qualquer IMAP',

    pillar1_title: 'Zero "Efeito Ilha"',
    pillar1_desc: 'Nada de abrir um app separado só para e-mails privados. Seus e-mails pessoais blindados convivem na mesma interface do trabalho e mantêm seu SSO/IdP intacto.',
    pillar2_title: 'Sem Empresa Central no Meio',
    pillar2_desc: 'Ao contrário de proxies tradicionais, não existe "servidor da startup". A borda SMTP roda em enclaves de hardware (TEEs) auditados criptograficamente pelo Polkadot JAM.',
    pillar3_title: 'MCP Local para seus Agentes',
    pillar3_desc: 'A IA da Big Tech na nuvem fica 100% cega. Em compensação, um servidor MCP local na sua máquina libera busca semântica e automação soberana para seus próprios LLMs.',
    pillar4_title: 'Storage Pago pela Big Tech',
    pillar4_desc: 'Como os blobs cifrados moram nos 15 GB / 50 GB gratuitos do seu Gmail ou Outlook, o custo da rede é ínfimo — ou <strong>R$ 0/mês para sempre</strong> fazendo stake reversível de DOT.',

    sim_tag: '01 // Perspectiva do Usuário',
    sim_title: 'Experimente a Caixa de Entrada: Servidor Cego vs. Sua Tela',
    sim_desc: 'Alterne abaixo entre <strong>Gmail</strong> e <strong>Outlook</strong>, troque para a <strong>Visão da Big Tech</strong> para ver exatamente o que fica gravado nos servidores deles, e teste a busca local e a resposta blindada.',
    sim_provider_label: 'Seu Provedor:',
    sim_view_label: 'Perspectiva:',
    sim_view_user: '🟢 O que VOCÊ vê (ZeroMX Ativo)',
    sim_view_bigtech: '🔴 O que GOOGLE / MICROSOFT vê no disco',
    sim_mobile_btn: '📱 E no Celular? (Testar Gap Mobile)',
    sim_search_placeholder: '🔍 Pesquisar nos e-mails (ex: Sírio, câmbio, DOT, Acme)...',
    sim_compose_btn: '✍️ Escrever Blindado',
    folder_inbox: 'Caixa de Entrada',
    folder_starred: 'Com Estrela',
    folder_sent: 'Enviados (Cifrados)',
    origins_title: 'Origens nesta Caixa',
    originPersonal: '🛡️ <code>@seudominio.com</code> (ZeroMX)',
    originWork: '🏢 <code>@acme.com.br</code> (Trabalho)',

    providerTitleGmail: 'Google Workspace — contato@seudominio.com',
    providerTitleOutlook: 'Microsoft Outlook 365 — contato@seudominio.com',
    extActive: '⚡ ZeroMX Ativo • Smoldot P2P + Passkey',
    extRawPrefix: '👁️ Disco Bruto de:',
    bannerUser: (p) => `<strong>Visão do Usuário:</strong> Você usa a interface familiar do ${p}, com busca instantânea local e MCP Local pronto para seus agentes.`,
    bannerBigTech: (bt) => `<strong>Visão dos Servidores (${bt}):</strong> É exatamente isto que está salvo nos data centers deles. Tente pesquisar "Sírio" ou "Itaú" na busca acima!`,
    searchStatusUser: '🔍 Busca: Índice SQLite Local (Cifrado)',
    searchStatusBigTech: (p) => `🔍 Busca Server-Side (${p}): Cega`,
    noResultsTitle: (q) => `Nenhum resultado para "${q}"`,
    noResultsBigTech: (p) => `Como os e-mails @seudominio.com estão cifrados no disco, o servidor do ${p} NÃO acha nenhuma palavra! Mude para "O que VOCÊ vê" acima para ver o índice local achar na hora.`,
    noResultsUser: 'Tente termos como Sírio, câmbio, DOT ou Acme.',
    noMailSelected: 'Nenhum e-mail selecionado para este filtro.',
    serverCipherBadge: '🧱 Cifrado no Servidor',
    envelopeFromLabel: 'Envelope From visível ao servidor:',
    toLabel: 'Para:',
    fromLabel: 'De:',
    sovereigntyLabel: 'Status de Soberania:',
    aiProbeFailTitle: (bt) => `🤖 Tentativa de Leitura por ${bt}:`,
    aiProbeFailDesc: 'Remetente real: <em>Desconhecido (mascarado pelo relay)</em> • Assunto real: <em>Oculto (RFC 9788)</em> • Conteúdo/Anexos: <em>Inacessíveis sem sua chave privada local</em>.',
    switchBackUserBtn: '🟢 Ver Desencriptado (Visão do Usuário)',
    mcpReadyTitle: '🔌 Servidor MCP Local (localhost:4190):',
    mcpReadyDesc: 'Disponível para seus agentes locais (Claude Desktop, Cursor, scripts) com permissão explícita — sem passar pela nuvem da Big Tech.',
    replySecureBtn: '↩️ Responder Blindado (Zero Draft Leak)',
    peekServerBtn: (p) => `🔴 Espiar como o ${p} vê este e-mail`,

    arch_tag: '02 // Infraestrutura Descomplicada',
    arch_title: 'O caminho de um e-mail (clique em cada etapa)',
    arch_desc: 'Veja exatamente o que acontece nos 3 cenários reais — recebendo de quem não usa a ferramenta (bancos, hospitais), respondendo sem vazar rascunhos, e falando com outro usuário ZeroMX.',
    flow_tab_inbound: '1. Recebendo E-mail Comum (Itaú / Hospital → Você)',
    flow_tab_outbound: '2. Respondendo pelo Gmail / Outlook (Você → Mundo)',
    flow_tab_native: '3. ZeroMX ↔ ZeroMX (Ponta a Ponta Matemático)',
    visMatrixTitle: 'Matriz de Visibilidade nesta Etapa',

    proof_tag: '03 // Soberania & Física da Porta 25',
    proof_title: 'Quem opera os servidores SMTP? E como provar que ninguém leu?',
    proof_desc: 'Sem promessas mágicas: veja quem são os nós da rede e quais são os <strong>3 níveis reais de garantia criptográfica</strong> possíveis hoje com o Polkadot JAM.',

    onboard_tag: '04 // Onboarding Universal',
    onboard_title: 'Único pré-requisito: ter um domínio próprio',
    onboard_desc: 'Não importa se você usa Gmail, Google Workspace, Outlook, iCloud ou Fastmail. Em 3 minutos seu domínio vira um escudo soberano na frente da sua caixa atual.',

    gaps_tag: '05 // Visão Crítica de Produto',
    gaps_title: 'Radar de Gaps: Onde essa solução pode tropeçar na vida real?',
    gaps_desc: 'Olhando friamente pela perspectiva de um usuário exigente, estes são os <strong>6 atritos reais</strong> que aparecem quando cegamos o Gmail/Outlook — e como resolvê-los:',
    footer_text: 'ZeroMX — Protótipo Conceitual de Produto & Arquitetura (Polkadot JAM + Blind MX + Qualquer Provedor)',

    composeModal: {
      tag: 'SHADOW DOM ISOLADO • AUTO-SAVE DO GMAIL/OUTLOOK BLOQUEADO',
      title: 'Escrever / Responder via Rede ZeroMX',
      fromLabel: 'De (Seu Domínio Soberano)',
      fromAddr: 'contato@seudominio.com',
      toLabel: 'Para',
      defaultTo: 'parceiro@empresa.com.br',
      subjLabel: 'Assunto Real (ocultado da Big Tech na pasta Enviados)',
      defaultSubj: 'Proposta confidencial',
      bodyLabel: 'Mensagem',
      defaultBody: 'Respondendo direto da minha caixa habitual, mas sem que o Google ou a Microsoft vejam texto claro. Sai cifrado até um enclave de saída (com prova anti-spam RLN no JAM) e salva cópia cifrada na thread.',
      footerNote: '🔑 Assinando prova ZK de cota (RLN) + cifrando cópia de Enviados',
      sendBtn: '🚀 Enviar Blindado',
      sentNow: 'Agora',
      youLabel: 'Você',
      sentTierE2ee: '⚡ Enviado com E2EE Matemático (ZeroMX ↔ ZeroMX)',
      sentTierTee: '🛡️ Enviado via Egress TEE + Salvo Cifrado no Servidor'
    },

    mobileModal: {
      tag: 'SIMULAÇÃO DE EXPERIÊNCIA NO CELULAR (GAP CRÍTICO #1)',
      title: 'O que acontece quando seu celular toca no bolso?',
      badTitle: '❌ App Oficial do Gmail / Outlook',
      badDesc: 'Como iOS e Android proíbem extensões dentro do app nativo, a notificação bruta dele apareceria assim:',
      goodTitle: '✅ ZeroMX Companion (PWA / App Leve)',
      goodDesc: 'Silencia-se a label cifrada no app do Gmail e o Companion leve desencripta notificações localmente via Passkey:',
      goodSample: 'Hospital Sírio-Libanês\nResultado dos seus exames...\n[Desbloqueado via FaceID]',
      summary: '<strong>Por que enxergar isso agora é valioso:</strong> No desktop, ler dentro do Gmail/Outlook Web é invisível. No mobile, precisamos escolher entre o Companion leve via Passkey OU regras seletivas (ex.: newsletters passam limpas, enquanto bancos/saúde/conversas vão cifradas).',
      okBtn: 'Entendi o trade-off'
    },

    emails: [
      {
        id: 'm1',
        protected: true,
        trustTier: 'e2ee',
        trustLabel: '⚡ E2EE Matemático (ZeroMX ↔ ZeroMX)',
        realFrom: 'Alice <alice@soberano.dev>',
        realTo: 'contato@seudominio.com',
        realSubject: 'Arquitetura no Polkadot JAM + fim do efeito ilha',
        time: '11:42',
        opaqueFrom: 'relay-91f0a8@ingress.zeromx.network',
        opaqueSubject: '🔒 Thread #9f2c41',
        realBody: `Oi!\n\nTestar provedores isolados de e-mail privado costuma falhar pelo mesmo motivo: ter mais um app separado e pagar mensalidade cara para continuar preso no IdP da empresa não fecha a conta.\n\nPor isso desenhamos o ZeroMX em cima do Polkadot JAM:\n- Você continua usando seu Gmail ou Outlook normalmente.\n- Como nós dois usamos ZeroMX, essa mensagem foi cifrada ponta a ponta direto no meu navegador via Smoldot antes mesmo de sair da minha máquina.\n- Nem o Google, nem nenhum operador SMTP viu uma única palavra deste e-mail.`,
        cipherBlob: `-----BEGIN ZEROMX HPKE-X25519 ENVELOPE-----\nVersion: ZeroMX/1.0 (Polkadot-JAM KeyState #4,819,204)\nProtected-Headers: MemoryHole-RFC9788 (From, Subject, Reply-To)\nPadding-Block: 16384 bytes (anti-size-correlation)\n\nhQEMA9z8L2kPq91xAQf/b8K3vN9mQ1x7Lp2wR0tY6uJ4hG8fD2sA5zX9cV1bN3mQ\n7wE4rT6yU8iO0pA2sD4fG6hJ8kL0zX2cV4bN6mQ8wE0rT2yU4iO6pA8sD0fG2hJ4\nkL6zX8cV0bN2mQ4wE6rT8yU0iO2pA4sD6fG8hJ0kL2zX4cV6bN8mQ0wE2rT4yU6i\n=9xQv\n-----END ZEROMX HPKE-X25519 ENVELOPE-----`
      },
      {
        id: 'm2',
        protected: true,
        trustTier: 'tee',
        trustLabel: '🛡️ Blind MX (TEE AMD SEV-SNP Atestado no JAM)',
        realFrom: 'Hospital Sírio-Libanês <resultados@hsl.org.br>',
        realTo: 'contato@seudominio.com',
        realSubject: 'Resultado dos seus exames laboratoriais (PDF anexo)',
        time: '09:15',
        opaqueFrom: 'relay-3d7b12@ingress.zeromx.network',
        opaqueSubject: '🔒 Thread #a72f91',
        realBody: `Olá,\n\nSeus exames coletados em 16/11 já estão disponíveis.\nResumo: Colesterol HDL, Glicemia e Hemograma dentro dos parâmetros normais.\n\nAnexo desencriptado localmente: laudo_exames_2026.pdf (412 KB)\n\n(Nota ZeroMX: O servidor do hospital enviou um SMTP comum. O enclave TEE #14 validou o DKIM em RAM, cifrou remetente + assunto + PDF com sua chave pública registrada no JAM e zerou a memória em 3.1ms.)`,
        cipherBlob: `-----BEGIN ZEROMX HPKE-X25519 ENVELOPE-----\nVersion: ZeroMX/1.0 (JAM Attested Enclave: sev-snp-0x88f1...2c)\nSpam-Check-RAM: PASS (DKIM=hsl.org.br verified inside enclave)\nPadding-Block: 524288 bytes (uniform 512KB bucket)\n\n9mK2pL5vR8xT1wQ4zY7uN0jH3gF6dS9aZ2xC5vB8nM1qW4eR7tY0uI3oP6aS9dF2\ngH5jK8lZ1xC4vB7nM0qW3eR6tY9uI2oP5aS8dF1gH4jK7lZ0xC3vB6nM9qW2eR5t\nY8uI1oP4aS7dF0gH3jK6lZ9xC2vB5nM8qW1eR4tY7uI0oP3aS6dF9gH2jK5lZ8xC\n=k2Lm\n-----END ZEROMX HPKE-X25519 ENVELOPE-----`
      },
      {
        id: 'm3',
        protected: true,
        trustTier: 'tee',
        trustLabel: '🛡️ Blind MX (TEE Intel TDX Atestado no JAM)',
        realFrom: 'Itaú Personnalité <alertas@itau.com.br>',
        realTo: 'contato@seudominio.com',
        realSubject: 'Contrato de câmbio e extrato consolidado — Novembro',
        time: 'Ontem',
        opaqueFrom: 'relay-c40e55@ingress.zeromx.network',
        opaqueSubject: '🔒 Thread #44e01b',
        realBody: `Prezado cliente,\n\nSeu contrato de câmbio #884920 no valor de US$ 14.500,00 foi liquidado.\nSeu saldo consolidado e informe de rendimentos estão disponíveis no documento cifrado.\n\nNenhum algoritmo de anúncios ou IA na nuvem teve acesso aos seus dados financeiros.`,
        cipherBlob: `-----BEGIN ZEROMX HPKE-X25519 ENVELOPE-----\nVersion: ZeroMX/1.0 (JAM Attested Enclave: tdx-0x41a9...9b)\nSpam-Check-RAM: PASS (DMARC=pass)\nPadding-Block: 65536 bytes\n\nLp9wR2tY5uI8oP1aS4dF7gH0jK3lZ6xC9vB2nM5qW8eR1tY4uI7oP0aS3dF6gH9j\nK2lZ5xC8vB1nM4qW7eR0tY3uI6oP9aS2dF5gH8jK1lZ4xC7vB0nM3qW6eR9tY2uI\n=7pZa\n-----END ZEROMX HPKE-X25519 ENVELOPE-----`
      },
      {
        id: 'm4',
        protected: false,
        trustTier: 'plain',
        trustLabel: '⚠️ Domínio Corporativo Externo (Sem ZeroMX no MX da Empresa)',
        realFrom: 'Segurança Acme <secops@acme.com.br>',
        realTo: 'alex@acme.com.br',
        realSubject: 'Relatório semanal de SSO / IdP e acessos OAuth',
        time: 'Ontem',
        opaqueFrom: 'Segurança Acme <secops@acme.com.br>',
        opaqueSubject: 'Relatório semanal de SSO / IdP e acessos OAuth',
        realBody: `Time,\n\nTodos os 42 colaboradores autenticaram via Google Workspace IdP com 2FA ativo nesta semana.\n\n(Por que este e-mail aparece visível mesmo na visão da Big Tech? Porque ele veio para @acme.com.br, cujo DNS MX pertence à empresa — mostrando como seus e-mails de trabalho convivem na mesma caixa dos seus e-mails pessoais 100% blindados em @seudominio.com!)`,
        cipherBlob: null
      }
    ],

    flows: {
      inbound: [
        {
          step: 'Passo 1 • DNS MX',
          title: 'Hospital / Banco envia SMTP comum',
          short: 'Consulta DNS MX de @seudominio.com e conecta via TLS.',
          detailTitle: '1. O remetente não precisa instalar nada',
          detailBody: 'Quando o Hospital Sírio-Libanês manda um e-mail para contato@seudominio.com, o servidor deles consulta o DNS MX do seu domínio e recebe 3 IPs de Operadores Autônomos da rede ZeroMX. Se um cair, o próprio protocolo SMTP tenta o próximo na hora.',
          vis: {
            'Operador Humano da Máquina': '❌ Não vê (Memória RAM cifrada pela CPU)',
            'Enclave de Hardware (TEE)': '⚡ Processa em RAM por ~3ms e apaga',
            'Validadores Polkadot JAM': '❌ Não recebem o e-mail (zero tráfego no JAM)',
            'Google / Microsoft': '❌ Ainda nem recebeu',
            'Você': '⏳ Aguardando entrega'
          }
        },
        {
          step: 'Passo 2 • Enclave TEE',
          title: 'Antispam + Criptografia em RAM',
          short: 'Valida DKIM/SPF e cifra tudo com sua chave pública.',
          detailTitle: '2. O "Blind MX" cifra remetente, assunto, corpo e anexos',
          detailBody: 'Dentro de um enclave AMD SEV-SNP / Intel TDX (cujo código binário foi auditado e atestado no PVM do Polkadot JAM), o nó checa SPF/DKIM/antispam, busca sua chave pública registrada no JAM, cifra tudo (incluindo quem mandou e o assunto real!), aplica padding de tamanho fixo e zera a RAM.',
          vis: {
            'Operador Humano da Máquina': '❌ Bloqueado pelo silício (SEV-SNP / TDX)',
            'Enclave de Hardware (TEE)': '🔒 Transforma texto claro em Ciphertext',
            'Validadores Polkadot JAM': '✅ Certificam apenas o atestado do chip e sua chave',
            'Google / Microsoft': '❌ Nada em claro',
            'Você': '🔑 Único dono da chave privada'
          }
        },
        {
          step: 'Passo 3 • Caixa "Cofre"',
          title: 'Entrega Cega no Gmail / Outlook',
          short: 'Seu provedor guarda o envelope cifrado de graça.',
          detailTitle: '3. Gmail ou Outlook viram um banco de dados burro e gratuito',
          detailBody: 'O enclave entrega o envelope no seu Gmail ou Outlook usando um remetente opaco (relay-3d7b@...) e um identificador de conversa determinístico (🔒 Thread #a72f91). O Gmail agrupa as respostas na mesma conversa, mas a IA e os anúncios da Big Tech só enxergam ruído criptográfico.',
          vis: {
            'Operador Humano da Máquina': '❌ Nada salvo em disco',
            'Enclave de Hardware (TEE)': '🧹 Memória já descartada',
            'Validadores Polkadot JAM': '❌ Zero acesso',
            'Google / Microsoft': '🧱 Só vê bytes cifrados + tamanho padronizado',
            'Você': '📥 Recebe na sua caixa de sempre'
          }
        },
        {
          step: 'Passo 4 • Tela + MCP Local',
          title: 'Desencriptação Invisível + Busca Local',
          short: 'Smoldot confere chaves; extensão decifra em 4ms.',
          detailTitle: '4. Experiência idêntica ao Gmail/Outlook + IA Soberana',
          detailBody: 'No seu navegador ou app, o light client Smoldot confere o estado das chaves direto na rede P2P do Polkadot JAM (sem RPC central). Sua chave local (destravada por FaceID / Passkey) decifra a tela em tempo real, atualiza o índice SQLite local para busca instantânea e alimenta seu MCP Local.',
          vis: {
            'Operador Humano da Máquina': '❌ Zero acesso',
            'Enclave de Hardware (TEE)': '❌ Fora do fluxo',
            'Validadores Polkadot JAM': '✅ Fornecem prova de estado via Smoldot P2P',
            'Google / Microsoft': '❌ Continua cego (mesmo com você lendo)',
            'Você': '🟢 Lê, pesquisa e usa IA local normalmente'
          }
        }
      ],
      outbound: [
        {
          step: 'Passo 1 • Shadow Composer',
          title: 'Você responde sem vazar rascunho',
          short: 'Janela isolada impede o auto-save do Gmail/Outlook.',
          detailTitle: '1. Bloqueando o vazamento silencioso de rascunhos (Drafts)',
          detailBody: 'Se você digitasse na caixa nativa do Gmail/Outlook, cada tecla seria salva em texto claro nos servidores deles a cada 3 segundos. O ZeroMX abre um composer isolado em Shadow DOM: seus rascunhos são cifrados localmente.',
          vis: {
            'Operador Humano da Máquina': '❌ Zero acesso',
            'Enclave de Saída (Egress TEE)': '⏳ Aguardando envio',
            'Validadores Polkadot JAM': '❌ Zero acesso',
            'Google / Microsoft': '❌ Auto-save de rascunho bloqueado',
            'Você': '✍️ Escrevendo com privacidade total'
          }
        },
        {
          step: 'Passo 2 • Prova Anti-Spam ZK',
          title: 'Prova anônima de cota (RLN no JAM)',
          short: 'Impede spammers sem revelar quem você é.',
          detailTitle: '2. Protegendo a reputação dos IPs de saída via Polkadot JAM',
          detailBody: 'Para ninguém usar a rede descentralizada para disparar spam e queimar os IPs, seu cliente gera uma prova Zero-Knowledge (RLN) verificada no Refine do JAM: prova matematicamente que você tem direito de envio sem revelar sua identidade.',
          vis: {
            'Operador Humano da Máquina': '❌ Zero acesso',
            'Enclave de Saída (Egress TEE)': '✅ Verifica prova de cota válida',
            'Validadores Polkadot JAM': '✅ Validam prova matemática RLN no Refine',
            'Google / Microsoft': '❌ Nem passa pelo SMTP da Big Tech',
            'Você': '🛡️ Identidade preservada'
          }
        },
        {
          step: 'Passo 3 • Disparo + Pasta Enviados',
          title: 'SMTP assinado pelo seu domínio + Cópia Cifrada',
          short: 'Destinatário recebe limpo; seu Sent guarda cifrado.',
          detailTitle: '3. Entrega limpa para o mundo + Histórico cifrado na sua thread',
          detailBody: 'O Enclave de Saída decifra em RAM, assina com a chave DKIM delegada de @seudominio.com e entrega via TLS para o destinatário. Ao mesmo tempo, grava na pasta "Enviados" do Gmail/Outlook uma cópia cifrada com a SUA chave pública.',
          vis: {
            'Operador Humano da Máquina': '❌ Bloqueado pelo enclave TEE',
            'Enclave de Saída (Egress TEE)': '⚡ Assina DKIM em RAM e apaga',
            'Validadores Polkadot JAM': '❌ Zero acesso ao conteúdo',
            'Google / Microsoft': '🧱 Pasta "Enviados" contém apenas Ciphertext',
            'Você': '✅ Conversa inteira organizada na thread'
          }
        }
      ],
      native: [
        {
          step: 'Passo 1 • Descoberta P2P',
          title: 'Smoldot detecta outro usuário ZeroMX',
          short: 'Consulta chave pública do destinatário no JAM.',
          detailTitle: '1. Upgrade automático para Criptografia Ponta a Ponta Pura',
          detailBody: 'Ao digitar alice@soberano.dev, o light client Smoldot no seu navegador consulta o estado do serviço no Polkadot JAM e descobre na hora que aquele domínio também possui chave pública ZeroMX registrada.',
          vis: {
            'Operador Humano da Máquina': '❌ Zero acesso',
            'Enclave de Hardware (TEE)': '❌ Não precisa decifrar nada!',
            'Validadores Polkadot JAM': '✅ Entregam chave pública autenticada',
            'Google / Microsoft': '❌ Zero acesso',
            'Você': '⚡ Upgrade automático invisível (estilo Signal)'
          }
        },
        {
          step: 'Passo 2 • E2EE no Browser',
          title: 'Cifrado antes de sair da sua máquina',
          short: 'Zero confiança até nos fabricantes de chip.',
          detailTitle: '2. Garantia 100% matemática — igual ao Signal',
          detailBody: 'Seu próprio navegador cifra o e-mail direto para a chave pública do destinatário usando HPKE/X25519 (ou pós-quântico ML-KEM híbrido). Mesmo que AMD, Intel, operador SMTP e Google se juntassem, ninguém conseguiria abrir um único bit.',
          vis: {
            'Operador Humano da Máquina': '❌ Só transporta pacote já cifrado',
            'Enclave de Hardware (TEE)': '❌ Só roteia bytes opacos',
            'Validadores Polkadot JAM': '❌ Zero acesso',
            'Google / Microsoft (ambos os lados)': '🧱 Cegos nos dois lados',
            'Você e Destinatário': '🔐 Únicos no universo com as chaves'
          }
        }
      ]
    },

    proofCards: [
      {
        title: '🌐 Quem são os Operadores SMTP?',
        intro: 'Sim, são <strong>operadores autônomos e independentes</strong> (estilo DePIN / validadores), separados em dois papéis por causa das regras anti-spam da internet:',
        items: [
          {
            color: '#7dd3fc',
            heading: '1. Nós de Entrada (Blind MX Ingress)',
            body: 'Qualquer operador independente com IP fixo limpo + CPU com suporte a enclave confidencial (AMD SEV-SNP / Intel TDX) e stake depositado no JAM. No DNS do seu domínio, você aponta para 3+ operadores distintos com failover automático.'
          },
          {
            color: '#6ee7b7',
            heading: '2. Nós de Saída (Reputed SMTP Egress)',
            body: 'Não dá para enviar e-mail de IP residencial (cai direto no Spam). Operadores de saída mantêm blocos de IP de altíssima reputação e stake alto, protegidos contra abuso por provas ZK de cota (RLN) no JAM.'
          },
          {
            color: '#f472b6',
            heading: 'Por que o texto claro NUNCA entra no JAM?',
            body: 'Validadores do Polkadot JAM precisam ver os inputs do Refine para auditar blocos. Por isso o JAM <strong>jamais toca no conteúdo do e-mail</strong>: o JAM guarda apenas chaves públicas, atestações de hardware dos nós e provas ZK.'
          }
        ]
      },
      {
        title: '🔐 Como o JAM prova que o nó NÃO leu seu e-mail?',
        intro: 'Quando um banco manda um e-mail comum, ele não criptografa na origem. Num Linux comum, o dono da máquina poderia ler a RAM. Veja como resolvemos:',
        items: [
          {
            color: '#6ee7b7',
            heading: 'Nível A — ZeroMX ↔ ZeroMX (Prova 100% Matemática)',
            body: 'Quando os dois lados usam ZeroMX, o navegador cifra ponta a ponta antes de sair da máquina via Smoldot. Nem o chip do servidor vê nada (equivalente ao Signal).'
          },
          {
            color: '#7dd3fc',
            heading: 'Nível B — E-mail Comum via TEE + Atestação no PVM do JAM (Padrão)',
            body: 'O nó SMTP roda num enclave de silício (AMD SEV-SNP / Intel TDX) que cifra a própria RAM contra o dono físico da máquina. O chip assina um atestado provando que roda exatamente o código open-source que cifra em milissegundos e apaga a RAM. O <strong>PVM (RISC-V) do JAM</strong> verifica essa assinatura on-chain.'
          },
          {
            color: '#fcd34d',
            heading: 'Nível C — Paranoid Mode: MPC-TLS entre 2 Operadores',
            body: 'Elimina até a confiança num único fabricante de chip: a chave da sessão TLS da porta 25 é dividida matematicamente entre 2 nós independentes (1 Intel + 1 AMD). Nenhum dos dois sozinho decifra o tráfego.'
          }
        ]
      }
    ],

    onboardingSteps: [
      {
        num: '1',
        title: 'Crie sua Chave com FaceID',
        desc: 'Sem arquivos <code>.asc</code> nem senhas gigantes. Sua chave privada nasce no dispositivo via <strong>Passkey (WebAuthn PRF)</strong> + recuperação social registrada no JAM.',
        code: null
      },
      {
        num: '2',
        title: 'Aponte o DNS do Domínio',
        desc: 'No Cloudflare/Registro.br do seu <code>@seudominio.com</code>, adicione 2 registros padrão apontando para os Blind Relays:',
        code: 'MX 10 mx1.zeromx.network<br />MX 20 mx2.zeromx.network<br />TXT "v=spf1 include:egress.zeromx.network -all"'
      },
      {
        num: '3',
        title: 'Escolha sua Caixa "Cofre"',
        desc: 'Diga onde os envelopes cifrados devem cair: seu <code>@gmail.com</code>, Google Workspace, <code>@outlook.com</code> ou iCloud. O provedor guarda tudo sem ler nada.',
        code: null
      },
      {
        num: '4',
        title: 'Custo R$ 0 via Stake-to-Use',
        desc: 'Por que pagar R$ 45/mês se a Big Tech já paga o disco? Pague US$ 1,50/mês ou faça <strong>Stake de DOT</strong> (continuando 100% seu) onde parte do yield paga a rede.',
        code: null
      }
    ],

    gaps: [
      {
        title: '1. App Nativo no Celular & Notificações Push',
        sevClass: 'sev-high',
        sevLabel: 'Atrito Alto',
        desc: 'Apps oficiais do Gmail e Outlook no iOS/Android não aceitam extensões. A notificação push bruta mostra <code>🔒 Thread #a72f91</code> e o bloco cifrado.',
        sol: '<strong>Solução de Produto:</strong> Companion PWA/App leve que desencripta notificações localmente via FaceID (mais opção de deixar newsletters comuns sem criptografia).'
      },
      {
        title: '2. Convites de Agenda (.ics) & Voos Automáticos',
        sevClass: 'sev-med',
        sevLabel: 'Atrito Médio',
        desc: 'Como Google/Microsoft ficam cegos, convites de reunião e passagens param de entrar sozinhos no Calendar.',
        sol: '<strong>Solução de Produto:</strong> A extensão detecta arquivos <code>.ics</code> desencriptados localmente e injeta no Calendar com 1 clique.'
      },
      {
        title: '3. Domínio da Empresa onde você não manda no DNS',
        sevClass: 'sev-med',
        sevLabel: 'Escopo',
        desc: 'Funciona em 3 minutos para <code>@seudominio.com</code>, mas o funcionário comum não controla o MX de <code>@acme.com.br</code>.',
        sol: '<strong>Solução de Produto:</strong> Protege sua vida pessoal na mesma tela hoje; abre oferta B2B para o time de Segurança/TI plugar no domínio da empresa.'
      },
      {
        title: '4. E-mails Legados enviados direto para @gmail/@outlook',
        sevClass: 'sev-med',
        sevLabel: 'Transição',
        desc: 'Cadastros antigos que mandam direto para <code>fulano@gmail.com</code> batem primeiro no MX do Google.',
        sol: '<strong>Solução de Produto:</strong> Modo "Vault Sweeper" que cifra retroativamente em repouso e apaga o original em texto claro enquanto migra cadastros.'
      },
      {
        title: '5. Fragilidade de Injeção no DOM Web',
        sevClass: 'sev-high',
        sevLabel: 'Risco Técnico',
        desc: 'Depender só de alterar classes internas do HTML do Gmail/Outlook pode quebrar quando mudam o layout.',
        sol: '<strong>Solução de Produto:</strong> Manter overlay mínimo em Shadow DOM E oferecer cliente unificado próprio via IMAP/JMAP/OAuth padrão.'
      },
      {
        title: '6. Filtro Anti-Spam antes da Criptografia',
        sevClass: 'sev-med',
        sevLabel: 'Operacional',
        desc: 'Depois de cifrado, o filtro de spam do Gmail/Outlook não consegue mais analisar palavras de phishing.',
        sol: '<strong>Solução de Produto:</strong> O enclave TEE roda SPF/DKIM/DMARC + Rspamd em RAM <em>antes</em> de cifrar, marcando spam no cabeçalho externo.'
      }
    ],

    wl_tag: '06 // Acesso Antecipado & Testnet',
    wl_title: 'Quer privacidade soberana dentro da sua caixa atual?',
    wl_desc: 'Entre na lista de acesso antecipado para testar a extensão, o Companion Mobile via Passkey e a testnet Blind MX no Polkadot JAM.',
    wl_perk1: '✅ Convite prioritário para o beta em Gmail e Outlook com domínio próprio',
    wl_perk2: '✅ Vagas iniciais de Stake-to-Use (R$ 0/mês via DOT) e Operadores de Nó TEE',
    wl_perk3: '🔒 Zero spam — só avisaremos quando seu acesso estiver liberado',

    waitlistForm: {
      modalTag: 'ACESSO ANTECIPADO • POLKADOT JAM TESTNET',
      modalTitle: 'Entrar na Lista de Espera do ZeroMX',
      modalSub: 'Garanta acesso antecipado para seu domínio próprio ou registre interesse em operar um nó Blind MX.',
      emailPlaceholder: 'voce@seudominio.com',
      submitBtn: 'Entrar na Lista',
      submittingBtn: 'Enviando...',
      providerLabel: 'Seu Provedor Atual',
      providers: [
        { id: 'gmail', label: 'Gmail / Workspace' },
        { id: 'outlook', label: 'Outlook / M365' },
        { id: 'icloud', label: 'Apple / iCloud' },
        { id: 'other', label: 'Proton / Outro' }
      ],
      domainLabel: 'Domínio Próprio',
      domains: [
        { id: 'yes', label: 'Já tenho domínio' },
        { id: 'not-yet', label: 'Ainda não tenho' }
      ],
      planLabel: 'Maior Interesse',
      plans: [
        { id: 'stake-dot', label: '💎 Stake DOT (R$ 0/mês)' },
        { id: 'fiat-sub', label: '💳 Plano US$ 2/mês' },
        { id: 'b2b-team', label: '🏢 Gateway B2B / Empresa' },
        { id: 'run-node', label: '🖥️ Operar Nó SMTP TEE' }
      ],
      privacyNote: '🔒 Zero spam, zero rastreadores.',
      invalidEmail: 'Digite um endereço de e-mail válido.',
      genericError: 'Não foi possível enviar agora. Tente novamente.',
      successTitle: 'Você está na lista de acesso antecipado!',
      successBody: (email) => `Reservamos sua vaga para <strong>${email}</strong>. Quer compartilhar a ideia com alguém que se importa com privacidade?`,
      shareBtn: '🔗 Copiar Link para Compartilhar',
      copiedBtn: '✅ Link Copiado!'
    }
  }
};

const state = {
  lang: 'en', // Default: English!
  provider: 'gmail',
  view: 'user',
  selectedId: 'm1',
  searchQuery: '',
  activeFlow: 'inbound',
  activeStepIndex: 0,
  customSentByLang: { en: [], pt: [] },
  waitlist: {
    draftEmail: '',
    submittedEmail: '',
    provider: 'gmail',
    ownsDomain: 'yes',
    planInterest: 'stake-dot'
  }
};

function t() {
  return TRANSLATIONS[state.lang];
}

function getAllEmails() {
  return [...state.customSentByLang[state.lang], ...t().emails];
}

function getFilteredEmails() {
  const q = state.searchQuery.trim().toLowerCase();
  const list = getAllEmails();
  if (!q) return list;

  return list.filter((mail) => {
    if (state.view === 'user') {
      return (
        mail.realFrom.toLowerCase().includes(q) ||
        mail.realSubject.toLowerCase().includes(q) ||
        mail.realBody.toLowerCase().includes(q)
      );
    } else {
      if (!mail.protected) {
        return (
          mail.realFrom.toLowerCase().includes(q) ||
          mail.realSubject.toLowerCase().includes(q) ||
          mail.realBody.toLowerCase().includes(q)
        );
      }
      return (
        mail.opaqueFrom.toLowerCase().includes(q) ||
        mail.opaqueSubject.toLowerCase().includes(q)
      );
    }
  });
}

function applyStaticTranslations() {
  const dict = t();
  document.documentElement.lang = state.lang === 'en' ? 'en' : 'pt-BR';
  document.title = dict.pageTitle;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });

  document.getElementById('originPersonalChip').innerHTML = dict.originPersonal;
  document.getElementById('originWorkChip').innerHTML = dict.originWork;

  // Proof cards
  document.getElementById('proofGrid').innerHTML = dict.proofCards
    .map(
      (card) => `
      <div class="proof-card">
        <h3>${card.title}</h3>
        <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 14px;">${card.intro}</p>
        <div class="tier-list">
          ${card.items
            .map(
              (item) => `
            <div class="tier-item">
              <strong style="color: ${item.color};">${item.heading}</strong>
              <p>${item.body}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `
    )
    .join('');

  // Onboarding
  document.getElementById('onboardingGrid').innerHTML = dict.onboardingSteps
    .map(
      (s) => `
      <div class="onboard-step">
        <div class="onboard-num">${s.num}</div>
        <h3>${s.title}</h3>
        <p style="color: var(--text-secondary); font-size: 0.88rem;">${s.desc}</p>
        ${s.code ? `<div class="code-mini">${s.code}</div>` : ''}
      </div>
    `
    )
    .join('');

  // Gaps
  document.getElementById('gapsGrid').innerHTML = dict.gaps
    .map(
      (g) => `
      <div class="gap-card">
        <div class="gap-header">
          <h3>${g.title}</h3>
          <span class="gap-severity ${g.sevClass}">${g.sevLabel}</span>
        </div>
        <p style="color: var(--text-secondary); font-size: 0.88rem;">${g.desc}</p>
        <div class="gap-solution">${g.sol}</div>
      </div>
    `
    )
    .join('');
}

function renderSimulator() {
  const dict = t();
  const win = document.getElementById('mailWindow');
  const providerTitle = document.getElementById('providerTitle');
  const extensionBadge = document.getElementById('extensionBadge');
  const statusBanner = document.getElementById('statusBanner');
  const statusBannerText = document.getElementById('statusBannerText');
  const searchEngineStatus = document.getElementById('searchEngineStatus');
  const mailList = document.getElementById('mailList');
  const mailDetail = document.getElementById('mailDetail');

  const isGmail = state.provider === 'gmail';
  const isUser = state.view === 'user';
  const providerShort = isGmail ? 'Google' : 'Microsoft';
  const uiName = isGmail ? 'Gmail' : 'Outlook';
  const bigTechName = isGmail ? 'Google (Gmail / Gemini Cloud)' : 'Microsoft (Outlook / Copilot Cloud)';

  win.className = `mail-window ${isGmail ? 'provider-gmail' : 'provider-outlook'}`;
  providerTitle.textContent = isGmail ? dict.providerTitleGmail : dict.providerTitleOutlook;
  document.getElementById('inboxCount').textContent = String(getAllEmails().length);

  if (isUser) {
    extensionBadge.className = 'extension-pill active-shield';
    extensionBadge.textContent = dict.extActive;
    statusBanner.className = 'status-banner banner-user';
    statusBannerText.innerHTML = dict.bannerUser(uiName);
    searchEngineStatus.textContent = dict.searchStatusUser;
  } else {
    extensionBadge.className = 'extension-pill raw-server';
    extensionBadge.textContent = `${dict.extRawPrefix} ${providerShort}`;
    statusBanner.className = 'status-banner banner-bigtech';
    statusBannerText.innerHTML = dict.bannerBigTech(bigTechName);
    searchEngineStatus.textContent = dict.searchStatusBigTech(providerShort);
  }

  const filtered = getFilteredEmails();

  if (filtered.length === 0) {
    mailList.innerHTML = `
      <div style="padding: 28px 18px; text-align: center; color: var(--text-secondary); font-size: 0.88rem;">
        <div style="font-size: 1.6rem; margin-bottom: 8px;">🕵️</div>
        <strong>${escapeHtml(dict.noResultsTitle(state.searchQuery))}</strong>
        <p style="margin-top: 8px; font-size: 0.8rem; color: var(--text-muted);">
          ${!isUser ? escapeHtml(dict.noResultsBigTech(providerShort)) : escapeHtml(dict.noResultsUser)}
        </p>
      </div>
    `;
    mailDetail.innerHTML = `
      <div style="margin: auto; text-align: center; color: var(--text-muted); max-width: 380px;">
        <p>${escapeHtml(dict.noMailSelected)}</p>
      </div>
    `;
    return;
  }

  if (!filtered.some((m) => m.id === state.selectedId)) {
    state.selectedId = filtered[0].id;
  }

  mailList.innerHTML = filtered
    .map((m) => {
      const selected = m.id === state.selectedId ? 'selected' : '';
      const showCipher = !isUser && m.protected;
      const sender = showCipher ? m.opaqueFrom : m.realFrom;
      const subject = showCipher ? m.opaqueSubject : m.realSubject;
      const snippet = showCipher
        ? '-----BEGIN ZEROMX HPKE-X25519 ENVELOPE----- hQEMA9z8L2k...'
        : m.realBody.replace(/\n+/g, ' ').slice(0, 72) + '...';

      const badgeClass =
        m.trustTier === 'e2ee'
          ? 'badge-e2ee'
          : m.trustTier === 'tee'
          ? 'badge-tee'
          : 'badge-plain';

      return `
        <div class="mail-row ${selected}" data-mail-id="${m.id}">
          <div class="mail-row-top">
            <span class="mail-sender ${showCipher ? 'cipher-font' : ''}">${escapeHtml(sender)}</span>
            <span class="mail-time">${escapeHtml(m.time)}</span>
          </div>
          <div class="mail-subject ${showCipher ? 'cipher-font' : ''}">${escapeHtml(subject)}</div>
          <div class="mail-snippet ${showCipher ? 'cipher-font' : ''}">${escapeHtml(snippet)}</div>
          <span class="badge-trust ${badgeClass}">
            ${showCipher ? dict.serverCipherBadge : escapeHtml(m.trustLabel)}
          </span>
        </div>
      `;
    })
    .join('');

  mailList.querySelectorAll('.mail-row').forEach((row) => {
    row.addEventListener('click', () => {
      state.selectedId = row.getAttribute('data-mail-id');
      renderSimulator();
    });
  });

  const current = filtered.find((m) => m.id === state.selectedId) || filtered[0];
  const showDetailCipher = !isUser && current.protected;

  if (showDetailCipher) {
    mailDetail.innerHTML = `
      <div>
        <div class="detail-header">
          <div class="detail-subject cipher-font" style="font-size: 1.05rem;">${escapeHtml(current.opaqueSubject)}</div>
          <div class="detail-meta">
            <span><strong>${escapeHtml(dict.envelopeFromLabel)}</strong> <code>${escapeHtml(current.opaqueFrom)}</code></span>
            <span><strong>${escapeHtml(dict.toLabel)}</strong> <code>${escapeHtml(current.realTo)}</code></span>
          </div>
        </div>
        <div class="cipher-box">${escapeHtml(current.cipherBlob)}</div>
        <div class="ai-probe-box">
          <strong style="color: #fca5a5;">${escapeHtml(dict.aiProbeFailTitle(bigTechName))}</strong>
          <p style="color: var(--text-secondary); margin-top: 4px;">${dict.aiProbeFailDesc}</p>
        </div>
      </div>
      <div class="detail-actions">
        <button class="btn btn-primary" id="switchBackUserBtn">${escapeHtml(dict.switchBackUserBtn)}</button>
      </div>
    `;
    document.getElementById('switchBackUserBtn').addEventListener('click', () => setView('user'));
  } else {
    mailDetail.innerHTML = `
      <div>
        <div class="detail-header">
          <div class="detail-subject">${escapeHtml(current.realSubject)}</div>
          <div class="detail-meta">
            <span><strong>${escapeHtml(dict.fromLabel)}</strong> ${escapeHtml(current.realFrom)}</span>
            <span><strong>${escapeHtml(dict.toLabel)}</strong> ${escapeHtml(current.realTo)}</span>
            <span><strong>${escapeHtml(dict.sovereigntyLabel)}</strong> ${escapeHtml(current.trustLabel)}</span>
          </div>
        </div>
        <div class="detail-content">${escapeHtml(current.realBody)}</div>
        <div class="ai-probe-box">
          <strong style="color: #6ee7b7;">${escapeHtml(dict.mcpReadyTitle)}</strong>
          <p style="color: var(--text-secondary); margin-top: 4px;">${escapeHtml(dict.mcpReadyDesc)}</p>
        </div>
      </div>
      <div class="detail-actions">
        <button class="btn btn-primary" id="replySecureBtn">${escapeHtml(dict.replySecureBtn)}</button>
        <button class="btn btn-secondary" id="peekServerBtn">${escapeHtml(dict.peekServerBtn(providerShort))}</button>
      </div>
    `;
    document.getElementById('replySecureBtn').addEventListener('click', () => openComposeModal(current));
    document.getElementById('peekServerBtn').addEventListener('click', () => setView('bigtech'));
  }
}

function renderArchitecture() {
  const dict = t();
  const steps = dict.flows[state.activeFlow];
  if (state.activeStepIndex >= steps.length) {
    state.activeStepIndex = 0;
  }

  const row = document.getElementById('flowNodesRow');
  const inspector = document.getElementById('stepInspector');

  row.innerHTML = steps
    .map(
      (s, idx) => `
      <div class="flow-node ${idx === state.activeStepIndex ? 'active-step' : ''}" data-step-idx="${idx}">
        <span class="step-num">${escapeHtml(s.step)}</span>
        <h4>${escapeHtml(s.title)}</h4>
        <p>${escapeHtml(s.short)}</p>
      </div>
    `
    )
    .join('');

  row.querySelectorAll('.flow-node').forEach((el) => {
    el.addEventListener('click', () => {
      state.activeStepIndex = Number(el.getAttribute('data-step-idx'));
      renderArchitecture();
    });
  });

  const active = steps[state.activeStepIndex];
  const visRows = Object.entries(active.vis)
    .map(
      ([actor, val]) => `
      <div class="vis-row">
        <span style="color: var(--text-secondary);">${escapeHtml(actor)}</span>
        <strong style="text-align: right;">${escapeHtml(val)}</strong>
      </div>
    `
    )
    .join('');

  inspector.innerHTML = `
    <div class="inspector-what">
      <h3>${escapeHtml(active.detailTitle)}</h3>
      <p>${escapeHtml(active.detailBody)}</p>
    </div>
    <div class="inspector-visibility">
      <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 8px;">
        ${escapeHtml(dict.visMatrixTitle)}
      </div>
      ${visRows}
    </div>
  `;
}

function openComposeModal(replyTarget = null) {
  const cm = t().composeModal;
  const backdrop = document.getElementById('modalBackdrop');
  const content = document.getElementById('modalContent');

  const toVal = replyTarget ? replyTarget.realFrom : cm.defaultTo;
  const subjVal = replyTarget ? `Re: ${replyTarget.realSubject}` : cm.defaultSubj;

  content.innerHTML = `
    <div class="modal-top">
      <div>
        <span style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--accent-emerald);">
          ${escapeHtml(cm.tag)}
        </span>
        <h3 style="margin-top: 4px;">${escapeHtml(cm.title)}</h3>
      </div>
      <button class="modal-close" id="closeModalBtn">&times;</button>
    </div>
    <div class="form-field">
      <label>${escapeHtml(cm.fromLabel)}</label>
      <input type="text" value="${escapeHtml(cm.fromAddr)}" disabled />
    </div>
    <div class="form-field">
      <label>${escapeHtml(cm.toLabel)}</label>
      <input type="text" id="composeTo" value="${escapeHtml(toVal)}" />
    </div>
    <div class="form-field">
      <label>${escapeHtml(cm.subjLabel)}</label>
      <input type="text" id="composeSubject" value="${escapeHtml(subjVal)}" />
    </div>
    <div class="form-field">
      <label>${escapeHtml(cm.bodyLabel)}</label>
      <textarea rows="4" id="composeBody">${escapeHtml(cm.defaultBody)}</textarea>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 16px; flex-wrap: wrap;">
      <span style="font-size: 0.78rem; color: var(--text-secondary);">
        ${escapeHtml(cm.footerNote)}
      </span>
      <button class="btn btn-primary" id="sendSecureMailBtn">${escapeHtml(cm.sendBtn)}</button>
    </div>
  `;

  backdrop.classList.add('open');
  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
  document.getElementById('sendSecureMailBtn').addEventListener('click', () => {
    const to = document.getElementById('composeTo').value.trim() || cm.defaultTo;
    const subj = document.getElementById('composeSubject').value.trim() || '(No subject)';
    const body = document.getElementById('composeBody').value.trim();

    const newId = 'sent_' + Date.now();
    const isZeroMxPeer = to.includes('sovereign.dev') || to.includes('soberano.dev') || to.includes('zeromx');

    state.customSentByLang[state.lang].unshift({
      id: newId,
      protected: true,
      trustTier: isZeroMxPeer ? 'e2ee' : 'tee',
      trustLabel: isZeroMxPeer ? cm.sentTierE2ee : cm.sentTierTee,
      realFrom: `${cm.youLabel} <${cm.fromAddr}> → ${to}`,
      realTo: to,
      realSubject: subj,
      time: cm.sentNow,
      opaqueFrom: 'sent-self@egress.zeromx.network',
      opaqueSubject: '🔒 Thread #' + Math.random().toString(16).slice(2, 8),
      realBody: body,
      cipherBlob: `-----BEGIN ZEROMX SENT-COPY ENVELOPE-----\nVersion: ZeroMX/1.0 (RLN Anti-Spam Proof Verified on JAM)\nDraft-Leak: ZERO (Composed in isolated Shadow DOM)\n\nqW8eR1tY4uI7oP0aS3dF6gH9jK2lZ5xC8vB1nM4qW7eR0tY3uI6oP9aS2dF5gH8j\nK1lZ4xC7vB0nM3qW6eR9tY2uI5oP8aS1dF4gH7jK0lZ3xC6vB9nM2qW5eR8tY1uI\n=SentOk\n-----END ZEROMX SENT-COPY ENVELOPE-----`
    });

    state.selectedId = newId;
    closeModal();
    renderSimulator();
  });
}

function openMobileGapModal() {
  const mm = t().mobileModal;
  const backdrop = document.getElementById('modalBackdrop');
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <div class="modal-top">
      <div>
        <span style="font-family: var(--font-mono); font-size: 0.74rem; color: #fcd34d;">
          ${escapeHtml(mm.tag)}
        </span>
        <h3 style="margin-top: 4px;">${escapeHtml(mm.title)}</h3>
      </div>
      <button class="modal-close" id="closeModalBtn">&times;</button>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 12px;">
      <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 14px;">
        <strong style="color: #fca5a5; font-size: 0.86rem;">${escapeHtml(mm.badTitle)}</strong>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 8px;">${escapeHtml(mm.badDesc)}</p>
        <div class="code-mini" style="color: #fca5a5;">
          relay-3d7b@zeromx.network<br />
          🔒 Thread #a72f91<br />
          -----BEGIN ZEROMX...
        </div>
      </div>

      <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 14px;">
        <strong style="color: #6ee7b7; font-size: 0.86rem;">${escapeHtml(mm.goodTitle)}</strong>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 8px;">${escapeHtml(mm.goodDesc)}</p>
        <div class="code-mini" style="color: #6ee7b7;">${escapeHtml(mm.goodSample).replace(/\n/g, '<br />')}</div>
      </div>
    </div>

    <p style="font-size: 0.83rem; color: var(--text-secondary); margin-top: 16px;">${mm.summary}</p>

    <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
      <button class="btn btn-primary" id="okMobileBtn">${escapeHtml(mm.okBtn)}</button>
    </div>
  `;

  backdrop.classList.add('open');
  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
  document.getElementById('okMobileBtn').addEventListener('click', closeModal);
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('open');
}

function mountWaitlistWidget(container) {
  if (!container) return;
  const wf = t().waitlistForm;

  if (state.waitlist.submittedEmail) {
    container.innerHTML = `
      <div class="wl-success-box">
        <div style="font-size: 2rem;">🎉</div>
        <h3>${escapeHtml(wf.successTitle)}</h3>
        <p>${wf.successBody(escapeHtml(state.waitlist.submittedEmail))}</p>
        <button type="button" class="btn btn-secondary wl-share-btn">${escapeHtml(wf.shareBtn)}</button>
      </div>
    `;
    const shareBtn = container.querySelector('.wl-share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(window.location.origin + window.location.pathname);
          shareBtn.textContent = wf.copiedBtn;
        } catch (_) {
          shareBtn.textContent = wf.copiedBtn;
        }
      });
    }
    return;
  }

  const renderChips = (items, selectedId, attrName) =>
    items
      .map(
        (item) => `
        <button
          type="button"
          class="wl-chip ${item.id === selectedId ? 'selected' : ''}"
          data-${attrName}="${escapeHtml(item.id)}"
        >${escapeHtml(item.label)}</button>
      `
      )
      .join('');

  container.innerHTML = `
    <form class="wl-form" novalidate>
      <input type="text" name="website_url" class="hp-hidden" tabindex="-1" autocomplete="off" />
      <div class="wl-input-row">
        <input
          type="email"
          name="email"
          class="wl-email-input"
          value="${escapeHtml(state.waitlist.draftEmail)}"
          placeholder="${escapeHtml(wf.emailPlaceholder)}"
          required
        />
        <button type="submit" class="btn btn-primary wl-submit-btn">${escapeHtml(wf.submitBtn)}</button>
      </div>

      <div class="wl-chip-group">
        <span class="wl-chip-label">${escapeHtml(wf.providerLabel)}</span>
        <div class="wl-chips">${renderChips(wf.providers, state.waitlist.provider, 'wl-provider')}</div>
      </div>

      <div class="wl-chip-group">
        <span class="wl-chip-label">${escapeHtml(wf.domainLabel)}</span>
        <div class="wl-chips">${renderChips(wf.domains, state.waitlist.ownsDomain, 'wl-domain')}</div>
      </div>

      <div class="wl-chip-group">
        <span class="wl-chip-label">${escapeHtml(wf.planLabel)}</span>
        <div class="wl-chips">${renderChips(wf.plans, state.waitlist.planInterest, 'wl-plan')}</div>
      </div>

      <div class="wl-error" style="display: none;"></div>
      <div class="wl-note">${escapeHtml(wf.privacyNote)}</div>
    </form>
  `;

  container.querySelectorAll('[data-wl-provider]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.waitlist.provider = btn.getAttribute('data-wl-provider');
      mountWaitlistWidget(container);
    });
  });

  container.querySelectorAll('[data-wl-domain]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.waitlist.ownsDomain = btn.getAttribute('data-wl-domain');
      mountWaitlistWidget(container);
    });
  });

  container.querySelectorAll('[data-wl-plan]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.waitlist.planInterest = btn.getAttribute('data-wl-plan');
      mountWaitlistWidget(container);
    });
  });

  const form = container.querySelector('.wl-form');
  const emailInput = container.querySelector('input[name="email"]');
  const hpInput = container.querySelector('input[name="website_url"]');
  const submitBtn = container.querySelector('.wl-submit-btn');
  const errorEl = container.querySelector('.wl-error');

  emailInput.addEventListener('input', (e) => {
    state.waitlist.draftEmail = e.target.value;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.style.display = 'none';

    const email = emailInput.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errorEl.textContent = wf.invalidEmail;
      errorEl.style.display = 'block';
      emailInput.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = wf.submittingBtn;

    const payload = {
      email,
      website_url: hpInput.value,
      provider: state.waitlist.provider,
      ownsDomain: state.waitlist.ownsDomain,
      planInterest: state.waitlist.planInterest,
      lang: state.lang,
      referrer: document.referrer || window.location.href
    };

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok && res.status !== 404 && res.status !== 405 && res.status !== 501) {
        throw new Error('API rejected');
      }

      // If running on a local static server (404/405/501), store locally for preview convenience
      if (!res.ok) {
        const localEntries = JSON.parse(localStorage.getItem('zeromx_waitlist_preview') || '[]');
        localEntries.push(payload);
        localStorage.setItem('zeromx_waitlist_preview', JSON.stringify(localEntries));
      }

      state.waitlist.submittedEmail = email;
      renderInlineWaitlist();
      const modalMount = document.getElementById('modalWaitlistMount');
      if (modalMount) mountWaitlistWidget(modalMount);
    } catch (_) {
      submitBtn.disabled = false;
      submitBtn.textContent = wf.submitBtn;
      errorEl.textContent = wf.genericError;
      errorEl.style.display = 'block';
    }
  });
}

function renderInlineWaitlist() {
  const inlineMount = document.getElementById('inlineWaitlistMount');
  if (inlineMount) mountWaitlistWidget(inlineMount);
}

function openWaitlistModal() {
  const wf = t().waitlistForm;
  const backdrop = document.getElementById('modalBackdrop');
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <div class="modal-top">
      <div>
        <span style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--accent-emerald);">
          ${escapeHtml(wf.modalTag)}
        </span>
        <h3 style="margin-top: 4px;">${escapeHtml(wf.modalTitle)}</h3>
        <p style="font-size: 0.84rem; color: var(--text-secondary); margin-top: 4px;">${escapeHtml(wf.modalSub)}</p>
      </div>
      <button class="modal-close" id="closeModalBtn">&times;</button>
    </div>
    <div id="modalWaitlistMount"></div>
  `;

  backdrop.classList.add('open');
  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
  mountWaitlistWidget(document.getElementById('modalWaitlistMount'));
  const modalEmail = content.querySelector('input[name="email"]');
  if (modalEmail) modalEmail.focus();
}

function setView(view) {
  state.view = view;
  document.querySelectorAll('#viewToggle .seg-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === view);
  });
  renderSimulator();
}

function setLang(lang) {
  state.lang = lang;
  state.selectedId = 'm1';
  document.querySelectorAll('#langSwitch .lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  applyStaticTranslations();
  renderSimulator();
  renderArchitecture();
  renderInlineWaitlist();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', () => {
  // Language switch (EN default, PT optional)
  document.querySelectorAll('#langSwitch .lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });

  // Provider toggle
  document.querySelectorAll('#providerToggle .seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.provider = btn.getAttribute('data-provider');
      document.querySelectorAll('#providerToggle .seg-btn').forEach((b) =>
        b.classList.toggle('active', b === btn)
      );
      renderSimulator();
    });
  });

  // View toggle
  document.querySelectorAll('#viewToggle .seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => setView(btn.getAttribute('data-view')));
  });

  // Search input
  document.getElementById('inboxSearch').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderSimulator();
  });

  // Compose, Mobile & Waitlist buttons
  document.getElementById('openComposeBtn').addEventListener('click', () => openComposeModal(null));
  document.getElementById('mobilePreviewBtn').addEventListener('click', openMobileGapModal);
  document.getElementById('navWaitlistBtn').addEventListener('click', openWaitlistModal);
  document.getElementById('heroWaitlistBtn').addEventListener('click', openWaitlistModal);

  // Close modal on backdrop click
  document.getElementById('modalBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'modalBackdrop') closeModal();
  });

  // Architecture flow tabs
  document.querySelectorAll('#flowTabs .flow-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.activeFlow = tab.getAttribute('data-flow');
      state.activeStepIndex = 0;
      document.querySelectorAll('#flowTabs .flow-tab').forEach((t) =>
        t.classList.toggle('active', t === tab)
      );
      renderArchitecture();
    });
  });

  setLang('en');
});
