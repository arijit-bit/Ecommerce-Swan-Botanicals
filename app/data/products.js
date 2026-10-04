/**
 * Swan Botanicals — Product Catalogue
 *
 * This is the single source of truth for product data.
 * In a future backend integration, replace this export with
 * an async API call without changing any consumer code.
 */

export const products = [
  {
    id: 'chamomile-facial-oil',
    slug: 'chamomile-facial-oil',
    name: 'Chamomile Facial Oil',
    category: 'Skincare',
    categorySlug: 'skincare',
    price: 42,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 124,
    image: '/images/products/chamomile-oil.jpg',
    badge: 'Best Seller',
    inStock: true,
    volume: '30 ml',
    shelfLife: '18 months',
    description:
      'A lightweight, nourishing facial oil rich in bisabolol and essential fatty acids. Crafted from whole chamomile flowers, it soothes inflammation, reduces redness and deeply moisturises without heaviness. Suitable for all skin types, including sensitive.',
    shortDescription: 'Nourish your skin with our soothing, fast-absorbing Chamomile Facial Oil.',
    benefits: [
      'Deeply moisturises without greasiness',
      'Reduces visible redness and irritation',
      'Brightens and evens skin tone',
      'Supports a healthy, calm complexion',
      'Non-comedogenic — safe for acne-prone skin',
    ],
    ingredients:
      'Chamomilla Recutita (Chamomile) Flower Oil, Squalane, Rosa Canina (Rosehip) Seed Oil, Tocopherol (Vitamin E), Jojoba Esters, Bisabolol',
    usage:
      'Apply 3–4 drops to clean, slightly damp skin morning and/or evening. Gently press into the skin with fingertips. Can be used alone or blended with your regular moisturiser.',
    skinType: ['All', 'Sensitive', 'Dry', 'Combination'],
  },
  {
    id: 'lavender-night-cream',
    slug: 'lavender-night-cream',
    name: 'Lavender Night Cream',
    category: 'Skincare',
    categorySlug: 'skincare',
    price: 54,
    originalPrice: 68,
    rating: 4.9,
    reviewCount: 97,
    image: '/images/products/lavender-cream.png',
    badge: 'New',
    inStock: true,
    volume: '50 ml',
    shelfLife: '12 months',
    description:
      'A rich, restorative night cream infused with pure Lavandula Angustifolia essential oil and botanical hyaluronic acid. Works while you sleep to plump, repair and restore the skin\'s natural luminosity. Wake up to visibly softer, more radiant skin.',
    shortDescription: 'Experience deep overnight restoration with our calming Lavender Night Cream.',
    benefits: [
      'Intensive overnight moisture and repair',
      'Plumps fine lines and restores elasticity',
      'Calms and soothes the senses for better sleep',
      'Strengthens the natural skin barrier',
      'Fragrance from pure essential oil only',
    ],
    ingredients:
      'Aqua, Butyrospermum Parkii (Shea) Butter, Sodium Hyaluronate, Lavandula Angustifolia (Lavender) Oil, Ceramide NP, Allantoin, Ascorbyl Glucoside (Vitamin C), Glycerin, Cetearyl Alcohol',
    usage:
      'Apply a small amount to face and neck after cleansing, as the final step of your evening skincare routine. Smooth gently onto skin until fully absorbed. Use nightly.',
    skinType: ['Normal', 'Dry', 'Mature'],
  },
  {
    id: 'rose-hydrating-mist',
    slug: 'rose-hydrating-mist',
    name: 'Rose Hydrating Mist',
    category: 'Skincare',
    categorySlug: 'skincare',
    price: 28,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 83,
    image: '/images/products/rose-mist.jpg',
    badge: null,
    inStock: true,
    volume: '100 ml',
    shelfLife: '12 months',
    description:
      'A refreshing facial mist crafted with pure Rosa Damascena hydrosol, sourced from hand-harvested roses. Instantly revitalises and balances the skin throughout the day — perfect over bare skin or to set makeup. A sensory ritual as much as a skincare step.',
    shortDescription: 'Revitalise your skin with our refreshing, pure Rose Hydrating Mist.',
    benefits: [
      'Instant hydration and radiance boost',
      'Sets and refreshes makeup effortlessly',
      'Balances and tones skin',
      'Uplifting, delicate natural rose scent',
      'Alcohol-free and suitable for all ages',
    ],
    ingredients:
      'Rosa Damascena Flower Water, Glycerin, Niacinamide, Panthenol, Sodium PCA, Aloe Barbadensis Leaf Juice, Citric Acid',
    usage:
      'Hold 20–30 cm from face and mist liberally with eyes closed. Use morning and evening, or throughout the day for a hydration boost. May be used over or under makeup.',
    skinType: ['All', 'Oily', 'Combination', 'Sensitive'],
  },
  {
    id: 'green-tea-cleanser',
    slug: 'green-tea-cleanser',
    name: 'Green Tea Cleanser',
    category: 'Skincare',
    categorySlug: 'skincare',
    price: 32,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 61,
    image: '/images/products/green-tea-cleanser.jpg',
    badge: null,
    inStock: true,
    volume: '150 ml',
    shelfLife: '18 months',
    description:
      'A gentle, antioxidant-rich gel cleanser powered by high-grade matcha and whole-leaf green tea extract. Effectively removes impurities, excess sebum and traces of pollution without disrupting the skin\'s natural moisture barrier. Skin feels fresh, clean and comfortably balanced — never tight.',
    shortDescription: 'Purify and balance your skin with our gentle antioxidant Green Tea Cleanser.',
    benefits: [
      'Gentle yet thorough deep cleanse',
      'Rich in polyphenol antioxidants',
      'Preserves the natural moisture barrier',
      'Reduces the appearance of pores',
      'Suitable for all skin types including sensitive',
    ],
    ingredients:
      'Aqua, Aloe Barbadensis Leaf Juice, Camellia Sinensis (Green Tea) Leaf Extract, Glycerin, Sodium Cocoyl Glutamate, Panthenol, Allantoin, Citric Acid',
    usage:
      'Apply a small amount to damp face and massage gently in circular motions for 30–60 seconds. Rinse thoroughly with lukewarm water. Use morning and evening.',
    skinType: ['All', 'Oily', 'Combination', 'Sensitive'],
  },
];

/**
 * Helper — get a product by its slug.
 * Returns undefined if not found (caller should handle the 404 case).
 */
export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

/**
 * Helper — get all unique categories.
 */
export function getCategories() {
  return [...new Set(products.map((p) => p.category))];
}

/**
 * Helper — get related products (same category, excluding self).
 */
export function getRelatedProducts(slug, limit = 3) {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return products
    .filter((p) => p.category === product.category && p.slug !== slug)
    .slice(0, limit);
}
