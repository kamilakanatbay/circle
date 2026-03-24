'use client'

import { useEffect } from 'react'
import type { MapUser, MapInterest, WaveState } from '@/lib/mapTypes'

interface Props {
  user: MapUser
  waveState: WaveState
  myInterests: MapInterest[]
  onWave: () => void
  onReport: () => void
  onClose: () => void
}

export function PersonCard({
  user,
  waveState,
  myInterests,
  onWave,
  onReport,
  onClose,
}: Props) {
  const mutualInterests = user.interests.filter(i => myInterests.includes(i))
  const isMatched = waveState === 'matched'
  const hasWaved = waveState === 'waved'

  const activeUntil = new Date(user.activeUntil)
  const msLeft = activeUntil.getTime() - Date.now()
  const hoursLeft = Math.max(0, Math.floor(msLeft / (1000 * 60 * 60)))
  const minsLeft = Math.max(0, Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60)))

  const timeLabel =
    msLeft <= 0
      ? 'just wrapped up'
      : hoursLeft > 0
      ? `~${hoursLeft}h left`
      : `~${minsLeft}m left`

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-void/50 z-[1100]"
        style={{ animation: 'fadeIn 0.2s ease both' }}
        onClick={onClose}
      />

      {/* Card */}
      <div
        className="
          fixed z-[1101]
          bottom-0 inset-x-0
          md:bottom-auto md:top-[72px] md:right-4 md:left-auto md:w-96
          md:max-h-[calc(100vh-88px)]
          bg-charcoal
          border border-mist/40
          rounded-t-3xl md:rounded-2xl
          overflow-y-auto
          shadow-[0_-8px_48px_rgba(0,0,0,0.75)]
          md:shadow-[8px_0_48px_rgba(0,0,0,0.6)]
        "
        style={{ animation: 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-8 h-1 rounded-full bg-mist/40" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="
            absolute top-4 right-4 z-10
            w-8 h-8 rounded-full
            bg-carbon/80 border border-mist/30
            flex items-center justify-center
            text-ash hover:text-cream
            transition-colors duration-200
          "
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-6 space-y-5">

          {/* ── Matched banner ── */}
          {isMatched && (
            <div
              className="bg-cream text-ink rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ animation: 'fadeIn 0.3s ease both' }}
            >
              <span className="text-2xl">👋</span>
              <div>
                <p className="text-sm font-semibold">You matched!</p>
                <p className="text-xs opacity-60 mt-0.5">
                  Say hi in real life — look for the ring or bracelet
                </p>
              </div>
            </div>
          )}

          {/* ── Avatar + name ── */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div
                className="
                  w-16 h-16 rounded-full
                  bg-mist/20 border border-mist/40
                  flex items-center justify-center
                  font-display text-2xl font-bold text-cream
                "
              >
                {user.initial}
              </div>
              {/* Verified badge */}
              {user.verified && (
                <div
                  className="
                    absolute -bottom-1 -right-1
                    w-5 h-5 rounded-full bg-cream
                    border-2 border-charcoal
                    flex items-center justify-center
                  "
                  title="Verified"
                >
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1 4.5l2.5 2.5L8 2" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="font-display text-xl font-semibold text-cream leading-tight">
                {user.firstName}
                {isMatched && (
                  <span className="ml-1 text-sm text-ash font-sans font-normal">
                    {/* full name would show here in prod */}
                  </span>
                )}
              </h3>
              <p className="text-xs text-ash mt-0.5">{user.neighborhood}, {user.city}</p>
              <p className="text-xs text-mist mt-0.5">{timeLabel}</p>
            </div>
          </div>

          {/* ── Tagline ── */}
          <div className="border-l-2 border-mist/30 pl-3">
            <p className="text-sm text-ash italic leading-relaxed">
              &ldquo;{user.tagline}&rdquo;
            </p>
          </div>

          {/* ── Interests ── */}
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-mist mb-3">
              Interests
            </p>
            <div className="flex flex-wrap gap-2">
              {user.interests.map(interest => {
                const mutual = mutualInterests.includes(interest)
                return (
                  <span
                    key={interest}
                    className={`
                      px-2.5 py-1 rounded-full text-xs font-medium
                      border transition-colors
                      ${mutual
                        ? 'bg-cream/12 text-cream border-cream/35'
                        : 'bg-transparent text-ash border-mist/40'
                      }
                    `}
                  >
                    {mutual && <span className="mr-1 text-[9px] opacity-70">★</span>}
                    {interest}
                  </span>
                )
              })}
            </div>
            {mutualInterests.length > 0 && (
              <p className="text-[10px] text-mist/50 mt-2">
                ★ Shared interests
              </p>
            )}
          </div>

          {/* ── Actions ── */}
          <div className="space-y-2.5 pt-1">
            {!isMatched ? (
              <button
                onClick={onWave}
                disabled={hasWaved}
                className={`
                  w-full py-3.5 rounded-full text-sm font-semibold
                  transition-all duration-200
                  ${hasWaved
                    ? 'bg-mist/15 text-ash border border-mist/30 cursor-default'
                    : 'bg-cream text-ink hover:bg-white active:scale-[0.98]'
                  }
                `}
              >
                {hasWaved ? '👋 Wave sent — waiting...' : 'Wave 👋'}
              </button>
            ) : (
              <div className="w-full py-3.5 rounded-full text-sm font-semibold text-center bg-cream/8 text-cream border border-cream/25">
                Matched 🎉 Say hi when you see them
              </div>
            )}

            <button
              onClick={onReport}
              className="w-full py-2 text-xs text-mist/60 hover:text-ash transition-colors"
            >
              Report this person
            </button>
          </div>

          {/* ── Safety note ── */}
          <p className="text-[10px] text-mist/40 text-center leading-relaxed pb-1">
            Only first names are shown. Location is approximate. Mutual wave required to connect.
          </p>
        </div>
      </div>
    </>
  )
}
