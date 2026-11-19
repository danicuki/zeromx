/* All site copy, in English and Brazilian Portuguese.
 * Keys ending in _html (and list item bodies) may contain inline markup and are
 * rendered as HTML. Everything else is rendered as text. */
const TRANSLATIONS = {
  en: {
    pageTitle: 'ZeroMX — Keep your inbox. Make it blind.',
    metaDescription: 'ZeroMX seals the mail sent to your domain before it reaches Gmail. Your provider stores ciphertext it cannot read. You keep reading and replying in the same tab.',

    nav_how: 'How it works',
    nav_demo: 'Demo',
    nav_trust: 'Trust',
    nav_investors: 'Investors',
    nav_developers: 'Developers',
    nav_cta: 'Join waitlist',

    hero_chip: 'Design stage. Alpha invites go to the waitlist first.',
    hero_title: 'Keep your inbox.<br /><em>Make it blind.</em>',
    hero_sub: 'ZeroMX seals the mail sent to your domain before it reaches Gmail. Google stores ciphertext it can’t read, search or scan. You keep reading and replying in the same tab.',
    hero_btn_waitlist: 'Join the waitlist',
    hero_btn_primary: 'Try the demo',
    hero_fact1: '<strong>First:</strong> Gmail on desktop Chrome',
    hero_fact2: '<strong>Next:</strong> Outlook, iCloud, Fastmail',
    hero_fact3: '<strong>On your phone:</strong> the ZeroMX app',

    lens: {
      plainLabel: 'On your screen',
      cipherLabel: 'Stored at Google',
      hint: 'Drag to compare',
      sliderLabel: 'Compare what you see with what your provider stores',
      fromLabel: 'From',
      subjectLabel: 'Subject',
      from: 'Mount Sinai Lab <results@mountsinai.org>',
      subject: 'Your blood panel and diagnostic report',
      body: [
        'Hello,',
        'Your laboratory panel collected on Nov 16 is ready. Lipid panel, fasting glucose and CBC are within normal reference ranges.',
        'The full report is attached.'
      ],
      attach: 'bloodwork_panel_2026.pdf',
      attachMeta: '412 KB',
      cFrom: 'relay-3d7b12@in.zeromx.network',
      cSubject: '🔒 Thread #a72f91c04e1b',
      cAttachMeta: 'sealed, padded to 416 KB'
    },

    how_tag: 'The idea',
    how_title: 'Three steps, and your mailbox stops being readable.',
    how_steps: [
      {
        title: 'Point your domain at ZeroMX',
        body: 'Two DNS records for <code>you@yourdomain.com</code>. No domain yet? Onboarding registers one in your name.'
      },
      {
        title: 'Mail is sealed on arrival',
        body: 'A relay inside an attested confidential VM encrypts sender, subject, body and attachments to a key only your devices hold, then forwards the sealed envelope to your Gmail.'
      },
      {
        title: 'Read it where you always do',
        body: 'A browser extension decrypts inside Gmail, in a frame the page can’t read. Replies leave sealed, and drafts never touch Google.'
      }
    ],

    pillar1_title: 'No new inbox on desktop',
    pillar1_desc: 'Your filters, labels, shortcuts and the tab you already keep open. Nothing moves.',
    pillar2_title: 'Your provider holds ciphertext',
    pillar2_desc: 'For mail to your domain there is no readable archive to mine, train on, leak or hand over.',
    pillar3_title: 'Search and AI stay yours',
    pillar3_desc: 'A local encrypted index gives instant search. A local MCP server lets your own agents work with your mail, on your machine, with your permission.',
    pillar4_title: 'Built to be checked',
    pillar4_desc: 'Open-source relay images with reproducible builds. Keys and relay measurements in a public append-only log, designed to run on Polkadot JAM.',

    sim_tag: 'Demo',
    sim_title: 'Both sides of the same inbox.',
    sim_desc: 'Switch between what you see and what the provider stores. Search for <strong>Sinai</strong> in each view. Send a reply and look at what lands in the mailbox.',
    sim_provider_label: 'Provider',
    sim_view_label: 'View',
    sim_view_user: 'What you see',
    sim_view_bigtech: 'What the provider stores',
    sim_mobile_btn: 'What about my phone?',
    sim_search_placeholder: 'Search mail (try: Sinai, wire, Alice)',
    sim_compose_btn: 'Compose',
    folder_inbox: 'Inbox',
    folder_starred: 'Starred',
    folder_sent: 'Sent',
    origins_title: 'Addresses in this inbox',
    originPersonal: '<code>@yourdomain.com</code> sealed',
    originWork: '<code>old @gmail.com</code> not sealed',

    providerTitleGmail: 'Gmail — you@yourdomain.com',
    providerTitleOutlook: 'Outlook — you@yourdomain.com',
    extActive: 'ZeroMX active',
    extRaw: (p) => `Raw storage at ${p}`,
    bannerUser: '<strong>Your view.</strong> The extension decrypts in this tab. Search runs on a local index.',
    bannerBigTech: (p) => `<strong>Provider view.</strong> This is everything ${p} has stored. Try searching “Sinai”.`,
    searchStatusUser: 'Search: local encrypted index',
    searchStatusBigTech: (p) => `Search: ${p} server index`,
    noResultsTitle: (q) => `No results for “${q}”`,
    noResultsBigTech: (p) => `${p} can only index what it can read. Sealed mail gives it nothing to match. Switch to “What you see” and search again.`,
    noResultsUser: 'Try Sinai, wire or Alice.',
    noMailSelected: 'Nothing to show for this search.',
    serverCipherBadge: 'Ciphertext',
    badgeShort: { e2ee: 'End to end', tee: 'Sealed on arrival', plain: 'Not sealed' },
    visLegend: { no: 'cannot read it', part: 'holds it briefly', yes: 'reads it' },
    envelopeFromLabel: 'From (as stored)',
    toLabel: 'To',
    fromLabel: 'From',
    protectionLabel: 'Protection',
    probeTitle: (p) => `What ${p} can learn from this message`,
    probeDesc: 'Arrival time and a padded size. The sender, subject, body and attachments are unreadable without the key on your device.',
    switchBackUserBtn: 'Show decrypted view',
    mcpTitle: 'Available to your local AI',
    mcpDesc: 'Indexed on this machine and exposed through a local MCP server, only to the agents you approve.',
    replySecureBtn: 'Reply sealed',
    peekServerBtn: (p) => `See what ${p} stores`,
    attachmentLabel: 'Attachment',

    composeModal: {
      tag: 'ISOLATED FRAME · DRAFT AUTO-SAVE BLOCKED',
      title: 'New sealed message',
      fromLabel: 'From',
      fromAddr: 'you@yourdomain.com',
      toLabel: 'To',
      defaultTo: 'partner@company.com',
      subjLabel: 'Subject (hidden from your provider)',
      defaultSubj: 'Term sheet, confidential',
      bodyLabel: 'Message',
      defaultBody: 'Writing from my usual inbox. This draft was never uploaded to Google. It leaves signed by my own domain key, and the copy in my Sent mail is sealed.',
      footerNote: 'Signed on your device. Sent copy sealed to your key.',
      routeE2ee: 'Recipient uses ZeroMX: encrypted end to end on your device.',
      routeRelay: 'Recipient doesn’t use ZeroMX: delivered through an attested relay. Try alice@sovereign.dev.',
      sendBtn: 'Send sealed',
      noSubject: '(no subject)',
      sentNow: 'Just now',
      youLabel: 'You',
      sentSealedBy: 'your device',
      sentTierE2ee: 'End to end · ZeroMX to ZeroMX',
      sentTierTee: 'Sent via attested relay · copy stored sealed'
    },

    mobileModal: {
      tag: 'ON YOUR PHONE',
      title: 'What happens on your phone?',
      badTitle: 'Gmail’s mobile app',
      badDesc: 'Phone apps don’t allow extensions, so Gmail’s app shows the sealed envelope:',
      goodTitle: 'The ZeroMX app',
      goodDesc: 'The relay sends a sealed preview straight to your phone. The app decrypts it on the device:',
      goodSample: 'Mount Sinai Lab\nYour blood panel and diagnostic report\nUnlocked on this device',
      summary: '<strong>The trade-off:</strong> on desktop you never leave Gmail. On your phone, sealed mail lives in the ZeroMX app. You can also pick senders, like newsletters, to leave unsealed so they stay readable everywhere.',
      okBtn: 'Got it'
    },

    emails: [
      {
        id: 'm1',
        protected: true,
        tier: 'e2ee',
        trustLabel: 'End to end · ZeroMX to ZeroMX',
        realFrom: 'Alice <alice@sovereign.dev>',
        realTo: 'you@yourdomain.com',
        realSubject: 'Moved my domain over. You should too',
        time: '11:42 AM',
        opaqueFrom: 'relay-91f0a8@in.zeromx.network',
        opaqueSubject: '🔒 Thread #9f2c41d07b3e',
        realBody: 'Hey,\n\nI finally did it. Same Gmail tab, same shortcuts, but my domain’s mail is sealed before Google stores it.\n\nSince we both use ZeroMX, this message was encrypted on my laptop to your key. No relay could read it on the way.\n\nThe phone is the one thing that changes: I read sealed mail in the ZeroMX app there.',
        sealedBy: 'sender device',
        padded: '4 KiB'
      },
      {
        id: 'm2',
        protected: true,
        tier: 'tee',
        trustLabel: 'Sealed on arrival · attested relay (AMD SEV-SNP)',
        realFrom: 'Mount Sinai Lab <results@mountsinai.org>',
        realTo: 'you@yourdomain.com',
        realSubject: 'Your blood panel and diagnostic report',
        time: '09:15 AM',
        opaqueFrom: 'relay-3d7b12@in.zeromx.network',
        opaqueSubject: '🔒 Thread #a72f91c04e1b',
        realBody: 'Hello,\n\nYour laboratory panel collected on Nov 16 is ready. Lipid panel, fasting glucose and CBC are within normal reference ranges.\n\nThe full report is attached.',
        attachment: { name: 'bloodwork_panel_2026.pdf', size: '412 KB' },
        note: 'The hospital sent ordinary email. A relay verified its DKIM signature, sealed sender, subject and PDF to your key, signed the envelope and wiped its memory.',
        sealedBy: 'relay sev-snp:88f1…2c',
        padded: '416 KiB'
      },
      {
        id: 'm3',
        protected: true,
        tier: 'tee',
        trustLabel: 'Sealed on arrival · attested relay (Intel TDX)',
        realFrom: 'Chase Private Client <wires@chase.com>',
        realTo: 'you@yourdomain.com',
        realSubject: 'International wire settled, November statement',
        time: 'Yesterday',
        opaqueFrom: 'relay-c40e55@in.zeromx.network',
        opaqueSubject: '🔒 Thread #44e01b8a2f60',
        realBody: 'Dear client,\n\nYour international wire transfer #884920 for $14,500.00 has settled.\n\nYour consolidated statement and tax summary are attached.',
        attachment: { name: 'statement_2026_11.pdf', size: '88 KB' },
        sealedBy: 'relay tdx:41a9…9b',
        padded: '88 KiB'
      },
      {
        id: 'm4',
        protected: false,
        tier: 'plain',
        trustLabel: 'Not sealed · sent to your old @gmail.com address',
        realFrom: 'Product Weekly <hello@productweekly.co>',
        realTo: 'you.old@gmail.com',
        realSubject: 'This week: 5 launches worth your time',
        time: 'Yesterday',
        opaqueFrom: 'Product Weekly <hello@productweekly.co>',
        opaqueSubject: 'This week: 5 launches worth your time',
        realBody: 'Hi there,\n\nHere are this week’s picks.\n\nWhy can the provider read this one? It was sent to your old @gmail.com address, so it went straight to Google’s servers and never passed a ZeroMX relay. Mail is only sealed when it is addressed to your own domain. Moving a subscription over takes a change of address.',
        sealedBy: null,
        padded: null
      }
    ],

    arch_tag: 'Under the hood',
    arch_title: 'Follow one email, stage by stage.',
    arch_desc: 'Pick a scenario, then click a stage to see who can see what at that moment, including the parts that aren’t perfect.',
    flow_tab_inbound: 'A bank or clinic emails you',
    flow_tab_outbound: 'You reply',
    flow_tab_native: 'ZeroMX to ZeroMX',
    visMatrixTitle: 'Who can see what at this stage',

    flows: {
      inbound: [
        {
          step: 'Stage 1 · Route',
          title: 'The sender changes nothing',
          short: 'Ordinary email, routed by your domain’s DNS.',
          detailTitle: 'An ordinary email finds a ZeroMX relay',
          detailBody: 'When a hospital or bank emails you@yourdomain.com, their server looks up your domain’s MX records and connects to a ZeroMX relay over TLS. Your domain publishes MTA-STS and DANE records, so senders that check them only deliver to a genuine relay. If one relay is down, email’s own retry moves to the next.',
          vis: [
            ['Relay operator', 'no', 'No software access to the VM’s memory'],
            ['Relay VM (attested)', 'part', 'Receives the message in encrypted RAM'],
            ['Control plane', 'no', 'Never receives mail'],
            ['Google', 'no', 'Has nothing yet'],
            ['You', 'wait', 'Waiting']
          ]
        },
        {
          step: 'Stage 2 · Seal',
          title: 'Checked, sealed and signed',
          short: 'Encrypted to your key inside the relay’s memory.',
          detailTitle: 'Sealed in memory, then wiped',
          detailBody: 'Inside the confidential VM, the relay verifies SPF, DKIM and DMARC, scores spam, then encrypts sender, subject, body and attachments to your public key. It swaps the Message-ID for a pseudonym, pads the size, signs the envelope and wipes the plaintext. Honest limit: for those milliseconds the plaintext exists inside the VM. Attestation shows which code is running. It can’t rule out a hardware attack by someone with physical access, which is why operators are vetted.',
          vis: [
            ['Relay operator', 'no', 'Blocked by CPU memory encryption'],
            ['Relay VM (attested)', 'part', 'Holds plaintext for milliseconds'],
            ['Control plane', 'no', 'Supplies your public key'],
            ['Google', 'no', 'Has nothing yet'],
            ['You', 'yes', 'Only holder of the private key']
          ]
        },
        {
          step: 'Stage 3 · Store',
          title: 'Gmail stores a sealed envelope',
          short: 'Free storage that can’t read what it holds.',
          detailTitle: 'Your mailbox receives ciphertext',
          detailBody: 'The relay delivers the envelope from an opaque relay address, with a thread token as its subject. Gmail still groups the conversation, because replies share the same pseudonymous thread chain. It learns the arrival time and a padded size, and nothing else.',
          vis: [
            ['Relay operator', 'no', 'Nothing written to disk'],
            ['Relay VM (attested)', 'no', 'Plaintext already wiped'],
            ['Control plane', 'no', 'No access'],
            ['Google', 'part', 'Ciphertext, arrival time, padded size'],
            ['You', 'yes', 'Arrives in your normal inbox']
          ]
        },
        {
          step: 'Stage 4 · Read',
          title: 'Decrypted in your tab',
          short: 'Verified, unlocked with your passkey, shown inline.',
          detailTitle: 'You read it like any other email',
          detailBody: 'The extension checks that a registered relay signed the envelope and that your key record is in the public log. Your passkey unlocks the private key, and the message renders in a frame Gmail’s scripts can’t read. Your local search index and local MCP server update.',
          vis: [
            ['Relay operator', 'no', 'No access'],
            ['Relay VM (attested)', 'no', 'Out of the loop'],
            ['Control plane', 'no', 'Serves key and relay records with proofs'],
            ['Google', 'no', 'Still ciphertext while you read'],
            ['You', 'yes', 'Read, search, use your own AI']
          ]
        }
      ],
      outbound: [
        {
          step: 'Stage 1 · Compose',
          title: 'Drafts never reach Google',
          short: 'An isolated composer replaces the native one.',
          detailTitle: 'Closing the draft leak',
          detailBody: 'Gmail’s own compose box uploads your draft every few seconds. ZeroMX opens its composer in an isolated extension frame instead. Drafts are sealed to your own key before they are saved anywhere.',
          vis: [
            ['Relay operator', 'no', 'No access'],
            ['Egress VM (attested)', 'wait', 'Waiting for the send'],
            ['Control plane', 'no', 'No access'],
            ['Google', 'no', 'Draft auto-save never sees plaintext'],
            ['You', 'yes', 'Writing in private']
          ]
        },
        {
          step: 'Stage 2 · Sign',
          title: 'Your device signs, not the relay',
          short: 'The DKIM key for your domain stays with you.',
          detailTitle: 'No relay can forge mail from your domain',
          detailBody: 'Your client signs the message with your domain’s DKIM key, which never leaves your devices, and attaches a quota token that keeps spammers off the shared sending addresses. The relay never holds a key that could sign as you.',
          vis: [
            ['Relay operator', 'no', 'No access'],
            ['Egress VM (attested)', 'no', 'Checks the quota token'],
            ['Control plane', 'no', 'No access'],
            ['Google', 'no', 'Not involved'],
            ['You', 'yes', 'Hold the only signing key']
          ]
        },
        {
          step: 'Stage 3 · Deliver',
          title: 'Out to the world, sealed copy to you',
          short: 'The recipient gets normal email. Your Sent copy is ciphertext.',
          detailTitle: 'Delivered, with the thread kept whole',
          detailBody: 'An attested egress relay unwraps the message in memory and delivers it over TLS, unmodified. Your client sends a second copy, sealed to your own key, into your mailbox so the conversation stays complete. Honest limit: the recipient’s provider stores their copy the way it always does.',
          vis: [
            ['Relay operator', 'no', 'Blocked by CPU memory encryption'],
            ['Egress VM (attested)', 'part', 'Holds plaintext for milliseconds'],
            ['Google (your mailbox)', 'no', 'Sent copy is ciphertext'],
            ['Recipient’s provider', 'leak', 'Stores the recipient’s copy as usual'],
            ['You', 'yes', 'Whole thread in one place']
          ]
        }
      ],
      native: [
        {
          step: 'Stage 1 · Discover',
          title: 'Both sides use ZeroMX',
          short: 'Your client finds the recipient’s verified key.',
          detailTitle: 'The upgrade is automatic',
          detailBody: 'When you address alice@sovereign.dev, your client finds her key in the public directory and verifies the proof that it is really hers. Nothing to exchange, nothing to configure.',
          vis: [
            ['Relay operator', 'no', 'No access'],
            ['Relay VM (attested)', 'no', 'Will carry sealed bytes only'],
            ['Control plane', 'no', 'Serves Alice’s key record with a proof'],
            ['Google / Microsoft', 'no', 'No access'],
            ['You', 'yes', 'Verified her key']
          ]
        },
        {
          step: 'Stage 2 · Encrypt',
          title: 'Encrypted before it leaves your device',
          short: 'No relay ever holds the plaintext.',
          detailTitle: 'End to end, with a post-quantum hybrid',
          detailBody: 'Your client encrypts directly to Alice’s key with a hybrid scheme (X25519 with ML-KEM-768), so recorded ciphertext stays safe against future quantum attacks. No relay, CPU vendor or mailbox provider holds the plaintext at any point. Honest limit: stored mail has no forward secrecy. A stolen long-term key opens the messages of its key period.',
          vis: [
            ['Relay operator', 'no', 'Carries sealed bytes'],
            ['Relay VM (attested)', 'no', 'Never decrypts'],
            ['Control plane', 'no', 'No access'],
            ['Google / Microsoft', 'no', 'Ciphertext at both ends'],
            ['You and Alice', 'yes', 'The only key holders']
          ]
        }
      ]
    },

    trust_tag: 'Trust',
    trust_title: 'What you’re trusting, stated plainly.',
    trust_desc: 'Most privacy products are vaguest exactly here. These are the three levels of protection, what each one rests on, and what ZeroMX does not protect.',
    tiers: [
      {
        badge: 'Tier 1',
        title: 'ZeroMX to ZeroMX',
        body: 'Encrypted on the sender’s device, decrypted on yours. No relay holds the plaintext at any point.',
        restsOn: 'Rests on the two devices, the cipher suite and the client software.'
      },
      {
        badge: 'Tier 2 · default',
        title: 'From everyone else',
        body: 'Sealed on arrival by a relay in an attested confidential VM (AMD SEV-SNP or Intel TDX) running a reproducible open-source image.',
        restsOn: 'Rests on the CPU vendor, and on nobody physically attacking the machine. That is why relay operators are vetted and listed publicly.'
      },
      {
        badge: 'Tier 3 · planned',
        title: 'Split trust',
        body: 'The incoming connection is split across two operators on different CPU vendors. Neither can read the message alone.',
        restsOn: 'Breaking it takes both operators and both vendors at once.'
      }
    ],
    protects_title: 'Protected',
    protects: [
      'Mail sent to your domain is ciphertext in your mailbox: body, attachments, real sender and subject.',
      'Drafts and sent copies.',
      'Your archive can’t be searched, scanned, used for ads or AI training, or handed over in readable form by your mailbox provider.',
      'Mail between ZeroMX users, end to end.'
    ],
    limits_title: 'Not protected',
    limits: [
      '<strong>The other side’s copy.</strong> If they use Gmail, Google has their copy.',
      '<strong>Mail sent to your old @gmail.com address.</strong> It never passes a relay.',
      '<strong>Timing and size.</strong> Your provider sees when mail arrives and roughly how big it is.',
      '<strong>The relay’s moment with outside mail.</strong> Attestation narrows who could read it. It doesn’t prove nobody did.',
      '<strong>A compromised device or a stolen key.</strong>'
    ],
    trust_note: '<strong>Who is still trusted at alpha:</strong> the ZeroMX team runs the relays and publishes the extension. Reproducible builds, per-message relay verification, independent operators and split trust each remove part of that, in that order.',

    onboard_tag: 'Getting started',
    onboard_title: 'One requirement: an address on your own domain.',
    onboard_desc: 'Setup is designed to take a few minutes, and to be something you can undo.',
    onboardingSteps: [
      {
        title: 'Create your key with a passkey',
        desc: 'Face ID, Touch ID or a security key. No key files and no passphrase. A printable recovery kit covers a lost device.',
        code: null
      },
      {
        title: 'Point your domain',
        desc: 'Onboarding sets these records for you, along with the ones that pin delivery to genuine relays.',
        code: 'MX 10 mx1.zeromx.network<br />MX 20 mx2.zeromx.network<br />TXT "v=spf1 include:out.zeromx.network -all"'
      },
      {
        title: 'Choose your vault',
        desc: 'Pick the mailbox that receives the sealed envelopes. Gmail first. You can move to another provider later and keep your address and keys.',
        code: null
      },
      {
        title: 'Install the extension',
        desc: 'Mail to your domain now opens decrypted in Gmail on desktop. On your phone, install the ZeroMX app. Desktop mail apps such as Apple Mail and Spark connect through ZeroMX Bridge from the beta.',
        code: null
      }
    ],
    pricing_note: '<strong>Planned price:</strong> $3 a month. Storage stays in the mailbox you already have. Later, holders of DOT can stake instead of paying monthly. A stake carries token price risk.',

    road_tag: 'Roadmap',
    road_title: 'Where this is today.',
    road_desc: 'ZeroMX is at design stage. Nothing here is a shipped product yet. This is the order things get built in.',
    roadmap: [
      {
        when: 'Now',
        title: 'Design and prototype',
        body: 'Protocol specification, threat model and this interactive prototype.',
        state: 'now'
      },
      {
        when: 'Next',
        title: 'Private alpha',
        body: 'Gmail on desktop Chrome, with relays run by the ZeroMX team and labeled that way. Invites go to the waitlist.',
        state: 'next'
      },
      {
        when: 'Then',
        title: 'Public beta',
        body: 'Independent security audit, relays you can verify per message, the mobile app, ZeroMX Bridge for desktop mail apps, local search and MCP.',
        state: 'later'
      },
      {
        when: 'Later',
        title: 'Open network',
        body: 'Independent relay operators, the control plane as a Polkadot JAM service, split-trust ingress.',
        state: 'later'
      }
    ],

    manifesto_html: 'Your inbox knows your bank, your doctor, your lawyer and your landlord. Today your email provider can read every word. With ZeroMX it reads <span class="redact">nothing at all</span>.',

    compare_tag: 'The alternatives',
    compare_title: 'Every other option makes you give something up.',
    compare_desc: 'Stay and be read, move and start over, or bolt on a plugin most senders can’t use. ZeroMX is the fourth column.',
    compare: {
      cols: ['Plain Gmail', 'Move to an encrypted provider', 'PGP plugin', 'ZeroMX'],
      rows: [
        ['Keep your Gmail tab and habits', 'yes', 'no', 'yes', 'yes'],
        ['Stored mail is unreadable to the provider', 'no', 'yes', 'part:Only if the sender uses PGP', 'yes'],
        ['Sender and subject hidden too', 'no', 'part:Varies', 'no', 'yes'],
        ['Works for mail from anyone', 'yes', 'yes', 'no', 'yes'],
        ['Fast search over your own mail', 'yes', 'part:Varies', 'no', 'yes'],
        ['On your phone', 'yes', 'yes', 'no', 'part:In the ZeroMX app']
      ]
    },

    inv_tag: 'For investors',
    inv_title: 'Private email lost because it asked people to move. This doesn’t.',
    inv_lede: 'Encrypted mail has a proven market and a hard ceiling: most people will not leave the inbox they have used for fifteen years. ZeroMX sells the privacy without the move.',
    inv_stats: [
      { n: '1.8B', l: 'people use Gmail', s: 'Widely reported figure' },
      { n: '100M+', l: 'accounts at the largest encrypted provider', s: 'Proton, its own announcement' },
      { n: '$0', l: 'storage cost per user', s: 'Mail stays in the mailbox the user already has' }
    ],
    inv_points: [
      { t: 'The wedge', b: 'People who already own a domain and live in Gmail: founders, freelancers, consultants, crypto-native users. They hold client, health and financial mail, and they have never accepted a second inbox.' },
      { t: 'The cost structure', b: 'Encrypted providers pay to store and serve decades of mail. ZeroMX stores none of it. Relays seal and forward, which is what makes a $3 monthly price workable.' },
      { t: 'Why now', b: 'Passkeys make key management invisible. Confidential VMs are a commodity on every major cloud. AI assistants reading inboxes made the problem visible, and local AI turns a private index into a feature.' },
      { t: 'What compounds', b: 'Any two ZeroMX users upgrade to end-to-end automatically, so the key directory grows more valuable with every domain. An operator network and a public audit trail are hard to copy quickly.' },
      { t: 'Revenue', b: 'Subscriptions first, with a Pro tier for multiple domains. Then a gateway for small regulated firms on Workspace or Microsoft 365, with organization-held keys and dedicated relays.' },
      { t: 'Risks we plan around', b: 'Dependence on Gmail’s web interface and delivery rules. Hardware attestation narrows trust but is not a proof. Polkadot JAM is not on mainnet yet, so the first releases do not depend on it.' }
    ],
    inv_stage: '<strong>Stage:</strong> protocol design and threat model are written. The private alpha is next.',
    inv_cta: 'Start a conversation',

    dev_tag: 'For developers',
    dev_title: 'Hard problems, meant to be solved in the open.',
    dev_lede: 'Client, relay and protocol are meant to be open source with reproducible builds. The repository is private while the design settles. Ask for access and pick one of these.',
    dev_stack: ['Rust', 'WebAssembly', 'TypeScript', 'HPKE + ML-KEM', 'SEV-SNP / TDX', 'Polkadot JAM (PVM)', 'WebAuthn PRF', 'SQLite FTS5', 'MCP'],
    dev_problems: [
      { t: 'Private key lookups', b: 'Find a recipient’s key without telling the server who you are about to email.', tag: 'Rust · Wasm · PIR' },
      { t: 'Split-trust SMTP ingress', b: 'Terminate one TLS session across two operators on different CPU vendors, so neither holds the plaintext alone.', tag: '2PC-TLS · MPC' },
      { t: 'The sealed-envelope library', b: 'Hybrid HPKE, protected headers, pseudonymous threading and Padmé padding, byte-identical in the relay and in the browser.', tag: 'Rust · Wasm · crypto' },
      { t: 'A Gmail adapter that survives redesigns', b: 'Decrypt inline in a cross-origin frame, replace the composer, and keep working when the page markup changes.', tag: 'TypeScript · MV3' },
      { t: 'Reproducible confidential-VM images', b: 'A relay image anyone can rebuild bit for bit and match against the attested measurement.', tag: 'Nix · SEV-SNP · TDX' },
      { t: 'Attestation checks as a JAM service', b: 'Verify vendor certificate chains and measurements in Refine. Record operators and keys in Accumulate.', tag: 'Rust no_std · PVM' }
    ],
    dev_cta: 'Ask for repository access',

    jam_title: 'Why the control plane targets Polkadot JAM',
    jam_points: [
      { t: 'Shaped like the workload', b: 'Heavy, stateless verification runs in Refine. Only the result reaches chain state in Accumulate. Attestation evidence and proof batches are exactly that kind of input.' },
      { t: 'No precompile gaps', b: 'The verifier is ordinary Rust compiled to PVM. P-384, RSA-PSS, SHA-384 or a post-quantum signature need no protocol upgrade and no proving service.' },
      { t: 'A service, not a chain', b: 'No validator or collator set to bootstrap. Coretime is bought as needed, and bonds settle in DOT under Polkadot’s own security.' }
    ],
    jam_note: '<strong>What JAM does not give us yet:</strong> a mainnet, and a finished light client for the browser. Other teams are building those light clients. Until they are ready, the first releases use a public append-only log.',

    wl_tag: 'Early access',
    wl_title: 'Get an alpha invite.',
    wl_desc: 'The private alpha starts with Gmail on desktop Chrome. Tell us about your setup and we’ll invite the people it fits first.',
    wl_perk1: 'First invites to the private alpha',
    wl_perk2: 'Your setup shapes what gets built first',
    wl_perk3: 'One email when your invite is ready. No newsletter.',

    waitlistForm: {
      modalTag: 'EARLY ACCESS',
      modalTitle: 'Join the ZeroMX waitlist',
      modalSub: 'Users, investors and contributors all start here. Tell us which you are.',
      emailPlaceholder: 'you@yourdomain.com',
      submitBtn: 'Join waitlist',
      submittingBtn: 'Joining…',
      providerLabel: 'Where your mail lives today',
      providers: [
        { id: 'gmail', label: 'Gmail / Workspace' },
        { id: 'outlook', label: 'Outlook / M365' },
        { id: 'icloud', label: 'iCloud' },
        { id: 'other', label: 'Proton / other' }
      ],
      clientLabel: 'Where you read it',
      clients: [
        { id: 'webmail', label: 'In the browser' },
        { id: 'apple-mail', label: 'Apple Mail' },
        { id: 'spark', label: 'Spark' },
        { id: 'outlook-app', label: 'Outlook app' },
        { id: 'other-app', label: 'Another app' },
        { id: 'phone', label: 'Mostly on my phone' }
      ],
      domainLabel: 'Custom domain',
      domains: [
        { id: 'yes', label: 'I own one' },
        { id: 'not-yet', label: 'Not yet' }
      ],
      planLabel: 'What brings you here',
      plans: [
        { id: 'fiat-sub', label: 'Using it ($3 a month)' },
        { id: 'stake-dot', label: 'Using it (staking DOT)' },
        { id: 'b2b-team', label: 'For my team' },
        { id: 'run-node', label: 'Running a relay' },
        { id: 'invest', label: 'Investing' },
        { id: 'contribute', label: 'Contributing code' }
      ],
      privacyNote: 'Used only to send your invite. This page has no trackers.',
      invalidEmail: 'Please enter a valid email address.',
      genericError: 'That didn’t go through. Please try again in a moment.',
      successTitle: 'You’re on the list.',
      successBody: (email) => `We saved a spot for <strong>${email}</strong>. Know someone who would want this? Send them the link.`,
      shareBtn: 'Copy link',
      copiedBtn: 'Link copied'
    },

    faq_tag: 'Questions',
    faq_title: 'Fair questions.',
    faq: [
      {
        q: 'Is this live?',
        a: 'Not yet. ZeroMX is at design stage, and this page is an interactive prototype of the experience. The waitlist gets the first alpha invites.'
      },
      {
        q: 'So Google can’t read any of my email?',
        a: 'Google can’t read the mail stored in your mailbox for your domain. It can still read what its own users send you, from their side, and anything sent to your old @gmail.com address.'
      },
      {
        q: 'Why not just use Proton?',
        a: 'Proton is a good choice if you’re happy to move to a new inbox. ZeroMX keeps the mailbox and account you already have, stores none of your mail itself, and costs less. Your provider just stops being able to read it.'
      },
      {
        q: 'Where does my mail actually go? Does the relay send it to my computer?',
        a: 'No. The relay seals each message and delivers it to your mailbox, Gmail for example, like any other mail server would. Your mailbox is the storage and the sync. Every device reads from it, so nothing has to be online to receive mail, and there is no extra cloud and no syncing between your devices.'
      },
      {
        q: 'I use Spark or Apple Mail, not Gmail in a browser.',
        a: 'Then the browser extension won’t help you. ZeroMX Bridge will: a small app on your computer that reads your mailbox, decrypts with your key, and hands normal mail to your mail app on your own machine. It works the way Proton’s Bridge does, and it is planned for the public beta. Two honest limits: your app’s cloud extras, such as push from its servers or Send Later, stop working for that account, and the Bridge has to run on each computer you read from. Tell us your app in the waitlist form.'
      },
      {
        q: 'Do I lose Gmail’s search?',
        a: 'For sealed mail, Gmail only sees envelopes, so search runs on your device instead, with the operators you already know: from:, subject:, has:attachment, before:, label: and the rest. Mail you received before ZeroMX stays searchable in Gmail. Searching inside PDF attachments comes later. An optional local AI model can answer questions about your mail without it leaving your computer.'
      },
      {
        q: 'What happens on my phone?',
        a: 'Gmail’s app shows sealed envelopes, so you read ZeroMX mail in the ZeroMX app, which shows real senders and subjects in notifications. On the phone this is a second app. We would rather say so than hide it.'
      },
      {
        q: 'Do I have to trust ZeroMX?',
        a: 'Less than a normal mail provider, but not zero. At alpha the team runs the relays and publishes the extension, and a relay holds mail from outside senders in memory for a moment before sealing it. The plan to shrink each of those is public: reproducible builds, attested relays, independent operators, split trust.'
      },
      {
        q: 'Why Polkadot JAM?',
        a: 'The network needs a neutral public record of user keys, relay measurements and operators that no single company can quietly rewrite. JAM is designed for that kind of verification-heavy service. It isn’t live on mainnet yet, so ZeroMX starts with a public append-only log and moves to JAM when it is ready. No email ever goes on-chain.'
      },
      {
        q: 'What if I lose my device?',
        a: 'Your recovery kit restores your key. Without the kit or another signed-in device, nobody can recover your mail, including us.'
      },
      {
        q: 'What will it cost?',
        a: 'The plan is $3 a month. Storage stays in the mailbox you already have. Later, DOT holders can stake instead of paying monthly, which carries token price risk.'
      }
    ],

    footer_text: 'ZeroMX is a design-stage project. This page is an interactive prototype, not a shipped product.',
    footer_built: 'Control plane designed for Polkadot JAM.'
  },

  pt: {
    pageTitle: 'ZeroMX — Mantenha sua caixa de entrada. Deixe-a cega.',
    metaDescription: 'O ZeroMX sela os e-mails enviados ao seu domínio antes de chegarem ao Gmail. Seu provedor guarda texto cifrado que não consegue ler. Você continua lendo e respondendo na mesma aba.',

    nav_how: 'Como funciona',
    nav_demo: 'Demo',
    nav_trust: 'Confiança',
    nav_investors: 'Investidores',
    nav_developers: 'Desenvolvedores',
    nav_cta: 'Entrar na lista',

    hero_chip: 'Fase de design. Os convites do alpha vão primeiro para a lista de espera.',
    hero_title: 'Mantenha sua caixa de entrada.<br /><em>Deixe-a cega.</em>',
    hero_sub: 'O ZeroMX sela os e-mails enviados ao seu domínio antes de chegarem ao Gmail. O Google guarda texto cifrado que não consegue ler, pesquisar nem escanear. Você continua lendo e respondendo na mesma aba.',
    hero_btn_waitlist: 'Entrar na lista de espera',
    hero_btn_primary: 'Testar a demo',
    hero_fact1: '<strong>Primeiro:</strong> Gmail no Chrome para desktop',
    hero_fact2: '<strong>Depois:</strong> Outlook, iCloud, Fastmail',
    hero_fact3: '<strong>No celular:</strong> o app ZeroMX',

    lens: {
      plainLabel: 'Na sua tela',
      cipherLabel: 'Guardado no Google',
      hint: 'Arraste para comparar',
      sliderLabel: 'Compare o que você vê com o que o provedor guarda',
      fromLabel: 'De',
      subjectLabel: 'Assunto',
      from: 'Hospital Sírio-Libanês <resultados@hsl.org.br>',
      subject: 'Resultado dos seus exames laboratoriais',
      body: [
        'Olá,',
        'Seus exames coletados em 16/11 já estão disponíveis. Colesterol, glicemia de jejum e hemograma estão dentro dos valores de referência.',
        'O laudo completo está em anexo.'
      ],
      attach: 'laudo_exames_2026.pdf',
      attachMeta: '412 KB',
      cFrom: 'relay-3d7b12@in.zeromx.network',
      cSubject: '🔒 Thread #a72f91c04e1b',
      cAttachMeta: 'selado, com padding até 416 KB'
    },

    how_tag: 'A ideia',
    how_title: 'Três passos, e sua caixa deixa de ser legível.',
    how_steps: [
      {
        title: 'Aponte seu domínio para o ZeroMX',
        body: 'Dois registros de DNS para <code>voce@seudominio.com</code>. Ainda não tem domínio? O onboarding registra um no seu nome.'
      },
      {
        title: 'O e-mail é selado na chegada',
        body: 'Um relay dentro de uma VM confidencial atestada cifra remetente, assunto, corpo e anexos com uma chave que só seus dispositivos têm, e encaminha o envelope selado para o seu Gmail.'
      },
      {
        title: 'Leia onde você sempre leu',
        body: 'Uma extensão do navegador decifra dentro do Gmail, em um quadro que a página não consegue ler. As respostas saem seladas e os rascunhos nunca chegam ao Google.'
      }
    ],

    pillar1_title: 'Nenhuma caixa nova no desktop',
    pillar1_desc: 'Seus filtros, marcadores, atalhos e a aba que você já deixa aberta. Nada muda de lugar.',
    pillar2_title: 'Seu provedor guarda texto cifrado',
    pillar2_desc: 'Para os e-mails do seu domínio, não existe arquivo legível para minerar, treinar IA, vazar ou entregar.',
    pillar3_title: 'Busca e IA continuam suas',
    pillar3_desc: 'Um índice local cifrado dá busca instantânea. Um servidor MCP local permite que seus próprios agentes trabalhem com seus e-mails, na sua máquina, com a sua permissão.',
    pillar4_title: 'Feito para ser verificado',
    pillar4_desc: 'Imagens de relay de código aberto com builds reproduzíveis. Chaves e medições dos relays em um log público e imutável, projetado para rodar no Polkadot JAM.',

    sim_tag: 'Demo',
    sim_title: 'Os dois lados da mesma caixa de entrada.',
    sim_desc: 'Alterne entre o que você vê e o que o provedor guarda. Pesquise <strong>Sírio</strong> em cada visão. Envie uma resposta e veja o que chega à caixa.',
    sim_provider_label: 'Provedor',
    sim_view_label: 'Visão',
    sim_view_user: 'O que você vê',
    sim_view_bigtech: 'O que o provedor guarda',
    sim_mobile_btn: 'E no meu celular?',
    sim_search_placeholder: 'Pesquisar (tente: Sírio, câmbio, Alice)',
    sim_compose_btn: 'Escrever',
    folder_inbox: 'Entrada',
    folder_starred: 'Com estrela',
    folder_sent: 'Enviados',
    origins_title: 'Endereços nesta caixa',
    originPersonal: '<code>@seudominio.com</code> selado',
    originWork: '<code>@gmail.com antigo</code> não selado',

    providerTitleGmail: 'Gmail — voce@seudominio.com',
    providerTitleOutlook: 'Outlook — voce@seudominio.com',
    extActive: 'ZeroMX ativo',
    extRaw: (p) => `Armazenamento bruto do ${p}`,
    bannerUser: '<strong>Sua visão.</strong> A extensão decifra nesta aba. A busca roda em um índice local.',
    bannerBigTech: (p) => `<strong>Visão do provedor.</strong> Isto é tudo o que o ${p} tem guardado. Tente pesquisar “Sírio”.`,
    searchStatusUser: 'Busca: índice local cifrado',
    searchStatusBigTech: (p) => `Busca: índice do servidor do ${p}`,
    noResultsTitle: (q) => `Nenhum resultado para “${q}”`,
    noResultsBigTech: (p) => `O ${p} só consegue indexar o que consegue ler. E-mail selado não dá nada para ele encontrar. Volte para “O que você vê” e pesquise de novo.`,
    noResultsUser: 'Tente Sírio, câmbio ou Alice.',
    noMailSelected: 'Nada para mostrar nesta busca.',
    serverCipherBadge: 'Texto cifrado',
    badgeShort: { e2ee: 'Ponta a ponta', tee: 'Selado na chegada', plain: 'Não selado' },
    visLegend: { no: 'não consegue ler', part: 'tem por um instante', yes: 'lê' },
    envelopeFromLabel: 'De (como está guardado)',
    toLabel: 'Para',
    fromLabel: 'De',
    protectionLabel: 'Proteção',
    probeTitle: (p) => `O que o ${p} consegue saber sobre esta mensagem`,
    probeDesc: 'O horário de chegada e um tamanho com padding. Remetente, assunto, corpo e anexos são ilegíveis sem a chave que está no seu dispositivo.',
    switchBackUserBtn: 'Mostrar visão decifrada',
    mcpTitle: 'Disponível para a sua IA local',
    mcpDesc: 'Indexado nesta máquina e exposto por um servidor MCP local, só para os agentes que você aprovar.',
    replySecureBtn: 'Responder selado',
    peekServerBtn: (p) => `Ver o que o ${p} guarda`,
    attachmentLabel: 'Anexo',

    composeModal: {
      tag: 'QUADRO ISOLADO · AUTO-SAVE DE RASCUNHO BLOQUEADO',
      title: 'Nova mensagem selada',
      fromLabel: 'De',
      fromAddr: 'voce@seudominio.com',
      toLabel: 'Para',
      defaultTo: 'parceiro@empresa.com.br',
      subjLabel: 'Assunto (oculto do seu provedor)',
      defaultSubj: 'Proposta confidencial',
      bodyLabel: 'Mensagem',
      defaultBody: 'Escrevendo da minha caixa de sempre. Este rascunho nunca foi enviado ao Google. A mensagem sai assinada pela chave do meu próprio domínio, e a cópia em Enviados fica selada.',
      footerNote: 'Assinado no seu dispositivo. Cópia de Enviados selada com a sua chave.',
      routeE2ee: 'O destinatário usa ZeroMX: cifrado de ponta a ponta no seu dispositivo.',
      routeRelay: 'O destinatário não usa ZeroMX: entregue por um relay atestado. Tente alice@soberano.dev.',
      sendBtn: 'Enviar selado',
      noSubject: '(sem assunto)',
      sentNow: 'Agora',
      youLabel: 'Você',
      sentSealedBy: 'seu dispositivo',
      sentTierE2ee: 'Ponta a ponta · ZeroMX para ZeroMX',
      sentTierTee: 'Enviado por relay atestado · cópia guardada selada'
    },

    mobileModal: {
      tag: 'NO CELULAR',
      title: 'O que acontece no seu celular?',
      badTitle: 'App do Gmail',
      badDesc: 'Apps de celular não aceitam extensões, então o app do Gmail mostra o envelope selado:',
      goodTitle: 'App ZeroMX',
      goodDesc: 'O relay envia uma prévia selada direto para o seu celular. O app decifra no próprio aparelho:',
      goodSample: 'Hospital Sírio-Libanês\nResultado dos seus exames laboratoriais\nDesbloqueado neste aparelho',
      summary: '<strong>O trade-off:</strong> no desktop você nunca sai do Gmail. No celular, o e-mail selado fica no app ZeroMX. Você também pode escolher remetentes, como newsletters, para ficarem sem selo e legíveis em qualquer lugar.',
      okBtn: 'Entendi'
    },

    emails: [
      {
        id: 'm1',
        protected: true,
        tier: 'e2ee',
        trustLabel: 'Ponta a ponta · ZeroMX para ZeroMX',
        realFrom: 'Alice <alice@soberano.dev>',
        realTo: 'voce@seudominio.com',
        realSubject: 'Migrei meu domínio. Você devia também',
        time: '11:42',
        opaqueFrom: 'relay-91f0a8@in.zeromx.network',
        opaqueSubject: '🔒 Thread #9f2c41d07b3e',
        realBody: 'Oi,\n\nFinalmente fiz. Mesma aba do Gmail, mesmos atalhos, mas os e-mails do meu domínio são selados antes de o Google guardar.\n\nComo nós dois usamos ZeroMX, esta mensagem foi cifrada no meu notebook com a sua chave. Nenhum relay conseguiu ler no caminho.\n\nO celular é a única coisa que muda: lá eu leio os e-mails selados no app ZeroMX.',
        sealedBy: 'dispositivo do remetente',
        padded: '4 KiB'
      },
      {
        id: 'm2',
        protected: true,
        tier: 'tee',
        trustLabel: 'Selado na chegada · relay atestado (AMD SEV-SNP)',
        realFrom: 'Hospital Sírio-Libanês <resultados@hsl.org.br>',
        realTo: 'voce@seudominio.com',
        realSubject: 'Resultado dos seus exames laboratoriais',
        time: '09:15',
        opaqueFrom: 'relay-3d7b12@in.zeromx.network',
        opaqueSubject: '🔒 Thread #a72f91c04e1b',
        realBody: 'Olá,\n\nSeus exames coletados em 16/11 já estão disponíveis. Colesterol, glicemia de jejum e hemograma estão dentro dos valores de referência.\n\nO laudo completo está em anexo.',
        attachment: { name: 'laudo_exames_2026.pdf', size: '412 KB' },
        note: 'O hospital enviou um e-mail comum. Um relay verificou a assinatura DKIM, selou remetente, assunto e PDF com a sua chave, assinou o envelope e apagou a memória.',
        sealedBy: 'relay sev-snp:88f1…2c',
        padded: '416 KiB'
      },
      {
        id: 'm3',
        protected: true,
        tier: 'tee',
        trustLabel: 'Selado na chegada · relay atestado (Intel TDX)',
        realFrom: 'Itaú Personnalité <alertas@itau.com.br>',
        realTo: 'voce@seudominio.com',
        realSubject: 'Contrato de câmbio liquidado e extrato de novembro',
        time: 'Ontem',
        opaqueFrom: 'relay-c40e55@in.zeromx.network',
        opaqueSubject: '🔒 Thread #44e01b8a2f60',
        realBody: 'Prezado cliente,\n\nSeu contrato de câmbio #884920 no valor de US$ 14.500,00 foi liquidado.\n\nSeu extrato consolidado e o informe de rendimentos estão em anexo.',
        attachment: { name: 'extrato_2026_11.pdf', size: '88 KB' },
        sealedBy: 'relay tdx:41a9…9b',
        padded: '88 KiB'
      },
      {
        id: 'm4',
        protected: false,
        tier: 'plain',
        trustLabel: 'Não selado · enviado para o seu @gmail.com antigo',
        realFrom: 'Produto da Semana <oi@produtodasemana.com.br>',
        realTo: 'voce.antigo@gmail.com',
        realSubject: 'Esta semana: 5 lançamentos que valem seu tempo',
        time: 'Ontem',
        opaqueFrom: 'Produto da Semana <oi@produtodasemana.com.br>',
        opaqueSubject: 'Esta semana: 5 lançamentos que valem seu tempo',
        realBody: 'Olá,\n\nAqui vão as escolhas da semana.\n\nPor que o provedor consegue ler este? Ele foi enviado para o seu endereço @gmail.com antigo, então foi direto para os servidores do Google e nunca passou por um relay ZeroMX. O e-mail só é selado quando é endereçado ao seu próprio domínio. Migrar uma assinatura é só trocar o endereço cadastrado.',
        sealedBy: null,
        padded: null
      }
    ],

    arch_tag: 'Por dentro',
    arch_title: 'Acompanhe um e-mail, etapa por etapa.',
    arch_desc: 'Escolha um cenário e clique em uma etapa para ver quem enxerga o quê naquele momento, incluindo as partes que não são perfeitas.',
    flow_tab_inbound: 'Um banco ou clínica escreve para você',
    flow_tab_outbound: 'Você responde',
    flow_tab_native: 'ZeroMX para ZeroMX',
    visMatrixTitle: 'Quem enxerga o quê nesta etapa',

    flows: {
      inbound: [
        {
          step: 'Etapa 1 · Rota',
          title: 'O remetente não muda nada',
          short: 'E-mail comum, roteado pelo DNS do seu domínio.',
          detailTitle: 'Um e-mail comum encontra um relay ZeroMX',
          detailBody: 'Quando um hospital ou banco escreve para voce@seudominio.com, o servidor deles consulta os registros MX do seu domínio e se conecta a um relay ZeroMX via TLS. Seu domínio publica registros MTA-STS e DANE, então os remetentes que os verificam só entregam a um relay legítimo. Se um relay estiver fora do ar, o próprio e-mail tenta o seguinte.',
          vis: [
            ['Operador do relay', 'no', 'Sem acesso por software à memória da VM'],
            ['VM do relay (atestada)', 'part', 'Recebe a mensagem em RAM cifrada'],
            ['Plano de controle', 'no', 'Nunca recebe e-mails'],
            ['Google', 'no', 'Ainda não tem nada'],
            ['Você', 'wait', 'Aguardando']
          ]
        },
        {
          step: 'Etapa 2 · Selo',
          title: 'Verificado, selado e assinado',
          short: 'Cifrado com a sua chave dentro da memória do relay.',
          detailTitle: 'Selado em memória e depois apagado',
          detailBody: 'Dentro da VM confidencial, o relay verifica SPF, DKIM e DMARC, pontua spam e então cifra remetente, assunto, corpo e anexos com a sua chave pública. Ele troca o Message-ID por um pseudônimo, aplica padding no tamanho, assina o envelope e apaga o texto claro. Limite honesto: durante esses milissegundos o texto claro existe dentro da VM. A atestação mostra qual código está rodando. Ela não descarta um ataque de hardware feito por alguém com acesso físico, e é por isso que os operadores são selecionados.',
          vis: [
            ['Operador do relay', 'no', 'Bloqueado pela cifragem de memória da CPU'],
            ['VM do relay (atestada)', 'part', 'Tem o texto claro por milissegundos'],
            ['Plano de controle', 'no', 'Fornece a sua chave pública'],
            ['Google', 'no', 'Ainda não tem nada'],
            ['Você', 'yes', 'Único dono da chave privada']
          ]
        },
        {
          step: 'Etapa 3 · Guarda',
          title: 'O Gmail guarda um envelope selado',
          short: 'Armazenamento gratuito que não lê o que guarda.',
          detailTitle: 'Sua caixa recebe texto cifrado',
          detailBody: 'O relay entrega o envelope a partir de um endereço opaco, com um token de conversa como assunto. O Gmail continua agrupando a conversa, porque as respostas compartilham a mesma cadeia pseudônima. Ele fica sabendo o horário de chegada e um tamanho com padding, e nada mais.',
          vis: [
            ['Operador do relay', 'no', 'Nada gravado em disco'],
            ['VM do relay (atestada)', 'no', 'Texto claro já apagado'],
            ['Plano de controle', 'no', 'Sem acesso'],
            ['Google', 'part', 'Texto cifrado, horário, tamanho com padding'],
            ['Você', 'yes', 'Chega na sua caixa de sempre']
          ]
        },
        {
          step: 'Etapa 4 · Leitura',
          title: 'Decifrado na sua aba',
          short: 'Verificado, destravado com passkey, exibido no lugar.',
          detailTitle: 'Você lê como qualquer outro e-mail',
          detailBody: 'A extensão confere se um relay registrado assinou o envelope e se o registro da sua chave está no log público. Sua passkey destrava a chave privada, e a mensagem aparece em um quadro que os scripts do Gmail não conseguem ler. Seu índice de busca local e seu servidor MCP local são atualizados.',
          vis: [
            ['Operador do relay', 'no', 'Sem acesso'],
            ['VM do relay (atestada)', 'no', 'Fora do fluxo'],
            ['Plano de controle', 'no', 'Fornece registros de chaves e relays com provas'],
            ['Google', 'no', 'Continua cifrado enquanto você lê'],
            ['Você', 'yes', 'Lê, pesquisa e usa sua própria IA']
          ]
        }
      ],
      outbound: [
        {
          step: 'Etapa 1 · Escrita',
          title: 'Rascunhos nunca chegam ao Google',
          short: 'Um editor isolado substitui o nativo.',
          detailTitle: 'Fechando o vazamento de rascunhos',
          detailBody: 'A caixa de escrita do próprio Gmail envia seu rascunho a cada poucos segundos. O ZeroMX abre o editor em um quadro isolado da extensão. Os rascunhos são selados com a sua própria chave antes de serem salvos em qualquer lugar.',
          vis: [
            ['Operador do relay', 'no', 'Sem acesso'],
            ['VM de saída (atestada)', 'wait', 'Aguardando o envio'],
            ['Plano de controle', 'no', 'Sem acesso'],
            ['Google', 'no', 'O auto-save nunca vê texto claro'],
            ['Você', 'yes', 'Escrevendo em privado']
          ]
        },
        {
          step: 'Etapa 2 · Assinatura',
          title: 'Quem assina é o seu dispositivo',
          short: 'A chave DKIM do seu domínio fica com você.',
          detailTitle: 'Nenhum relay consegue forjar e-mails do seu domínio',
          detailBody: 'Seu cliente assina a mensagem com a chave DKIM do seu domínio, que nunca sai dos seus dispositivos, e anexa um token de cota que mantém spammers longe dos endereços de envio compartilhados. O relay nunca tem uma chave capaz de assinar em seu nome.',
          vis: [
            ['Operador do relay', 'no', 'Sem acesso'],
            ['VM de saída (atestada)', 'no', 'Confere o token de cota'],
            ['Plano de controle', 'no', 'Sem acesso'],
            ['Google', 'no', 'Não participa'],
            ['Você', 'yes', 'Tem a única chave de assinatura']
          ]
        },
        {
          step: 'Etapa 3 · Entrega',
          title: 'Para o mundo, e uma cópia selada para você',
          short: 'O destinatário recebe e-mail normal. Sua cópia é cifrada.',
          detailTitle: 'Entregue, com a conversa completa',
          detailBody: 'Um relay de saída atestado abre a mensagem em memória e a entrega via TLS, sem alterá-la. Seu cliente envia uma segunda cópia, selada com a sua própria chave, para a sua caixa, e assim a conversa fica completa. Limite honesto: o provedor do destinatário guarda a cópia dele como sempre guardou.',
          vis: [
            ['Operador do relay', 'no', 'Bloqueado pela cifragem de memória da CPU'],
            ['VM de saída (atestada)', 'part', 'Tem o texto claro por milissegundos'],
            ['Google (sua caixa)', 'no', 'A cópia de Enviados é texto cifrado'],
            ['Provedor do destinatário', 'leak', 'Guarda a cópia do destinatário normalmente'],
            ['Você', 'yes', 'Conversa inteira em um só lugar']
          ]
        }
      ],
      native: [
        {
          step: 'Etapa 1 · Descoberta',
          title: 'Os dois lados usam ZeroMX',
          short: 'Seu cliente encontra a chave verificada do destinatário.',
          detailTitle: 'O upgrade é automático',
          detailBody: 'Quando você escreve para alice@soberano.dev, seu cliente encontra a chave dela no diretório público e verifica a prova de que ela é mesmo dela. Nada para trocar, nada para configurar.',
          vis: [
            ['Operador do relay', 'no', 'Sem acesso'],
            ['VM do relay (atestada)', 'no', 'Só vai transportar bytes selados'],
            ['Plano de controle', 'no', 'Fornece o registro da chave da Alice com prova'],
            ['Google / Microsoft', 'no', 'Sem acesso'],
            ['Você', 'yes', 'Verificou a chave dela']
          ]
        },
        {
          step: 'Etapa 2 · Cifragem',
          title: 'Cifrado antes de sair do seu dispositivo',
          short: 'Nenhum relay chega a ter o texto claro.',
          detailTitle: 'Ponta a ponta, com híbrido pós-quântico',
          detailBody: 'Seu cliente cifra direto para a chave da Alice com um esquema híbrido (X25519 com ML-KEM-768), para que o texto cifrado guardado continue seguro contra ataques quânticos futuros. Nenhum relay, fabricante de CPU ou provedor de e-mail tem o texto claro em momento algum. Limite honesto: e-mail guardado não tem sigilo futuro. Uma chave de longo prazo roubada abre as mensagens do período daquela chave.',
          vis: [
            ['Operador do relay', 'no', 'Transporta bytes selados'],
            ['VM do relay (atestada)', 'no', 'Nunca decifra'],
            ['Plano de controle', 'no', 'Sem acesso'],
            ['Google / Microsoft', 'no', 'Texto cifrado nas duas pontas'],
            ['Você e Alice', 'yes', 'Os únicos com as chaves']
          ]
        }
      ]
    },

    trust_tag: 'Confiança',
    trust_title: 'Em quem você confia, dito com todas as letras.',
    trust_desc: 'É justamente aqui que a maioria dos produtos de privacidade fica vaga. Estes são os três níveis de proteção, em que cada um se apoia e o que o ZeroMX não protege.',
    tiers: [
      {
        badge: 'Nível 1',
        title: 'ZeroMX para ZeroMX',
        body: 'Cifrado no dispositivo de quem envia, decifrado no seu. Nenhum relay tem o texto claro em momento algum.',
        restsOn: 'Apoia-se nos dois dispositivos, no conjunto de cifras e no software cliente.'
      },
      {
        badge: 'Nível 2 · padrão',
        title: 'De todos os outros',
        body: 'Selado na chegada por um relay em uma VM confidencial atestada (AMD SEV-SNP ou Intel TDX), rodando uma imagem de código aberto e reproduzível.',
        restsOn: 'Apoia-se no fabricante da CPU e em ninguém atacar fisicamente a máquina. É por isso que os operadores de relay são selecionados e listados publicamente.'
      },
      {
        badge: 'Nível 3 · planejado',
        title: 'Confiança dividida',
        body: 'A conexão de entrada é dividida entre dois operadores com CPUs de fabricantes diferentes. Nenhum dos dois consegue ler a mensagem sozinho.',
        restsOn: 'Para quebrar, é preciso comprometer os dois operadores e os dois fabricantes ao mesmo tempo.'
      }
    ],
    protects_title: 'Protegido',
    protects: [
      'E-mails enviados ao seu domínio ficam cifrados na sua caixa: corpo, anexos, remetente real e assunto.',
      'Rascunhos e cópias de enviados.',
      'Seu arquivo não pode ser pesquisado, escaneado, usado para anúncios ou treino de IA, nem entregue em formato legível pelo seu provedor.',
      'E-mails entre usuários ZeroMX, de ponta a ponta.'
    ],
    limits_title: 'Não protegido',
    limits: [
      '<strong>A cópia do outro lado.</strong> Se a pessoa usa Gmail, o Google tem a cópia dela.',
      '<strong>E-mails enviados ao seu @gmail.com antigo.</strong> Eles nunca passam por um relay.',
      '<strong>Horário e tamanho.</strong> Seu provedor vê quando o e-mail chega e mais ou menos o tamanho.',
      '<strong>O instante do relay com e-mails de fora.</strong> A atestação reduz quem poderia ler. Ela não prova que ninguém leu.',
      '<strong>Um dispositivo comprometido ou uma chave roubada.</strong>'
    ],
    trust_note: '<strong>Em quem ainda se confia no alpha:</strong> a equipe do ZeroMX opera os relays e publica a extensão. Builds reproduzíveis, verificação do relay por mensagem, operadores independentes e confiança dividida removem cada um uma parte disso, nessa ordem.',

    onboard_tag: 'Como começar',
    onboard_title: 'Um requisito: um endereço no seu próprio domínio.',
    onboard_desc: 'A configuração foi pensada para levar poucos minutos e para ser algo que você consegue desfazer.',
    onboardingSteps: [
      {
        title: 'Crie sua chave com uma passkey',
        desc: 'Face ID, Touch ID ou uma chave de segurança. Sem arquivos de chave e sem senha longa. Um kit de recuperação imprimível cobre a perda do aparelho.',
        code: null
      },
      {
        title: 'Aponte seu domínio',
        desc: 'O onboarding cria estes registros para você, junto com os que prendem a entrega a relays legítimos.',
        code: 'MX 10 mx1.zeromx.network<br />MX 20 mx2.zeromx.network<br />TXT "v=spf1 include:out.zeromx.network -all"'
      },
      {
        title: 'Escolha seu cofre',
        desc: 'Escolha a caixa que recebe os envelopes selados. Gmail primeiro. Você pode mudar de provedor depois e manter endereço e chaves.',
        code: null
      },
      {
        title: 'Instale a extensão',
        desc: 'Os e-mails do seu domínio passam a abrir decifrados no Gmail do desktop. No celular, instale o app ZeroMX. Apps de e-mail no computador, como Apple Mail e Spark, se conectam pelo ZeroMX Bridge a partir do beta.',
        code: null
      }
    ],
    pricing_note: '<strong>Preço planejado:</strong> US$ 3 por mês. O armazenamento continua na caixa que você já tem. Mais adiante, quem tem DOT poderá fazer stake em vez de pagar mensalidade. Um stake carrega o risco de preço do token.',

    road_tag: 'Roadmap',
    road_title: 'Onde isto está hoje.',
    road_desc: 'O ZeroMX está em fase de design. Nada aqui é um produto lançado ainda. Esta é a ordem em que as coisas serão construídas.',
    roadmap: [
      {
        when: 'Agora',
        title: 'Design e protótipo',
        body: 'Especificação do protocolo, modelo de ameaças e este protótipo interativo.',
        state: 'now'
      },
      {
        when: 'Em seguida',
        title: 'Alpha privado',
        body: 'Gmail no Chrome para desktop, com relays operados pela equipe do ZeroMX e identificados assim. Os convites vão para a lista de espera.',
        state: 'next'
      },
      {
        when: 'Depois',
        title: 'Beta público',
        body: 'Auditoria de segurança independente, relays verificáveis por mensagem, o app de celular, o ZeroMX Bridge para apps de e-mail no computador, busca local e MCP.',
        state: 'later'
      },
      {
        when: 'Mais adiante',
        title: 'Rede aberta',
        body: 'Operadores de relay independentes, o plano de controle como serviço no Polkadot JAM, entrada com confiança dividida.',
        state: 'later'
      }
    ],

    manifesto_html: 'Sua caixa de entrada conhece seu banco, seu médico, seu advogado e seu senhorio. Hoje seu provedor de e-mail consegue ler cada palavra. Com o ZeroMX, ele lê <span class="redact">absolutamente nada</span>.',

    compare_tag: 'As alternativas',
    compare_title: 'Todas as outras opções fazem você abrir mão de algo.',
    compare_desc: 'Ficar e ser lido, mudar e recomeçar, ou instalar um plugin que a maioria dos remetentes não consegue usar. O ZeroMX é a quarta coluna.',
    compare: {
      cols: ['Gmail comum', 'Migrar para um provedor cifrado', 'Plugin de PGP', 'ZeroMX'],
      rows: [
        ['Manter sua aba do Gmail e seus hábitos', 'yes', 'no', 'yes', 'yes'],
        ['E-mail guardado é ilegível para o provedor', 'no', 'yes', 'part:Só se o remetente usar PGP', 'yes'],
        ['Remetente e assunto também ocultos', 'no', 'part:Varia', 'no', 'yes'],
        ['Funciona com e-mail de qualquer pessoa', 'yes', 'yes', 'no', 'yes'],
        ['Busca rápida nos seus próprios e-mails', 'yes', 'part:Varia', 'no', 'yes'],
        ['No celular', 'yes', 'yes', 'no', 'part:No app ZeroMX']
      ]
    },

    inv_tag: 'Para investidores',
    inv_title: 'O e-mail privado perdeu porque pediu para as pessoas se mudarem. Este não pede.',
    inv_lede: 'E-mail cifrado tem mercado comprovado e um teto duro: a maioria das pessoas não abandona a caixa que usa há quinze anos. O ZeroMX vende a privacidade sem a mudança.',
    inv_stats: [
      { n: '1,8 bi', l: 'pessoas usam Gmail', s: 'Número amplamente divulgado' },
      { n: '100 mi+', l: 'contas no maior provedor cifrado', s: 'Proton, anúncio da própria empresa' },
      { n: 'US$ 0', l: 'custo de armazenamento por usuário', s: 'O e-mail fica na caixa que o usuário já tem' }
    ],
    inv_points: [
      { t: 'A porta de entrada', b: 'Pessoas que já têm domínio e vivem no Gmail: fundadores, freelancers, consultores, usuários cripto. Elas guardam e-mails de clientes, de saúde e financeiros, e nunca aceitaram uma segunda caixa.' },
      { t: 'A estrutura de custos', b: 'Provedores cifrados pagam para guardar e servir décadas de e-mail. O ZeroMX não guarda nada. Os relays selam e encaminham, e é isso que viabiliza um preço de US$ 3 por mês.' },
      { t: 'Por que agora', b: 'Passkeys tornam a gestão de chaves invisível. VMs confidenciais viraram commodity em todas as grandes nuvens. Assistentes de IA lendo caixas de entrada deixaram o problema visível, e a IA local transforma um índice privado em recurso.' },
      { t: 'O que se acumula', b: 'Quaisquer dois usuários ZeroMX passam a ponta a ponta automaticamente, então o diretório de chaves vale mais a cada domínio. Uma rede de operadores e um histórico público de auditorias são difíceis de copiar depressa.' },
      { t: 'Receita', b: 'Assinaturas primeiro, com um plano Pro para vários domínios. Depois, um gateway para pequenas empresas reguladas no Workspace ou Microsoft 365, com chaves da organização e relays dedicados.' },
      { t: 'Riscos que já consideramos', b: 'Dependência da interface web e das regras de entrega do Gmail. A atestação de hardware reduz a confiança necessária, mas não é uma prova. O Polkadot JAM ainda não está na mainnet, então os primeiros lançamentos não dependem dele.' }
    ],
    inv_stage: '<strong>Estágio:</strong> o design do protocolo e o modelo de ameaças estão escritos. O alpha privado é o próximo passo.',
    inv_cta: 'Iniciar uma conversa',

    dev_tag: 'Para desenvolvedores',
    dev_title: 'Problemas difíceis, para resolver às claras.',
    dev_lede: 'Cliente, relay e protocolo foram pensados para ser código aberto, com builds reproduzíveis. O repositório está privado enquanto o design se assenta. Peça acesso e escolha um destes.',
    dev_stack: ['Rust', 'WebAssembly', 'TypeScript', 'HPKE + ML-KEM', 'SEV-SNP / TDX', 'Polkadot JAM (PVM)', 'WebAuthn PRF', 'SQLite FTS5', 'MCP'],
    dev_problems: [
      { t: 'Consultas privadas de chaves', b: 'Encontrar a chave de um destinatário sem contar ao servidor para quem você vai escrever.', tag: 'Rust · Wasm · PIR' },
      { t: 'Entrada SMTP com confiança dividida', b: 'Terminar uma sessão TLS entre dois operadores com CPUs de fabricantes diferentes, para que nenhum tenha o texto claro sozinho.', tag: '2PC-TLS · MPC' },
      { t: 'A biblioteca do envelope selado', b: 'HPKE híbrido, cabeçalhos protegidos, encadeamento pseudônimo e padding Padmé, idênticos byte a byte no relay e no navegador.', tag: 'Rust · Wasm · cripto' },
      { t: 'Um adaptador de Gmail que sobrevive a redesigns', b: 'Decifrar no lugar em um quadro de outra origem, substituir o editor e continuar funcionando quando a marcação da página muda.', tag: 'TypeScript · MV3' },
      { t: 'Imagens reproduzíveis de VM confidencial', b: 'Uma imagem de relay que qualquer pessoa reconstrói bit a bit e compara com a medição atestada.', tag: 'Nix · SEV-SNP · TDX' },
      { t: 'Verificação de atestação como serviço JAM', b: 'Verificar cadeias de certificados dos fabricantes e medições no Refine. Registrar operadores e chaves no Accumulate.', tag: 'Rust no_std · PVM' }
    ],
    dev_cta: 'Pedir acesso ao repositório',

    jam_title: 'Por que o plano de controle mira o Polkadot JAM',
    jam_points: [
      { t: 'Tem o formato da carga', b: 'A verificação pesada e sem estado roda no Refine. Só o resultado chega ao estado da cadeia no Accumulate. Evidências de atestação e lotes de provas são exatamente esse tipo de entrada.' },
      { t: 'Sem lacunas de precompile', b: 'O verificador é Rust comum compilado para PVM. P-384, RSA-PSS, SHA-384 ou uma assinatura pós-quântica não exigem upgrade de protocolo nem serviço de provas.' },
      { t: 'Um serviço, não uma cadeia', b: 'Sem conjunto de validadores ou collators para montar. O coretime é comprado conforme a necessidade, e as garantias são liquidadas em DOT sob a segurança do próprio Polkadot.' }
    ],
    jam_note: '<strong>O que o JAM ainda não nos dá:</strong> uma mainnet e um light client pronto para o navegador. Outras equipes estão construindo esses light clients. Até ficarem prontos, os primeiros lançamentos usam um log público imutável.',

    wl_tag: 'Acesso antecipado',
    wl_title: 'Receba um convite para o alpha.',
    wl_desc: 'O alpha privado começa com Gmail no Chrome para desktop. Conte como é o seu uso e convidamos primeiro quem se encaixa.',
    wl_perk1: 'Primeiros convites para o alpha privado',
    wl_perk2: 'Seu uso define o que é construído primeiro',
    wl_perk3: 'Um e-mail quando seu convite estiver pronto. Sem newsletter.',

    waitlistForm: {
      modalTag: 'ACESSO ANTECIPADO',
      modalTitle: 'Entre na lista de espera do ZeroMX',
      modalSub: 'Usuários, investidores e contribuidores começam aqui. Conte qual é o seu caso.',
      emailPlaceholder: 'voce@seudominio.com',
      submitBtn: 'Entrar na lista',
      submittingBtn: 'Enviando…',
      providerLabel: 'Onde seu e-mail está hoje',
      providers: [
        { id: 'gmail', label: 'Gmail / Workspace' },
        { id: 'outlook', label: 'Outlook / M365' },
        { id: 'icloud', label: 'iCloud' },
        { id: 'other', label: 'Proton / outro' }
      ],
      clientLabel: 'Onde você lê',
      clients: [
        { id: 'webmail', label: 'No navegador' },
        { id: 'apple-mail', label: 'Apple Mail' },
        { id: 'spark', label: 'Spark' },
        { id: 'outlook-app', label: 'App do Outlook' },
        { id: 'other-app', label: 'Outro app' },
        { id: 'phone', label: 'Quase só no celular' }
      ],
      domainLabel: 'Domínio próprio',
      domains: [
        { id: 'yes', label: 'Já tenho' },
        { id: 'not-yet', label: 'Ainda não' }
      ],
      planLabel: 'O que traz você aqui',
      plans: [
        { id: 'fiat-sub', label: 'Usar (US$ 3 por mês)' },
        { id: 'stake-dot', label: 'Usar (stake de DOT)' },
        { id: 'b2b-team', label: 'Para minha equipe' },
        { id: 'run-node', label: 'Operar um relay' },
        { id: 'invest', label: 'Investir' },
        { id: 'contribute', label: 'Contribuir com código' }
      ],
      privacyNote: 'Usado apenas para enviar seu convite. Esta página não tem rastreadores.',
      invalidEmail: 'Digite um endereço de e-mail válido.',
      genericError: 'Não foi possível enviar. Tente de novo em instantes.',
      successTitle: 'Você está na lista.',
      successBody: (email) => `Guardamos uma vaga para <strong>${email}</strong>. Conhece alguém que ia querer isto? Mande o link.`,
      shareBtn: 'Copiar link',
      copiedBtn: 'Link copiado'
    },

    faq_tag: 'Perguntas',
    faq_title: 'Perguntas justas.',
    faq: [
      {
        q: 'Isto já está funcionando?',
        a: 'Ainda não. O ZeroMX está em fase de design, e esta página é um protótipo interativo da experiência. A lista de espera recebe os primeiros convites do alpha.'
      },
      {
        q: 'Então o Google não consegue ler nenhum e-mail meu?',
        a: 'O Google não consegue ler os e-mails do seu domínio guardados na sua caixa. Ele continua podendo ler o que os próprios usuários dele enviam para você, pelo lado deles, e tudo o que for enviado ao seu @gmail.com antigo.'
      },
      {
        q: 'Por que não usar o Proton?',
        a: 'O Proton é uma boa escolha se você topa mudar para uma caixa nova. O ZeroMX mantém a caixa e a conta que você já tem, não guarda nenhum e-mail seu e custa menos. Seu provedor só deixa de conseguir ler.'
      },
      {
        q: 'Para onde vão meus e-mails? O relay manda direto para o meu computador?',
        a: 'Não. O relay sela cada mensagem e entrega na sua caixa, no Gmail por exemplo, como qualquer servidor de e-mail faria. Sua caixa é o armazenamento e o sync. Todos os seus aparelhos leem dela, então nada precisa estar ligado para receber e-mail, e não existe outra nuvem nem sincronização entre aparelhos.'
      },
      {
        q: 'Eu uso Spark ou Apple Mail, não o Gmail no navegador.',
        a: 'Então a extensão do navegador não ajuda você. O ZeroMX Bridge ajuda: um app pequeno no seu computador que lê sua caixa, decifra com a sua chave e entrega e-mail normal para o seu app, na sua própria máquina. Funciona como o Bridge do Proton e está planejado para o beta público. Dois limites honestos: os extras de nuvem do seu app, como push pelos servidores dele ou "Enviar depois", deixam de funcionar nessa conta, e o Bridge precisa rodar em cada computador onde você lê. Conte qual é o seu app no formulário da lista.'
      },
      {
        q: 'Eu perco a busca do Gmail?',
        a: 'Nos e-mails selados, o Gmail só vê envelopes, então a busca roda no seu aparelho, com os operadores que você já conhece: from:, subject:, has:attachment, before:, label: e os outros. O que você recebeu antes do ZeroMX continua buscável no Gmail. Busca dentro de PDFs anexados vem depois. Um modelo de IA local opcional responde perguntas sobre seus e-mails sem eles saírem do seu computador.'
      },
      {
        q: 'O que acontece no meu celular?',
        a: 'O app do Gmail mostra envelopes selados, então você lê os e-mails do ZeroMX no app ZeroMX, que mostra remetentes e assuntos reais nas notificações. No celular, isso é um segundo app. Preferimos dizer do que esconder.'
      },
      {
        q: 'Eu preciso confiar no ZeroMX?',
        a: 'Menos do que em um provedor de e-mail comum, mas não zero. No alpha a equipe opera os relays e publica a extensão, e um relay tem os e-mails de remetentes externos em memória por um instante antes de selá-los. O plano para reduzir cada um desses pontos é público: builds reproduzíveis, relays atestados, operadores independentes, confiança dividida.'
      },
      {
        q: 'Por que Polkadot JAM?',
        a: 'A rede precisa de um registro público e neutro de chaves de usuários, medições dos relays e operadores, que nenhuma empresa consiga reescrever em silêncio. O JAM foi projetado para esse tipo de serviço, pesado em verificação. Ele ainda não está na mainnet, então o ZeroMX começa com um log público imutável e migra para o JAM quando ele estiver pronto. Nenhum e-mail vai para a blockchain.'
      },
      {
        q: 'E se eu perder meu aparelho?',
        a: 'Seu kit de recuperação restaura a chave. Sem o kit ou outro aparelho conectado, ninguém consegue recuperar seus e-mails, nem nós.'
      },
      {
        q: 'Quanto vai custar?',
        a: 'O plano é US$ 3 por mês. O armazenamento continua na caixa que você já tem. Mais adiante, quem tem DOT poderá fazer stake em vez de pagar mensalidade, o que carrega o risco de preço do token.'
      }
    ],

    footer_text: 'O ZeroMX é um projeto em fase de design. Esta página é um protótipo interativo, não um produto lançado.',
    footer_built: 'Plano de controle projetado para o Polkadot JAM.'
  }
};
