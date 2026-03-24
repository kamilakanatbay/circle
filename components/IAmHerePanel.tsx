'use client'

import { useState, useEffect } from 'react'
import { ALL_MAP_INTERESTS } from '@/lib/mapData'
import type { MapInterest, MyStatus, ActiveDuration } from '@/lib/mapTypes'

interface Props {
  status: MyStatus
  onChange: (status: MyStatus) => void
  onClose: () => void
}

const DURATIONS: ActiveDuration[] = ['1 hour', '3 hours', 'Today']

export function IAmHerePanel({ status, onChange, onClose }: Props) {
  const [draft, setDraft] = useState<MyStatus>(status)

  // Sync if parent resets
  useEffect(() => { setDraft(status) }, [status])

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function toggleInterest(interest: MapInterest) {
    const has = draft.interests.includes(interest)
    setDraft(prev => ({
      ...prev,
      interests: has
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  function handleActivate() {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      onChange({ ...draft, isActive: true })
      onClose()
      return
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        // Apply ~200m blur
        const blurLat = pos.coords.latitude  + (Math.random() - 0.5) * 0.004
        const blurLng = pos.coords.longitude + (Math.random() - 0.5) * 0.004
        onChange({ ...draft, isActive: true, lat: blurLat, lng: blurLng })
        onClose()
      },
      () => {
        // Permission denied — activate without coords
        onChange({ ...draft, isActive: true })
        onClose()
      }
    )
  }

  function handleDeactivate() {
    onChange({ ...status, isActive: false })
    onClose()
  }

  const canActivate = draft.firstName.trim().length > 0 && draft.interests.length > 0

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-void/55 z-[1100]"
        style={{ animation: 'fadeIn 0.2s ease both' }}
        onClick={onClose}
      />

      {/* Panel */}
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
        "
        style={{ animation: 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1) both' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-8 h-1 rounded-full bg-mist/40" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="
            absolute top-4 right-4 z-10
            w-8 h-8 rounded-full
            bg-carbon/80 border border-mist/30
            flex items-center justify-center
            text-ash hover:text-cream transition-colors
          "
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-6 space-y-6">

          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-2 h-2 rounded-full bg-cream/60"
                style={status.isActive ? { animation: 'bubblePulse 1.8s ease-in-out infinite' } : {}}
              />
              <p className="text-[10px] tracking-[0.25em] uppercase text-ash">
                {status.isActive ? 'Signal active' : 'Your signal'}
              </p>
            </div>
            <h2 className="font-display text-xl text-cream">I&apos;m here</h2>
            <p className="text-xs text-ash mt-1.5 leading-relaxed">
              Let nearby people know you&apos;re open to meeting.
              First name only — you control everything else.
            </p>
          </div>

          {/* First name */}
          <div className="space-y-2">
            <label className="text-[10px] tracking-[0.2em] uppercase text-mist block">
              First name
            </label>
            <input
              type="text"
              value={draft.firstName}
              onChange={e => setDraft(p => ({ ...p, firstName: e.target.value }))}
              placeholder="Your first name"
              maxLength={30}
              className="
                w-full px-4 py-3 rounded-xl
                bg-carbon border border-mist/30
                text-cream placeholder:text-ash/40
                text-sm
                focus:outline-none focus:border-ash
                transition-colors
              "
            />
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <label className="text-[10px] tracking-[0.2em] uppercase text-mist block">
              What you&apos;re into
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_MAP_INTERESTS.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium
                    border transition-all duration-200
                    ${draft.interests.includes(interest)
                      ? 'bg-cream text-ink border-cream'
                      : 'bg-transparent text-ash border-mist/50 hover:border-silver hover:text-cream'
                    }
                  `}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] tracking-[0.2em] uppercase text-mist">
                I&apos;m open to&hellip;
              </label>
              <span className="text-[10px] text-mist">
                {draft.tagline.length}/60
              </span>
            </div>
            <textarea
              value={draft.tagline}
              onChange={e => {
                if (e.target.value.length <= 60) {
                  setDraft(p => ({ ...p, tagline: e.target.value }))
                }
              }}
              placeholder="e.g. talking about startups and coffee"
              rows={2}
              className="
                w-full px-4 py-3 rounded-xl
                bg-carbon border border-mist/30
                text-cream placeholder:text-ash/40
                text-sm resize-none leading-relaxed
                focus:outline-none focus:border-ash
                transition-colors
              "
            />
          </div>

          {/* Duration */}
          <div className="space-y-2.5">
            <label className="text-[10px] tracking-[0.2em] uppercase text-mist block">
              Active for
            </label>
            <div className="flex gap-2">
              {DURATIONS.map(d => (
                <button
                  key={d}
                  onClick={() => setDraft(p => ({ ...p, duration: d }))}
                  className={`
                    flex-1 py-2.5 rounded-full text-xs font-medium
                    border transition-all duration-200
                    ${draft.duration === d
                      ? 'bg-cream text-ink border-cream'
                      : 'bg-transparent text-ash border-mist/50 hover:border-silver hover:text-cream'
                    }
                  `}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Activate / Deactivate */}
          <div className="space-y-3 pt-1">
            {status.isActive ? (
              <>
                <button
                  onClick={handleDeactivate}
                  className="
                    w-full py-3.5 rounded-full text-sm font-semibold
                    bg-mist/15 text-ash border border-mist/30
                    hover:bg-mist/25 transition-colors
                  "
                >
                  Go invisible
                </button>
                <p className="text-[10px] text-center text-mist/50">
                  Your bubble is visible on the map right now
                </p>
              </>
            ) : (
              <>
                <button
                  onClick={handleActivate}
                  disabled={!canActivate}
                  className={`
                    w-full py-3.5 rounded-full text-sm font-semibold
                    transition-all duration-200
                    ${canActivate
                      ? 'bg-cream text-ink hover:bg-white active:scale-[0.98]'
                      : 'bg-mist/15 text-ash/40 cursor-not-allowed'
                    }
                  `}
                >
                  Activate my signal ✦
                </button>
                {!canActivate && (
                  <p className="text-[10px] text-center text-mist/50">
                    Add your name and at least one interest
                  </p>
                )}
              </>
            )}

            {/* Safety note */}
            <div className="border-t border-mist/20 pt-4">
              <p className="text-[10px] text-mist/45 leading-relaxed text-center">
                Your exact location is never shown — only your neighbourhood.
                Your bubble is only visible to others who are also active.
                You can go invisible at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
