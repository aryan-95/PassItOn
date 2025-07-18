// app/api/wishlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Wishlist } from '@/models/Wishlist'; // You'll need to create this model

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { item, details } = await req.json();

  if (!item) {
    return NextResponse.json({ error: 'Item name is required' }, { status: 400 });
  }

  const wish = await Wishlist.create({ item, details });
  return NextResponse.json({ success: true, wish });
}
