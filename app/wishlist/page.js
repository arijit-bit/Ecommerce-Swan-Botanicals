'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ChevronRight, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import EmptyState from '../components/EmptyState';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { show } = useToast();

  function handleMoveToCart(product) {
    addToCart(product);
    removeFromWishlist(product.id);
    show(`${product.name} moved to cart`, 'success');
  }

  function handleRemove(product) {
    removeFromWishlist(product.id);
    show(`Removed from wishlist`, 'info');
  }

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <section className="bg-cream border-b border-sand py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs font-body text-stone mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-forest transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <span className="text-charcoal font-medium">Wishlist</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl text-charcoal flex items-center gap-3">
            Wishlist
            {wishlistItems.length > 0 && (
              <span className="text-lg font-body font-normal text-stone">
                ({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlistItems.length === 0 ? (
          <EmptyState
            icon={<Heart className="w-8 h-8" />}
            title="Your wishlist is empty"
            description="Save products you love and come back to them anytime."
            action={{ label: 'Explore Collection', href: '/products' }}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((product) => {
                const discount = product.originalPrice
                  ? Math.round((1 - product.price / product.originalPrice) * 100)
                  : null;

                return (
                  <article
                    key={product.id}
                    className="bg-white border border-sand rounded-2xl overflow-hidden group"
                  >
                    {/* Image */}
                    <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-cream">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-forest text-white text-[11px] font-body font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md">
                          {product.badge}
                        </span>
                      )}
                      {discount && (
                        <span className="absolute top-3 right-3 bg-earth text-white text-[11px] font-body font-semibold uppercase px-2.5 py-1 rounded-md">
                          -{discount}%
                        </span>
                      )}
                    </Link>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-[11px] font-body text-sage uppercase tracking-widest mb-1">{product.category}</p>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-display text-sm text-charcoal hover:text-forest transition-colors mb-3 line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-body font-semibold text-charcoal">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm font-body text-stone line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleMoveToCart(product)}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-forest text-white font-body text-xs font-medium py-2.5 rounded-lg hover:bg-forest-dark transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleRemove(product)}
                          aria-label={`Remove ${product.name} from wishlist`}
                          className="w-9 flex items-center justify-center border border-sand rounded-lg text-stone hover:text-red-500 hover:border-red-200 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 font-body text-sm font-medium text-forest hover:underline"
              >
                Continue shopping <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
