'use client';

// ─── ProductCard ──────────────────────────────────────────────────────────────
// Premium product card for grids. Includes image, badge, rating, price,
// wishlist toggle, and add-to-cart action.

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import Rating from './Rating';
import WishlistButton from './WishlistButton';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { show } = useToast();

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    show(`${product.name} added to cart`, 'success');
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <article className="group relative bg-white rounded-xl border border-sand overflow-hidden hover-lift transition-all duration-300">
      {/* Image area */}
      <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-cream">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-forest text-white text-[11px] font-body font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
              {product.badge}
            </span>
          )}

          {/* Discount badge */}
          {discount && (
            <span className="absolute top-3 right-12 bg-earth text-white text-[11px] font-body font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
              -{discount}%
            </span>
          )}

          {/* Wishlist button */}
          <div className="absolute top-3 right-3">
            <WishlistButton product={product} size="sm" />
          </div>

          {/* Add to cart overlay — appears on hover */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full flex items-center justify-center gap-2 bg-forest text-white text-sm font-body font-medium py-3 hover:bg-forest-dark active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </Link>

      {/* Product info */}
      <div className="p-4">
        <div className="mb-1">
          <span className="text-[11px] font-body text-sage uppercase tracking-widest">
            {product.category}
          </span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-base text-charcoal leading-snug mb-2 group-hover:text-forest transition-colors duration-150 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <Rating rating={product.rating} reviewCount={product.reviewCount} size="xs" />

        <div className="flex items-center gap-2 mt-3">
          <span className="font-body font-semibold text-charcoal">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="font-body text-sm text-stone line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Mobile add-to-cart (visible on mobile since hover doesn't work well) */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="mt-3 w-full flex items-center justify-center gap-2 border border-forest text-forest text-sm font-body font-medium py-2.5 rounded-lg hover:bg-forest hover:text-white active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed sm:hidden"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </article>
  );
}
