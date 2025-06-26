'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LogoutButton } from '@/components/LogoutButton';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-black via-zinc-900 to-black">
      {/* Logout Button */}
      <div className="absolute top-4 right-6">
        <LogoutButton />
      </div>

      {/* Logo at the top */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        
        <Image
          src="/logo.png" // ✅ make sure your logo is in public/logo.png
          alt="Startup Logo"
          width={100}
          height={100}
          className="mx-auto rounded-full"
        />
      </motion.div>
      

      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-4 text-white"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Pass It On
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl max-w-xl text-zinc-300 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Helping students declutter and find essentials. Buy or sell used items within your hostel or college – seamlessly.
      </motion.p>
      <p className="text-sm text-zinc-400 mt-2 font-medium">Earn. Learn. Share. 🚀</p>
      <br></br>
      <br></br>
      <motion.div
        className="flex gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <button
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-md transition"
          onClick={() => router.push('/buyer')}
        >
          I’m a Buyer
        </button>

        <button
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md transition"
          onClick={() => router.push('/seller')}
        >
          I’m a Seller
        </button>
        
      </motion.div>
      
    </div>
  );
}
