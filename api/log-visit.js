// api/log-visit.js
// Vercel Serverless Function — runs server-side only. Token never exposed to browser.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Server-side data (Vercel injects these automatically) ──────────────────
  const ip       = req.headers['x-forwarded-for']          || 'Unknown';
  const country  = req.headers['x-vercel-ip-country']      || 'Unknown';
  const region   = req.headers['x-vercel-ip-country-region']|| 'Unknown';
  const city     = req.headers['x-vercel-ip-city']         || 'Unknown';
  const timezone = req.headers['x-vercel-ip-timezone']     || 'Unknown';
  const lat      = req.headers['x-vercel-ip-latitude']     || '';
  const lon      = req.headers['x-vercel-ip-longitude']    || '';
  const ua       = req.headers['user-agent']               || 'Unknown';
  const referer  = req.headers['referer']                  || 'Direct';

  // ── Client-side data sent in POST body ─────────────────────────────────────
  let client = {};
  try { client = await req.json(); } catch (_) {}

  // ── Extract 'ec' URL parameter if present ──────────────────────────────────
  let ecParam = req.query?.ec || client.ec || null;
  if (!ecParam && (client.url || referer)) {
    try {
      const sourceUrl = client.url || (referer !== 'Direct' ? referer : '');
      if (sourceUrl) {
        const parsed = new URL(sourceUrl, 'http://localhost');
        ecParam = parsed.searchParams.get('ec');
      }
    } catch (_) {}
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId   = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return res.status(500).json({ error: 'Missing env vars' });
  }

  // ── Detect device type & LinkedIn App from User-Agent / Referer ───────────
  const isLinkedIn = /LinkedIn/i.test(ua) || /linkedin|lnkd\.in/i.test(referer) || /linkedin/i.test(client.referrer || '');
  const isMobile  = /Mobi|Android|iPhone|iPad/i.test(ua);
  const isTablet  = /iPad|Tablet/i.test(ua);
  let deviceType  = isTablet ? '📱 Tablet' : isMobile ? '📱 Mobile' : '🖥️ Desktop';
  if (isLinkedIn) {
    deviceType += ' (LinkedIn App 💼)';
  }

  // ── Google Maps link if coordinates available ──────────────────────────────
  const mapsLink = lat && lon
    ? `\n🗺️ Maps: https://maps.google.com/?q=${lat},${lon}`
    : '';

  // ── Format timestamp (UTC) ─────────────────────────────────────────────────
  const now = new Date().toUTCString();

  const ecHeader = ecParam ? [
    `🏢 🔥 *[ ${ecParam} HAS ENTERED! ]* 🔥 🏢`,
    ''
  ] : [];

  const message = [
    ...ecHeader,
    '🚨 *زائر جديد على البورتفوليو!*',
    '',
    '📍 *الموقع*',
    `   🌍 الدولة:   ${decodeURIComponent(country)} (${region})`,
    `   🏙️ المدينة:  ${decodeURIComponent(city)}`,
    `   🕐 التوقيت:  ${decodeURIComponent(timezone)}`,
    `   🌐 الـ IP:    ${ip}`,
    mapsLink,
    '',
    `${deviceType} *الجهاز*`,
    `   💻 النوع:    ${deviceType}`,
    `   📺 الشاشة:   ${client.screen    || 'Unknown'}`,
    `   🪟 Viewport:  ${client.viewport  || 'Unknown'}`,
    `   🖥️ Platform:  ${client.platform  || 'Unknown'}`,
    `   👆 Touch:     ${client.touch     || 'Unknown'}`,
    '',
    '🌐 *المتصفح*',
    `   🗣️ اللغة:    ${client.language  || 'Unknown'}`,
    `   ⚡ الاتصال:  ${client.connection || 'Unknown'}`,
    `   🍪 Cookies:   ${client.cookieEnabled || 'Unknown'}`,
    `   🔗 Referrer:  ${client.referrer || referer}`,
    '',
    '🕰️ *التوقيت*',
    `   📅 ${now}`,
  ].join('\n');

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const tgData = await tgRes.json();
    if (!tgRes.ok) return res.status(500).json({ error: 'Telegram error', details: tgData });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
