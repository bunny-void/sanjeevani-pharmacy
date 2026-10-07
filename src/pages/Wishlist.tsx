import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';

export function Wishlist() {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-6">
          <Heart className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Save your favorite medicines and health products here to buy them later.</p>
        <Link to="/medicines">
          <Button size="lg" className="px-8">Explore Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-6 h-6 text-red-500 fill-current" />
        <h1 className="text-2xl font-bold text-gray-900">My Wishlist ({wishlist.length})</h1>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
