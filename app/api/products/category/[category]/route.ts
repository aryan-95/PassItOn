import { connectToDatabase } from '@/lib/db';
import { Product } from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { category: string } }) {
  try {
    await connectToDatabase();

    const products = await Product.find({
      category: { $regex: new RegExp(`^${params.category}$`, 'i') },
    }).sort({ createdAt: -1 });

    return NextResponse.json({ products });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
