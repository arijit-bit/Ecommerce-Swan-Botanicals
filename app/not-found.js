import Link from 'next/link';
import { ArrowLeft, Leaf } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className="bg-ivory min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-8">
          <Leaf className="w-8 h-8 text-sage" aria-hidden="true" />
        </div>

        <p className="font-body text-xs font-semibold uppercase tracking-widest text-sage mb-4">404</p>
        <h1 className="font-display text-4xl text-charcoal mb-4">Page not found</h1>
        <p className="font-body text-stone leading-relaxed mb-10">
          The page you&rsquo;re looking for seems to have wandered off into the botanical garden.
          Let&rsquo;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 bg-forest text-white font-body font-semibold text-sm px-7 py-4 rounded-xl hover:bg-forest-dark transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 border border-sand text-charcoal font-body font-medium text-sm px-7 py-4 rounded-xl hover:bg-cream transition-all duration-200"
          >
            Shop Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
