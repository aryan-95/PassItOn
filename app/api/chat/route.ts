
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Chat } from '@/models/Chat';
import { Product } from '@/models/Product';

// GET - Fetch chat messages for a product and users
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    const buyerEmail = searchParams.get('buyerEmail');
    const sellerEmail = searchParams.get('sellerEmail');

    if (!productId || !buyerEmail || !sellerEmail) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    let chat = await Chat.findOne({
      productId,
      buyerEmail,
      sellerEmail
    });

    if (!chat) {
      // Create new chat if it doesn't exist
      chat = await Chat.create({
        productId,
        buyerEmail,
        sellerEmail,
        messages: []
      });
    }

    return NextResponse.json({ success: true, chat });
  } catch (error) {
    console.error('Error fetching chat:', error);
    return NextResponse.json({ error: 'Failed to fetch chat' }, { status: 500 });
  }
}

// POST - Send a new message
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const { productId, buyerEmail, sellerEmail, sender, message } = await req.json();

    if (!productId || !buyerEmail || !sellerEmail || !sender || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    let chat = await Chat.findOne({
      productId,
      buyerEmail,
      sellerEmail
    });

    if (!chat) {
      chat = await Chat.create({
        productId,
        buyerEmail,
        sellerEmail,
        messages: []
      });
    }

    // Add the new message
    chat.messages.push({
      sender,
      message,
      timestamp: new Date()
    });

    await chat.save();

    return NextResponse.json({ success: true, chat });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
