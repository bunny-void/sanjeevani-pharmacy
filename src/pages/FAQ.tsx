import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How do I upload a prescription?",
    answer: "You can upload a prescription by clicking on the 'Upload Rx' button in the header or visiting the Prescription page. You can upload a clear image (JPG, PNG) or PDF format up to 15MB. Our pharmacists will review it before processing your order."
  },
  {
    question: "How long does delivery take?",
    answer: "We offer express delivery in select cities within 24 hours. Standard delivery takes 2-4 business days depending on your location. You will receive tracking information once your order is dispatched."
  },
  {
    question: "Can I cancel an order?",
    answer: "Yes, you can cancel your order before it is dispatched from our warehouse. Go to your Dashboard > Orders, and click on 'Cancel Order'. If the order is already shipped, you can refuse the delivery."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, you will receive an SMS and email with the tracking link. You can also track the real-time status in the 'My Orders' section of your Dashboard."
  },
  {
    question: "Do prescription medicines require verification?",
    answer: "Yes, as per government regulations, all Schedule H and X medicines require a valid doctor's prescription. Our certified pharmacists verify every prescription before confirming the order."
  },
  {
    question: "How do I use the BMI calculator?",
    answer: "Visit the BMI Calculator page from the footer menu. Enter your height in centimeters and weight in kilograms. The calculator will instantly display your Body Mass Index and indicate your health category."
  },
  {
    question: "Are the medicines genuine?",
    answer: "Absolutely. We guarantee 100% genuine medicines. We source our products directly from authorized manufacturers and official distributors, ensuring complete authenticity and safety."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600">Find answers to common questions about our services.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 focus:outline-none"
            >
              <span className="font-semibold text-gray-900">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-primary-600 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
              )}
            </button>
            
            <div 
              className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-gray-600 pt-2 border-t border-gray-100">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
