import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Clock, PhoneCall } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES } from '../data/products';

export function Home() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);
  const topSellingProducts = MOCK_PRODUCTS.slice(4, 8);

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="bg-primary-50 pt-8 pb-12 md:pt-16 md:pb-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Your Trusted Pharmacy, <br />
              <span className="text-primary-600">Delivered to Your Door</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Order 100% genuine healthcare products and medicines online. Fast delivery and best prices guaranteed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/medicines">
                <Button size="lg" className="rounded-full px-8">Shop Medicines</Button>
              </Link>
              <Link to="/prescription">
                <Button variant="outline" size="lg" className="rounded-full px-8 bg-white">
                  Upload Prescription
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800" 
              alt="Healthcare" 
              className="w-full rounded-2xl shadow-xl object-cover h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 -mt-16 md:-mt-24 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-100 border border-gray-100">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">100% Genuine</h3>
              <p className="text-xs text-gray-500 hidden md:block">Authentic medicines</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">Free Delivery</h3>
              <p className="text-xs text-gray-500 hidden md:block">On orders above ₹499</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">Fast Shipping</h3>
              <p className="text-xs text-gray-500 hidden md:block">Same day delivery</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">24/7 Support</h3>
              <p className="text-xs text-gray-500 hidden md:block">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
          <Link to="/medicines" className="text-primary-600 font-medium text-sm flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.slice(1, 11).map((category, index) => (
            <Link 
              key={index} 
              to={`/medicines?category=${encodeURIComponent(category)}`}
              className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:shadow-md hover:border-primary-100 transition-all group"
            >
              <div className="w-16 h-16 mx-auto bg-primary-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <img 
                  src={`https://ui-avatars.com/api/?name=${category}&background=dcfce7&color=16a34a&rounded=true`}
                  alt={category}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="font-medium text-gray-800 text-sm group-hover:text-primary-600 transition-colors">{category}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Medicines</h2>
          <Link to="/medicines" className="text-primary-600 font-medium text-sm flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="container mx-auto px-4">
        <div className="bg-teal-500 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold mb-4">Get 20% Off on Ayurveda Products</h2>
            <p className="text-teal-100 mb-6">
              Boost your immunity with our range of natural ayurvedic products. Use code AYUR20 at checkout.
            </p>
            <Link to="/medicines?category=Ayurveda">
              <Button className="bg-white text-teal-600 hover:bg-gray-50 rounded-full px-8">Shop Now</Button>
            </Link>
          </div>
          <div className="w-full md:w-1/3">
             <img 
              src="https://images.unsplash.com/photo-1611078512260-92892994c653?auto=format&fit=crop&q=80&w=400" 
              alt="Ayurveda" 
              className="rounded-xl shadow-lg object-cover w-full h-48"
            />
          </div>
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Selling Health Products</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {topSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
