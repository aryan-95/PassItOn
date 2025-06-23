'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/products/category/${params.category}`);
      const data = await res.json();
      setProducts(data.products);
      setFiltered(data.products);
    };

    fetchProducts();
  }, [params.category]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = products.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.college.toLowerCase().includes(term) ||
      p.price.includes(term)
    );
    setFiltered(results);
  }, [searchTerm, products]);

  return (
    <div className="min-h-screen px-6 py-10 bg-black text-white">
      <h2 className="text-3xl font-bold mb-6 capitalize text-center">
        {params.category} Listings
      </h2>

      <input
        type="text"
        placeholder="Search by title, price or college"
        className="w-full max-w-lg mx-auto block mb-8 p-3 rounded bg-zinc-800 text-white border border-zinc-700"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="text-center text-zinc-400">No matching products.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
