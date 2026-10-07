import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ShieldCheck, CreditCard, Banknote, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

interface CheckoutForm {
  fullName: string;
  mobile: string;
  email: string;
  addressLine1: string;
  city: string;
  pinCode: string;
  paymentMethod: 'cod' | 'online';
}

export function Checkout() {
  const { cart, clearCart, addOrder, user } = useStore();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const { register, handleSubmit, formState: { errors }, watch } = useForm<CheckoutForm>({
    defaultValues: {
      fullName: user?.name || '',
      mobile: user?.phone || '',
      email: user?.email || '',
      paymentMethod: 'online'
    }
  });

  const paymentMethod = watch('paymentMethod');

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = total > 499 || total === 0 ? 0 : 50;
  const finalTotal = total + deliveryFee;

  if (cart.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  const onSubmit = () => {
    const newOrderId = `ORD${Math.floor(Math.random() * 1000000)}`;
    setOrderId(newOrderId);
    
    addOrder({
      id: newOrderId,
      items: [...cart],
      total: finalTotal,
      status: 'Confirmed',
      date: new Date().toISOString()
    });
    
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-2">Your order ID is <span className="font-bold text-gray-900">{orderId}</span></p>
        <p className="text-gray-500 mb-8 max-w-md">Thank you for choosing Sanjeevani Pharmacy. We will notify you once your order is dispatched.</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/dashboard')} variant="outline">View Orders</Button>
          <Button onClick={() => navigate('/medicines')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          
          {/* Contact Details */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <Input 
                  {...register('fullName', { required: 'Name is required' })} 
                  placeholder="John Doe" 
                />
                {errors.fullName && <span className="text-red-500 text-xs mt-1">{errors.fullName.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                <Input 
                  {...register('mobile', { required: 'Mobile is required', pattern: { value: /^[0-9]{10}$/, message: 'Invalid 10-digit number' } })} 
                  placeholder="9876543210" 
                />
                {errors.mobile && <span className="text-red-500 text-xs mt-1">{errors.mobile.message}</span>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Input 
                  type="email"
                  {...register('email')} 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
          </section>

          {/* Delivery Address */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                <Input 
                  {...register('addressLine1', { required: 'Address is required' })} 
                  placeholder="House No, Building, Street" 
                />
                {errors.addressLine1 && <span className="text-red-500 text-xs mt-1">{errors.addressLine1.message}</span>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <Input 
                    {...register('city', { required: 'City is required' })} 
                    placeholder="New Delhi" 
                  />
                  {errors.city && <span className="text-red-500 text-xs mt-1">{errors.city.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code *</label>
                  <Input 
                    {...register('pinCode', { required: 'PIN code is required' })} 
                    placeholder="110001" 
                  />
                  {errors.pinCode && <span className="text-red-500 text-xs mt-1">{errors.pinCode.message}</span>}
                </div>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'online' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                <input 
                  type="radio" 
                  value="online"
                  {...register('paymentMethod')}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <CreditCard className={`w-5 h-5 ${paymentMethod === 'online' ? 'text-primary-600' : 'text-gray-400'}`} />
                <div>
                  <div className="font-medium text-gray-900">Online Payment (Demo)</div>
                  <div className="text-xs text-gray-500">Pay securely using Credit/Debit Card, UPI, or Netbanking</div>
                </div>
              </label>
              
              <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                <input 
                  type="radio" 
                  value="cod"
                  {...register('paymentMethod')}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <Banknote className={`w-5 h-5 ${paymentMethod === 'cod' ? 'text-primary-600' : 'text-gray-400'}`} />
                <div>
                  <div className="font-medium text-gray-900">Cash on Delivery</div>
                  <div className="text-xs text-gray-500">Pay with cash when your order is delivered</div>
                </div>
              </label>
            </div>
          </section>

        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div className="flex-1 text-gray-600 pr-4">
                    <span className="line-clamp-1">{item.name}</span>
                    <span className="text-xs text-gray-400">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-medium text-gray-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <span className="text-green-600 font-medium">FREE</span> : `₹${deliveryFee.toFixed(2)}`}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button type="submit" className="w-full py-6 text-lg flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Place Order Safely
            </Button>
            <p className="text-[10px] text-gray-400 text-center mt-4">
              By placing this order, you agree to our Terms of Service and Privacy Policy. This is a demo transaction.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
