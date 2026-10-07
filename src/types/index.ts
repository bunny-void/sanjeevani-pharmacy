export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  requiresPrescription: boolean;
  stock: boolean;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  coins: number;
}

export interface Address {
  id: string;
  fullName: string;
  mobile: string;
  addressLine1: string;
  city: string;
  pinCode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Confirmed' | 'Delivered' | 'Cancelled';
  date: string;
}

export interface Reminder {
  id: string;
  medicineName: string;
  dosage: string;
  time: string;
  frequency: string;
  active: boolean;
}
