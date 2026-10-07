import type { Product } from '../types';

export const CATEGORIES = [
  "All Medicines",
  "Prescription Rx",
  "Pain & OTC",
  "Diabetes Care",
  "Cardiac & BP",
  "Vitamins & Immunity",
  "Mother & Baby",
  "Health Devices",
  "Ayurveda",
  "Derma Care"
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Paracetamol 500mg Tablets",
    category: "Pain & OTC",
    description: "Effective pain relief and fever reduction.",
    price: 35,
    originalPrice: 40,
    discount: 12,
    image: "https://images.unsplash.com/photo-1584308666744-24d5e4a06d0a?auto=format&fit=crop&q=80&w=400",
    requiresPrescription: false,
    stock: true,
    rating: 4.8
  },
  {
    id: "p2",
    name: "Amoxicillin 250mg Capsules",
    category: "Prescription Rx",
    description: "Antibiotic used to treat bacterial infections.",
    price: 120,
    originalPrice: 150,
    discount: 20,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400",
    requiresPrescription: true,
    stock: true,
    rating: 4.5
  },
  {
    id: "p3",
    name: "Vitamin C + Zinc Supplements",
    category: "Vitamins & Immunity",
    description: "Boosts immunity and promotes healthy skin.",
    price: 250,
    originalPrice: 300,
    discount: 16,
    image: "https://images.unsplash.com/photo-1550572017-edb98bcdeba6?auto=format&fit=crop&q=80&w=400",
    requiresPrescription: false,
    stock: true,
    rating: 4.9
  },
  {
    id: "p4",
    name: "Digital Blood Pressure Monitor",
    category: "Health Devices",
    description: "Accurate automatic blood pressure monitor.",
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400",
    requiresPrescription: false,
    stock: true,
    rating: 4.6
  },
  {
    id: "p5",
    name: "Diabetic Care Powder (500g)",
    category: "Diabetes Care",
    description: "Nutritional supplement for diabetes management.",
    price: 450,
    originalPrice: 500,
    discount: 10,
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=400",
    requiresPrescription: false,
    stock: true,
    rating: 4.3
  },
  {
    id: "p6",
    name: "Atenolol 50mg Tablets",
    category: "Cardiac & BP",
    description: "Used to treat high blood pressure.",
    price: 85,
    originalPrice: 95,
    discount: 10,
    image: "https://images.unsplash.com/photo-1584308666744-24d5e4a06d0a?auto=format&fit=crop&q=80&w=400",
    requiresPrescription: true,
    stock: true,
    rating: 4.7
  },
  {
    id: "p7",
    name: "Baby Lotion (200ml)",
    category: "Mother & Baby",
    description: "Gentle moisturizing lotion for baby skin.",
    price: 180,
    originalPrice: 200,
    discount: 10,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=400",
    requiresPrescription: false,
    stock: true,
    rating: 4.8
  },
  {
    id: "p8",
    name: "Ashwagandha Extract 500mg",
    category: "Ayurveda",
    description: "Natural stress relief and immunity booster.",
    price: 320,
    originalPrice: 400,
    discount: 20,
    image: "https://images.unsplash.com/photo-1611078512260-92892994c653?auto=format&fit=crop&q=80&w=400",
    requiresPrescription: false,
    stock: true,
    rating: 4.5
  },
  {
    id: "p9",
    name: "Salicylic Acid Face Wash",
    category: "Derma Care",
    description: "Anti-acne face wash for oily skin.",
    price: 299,
    originalPrice: 350,
    discount: 14,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400",
    requiresPrescription: false,
    stock: true,
    rating: 4.4
  }
];
