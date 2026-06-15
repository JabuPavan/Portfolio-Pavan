import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.SUPABASE_DATABASE_URL;

  if (!connectionString) {
    return res.status(500).json({ error: 'Database connection string is missing.' });
  }

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

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

    // Anti-spam 2: Prevent duplicate notifications within 1 minute (for easier testing)
    const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000).toISOString();
    
    // Check for recent visits from the same IP
    const recentCheck = await pool.query(
      `SELECT 1 FROM visitors WHERE ip_address = $1 AND visited_at >= $2 LIMIT 1`,
      [ip_address, oneMinuteAgo]
    );

    if (recentCheck.rowCount > 0) {
      return res.status(200).json({ message: 'Duplicate visit ignored' });
    }

    const id = uuidv4();
    
    // Save to Database
    await pool.query(
      `INSERT INTO visitors (id, ip_address, country, state, city, device_type, browser, os, referrer, landing_page)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [id, ip_address, country, state, city, device_type, browser, os, referrer, landing_page]
    );

    // Send Telegram Notification using hardcoded fallbacks in case Vercel variables are missing
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8468672722:AAG3q-wfhMcqF9ExQZBRWGb5V8aLTmiOu7U';
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8671853806';

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
  } finally {
    await pool.end();
  }
}
