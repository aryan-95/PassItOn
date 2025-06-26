import { use } from 'react';
import { connectToDatabase } from '@/lib/db';
import { Product } from '@/models/Product';

type ProductType = {
  _id: string;
  title: string;
  price: string;
  category: string;
  image: string;
  college: string;
  phone?: string;
  email?: string;
};

async function getProduct(id: string): Promise<ProductType | null> {
  await connectToDatabase();
  const product = await Product.findById(id).lean();
  return product as ProductType | null;
}

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = use(getProduct(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.title}
        className="w-full max-w-md h-64 object-cover rounded-xl mb-6 shadow"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/placeholder.png';
        }}
      />

      <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
      <p className="text-green-400 text-xl mb-1">₹{product.price}</p>
      <p className="text-zinc-400 text-sm mb-2">Category: {product.category}</p>
      <p className="text-sm text-zinc-500 mb-4">Posted from: {product.college}</p>

      {product.phone && (
        <p className="text-md mb-1">
          📞 Phone:{' '}
          <a
            href={`https://wa.me/91${product.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 underline hover:text-green-300"
          >
            {product.phone}
          </a>
        </p>
      )}

      {product.email && (
        <p className="text-md">
          ✉️ Email:{' '}
          <a
            href={`mailto:${product.email}`}
            className="text-blue-400 underline hover:text-blue-300"
          >
            {product.email}
          </a>
        </p>
      )}
    </div>
  );
}
