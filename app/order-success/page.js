'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight, Leaf } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNum = searchParams.get('order') || `SB-${Date.now().toString(36).toUpperCase()}`;

  // Estimated delivery: today + 5–7 business days
  const delivery = new Date();
  delivery.setDate(delivery.getDate() + 7);
  const deliveryStr = delivery.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <div className="bg-ivory min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-10 h-10 text-forest" aria-hidden="true" />
        </div>

        {/* Heading */}
        <h1 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
          Thank you for your order
        </h1>
        <p className="font-body text-stone leading-relaxed mb-8">
          Your botanical skincare is on its way. We&rsquo;ll send a confirmation email shortly.
        </p>

        {/* Demo notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
          <p className="font-body text-sm text-amber-800">
            <strong>Demo order:</strong> This is a simulated checkout — no real payment was processed and no order was shipped.
          </p>
        </div>

        {/* Order card */}
        <div className="bg-white border border-sand rounded-2xl p-6 mb-8 text-left space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-body text-sm text-stone">Order number</span>
            <span className="font-body font-semibold text-charcoal text-sm">{orderNum}</span>
          </div>
          <div className="flex justify-between items-center border-t border-sand pt-4">
            <span className="font-body text-sm text-stone">Status</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-body font-semibold bg-forest/10 text-forest px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-forest rounded-full animate-pulse" />
              Confirmed
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-sand pt-4">
            <span className="font-body text-sm text-stone flex items-center gap-2">
              <Package className="w-4 h-4 text-sage" aria-hidden="true" />
              Estimated delivery
            </span>
            <span className="font-body text-sm font-medium text-charcoal">{deliveryStr}</span>
          </div>
        </div>

        {/* Brand note */}
        <div className="flex items-center justify-center gap-2.5 mb-8 text-stone">
          <Leaf className="w-4 h-4 text-sage" aria-hidden="true" />
          <p className="font-body text-sm italic">
            Packaged with care using 100% recycled materials
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 bg-forest text-white font-body font-semibold text-sm px-7 py-4 rounded-xl hover:bg-forest-dark active:scale-[0.97] transition-all duration-200"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 border border-sand text-charcoal font-body font-medium text-sm px-7 py-4 rounded-xl hover:bg-cream transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="bg-ivory min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-body text-stone text-sm">Loading…</p>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
