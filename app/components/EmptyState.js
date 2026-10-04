'use client';

// ─── EmptyState ────────────────────────────────────────────────────────────────
// Generic empty / no-results / error state component.

import Link from 'next/link';

export default function EmptyState({
  icon,
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      {icon && (
        <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-6 text-sage">
          {icon}
        </div>
      )}

      <h3 className="font-display text-2xl text-charcoal mb-3">{title}</h3>

      {description && (
        <p className="text-stone max-w-sm leading-relaxed mb-8">{description}</p>
      )}

      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="inline-flex items-center gap-2 bg-forest text-white font-body font-medium text-sm px-6 py-3 rounded-lg hover:bg-forest-dark transition-colors duration-200"
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-2 bg-forest text-white font-body font-medium text-sm px-6 py-3 rounded-lg hover:bg-forest-dark transition-colors duration-200"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
