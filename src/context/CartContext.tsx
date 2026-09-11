import React, { createContext, useContext, useState, useEffect } from 'react';
import { CraftSample, CartItem } from '../types';
import { CRAFT_SAMPLES } from '../data/marketData';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (craft: CraftSample, quantity?: number) => void;
  removeFromCart: (craftId: string) => void;
  updateQuantity: (craftId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with 1 default sample craft in cart so user can immediately see the working cart experience
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    return [
      {
        craft: CRAFT_SAMPLES[0], // Madhubani canvas
        quantity: 1
      }
    ];
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const addToCart = (craft: CraftSample, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.craft.id === craft.id);
      if (existing) {
        return prev.map(item =>
          item.craft.id === craft.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { craft, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (craftId: string) => {
    setCartItems(prev => prev.filter(item => item.craft.id !== craftId));
  };

  const updateQuantity = (craftId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.craft.id === craftId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.craft.recommendedFairPrice * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
