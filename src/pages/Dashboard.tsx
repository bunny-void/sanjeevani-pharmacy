import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, FileText, Heart, MapPin, Coins, Bell } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';

export function Dashboard() {
  const { user, logout, orders } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              {user.name.charAt(0)}
            </div>
            <h2 className="font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{user.phone}</p>
            
            <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-2 rounded-lg border border-orange-100">
              <Coins className="w-5 h-5" />
              <span className="font-bold">{user.coins} Sanjeevani Coins</span>
            </div>
          </div>

          <nav className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary-50 border-l-4 border-primary-500 text-primary-700 font-medium">
              <Package className="w-5 h-5" /> My Orders
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors">
              <FileText className="w-5 h-5" /> Prescriptions
            </button>
            <button onClick={() => navigate('/wishlist')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors">
              <Heart className="w-5 h-5" /> Wishlist
            </button>
            <button onClick={() => navigate('/reminders')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5" /> Reminders
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors">
              <MapPin className="w-5 h-5" /> Addresses
            </button>
            <div className="border-t">
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content (Orders) */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h1>
          
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
              <Button onClick={() => navigate('/medicines')}>Start Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Order ID: {order.id}</div>
                      <div className="font-medium text-gray-900">Placed on {new Date(order.date).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-lg">₹{order.total}</div>
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded mt-1">
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover border" />
                        <div>
                          <div className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</div>
                          <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
