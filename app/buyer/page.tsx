'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Books', color: 'bg-purple-600' },
  { name: 'Electronics', color: 'bg-yellow-600' },
  { name: 'Furniture', color: 'bg-red-600' },
  { name: 'Clothing', color: 'bg-pink-600' },
  { name: 'Stationery', color: 'bg-green-600' },
  { name: 'Other', color: 'bg-blue-600' },
];

export default function BuyerPage() {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/buyer/${category.toLowerCase()}`);
  };

  return (
    <motion.div
      className="min-h-screen px-6 py-12 bg-black text-white"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose a Category
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat.name}
            onClick={() => handleCategoryClick(cat.name)}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-6 rounded-xl text-lg font-semibold shadow-md transition-colors duration-200 ${cat.color} hover:shadow-lg hover:shadow-white/10 focus:outline-none`}
          >
            {cat.name}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
