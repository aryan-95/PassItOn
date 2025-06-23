import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { connectToDatabase } from '@/lib/db';
import { Otp } from '@/models/Otp';

const resend = new Resend(process.env.RESEND_API_KEY);

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

  try {
    await resend.emails.send({
      from: 'Pass It On <onboarding@resend.dev>'  , // ✅ works in dev mode

      to: "dhruv.2428it383@kiet.edu",
      subject: 'Your OTP for Pass It On',
      html: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Email sending failed' }, { status: 500 });
  }
}
