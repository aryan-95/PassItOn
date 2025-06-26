import { connectToDatabase } from '@/lib/db';
import { Product } from '@/models/Product';
import { User } from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectToDatabase();

  const cookieStore = await cookies();
  // @ts-ignore
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET || 'secret-key');
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }

  const userId = payload.userId; 
  console.log('User ID from token:', userId);

  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const data = await req.json();

  const product = await Product.create({
    ...data,
    userId: user._id, // ✅ store ref
  });

  return NextResponse.json({ success: true, product });
}
