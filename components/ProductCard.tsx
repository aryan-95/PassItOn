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

// Helper for colored category badge
const categoryColor = (cat: string) => {
  switch (cat.toLowerCase()) {
    case 'books': return 'bg-[#5B3DF6]/90 text-white';
    case 'electronics': return 'bg-[#FFE158]/90 text-[#23185B]';
    case 'furniture': return 'bg-[#F87171]/90 text-white';
    case 'clothing': return 'bg-[#EC4899]/90 text-white';
    case 'stationery': return 'bg-[#34D399]/90 text-[#23185B]';
    default: return 'bg-[#38BDF8]/90 text-white';
  }
};

export function ProductCard({ product }: Props) {
  return (
    <Link href={`/product/${product._id}`} prefetch={false}>
      <motion.div
        whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(120,80,210,0.10)' }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        className="bg-white rounded-3xl shadow-xl border-2 border-[#E0D5FA] pb-5 overflow-hidden cursor-pointer transition-all group"
        style={{
          minHeight: 380
        }}
      >
        <div className="px-4 pt-4">
          <div className="w-full h-44 flex justify-center items-center rounded-2xl bg-[#faf7ed] relative overflow-hidden shadow-md border-2 border-[#f3e8ff]">
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="object-contain h-40 w-40 rounded-xl transition-all duration-300 group-hover:opacity-90"
            />
          </div>
        </div>
        <div className="px-5 pt-4 space-y-2">
          <h3 className="text-lg font-bold text-[#23185B] truncate">{product.title}</h3>
          <p className="text-sm text-[#6C4AB6] truncate">{product.college}</p>
        </div>
        <div className="px-5 pt-2 pb-1 flex flex-row items-center gap-2">
          <span className="rounded-full px-3 py-1 text-xs font-semibold capitalize shadow-sm {categoryColor(product.category)} {categoryColor(product.category)}"
                style={{background: undefined, color: undefined}}>
            <span className={`${categoryColor(product.category)} px-3 py-1 rounded-full`}>
              {product.category}
            </span>
          </span>
          <span className="ml-auto text-xl font-black text-[#22C55E] tracking-wide drop-shadow-sm">
            ₹{product.price}
          </span>
        </div>
        <div className="px-5 flex flex-col gap-1 mt-3">
          {/* Contact */}
          {product.phone && (
            <p className="flex items-center gap-1 text-sm text-black font-semibold truncate">📞 {product.phone}</p>
          )}
          {product.email && (
            <p className="flex items-center gap-1 text-sm text-[#5B3DF6] font-semibold break-all">
              ✉️ <span className="underline">{product.email}</span>
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
