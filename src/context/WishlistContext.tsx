import React, { createContext, useContext, useState, useEffect } from 'react';
import { CraftSample } from '../types';
import { CRAFT_SAMPLES } from '../data/marketData';

interface WishlistContextType {
  wishlistItems: CraftSample[];
  isInWishlist: (craftId: string) => boolean;
  addToWishlist: (craft: CraftSample) => void;
  removeFromWishlist: (craftId: string) => void;
  toggleWishlist: (craft: CraftSample) => boolean;
  clearWishlist: () => void;
  totalWishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'srijansetu_artisan_wishlist';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<CraftSample[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore JSON parse error
    }
    // Seed with 2 curated authentic crafts so user immediately experiences the wishlist view
    return [CRAFT_SAMPLES[1], CRAFT_SAMPLES[3]];
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch {
      // ignore storage quota error
    }
  }, [wishlistItems]);

  const isInWishlist = (craftId: string) => {
    return wishlistItems.some(item => item.id === craftId);
  };

  const addToWishlist = (craft: CraftSample) => {
    setWishlistItems(prev => {
      if (prev.some(item => item.id === craft.id)) return prev;
      return [...prev, craft];
    });
  };

  const removeFromWishlist = (craftId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== craftId));
  };

  const toggleWishlist = (craft: CraftSample): boolean => {
    const exists = isInWishlist(craft.id);
    if (exists) {
      removeFromWishlist(craft.id);
      return false;
    } else {
      addToWishlist(craft);
      return true;
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        totalWishlistCount: wishlistItems.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
