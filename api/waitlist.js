/**
 * ZeroMX Waitlist Serverless Endpoint (Vercel Functions)
 * POST /api/waitlist
 *
 * Supports multi-step progressive capture without losing early signups:
 *   - stage: "signup"        -> Initial email capture (Step 1)
 *   - stage: "profile"       -> Optional setup preferences (Step 2)
 *   - stage: "wtp"           -> Founding-member willingness-to-pay reservation
 *   - stage: "investor"      -> Investor direct outreach with optional note
 *   - stage: "contributor"   -> Developer contributor inquiry with optional GitHub/note
 *
 * Persists leads to whichever durable backend is configured via Vercel Env Vars:
 *   1. Vercel KV / Upstash Redis (KV_REST_API_URL + KV_REST_API_TOKEN or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
 *   2. Private GitHub Repo Issues (GITHUB_TOKEN + WAITLIST_GITHUB_REPO — verifies repo is private before writing!)
 *   3. Generic Webhook — Slack / Discord / Telegram / n8n / Make (WAITLIST_WEBHOOK_URL)
 *   4. Resend Email Notification (RESEND_API_KEY + WAITLIST_NOTIFY_EMAIL)
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function sanitize(val, maxLen = 120) {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
}

function getRedisCreds() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ''), token };
}

async function saveToRedis(entry) {
  const creds = getRedisCreds();
  if (!creds) return false;

  const headers = {
    Authorization: `Bearer ${creds.token}`,
    'Content-Type': 'application/json'
  };

  // Merge with existing entry if this is a Step-2 profile/WTP update for the same email
  let merged = { ...entry };
  try {
    const existingRes = await fetch(`${creds.url}/hget/zeromx:waitlist:entries/${encodeURIComponent(entry.email)}`, {
      headers
    });
    if (existingRes.ok) {
      const existingJson = await existingRes.json();
      if (existingJson && typeof existingJson.result === 'string') {
        const prev = JSON.parse(existingJson.result);
        merged = {
          ...prev,
          ...Object.fromEntries(Object.entries(entry).filter(([, v]) => v !== '' && v !== 'unspecified')),
          createdAt: prev.createdAt || entry.timestamp,
          updatedAt: entry.timestamp
        };
      }
    }
  } catch (_) {
    // Non-fatal: fall back to writing fresh entry
  }

  const commands = [
    ['SADD', 'zeromx:waitlist:emails', entry.email],
    ['HSET', 'zeromx:waitlist:entries', entry.email, JSON.stringify(merged)],
    ['SCARD', 'zeromx:waitlist:emails']
  ];

  if (merged.willingToPay) {
    commands.push(['SADD', 'zeromx:waitlist:wtp', entry.email]);
  }
  if (entry.stage === 'investor' || merged.planInterest === 'invest') {
    commands.push(['SADD', 'zeromx:waitlist:investors', entry.email]);
  }

  const pipelineRes = await fetch(`${creds.url}/pipeline`, {
    method: 'POST',
    headers,
    body: JSON.stringify(commands)
  });

  if (!pipelineRes.ok) {
    throw new Error(`Redis error: ${pipelineRes.status}`);
  }
  const data = await pipelineRes.json();
  const count = Array.isArray(data) && data[2] && typeof data[2].result === 'number'
    ? data[2].result
    : null;
  return { persisted: true, count };
}

async function saveToPrivateGithubRepo(entry) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.WAITLIST_GITHUB_REPO;
  if (!token || !repo) return false;

  const ghHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'User-Agent': 'ZeroMX-Waitlist'
  };

  // Privacy guardrail: NEVER post user emails into a public repository
  const repoCheck = await fetch(`https://api.github.com/repos/${repo}`, { headers: ghHeaders });
  if (!repoCheck.ok) {
    throw new Error(`GitHub repo check failed: ${repoCheck.status}`);
  }
  const repoMeta = await repoCheck.json();
  if (!repoMeta.private) {
    throw new Error('Refusing to write waitlist PII to a non-private GitHub repository');
  }

  const tag = entry.stage === 'wtp'
    ? 'Waitlist WTP'
    : entry.stage === 'investor'
    ? 'Investor'
    : entry.stage === 'contributor'
    ? 'Developer'
    : entry.stage === 'profile'
    ? 'Waitlist Update'
    : 'Waitlist';

  const issueRes = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'POST',
    headers: ghHeaders,
    body: JSON.stringify({
      title: `[${tag}] ${entry.email} (${entry.planInterest || entry.stage})`,
      labels: ['waitlist'],
      body: [
        `### ZeroMX ${tag}`,
        '',
        '| Field | Value |',
        '| :--- | :--- |',
        `| **Email** | \`${entry.email}\` |`,
        `| **Stage** | \`${entry.stage}\` |`,
        `| **Current Provider** | \`${entry.provider || 'unspecified'}\` |`,
        `| **Reads Mail In** | \`${entry.mailClient || 'unspecified'}\` |`,
        `| **Owns Custom Domain** | \`${entry.ownsDomain || 'unspecified'}\` |`,
        `| **Interest** | \`${entry.planInterest || 'unspecified'}\` |`,
        `| **Willingness To Pay** | \`${entry.willingToPay || 'none'}\` |`,
        `| **Note / Handle** | ${entry.note ? `\`${entry.note}\`` : '—'} |`,
        `| **Source / Referrer** | \`${entry.referrer || 'direct'}\` |`,
        `| **Locale** | \`${entry.lang}\` |`,
        `| **Timestamp** | \`${entry.timestamp}\` |`
      ].join('\n')
    })
  });

  if (!issueRes.ok) {
    throw new Error(`GitHub issue creation failed: ${issueRes.status}`);
  }
  return { persisted: true };
}

async function sendWebhook(entry) {
  const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const prefix = entry.stage === 'wtp'
    ? '💰 **ZeroMX Founding Deposit Intent**'
    : entry.stage === 'investor'
    ? '🏦 **ZeroMX Investor Inquiry**'
    : entry.stage === 'contributor'
    ? '🛠️ **ZeroMX Developer Inquiry**'
    : entry.stage === 'profile'
    ? '🧩 **ZeroMX Profile Updated**'
    : '✉️ **ZeroMX Waitlist Signup**';

  const parts = [
    `${prefix}: \`${entry.email}\``,
    entry.provider && entry.provider !== 'unspecified' ? `Provider: \`${entry.provider}\`` : null,
    entry.mailClient && entry.mailClient !== 'unspecified' ? `Client: \`${entry.mailClient}\`` : null,
    entry.ownsDomain && entry.ownsDomain !== 'unspecified' ? `Domain: \`${entry.ownsDomain}\`` : null,
    entry.planInterest && entry.planInterest !== 'unspecified' ? `Interest: \`${entry.planInterest}\`` : null,
    entry.willingToPay ? `WTP: \`${entry.willingToPay}\`` : null,
    entry.note ? `Note: ${entry.note}` : null
  ].filter(Boolean);

  const summary = parts.join(' | ');
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: summary,
      content: summary,
      ...entry
    })
  });

  if (!res.ok) {
    throw new Error(`Webhook error: ${res.status}`);
  }
  return { persisted: true };
}

async function sendResendEmail(entry) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.WAITLIST_NOTIFY_EMAIL;
  if (!apiKey || !notifyEmail) return false;

  const fromEmail = process.env.WAITLIST_FROM_EMAIL || 'ZeroMX Waitlist <onboarding@resend.dev>';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notifyEmail],
      subject: `[ZeroMX ${entry.stage}] ${entry.email}`,
      text: JSON.stringify(entry, null, 2)
    })
  });

  if (!res.ok) {
    throw new Error(`Resend error: ${res.status}`);
  }
  return { persisted: true };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    // Honeypot anti-bot check: silently succeed without storing
    if (body.website_url) {
      return res.status(200).json({ ok: true });
    }

    const email = sanitize(body.email, 160).toLowerCase();
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email address' });
    }

    const validStages = new Set(['signup', 'profile', 'wtp', 'investor', 'contributor']);
    const rawStage = sanitize(body.stage || 'signup', 24);
    const stage = validStages.has(rawStage) ? rawStage : 'signup';

    const entry = {
      email,
      stage,
      provider: sanitize(body.provider || 'unspecified', 40),
      mailClient: sanitize(body.mailClient || 'unspecified', 40),
      ownsDomain: sanitize(body.ownsDomain || 'unspecified', 20),
      planInterest: sanitize(body.planInterest || 'unspecified', 40),
      willingToPay: sanitize(body.willingToPay || '', 40),
      note: sanitize(body.note || '', 400),
      lang: sanitize(body.lang || 'en', 10),
      referrer: sanitize(body.referrer || '', 200),
      timestamp: new Date().toISOString()
    };

    console.log('[ZEROMX_WAITLIST]', JSON.stringify(entry));

    const results = await Promise.allSettled([
      saveToRedis(entry),
      saveToPrivateGithubRepo(entry),
      sendWebhook(entry),
      sendResendEmail(entry)
    ]);

    let durablePersisted = false;
    let totalCount = null;

    for (const r of results) {
      if (r.status === 'fulfilled' && r.value && r.value.persisted) {
        durablePersisted = true;
        if (typeof r.value.count === 'number') {
          totalCount = r.value.count;
        }
      } else if (r.status === 'rejected') {
        console.error('[ZEROMX_WAITLIST_BACKEND_ERROR]', r.reason?.message || r.reason);
      }
    }

    // Runtime logs expire, so they are not a waitlist. If no durable backend accepted
    // the entry, return 503 instead of confirming a signup that was never stored.
    if (!durablePersisted) {
      console.error('[ZEROMX_WAITLIST_NOT_PERSISTED] No durable backend stored this entry.');
      return res.status(503).json({ ok: false, error: 'Waitlist storage unavailable' });
    }

    return res.status(200).json({
      ok: true,
      durablePersisted,
      totalCount
    });
  } catch (err) {
    console.error('[ZEROMX_WAITLIST_FATAL]', err);
    return res.status(400).json({ ok: false, error: 'Malformed request payload' });
  }
};
