import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

// Function to verify JWT token
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

  // Public paths (do not require authentication)
  const isPublicPath =
    pathname === '/' ||                         // ✅ Public: landing page
    pathname.startsWith('/auth') ||            // ✅ Public: login/signup
    pathname.startsWith('/api') ||             // ✅ Public: APIs (protect sensitive ones manually)
    pathname.startsWith('/_next') ||           // ✅ Public: Next.js assets
    pathname.startsWith('/favicon');           // ✅ Public: favicon

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Redirect if token is missing
  if (!token) {
    console.log('⛔ No token found');
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // Verify token
  const payload = await verifyJWT(token);

  if (!payload) {
    console.log('❌ Invalid token');
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // Allow access if token is valid
  console.log('✅ Authenticated:', payload);
  return NextResponse.next();
}

// Match all routes except static files like images, styles, etc.
export const config = {
  matcher: [
    /*
      This matches everything except:
      - _next/static (Next.js build files)
      - _next/image (Next.js image optimization)
      - favicon.ico (site icon)
    */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
