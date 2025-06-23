import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

async function verifyJWT(token: string) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isPublic =
    pathname.startsWith('/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon');

  if (isPublic) return NextResponse.next();

  if (!token) {
    console.log('⛔ No token');
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  const payload = await verifyJWT(token);

  if (!payload) {
    console.log('❌ Invalid token (jose)');
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  console.log('✅ Token OK:', payload);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/choose-role',
    '/buyer/:path*',
    '/seller/:path*',
    '/product/:path*',
  ],
};
