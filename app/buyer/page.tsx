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
    <div className="min-h-screen px-6 py-12 bg-black text-white">
      <motion.h2
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Choose a Category
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {categories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => handleCategoryClick(cat.name)}
            className={`p-6 rounded-xl text-lg font-semibold shadow-md hover:scale-105 transition ${cat.color}`}
          >
            {cat.name}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
