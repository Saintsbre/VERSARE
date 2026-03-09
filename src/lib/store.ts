
"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string;
  image: string;
  category: string;
}

interface VersareStore {
  cart: Product[];
  history: string[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  addToHistory: (productName: string) => void;
}

export const useVersareStore = create<VersareStore>()(
  persist(
    (set) => ({
      cart: [],
      history: [],
      addToCart: (product) => 
        set((state) => ({ cart: [...state.cart, product] })),
      removeFromCart: (productId) =>
        set((state) => ({ cart: state.cart.filter((p) => p.id !== productId) })),
      clearCart: () => set({ cart: [] }),
      addToHistory: (productName) =>
        set((state) => {
          const newHistory = [productName, ...state.history.filter(p => p !== productName)].slice(0, 10);
          return { history: newHistory };
        }),
    }),
    {
      name: 'versare-storage',
    }
  )
);
