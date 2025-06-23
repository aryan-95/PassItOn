import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { Otp } from '@/models/Otp';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, password, otp } = await req.json();

  const existing = await Otp.findOne({ email });
  if (!existing || existing.otp !== otp || existing.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
  }

  const alreadyUser = await User.findOne({ email });
  if (alreadyUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed });
  await Otp.deleteOne({ email });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });

  const res = NextResponse.json({ success: true });
  res.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
