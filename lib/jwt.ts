import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'docmaster_secret_key_2026';

export function signJwtToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwtToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
