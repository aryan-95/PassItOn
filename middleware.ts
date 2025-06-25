import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

async function verifyJWT(token: string) {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  const isPublicPath =
    pathname.startsWith('/auth') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon');

  if (isPublicPath) return NextResponse.next();

  if (!token) {
    console.log('⛔ No token');
    return NextResponse.redirect(new URL('/auth/', request.url));
  }

  const payload = await verifyJWT(token);

  if (!payload) {
    console.log('❌ Invalid token');
    return NextResponse.redirect(new URL('/auth/', request.url));
  }

  console.log('✅ Authenticated:', payload);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/choose-role',
    '/buyer/:path*',
    '/seller/:path*',
    '/product/:path*',
    '/post',
  ],
};
