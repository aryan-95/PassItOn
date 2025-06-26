import { connectToDatabase } from '@/lib/db';
import { Product } from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const url = new URL(request.url);
    const pathname = url.pathname; // e.g., /api/products/category/books
    const parts = pathname.split('/');
    const category = parts[parts.length - 1]; // "books"

    if (!category) {
      return NextResponse.json({ error: 'Category missing' }, { status: 400 });
    }

    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') },
    })
      .select('title image price college category email phone')
      .sort({ createdAt: -1 });

    return NextResponse.json({ products });
  } catch (err) {
    console.error('Error fetching products:', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
