'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { motion } from 'framer-motion';

export default function CategoryPage() {
  //@ts-ignore
  const { category } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      const res = await fetch(`/api/products/category/${category}`);
      const data = await res.json();
      setProducts(data.products);
      setFiltered(data.products);
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = products.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.college.toLowerCase().includes(term) ||
      p.price.toLowerCase().includes(term)
    );
    setFiltered(results);
  }, [searchTerm, products]);

  return (
    <motion.div
      className="min-h-screen px-6 py-10 bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2
        className="text-3xl font-bold mb-6 capitalize text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {category} Listings
      </motion.h2>

      <motion.input
        type="text"
        placeholder="Search by title, price or college"
        className="w-full max-w-lg mx-auto block mb-8 p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        whileFocus={{ scale: 1.01 }}
      />

      {filtered.length === 0 ? (
        <motion.p
          className="text-center text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No matching products.
        </motion.p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {filtered.map(product => (
            <motion.div
              key={product._id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
