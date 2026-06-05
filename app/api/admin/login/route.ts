import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/lib/models/AdminUser';
import { verifyPassword, signAdminToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'Username and password required' }, { status: 400 });
    }

    const admin = await AdminUser.findOne({ username });
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signAdminToken({ id: admin._id.toString(), username: admin.username });

    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}
