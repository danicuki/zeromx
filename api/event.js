/**
 * ZeroMX Privacy-First Aggregate Funnel Counter (Vercel Functions)
 * POST /api/event
 *
 * Counts anonymous aggregate funnel events (no cookies, no IP addresses, no fingerprinting,
 * no third-party scripts). Stores daily counts in Redis if KV/Upstash is configured,
 * and always emits a structured log line so conversion funnels are measurable.
 */

const ALLOWED_EVENTS = new Set([
  'pageview',
  'investor_pageview',
  'lens_drag',
  'demo_provider_view',
  'demo_compose',
  'waitlist_open',
  'waitlist_submit',
  'waitlist_profile',
  'wtp_founding_click',
  'investor_submit',
  'contributor_submit'
]);

function sanitizeToken(val, maxLen = 64) {
  if (typeof val !== 'string') return 'direct';
  const clean = val.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '').slice(0, maxLen);
  return clean || 'direct';
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const event = typeof body.event === 'string' ? body.event.trim() : '';
    if (!ALLOWED_EVENTS.has(event)) {
      return res.status(400).json({ ok: false, error: 'Invalid event' });
    }

    const source = sanitizeToken(body.source || 'direct');
    const day = new Date().toISOString().slice(0, 10);

    console.log('[ZEROMX_EVENT]', JSON.stringify({ day, event, source }));

    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    if (url && token) {
      const commands = [
        ['HINCRBY', `zeromx:funnel:${day}`, event, 1],
        ['HINCRBY', 'zeromx:funnel:total', event, 1]
      ];
      if (event === 'pageview' || event === 'investor_pageview') {
        commands.push(['HINCRBY', `zeromx:sources:${day}`, source, 1]);
        commands.push(['HINCRBY', 'zeromx:sources:total', source, 1]);
      }

      await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commands)
      }).catch(() => {});
    }

    return res.status(200).json({ ok: true });
  } catch (_) {
    return res.status(400).json({ ok: false });
  }
};
