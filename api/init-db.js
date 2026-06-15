import { Pool } from 'pg';

export default async function handler(request, response) {
  // Try common Vercel/Supabase environment variable names
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.SUPABASE_DATABASE_URL;

  if (!connectionString) {
    return response.status(500).json({ error: 'Database connection string (POSTGRES_URL or DATABASE_URL) is missing from Vercel Environment Variables.' });
  }

  // Bypass strict TLS verification for Supabase connection issues
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const result = await pool.query(`
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
    `);
    
    // Create an index on ip_address and visited_at for faster anti-spam queries
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_visitors_ip_time ON visitors(ip_address, visited_at DESC);
    `);

    return response.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Init DB Error:', error);
    return response.status(500).json({ error: error.message });
  } finally {
    await pool.end();
  }
}
