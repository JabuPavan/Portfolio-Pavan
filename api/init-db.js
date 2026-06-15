import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS visitors (
        id UUID PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        country VARCHAR(100),
        state VARCHAR(100),
        city VARCHAR(100),
        device_type VARCHAR(50),
        browser VARCHAR(100),
        os VARCHAR(100),
        referrer TEXT,
        landing_page TEXT,
        visited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Create an index on ip_address and visited_at for faster anti-spam queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_visitors_ip_time ON visitors(ip_address, visited_at DESC);
    `;

    return response.status(200).json({ message: 'Database initialized successfully', result });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
