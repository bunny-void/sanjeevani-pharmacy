import { useState } from 'react';
import { Activity } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function BMI() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  
  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height) / 100; // cm to m
    const w = parseFloat(weight);
    
    if (h > 0 && w > 0) {
      const result = w / (h * h);
      setBmi(parseFloat(result.toFixed(1)));
    }
  };

  const getCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
    if (val >= 18.5 && val < 25) return { label: 'Normal weight', color: 'text-green-500' };
    if (val >= 25 && val < 30) return { label: 'Overweight', color: 'text-orange-500' };
    return { label: 'Obese', color: 'text-red-500' };
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">BMI Calculator</h1>
          <p className="text-sm text-gray-500">Calculate your Body Mass Index</p>
        </div>

        <form onSubmit={calculateBMI} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
            <Input 
              type="number"
              required
              min="50"
              max="300"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 175" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <Input 
              type="number"
              required
              min="20"
              max="300"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 70" 
            />
          </div>
          <Button type="submit" className="w-full py-6 mt-4">Calculate BMI</Button>
        </form>

        {bmi !== null && (
          <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Your BMI is</div>
            <div className={`text-4xl font-bold mb-2 ${getCategory(bmi).color}`}>
              {bmi}
            </div>
            <div className={`font-medium ${getCategory(bmi).color}`}>
              {getCategory(bmi).label}
            </div>
          </div>
        )}

        <div className="mt-8 text-[10px] text-gray-400 text-center leading-relaxed">
          Disclaimer: This calculator provides an estimate of BMI based on height and weight. It is for general informational purposes only and is not a medical diagnosis. Consult a healthcare provider for medical advice.
        </div>
      </div>
    </div>
  );
}
