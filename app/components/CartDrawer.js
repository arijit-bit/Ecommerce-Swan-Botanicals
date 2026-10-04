'use client';

// ─── CartDrawer ───────────────────────────────────────────────────────────────
// Slide-in cart panel from the right side.

import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, Trash2, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import QuantitySelector from './QuantitySelector';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, cartCount, cartSubtotal, shippingCost, cartTotal, SHIPPING_THRESHOLD, removeFromCart, updateQuantity } = useCart();
  const drawerRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Trap focus
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isOpen]);

  const freeShippingRemaining = Math.max(0, SHIPPING_THRESHOLD - cartSubtotal);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[90] backdrop-blur-sm animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        className={`
          fixed top-0 right-0 h-full w-full max-w-[420px] bg-ivory z-[100]
          flex flex-col shadow-xl
          transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sand">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-forest" aria-hidden="true" />
            <h2 className="font-display text-lg text-charcoal">
              Your Cart
              {cartCount > 0 && (
                <span className="ml-2 text-sm font-body font-medium text-stone">
                  ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream transition-colors duration-150 text-stone"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free shipping progress */}
        {cartSubtotal > 0 && (
          <div className="px-6 py-3 bg-cream border-b border-sand">
            {freeShippingRemaining > 0 ? (
              <>
                <p className="text-xs font-body text-stone mb-1.5">
                  Add <span className="font-semibold text-forest">${freeShippingRemaining.toFixed(2)}</span> more for free shipping
                </p>
                <div className="w-full bg-sand rounded-full h-1.5">
                  <div
                    className="bg-forest h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (cartSubtotal / SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </>
            ) : (
              <p className="text-xs font-body font-semibold text-forest">
                You qualify for free shipping!
              </p>
            )}
          </div>
        )}

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBag className="w-12 h-12 text-mist mb-4" />
              <p className="font-display text-lg text-charcoal mb-2">Your cart is empty</p>
              <p className="text-sm text-stone mb-6">Discover our botanical collection</p>
              <Link
                href="/products"
                onClick={onClose}
                className="bg-forest text-white font-body text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-forest-dark transition-colors duration-200"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {cartItems.map((item) => (
                <li key={item.id} className="flex gap-4">
                  {/* Image */}
                  <Link href={`/products/${item.slug}`} onClick={onClose} className="shrink-0">
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-cream border border-sand">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={96}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/products/${item.slug}`} onClick={onClose}>
                        <h3 className="font-body font-medium text-sm text-charcoal leading-snug hover:text-forest transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="shrink-0 text-stone hover:text-red-500 transition-colors duration-150 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-stone mt-0.5">{item.volume}</p>

                    <div className="flex items-center justify-between mt-3">
                      <QuantitySelector
                        quantity={item.quantity}
                        onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                        size="sm"
                      />
                      <span className="font-body font-semibold text-sm text-charcoal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-sand px-6 py-5 space-y-3">
            <div className="flex justify-between text-sm font-body text-stone">
              <span>Subtotal</span>
              <span className="text-charcoal font-medium">${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-body text-stone">
              <span>Shipping</span>
              <span className="text-charcoal font-medium">
                {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between font-body font-semibold text-charcoal border-t border-sand pt-3">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full bg-forest text-white font-body font-medium text-sm py-4 rounded-xl hover:bg-forest-dark active:scale-[0.98] transition-all duration-200"
            >
              Proceed to Checkout
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-center w-full text-forest font-body text-sm font-medium py-2 hover:underline transition-colors duration-150"
            >
              View full cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
