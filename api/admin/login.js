export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

  // Use .trim() to prevent issues with trailing spaces accidentally copied into Vercel
  if (password?.trim() === ADMIN_PASSWORD.trim() && ADMIN_PASSWORD.trim() !== '') {
    return res.status(200).json({ success: true });
  } else {
    // Return a hint in the error if the password is completely empty in Vercel
    if (ADMIN_PASSWORD.trim() === '') {
      return res.status(401).json({ error: 'Server error: Password not set in Vercel' });
    }
    return res.status(401).json({ error: 'Invalid password' });
  }
}
