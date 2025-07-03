'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { LogoutButton } from '@/components/LogoutButton';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-black via-zinc-900 to-black overflow-hidden">
      
      {/* Logout Button */}
      <div className="absolute top-4 right-6">
        <LogoutButton />
      </div>

      {/* Logo with glow and bounce */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/logo.png"
          alt="Startup Logo"
          width={120}
          height={120}
          className="mx-auto rounded-full shadow-lg shadow-green-500/40 hover:scale-105 transition-transform"
        />
      </motion.div>

      {/* Title with celebration */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-[0_0_15px_rgba(0,255,150,0.6)]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🎉 Pass It On
      </motion.h1>

      {/* Subtext and vibe */}
      <motion.p
        className="text-lg md:text-xl max-w-xl text-zinc-300 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Helping students declutter and find essentials. Buy or sell used items within your hostel or college – seamlessly.
      </motion.p>

      {/* Quote */}
      <p className="text-sm text-white font-medium italic mb-6 animate-pulse">
        Your <span className="text-green-400 font-semibold">extras</span> are someone's <span className="text-green-400 font-semibold">essentials</span> 🚀
      </p>

      {/* 👇 Marquee Advertisement Section */}
      <div className="w-full overflow-hidden whitespace-nowrap border-t border-b border-green-500 my-4 py-2 bg-black">
        <motion.div
          className="inline-block text-green-400 font-semibold text-sm animate-marquee"
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        >
          💻 Hot Deal: Laptop available under ₹10,000! Contact freakyakkmu@gmail.com for enquiry 🔥
        </motion.div>
      </div>
      {/* 👆 Marquee Advertisement Section */}

      {/* Buttons */}
      <motion.div
        className="flex gap-6 mb-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <button
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow-lg transition-all hover:scale-105"
          onClick={() => router.push('/buyer')}
        >
          👀 I’m a Buyer
        </button>

        <button
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-lg transition-all hover:scale-105"
          onClick={() => router.push('/seller')}
        >
          💼 I’m a Seller
        </button>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-6 w-full flex flex-col items-center gap-2 text-zinc-400 text-sm">
        <motion.button
          whileHover={{ scale: 1.05, color: "#22c55e" }}
          onClick={() => window.location.href = "mailto:freakyakkmu@gmail.com"}
          className="flex items-center gap-2 text-white transition-colors"
        >
          <Mail size={18} />
          Contact Us
        </motion.button>
        <span className="text-xs text-zinc-500">© 2025 Passion Writers. All rights reserved.</span>
      </footer>

      {/* Confetti Celebration */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <div className="w-full h-full bg-[url('/confetti.png')] bg-cover bg-center opacity-10 mix-blend-screen animate-pulse" />
      </motion.div>
    </div>
  );
}
