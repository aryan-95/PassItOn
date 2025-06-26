import { Product } from '@/models/Product';
import { connectToDatabase } from '@/lib/db';

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: Props) {
  await connectToDatabase();

  //@ts-ignore
  const product: {
    title: string;
    price: string;
    category: string;
    image: string;
    college: string;
    email?: string;
    phone?: string;
  } | null = await Product.findById(params.id).lean();

  if (!product) {
    return <div className="text-center text-white mt-10">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-2xl mx-auto bg-zinc-900 rounded-xl shadow-lg p-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-60 object-cover rounded mb-6"
        />

        <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
        <p className="text-lg text-green-400 mb-1">₹{product.price}</p>
        <p className="text-sm text-zinc-400 mb-1">Category: {product.category}</p>
        <p className="text-sm text-zinc-400 mb-4">College: {product.college}</p>

        {product.phone && (
  <p className="text-md mb-1">
    📞 Phone:{' '}
    <a
      href={`https://wa.me/${'91' + product.phone}`}
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
    </div>
  );
}
