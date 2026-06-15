export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  // Fallback to Pavan@624 so the user is never locked out due to Vercel env var issues
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Pavan@624';

  // Use .trim() to prevent issues with trailing spaces
  if (password?.trim() === ADMIN_PASSWORD.trim()) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ error: 'Invalid password' });
  }
}
