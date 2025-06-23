import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const user = await User.create({ email, password: hashed });
    return NextResponse.json({ message: 'User created', user });
  } catch (err) {
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
