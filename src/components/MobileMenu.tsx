import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Search, Upload, FileText, Activity, Home, Info, Phone, HelpCircle } from 'lucide-react';
import { Button } from './ui/Button';

export function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location.pathname, location.search, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary-600 tracking-tight">SANJEEVANI</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6 text-gray-500" />
          </Button>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          <nav className="flex flex-col gap-2">
            <Link to="/" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium">
              <Home className="h-5 w-5 text-gray-400" /> Home
            </Link>
            <Link to="/medicines" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium">
              <Search className="h-5 w-5 text-gray-400" /> All Medicines
            </Link>
            <Link to="/prescription" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 text-primary-600 font-medium bg-primary-50">
              <Upload className="h-5 w-5 text-primary-500" /> Upload Prescription
            </Link>
            
            <div className="my-2 border-t" />
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">Categories</h4>
            
            <Link to="/medicines?category=Prescription Rx" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 text-gray-600 text-sm">
               Prescription Rx
            </Link>
            <Link to="/medicines?category=Pain & OTC" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 text-gray-600 text-sm">
               Pain & OTC
            </Link>
            <Link to="/medicines?category=Diabetes Care" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 text-gray-600 text-sm">
               Diabetes Care
            </Link>
            
            <div className="my-2 border-t" />
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">Tools & Info</h4>

            <Link to="/bmi" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium">
              <Activity className="h-5 w-5 text-gray-400" /> BMI Calculator
            </Link>
            <Link to="/reminders" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium">
              <FileText className="h-5 w-5 text-gray-400" /> Pill Reminders
            </Link>
            <Link to="/about" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium">
              <Info className="h-5 w-5 text-gray-400" /> About Us
            </Link>
            <Link to="/contact" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium">
              <Phone className="h-5 w-5 text-gray-400" /> Contact
            </Link>
            <Link to="/faq" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium">
              <HelpCircle className="h-5 w-5 text-gray-400" /> FAQ
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
