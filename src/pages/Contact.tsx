import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600">We're here to help. Get in touch with our team.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center h-full flex flex-col justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-600 mb-6">Thank you for reaching out. Our support team will get back to you shortly.</p>
              <Button onClick={() => setIsSuccess(false)} variant="outline">Send Another Message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input required placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Input required type="email" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input required placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  required
                  rows={4}
                  className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <Button type="submit" className="w-full">Send Message (Demo)</Button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Phone Support</h3>
              <p className="text-gray-600 mb-1">1800-123-4567 (Toll Free)</p>
              <p className="text-sm text-gray-500">Available 24/7 for emergency queries</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Email Support</h3>
              <p className="text-gray-600 mb-1">support@sanjeevanipharmacy.demo</p>
              <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Head Office</h3>
              <p className="text-gray-600 mb-1">123 Health Avenue, Medical District</p>
              <p className="text-gray-600">New Delhi, 110001, India</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Business Hours</h3>
              <p className="text-gray-600 mb-1">Monday - Sunday</p>
              <p className="text-gray-600">8:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
