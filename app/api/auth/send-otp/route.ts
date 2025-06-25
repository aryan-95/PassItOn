import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Otp } from '@/models/Otp';

export async function POST(req: Request) {
  await connectToDatabase();
  const { email } = await req.json();

  if (!email.endsWith('@kiet.edu')) {
    return NextResponse.json({ error: 'Only @kiet.edu emails allowed' }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await Otp.findOneAndUpdate(
    { email },
    { otp, expiresAt },
    { upsert: true, new: true }
  );

  // ✅ Return the OTP to frontend for client-side email sending
  return NextResponse.json({ success: true, otp });
}
