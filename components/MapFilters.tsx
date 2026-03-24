'use client'

import { ALL_MAP_INTERESTS } from '@/lib/mapData'
import type { MapInterest, RadiusKm } from '@/lib/mapTypes'

interface Props {
  radiusKm: RadiusKm
  onRadiusChange: (r: RadiusKm) => void
  selectedInterests: MapInterest[]
  onInterestsChange: (interests: MapInterest[]) => void
  isActive: boolean
  onIAmHereClick: () => void
}

export function MapFilters({
  radiusKm,
  onRadiusChange,
  selectedInterests,
  onInterestsChange,
  isActive,
  onIAmHereClick,
}: Props) {
  function toggleInterest(interest: MapInterest) {
    if (selectedInterests.includes(interest)) {
      onInterestsChange(selectedInterests.filter(i => i !== interest))
    } else {
      onInterestsChange([...selectedInterests, interest])
    }
  }

  return (
    <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-col gap-2 pointer-events-none">

      {/* ── Top bar: label + radius + I'm here ── */}
      <div
        className="
          pointer-events-auto
          flex items-center gap-2 flex-wrap sm:flex-nowrap
          bg-void/88 backdrop-blur-md
          border border-mist/30
          rounded-2xl px-4 py-2.5
          shadow-[0_4px_24px_rgba(0,0,0,0.6)]
        "
      >
        {/* Label */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-medium tracking-[0.28em] uppercase text-ash">
            Find your people
          </span>
          <span className="w-px h-4 bg-mist/40" />
        </div>

        {/* Radius */}
        <div className="flex gap-1.5 shrink-0">
          {([1, 5, 10] as RadiusKm[]).map(r => (
            <button
              key={r}
              onClick={() => onRadiusChange(r)}
              className={`
                px-3 py-1 rounded-full text-xs font-medium
                border transition-all duration-200
                ${r === radiusKm
                  ? 'bg-cream text-ink border-cream'
                  : 'bg-transparent text-ash border-mist hover:border-silver hover:text-cream'
                }
              `}
            >
              {r}km
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User count */}
        <span className="text-[10px] text-mist shrink-0 hidden md:block">
          {28} open to meet
        </span>

        {/* I'm here toggle */}
        <button
          onClick={onIAmHereClick}
          className={`
            shrink-0 flex items-center gap-2
            px-4 py-1.5 rounded-full text-xs font-semibold
            border transition-all duration-200
            ${isActive
              ? 'bg-cream text-ink border-cream'
              : 'bg-transparent text-cream border-mist/60 hover:border-cream'
            }
          `}
        >
          {isActive && (
            <span
              className="w-2 h-2 rounded-full bg-ink/70 shrink-0"
              style={{ animation: 'bubblePulse 1.8s ease-in-out infinite' }}
            />
          )}
          {isActive ? "Active" : "I'm here ✦"}
        </button>
      </div>

      {/* ── Interest chips row ── */}
      <div className="pointer-events-auto flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
        {ALL_MAP_INTERESTS.map(interest => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`
              shrink-0 px-3 py-1.5 rounded-full text-xs font-medium
              border transition-all duration-200 whitespace-nowrap
              backdrop-blur-md
              ${selectedInterests.includes(interest)
                ? 'bg-cream text-ink border-cream shadow-[0_2px_12px_rgba(245,240,232,0.2)]'
                : 'bg-void/80 text-ash border-mist/50 hover:border-silver hover:text-cream'
              }
            `}
          >
            {interest}
          </button>
        ))}
      </div>
    </div>
  )
}
