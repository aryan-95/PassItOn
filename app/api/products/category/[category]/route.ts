import { connectToDatabase } from '@/lib/db';
import { Product } from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    await connectToDatabase();

    const category = params.category;

    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') },
    })
      .select('title image price college category email phone')
      .sort({ createdAt: -1 });

    return NextResponse.json({ products });
  } catch (err) {
    console.error('Error fetching products:', err);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
