import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';

export const runtime = 'nodejs'; // ✅ Important: avoid Edge runtime issues

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  const res = NextResponse.json({ success: true });

  res.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
