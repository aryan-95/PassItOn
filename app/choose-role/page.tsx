'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ChooseRolePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 to-black px-4 text-center">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What do you want to do?
      </motion.h2>

      <motion.div
        className="flex gap-6 flex-col md:flex-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <button
          className="px-6 py-3 w-52 text-lg bg-green-600 hover:bg-green-700 text-white rounded-xl shadow"
          onClick={() => router.push('/buyer')}
        >
          Browse Items
        </button>

        <button
          className="px-6 py-3 w-52 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow"
          onClick={() => router.push('/seller')}
        >
          List Your Item
        </button>
      </motion.div>
    </div>
  );
}
