import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import { useStore } from '../store/useStore';
import { Button } from './ui/Button';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist = [] } = useStore();
  
  const isWishlisted = (wishlist || []).some((p) => p?.id === product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
        <button 
          onClick={handleWishlist}
          className={`absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm transition-colors ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-primary-600 font-medium mb-1">{product.category}</div>
        <h3 className="font-semibold text-gray-900 leading-tight mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-1 mb-2">{product.description}</p>
        
        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="text-lg font-bold text-gray-900">₹{product.price}</div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-gray-400 line-through">₹{product.originalPrice}</div>
            )}
          </div>
          <Button 
            onClick={handleAddToCart}
            size="icon"
            className="h-8 w-8 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
