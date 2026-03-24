'use client'

import { CATEGORIES } from '@/lib/data'
import type { Category } from '@/lib/types'

interface Props {
  selected: Category | null
  onChange: (cat: Category | null) => void
}

export function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mx-6 px-6 md:-mx-12 md:px-12">
      <button
        onClick={() => onChange(null)}
        className={`
          shrink-0 px-4 py-2 rounded-full text-sm font-medium
          border transition-all duration-200
          ${selected === null
            ? 'bg-cream text-ink border-cream'
            : 'bg-transparent text-ash border-mist hover:border-silver hover:text-cream'
          }
        `}
      >
        All
      </button>

      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat === selected ? null : cat)}
          className={`
            shrink-0 px-4 py-2 rounded-full text-sm font-medium
            border transition-all duration-200 whitespace-nowrap
            ${cat === selected
              ? 'bg-cream text-ink border-cream'
              : 'bg-transparent text-ash border-mist hover:border-silver hover:text-cream'
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
