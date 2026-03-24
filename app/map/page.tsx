import type { Metadata } from 'next'
import { MapPageClient } from './MapPageClient'

export const metadata: Metadata = {
  title: 'Map',
  description: 'Find people open to meeting nearby. Real connection, real life.',
}

export default function MapPage() {
  return <MapPageClient />
}
