import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { device_type, browser, os, referrer, landing_page } = req.body;

    // Extract visitor details from Vercel headers
    const ip_address = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'Unknown IP';
    const country = req.headers['x-vercel-ip-country'] || 'Unknown';
    const state = req.headers['x-vercel-ip-country-region'] || 'Unknown';
    const city = req.headers['x-vercel-ip-city'] || 'Unknown';

    // Anti-spam 1: Ignore own IP
    const IGNORE_IP = process.env.IGNORE_IP;
    if (IGNORE_IP && ip_address === IGNORE_IP) {
      return res.status(200).json({ message: 'Ignored IP' });
    }

    // Anti-spam 2: Prevent duplicate notifications within 30 minutes
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    
    // Check for recent visits from the same IP
    const { rowCount } = await sql`
      SELECT 1 FROM visitors 
      WHERE ip_address = ${ip_address} 
      AND visited_at >= ${thirtyMinutesAgo}
      LIMIT 1
    `;

    if (rowCount > 0) {
      return res.status(200).json({ message: 'Duplicate visit ignored' });
    }

    const id = uuidv4();
    
    // Save to Database
    await sql`
      INSERT INTO visitors (id, ip_address, country, state, city, device_type, browser, os, referrer, landing_page)
      VALUES (${id}, ${ip_address}, ${country}, ${state}, ${city}, ${device_type}, ${browser}, ${os}, ${referrer}, ${landing_page})
    `;

    // Send Telegram Notification
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const message = `
🚀 *New Portfolio Visitor*

🌍 Country: ${country}
📍 State: ${state}
🏙️ City: ${city}

💻 Device: ${device_type}
🌐 Browser: ${browser}
🖥️ OS: ${os}

🔗 Source: ${referrer}
📄 Page: ${landing_page}

🕒 Time: ${new Date().toISOString()}
      `.trim();

      const tgUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      await fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
