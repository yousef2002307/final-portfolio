// api/log-visit.js
// Vercel Serverless Function — runs on the server, never exposed to the browser.
// Reads visitor info from Vercel's built-in headers and forwards a Telegram notification.

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel injects these headers automatically — no third-party IP service needed
  const ip        = req.headers['x-forwarded-for']     || 'Unknown';
  const country   = req.headers['x-vercel-ip-country'] || 'Unknown';
  const city      = req.headers['x-vercel-ip-city']    || 'Unknown';
  const userAgent = req.headers['user-agent']           || 'Unknown';

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId   = process.env.TELEGRAM_CHAT_ID;

  const message =
    `🚨 زائر جديد على البورتفوليو!\n\n` +
    `📍 الدولة: ${decodeURIComponent(country)}\n` +
    `🏙️ المدينة: ${decodeURIComponent(city)}\n` +
    `🌐 الـ IP: ${ip}\n` +
    `💻 الجهاز/المتصفح: ${userAgent}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send telegram message' });
  }
}
