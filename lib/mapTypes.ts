export type MapInterest =
  | 'Pottery' | 'Yoga' | 'Book Clubs' | 'Design' | 'Photography'
  | 'Dance' | 'Cooking' | 'Writing' | 'Film'
  | 'Startups' | 'Tech' | 'Art' | 'Music' | 'Travel'
  | 'Philosophy' | 'Fitness' | 'Food'

export type ActiveDuration = '1 hour' | '3 hours' | 'Today'

export type RadiusKm = 1 | 5 | 10

export type WaveState = 'none' | 'waved' | 'matched'

export interface MapUser {
  id: string
  firstName: string
  initial: string
  interests: MapInterest[]
  tagline: string
  lat: number         // pre-blurred at data level (±200–400m offset)
  lng: number
  activeUntil: string // ISO date string
  waveCount: number   // social proof, internal use
  verified: boolean
  city: string        // display only
  neighborhood: string
}

export interface MyStatus {
  isActive: boolean
  firstName: string
  interests: MapInterest[]
  tagline: string
  duration: ActiveDuration
  lat: number | null
  lng: number | null
}
