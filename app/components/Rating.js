'use client';

// ─── Rating ───────────────────────────────────────────────────────────────────
// Renders a row of star icons with optional review count label.

export default function Rating({ rating = 0, reviewCount, size = 'sm', showCount = true }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  const starSizes = { xs: 'w-3 h-3', sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
  const textSizes = { xs: 'text-xs', sm: 'text-xs', md: 'text-sm', lg: 'text-base' };
  const starClass = starSizes[size] ?? starSizes.sm;
  const textClass = textSizes[size] ?? textSizes.sm;

  return (
    <div className="flex items-center gap-1.5" role="img" aria-label={`${rating} out of 5 stars`}>
      <div className="flex items-center gap-0.5">
        {/* Full stars */}
        {Array.from({ length: full }).map((_, i) => (
          <svg key={`f-${i}`} className={`${starClass} text-earth`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        {/* Half star */}
        {half && (
          <svg key="half" className={`${starClass} text-earth`} viewBox="0 0 20 20" aria-hidden="true">
            <defs>
              <linearGradient id="half-grad">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-grad)"
              stroke="currentColor"
              strokeWidth="0.5"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        )}

        {/* Empty stars */}
        {Array.from({ length: empty }).map((_, i) => (
          <svg key={`e-${i}`} className={`${starClass} text-sand`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {showCount && reviewCount !== undefined && (
        <span className={`${textClass} text-stone`}>
          {rating.toFixed(1)} ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
