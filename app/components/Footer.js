'use client';

import Link from 'next/link';
import { Leaf, ArrowRight } from 'lucide-react';

const shopLinks = [
  { name: 'All Products',  href: '/products' },
  { name: 'Skincare',      href: '/products?category=skincare' },
  { name: 'Best Sellers',  href: '/products?sort=rating' },
  { name: 'New Arrivals',  href: '/products?badge=New' },
];

const supportLinks = [
  { name: 'About Us',   href: '/about' },
  { name: 'Contact',    href: '/contact' },
  { name: 'FAQ',        href: '/contact#faq' },
  { name: 'Shipping',   href: '/contact#shipping' },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-lg font-semibold mb-1">Stay in bloom</h3>
            <p className="text-white/70 text-sm font-body">
              Subscribe for botanical rituals, seasonal offers and new arrivals.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-0 w-full md:w-auto"
          >
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              placeholder="your@email.com"
              required
              className="flex-1 md:w-64 px-4 py-3 text-sm font-body bg-white/10 border border-white/20 rounded-l-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-3 bg-white text-forest text-sm font-body font-semibold rounded-r-lg hover:bg-cream transition-colors duration-200"
            >
              Subscribe
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="Swan Botanicals home">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-display text-xl font-semibold">Swan Botanicals</span>
            </Link>
            <p className="text-white/65 text-sm font-body leading-relaxed mb-6 max-w-xs">
              Premium botanical skincare crafted from nature&rsquo;s finest ingredients.
              Purity, sustainability, and effectiveness in every bottle.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Follow us on Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="#"
                aria-label="Follow us on Pinterest"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
              >
                {/* Pinterest icon */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Follow us on Twitter"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.502 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-white/50 mb-5">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-body text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-white/50 mb-5">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-body text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-white/50 mb-5">Contact</h4>
            <address className="not-italic space-y-3 text-sm font-body text-white/70">
              <p>123 Botanical Lane<br />Nature Valley, NV 12345</p>
              <p>
                <a href="tel:+15551234567" className="hover:text-white transition-colors duration-200">
                  +1 (555) 123-4567
                </a>
              </p>
              <p>
                <a href="mailto:hello@swanbotanicals.com" className="hover:text-white transition-colors duration-200">
                  hello@swanbotanicals.com
                </a>
              </p>
              <p className="text-white/50 text-xs">Mon – Fri, 9 am – 6 pm EST</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-white/40">
            &copy; {new Date().getFullYear()} Swan Botanicals. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs font-body text-white/40 hover:text-white/70 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-xs font-body text-white/40 hover:text-white/70 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-xs font-body text-white/40 hover:text-white/70 transition-colors duration-200">Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
