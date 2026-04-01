'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { activities as staticActivities, CITIES } from '@/lib/data'
import { ActivityCard } from './ActivityCard'
import { CategoryFilter } from './CategoryFilter'
import type { Activity, Category, City } from '@/lib/types'

export function ExploreGrid() {
  const searchParams = useSearchParams()

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [approvedActivities, setApprovedActivities] = useState<Activity[]>([])
  const [loadingActivities, setLoadingActivities] = useState(true)

  // Fetch approved submissions from Supabase
  useEffect(() => {
    fetch('/api/submissions')
      .then(r => r.json())
      .then(({ activities }) => { if (Array.isArray(activities)) setApprovedActivities(activities) })
      .catch(() => {})
      .finally(() => setLoadingActivities(false))
  }, [])

  const activities = useMemo(() => {
    const approvedIds = new Set(approvedActivities.map(a => a.id))
    const filtered = staticActivities.filter(a => !approvedIds.has(a.id))
    return [...filtered, ...approvedActivities]
  }, [approvedActivities])

  // Initialize from URL params on mount
  useEffect(() => {
    const cat = searchParams.get('category') as Category | null
    const city = searchParams.get('city') as City | null
    if (cat) setSelectedCategory(cat)
    if (city) setSelectedCity(city)
  }, [searchParams])

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return activities.filter(a => {
      const matchesCategory = !selectedCategory || a.category === selectedCategory
      const matchesCity = !selectedCity || a.city === selectedCity
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.tagline.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.city.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      return matchesCategory && matchesCity && matchesSearch
    })
  }, [selectedCategory, selectedCity, searchQuery])

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search activities, topics, hosts, cities..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="
            w-full px-5 py-4 pr-12 rounded-full
            bg-charcoal border border-carbon
            text-cream placeholder:text-ash/60
            text-sm
            focus:outline-none focus:border-mist
            transition-colors duration-200
          "
        />
        <svg
          className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-ash pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </div>

      {/* City selector */}
      <div>
        <p className="text-xs text-ash tracking-widest uppercase mb-3">City</p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCity(null)}
            className={`
              px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
              ${!selectedCity
                ? 'bg-cream text-ink border-cream'
                : 'border-mist text-ash hover:text-cream hover:border-silver'
              }
            `}
          >
            All cities
          </button>
          {CITIES.map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city === selectedCity ? null : city)}
              className={`
                px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
                ${city === selectedCity
                  ? 'bg-cream text-ink border-cream'
                  : 'border-mist text-ash hover:text-cream hover:border-silver'
                }
              `}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div>
        <p className="text-xs text-ash tracking-widest uppercase mb-3">Category</p>
        <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between pt-2 border-t border-mist/20">
        <p className="text-xs text-ash">
          <span className="text-cream font-medium">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'circle' : 'circles'} found
          {selectedCity && <span> in {selectedCity}</span>}
        </p>
        {(selectedCategory || selectedCity || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory(null)
              setSelectedCity(null)
              setSearchQuery('')
            }}
            className="text-xs text-ash hover:text-cream transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {loadingActivities ? (
        <div className="py-20 text-center text-ash text-sm">Loading circles…</div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <div className="text-center py-28 space-y-4">
          <p className="font-display text-2xl text-cream italic">No circles found.</p>
          <p className="text-sm text-ash">Try a different city, category, or search term.</p>
          <button
            onClick={() => {
              setSelectedCategory(null)
              setSelectedCity(null)
              setSearchQuery('')
            }}
            className="text-xs text-ash underline underline-offset-4 hover:text-cream transition-colors mt-2"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
