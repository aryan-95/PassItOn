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
    pathname.startsWith('/api') || // ⬅️ Skip APIs from middleware
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname === '/';

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!token) {
    console.warn('⛔ No token, redirecting...');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const isValid = await verifyJWT(token);

  if (!isValid) {
    console.warn('❌ Invalid token, redirecting...');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  console.log('✅ Authenticated:', isValid);
  return NextResponse.next();
}
