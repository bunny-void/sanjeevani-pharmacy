import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

interface LoginForm {
  mobile: string;
  password?: string;
}

export function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [isOTP, setIsOTP] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    login({
      id: 'u1',
      name: 'Demo User',
      phone: data.mobile,
      email: 'demo@sanjeevani.local',
      coins: 100,
    });
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-500">Sign in to access your orders and prescriptions</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <Input 
              {...register('mobile', { required: 'Mobile is required', pattern: { value: /^[0-9]{10}$/, message: 'Invalid 10-digit number' } })} 
              placeholder="Enter 10 digit mobile number" 
            />
            {errors.mobile && <span className="text-red-500 text-xs mt-1">{errors.mobile.message}</span>}
          </div>

          {!isOTP && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input 
                type="password"
                {...register('password')} 
                placeholder="Enter password" 
              />
            </div>
          )}

          <div className="flex justify-between items-center text-sm">
            <button 
              type="button" 
              onClick={() => setIsOTP(!isOTP)}
              className="text-primary-600 font-medium hover:underline"
            >
              {isOTP ? 'Login with Password instead' : 'Login with OTP instead'}
            </button>
            {!isOTP && <button type="button" className="text-gray-500 hover:text-gray-700">Forgot Password?</button>}
          </div>

          <Button type="submit" className="w-full py-6 mt-4">
            {isOTP ? 'Send OTP & Login (Demo)' : 'Sign In (Demo)'}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
          New to Sanjeevani? <button className="text-primary-600 font-bold hover:underline">Create an account</button>
        </div>
      </div>
    </div>
  );
}
