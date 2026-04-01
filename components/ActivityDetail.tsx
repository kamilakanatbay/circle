'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Activity } from '@/lib/types'

interface Props {
  activity: Activity
}

export function ActivityDetail({ activity }: Props) {
  const {
    title, tagline, description, image, category, city, location,
    date, duration, price, currency, capacity, attendees,
    host, tags, resources,
  } = activity

  const [reservationCount, setReservationCount] = useState(0)

  useEffect(() => {
    fetch(`/api/reserve?activityId=${activity.id}`)
      .then(r => r.json())
      .then(({ count }) => { if (typeof count === 'number') setReservationCount(count) })
      .catch(() => {})
  }, [activity.id])

  const totalAttendees = attendees + reservationCount
  const spotsLeft = capacity - totalAttendees
  const pctFull = Math.round((totalAttendees / capacity) * 100)
  const isFull = spotsLeft <= 0

  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [reserved, setReserved] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date))

  const formattedPrice =
    price === 0
      ? 'Free to attend'
      : new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency,
          maximumFractionDigits: 0,
        }).format(price)

  const resourceIcon = (type: string) => {
    if (type === 'book') return '📖'
    if (type === 'film') return '🎞️'
    if (type === 'playlist') return '🎵'
    return '📄'
  }

  function handleReserve() {
    if (!isFull) setModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setSubmitting(true)

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          activityId: activity.id,
          activitySlug: activity.slug,
          activityTitle: activity.title,
          activityDate: formattedDate,
          activityRawDate: activity.date,
          activityDuration: activity.duration,
          activityLocation: activity.location,
          price: activity.price,
          currency: activity.currency,
        }),
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error ?? 'Something went wrong')
      }

      setReserved(true)
      setReservationCount(prev => prev + 1)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not save reservation. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  function handleClose() {
    setModalOpen(false)
    if (reserved) {
      setReserved(false)
      setName('')
      setEmail('')
    }
  }

  return (
    <article className="max-w-6xl mx-auto px-6 md:px-12 pb-28">

      {/* ── Back link ── */}
      <div className="py-6">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm text-ash hover:text-cream transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to explore
        </Link>
      </div>

      {/* ── Hero image ── */}
      <div className="relative h-[45vh] md:h-[58vh] rounded-2xl overflow-hidden -mx-6 md:-mx-12 mb-12">
        <Image
          src={image}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover grayscale contrast-[1.1] brightness-70"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent" />

        {/* Category + city badge */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <span className="
            px-3 py-1.5 rounded-full
            bg-void/80 backdrop-blur-sm
            text-xs font-medium text-silver
            border border-mist/40
          ">
            {category}
          </span>
          <span className="
            px-3 py-1.5 rounded-full
            bg-void/80 backdrop-blur-sm
            text-xs font-medium text-silver
            border border-mist/40
          ">
            {city}
          </span>
        </div>

        {/* Title overlay (desktop) */}
        <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 hidden md:block">
          <h1
            className="font-display text-cream leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {title}
          </h1>
          <p className="text-ash text-lg mt-2">{tagline}</p>
        </div>
      </div>

      {/* Title (mobile) */}
      <div className="md:hidden mb-10 space-y-2">
        <h1 className="font-display text-cream leading-tight" style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)' }}>
          {title}
        </h1>
        <p className="text-ash text-base">{tagline}</p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14">

        {/* ── Left: Content ── */}
        <div className="space-y-12">

          {/* Description */}
          <section>
            <h2 className="font-display text-2xl text-cream mb-5">About this circle</h2>
            <div className="space-y-4 text-ash leading-relaxed text-base">
              {description.split('\n\n').map((para, i) => (
                <p key={i}>
                  {para.split('\n').map((line, j, arr) => (
                    <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                  ))}
                </p>
              ))}
            </div>
          </section>

          {/* Tags */}
          <section className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full border border-mist/60 text-xs text-ash"
              >
                #{tag}
              </span>
            ))}
          </section>

          {/* Host */}
          <section className="border-t border-mist/20 pt-10">
            <h2 className="font-display text-xl text-cream mb-5">Hosted by</h2>
            <div className="flex items-start gap-4">
              <div className="
                w-14 h-14 rounded-full shrink-0
                bg-mist flex items-center justify-center
                text-cream font-display text-xl font-semibold
              ">
                {host.name[0]}
              </div>
              <div>
                <p className="font-semibold text-cream">{host.name}</p>
                <p className="text-sm text-ash mt-1 leading-relaxed whitespace-pre-wrap">{host.bio}</p>
              </div>
            </div>
          </section>

          {/* Resources */}
          {resources && resources.length > 0 && (
            <section className="border-t border-mist/20 pt-10">
              <h2 className="font-display text-xl text-cream mb-5">
                Reading &amp; Listening
              </h2>
              <ul className="space-y-4">
                {resources.map((r, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-xl mt-0.5">{resourceIcon(r.type)}</span>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-mist block mb-0.5">
                        {r.type}
                      </span>
                      <a
                        href={r.url}
                        className="text-sm text-ash hover:text-cream underline underline-offset-2 transition-colors"
                      >
                        {r.title}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* ── Right: Booking sidebar ── */}
        <aside>
          <div className="sticky top-24 rounded-2xl border border-carbon bg-charcoal p-7 space-y-6">

            {/* Price */}
            <div className="border-b border-mist/20 pb-5">
              <p className="font-display text-3xl text-cream font-semibold">
                {formattedPrice}
              </p>
              {price > 0 && (
                <p className="text-xs text-ash mt-1">per person</p>
              )}
            </div>

            {/* Details */}
            <dl className="space-y-4">
              {[
                { label: 'Date & time', value: formattedDate },
                { label: 'Duration', value: duration },
              ].map(({ label, value }) => (
                <div key={label} className="space-y-0.5">
                  <dt className="text-[10px] uppercase tracking-widest text-mist">{label}</dt>
                  <dd className="text-sm text-cream">{value}</dd>
                </div>
              ))}

              {/* Location — hidden until reserved */}
              <div className="space-y-0.5">
                <dt className="text-[10px] uppercase tracking-widest text-mist">Location</dt>
                {reserved ? (
                  <dd className="text-sm text-cream">{location}</dd>
                ) : (
                  <dd className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-mist shrink-0">
                      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="text-xs text-mist italic">Revealed after reservation</span>
                  </dd>
                )}
              </div>
            </dl>

            {/* Capacity bar */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-xs">
                <span className="text-ash">{totalAttendees} joined</span>
                <span className="text-mist">{capacity} max</span>
              </div>
              <div className="h-1.5 bg-carbon rounded-full overflow-hidden">
                <div
                  className="h-full bg-cream/60 rounded-full transition-all duration-700"
                  style={{ width: `${pctFull}%` }}
                />
              </div>
              {!isFull && (
                <p className="text-xs text-silver">
                  {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} remaining
                </p>
              )}
            </div>

            {/* CTA button */}
            <button
              onClick={handleReserve}
              className="
                w-full py-4 rounded-full
                bg-cream text-ink
                text-sm font-semibold
                hover:bg-white active:scale-[0.98]
                transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed
              "
              disabled={isFull}
            >
              {isFull ? 'Join waitlist' : 'Reserve your spot'}
            </button>

            <p className="text-xs text-center text-mist leading-relaxed">
              No account needed —<br />confirm via email
            </p>
          </div>
        </aside>
      </div>

      {/* ── Reservation modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative z-10 w-full max-w-md rounded-2xl border border-carbon bg-charcoal p-8 space-y-6"
            onClick={e => e.stopPropagation()}
          >
            {!reserved ? (
              <>
                <div className="space-y-1">
                  <h2 className="font-display text-xl text-cream">Reserve your spot</h2>
                  <p className="text-sm text-ash">{title} · {formattedDate}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-mist block">
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ada Lovelace"
                      className="
                        w-full px-4 py-3 rounded-xl
                        bg-void border border-carbon
                        text-cream placeholder:text-ash/50 text-sm
                        focus:outline-none focus:border-mist
                        transition-colors
                      "
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-mist block">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="ada@example.com"
                      className="
                        w-full px-4 py-3 rounded-xl
                        bg-void border border-carbon
                        text-cream placeholder:text-ash/50 text-sm
                        focus:outline-none focus:border-mist
                        transition-colors
                      "
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="
                      w-full py-4 rounded-full
                      bg-cream text-ink
                      text-sm font-semibold
                      hover:bg-white active:scale-[0.98]
                      transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    {submitting ? 'Confirming…' : 'Confirm reservation'}
                  </button>
                </form>

                <p className="text-xs text-center text-mist">
                  We&apos;ll send confirmation details to your email.
                </p>
              </>
            ) : (
              <div className="text-center space-y-5 py-4">
                <div className="text-4xl">○</div>
                <div className="space-y-2">
                  <h2 className="font-display text-2xl text-cream">You&apos;re in.</h2>
                  <p className="text-ash text-sm leading-relaxed">
                    Confirmation sent to <span className="text-cream">{email}</span>.<br />
                    We&apos;ll see you at {title}.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="
                    px-8 py-3 rounded-full
                    border border-mist text-cream text-sm
                    hover:border-ash transition-colors
                  "
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  )
}
