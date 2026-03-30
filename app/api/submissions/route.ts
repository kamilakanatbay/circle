import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Activity, Category, City } from '@/lib/types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

function toSlug(title: string, id: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') +
    '-' +
    id.slice(0, 6)
  )
}

const DEFAULT_IMAGES: Record<string, string> = {
  'Pottery':              'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
  'Yoga':                 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  'Book Clubs':           'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
  'Design':               'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'Photography':          'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
  'Dance':                'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
  'Cooking':              'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=800&q=80',
  'Writing':              'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
  'Film':                 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
  'Offline Gathering':    '/categories/offline-gathering.jpg',
  'Slowing Down':         'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80',
  'Nature & Outdoors':    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
  'Music':                'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
  'Crafts & Making':      'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80',
  'Conversation':         'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
  'Meditation':           'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
  'Art':                  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
  'Theatre & Storytelling':'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80',
  'Language Exchange':    'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80'

export async function GET() {
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const activities: Activity[] = (data ?? []).map(s => ({
    id: s.id,
    slug: toSlug(s.title, s.id),
    title: s.title,
    tagline: s.tagline,
    description: s.description,
    category: s.category as Category,
    city: s.city as City,
    location: s.location,
    date: s.date,
    duration: s.duration,
    price: s.price,
    currency: s.currency,
    capacity: s.capacity,
    attendees: 0,
    host: {
      name: s.host_name,
      avatar: '',
      bio: s.host_bio,
    },
    image: DEFAULT_IMAGES[s.category] ?? FALLBACK_IMAGE,
    tags: [s.category.toLowerCase(), s.city.toLowerCase()],
    featured: false,
  }))

  return NextResponse.json({ activities })
}
