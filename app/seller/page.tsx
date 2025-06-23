'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogoutButton } from '@/components/LogoutButton';


export default function SellerPage() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
    college: 'KIET Group of Institutions',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('Product listed successfully!');
        setFormData({ title: '', price: '', category: '', image: '', college: 'KIET Group of Institutions' });
      } else {
        setStatus('Failed to submit. Try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error submitting the form.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-10 text-white">
        

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-zinc-900 p-8 rounded-xl shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">List a Product</h2>

        <input
          type="text"
          name="title"
          placeholder="Item Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <input
          type="text"
          name="price"
          placeholder="Price (INR)"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        >
          <option value="">Select Category</option>
          <option value="Books">Books</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothing">Clothing</option>
          <option value="Stationery">Stationery</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <input
          type="text"
          name="college"
          value={formData.college}
          disabled
          className="w-full p-3 mb-6 rounded bg-zinc-700 text-white"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          Submit
        </button>
        
        <LogoutButton />
        {status && <p className="text-sm text-center mt-4 text-green-400">{status}</p>}
      </motion.form>
      
    </div>
  );
}
