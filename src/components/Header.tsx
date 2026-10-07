import { Link, useNavigate } from 'react-router-dom';
import { Search, Upload, User, Heart, ShoppingCart, Coins, Menu } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useState } from 'react';
import type { CartItem } from '../types';

export function Header() {
  const cart = useStore((state) => state.cart) || [];
  const user = useStore((state) => state.user);
  const coins = user?.coins || 0;
  const cartItemCount = (cart || []).reduce((acc: number, item: CartItem) => acc + (item.quantity || 0), 0);
  const cartTotal = (cart || []).reduce((acc: number, item: CartItem) => acc + (item.price || 0) * (item.quantity || 0), 0);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/medicines?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Promotional Bar */}
      <div className="bg-primary-600 text-white text-xs py-2 px-4">
        <div className="container mx-auto flex overflow-x-auto whitespace-nowrap justify-between gap-4">
          <span className="font-semibold shrink-0">Special Sanjeevani Offers:</span>
          <span className="shrink-0">25% OFF 1st Order ({'>'}₹100)</span>
          <span className="shrink-0">Cashback Coins</span>
          <span className="shrink-0">FREE Delivery</span>
          <span className="shrink-0">5% OFF {'>'}₹499</span>
          <span className="shrink-0">Happy Hour Offers</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden mobile-menu-btn">
              <Menu className="h-6 w-6 pointer-events-none" />
            </Button>
            <Link to="/" className="flex flex-col">
              <span className="text-2xl font-bold text-primary-600 tracking-tight">SANJEEVANI</span>
              <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">Pharmacy</span>
            </Link>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative">
            <Input 
              type="text" 
              placeholder="Search medicines, categories, salts..." 
              className="w-full pr-10 rounded-full border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="ghost" size="icon" className="absolute right-1 top-0.5 rounded-full text-gray-400 hover:text-primary-600">
              <Search className="h-5 w-5" />
            </Button>
          </form>

          <div className="flex items-center gap-1 md:gap-4">
            <Link to="/prescription">
              <Button variant="outline" className="hidden lg:flex items-center gap-2 border-primary-200 text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-full">
                <Upload className="h-4 w-4" />
                <span>Upload Rx</span>
              </Button>
            </Link>

            {user && (
              <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
                <Coins className="h-4 w-4" />
                <span>{coins}</span>
              </div>
            )}

            <Link to={user ? "/dashboard" : "/login"}>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary-600">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary-600">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" className="relative flex items-center gap-2 text-gray-600 hover:text-primary-600">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
                <div className="hidden xl:flex flex-col text-left leading-none">
                  <span className="text-[10px] text-gray-400">Cart Total</span>
                  <span className="text-sm font-bold text-gray-800">₹{cartTotal.toFixed(2)}</span>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t hidden md:block">
        <div className="container mx-auto px-4 overflow-x-auto whitespace-nowrap scrollbar-hide py-3">
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <li><Link to="/" className="hover:text-primary-600 transition-colors">Home</Link></li>
            <li><Link to="/medicines" className="hover:text-primary-600 transition-colors">All Medicines</Link></li>
            <li><Link to="/medicines?category=Prescription Rx" className="hover:text-primary-600 transition-colors">Prescription Rx</Link></li>
            <li><Link to="/medicines?category=Pain & OTC" className="hover:text-primary-600 transition-colors">Pain & OTC</Link></li>
            <li><Link to="/medicines?category=Diabetes Care" className="hover:text-primary-600 transition-colors">Diabetes Care</Link></li>
            <li><Link to="/medicines?category=Cardiac & BP" className="hover:text-primary-600 transition-colors">Cardiac & BP</Link></li>
            <li><Link to="/medicines?category=Vitamins & Immunity" className="hover:text-primary-600 transition-colors">Vitamins & Immunity</Link></li>
            <li><Link to="/medicines?category=Mother & Baby" className="hover:text-primary-600 transition-colors">Mother & Baby</Link></li>
            <li><Link to="/medicines?category=Health Devices" className="hover:text-primary-600 transition-colors">Health Devices</Link></li>
            <li><Link to="/medicines?category=Ayurveda" className="hover:text-primary-600 transition-colors">Ayurveda</Link></li>
            <li><Link to="/medicines?category=Derma Care" className="hover:text-primary-600 transition-colors">Derma Care</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
