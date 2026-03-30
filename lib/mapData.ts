import type { MapUser, MapInterest } from './mapTypes'

export const ALL_MAP_INTERESTS: MapInterest[] = [
  'Startups', 'Tech', 'Art', 'Music', 'Travel',
  'Philosophy', 'Fitness', 'Food',
  'Design', 'Writing', 'Film', 'Photography',
  'Pottery', 'Yoga', 'Book Clubs', 'Dance', 'Cooking',
]

// Coordinates are pre-blurred (±200–400m offset from real neighborhood centers)
// so values are stable across renders.
export const MAP_USERS: MapUser[] = [

  // ── NEW YORK (5 users) ───────────────────────────────────
  {
    id: 'ny-1', firstName: 'Maya', initial: 'M',
    interests: ['Startups', 'Design', 'Travel'],
    tagline: "I'm open to talking about building things",
    lat: 40.7142, lng: -73.9581,
    activeUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    waveCount: 4, verified: true, city: 'New York', neighborhood: 'Williamsburg',
  },
  {
    id: 'ny-2', firstName: 'James', initial: 'J',
    interests: ['Philosophy', 'Writing', 'Film'],
    tagline: "I'm open to deep conversations over coffee",
    lat: 40.7205, lng: -73.9954,
    activeUntil: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    waveCount: 1, verified: false, city: 'New York', neighborhood: 'Lower East Side',
  },
  {
    id: 'ny-3', firstName: 'Zara', initial: 'Z',
    interests: ['Fitness', 'Yoga', 'Food'],
    tagline: "I'm open to workout buddies or brunch",
    lat: 40.7283, lng: -73.9944,
    activeUntil: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    waveCount: 7, verified: true, city: 'New York', neighborhood: 'SoHo',
  },
  {
    id: 'ny-4', firstName: 'Leo', initial: 'L',
    interests: ['Music', 'Art', 'Photography'],
    tagline: "I'm open to gallery walks or live music",
    lat: 40.7265, lng: -73.9490,
    activeUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    waveCount: 2, verified: true, city: 'New York', neighborhood: 'Bushwick',
  },
  {
    id: 'ny-5', firstName: 'Priya', initial: 'P',
    interests: ['Tech', 'Startups', 'Book Clubs'],
    tagline: "I'm open to talking AI, books, or ideas",
    lat: 40.7580, lng: -73.9855,
    activeUntil: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    waveCount: 9, verified: true, city: 'New York', neighborhood: 'Midtown',
  },

  // ── LONDON (4 users) ─────────────────────────────────────
  {
    id: 'lon-1', firstName: 'Theo', initial: 'T',
    interests: ['Writing', 'Philosophy', 'Film'],
    tagline: "I'm open to slow conversations",
    lat: 51.5247, lng: -0.0812,
    activeUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    waveCount: 3, verified: false, city: 'London', neighborhood: 'Shoreditch',
  },
  {
    id: 'lon-2', firstName: 'Anya', initial: 'A',
    interests: ['Photography', 'Art', 'Travel'],
    tagline: "I'm open to walking and shooting film",
    lat: 51.5451, lng: -0.0588,
    activeUntil: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    waveCount: 5, verified: true, city: 'London', neighborhood: 'Hackney',
  },
  {
    id: 'lon-3', firstName: 'Tom', initial: 'T',
    interests: ['Design', 'Art', 'Startups'],
    tagline: "I'm open to design critiques or idea jams",
    lat: 51.5481, lng: -0.0559,
    activeUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    waveCount: 2, verified: true, city: 'London', neighborhood: 'Hackney',
  },
  {
    id: 'lon-4', firstName: 'Nadia', initial: 'N',
    interests: ['Yoga', 'Fitness', 'Food'],
    tagline: "I'm open to morning movement or markets",
    lat: 51.5182, lng: -0.1236,
    activeUntil: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    waveCount: 6, verified: true, city: 'London', neighborhood: 'Bloomsbury',
  },

  // ── BERLIN (4 users) ─────────────────────────────────────
  {
    id: 'ber-1', firstName: 'Sasha', initial: 'S',
    interests: ['Philosophy', 'Book Clubs', 'Music'],
    tagline: "I'm open to talking ideas over Kaffee",
    lat: 52.5375, lng: 13.4212,
    activeUntil: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    waveCount: 8, verified: true, city: 'Berlin', neighborhood: 'Prenzlauer Berg',
  },
  {
    id: 'ber-2', firstName: 'Lena', initial: 'L',
    interests: ['Design', 'Art', 'Tech'],
    tagline: "I'm open to type nerds and visual thinkers",
    lat: 52.4990, lng: 13.4073,
    activeUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    waveCount: 3, verified: true, city: 'Berlin', neighborhood: 'Kreuzberg',
  },
  {
    id: 'ber-3', firstName: 'Kai', initial: 'K',
    interests: ['Music', 'Startups', 'Travel'],
    tagline: "I'm open to finding the next great record store",
    lat: 52.5012, lng: 13.4098,
    activeUntil: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    waveCount: 1, verified: false, city: 'Berlin', neighborhood: 'Neukölln',
  },
  {
    id: 'ber-4', firstName: 'Mira', initial: 'M',
    interests: ['Pottery', 'Art', 'Cooking'],
    tagline: "I'm open to slow-making and slow-eating",
    lat: 52.5341, lng: 13.4190,
    activeUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    waveCount: 4, verified: true, city: 'Berlin', neighborhood: 'Prenzlauer Berg',
  },

  // ── TOKYO (4 users) ──────────────────────────────────────
  {
    id: 'tok-1', firstName: 'Yuki', initial: 'Y',
    interests: ['Pottery', 'Yoga', 'Philosophy'],
    tagline: "I'm open to wabi-sabi conversations",
    lat: 35.6613, lng: 139.6678,
    activeUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    waveCount: 5, verified: true, city: 'Tokyo', neighborhood: 'Shimokitazawa',
  },
  {
    id: 'tok-2', firstName: 'Hiroshi', initial: 'H',
    interests: ['Cooking', 'Food', 'Travel'],
    tagline: "I'm open to fermentation geeks and food obsessives",
    lat: 35.6591, lng: 139.7024,
    activeUntil: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    waveCount: 6, verified: true, city: 'Tokyo', neighborhood: 'Ebisu',
  },
  {
    id: 'tok-3', firstName: 'Emi', initial: 'E',
    interests: ['Music', 'Art', 'Film'],
    tagline: "I'm open to record store crawls or cinema",
    lat: 35.6628, lng: 139.6988,
    activeUntil: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    waveCount: 2, verified: false, city: 'Tokyo', neighborhood: 'Daikanyama',
  },
  {
    id: 'tok-4', firstName: 'Kenji', initial: 'K',
    interests: ['Tech', 'Startups', 'Design'],
    tagline: "I'm open to building things that matter",
    lat: 35.6580, lng: 139.7022,
    activeUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    waveCount: 11, verified: true, city: 'Tokyo', neighborhood: 'Shibuya',
  },

  // ── PARIS (4 users) ──────────────────────────────────────
  {
    id: 'par-1', firstName: 'Camille', initial: 'C',
    interests: ['Yoga', 'Fitness', 'Art'],
    tagline: "I'm open to movement and good espresso",
    lat: 48.8876, lng: 2.3442,
    activeUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    waveCount: 7, verified: true, city: 'Paris', neighborhood: 'Montmartre',
  },
  {
    id: 'par-2', firstName: 'Isabelle', initial: 'I',
    interests: ['Dance', 'Philosophy', 'Writing'],
    tagline: "I'm open to body-mind exchanges",
    lat: 48.8588, lng: 2.3538,
    activeUntil: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    waveCount: 3, verified: true, city: 'Paris', neighborhood: 'Le Marais',
  },
  {
    id: 'par-3', firstName: 'Pierre', initial: 'P',
    interests: ['Food', 'Cooking', 'Travel'],
    tagline: "I'm open to market visits and recipe swapping",
    lat: 48.8491, lng: 2.3530,
    activeUntil: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    waveCount: 2, verified: false, city: 'Paris', neighborhood: 'Quartier Latin',
  },
  {
    id: 'par-4', firstName: 'Élise', initial: 'É',
    interests: ['Art', 'Photography', 'Film'],
    tagline: "I'm open to seeing shows and talking about them",
    lat: 48.8602, lng: 2.3485,
    activeUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    waveCount: 9, verified: true, city: 'Paris', neighborhood: 'Le Marais',
  },

  // ── LOS ANGELES (4 users) ────────────────────────────────
  {
    id: 'la-1', firstName: 'Rosa', initial: 'R',
    interests: ['Film', 'Philosophy', 'Book Clubs'],
    tagline: "I'm open to movies and ideas that disturb",
    lat: 34.0871, lng: -118.2699,
    activeUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    waveCount: 8, verified: true, city: 'Los Angeles', neighborhood: 'Silver Lake',
  },
  {
    id: 'la-2', firstName: 'Marcus', initial: 'M',
    interests: ['Food', 'Music', 'Travel'],
    tagline: "I'm open to natural wine and real talk",
    lat: 34.0513, lng: -118.2621,
    activeUntil: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    waveCount: 4, verified: true, city: 'Los Angeles', neighborhood: 'Arts District',
  },
  {
    id: 'la-3', firstName: 'Elena', initial: 'E',
    interests: ['Writing', 'Book Clubs', 'Art'],
    tagline: "I'm open to slow reading and literary chat",
    lat: 34.0862, lng: -118.2711,
    activeUntil: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    waveCount: 5, verified: true, city: 'Los Angeles', neighborhood: 'Silver Lake',
  },
  {
    id: 'la-4', firstName: 'Dylan', initial: 'D',
    interests: ['Tech', 'Startups', 'Fitness'],
    tagline: "I'm open to building or running together",
    lat: 33.9857, lng: -118.4703,
    activeUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    waveCount: 3, verified: false, city: 'Los Angeles', neighborhood: 'Venice',
  },

  // ── HAMBURG (3 users) ───────────────────────────────────
  {
    id: 'ham-1', firstName: 'Finn', initial: 'F',
    interests: ['Cooking', 'Food', 'Travel'],
    tagline: "I'm open to market mornings and good fish",
    lat: 53.5449, lng: 9.9350,
    activeUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    waveCount: 5, verified: true, city: 'Hamburg', neighborhood: 'Altona',
  },
  {
    id: 'ham-2', firstName: 'Ida', initial: 'I',
    interests: ['Photography', 'Art', 'Film'],
    tagline: "I'm open to harbour walks and film photography",
    lat: 53.5454, lng: 9.9641,
    activeUntil: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    waveCount: 3, verified: true, city: 'Hamburg', neighborhood: 'Hafencity',
  },
  {
    id: 'ham-3', firstName: 'Otto', initial: 'O',
    interests: ['Music', 'Design', 'Startups'],
    tagline: "I'm open to record digging in the Schanze",
    lat: 53.5629, lng: 9.9592,
    activeUntil: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    waveCount: 7, verified: false, city: 'Hamburg', neighborhood: 'Schanzenviertel',
  },

  // ── AMSTERDAM (3 users) ──────────────────────────────────
  {
    id: 'ams-1', firstName: 'Kofi', initial: 'K',
    interests: ['Dance', 'Music', 'Travel'],
    tagline: "I'm open to movement and rhythm",
    lat: 52.3741, lng: 4.8822,
    activeUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    waveCount: 10, verified: true, city: 'Amsterdam', neighborhood: 'Jordaan',
  },
  {
    id: 'ams-2', firstName: 'Noor', initial: 'N',
    interests: ['Design', 'Art', 'Startups'],
    tagline: "I'm open to print, pixels, and ideas",
    lat: 52.3558, lng: 4.8988,
    activeUntil: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    waveCount: 6, verified: true, city: 'Amsterdam', neighborhood: 'De Pijp',
  },
  {
    id: 'ams-3', firstName: 'Lars', initial: 'L',
    interests: ['Food', 'Philosophy', 'Travel'],
    tagline: "I'm open to canal-side conversations",
    lat: 52.3760, lng: 4.8980,
    activeUntil: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    waveCount: 2, verified: false, city: 'Amsterdam', neighborhood: 'Centrum',
  },
]
