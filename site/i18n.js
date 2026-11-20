/* All site copy, in English and Brazilian Portuguese.
 * Keys ending in _html (and list item bodies) may contain inline markup and are
 * rendered as HTML. Everything else is rendered as text.
 * Strings that depend on the storage chosen in the demo are objects keyed by
 * 'managed' (ZeroMX Storage) and 'own' (the user's own bucket). */
const THREAT_MODEL_URL = 'https://github.com/danicuki/zeromx/blob/main/docs/07-threat-model-and-limits.md';
const POLKADOT_DOC_URL = 'https://github.com/danicuki/zeromx/blob/main/docs/08-why-polkadot-jam.md';

const TRANSLATIONS = {
  en: {
    pageTitle: 'ZeroMX — A mailbox only you can open. And you own it.',
    metaDescription: 'ZeroMX seals every message sent to your domain before it is stored. The sealed mailbox lives in storage you choose, and only your devices hold the key. Keep your address and your desktop mail app.',

    nav_how: 'How it works',
    nav_demo: 'Demo',
    nav_trust: 'Trust',
    nav_investors: 'Investors',
    nav_developers: 'Developers',
    nav_cta: 'Join waitlist',

    hero_chip: 'Private alpha opening soon · desktop first, phone app in the beta',
    hero_title: 'A mailbox only<br />you can open.<br /><em>And you own it.</em>',
    hero_sub: 'ZeroMX seals every message sent to your address before it is stored. The sealed mailbox lives in storage you choose, and only your devices hold the key. You keep your address and the mail app you already use.',
    hero_btn_waitlist: 'Join the waitlist',
    hero_btn_primary: 'Try the demo',
    hero_fact1: '<strong>On your computer:</strong> Apple Mail, Outlook, Thunderbird',
    hero_fact2: '<strong>On your phone:</strong> the ZeroMX app',
    hero_fact3: '<strong>Storage:</strong> ours, or your own',

    lens: {
      plainLabel: 'On your screen',
      cipherLabel: 'In storage',
      hint: 'Drag to compare',
      sliderLabel: 'Compare what you see with what the storage holds',
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
      cFileLabel: 'File',
      cFile: 'in/01JD8K3M2V7QXA4.zmx',
      cSealerLabel: 'Sealed by',
      cSealer: 'relay sev-snp:88f1…2c',
      cAttach: 'One sealed file',
      cAttachMeta: '576 KB with padding'
    },

    how_tag: 'The idea',
    how_title: 'Three steps, and nobody who stores your mail can read it.',
    how_steps: [
      {
        title: 'Point your domain at ZeroMX',
        body: 'Two DNS records for <code>you@yourdomain.com</code>. No domain yet? Onboarding registers one in your name.'
      },
      {
        title: 'Mail is sealed on arrival',
        body: 'A relay inside an attested confidential VM encrypts sender, subject, body and attachments to a key only your devices hold. It writes one sealed file to your storage and keeps nothing.'
      },
      {
        title: 'Read it in the app you already use',
        body: 'ZeroMX Bridge runs on your computer and hands decrypted mail to Apple Mail, Outlook or Thunderbird. Every device keeps a full copy, so reading and search work offline.'
      }
    ],

    pillar1_title: 'Keep your address and your mail app',
    pillar1_desc: 'Your domain, your contacts and the desktop mail app you already know. Old mail is imported and sealed on your own computer.',
    pillar2_title: 'Storage holds sealed files only',
    pillar2_desc: 'Ours or your own bucket: whoever hosts it has nothing to mine, train on, leak or hand over.',
    pillar3_title: 'Search and AI stay on your device',
    pillar3_desc: 'Search is instant because the mail is on your device. A local MCP server lets your own agents work with it, on your machine, with your permission.',
    pillar4_title: 'Nothing locks you in',
    pillar4_desc: 'Change storage, relays or app and keep your address. Export everything at any time. Keys and the relay list go in a public directory, on Polkadot from the beta, that no company can rewrite. Not even us.',

    sim_tag: 'Demo',
    sim_title: 'Both sides of the same mailbox.',
    sim_desc: 'Switch between what you see and what the storage holds. Search for <strong>Sinai</strong> in each view. Send a reply and look at what gets stored.',
    sim_storage_label: 'Storage',
    sim_storage_managed: 'ZeroMX Storage',
    sim_storage_own: 'Your own bucket',
    sim_view_label: 'View',
    sim_view_user: 'What you see',
    sim_view_storage: 'What the storage holds',
    sim_mobile_btn: 'What about my phone?',
    sim_search_placeholder: 'Search mail (try: Sinai, wire, Alice)',
    sim_compose_btn: 'Compose',
    folder_inbox: 'Inbox',
    folder_starred: 'Starred',
    folder_sent: 'Sent',
    side_title: 'Where this mailbox lives',
    sideChipA: '<code>In your storage</code> sealed files only',
    sideChipB: '<code>On this computer</code> a full copy',

    windowTitleUser: 'Your mail app — you@yourdomain.com',
    windowTitleStorage: {
      managed: 'ZeroMX Storage — mailbox of you@yourdomain.com',
      own: 's3://your-bucket/mailbox/'
    },
    extActive: 'ZeroMX Bridge running',
    extRaw: { managed: 'Raw contents · ZeroMX Storage', own: 'Raw contents · your bucket' },
    bannerUser: '<strong>Your view.</strong> The Bridge decrypts on this computer. Search runs on your local copy.',
    bannerStorage: {
      managed: '<strong>Storage view.</strong> This is everything ZeroMX holds. Try searching “Sinai”.',
      own: '<strong>Storage view.</strong> This is everything your storage provider holds. Try searching “Sinai”.'
    },
    searchStatusUser: 'Search: local copy on this computer',
    searchStatusStorage: 'Search: file names only',
    noResultsTitle: (q) => `No results for “${q}”`,
    noResultsStorage: {
      managed: 'There is nothing here to match except file names. ZeroMX cannot see inside a sealed file. Switch to “What you see” and search again.',
      own: 'There is nothing here to match except file names. Your storage provider cannot see inside a sealed file. Switch to “What you see” and search again.'
    },
    noResultsUser: 'Try Sinai, wire or Alice.',
    noMailSelected: 'Nothing to show for this search.',
    serverCipherBadge: 'Sealed file',
    badgeShort: { e2ee: 'End to end', tee: 'Sealed on arrival', own: 'Sealed on this device' },
    visLegend: { no: 'cannot read it', part: 'holds it briefly', yes: 'reads it' },
    sizeLabel: 'Size, padded',
    writtenByLabel: 'Written by',
    toLabel: 'To',
    fromLabel: 'From',
    protectionLabel: 'Protection',
    probeTitle: {
      managed: 'What ZeroMX can learn from this file',
      own: 'What your storage provider can learn from this file'
    },
    probeDesc: 'When it arrived, its padded size, and which relay or device wrote it. The sender, subject, body and attachments are inside, unreadable without the key on your devices.',
    switchBackUserBtn: 'Show decrypted view',
    mcpTitle: 'Available to your local AI',
    mcpDesc: 'Indexed on this computer and exposed through a local MCP server, only to the agents you approve.',
    replySecureBtn: 'Reply',
    peekStorageBtn: 'See what the storage holds',

    composeModal: {
      tag: 'DRAFT SEALED ON THIS DEVICE',
      title: 'New message',
      fromLabel: 'From',
      fromAddr: 'you@yourdomain.com',
      toLabel: 'To',
      defaultTo: 'partner@company.com',
      subjLabel: 'Subject (never stored readable)',
      defaultSubj: 'Term sheet, confidential',
      bodyLabel: 'Message',
      defaultBody: 'Writing from my usual mail app. This draft was sealed on my computer before it was saved anywhere. The message leaves signed by my own domain key, and the copy in Sent is sealed too.',
      footerNote: 'Signed on your device. Sent copy sealed to your key.',
      routeE2ee: 'Recipient uses ZeroMX: encrypted end to end on your device.',
      routeRelay: 'Recipient doesn’t use ZeroMX: delivered through an attested relay. Try alice@sovereign.dev.',
      sendBtn: 'Send',
      noSubject: '(no subject)',
      sentNow: 'Just now',
      youLabel: 'You',
      sentSealedBy: 'this device',
      sentTierE2ee: 'End to end · ZeroMX to ZeroMX',
      sentTierTee: 'Sent via attested relay · your copy sealed on this device'
    },

    mobileModal: {
      tag: 'ON YOUR PHONE',
      title: 'What happens on your phone?',
      badTitle: 'What the push service carries',
      badDesc: 'The relay seals a short preview to a key that exists only on your phone. Apple’s or Google’s push service passes along this:',
      goodTitle: 'What your lock screen shows',
      goodDesc: 'The ZeroMX app decrypts the preview on the phone itself:',
      goodSample: 'Mount Sinai Lab\nYour blood panel and diagnostic report\nUnlocked on this device',
      summary: '<strong>The trade-off:</strong> on a computer you keep your mail app. On a phone you read sealed mail in the ZeroMX app, because phones don’t let the Bridge keep running in the background for the built-in mail app. The phone app arrives with the public beta. The alpha is desktop only.',
      okBtn: 'Got it'
    },

    emails: [
      {
        id: 'm1',
        tier: 'e2ee',
        trustLabel: 'End to end · ZeroMX to ZeroMX',
        realFrom: 'Alice <alice@sovereign.dev>',
        realTo: 'you@yourdomain.com',
        realSubject: 'Moved my domain over. You should too',
        time: '11:42 AM',
        objKey: 'in/01JD9F2R6T0BWK3.zmx',
        realBody: 'Hey,\n\nI finally did it. Same address, same mail app, but my mailbox now sits in my own bucket as sealed files, and the key never leaves my devices.\n\nSince we both use ZeroMX, this message was encrypted on my laptop to your key. No relay could read it on the way.\n\nThe phone is the one thing that changes: there I read mail in the ZeroMX app.',
        sealedBy: 'sender’s device',
        padded: '4 KiB'
      },
      {
        id: 'm2',
        tier: 'tee',
        trustLabel: 'Sealed on arrival · attested relay (AMD SEV-SNP)',
        realFrom: 'Mount Sinai Lab <results@mountsinai.org>',
        realTo: 'you@yourdomain.com',
        realSubject: 'Your blood panel and diagnostic report',
        time: '09:15 AM',
        objKey: 'in/01JD8K3M2V7QXA4.zmx',
        realBody: 'Hello,\n\nYour laboratory panel collected on Nov 16 is ready. Lipid panel, fasting glucose and CBC are within normal reference ranges.\n\nThe full report is attached.',
        attachment: { name: 'bloodwork_panel_2026.pdf', size: '412 KB' },
        note: 'The hospital sent ordinary email. A relay verified its DKIM signature, sealed sender, subject and PDF to your key, wrote one file to your storage and wiped its memory.',
        sealedBy: 'relay sev-snp:88f1…2c',
        padded: '576 KiB'
      },
      {
        id: 'm3',
        tier: 'tee',
        trustLabel: 'Sealed on arrival · attested relay (Intel TDX)',
        realFrom: 'Chase Private Client <wires@chase.com>',
        realTo: 'you@yourdomain.com',
        realSubject: 'International wire settled, November statement',
        time: 'Yesterday',
        objKey: 'in/01JD6WQ0H5E9RZC.zmx',
        realBody: 'Dear client,\n\nYour international wire transfer #884920 for $14,500.00 has settled.\n\nYour consolidated statement and tax summary are attached.',
        attachment: { name: 'statement_2026_11.pdf', size: '88 KB' },
        sealedBy: 'relay tdx:41a9…9b',
        padded: '128 KiB'
      },
      {
        id: 'm4',
        tier: 'own',
        trustLabel: 'Sealed on this device · imported from your old mailbox',
        realFrom: 'Product Weekly <hello@productweekly.co>',
        realTo: 'you.old@gmail.com',
        realSubject: 'This week: 5 launches worth your time',
        time: 'Last month',
        objKey: 'own/01JB3Z7H9N4MPQ8.zmx',
        realBody: 'Hi there,\n\nHere are this week’s picks: a calendar that books itself, a note app with no cloud, and three more below.',
        note: 'Imported from your old mailbox. This computer sealed it before uploading it. Honest limit: your old provider already had a readable copy. Import protects it from here on.',
        sealedBy: 'this device',
        padded: '8 KiB'
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
            ['Public directory', 'no', 'Never receives mail'],
            ['Storage', 'no', 'Has nothing yet'],
            ['You', 'wait', 'Waiting']
          ]
        },
        {
          step: 'Stage 2 · Seal',
          title: 'Checked, sealed and signed',
          short: 'Encrypted to your key inside the relay’s memory.',
          detailTitle: 'Sealed in memory, then wiped',
          detailBody: 'Inside the confidential VM, the relay verifies SPF, DKIM and DMARC, scores spam, then encrypts the whole message to your public key: sender, subject, body and attachments. It pads the size, signs the sealed file and wipes the plaintext. Honest limit: for those milliseconds the plaintext exists inside the VM. Attestation shows which code is running. It can’t rule out a hardware attack by someone with physical access, which is why operators are vetted.',
          vis: [
            ['Relay operator', 'no', 'Blocked by CPU memory encryption'],
            ['Relay VM (attested)', 'part', 'Holds plaintext for milliseconds'],
            ['Public directory', 'no', 'Supplies your public key'],
            ['Storage', 'no', 'Has nothing yet'],
            ['You', 'yes', 'Only holder of the private key']
          ]
        },
        {
          step: 'Stage 3 · Store',
          title: 'Your storage receives one sealed file',
          short: 'The relay can add files. It can never read them back.',
          detailTitle: 'Stored where you chose',
          detailBody: 'The relay writes the sealed file to your storage with a credential that can only add files. It tells the sender “accepted” only after the storage confirms the write. If the storage is down, the sender’s server retries later, as email always has, so the relay never needs a disk. The storage learns the arrival time and a padded size, and nothing else.',
          vis: [
            ['Relay operator', 'no', 'Nothing kept on disk'],
            ['Relay VM (attested)', 'no', 'Plaintext already wiped'],
            ['Public directory', 'no', 'No access'],
            ['Storage', 'part', 'A sealed file, arrival time, padded size'],
            ['You', 'yes', 'Yours to fetch, move or delete']
          ]
        },
        {
          step: 'Stage 4 · Read',
          title: 'Decrypted on your device',
          short: 'Synced, verified, opened with your key, shown in your mail app.',
          detailTitle: 'You read it like any other email',
          detailBody: 'Your device fetches the file, checks that a registered relay signed it, and opens it with a key that never leaves your devices. On a computer the Bridge hands it to your mail app. On a phone the ZeroMX app shows it. Your local copy and search index update, and your other devices reach the same state through sealed sync.',
          vis: [
            ['Relay operator', 'no', 'No access'],
            ['Relay VM (attested)', 'no', 'Out of the loop'],
            ['Public directory', 'no', 'Serves key and relay records'],
            ['Storage', 'no', 'Still sealed while you read'],
            ['You', 'yes', 'Read, search, use your own AI']
          ]
        }
      ],
      outbound: [
        {
          step: 'Stage 1 · Compose',
          title: 'Drafts are sealed before they are saved',
          short: 'You write in your own mail app, on your own machine.',
          detailTitle: 'No readable draft leaves your computer',
          detailBody: 'Webmail uploads your draft every few seconds. Here you write in your mail app, which talks only to the Bridge on your own computer. The Bridge seals the draft to your key before saving it to storage, so your other devices can pick it up and nobody else can read it.',
          vis: [
            ['Relay operator', 'no', 'No access'],
            ['Egress VM (attested)', 'wait', 'Waiting for the send'],
            ['Public directory', 'no', 'No access'],
            ['Storage', 'no', 'Draft stored sealed'],
            ['You', 'yes', 'Writing in private']
          ]
        },
        {
          step: 'Stage 2 · Sign',
          title: 'Your device signs, not the relay',
          short: 'The DKIM key for your domain stays with you.',
          detailTitle: 'No relay can forge mail from your domain',
          detailBody: 'Your device signs the message with your domain’s DKIM key, which never leaves your devices, and attaches a quota token that keeps spammers off the shared sending addresses. The relay never holds a key that could sign as you.',
          vis: [
            ['Relay operator', 'no', 'No access'],
            ['Egress VM (attested)', 'no', 'Checks the quota token'],
            ['Public directory', 'no', 'No access'],
            ['Storage', 'no', 'Not involved'],
            ['You', 'yes', 'Hold the only signing key']
          ]
        },
        {
          step: 'Stage 3 · Deliver',
          title: 'Out to the world, sealed copy to you',
          short: 'The recipient gets normal email. Your Sent copy is a sealed file.',
          detailTitle: 'Delivered, with the thread kept whole',
          detailBody: 'An attested egress relay unwraps the message in memory and delivers it over TLS, unmodified. Your device seals a copy to your own key and writes it to your storage, so every device has the whole conversation. Honest limit: the recipient’s provider stores their copy the way it always does.',
          vis: [
            ['Relay operator', 'no', 'Blocked by CPU memory encryption'],
            ['Egress VM (attested)', 'part', 'Holds plaintext for milliseconds'],
            ['Your storage', 'no', 'Sent copy is a sealed file'],
            ['Recipient’s provider', 'leak', 'Stores the recipient’s copy as usual'],
            ['You', 'yes', 'Whole thread on every device']
          ]
        }
      ],
      native: [
        {
          step: 'Stage 1 · Discover',
          title: 'Both sides use ZeroMX',
          short: 'Your device finds the recipient’s verified key.',
          detailTitle: 'The upgrade is automatic',
          detailBody: 'When you address alice@sovereign.dev, your device finds her key in the public directory and verifies the proof that it is really hers. Nothing to exchange, nothing to configure.',
          vis: [
            ['Relay operator', 'no', 'No access'],
            ['Relay VM (attested)', 'no', 'Will carry sealed bytes only'],
            ['Public directory', 'no', 'Serves Alice’s key record with a proof'],
            ['Storage, yours and hers', 'no', 'No access'],
            ['You', 'yes', 'Verified her key']
          ]
        },
        {
          step: 'Stage 2 · Encrypt',
          title: 'Encrypted before it leaves your device',
          short: 'No relay ever holds the plaintext.',
          detailTitle: 'End to end, with a post-quantum hybrid',
          detailBody: 'Your device encrypts directly to Alice’s key with a hybrid scheme (X25519 with ML-KEM-768), so recorded ciphertext stays safe against future quantum attacks. No relay, CPU vendor or storage host holds the plaintext at any point. Honest limit: stored mail has no forward secrecy. A stolen long-term key opens the messages of its key period.',
          vis: [
            ['Relay operator', 'no', 'Carries sealed bytes'],
            ['Relay VM (attested)', 'no', 'Never decrypts'],
            ['Public directory', 'no', 'No access'],
            ['Storage, yours and hers', 'no', 'Sealed files at both ends'],
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
      'Mail sent to your domain is stored as sealed files: body, attachments, real sender and subject.',
      'Drafts, sent copies, and the read and folder state your devices sync.',
      'Your mailbox can’t be searched, scanned, used for ads or AI training, or handed over in readable form by whoever stores it. That includes us.',
      'Mail between ZeroMX users, end to end.',
      'Your way out: a full copy on your devices and an export to standard formats at any time.'
    ],
    limits_title: 'Not protected',
    limits: [
      '<strong>The other side’s copy.</strong> If they use Gmail, Google has their copy.',
      '<strong>The relay’s moment with outside mail.</strong> Attestation narrows who could read it. It doesn’t prove nobody did.',
      '<strong>Timing and size.</strong> The storage sees when mail arrives and roughly how big it is.',
      '<strong>Mail still sent to an old address at another provider.</strong> It never passes a relay.',
      '<strong>A compromised device or a stolen key.</strong> Each device holds a full copy.',
      '<strong>An address on someone else’s domain.</strong> Full control needs a domain in your name.'
    ],
    trust_note: `<strong>Who is still trusted at alpha:</strong> the ZeroMX team runs the relays and publishes the apps. Reproducible builds, per-message relay verification, independent operators and split trust each remove part of that, in that order. The code is open, so you can run a relay for your own domain. <a href="${THREAT_MODEL_URL}" target="_blank" rel="noopener">Read the full threat model on GitHub →</a>`,

    onboard_tag: 'Getting started',
    onboard_title: 'One requirement: an address on your own domain.',
    onboard_desc: 'Setup is designed to take a few minutes, and to be something you can undo.',
    onboardingSteps: [
      {
        title: 'Create your key',
        desc: 'It is generated on your device and unlocked with Face ID, Touch ID or your passcode. No key files and no passphrase. A printable recovery kit covers a lost device.',
        code: null
      },
      {
        title: 'Point your domain',
        desc: 'Onboarding sets these records for you, along with the ones that pin delivery to genuine relays.',
        code: 'MX 10 mx1.zeromx.network<br />MX 20 mx2.zeromx.network<br />TXT "v=spf1 include:out.zeromx.network -all"'
      },
      {
        title: 'Choose your storage',
        desc: 'ZeroMX Storage needs no setup. Or connect your own bucket at Cloudflare R2, Backblaze B2, AWS S3 or a server you run. You can move later and keep your address and keys.',
        code: null
      },
      {
        title: 'Connect your mail app',
        desc: 'Install ZeroMX Bridge and add the account to Apple Mail, Outlook or Thunderbird. Import your old mail if you want it with you. The phone app arrives with the public beta.',
        code: null
      }
    ],
    pricing_note: '<strong>Planned price:</strong> $3/month (or $29/year), with 10 GB of ZeroMX Storage, or no size limit on your own bucket. <a href="/investors">Team gateway pricing →</a>',

    road_tag: 'Roadmap',
    road_title: 'Where this is today.',
    road_desc: 'ZeroMX is at design stage. The protocol and the threat model are written, and nothing is shipped yet. This is the order things get built in.',
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
        body: 'Desktop first: ZeroMX Bridge for macOS and Linux, ZeroMX Storage or your own bucket, import and export. Relays run by the ZeroMX team and labeled that way. Invites go to the waitlist.',
        state: 'next'
      },
      {
        when: 'Then',
        title: 'Public beta',
        body: 'Independent security audit, the phone app, Bridge for Windows, relays you can verify per message, search operators and local MCP. The public directory moves to Polkadot.',
        state: 'later'
      },
      {
        when: 'Later',
        title: 'Open network',
        body: 'Independent relay operators bonded in DOT, a web client with pinned code, and split-trust ingress.',
        state: 'later'
      }
    ],

    manifesto_html: 'Email gave you an address nobody can take away, and a mailbox that whoever stores it can read. Messengers gave you privacy, inside someone else’s app. ZeroMX keeps the address and seals the mailbox. Whoever stores it reads <span class="redact">nothing at all</span>.',

    compare_tag: 'The alternatives',
    compare_title: 'Every other option makes you give something up.',
    compare_desc: 'Stay and be read, move onto one company’s island, or bolt on a plugin most senders can’t use. ZeroMX is the fourth column.',
    compare: {
      cols: ['Gmail or Outlook', 'Encrypted provider', 'PGP plugin', 'ZeroMX'],
      rows: [
        ['Stored mail is unreadable to whoever stores it', 'no', 'yes', 'part:Only if the sender uses PGP', 'yes'],
        ['Sender and subject sealed too', 'no', 'part:Varies', 'no', 'yes'],
        ['Works for mail from anyone', 'yes', 'yes', 'no', 'yes'],
        ['Your desktop mail app keeps working', 'yes', 'part:Paid bridge', 'yes', 'yes:Through the Bridge'],
        ['You choose where it is stored, and can move it', 'no', 'no', 'yes', 'yes'],
        ['Fast search over your own mail', 'yes', 'part:Varies', 'no', 'yes'],
        ['On your phone', 'yes', 'yes', 'no', 'part:ZeroMX app, from the beta']
      ]
    },

    inv_page_title: 'ZeroMX — Investor Brief',
    inv_back_product: '← Product & Demo',
    inv_nav_thesis: 'Thesis',
    inv_nav_contact: 'Talk to Founder',
    inv_tag: 'Investor brief',
    inv_title: 'Private email is sold as an island. We’re building it as something people own.',
    inv_lede: 'Encrypted mail has a proven market and one shape: a company that holds your mailbox, your apps and your way out. ZeroMX splits it into parts the user can replace (relay, storage, app, directory), keeps the address and the desktop mail app people already have, and sells the managed version of each part.',
    inv_stats: [
      { n: '4B+', l: 'people use email', s: 'Widely reported figure' },
      { n: '100M+', l: 'accounts at the largest encrypted provider', s: 'Proton, its own announcement' },
      { n: '<$0.25', l: 'a month to store a 10 GB mailbox', s: 'Our estimate from public object-storage list prices' }
    ],
    inv_points: [
      { t: 'Consumer wedge', b: 'People who already own a domain and read mail in a desktop app: founders, freelancers, consultants, developers. They keep the address and the app, and get a mailbox nobody else can read, with local search and local AI over it.' },
      { t: 'B2B wedge', b: 'Small law firms, clinics, accountants and funds that cannot let a cloud provider read client mail. Sealed mail in a bucket the firm controls, in a jurisdiction it chooses, with keys the firm holds. Starts after the consumer audit.' },
      { t: 'The cost structure', b: 'Storage is cheap: a 10 GB mailbox costs cents a month at list prices, and relays only seal and write. The real costs are deliverability, audits and support. Planned price is $3 a month, where encrypted providers charge $5 to $12.' },
      { t: 'How it makes money', b: 'A $3 subscription that bundles managed relays and 10 GB of managed storage, a $7 plan for more domains and space, and per-seat pricing for firms. Independent relay operators are paid from subscriptions. The code is open. What is sold is running it well.' },
      { t: 'Why now', b: 'Device keystores make key management invisible. Confidential VMs are a commodity on every major cloud. Cloud AI reading inboxes made the exposure concrete, and local AI turns a private local copy into a feature.' },
      { t: 'What compounds', b: 'Any two ZeroMX domains upgrade to end-to-end automatically, so the public key directory gets more valuable with every domain. Independent relay operators and third-party apps extend the network without us running it.' },
      { t: 'Where Polkadot fits', b: 'Privacy here does not depend on a blockchain. Polkadot holds the public directory of keys and relays so no company can rewrite it, including us. It adds operator bonds in DOT, payment in dotUSD, and distribution through its new product platform, whose stated goal is private products for people. The core runs without it.' },
      { t: 'Risks we test first', b: 'Whether people will move a mailbox for this: waitlist, founding deposits, interviews. Mail-app compatibility with the Bridge. Outbound deliverability from new relay addresses. The phone, where only our own app can read sealed mail.' },
      { t: 'What we don’t claim', b: 'That nobody can ever read your mail, that the network is decentralized on day one, or that only one blockchain could do this. Every remaining trust point is published, with the order in which it shrinks.' }
    ],
    inv_stage: '<strong>Stage:</strong> protocol specification, threat model, and interactive prototype complete. Private alpha next.',
    inv_cta: 'Start a conversation',
    inv_contact_tag: 'Direct founder contact',
    inv_contact_title: 'Talk directly with Daniel Cukier.',
    inv_contact_desc: 'Pre-seed and ecosystem funding stage. The technical spec, the threat model and the honest case for building on Polkadot are written and ready to walk through.',
    inv_form_email_label: 'Your work email',
    inv_form_email_ph: 'partner@fund.com',
    inv_form_note_label: 'Fund / role & what you’d like to discuss (optional)',
    inv_form_note_ph: 'Pre-seed check size, B2B pilot intro, or Polkadot ecosystem funding…',
    inv_form_submit: 'Send note to Daniel',
    inv_form_done_title: 'Note received.',
    inv_form_done_body: 'Daniel will reply directly from his personal email.',

    dev_modal: {
      tag: 'OPEN-SOURCE CONTRIBUTORS',
      title: 'Want to help build ZeroMX?',
      sub: 'The repository is public at github.com/danicuki/zeromx. Drop your email and GitHub handle if you want to coordinate on an epic (Rust crypto and sync, the IMAP Bridge, SEV-SNP/TDX Nix builds, or the Polkadot directory contract).',
      emailLabel: 'Email',
      emailPh: 'you@domain.dev',
      noteLabel: 'GitHub handle & area of interest',
      notePh: '@handle — interested in the sync engine / Bridge IMAP / PVM attestation verifier',
      submitBtn: 'Say hi to Daniel',
      doneTitle: 'Message sent.',
      doneBody: 'Thanks — Daniel will follow up directly. Meanwhile feel free to open an issue or PR on GitHub.'
    },

    dev_tag: 'For developers',
    dev_title: 'Hard problems, meant to be solved in the open.',
    dev_lede: 'Relay, clients and protocol are designed in the open, with reproducible builds. Read the full spec, threat model and backlog on GitHub, or pick one of these problems.',
    dev_stack: ['Rust', 'HPKE + ML-KEM', 'SEV-SNP / TDX', 'IMAP / SMTP', 'S3-compatible storage', 'SQLite FTS5', 'MCP', 'Polkadot Hub (PVM)', 'JAM'],
    dev_problems: [
      { t: 'Sync with no server that understands mail', b: 'Immutable sealed messages plus per-device sealed logs that merge to the same state on every device, over plain object storage.', tag: 'Rust · CRDT · storage' },
      { t: 'A local IMAP server every mail app accepts', b: 'Apple Mail, Outlook and Thunderbird each expect different extensions and quirks. The Bridge has to satisfy all of them from an encrypted local copy.', tag: 'Rust · IMAP · SMTP' },
      { t: 'Private key lookups', b: 'Find a recipient’s key without telling the server who you are about to email.', tag: 'Rust · PIR' },
      { t: 'Split-trust SMTP ingress', b: 'Terminate one TLS session across two operators on different CPU vendors, so neither holds the plaintext alone.', tag: '2PC-TLS · MPC' },
      { t: 'Reproducible confidential-VM images', b: 'A relay image anyone can rebuild bit for bit and match against the attested measurement.', tag: 'Nix · SEV-SNP · TDX' },
      { t: 'Attestation checks on PVM', b: 'Verify AMD and Intel certificate chains in ordinary Rust, first as a contract on Polkadot Hub, later in a JAM service’s Refine.', tag: 'Rust no_std · PVM' }
    ],
    dev_cta_github: 'Browse repo & specs on GitHub →',
    dev_cta_threat: 'Read threat model',
    dev_cta: 'Want to contribute?',

    jam_title: 'What Polkadot does here, and what it doesn’t',
    jam_points: [
      { t: 'A directory nobody can rewrite', b: 'Public keys, relay measurements and the operator list go into a contract on Polkadot Hub. Every change is public, and no company can roll it back, including us.' },
      { t: 'Used directly, not through an app', b: 'Our clients talk to the public network themselves. Nobody needs a wallet or the Polkadot app to receive mail. A ZeroMX Product inside the Polkadot hosts is one more client, never a requirement.' },
      { t: 'JAM for the heavy part, later', b: 'Checking hardware attestation is stateless and heavy, which is what JAM’s Refine is for. The same Rust verifier runs first as a contract and moves to a JAM service when JAM is live.' }
    ],
    jam_note: `<strong>What we don’t claim:</strong> that a blockchain makes your mail private, or that only JAM could do this. The sealing, the storage and the sync work without any chain. Polkadot removes one thing: having to trust whoever runs the directory. <a href="${POLKADOT_DOC_URL}" target="_blank" rel="noopener">Read the full reasoning →</a>`,

    wl_tag: 'Early access',
    wl_title: 'Get an alpha invite.',
    wl_desc: 'The private alpha is desktop first: ZeroMX Bridge with Apple Mail, Outlook or Thunderbird, on macOS and Linux. Tell us about your setup and we’ll invite the people it fits first.',
    wl_perk1: 'First invites to the private alpha',
    wl_perk2: 'Your setup shapes what gets built first',
    wl_perk3: 'One email when your invite is ready. No newsletter.',

    waitlistForm: {
      modalTag: 'PRIVATE ALPHA',
      modalTitle: 'Get an early alpha invite',
      modalSub: 'Enter your email to reserve a spot. Optional setup questions come after — takes 5 seconds.',
      emailPlaceholder: 'you@yourdomain.com',
      submitBtn: 'Join waitlist',
      submittingBtn: 'Joining…',
      step2Title: 'Optional: tell us your setup so we invite the right wave first',
      savePrefsBtn: 'Save setup',
      prefsSaved: 'Setup saved — thanks!',
      wtpTitle: 'Founding Member Early Access (Willingness-to-Pay Test)',
      wtpDesc: 'Want first-batch onboarding and a locked $2/month rate (instead of $3/mo)? Reserve a refundable $15 founding deposit — $0 charged today; we only invoice when your alpha invite is live.',
      wtpBtn: 'Reserve founding slot ($15 refundable)',
      wtpReservedTitle: 'Founding slot reserved',
      wtpReservedDesc: 'You’re flagged for Wave 1 at $2/mo locked. Nothing is charged until alpha goes live.',
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
      planLabel: 'Use case',
      plans: [
        { id: 'fiat-sub', label: 'Personal ($3/mo)' },
        { id: 'b2b-team', label: 'Team / company' },
        { id: 'stake-dot', label: 'Personal (DOT stake later)' },
        { id: 'run-node', label: 'Running a relay' }
      ],
      privacyNote: 'One email when your invite opens. Zero third-party trackers or cookies.',
      invalidEmail: 'Please enter a valid email address.',
      genericError: 'That didn’t go through. Please try again in a moment.',
      successTitle: 'You’re on the list.',
      successBody: (email) => `Spot saved for <strong>${email}</strong>.`,
      shareBtn: 'Copy link to share',
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
        q: 'So who can read my mail?',
        a: 'Your devices, and nobody who stores it. That includes us: ZeroMX Storage holds sealed files, and the key exists only on your devices. Two limits. Mail from outside senders passes through a relay’s memory for a moment before it is sealed. And the person you write to has their own copy at their own provider.'
      },
      {
        q: 'Where does my mail actually live?',
        a: 'In two places. Sealed files sit in storage you choose: ours by default, or your own bucket at a provider like Cloudflare R2 or Backblaze B2, or on a server you run. And each of your devices keeps a full copy, so you can read and search offline. Devices sync through the storage, so none of them has to be on for mail to arrive.'
      },
      {
        q: 'Do I have to leave Gmail?',
        a: 'Your mailbox moves, yes. Gmail can only stop reading your mail if it stops storing it. What stays is your address, if it is on your own domain, and your desktop mail app. Old mail can be imported, and it is sealed on your computer before it is uploaded. If your address is @gmail.com today, you get an address on a domain of your own and move accounts over at your pace.'
      },
      {
        q: 'Which mail apps work?',
        a: 'On a computer: Apple Mail, Outlook and Thunderbird, through ZeroMX Bridge, a small app on your machine that speaks standard IMAP to them. Other IMAP apps are tested as we go. Spark is one of them: its cloud features expect to reach your mailbox from Spark’s servers, so we will only promise it after testing. One honest limit for any app: its cloud extras, such as push from the vendor’s servers or Send Later, stop working for this account.'
      },
      {
        q: 'What happens on my phone?',
        a: 'You read sealed mail in the ZeroMX app, which shows real senders and subjects in notifications. Phones don’t let the Bridge keep running in the background, so the built-in mail app can’t be used. The phone app arrives with the public beta, and the alpha is desktop only. We would rather say so than hide it.'
      },
      {
        q: 'Why not just use Proton?',
        a: 'Proton is a good choice if you are happy inside one company’s apps and storage. In ZeroMX the parts are separate: you choose where the sealed mailbox is stored, which relays receive your mail and which app you read it in, and you can change any of them without changing your address. Sender and subject are sealed along with the body, for mail from anyone. And it is planned to cost less.'
      },
      {
        q: 'Do I lose search?',
        a: 'No. Search runs on your device over your own copy, with the operators you know from Gmail: from:, subject:, has:attachment, before:, label: and the rest. Your desktop mail app’s own search works too. Searching inside PDF attachments comes later. An optional local AI model can answer questions about your mail without it leaving your computer.'
      },
      {
        q: 'Do I have to trust ZeroMX?',
        a: 'Less than a normal mail provider, but not zero. At alpha the team runs the relays and publishes the apps, and a relay holds mail from outside senders in memory for a moment before sealing it. The plan to shrink each of those is public: reproducible builds, attested relays, independent operators, split trust. The code is open, and you can run a relay for your own domain.'
      },
      {
        q: 'What does Polkadot have to do with email?',
        a: 'Less than you might expect, and we would rather be exact. Your mail’s privacy does not depend on any blockchain, and no email ever goes on-chain. Polkadot holds one thing: the public directory of keys and relays, so that no company can quietly change it, including us. You don’t need a wallet, a token or the Polkadot app to use ZeroMX. If you already use the Polkadot app, we are testing a version of ZeroMX that runs there too.'
      },
      {
        q: 'Can I leave?',
        a: 'Yes, and it is designed to be easy. Your devices hold a full copy, and you can export it to standard formats at any time without asking us. Point your domain at another provider and your address goes with you.'
      },
      {
        q: 'What if I lose my device?',
        a: 'Another device of yours, or your printed recovery kit, restores your key. Without either, nobody can recover your mail, including us.'
      },
      {
        q: 'What will it cost?',
        a: 'The plan is $3 a month, including 10 GB of ZeroMX Storage, or no size limit if you bring your own bucket. Later, DOT holders can stake instead of paying monthly, which carries token price risk. A free tier for verified people is planned and depends on Polkadot’s proof of personhood being usable from our apps.'
      }
    ],

    founder_kicker: 'Built in the open',
    founder_title: 'Started by Daniel Cukier',
    founder_bio: 'Systems engineer based in Portugal, working on Polkadot JAM and privacy infrastructure. Building ZeroMX so that a private mailbox is something you own, not something you rent inside a company’s app.',

    footer_text: 'Private alpha opening soon. Built by Daniel Cukier in Portugal.',
    footer_built: 'No trackers. No cookies. Public directory designed for Polkadot.'
  },

  pt: {
    pageTitle: 'ZeroMX — Uma caixa de e-mail que só você abre. E ela é sua.',
    metaDescription: 'O ZeroMX sela cada mensagem enviada ao seu domínio antes de ela ser guardada. A caixa selada fica no armazenamento que você escolher, e só os seus aparelhos têm a chave. Você mantém seu endereço e seu app de e-mail do computador.',

    nav_how: 'Como funciona',
    nav_demo: 'Demo',
    nav_trust: 'Confiança',
    nav_investors: 'Investidores',
    nav_developers: 'Desenvolvedores',
    nav_cta: 'Entrar na lista',

    hero_chip: 'Alpha privado em breve · primeiro no computador, app de celular no beta',
    hero_title: 'Uma caixa de e-mail<br />que só você abre.<br /><em>E ela é sua.</em>',
    hero_sub: 'O ZeroMX sela cada mensagem enviada ao seu endereço antes de ela ser guardada. A caixa selada fica no armazenamento que você escolher, e só os seus aparelhos têm a chave. Você mantém seu endereço e o app de e-mail que já usa.',
    hero_btn_waitlist: 'Entrar na lista de espera',
    hero_btn_primary: 'Testar a demo',
    hero_fact1: '<strong>No computador:</strong> Apple Mail, Outlook, Thunderbird',
    hero_fact2: '<strong>No celular:</strong> o app ZeroMX',
    hero_fact3: '<strong>Armazenamento:</strong> o nosso ou o seu',

    lens: {
      plainLabel: 'Na sua tela',
      cipherLabel: 'No armazenamento',
      hint: 'Arraste para comparar',
      sliderLabel: 'Compare o que você vê com o que o armazenamento guarda',
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
      cFileLabel: 'Arquivo',
      cFile: 'in/01JD8K3M2V7QXA4.zmx',
      cSealerLabel: 'Selado por',
      cSealer: 'relay sev-snp:88f1…2c',
      cAttach: 'Um arquivo selado',
      cAttachMeta: '576 KB com padding'
    },

    how_tag: 'A ideia',
    how_title: 'Três passos, e ninguém que guarda seus e-mails consegue ler.',
    how_steps: [
      {
        title: 'Aponte seu domínio para o ZeroMX',
        body: 'Dois registros de DNS para <code>voce@seudominio.com</code>. Ainda não tem domínio? O onboarding registra um no seu nome.'
      },
      {
        title: 'O e-mail é selado na chegada',
        body: 'Um relay dentro de uma VM confidencial atestada cifra remetente, assunto, corpo e anexos com uma chave que só os seus aparelhos têm. Ele grava um arquivo selado no seu armazenamento e não guarda nada.'
      },
      {
        title: 'Leia no app que você já usa',
        body: 'O ZeroMX Bridge roda no seu computador e entrega os e-mails decifrados ao Apple Mail, Outlook ou Thunderbird. Cada aparelho guarda uma cópia completa, então leitura e busca funcionam sem internet.'
      }
    ],

    pillar1_title: 'Mantenha seu endereço e seu app',
    pillar1_desc: 'Seu domínio, seus contatos e o app de e-mail do computador que você já conhece. Os e-mails antigos são importados e selados no seu próprio computador.',
    pillar2_title: 'O armazenamento só guarda arquivos selados',
    pillar2_desc: 'No nosso ou no seu próprio bucket: quem hospeda não tem nada para minerar, treinar IA, vazar ou entregar.',
    pillar3_title: 'Busca e IA ficam no seu aparelho',
    pillar3_desc: 'A busca é instantânea porque os e-mails estão no seu aparelho. Um servidor MCP local permite que seus próprios agentes trabalhem com eles, na sua máquina, com a sua permissão.',
    pillar4_title: 'Nada prende você',
    pillar4_desc: 'Troque de armazenamento, de relays ou de app e mantenha seu endereço. Exporte tudo quando quiser. As chaves e a lista de relays ficam em um diretório público, na Polkadot a partir do beta, que nenhuma empresa consegue reescrever. Nem nós.',

    sim_tag: 'Demo',
    sim_title: 'Os dois lados da mesma caixa.',
    sim_desc: 'Alterne entre o que você vê e o que o armazenamento guarda. Pesquise <strong>Sírio</strong> em cada visão. Envie uma resposta e veja o que fica guardado.',
    sim_storage_label: 'Armazenamento',
    sim_storage_managed: 'ZeroMX Storage',
    sim_storage_own: 'Seu próprio bucket',
    sim_view_label: 'Visão',
    sim_view_user: 'O que você vê',
    sim_view_storage: 'O que o armazenamento guarda',
    sim_mobile_btn: 'E no meu celular?',
    sim_search_placeholder: 'Pesquisar (tente: Sírio, câmbio, Alice)',
    sim_compose_btn: 'Escrever',
    folder_inbox: 'Entrada',
    folder_starred: 'Com estrela',
    folder_sent: 'Enviados',
    side_title: 'Onde esta caixa fica',
    sideChipA: '<code>No seu armazenamento</code> só arquivos selados',
    sideChipB: '<code>Neste computador</code> uma cópia completa',

    windowTitleUser: 'Seu app de e-mail — voce@seudominio.com',
    windowTitleStorage: {
      managed: 'ZeroMX Storage — caixa de voce@seudominio.com',
      own: 's3://seu-bucket/caixa/'
    },
    extActive: 'ZeroMX Bridge ativo',
    extRaw: { managed: 'Conteúdo bruto · ZeroMX Storage', own: 'Conteúdo bruto · seu bucket' },
    bannerUser: '<strong>Sua visão.</strong> O Bridge decifra neste computador. A busca roda na sua cópia local.',
    bannerStorage: {
      managed: '<strong>Visão do armazenamento.</strong> Isto é tudo o que o ZeroMX guarda. Tente pesquisar “Sírio”.',
      own: '<strong>Visão do armazenamento.</strong> Isto é tudo o que o seu provedor de armazenamento guarda. Tente pesquisar “Sírio”.'
    },
    searchStatusUser: 'Busca: cópia local neste computador',
    searchStatusStorage: 'Busca: só nomes de arquivo',
    noResultsTitle: (q) => `Nenhum resultado para “${q}”`,
    noResultsStorage: {
      managed: 'Aqui só há nomes de arquivo para comparar. O ZeroMX não enxerga dentro de um arquivo selado. Volte para “O que você vê” e pesquise de novo.',
      own: 'Aqui só há nomes de arquivo para comparar. Seu provedor de armazenamento não enxerga dentro de um arquivo selado. Volte para “O que você vê” e pesquise de novo.'
    },
    noResultsUser: 'Tente Sírio, câmbio ou Alice.',
    noMailSelected: 'Nada para mostrar nesta busca.',
    serverCipherBadge: 'Arquivo selado',
    badgeShort: { e2ee: 'Ponta a ponta', tee: 'Selado na chegada', own: 'Selado neste aparelho' },
    visLegend: { no: 'não consegue ler', part: 'tem por um instante', yes: 'lê' },
    sizeLabel: 'Tamanho, com padding',
    writtenByLabel: 'Gravado por',
    toLabel: 'Para',
    fromLabel: 'De',
    protectionLabel: 'Proteção',
    probeTitle: {
      managed: 'O que o ZeroMX consegue saber sobre este arquivo',
      own: 'O que o seu provedor de armazenamento consegue saber sobre este arquivo'
    },
    probeDesc: 'Quando ele chegou, o tamanho com padding e qual relay ou aparelho o gravou. Remetente, assunto, corpo e anexos estão dentro, ilegíveis sem a chave que fica nos seus aparelhos.',
    switchBackUserBtn: 'Mostrar visão decifrada',
    mcpTitle: 'Disponível para a sua IA local',
    mcpDesc: 'Indexado neste computador e exposto por um servidor MCP local, só para os agentes que você aprovar.',
    replySecureBtn: 'Responder',
    peekStorageBtn: 'Ver o que o armazenamento guarda',

    composeModal: {
      tag: 'RASCUNHO SELADO NESTE APARELHO',
      title: 'Nova mensagem',
      fromLabel: 'De',
      fromAddr: 'voce@seudominio.com',
      toLabel: 'Para',
      defaultTo: 'parceiro@empresa.com.br',
      subjLabel: 'Assunto (nunca guardado legível)',
      defaultSubj: 'Proposta confidencial',
      bodyLabel: 'Mensagem',
      defaultBody: 'Escrevendo do meu app de e-mail de sempre. Este rascunho foi selado no meu computador antes de ser salvo em qualquer lugar. A mensagem sai assinada pela chave do meu próprio domínio, e a cópia em Enviados também fica selada.',
      footerNote: 'Assinado no seu aparelho. Cópia de Enviados selada com a sua chave.',
      routeE2ee: 'O destinatário usa ZeroMX: cifrado de ponta a ponta no seu aparelho.',
      routeRelay: 'O destinatário não usa ZeroMX: entregue por um relay atestado. Tente alice@soberano.dev.',
      sendBtn: 'Enviar',
      noSubject: '(sem assunto)',
      sentNow: 'Agora',
      youLabel: 'Você',
      sentSealedBy: 'este aparelho',
      sentTierE2ee: 'Ponta a ponta · ZeroMX para ZeroMX',
      sentTierTee: 'Enviado por relay atestado · sua cópia selada neste aparelho'
    },

    mobileModal: {
      tag: 'NO CELULAR',
      title: 'O que acontece no seu celular?',
      badTitle: 'O que o serviço de push transporta',
      badDesc: 'O relay sela uma prévia curta com uma chave que só existe no seu celular. O serviço de push da Apple ou do Google repassa isto:',
      goodTitle: 'O que aparece na tela bloqueada',
      goodDesc: 'O app ZeroMX decifra a prévia no próprio celular:',
      goodSample: 'Hospital Sírio-Libanês\nResultado dos seus exames laboratoriais\nDesbloqueado neste aparelho',
      summary: '<strong>O trade-off:</strong> no computador você mantém seu app de e-mail. No celular você lê os e-mails selados no app ZeroMX, porque celulares não deixam o Bridge ficar rodando em segundo plano para o app de e-mail nativo. O app de celular chega com o beta público. O alpha é só no computador.',
      okBtn: 'Entendi'
    },

    emails: [
      {
        id: 'm1',
        tier: 'e2ee',
        trustLabel: 'Ponta a ponta · ZeroMX para ZeroMX',
        realFrom: 'Alice <alice@soberano.dev>',
        realTo: 'voce@seudominio.com',
        realSubject: 'Migrei meu domínio. Você devia também',
        time: '11:42',
        objKey: 'in/01JD9F2R6T0BWK3.zmx',
        realBody: 'Oi,\n\nFinalmente fiz. Mesmo endereço, mesmo app de e-mail, mas agora minha caixa fica no meu próprio bucket, em arquivos selados, e a chave nunca sai dos meus aparelhos.\n\nComo nós dois usamos ZeroMX, esta mensagem foi cifrada no meu notebook com a sua chave. Nenhum relay conseguiu ler no caminho.\n\nO celular é a única coisa que muda: lá eu leio os e-mails no app ZeroMX.',
        sealedBy: 'aparelho do remetente',
        padded: '4 KiB'
      },
      {
        id: 'm2',
        tier: 'tee',
        trustLabel: 'Selado na chegada · relay atestado (AMD SEV-SNP)',
        realFrom: 'Hospital Sírio-Libanês <resultados@hsl.org.br>',
        realTo: 'voce@seudominio.com',
        realSubject: 'Resultado dos seus exames laboratoriais',
        time: '09:15',
        objKey: 'in/01JD8K3M2V7QXA4.zmx',
        realBody: 'Olá,\n\nSeus exames coletados em 16/11 já estão disponíveis. Colesterol, glicemia de jejum e hemograma estão dentro dos valores de referência.\n\nO laudo completo está em anexo.',
        attachment: { name: 'laudo_exames_2026.pdf', size: '412 KB' },
        note: 'O hospital enviou um e-mail comum. Um relay verificou a assinatura DKIM, selou remetente, assunto e PDF com a sua chave, gravou um arquivo no seu armazenamento e apagou a memória.',
        sealedBy: 'relay sev-snp:88f1…2c',
        padded: '576 KiB'
      },
      {
        id: 'm3',
        tier: 'tee',
        trustLabel: 'Selado na chegada · relay atestado (Intel TDX)',
        realFrom: 'Itaú Personnalité <alertas@itau.com.br>',
        realTo: 'voce@seudominio.com',
        realSubject: 'Contrato de câmbio liquidado e extrato de novembro',
        time: 'Ontem',
        objKey: 'in/01JD6WQ0H5E9RZC.zmx',
        realBody: 'Prezado cliente,\n\nSeu contrato de câmbio #884920 no valor de US$ 14.500,00 foi liquidado.\n\nSeu extrato consolidado e o informe de rendimentos estão em anexo.',
        attachment: { name: 'extrato_2026_11.pdf', size: '88 KB' },
        sealedBy: 'relay tdx:41a9…9b',
        padded: '128 KiB'
      },
      {
        id: 'm4',
        tier: 'own',
        trustLabel: 'Selado neste aparelho · importado da sua caixa antiga',
        realFrom: 'Produto da Semana <oi@produtodasemana.com.br>',
        realTo: 'voce.antigo@gmail.com',
        realSubject: 'Esta semana: 5 lançamentos que valem seu tempo',
        time: 'Mês passado',
        objKey: 'own/01JB3Z7H9N4MPQ8.zmx',
        realBody: 'Olá,\n\nAqui vão as escolhas da semana: uma agenda que marca reuniões sozinha, um app de notas sem nuvem e mais três logo abaixo.',
        note: 'Importado da sua caixa antiga. Este computador selou a mensagem antes de enviá-la ao armazenamento. Limite honesto: seu provedor antigo já tinha uma cópia legível. A importação protege daqui para a frente.',
        sealedBy: 'este aparelho',
        padded: '8 KiB'
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
            ['Diretório público', 'no', 'Nunca recebe e-mails'],
            ['Armazenamento', 'no', 'Ainda não tem nada'],
            ['Você', 'wait', 'Aguardando']
          ]
        },
        {
          step: 'Etapa 2 · Selo',
          title: 'Verificado, selado e assinado',
          short: 'Cifrado com a sua chave dentro da memória do relay.',
          detailTitle: 'Selado em memória e depois apagado',
          detailBody: 'Dentro da VM confidencial, o relay verifica SPF, DKIM e DMARC, pontua spam e então cifra a mensagem inteira com a sua chave pública: remetente, assunto, corpo e anexos. Ele aplica padding no tamanho, assina o arquivo selado e apaga o texto claro. Limite honesto: durante esses milissegundos o texto claro existe dentro da VM. A atestação mostra qual código está rodando. Ela não descarta um ataque de hardware feito por alguém com acesso físico, e é por isso que os operadores são selecionados.',
          vis: [
            ['Operador do relay', 'no', 'Bloqueado pela cifragem de memória da CPU'],
            ['VM do relay (atestada)', 'part', 'Tem o texto claro por milissegundos'],
            ['Diretório público', 'no', 'Fornece a sua chave pública'],
            ['Armazenamento', 'no', 'Ainda não tem nada'],
            ['Você', 'yes', 'Único dono da chave privada']
          ]
        },
        {
          step: 'Etapa 3 · Guarda',
          title: 'Seu armazenamento recebe um arquivo selado',
          short: 'O relay consegue adicionar arquivos. Nunca consegue lê-los de volta.',
          detailTitle: 'Guardado onde você escolheu',
          detailBody: 'O relay grava o arquivo selado no seu armazenamento com uma credencial que só permite adicionar arquivos. Ele só responde “aceito” ao remetente depois que o armazenamento confirma a gravação. Se o armazenamento estiver fora do ar, o servidor do remetente tenta de novo mais tarde, como o e-mail sempre fez, e por isso o relay nunca precisa de disco. O armazenamento fica sabendo o horário de chegada e um tamanho com padding, e nada mais.',
          vis: [
            ['Operador do relay', 'no', 'Nada guardado em disco'],
            ['VM do relay (atestada)', 'no', 'Texto claro já apagado'],
            ['Diretório público', 'no', 'Sem acesso'],
            ['Armazenamento', 'part', 'Um arquivo selado, horário, tamanho com padding'],
            ['Você', 'yes', 'Seu para baixar, mover ou apagar']
          ]
        },
        {
          step: 'Etapa 4 · Leitura',
          title: 'Decifrado no seu aparelho',
          short: 'Sincronizado, verificado, aberto com a sua chave, exibido no seu app.',
          detailTitle: 'Você lê como qualquer outro e-mail',
          detailBody: 'Seu aparelho baixa o arquivo, confere se um relay registrado o assinou e o abre com uma chave que nunca sai dos seus aparelhos. No computador, o Bridge entrega a mensagem ao seu app de e-mail. No celular, o app ZeroMX a mostra. Sua cópia local e seu índice de busca são atualizados, e seus outros aparelhos chegam ao mesmo estado pela sincronização selada.',
          vis: [
            ['Operador do relay', 'no', 'Sem acesso'],
            ['VM do relay (atestada)', 'no', 'Fora do fluxo'],
            ['Diretório público', 'no', 'Fornece registros de chaves e relays'],
            ['Armazenamento', 'no', 'Continua selado enquanto você lê'],
            ['Você', 'yes', 'Lê, pesquisa e usa sua própria IA']
          ]
        }
      ],
      outbound: [
        {
          step: 'Etapa 1 · Escrita',
          title: 'Rascunhos são selados antes de serem salvos',
          short: 'Você escreve no seu app de e-mail, na sua máquina.',
          detailTitle: 'Nenhum rascunho legível sai do seu computador',
          detailBody: 'O webmail envia seu rascunho ao servidor a cada poucos segundos. Aqui você escreve no seu app de e-mail, que só conversa com o Bridge no seu próprio computador. O Bridge sela o rascunho com a sua chave antes de salvá-lo no armazenamento, e assim seus outros aparelhos conseguem continuá-lo e ninguém mais consegue ler.',
          vis: [
            ['Operador do relay', 'no', 'Sem acesso'],
            ['VM de saída (atestada)', 'wait', 'Aguardando o envio'],
            ['Diretório público', 'no', 'Sem acesso'],
            ['Armazenamento', 'no', 'Rascunho guardado selado'],
            ['Você', 'yes', 'Escrevendo em privado']
          ]
        },
        {
          step: 'Etapa 2 · Assinatura',
          title: 'Quem assina é o seu aparelho',
          short: 'A chave DKIM do seu domínio fica com você.',
          detailTitle: 'Nenhum relay consegue forjar e-mails do seu domínio',
          detailBody: 'Seu aparelho assina a mensagem com a chave DKIM do seu domínio, que nunca sai dos seus aparelhos, e anexa um token de cota que mantém spammers longe dos endereços de envio compartilhados. O relay nunca tem uma chave capaz de assinar em seu nome.',
          vis: [
            ['Operador do relay', 'no', 'Sem acesso'],
            ['VM de saída (atestada)', 'no', 'Confere o token de cota'],
            ['Diretório público', 'no', 'Sem acesso'],
            ['Armazenamento', 'no', 'Não participa'],
            ['Você', 'yes', 'Tem a única chave de assinatura']
          ]
        },
        {
          step: 'Etapa 3 · Entrega',
          title: 'Para o mundo, e uma cópia selada para você',
          short: 'O destinatário recebe e-mail normal. Sua cópia é um arquivo selado.',
          detailTitle: 'Entregue, com a conversa completa',
          detailBody: 'Um relay de saída atestado abre a mensagem em memória e a entrega via TLS, sem alterá-la. Seu aparelho sela uma cópia com a sua própria chave e a grava no seu armazenamento, e assim todos os seus aparelhos têm a conversa inteira. Limite honesto: o provedor do destinatário guarda a cópia dele como sempre guardou.',
          vis: [
            ['Operador do relay', 'no', 'Bloqueado pela cifragem de memória da CPU'],
            ['VM de saída (atestada)', 'part', 'Tem o texto claro por milissegundos'],
            ['Seu armazenamento', 'no', 'A cópia de Enviados é um arquivo selado'],
            ['Provedor do destinatário', 'leak', 'Guarda a cópia do destinatário normalmente'],
            ['Você', 'yes', 'Conversa inteira em todos os aparelhos']
          ]
        }
      ],
      native: [
        {
          step: 'Etapa 1 · Descoberta',
          title: 'Os dois lados usam ZeroMX',
          short: 'Seu aparelho encontra a chave verificada do destinatário.',
          detailTitle: 'O upgrade é automático',
          detailBody: 'Quando você escreve para alice@soberano.dev, seu aparelho encontra a chave dela no diretório público e verifica a prova de que ela é mesmo dela. Nada para trocar, nada para configurar.',
          vis: [
            ['Operador do relay', 'no', 'Sem acesso'],
            ['VM do relay (atestada)', 'no', 'Só vai transportar bytes selados'],
            ['Diretório público', 'no', 'Fornece o registro da chave da Alice com prova'],
            ['Armazenamento, o seu e o dela', 'no', 'Sem acesso'],
            ['Você', 'yes', 'Verificou a chave dela']
          ]
        },
        {
          step: 'Etapa 2 · Cifragem',
          title: 'Cifrado antes de sair do seu aparelho',
          short: 'Nenhum relay chega a ter o texto claro.',
          detailTitle: 'Ponta a ponta, com híbrido pós-quântico',
          detailBody: 'Seu aparelho cifra direto para a chave da Alice com um esquema híbrido (X25519 com ML-KEM-768), para que o texto cifrado guardado continue seguro contra ataques quânticos futuros. Nenhum relay, fabricante de CPU ou serviço de armazenamento tem o texto claro em momento algum. Limite honesto: e-mail guardado não tem sigilo futuro. Uma chave de longo prazo roubada abre as mensagens do período daquela chave.',
          vis: [
            ['Operador do relay', 'no', 'Transporta bytes selados'],
            ['VM do relay (atestada)', 'no', 'Nunca decifra'],
            ['Diretório público', 'no', 'Sem acesso'],
            ['Armazenamento, o seu e o dela', 'no', 'Arquivos selados nas duas pontas'],
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
        body: 'Cifrado no aparelho de quem envia, decifrado no seu. Nenhum relay tem o texto claro em momento algum.',
        restsOn: 'Apoia-se nos dois aparelhos, no conjunto de cifras e no software cliente.'
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
      'E-mails enviados ao seu domínio ficam guardados como arquivos selados: corpo, anexos, remetente real e assunto.',
      'Rascunhos, cópias de enviados e o estado de leitura e de pastas que seus aparelhos sincronizam.',
      'Sua caixa não pode ser pesquisada, escaneada, usada para anúncios ou treino de IA, nem entregue em formato legível por quem a guarda. Isso inclui a gente.',
      'E-mails entre usuários ZeroMX, de ponta a ponta.',
      'Sua saída: uma cópia completa nos seus aparelhos e exportação para formatos padrão a qualquer momento.'
    ],
    limits_title: 'Não protegido',
    limits: [
      '<strong>A cópia do outro lado.</strong> Se a pessoa usa Gmail, o Google tem a cópia dela.',
      '<strong>O instante do relay com e-mails de fora.</strong> A atestação reduz quem poderia ler. Ela não prova que ninguém leu.',
      '<strong>Horário e tamanho.</strong> O armazenamento vê quando o e-mail chega e mais ou menos o tamanho.',
      '<strong>E-mails ainda enviados a um endereço antigo em outro provedor.</strong> Eles nunca passam por um relay.',
      '<strong>Um aparelho comprometido ou uma chave roubada.</strong> Cada aparelho guarda uma cópia completa.',
      '<strong>Um endereço no domínio de outra pessoa.</strong> Controle total exige um domínio no seu nome.'
    ],
    trust_note: `<strong>Em quem ainda se confia no alpha:</strong> a equipe do ZeroMX opera os relays e publica os apps. Builds reproduzíveis, verificação do relay por mensagem, operadores independentes e confiança dividida removem cada um uma parte disso, nessa ordem. O código é aberto, então você pode rodar um relay para o seu próprio domínio. <a href="${THREAT_MODEL_URL}" target="_blank" rel="noopener">Ler o modelo de ameaças completo no GitHub →</a>`,

    onboard_tag: 'Como começar',
    onboard_title: 'Um requisito: um endereço no seu próprio domínio.',
    onboard_desc: 'A configuração foi pensada para levar poucos minutos e para ser algo que você consegue desfazer.',
    onboardingSteps: [
      {
        title: 'Crie sua chave',
        desc: 'Ela é gerada no seu aparelho e destravada com Face ID, Touch ID ou a senha do aparelho. Sem arquivos de chave e sem senha longa. Um kit de recuperação imprimível cobre a perda do aparelho.',
        code: null
      },
      {
        title: 'Aponte seu domínio',
        desc: 'O onboarding cria estes registros para você, junto com os que prendem a entrega a relays legítimos.',
        code: 'MX 10 mx1.zeromx.network<br />MX 20 mx2.zeromx.network<br />TXT "v=spf1 include:out.zeromx.network -all"'
      },
      {
        title: 'Escolha seu armazenamento',
        desc: 'O ZeroMX Storage não exige configuração. Ou conecte seu próprio bucket no Cloudflare R2, Backblaze B2, AWS S3 ou em um servidor seu. Você pode mudar depois e manter endereço e chaves.',
        code: null
      },
      {
        title: 'Conecte seu app de e-mail',
        desc: 'Instale o ZeroMX Bridge e adicione a conta ao Apple Mail, Outlook ou Thunderbird. Importe seus e-mails antigos se quiser levá-los junto. O app de celular chega com o beta público.',
        code: null
      }
    ],
    pricing_note: '<strong>Preço planejado:</strong> US$ 3/mês (ou US$ 29/ano), com 10 GB de ZeroMX Storage, ou sem limite de tamanho no seu próprio bucket. <a href="/investors">Gateway para equipes →</a>',

    road_tag: 'Roadmap',
    road_title: 'Onde isto está hoje.',
    road_desc: 'O ZeroMX está em fase de design. O protocolo e o modelo de ameaças estão escritos, e nada foi lançado ainda. Esta é a ordem em que as coisas serão construídas.',
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
        body: 'Primeiro no computador: ZeroMX Bridge para macOS e Linux, ZeroMX Storage ou seu próprio bucket, importação e exportação. Relays operados pela equipe do ZeroMX e identificados assim. Os convites vão para a lista de espera.',
        state: 'next'
      },
      {
        when: 'Depois',
        title: 'Beta público',
        body: 'Auditoria de segurança independente, o app de celular, Bridge para Windows, relays verificáveis por mensagem, operadores de busca e MCP local. O diretório público passa para a Polkadot.',
        state: 'later'
      },
      {
        when: 'Mais adiante',
        title: 'Rede aberta',
        body: 'Operadores de relay independentes com garantia em DOT, um cliente web com código fixado e entrada com confiança dividida.',
        state: 'later'
      }
    ],

    manifesto_html: 'O e-mail deu a você um endereço que ninguém pode tirar, e uma caixa que quem guarda consegue ler. Os mensageiros deram privacidade, dentro do app de outra empresa. O ZeroMX mantém o endereço e sela a caixa. Quem guarda lê <span class="redact">absolutamente nada</span>.',

    compare_tag: 'As alternativas',
    compare_title: 'Todas as outras opções fazem você abrir mão de algo.',
    compare_desc: 'Ficar e ser lido, mudar para a ilha de uma empresa, ou instalar um plugin que a maioria dos remetentes não consegue usar. O ZeroMX é a quarta coluna.',
    compare: {
      cols: ['Gmail ou Outlook', 'Provedor cifrado', 'Plugin de PGP', 'ZeroMX'],
      rows: [
        ['E-mail guardado é ilegível para quem guarda', 'no', 'yes', 'part:Só se o remetente usar PGP', 'yes'],
        ['Remetente e assunto também selados', 'no', 'part:Varia', 'no', 'yes'],
        ['Funciona com e-mail de qualquer pessoa', 'yes', 'yes', 'no', 'yes'],
        ['Seu app de e-mail do computador continua funcionando', 'yes', 'part:Bridge pago', 'yes', 'yes:Pelo Bridge'],
        ['Você escolhe onde fica guardado, e pode mudar', 'no', 'no', 'yes', 'yes'],
        ['Busca rápida nos seus próprios e-mails', 'yes', 'part:Varia', 'no', 'yes'],
        ['No celular', 'yes', 'yes', 'no', 'part:App ZeroMX, a partir do beta']
      ]
    },

    inv_page_title: 'ZeroMX — Resumo para Investidores',
    inv_back_product: '← Produto & Demo',
    inv_nav_thesis: 'Tese',
    inv_nav_contact: 'Falar com o Fundador',
    inv_tag: 'Resumo para investidores',
    inv_title: 'E-mail privado é vendido como uma ilha. Estamos construindo como algo que a pessoa possui.',
    inv_lede: 'E-mail cifrado tem mercado comprovado e um único formato: uma empresa que guarda sua caixa, seus apps e sua porta de saída. O ZeroMX separa isso em partes que o usuário pode trocar (relay, armazenamento, app, diretório), mantém o endereço e o app de e-mail que a pessoa já tem, e vende a versão gerenciada de cada parte.',
    inv_stats: [
      { n: '4 bi+', l: 'pessoas usam e-mail', s: 'Número amplamente divulgado' },
      { n: '100 mi+', l: 'contas no maior provedor cifrado', s: 'Proton, anúncio da própria empresa' },
      { n: '<US$ 0,25', l: 'por mês para guardar uma caixa de 10 GB', s: 'Estimativa nossa, a partir de preços públicos de armazenamento' }
    ],
    inv_points: [
      { t: 'Porta de entrada B2C', b: 'Quem já tem domínio próprio e lê e-mail em um app no computador: fundadores, freelancers, consultores, desenvolvedores. Mantêm o endereço e o app, e ganham uma caixa que ninguém mais consegue ler, com busca local e IA local sobre ela.' },
      { t: 'Porta de entrada B2B', b: 'Pequenos escritórios de advocacia, clínicas, contadores e fundos que não podem deixar um provedor de nuvem ler e-mails de clientes. E-mail selado em um bucket que a empresa controla, na jurisdição que ela escolher, com chaves em poder da empresa. Começa depois da auditoria do produto pessoal.' },
      { t: 'Estrutura de custos', b: 'Armazenamento é barato: uma caixa de 10 GB custa centavos por mês a preço de tabela, e os relays só selam e gravam. Os custos reais são entregabilidade, auditorias e suporte. O preço planejado é US$ 3 por mês, enquanto provedores cifrados cobram de US$ 5 a US$ 12.' },
      { t: 'Como gera receita', b: 'Uma assinatura de US$ 3 que inclui relays gerenciados e 10 GB de armazenamento gerenciado, um plano de US$ 7 para mais domínios e espaço, e preço por usuário para empresas. Operadores de relay independentes são pagos com as assinaturas. O código é aberto. O que se vende é operar isso bem.' },
      { t: 'Por que agora', b: 'Os aparelhos já guardam chaves em hardware seguro, o que torna o gerenciamento de chaves invisível. VMs confidenciais viraram commodity em toda grande nuvem. IAs de nuvem lendo caixas de entrada tornaram o risco concreto, e a IA local transforma uma cópia local privada em recurso.' },
      { t: 'O que se acumula', b: 'Dois domínios ZeroMX passam automaticamente a ponta a ponta, e assim o diretório público de chaves vale mais a cada novo domínio. Operadores de relay independentes e apps de terceiros ampliam a rede sem que a gente precise operá-la.' },
      { t: 'Onde a Polkadot entra', b: 'A privacidade aqui não depende de blockchain. A Polkadot guarda o diretório público de chaves e relays para que nenhuma empresa consiga reescrevê-lo, nem nós. Ela acrescenta garantias dos operadores em DOT, pagamento em dotUSD e distribuição pela nova plataforma de produtos, cujo objetivo declarado é produtos privados para pessoas. O núcleo funciona sem ela.' },
      { t: 'Riscos testados primeiro', b: 'Se as pessoas mudam de caixa por isso: lista de espera, depósitos de fundador, entrevistas. Compatibilidade dos apps de e-mail com o Bridge. Entregabilidade de saída a partir de endereços novos. O celular, onde só o nosso app consegue ler e-mail selado.' },
      { t: 'O que não afirmamos', b: 'Que ninguém jamais conseguirá ler seus e-mails, que a rede é descentralizada no primeiro dia, ou que só uma blockchain conseguiria fazer isto. Cada ponto de confiança restante está publicado, com a ordem em que ele diminui.' }
    ],
    inv_stage: '<strong>Estágio:</strong> especificação do protocolo, modelo de ameaças e protótipo concluídos. Alpha privado em seguida.',
    inv_cta: 'Iniciar uma conversa',
    inv_contact_tag: 'Contato direto com o fundador',
    inv_contact_title: 'Fale direto com Daniel Cukier.',
    inv_contact_desc: 'Estágio pré-seed e de financiamento pelo ecossistema. A especificação técnica, o modelo de ameaças e o argumento honesto para construir na Polkadot estão escritos e prontos para revisão.',
    inv_form_email_label: 'Seu e-mail profissional',
    inv_form_email_ph: 'socio@fundo.com',
    inv_form_note_label: 'Fundo / papel e o que gostaria de conversar (opcional)',
    inv_form_note_ph: 'Pré-seed, piloto B2B ou financiamento pelo ecossistema Polkadot…',
    inv_form_submit: 'Enviar mensagem para Daniel',
    inv_form_done_title: 'Mensagem recebida.',
    inv_form_done_body: 'O Daniel responderá diretamente pelo e-mail pessoal dele.',

    dev_modal: {
      tag: 'CONTRIBUIDORES OPEN-SOURCE',
      title: 'Quer ajudar a construir o ZeroMX?',
      sub: 'O repositório é público em github.com/danicuki/zeromx. Deixe seu e-mail e GitHub se quiser coordenar em alguma frente (cripto e sync em Rust, o Bridge IMAP, imagens Nix SEV-SNP/TDX ou o contrato do diretório na Polkadot).',
      emailLabel: 'E-mail',
      emailPh: 'voce@dominio.dev',
      noteLabel: 'Usuário GitHub e área de interesse',
      notePh: '@usuario — interesse no motor de sync / Bridge IMAP / verificador de atestação em PVM',
      submitBtn: 'Falar com o Daniel',
      doneTitle: 'Mensagem enviada.',
      doneBody: 'Obrigado — o Daniel responderá direto. Enquanto isso, fique à vontade para abrir uma issue ou PR no GitHub.'
    },

    dev_tag: 'Para desenvolvedores',
    dev_title: 'Problemas difíceis, para resolver às claras.',
    dev_lede: 'Relay, clientes e protocolo são desenhados às claras, com builds reproduzíveis. Leia a especificação completa, o modelo de ameaças e o backlog no GitHub, ou escolha um destes problemas.',
    dev_stack: ['Rust', 'HPKE + ML-KEM', 'SEV-SNP / TDX', 'IMAP / SMTP', 'Armazenamento S3', 'SQLite FTS5', 'MCP', 'Polkadot Hub (PVM)', 'JAM'],
    dev_problems: [
      { t: 'Sync sem servidor que entenda e-mail', b: 'Mensagens seladas imutáveis e logs selados por aparelho que convergem para o mesmo estado em todos os aparelhos, sobre armazenamento de objetos comum.', tag: 'Rust · CRDT · storage' },
      { t: 'Um servidor IMAP local que todo app aceite', b: 'Apple Mail, Outlook e Thunderbird esperam extensões e manias diferentes. O Bridge precisa satisfazer todos a partir de uma cópia local cifrada.', tag: 'Rust · IMAP · SMTP' },
      { t: 'Consultas privadas de chaves', b: 'Encontrar a chave de um destinatário sem contar ao servidor para quem você vai escrever.', tag: 'Rust · PIR' },
      { t: 'Entrada SMTP com confiança dividida', b: 'Terminar uma sessão TLS entre dois operadores com CPUs de fabricantes diferentes, para que nenhum tenha o texto claro sozinho.', tag: '2PC-TLS · MPC' },
      { t: 'Imagens reproduzíveis de VM confidencial', b: 'Uma imagem de relay que qualquer pessoa reconstrói bit a bit e compara com a medição atestada.', tag: 'Nix · SEV-SNP · TDX' },
      { t: 'Verificação de atestação em PVM', b: 'Verificar cadeias de certificados da AMD e da Intel em Rust comum, primeiro como contrato no Polkadot Hub, depois no Refine de um serviço JAM.', tag: 'Rust no_std · PVM' }
    ],
    dev_cta_github: 'Ver repositório e specs no GitHub →',
    dev_cta_threat: 'Ler modelo de ameaças',
    dev_cta: 'Quero contribuir',

    jam_title: 'O que a Polkadot faz aqui, e o que não faz',
    jam_points: [
      { t: 'Um diretório que ninguém reescreve', b: 'Chaves públicas, medições dos relays e a lista de operadores vão para um contrato no Polkadot Hub. Toda alteração é pública, e nenhuma empresa consegue desfazê-la, nem nós.' },
      { t: 'Usada direto, não por meio de um app', b: 'Nossos clientes conversam com a rede pública por conta própria. Ninguém precisa de carteira nem do app Polkadot para receber e-mail. Um Produto ZeroMX dentro dos hosts da Polkadot é mais um cliente, nunca um requisito.' },
      { t: 'JAM para a parte pesada, mais adiante', b: 'Verificar atestação de hardware é pesado e sem estado, exatamente o que o Refine do JAM faz. O mesmo verificador em Rust roda primeiro como contrato e passa para um serviço JAM quando o JAM estiver no ar.' }
    ],
    jam_note: `<strong>O que não afirmamos:</strong> que uma blockchain torna seu e-mail privado, ou que só o JAM conseguiria fazer isto. O selo, o armazenamento e a sincronização funcionam sem nenhuma blockchain. A Polkadot elimina uma coisa: ter de confiar em quem opera o diretório. <a href="${POLKADOT_DOC_URL}" target="_blank" rel="noopener">Ler o raciocínio completo →</a>`,

    wl_tag: 'Acesso antecipado',
    wl_title: 'Receba um convite para o alpha.',
    wl_desc: 'O alpha privado começa no computador: ZeroMX Bridge com Apple Mail, Outlook ou Thunderbird, em macOS e Linux. Conte como é o seu uso e convidamos primeiro quem se encaixa.',
    wl_perk1: 'Primeiros convites para o alpha privado',
    wl_perk2: 'Seu uso define o que é construído primeiro',
    wl_perk3: 'Um e-mail quando seu convite estiver pronto. Sem newsletter.',

    waitlistForm: {
      modalTag: 'ALPHA PRIVADO',
      modalTitle: 'Garanta um convite antecipado',
      modalSub: 'Coloque seu e-mail para reservar vaga. As perguntas opcionais de setup aparecem depois — leva 5 segundos.',
      emailPlaceholder: 'voce@seudominio.com',
      submitBtn: 'Entrar na lista',
      submittingBtn: 'Enviando…',
      step2Title: 'Opcional: conte seu setup para priorizarmos seu convite',
      savePrefsBtn: 'Salvar setup',
      prefsSaved: 'Setup salvo — obrigado!',
      wtpTitle: 'Vaga de Fundador (Teste de Disposição a Pagar)',
      wtpDesc: 'Quer entrar na 1ª leva e travar US$ 2/mês vitalício (em vez de US$ 3/mês)? Reserve com depósito reembolsável de US$ 15 — US$ 0 cobrado hoje; só faturamos quando o alpha abrir.',
      wtpBtn: 'Reservar vaga de fundador (US$ 15 reembolsável)',
      wtpReservedTitle: 'Vaga de fundador reservada',
      wtpReservedDesc: 'Você entrou para a 1ª leva a US$ 2/mês travados. Nada é cobrado até o alpha abrir.',
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
      planLabel: 'Caso de uso',
      plans: [
        { id: 'fiat-sub', label: 'Pessoal (US$ 3/mês)' },
        { id: 'b2b-team', label: 'Equipe / empresa' },
        { id: 'stake-dot', label: 'Pessoal (stake DOT depois)' },
        { id: 'run-node', label: 'Operar um relay' }
      ],
      privacyNote: 'Um e-mail quando seu convite abrir. Zero rastreadores ou cookies.',
      invalidEmail: 'Digite um endereço de e-mail válido.',
      genericError: 'Não foi possível enviar. Tente de novo em instantes.',
      successTitle: 'Você está na lista.',
      successBody: (email) => `Vaga salva para <strong>${email}</strong>.`,
      shareBtn: 'Copiar link para compartilhar',
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
        q: 'Então quem consegue ler meus e-mails?',
        a: 'Os seus aparelhos, e ninguém que os guarda. Isso inclui a gente: o ZeroMX Storage guarda arquivos selados, e a chave só existe nos seus aparelhos. Dois limites. E-mails de remetentes de fora passam pela memória de um relay por um instante antes de serem selados. E a pessoa para quem você escreve tem a cópia dela no provedor dela.'
      },
      {
        q: 'Onde meus e-mails ficam, afinal?',
        a: 'Em dois lugares. Os arquivos selados ficam no armazenamento que você escolher: o nosso por padrão, ou o seu próprio bucket em um provedor como Cloudflare R2 ou Backblaze B2, ou em um servidor seu. E cada aparelho seu guarda uma cópia completa, para ler e pesquisar sem internet. Os aparelhos sincronizam pelo armazenamento, então nenhum precisa estar ligado para o e-mail chegar.'
      },
      {
        q: 'Preciso sair do Gmail?',
        a: 'Sua caixa muda de lugar, sim. O Gmail só deixa de ler seus e-mails se deixar de guardá-los. O que fica é o seu endereço, se ele estiver no seu próprio domínio, e o seu app de e-mail do computador. Os e-mails antigos podem ser importados, e são selados no seu computador antes de subirem. Se hoje o seu endereço é @gmail.com, você ganha um endereço em um domínio seu e migra suas contas no seu ritmo.'
      },
      {
        q: 'Quais apps de e-mail funcionam?',
        a: 'No computador: Apple Mail, Outlook e Thunderbird, por meio do ZeroMX Bridge, um app pequeno na sua máquina que fala IMAP padrão com eles. Outros apps IMAP são testados aos poucos. O Spark é um deles: os recursos de nuvem dele esperam acessar sua caixa a partir dos servidores do Spark, então só vamos prometê-lo depois de testar. Um limite honesto para qualquer app: os extras de nuvem dele, como push pelos servidores do fabricante ou “Enviar depois”, deixam de funcionar nesta conta.'
      },
      {
        q: 'O que acontece no meu celular?',
        a: 'Você lê os e-mails selados no app ZeroMX, que mostra remetentes e assuntos reais nas notificações. Celulares não deixam o Bridge ficar rodando em segundo plano, então o app de e-mail nativo não pode ser usado. O app de celular chega com o beta público, e o alpha é só no computador. Preferimos dizer do que esconder.'
      },
      {
        q: 'Por que não usar o Proton?',
        a: 'O Proton é uma boa escolha se você está bem dentro dos apps e do armazenamento de uma única empresa. No ZeroMX as partes são separadas: você escolhe onde a caixa selada fica guardada, quais relays recebem seus e-mails e em qual app você lê, e pode trocar qualquer uma sem mudar de endereço. Remetente e assunto são selados junto com o corpo, em e-mails vindos de qualquer pessoa. E o plano é custar menos.'
      },
      {
        q: 'Eu perco a busca?',
        a: 'Não. A busca roda no seu aparelho, na sua própria cópia, com os operadores que você conhece do Gmail: from:, subject:, has:attachment, before:, label: e os outros. A busca do seu app de e-mail também funciona. Busca dentro de PDFs anexados vem depois. Um modelo de IA local opcional responde perguntas sobre seus e-mails sem eles saírem do seu computador.'
      },
      {
        q: 'Eu preciso confiar no ZeroMX?',
        a: 'Menos do que em um provedor de e-mail comum, mas não zero. No alpha a equipe opera os relays e publica os apps, e um relay tem os e-mails de remetentes externos em memória por um instante antes de selá-los. O plano para reduzir cada um desses pontos é público: builds reproduzíveis, relays atestados, operadores independentes, confiança dividida. O código é aberto, e você pode rodar um relay para o seu próprio domínio.'
      },
      {
        q: 'O que a Polkadot tem a ver com e-mail?',
        a: 'Menos do que parece, e preferimos ser exatos. A privacidade dos seus e-mails não depende de nenhuma blockchain, e nenhum e-mail vai para a blockchain. A Polkadot guarda uma coisa: o diretório público de chaves e relays, para que nenhuma empresa consiga alterá-lo em silêncio, nem nós. Você não precisa de carteira, de token nem do app Polkadot para usar o ZeroMX. Se você já usa o app Polkadot, estamos testando uma versão do ZeroMX que roda lá também.'
      },
      {
        q: 'Consigo sair?',
        a: 'Sim, e foi desenhado para ser fácil. Seus aparelhos têm uma cópia completa, e você pode exportá-la para formatos padrão a qualquer momento, sem pedir nada a nós. Aponte seu domínio para outro provedor e seu endereço vai junto.'
      },
      {
        q: 'E se eu perder meu aparelho?',
        a: 'Outro aparelho seu, ou o seu kit de recuperação impresso, restaura a chave. Sem um dos dois, ninguém consegue recuperar seus e-mails, nem nós.'
      },
      {
        q: 'Quanto vai custar?',
        a: 'O plano é US$ 3 por mês, com 10 GB de ZeroMX Storage, ou sem limite de tamanho se você usar o seu próprio bucket. Mais adiante, quem tem DOT poderá fazer stake em vez de pagar mensalidade, o que carrega o risco de preço do token. Um plano grátis para pessoas verificadas está planejado e depende de a prova de pessoa única da Polkadot poder ser usada pelos nossos apps.'
      }
    ],

    founder_kicker: 'Construído às claras',
    founder_title: 'Iniciado por Daniel Cukier',
    founder_bio: 'Engenheiro de sistemas baseado em Portugal, trabalhando em Polkadot JAM e infraestrutura de privacidade. Criando o ZeroMX para que uma caixa de e-mail privada seja algo que você possui, e não algo que você aluga dentro do app de uma empresa.',

    footer_text: 'Alpha privado em breve. Construído por Daniel Cukier em Portugal.',
    footer_built: 'Sem rastreadores. Sem cookies. Diretório público projetado para a Polkadot.'
  }
};
