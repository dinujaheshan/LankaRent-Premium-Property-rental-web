import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'lankarent_admin_token';
const JWT_SECRET = process.env.JWT_SECRET || 'LankaRent_Super_Secret_JWT_Key_2024_Secure';

async function verifyAdminTokenEdge(token: string): Promise<boolean> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const [headerB64, payloadB64, signatureB64] = parts;

    // Decode and verify expiration timestamp
    const payloadStr = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadStr);
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return false;
    }

    // Verify signature using the Edge-compatible Web Crypto API
    const encoder = new TextEncoder();
    const keyData = encoder.encode(JWT_SECRET);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const data = encoder.encode(`${headerB64}.${payloadB64}`);
    const signatureBin = Uint8Array.from(
      atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/')),
      c => c.charCodeAt(0)
    );

    return await crypto.subtle.verify('HMAC', key, signatureBin, data);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await verifyAdminTokenEdge(token))) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
