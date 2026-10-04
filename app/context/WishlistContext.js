'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

const ADD = 'ADD';
const REMOVE = 'REMOVE';
const HYDRATE = 'HYDRATE';

// ─── Reducer ─────────────────────────────────────────────────────────────────

function wishlistReducer(state, action) {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    case ADD:
      if (state.some((item) => item.id === action.payload.id)) return state;
      return [...state, action.payload];

    case REMOVE:
      return state.filter((item) => item.id !== action.payload);

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const WishlistContext = createContext(null);

const STORAGE_KEY = 'swan_wishlist';

export function WishlistProvider({ children }) {
  const [wishlistItems, dispatch] = useReducer(wishlistReducer, []);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        dispatch({ type: HYDRATE, payload: JSON.parse(stored) });
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch {
      // Ignore storage errors
    }
  }, [wishlistItems]);

  // ── Derived ───────────────────────────────────────────────────────────────

  const wishlistCount = wishlistItems.length;

  function isWishlisted(productId) {
    return wishlistItems.some((item) => item.id === productId);
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  function addToWishlist(product) {
    dispatch({ type: ADD, payload: product });
  }

  function removeFromWishlist(productId) {
    dispatch({ type: REMOVE, payload: productId });
  }

  function toggleWishlist(product) {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        isWishlisted,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
