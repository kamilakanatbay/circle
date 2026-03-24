import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ExploreGrid } from '@/components/ExploreGrid'

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Browse offline community activities by city and category.',
}

export default function ExplorePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-24 space-y-10">
      {/* Header */}
      <div className="space-y-3 pb-4 border-b border-mist/20">
        <p className="text-xs tracking-[0.3em] uppercase text-ash">What&apos;s on</p>
        <h1
          className="font-display text-cream leading-tight tracking-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Explore circles
        </h1>
        <p className="text-ash text-base max-w-md leading-relaxed">
          Offline activities, communities, and workshops — curated for the cities you love.
        </p>
      </div>

      {/* Grid with filters — wrapped in Suspense for useSearchParams */}
      <Suspense fallback={
        <div className="py-20 text-center text-ash text-sm">Loading circles...</div>
      }>
        <ExploreGrid />
      </Suspense>
    </div>
  )
}
