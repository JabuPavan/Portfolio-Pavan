import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // To secure this API, we could pass a token or verify a cookie.
  // For basic protection in this portfolio, we'll keep it simple,
  // but you can add a secret header check here if needed.

  try {
    // 1. Total & Unique Visitors
    const totalVisitorsRes = await sql`SELECT COUNT(*) as count FROM visitors`;
    const uniqueVisitorsRes = await sql`SELECT COUNT(DISTINCT ip_address) as count FROM visitors`;

    // 2. Visitors Today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayRes = await sql`SELECT COUNT(*) as count FROM visitors WHERE visited_at >= ${today.toISOString()}`;

    // 3. Device Breakdown
    const deviceRes = await sql`
      SELECT device_type as name, COUNT(*) as value 
      FROM visitors 
      GROUP BY device_type
    `;

    // 4. Top Countries
    const countryRes = await sql`
      SELECT country as name, COUNT(*) as value 
      FROM visitors 
      WHERE country IS NOT NULL AND country != 'Unknown'
      GROUP BY country 
      ORDER BY value DESC 
      LIMIT 5
    `;

    // 5. Recent Visitors (for the table)
    const recentRes = await sql`
      SELECT id, ip_address, country, city, device_type, browser, os, referrer, visited_at
      FROM visitors
      ORDER BY visited_at DESC
      LIMIT 15
    `;

    // 6. Traffic over time (Last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const trafficRes = await sql`
      SELECT DATE(visited_at) as date, COUNT(*) as visits
      FROM visitors
      WHERE visited_at >= ${sevenDaysAgo}
      GROUP BY DATE(visited_at)
      ORDER BY DATE(visited_at) ASC
    `;

    res.status(200).json({
      total: parseInt(totalVisitorsRes.rows[0].count),
      unique: parseInt(uniqueVisitorsRes.rows[0].count),
      today: parseInt(todayRes.rows[0].count),
      devices: deviceRes.rows.map(r => ({ ...r, value: parseInt(r.value) })),
      countries: countryRes.rows.map(r => ({ ...r, value: parseInt(r.value) })),
      recent: recentRes.rows,
      traffic: trafficRes.rows.map(r => ({ 
        date: new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
        visits: parseInt(r.visits) 
      }))
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
