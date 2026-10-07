import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/Input';

export function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const categoryParam = searchParams.get('category') || 'All Medicines';
  const searchParam = searchParams.get('search') || '';
  
  const [localSearch, setLocalSearch] = useState(searchParam);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchCategory = categoryParam === 'All Medicines' || product.category === categoryParam;
      const searchLower = searchParam.toLowerCase();
      const matchSearch = searchLower === '' || 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower);
      
      return matchCategory && matchSearch;
    });
  }, [categoryParam, searchParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (localSearch) {
      newParams.set('search', localSearch);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        {/* Main Content */}
        <div>
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {searchParam ? `Search Results for "${searchParam}"` : categoryParam}
            </h1>
            
            <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64 md:hidden">
               <Input 
                  type="text" 
                  placeholder="Search medicines..." 
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pr-10"
                />
                <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
                  <Search className="w-5 h-5" />
                </button>
            </form>
            
            <p className="text-sm text-gray-500">
              Showing {filteredProducts.length} products
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
