'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ChooseRolePage() {
  const router = useRouter();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 to-black px-4 text-center"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
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
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.button
          onClick={() => router.push('/buyer')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="px-6 py-3 w-52 text-lg bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg hover:shadow-green-500/20 transition-all"
        >
          Browse Items
        </motion.button>

        <motion.button
          onClick={() => router.push('/seller')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="px-6 py-3 w-52 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all"
        >
          List Your Item
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
