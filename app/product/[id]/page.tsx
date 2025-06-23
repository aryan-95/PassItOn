import { connectToDatabase } from '@/lib/db';
import { Product } from '@/models/Product';

interface Props {
  params: { id: string };
}

export default async function ProductDetail({ params }: Props) {
  await connectToDatabase();
  const product = await Product.findById(params.id);

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
        className="w-full max-w-md h-64 object-cover rounded-xl mb-6"
      />
      <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
      <p className="text-green-400 text-xl mb-1">₹{product.price}</p>
      <p className="text-zinc-400 text-sm mb-2">Category: {product.category}</p>
      <p className="text-sm text-zinc-500">Posted from: {product.college}</p>
    </div>
  );
}
