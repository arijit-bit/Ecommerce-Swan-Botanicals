'use client';

// ─── WishlistButton ───────────────────────────────────────────────────────────
// Heart icon button that toggles wishlist state with animation.

import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from './Toast';

export default function WishlistButton({ product, size = 'md', className = '' }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { show } = useToast();

  const wishlisted = isWishlisted(product.id);

  function handleToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    show(
      wishlisted ? `Removed from wishlist` : `Added to wishlist`,
      'success'
    );
  }

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      aria-pressed={wishlisted}
      className={`
        ${sizes[size] ?? sizes.md}
        flex items-center justify-center rounded-full
        border transition-all duration-200
        ${wishlisted
          ? 'bg-red-50 border-red-200 text-red-500'
          : 'bg-white border-sand text-stone hover:border-sage hover:text-sage'
        }
        ${className}
      `}
    >
      <Heart
        className={`${iconSizes[size] ?? iconSizes.md} transition-all duration-200 ${wishlisted ? 'fill-current' : ''}`}
        aria-hidden="true"
      />
    </button>
  );
}
