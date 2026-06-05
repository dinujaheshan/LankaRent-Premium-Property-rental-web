import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = 'lankarent_admin_token';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signAdminToken(payload: { id: string; username: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

export function verifyAdminToken(token: string): { id: string; username: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; username: string };
  } catch {
    return null;
  }
}

export function getAdminSession(): { id: string; username: string } | null {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export { COOKIE_NAME };
