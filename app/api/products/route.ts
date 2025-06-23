import { connectToDatabase } from '@/lib/db';
import { Product } from '@/models/Product';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectToDatabase();

  const cookieStore = cookies();
  //@ts-ignore
  const token = cookieStore.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    jwt.verify(token, process.env.JWT_SECRET || 'secret-key');
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }

  const data = await req.json();
  const product = await Product.create(data);
  return NextResponse.json({ success: true, product });
}
