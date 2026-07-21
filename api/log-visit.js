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

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId   = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return res.status(500).json({ error: 'Missing env vars' });
  }

  // ── Detect device type from User-Agent ─────────────────────────────────────
  const isMobile  = /Mobi|Android|iPhone|iPad/i.test(ua);
  const isTablet  = /iPad|Tablet/i.test(ua);
  const deviceType = isTablet ? '📱 Tablet' : isMobile ? '📱 Mobile' : '🖥️ Desktop';

  // ── Google Maps link if coordinates available ──────────────────────────────
  const mapsLink = lat && lon
    ? `\n🗺️ Maps: https://maps.google.com/?q=${lat},${lon}`
    : '';

  // ── Format timestamp (UTC) ─────────────────────────────────────────────────
  const now = new Date().toUTCString();

  const message = [
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
