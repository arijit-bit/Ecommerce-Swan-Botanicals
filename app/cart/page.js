'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/QuantitySelector';
import EmptyState from '../components/EmptyState';

export default function CartPage() {
  const {
    cartItems, cartCount, cartSubtotal, shippingCost, cartTotal,
    SHIPPING_THRESHOLD, removeFromCart, updateQuantity, clearCart,
  } = useCart();

  const freeShippingRemaining = Math.max(0, SHIPPING_THRESHOLD - cartSubtotal);

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <section className="bg-cream border-b border-sand py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs font-body text-stone mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-forest transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <span className="text-charcoal font-medium">Cart</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl text-charcoal">
            Your Cart
            {cartCount > 0 && (
              <span className="ml-3 text-lg font-body font-normal text-stone">
                ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </span>
            )}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cartItems.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="w-8 h-8" />}
            title="Your cart is empty"
            description="Discover our botanical collection and add your favourites."
            action={{ label: 'Shop Now', href: '/products' }}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ── Cart items ── */}
            <div className="lg:col-span-2 space-y-1">
              {/* Free shipping bar */}
              {freeShippingRemaining > 0 ? (
                <div className="bg-cream border border-sand rounded-xl p-4 mb-6">
                  <p className="font-body text-sm text-stone mb-2">
                    Add <span className="font-semibold text-forest">${freeShippingRemaining.toFixed(2)}</span> more for free shipping
                  </p>
                  <div className="w-full bg-sand rounded-full h-1.5">
                    <div
                      className="bg-forest h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (cartSubtotal / SHIPPING_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-forest/5 border border-forest/20 rounded-xl p-4 mb-6">
                  <p className="font-body text-sm font-semibold text-forest">
                    You qualify for free shipping!
                  </p>
                </div>
              )}

              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="bg-white border border-sand rounded-2xl p-5 flex gap-5">
                    {/* Image */}
                    <Link href={`/products/${item.slug}`} className="shrink-0">
                      <div className="w-24 h-28 rounded-xl overflow-hidden bg-cream border border-sand">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={96}
                          height={112}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link href={`/products/${item.slug}`}>
                            <h3 className="font-body font-semibold text-charcoal hover:text-forest transition-colors line-clamp-2">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-xs font-body text-stone mt-0.5">{item.volume}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="text-stone hover:text-red-500 transition-colors p-1 shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <QuantitySelector
                          quantity={item.quantity}
                          onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                          onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                          size="md"
                        />
                        <div className="text-right">
                          <p className="font-body font-semibold text-charcoal">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs font-body text-stone">
                              ${item.price.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Clear cart */}
              <div className="pt-4">
                <button
                  onClick={clearCart}
                  className="text-xs font-body text-stone hover:text-red-500 transition-colors underline underline-offset-2"
                >
                  Clear cart
                </button>
              </div>
            </div>

            {/* ── Order summary ── */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-sand rounded-2xl p-6 sticky top-24">
                <h2 className="font-display text-lg text-charcoal mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between font-body text-sm text-stone">
                    <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                    <span className="text-charcoal font-medium">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm text-stone">
                    <span>Shipping</span>
                    <span className="text-charcoal font-medium">
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-body text-sm text-stone">
                    <span>Tax</span>
                    <span className="text-charcoal font-medium">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between font-body font-semibold text-base text-charcoal border-t border-sand pt-4 mb-6">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2.5 w-full bg-forest text-white font-body font-semibold text-sm py-4 rounded-xl hover:bg-forest-dark active:scale-[0.98] transition-all duration-200"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/products"
                  className="flex items-center justify-center mt-3 w-full text-forest font-body text-sm font-medium py-2 hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
