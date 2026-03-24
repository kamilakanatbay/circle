'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { MapFilters } from './MapFilters'
import { PersonCard } from './PersonCard'
import { IAmHerePanel } from './IAmHerePanel'
import { MAP_USERS } from '@/lib/mapData'
import type { MapUser, MapInterest, RadiusKm, WaveState, MyStatus } from '@/lib/mapTypes'

// MapView itself must also be dynamically imported since it uses leaflet
const MapView = dynamic(
  () => import('./MapView').then(m => ({ default: m.MapView })),
  { ssr: false }
)

export default function MapClientShell() {
  // ── Filter state ──────────────────────────────────────────
  const [radiusKm, setRadiusKm] = useState<RadiusKm>(5)
  const [selectedInterests, setSelectedInterests] = useState<MapInterest[]>([])

  // ── Selected person ───────────────────────────────────────
  const [selectedUser, setSelectedUser] = useState<MapUser | null>(null)

  // ── Wave / match state per user ───────────────────────────
  const [waves, setWaves] = useState<Record<string, WaveState>>({})

  // ── "I'm here" panel ─────────────────────────────────────
  const [iAmHerePanelOpen, setIAmHerePanelOpen] = useState(false)

  // ── My own status ─────────────────────────────────────────
  const [myStatus, setMyStatus] = useState<MyStatus>({
    isActive: false,
    firstName: '',
    interests: [],
    tagline: '',
    duration: '3 hours',
    lat: null,
    lng: null,
  })

  function handleWave(userId: string) {
    setWaves(prev => {
      const current = prev[userId] ?? 'none'
      if (current !== 'none') return prev
      // 50% chance of instant match for demo
      const otherWaved = Math.random() > 0.5
      return { ...prev, [userId]: otherWaved ? 'matched' : 'waved' }
    })
  }

  function handleReport() {
    setSelectedUser(null)
  }

  // Filter users by selected interests
  const visibleUsers = useMemo(() => {
    if (selectedInterests.length === 0) return MAP_USERS
    return MAP_USERS.filter(u =>
      selectedInterests.some(i => u.interests.includes(i))
    )
  }, [selectedInterests])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Map canvas */}
      <MapView
        users={visibleUsers}
        myStatus={myStatus}
        radiusKm={radiusKm}
        onUserClick={setSelectedUser}
      />

      {/* Floating filter bar */}
      <MapFilters
        radiusKm={radiusKm}
        onRadiusChange={setRadiusKm}
        selectedInterests={selectedInterests}
        onInterestsChange={setSelectedInterests}
        isActive={myStatus.isActive}
        onIAmHereClick={() => setIAmHerePanelOpen(true)}
      />

      {/* Person bottom sheet */}
      {selectedUser && (
        <PersonCard
          user={selectedUser}
          waveState={waves[selectedUser.id] ?? 'none'}
          myInterests={myStatus.interests}
          onWave={() => handleWave(selectedUser.id)}
          onReport={handleReport}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {/* "I'm here" panel */}
      {iAmHerePanelOpen && (
        <IAmHerePanel
          status={myStatus}
          onChange={setMyStatus}
          onClose={() => setIAmHerePanelOpen(false)}
        />
      )}
    </div>
  )
}
