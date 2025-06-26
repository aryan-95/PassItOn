// @ts-nocheck
import { connectToDatabase } from '@/lib/db';
import { Product } from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  try {
    await connectToDatabase();

    const { category } = await context.params; // ✅ await here

    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') },
    }).sort({ createdAt: -1 });

    return NextResponse.json({ products });
  } catch (err) {
    console.error('Error fetching products:', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
