import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, ShieldCheck, ArrowLeft, Plus, Minus, FileText } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/products';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useStore();
  
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Button onClick={() => navigate('/medicines')}>Back to Medicines</Button>
      </div>
    );
  }

  const isWishlisted = (wishlist || []).some((p) => p?.id === product.id);

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 lg:p-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Image Gallery */}
          <div className="relative aspect-square md:aspect-auto md:h-[500px] bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
             <img 
              src={product.image} 
              alt={product.name} 
              className="max-w-full max-h-full object-contain"
            />
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-md">
                {product.discount}% OFF
              </div>
            )}
            <button 
              onClick={handleWishlist}
              className={`absolute top-4 right-4 p-3 rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:scale-110 ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="text-sm text-primary-600 font-medium mb-2 uppercase tracking-wider">{product.category}</div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-bold">
                {product.rating} ★
              </div>
              <span className="text-gray-500 text-sm">124 Ratings</span>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through mb-1">MRP ₹{product.originalPrice}</span>
                )}
              </div>
              <p className="text-xs text-gray-500">Inclusive of all taxes</p>
            </div>

            {product.requiresPrescription && (
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex items-start gap-3 mb-6">
                <FileText className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div className="text-sm text-orange-800">
                  <span className="font-semibold">Prescription Required</span>
                  <p>Please upload a valid prescription during checkout to purchase this medicine.</p>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-auto space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(10, q + 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="text-sm">
                  {product.stock ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleAddToCart}
                  size="lg" 
                  className="flex-1 text-lg flex items-center justify-center gap-2"
                  disabled={!product.stock}
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-primary-500" />
                <span className="text-sm font-medium text-gray-700">100% Genuine<br/>Products</span>
              </div>
              <div className="flex items-center gap-3">
                 <img src="https://cdn-icons-png.flaticon.com/512/2830/2830305.png" alt="Return Policy" className="w-8 h-8 opacity-70" />
                <span className="text-sm font-medium text-gray-700">Easy Return<br/>Policy</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
