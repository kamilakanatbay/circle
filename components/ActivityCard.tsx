'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Activity } from '@/lib/types'

interface Props {
  activity: Activity
  size?: 'sm' | 'md' | 'lg'
}

export function ActivityCard({ activity, size = 'md' }: Props) {
  const {
    id, slug, title, tagline, host, city, date, category,
    attendees, capacity, price, currency, image,
  } = activity

  const [reservationCount, setReservationCount] = useState(0)

  useEffect(() => {
    fetch(`/api/reserve?activityId=${id}`)
      .then(r => r.json())
      .then(({ count }) => { if (typeof count === 'number') setReservationCount(count) })
      .catch(() => {})
  }, [id])

  const totalAttendees = attendees + reservationCount
  const spotsLeft = capacity - totalAttendees
  const isFull = spotsLeft <= 0
  const pctFull = Math.min(Math.round((totalAttendees / capacity) * 100), 100)

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date))

  const formattedPrice =
    price === 0
      ? 'Free'
      : new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency,
          maximumFractionDigits: 0,
        }).format(price)

  const imageHeight =
    size === 'lg' ? 'h-72' : size === 'sm' ? 'h-36' : 'h-52'

  return (
    <Link
      href={`/activity/${slug}`}
      className="
        group block rounded-xl overflow-hidden
        bg-charcoal border border-carbon
        hover:border-mist
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]
      "
    >
      {/* ── Image ── */}
      <div className={`relative overflow-hidden ${imageHeight}`}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="
            object-cover
            grayscale contrast-[1.1] brightness-75
            group-hover:brightness-85 group-hover:grayscale-[0.7]
            transition-all duration-500 ease-out
            group-hover:scale-105
          "
        />

        {/* Bottom gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />

        {/* Category pill */}
        <span className="
          absolute top-3 left-3
          px-2.5 py-1 rounded-full
          bg-void/80 backdrop-blur-sm
          text-[10px] font-medium text-silver
          border border-mist/40
          tracking-wide
        ">
          {category}
        </span>

        {/* Price pill */}
        <span className="
          absolute top-3 right-3
          px-2.5 py-1 rounded-full
          bg-void/80 backdrop-blur-sm
          text-[10px] font-semibold text-cream
          border border-mist/40
        ">
          {formattedPrice}
        </span>
      </div>

      {/* ── Card body ── */}
      <div className="p-5 space-y-3.5">
        <div>
          <h3 className="
            font-display text-lg font-semibold
            text-cream leading-snug
            group-hover:text-white transition-colors duration-200
          ">
            {title}
          </h3>
          <p className="text-sm text-ash mt-1.5 line-clamp-2 leading-relaxed">
            {tagline}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-ash">
          <span>{city}</span>
          <span className="text-mist">·</span>
          <span>{formattedDate}</span>
        </div>

        {/* Capacity bar */}
        <div>
          <div className="h-px bg-carbon overflow-hidden rounded-full">
            <div
              className="h-full bg-ash rounded-full transition-all duration-700"
              style={{ width: `${pctFull}%` }}
            />
          </div>
        </div>

        {/* Host + spots row */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-2">
            <div className="
              w-6 h-6 rounded-full
              bg-mist flex items-center justify-center
              text-[11px] font-medium text-cream font-display
              shrink-0
            ">
              {host.name[0]}
            </div>
            <span className="text-xs text-ash">{host.name}</span>
          </div>

          <span className={`text-xs ${isFull ? 'text-mist' : 'text-silver'}`}>
            {isFull ? 'Full' : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`}
          </span>
        </div>
      </div>
    </Link>
  )
}
