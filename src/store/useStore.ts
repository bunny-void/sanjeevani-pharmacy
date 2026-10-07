import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, User, Order, Reminder, Address } from '../types';

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  orders: Order[];
  reminders: Reminder[];
  addresses: Address[];
  
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  
  login: (user: User) => void;
  logout: () => void;
  
  addOrder: (order: Order) => void;
  addReminder: (reminder: Reminder) => void;
  addAddress: (address: Address) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      user: null,
      orders: [],
      reminders: [],
      addresses: [],
      
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const cart = Array.isArray(state.cart) ? state.cart : [];
          const existing = cart.find((item) => item.id === product.id);
          if (existing) {
            return {
              cart: cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: (item.quantity || 1) + quantity }
                  : item
              ),
            };
          }
          return { cart: [...cart, { ...product, quantity }] };
        }),
        
      removeFromCart: (productId) =>
        set((state) => ({
          cart: (Array.isArray(state.cart) ? state.cart : []).filter((item) => item.id !== productId),
        })),
        
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: (Array.isArray(state.cart) ? state.cart : []).map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),
        
      clearCart: () => set({ cart: [] }),
      
      addToWishlist: (product) =>
        set((state) => {
          const wishlist = Array.isArray(state.wishlist) ? state.wishlist : [];
          if (wishlist.find((p) => p.id === product.id)) return state;
          return { wishlist: [...wishlist, product] };
        }),
        
      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: (Array.isArray(state.wishlist) ? state.wishlist : []).filter((p) => p.id !== productId),
        })),
        
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      
      addOrder: (order) =>
        set((state) => ({ orders: [order, ...(Array.isArray(state.orders) ? state.orders : [])] })),
        
      addReminder: (reminder) =>
        set((state) => ({ reminders: [...(Array.isArray(state.reminders) ? state.reminders : []), reminder] })),
        
      addAddress: (address) =>
        set((state) => ({ addresses: [...(Array.isArray(state.addresses) ? state.addresses : []), address] })),
    }),
    {
      name: 'sanjeevani-storage',
    }
  )
);
