
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import ChatModal from '@/components/ChatModal';

interface ChatSummary {
  _id: string;
  productId: {
    _id: string;
    title: string;
    image: string;
    price: string;
  };
  buyerEmail: string;
  sellerEmail: string;
  messages: Array<{
    sender: string;
    message: string;
    timestamp: string;
  }>;
  lastMessage?: {
    sender: string;
    message: string;
    timestamp: string;
  };
}

export default function ChatsPage() {
  const router = useRouter();
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [selectedChat, setSelectedChat] = useState<ChatSummary | null>(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setCurrentUserEmail(data.user.email);
        fetchChats(data.user.email);
      } else {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      router.push('/auth/login');
    }
  };

  const fetchChats = async (userEmail: string) => {
    try {
      const response = await fetch(`/api/chat/user-chats?email=${userEmail}`);
      const data = await response.json();
      
      if (data.success) {
        setChats(data.chats || []);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7ed] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B3DF6]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7ed] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-[#5B3DF6]" />
          </button>
          <h1 className="text-3xl font-black text-[#5B3DF6]">Your Chats</h1>
        </div>

        {chats.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle size={64} className="text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-600 mb-2">No chats yet</h2>
            <p className="text-gray-500">Start browsing products to begin conversations!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {chats.map((chat) => (
              <motion.div
                key={chat._id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 shadow-lg border-2 border-[#E0D5FA] cursor-pointer"
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={chat.productId.image}
                    alt={chat.productId.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-[#5B3DF6] mb-1">{chat.productId.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">₹{chat.productId.price}</p>
                    <p className="text-sm text-gray-500">
                      Chat with: {currentUserEmail === chat.buyerEmail ? chat.sellerEmail : chat.buyerEmail}
                    </p>
                    {chat.lastMessage && (
                      <p className="text-sm text-gray-400 mt-1">
                        Last: {chat.lastMessage.message.substring(0, 50)}...
                      </p>
                    )}
                  </div>
                  <MessageCircle className="text-[#5B3DF6]" size={24} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {selectedChat && (
        <ChatModal
          isOpen={!!selectedChat}
          onClose={() => setSelectedChat(null)}
          productId={selectedChat.productId._id}
          buyerEmail={selectedChat.buyerEmail}
          sellerEmail={selectedChat.sellerEmail}
          currentUserEmail={currentUserEmail}
          productTitle={selectedChat.productId.title}
        />
      )}
    </div>
  );
}
