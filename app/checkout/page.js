'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Check, CreditCard, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import EmptyState from '../components/EmptyState';
import { ShoppingBag } from 'lucide-react';

const STEPS = ['Customer Info', 'Shipping', 'Payment'];

function StepIndicator({ current }) {
  return (
    <nav aria-label="Checkout steps" className="flex items-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done    = i < current;
        const active  = i === current;
        const isLast  = i === STEPS.length - 1;
        return (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-semibold transition-all
                ${done   ? 'bg-forest text-white'      : ''}
                ${active ? 'bg-forest text-white ring-4 ring-forest/20' : ''}
                ${!done && !active ? 'bg-sand text-stone' : ''}`}
                aria-current={active ? 'step' : undefined}
              >
                {done ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-body hidden sm:block ${active ? 'text-forest font-medium' : 'text-stone'}`}>
                {step}
              </span>
            </div>
            {!isLast && (
              <div className={`flex-1 h-px mx-2 ${done ? 'bg-forest' : 'bg-sand'}`} aria-hidden="true" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

function FormInput({ label, id, type = 'text', required, placeholder, value, onChange, autoComplete }) {
  return (
    <div>
      <label htmlFor={id} className="block font-body text-sm font-medium text-charcoal mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 border border-sand rounded-xl text-sm font-body text-charcoal bg-white placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40 transition-all"
      />
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartSubtotal, shippingCost, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [info, setInfo] = useState({
    firstName: '', lastName: '', email: '', phone: '',
  });
  const [shipping, setShipping] = useState({
    address: '', city: '', state: '', zip: '', country: 'United States',
  });
  const [payment, setPayment] = useState({
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  });

  function handleInfo(e) { setInfo((p) => ({ ...p, [e.target.name]: e.target.value })); }
  function handleShipping(e) { setShipping((p) => ({ ...p, [e.target.name]: e.target.value })); }
  function handlePayment(e) { setPayment((p) => ({ ...p, [e.target.name]: e.target.value })); }

  function formatCard(val) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }
  function formatExpiry(val) {
    return val.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (step < 2) { setStep((s) => s + 1); return; }

    setSubmitting(true);
    // Simulate processing delay
    setTimeout(() => {
      const orderNum = `SB-${Date.now().toString(36).toUpperCase()}`;
      clearCart();
      router.push(`/order-success?order=${orderNum}`);
    }, 1800);
  }

  if (cartItems.length === 0 && !submitting) {
    return (
      <div className="bg-ivory min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4">
          <EmptyState
            icon={<ShoppingBag className="w-8 h-8" />}
            title="Your cart is empty"
            description="Add some products before checking out."
            action={{ label: 'Shop Now', href: '/products' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <section className="bg-cream border-b border-sand py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs font-body text-stone mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-forest transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/cart" className="hover:text-forest transition-colors">Cart</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-charcoal font-medium">Checkout</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl text-charcoal">Checkout</h1>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ── Form ── */}
          <div className="lg:col-span-3">
            <StepIndicator current={step} />

            <form onSubmit={handleSubmit} noValidate>
              {/* Step 0 — Customer info */}
              {step === 0 && (
                <div className="bg-white border border-sand rounded-2xl p-6 md:p-8 space-y-5">
                  <h2 className="font-display text-xl text-charcoal mb-1">Customer Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput label="First name" id="firstName" required placeholder="Jane" value={info.firstName} onChange={handleInfo} autoComplete="given-name" />
                    <FormInput label="Last name"  id="lastName"  required placeholder="Smith" value={info.lastName}  onChange={handleInfo} autoComplete="family-name" />
                  </div>
                  <FormInput label="Email address" id="email" type="email" required placeholder="jane@example.com" value={info.email} onChange={handleInfo} autoComplete="email" />
                  <FormInput label="Phone number" id="phone" type="tel" placeholder="+1 (555) 000-0000" value={info.phone} onChange={handleInfo} autoComplete="tel" />
                </div>
              )}

              {/* Step 1 — Shipping */}
              {step === 1 && (
                <div className="bg-white border border-sand rounded-2xl p-6 md:p-8 space-y-5">
                  <h2 className="font-display text-xl text-charcoal mb-1">Shipping Address</h2>
                  <FormInput label="Street address" id="address" required placeholder="123 Botanical Lane" value={shipping.address} onChange={handleShipping} autoComplete="street-address" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput label="City"    id="city"  required placeholder="Nature Valley" value={shipping.city}  onChange={handleShipping} autoComplete="address-level2" />
                    <FormInput label="State"   id="state" required placeholder="CA"            value={shipping.state} onChange={handleShipping} autoComplete="address-level1" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput label="ZIP code" id="zip"     required placeholder="90210"         value={shipping.zip}     onChange={handleShipping} autoComplete="postal-code" />
                    <FormInput label="Country"  id="country" required placeholder="United States"  value={shipping.country} onChange={handleShipping} autoComplete="country-name" />
                  </div>
                </div>
              )}

              {/* Step 2 — Payment */}
              {step === 2 && (
                <div className="bg-white border border-sand rounded-2xl p-6 md:p-8 space-y-5">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-display text-xl text-charcoal">Payment</h2>
                    <div className="flex items-center gap-1.5 text-xs font-body text-stone">
                      <Lock className="w-3 h-3" aria-hidden="true" />
                      Secure & encrypted
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm font-body text-amber-800">
                    <strong>Demo mode:</strong> No real payment is processed. Enter any values to continue.
                  </div>

                  <FormInput label="Name on card" id="cardName" required placeholder="Jane Smith" value={payment.cardName} onChange={handlePayment} autoComplete="cc-name" />
                  <div>
                    <label htmlFor="cardNumber" className="block font-body text-sm font-medium text-charcoal mb-1.5">
                      Card number<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        inputMode="numeric"
                        required
                        placeholder="0000 0000 0000 0000"
                        value={payment.cardNumber}
                        onChange={(e) => setPayment((p) => ({ ...p, cardNumber: formatCard(e.target.value) }))}
                        autoComplete="cc-number"
                        className="w-full pl-4 pr-12 py-3 border border-sand rounded-xl text-sm font-body text-charcoal bg-white placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40"
                      />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mist" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="expiry" className="block font-body text-sm font-medium text-charcoal mb-1.5">
                        Expiry<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input
                        id="expiry"
                        name="expiry"
                        type="text"
                        inputMode="numeric"
                        required
                        placeholder="MM/YY"
                        value={payment.expiry}
                        onChange={(e) => setPayment((p) => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                        autoComplete="cc-exp"
                        className="w-full px-4 py-3 border border-sand rounded-xl text-sm font-body text-charcoal bg-white placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40"
                      />
                    </div>
                    <FormInput label="CVV" id="cvv" required placeholder="123" value={payment.cvv} onChange={handlePayment} autoComplete="cc-csc" />
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-6">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="font-body text-sm font-medium text-stone hover:text-charcoal flex items-center gap-1.5 py-3 px-5 rounded-xl border border-sand hover:bg-cream transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <Link href="/cart" className="font-body text-sm font-medium text-stone hover:text-charcoal flex items-center gap-1.5 py-3 px-5 rounded-xl border border-sand hover:bg-cream transition-colors">
                    Back to cart
                  </Link>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2.5 bg-forest text-white font-body font-semibold text-sm py-3.5 px-8 rounded-xl hover:bg-forest-dark active:scale-[0.97] transition-all duration-200 disabled:opacity-60"
                >
                  {submitting ? (
                    'Processing…'
                  ) : step === 2 ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Place Order
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ── Order summary sidebar ── */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-sand rounded-2xl p-6 sticky top-24">
              <h2 className="font-display text-lg text-charcoal mb-5">Order Summary</h2>

              <ul className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <div className="relative w-14 h-16 shrink-0 rounded-lg overflow-hidden bg-cream border border-sand">
                      <Image src={item.image} alt={item.name} width={56} height={64} className="w-full h-full object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-charcoal text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium text-charcoal line-clamp-1">{item.name}</p>
                      <p className="font-body text-xs text-stone">{item.volume}</p>
                    </div>
                    <p className="font-body text-sm font-semibold text-charcoal shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="space-y-2.5 border-t border-sand pt-4 mb-5">
                <div className="flex justify-between font-body text-sm text-stone">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-medium">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body text-sm text-stone">
                  <span>Shipping</span>
                  <span className="text-charcoal font-medium">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between font-body font-semibold text-charcoal border-t border-sand pt-4">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
