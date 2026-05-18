// MFM Universe newsletter signup endpoint.
//
// Runs as a Vercel Serverless Function under /api/subscribe.
// POST { email: string, source?: string } → { ok: true } | { ok: false, error }
//
// Provider strategy:
//   1. If BEEHIIV_API_KEY + BEEHIIV_PUB_ID env vars are set → forward to beehiiv.
//   2. Else if RESEND_API_KEY is set → send a "new MFM Universe subscriber" mail to OWNER_EMAIL.
//   3. Always log the submission to function logs (visible in Vercel dashboard) so
//      no email is lost between launch and provider wire-up.
//
// The function NEVER tells the visitor a provider failed — we always show success
// and reconcile server-side. Email is the only data we store; no name, no consent
// is required (Vercel Analytics is cookieless and we treat opt-in as the submit).
//
// Future: swap step (1) for the chosen provider once Kyle has finalized the
// beehiiv publication ID. The form on the client doesn't need to change.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'kylenzhong@gmail.com';
const FROM_EMAIL  = process.env.FROM_EMAIL  || 'launch@mfmuniverse.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  let email = '';
  let source = 'unknown';
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    email  = String(body.email  || '').trim().toLowerCase();
    source = String(body.source || 'unknown').slice(0, 32);
  } catch (e) {
    return res.status(400).json({ ok: false, error: 'invalid_json' });
  }

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }

  const ip = (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() || 'unknown';
  const ua = (req.headers['user-agent'] || '').toString().slice(0, 200);
  const ts = new Date().toISOString();

  // Always log — this is the fallback "storage" until a provider is wired.
  // Vercel keeps function logs for ~1 hour on Hobby; pipe to a real sink later.
  console.log(JSON.stringify({ tag: 'mfm_subscribe', email, source, ip, ua, ts }));

  // 1. beehiiv (preferred path once env vars exist)
  if (process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUB_ID) {
    try {
      const r = await fetch(
        `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUB_ID}/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            reactivate_existing: false,
            send_welcome_email: true,
            utm_source: source,
            utm_medium: 'mfm_universe',
            utm_campaign: 'launch_w19',
          }),
        }
      );
      // beehiiv returns 201 for new, 200 for existing — both are success.
      if (r.ok) return res.status(200).json({ ok: true, provider: 'beehiiv' });
      console.warn('[mfm_subscribe] beehiiv non-ok', r.status, await r.text().catch(() => ''));
    } catch (e) {
      console.warn('[mfm_subscribe] beehiiv threw', e && e.message);
    }
  }

  // 2. Resend notification to owner (interim provider while beehiiv is unconfigured)
  if (process.env.RESEND_API_KEY) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [OWNER_EMAIL],
          subject: `[MFM Universe] new subscriber: ${email}`,
          text: `email:  ${email}\nsource: ${source}\nip:     ${ip}\nua:     ${ua}\nts:     ${ts}\n`,
        }),
      });
      if (r.ok) return res.status(200).json({ ok: true, provider: 'resend' });
      console.warn('[mfm_subscribe] resend non-ok', r.status, await r.text().catch(() => ''));
    } catch (e) {
      console.warn('[mfm_subscribe] resend threw', e && e.message);
    }
  }

  // 3. Log-only fallback — still a success from the visitor's POV.
  return res.status(200).json({ ok: true, provider: 'log' });
}
