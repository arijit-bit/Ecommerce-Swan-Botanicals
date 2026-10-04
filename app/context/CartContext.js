'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_QTY = 'UPDATE_QTY';
const CLEAR_CART = 'CLEAR_CART';
const HYDRATE = 'HYDRATE';

// ─── Reducer ─────────────────────────────────────────────────────────────────

function cartReducer(state, action) {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    case ADD_ITEM: {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + (action.payload.quantity ?? 1) }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: action.payload.quantity ?? 1 }];
    }

    case REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload);

    case UPDATE_QTY: {
      const { id, quantity } = action.payload;
      if (quantity <= 0) return state.filter((item) => item.id !== id);
      return state.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    }

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const CartContext = createContext(null);

const STORAGE_KEY = 'swan_cart';

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors (private browsing, quota exceeded, etc.)
    }
  }, [cartItems]);

  // ── Derived values ────────────────────────────────────────────────────────

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const SHIPPING_THRESHOLD = 75;
  const SHIPPING_COST = 5.99;
  const shippingCost = cartSubtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const cartTotal = cartSubtotal + shippingCost;

  // ── Actions ───────────────────────────────────────────────────────────────

  function addToCart(product, quantity = 1) {
    dispatch({ type: ADD_ITEM, payload: { ...product, quantity } });
  }

  function removeFromCart(productId) {
    dispatch({ type: REMOVE_ITEM, payload: productId });
  }

  function updateQuantity(productId, quantity) {
    dispatch({ type: UPDATE_QTY, payload: { id: productId, quantity } });
  }

  function clearCart() {
    dispatch({ type: CLEAR_CART });
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        shippingCost,
        cartTotal,
        SHIPPING_THRESHOLD,
        SHIPPING_COST,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
