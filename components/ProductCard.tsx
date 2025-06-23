import Link from 'next/link';

interface Props {
  product: {
    _id: string;
    title: string;
    image: string;
    price: string;
    college: string;
    category: string;
  };
}

export function ProductCard({ product }: Props) {
  return (
    <Link href={`/product/${product._id}`}>
      <div className="bg-zinc-900 rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold">{product.title}</h3>
          <p className="text-sm text-zinc-400">{product.college}</p>
          <p className="mt-2 text-green-400 font-semibold">₹{product.price}</p>
          <span className="text-xs text-zinc-500">{product.category}</span>
        </div>
      </div>
    </Link>
  );
}
