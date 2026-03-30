export type Category =
  | 'Pottery'
  | 'Yoga'
  | 'Book Clubs'
  | 'Design'
  | 'Photography'
  | 'Dance'
  | 'Cooking'
  | 'Writing'
  | 'Film'
  | 'Offline Gathering'
  | 'Slowing Down'
  | 'Nature & Outdoors'
  | 'Music'
  | 'Crafts & Making'
  | 'Conversation'
  | 'Meditation'
  | 'Art'
  | 'Theatre & Storytelling'
  | 'Language Exchange'

export type City =
  | 'New York'
  | 'London'
  | 'Berlin'
  | 'Tokyo'
  | 'Paris'
  | 'Los Angeles'
  | 'Amsterdam'
  | 'Hamburg'

export interface Host {
  name: string
  avatar: string
  bio: string
}

export interface Resource {
  type: 'book' | 'film' | 'article' | 'playlist'
  title: string
  url: string
}

export interface Activity {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  category: Category
  city: City
  location: string
  date: string
  duration: string
  price: number
  currency: string
  capacity: number
  attendees: number
  host: Host
  image: string
  tags: string[]
  featured: boolean
  resources?: Resource[]
}
