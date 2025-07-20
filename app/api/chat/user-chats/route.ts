
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Chat } from '@/models/Chat';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const chats = await Chat.find({
      $or: [
        { buyerEmail: email },
        { sellerEmail: email }
      ]
    })
    .populate('productId', 'title image price')
    .sort({ 'messages.timestamp': -1 });

    // Add lastMessage to each chat
    const chatsWithLastMessage = chats.map(chat => ({
      ...chat.toObject(),
      lastMessage: chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null
    }));

    return NextResponse.json({ success: true, chats: chatsWithLastMessage });
  } catch (error) {
    console.error('Error fetching user chats:', error);
    return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 });
  }
}
