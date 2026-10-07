import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';

export function Cart() {
  const { cart = [], updateQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();

  const safeCart = cart || [];
  const subtotal = safeCart.reduce((acc, item) => acc + (item.originalPrice || 0) * (item.quantity || 0), 0);
  const total = safeCart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
  const discount = subtotal - total;
  const deliveryFee = total > 499 || total === 0 ? 0 : 50;
  const finalTotal = total + deliveryFee;

  if (safeCart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 mb-6">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any medicines or healthcare products to your cart yet.</p>
        <Link to="/medicines">
          <Button size="lg" className="px-8">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart ({cart.length} Items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4">
              <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    {item.requiresPrescription && (
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
                        Rx Required
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">₹{item.price}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50 transition-colors rounded-l-lg text-gray-600"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50 transition-colors rounded-r-lg text-gray-600"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <span className="text-green-600 font-medium">FREE</span> : `₹${deliveryFee.toFixed(2)}`}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="text-[10px] text-gray-500 text-right">
                  Add ₹{(499 - total).toFixed(2)} more for free delivery
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="font-bold text-gray-900">Total</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">₹{finalTotal.toFixed(2)}</span>
                  <div className="text-xs text-gray-500">Inclusive of all taxes</div>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => navigate('/checkout')}
              className="w-full py-6 text-lg flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
