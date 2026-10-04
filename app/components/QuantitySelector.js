'use client';

// ─── QuantitySelector ─────────────────────────────────────────────────────────

import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
  min = 1,
  max = 99,
  size = 'md',
}) {
  const isAtMin = quantity <= min;
  const isAtMax = quantity >= max;

  const sizes = {
    sm: { btn: 'w-7 h-7', icon: 'w-3 h-3', count: 'min-w-[1.75rem] text-sm' },
    md: { btn: 'w-9 h-9', icon: 'w-4 h-4', count: 'min-w-[2rem] text-base' },
    lg: { btn: 'w-11 h-11', icon: 'w-5 h-5', count: 'min-w-[2.5rem] text-lg' },
  };
  const s = sizes[size] ?? sizes.md;

  return (
    <div className="flex items-center border border-sand rounded-lg overflow-hidden bg-white" role="group" aria-label="Quantity selector">
      <button
        onClick={onDecrease}
        disabled={isAtMin}
        aria-label="Decrease quantity"
        className={`${s.btn} flex items-center justify-center text-charcoal hover:bg-cream disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 shrink-0`}
      >
        <Minus className={s.icon} />
      </button>

      <span
        className={`${s.count} text-center font-body font-medium text-charcoal select-none`}
        aria-live="polite"
        aria-label={`Quantity: ${quantity}`}
      >
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        disabled={isAtMax}
        aria-label="Increase quantity"
        className={`${s.btn} flex items-center justify-center text-charcoal hover:bg-cream disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 shrink-0`}
      >
        <Plus className={s.icon} />
      </button>
    </div>
  );
}
