import type { Activity, Category, City } from './types'

export const CATEGORIES: Category[] = [
  'Pottery',
  'Yoga',
  'Book Clubs',
  'Design',
  'Photography',
  'Dance',
  'Cooking',
  'Writing',
  'Film',
  'Offline Gathering',
  'Slowing Down',
  'Nature & Outdoors',
  'Music',
  'Crafts & Making',
  'Conversation',
  'Meditation',
  'Art',
  'Theatre & Storytelling',
  'Language Exchange',
]

export const CITIES: City[] = [
  'Hamburg',
  'New York',
  'London',
  'Berlin',
  'Tokyo',
  'Paris',
  'Los Angeles',
  'Amsterdam',
]

export const activities: Activity[] = [
  {
    id: '17',
    slug: 'north-sea-kitchen',
    title: 'North Sea Kitchen',
    tagline: 'Cook what the boats brought in.',
    description: `Every Saturday morning, the Fischmarkt at Altona bursts into life at 5am. This session begins there — wandering the stalls with Finn as he selects the day's catch — and continues in a shared kitchen in the Schanzenviertel, where we cook a full North Sea lunch together.

Expect fresh herring, smoked eel, potatoes from the market, and something pickled. Finn trained as a chef in Copenhagen and came home to Hamburg with a deep respect for simple Nordic cooking and seasonal produce.

No experience required. Maximum ten participants. Bring a good appetite and dress for the market.`,
    category: 'Cooking',
    city: 'Hamburg',
    location: 'Meet at Fischmarkt Altona, then Schanzenküche, Schulterblatt 58',
    date: '2025-04-12T08:00:00',
    duration: '3.5 hours',
    price: 38,
    currency: 'EUR',
    capacity: 10,
    attendees: 4,
    host: {
      name: 'Finn Hartmann',
      avatar: '/hosts/finn-hartmann.jpg',
      bio: 'Finn is a chef and food writer who trained in Copenhagen and now runs market-to-table cooking sessions across Hamburg.',
    },
    image: 'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=800&q=80',
    tags: ['cooking', 'north sea', 'market', 'nordic', 'seasonal'],
    featured: true,
    resources: [
      { type: 'book', title: 'The Nordic Cookbook — Magnus Nilsson', url: '#' },
    ],
  },
]

export const getFeatured = () => activities.filter(a => a.featured)
export const getByCity = (city: City) => activities.filter(a => a.city === city)
export const getByCategory = (cat: Category) => activities.filter(a => a.category === cat)
export const getBySlug = (slug: string) => activities.find(a => a.slug === slug)
