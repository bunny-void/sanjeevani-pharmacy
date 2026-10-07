import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-2xl font-bold text-primary-600 tracking-tight">SANJEEVANI</span>
              <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">Pharmacy</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              100% Genuine Healthcare • Your Trusted Pharmacy • Estd. 2010. Providing authentic medicines and healthcare products directly to your door.
            </p>
            <div className="flex gap-4 text-sm font-bold text-gray-400">
              <a href="#" className="hover:text-primary-600">FB</a>
              <a href="#" className="hover:text-primary-600">TW</a>
              <a href="#" className="hover:text-primary-600">IG</a>
              <a href="#" className="hover:text-primary-600">YT</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-primary-600">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-600">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-primary-600">FAQ</Link></li>
              <li><Link to="/bmi" className="hover:text-primary-600">BMI Calculator</Link></li>
              <li><Link to="/prescription" className="hover:text-primary-600">Upload Prescription</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/medicines?category=Prescription Rx" className="hover:text-primary-600">Prescription Rx</Link></li>
              <li><Link to="/medicines?category=Diabetes Care" className="hover:text-primary-600">Diabetes Care</Link></li>
              <li><Link to="/medicines?category=Cardiac & BP" className="hover:text-primary-600">Cardiac & BP</Link></li>
              <li><Link to="/medicines?category=Vitamins & Immunity" className="hover:text-primary-600">Vitamins</Link></li>
              <li><Link to="/medicines?category=Health Devices" className="hover:text-primary-600">Devices</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <span>123 Health Avenue, Medical District, New Delhi, 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-600 shrink-0" />
                <span>1800-123-4567 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-600 shrink-0" />
                <span>support@sanjeevanipharmacy.demo</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 Sanjeevani Pharmacy Demo. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-gray-900">Privacy Policy</Link>
            <Link to="#" className="hover:text-gray-900">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
