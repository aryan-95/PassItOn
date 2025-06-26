import Link from 'next/link';
import { motion } from 'framer-motion';

interface Props {
  product: {
    _id: string;
    title: string;
    image: string;
    price: string;
    college: string;
    category: string;
    email?: string;
    phone?: string;
  };
}

export function ProductCard({ product }: Props) {
  return (
    <Link href={`/product/${product._id}`}>
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="bg-zinc-900 rounded-xl shadow-md overflow-hidden cursor-pointer transition-all"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-90"
        />

        <div className="p-4">
          <h3 className="text-lg font-bold text-white truncate">{product.title}</h3>
          <p className="text-sm text-zinc-400 truncate">{product.college}</p>
          <p className="mt-2 text-green-400 font-semibold">₹{product.price}</p>

          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-zinc-500">{product.category}</span>
          </div>

          {/* Contact */}
          {product.phone && (
            <p className="mt-2 text-sm text-zinc-300 truncate">📞 {product.phone}</p>
          )}
          {product.email && (
            <p className="text-sm text-blue-400 underline break-all">
              ✉️ {product.email}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
