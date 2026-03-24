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
]

export const CITIES: City[] = [
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
    id: '1',
    slug: 'travel-journal-workshop',
    title: 'Travel Journal Workshop',
    tagline: 'Turn memories into living pages.',
    description: `We gather every Thursday in a candlelit studio in Williamsburg, Brooklyn, to do something rare: slow down and write. Bring a memory — a trip you loved, a moment you almost forgot, a place that changed you — and leave with pages that feel alive.

No writing experience needed. Just curiosity and a pen. We provide the journals, the guided prompts, and the silence to think. Maren will walk you through techniques from zine culture, travel writing, and book arts to make your journal something you'll keep forever.

The session ends with an optional share — read aloud if you'd like, or keep your pages private. Either way, you'll leave with something made by your own hand.`,
    category: 'Writing',
    city: 'New York',
    location: 'The Studio, 44 Bedford Ave, Williamsburg',
    date: '2025-03-20T18:30:00',
    duration: '2 hours',
    price: 18,
    currency: 'USD',
    capacity: 20,
    attendees: 13,
    host: {
      name: 'Maren Liu',
      avatar: '/hosts/maren-liu.jpg',
      bio: 'Maren is a travel writer and book artist based in Brooklyn. She has led writing workshops across three continents.',
    },
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    tags: ['journaling', 'writing', 'creativity', 'analog'],
    featured: true,
    resources: [
      { type: 'book', title: 'A Field Guide to Getting Lost — Rebecca Solnit', url: '#' },
      { type: 'article', title: 'Why Handwriting Still Matters', url: '#' },
    ],
  },
  {
    id: '2',
    slug: 'unsent-letter-session',
    title: 'Unsent Letter Session',
    tagline: 'Write what you never said.',
    description: `There are things we never say — to people who've hurt us, loved us, left us, or stayed. This session is a space to write those words down, without fear of them being read.

Guided by Theo, a therapeutic writing facilitator, you'll be led through a series of prompts designed to help you access feelings you might not have words for yet. The practice draws from expressive arts therapy and epistolary tradition — the long history of letters written but never sent.

You don't have to share. You don't have to explain. Just come, write, and leave a little lighter.`,
    category: 'Writing',
    city: 'London',
    location: 'The Parlour, 12 Redchurch St, Shoreditch',
    date: '2025-03-22T19:00:00',
    duration: '90 minutes',
    price: 12,
    currency: 'GBP',
    capacity: 16,
    attendees: 9,
    host: {
      name: 'Theo Blackwell',
      avatar: '/hosts/theo-blackwell.jpg',
      bio: 'Theo runs therapeutic writing circles across East London and is trained in expressive arts facilitation.',
    },
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
    tags: ['writing', 'emotional', 'introspective', 'therapeutic'],
    featured: true,
    resources: [
      { type: 'book', title: 'The Artist\'s Way — Julia Cameron', url: '#' },
    ],
  },
  {
    id: '3',
    slug: 'rethinking-loneliness-book-club',
    title: 'Rethinking Loneliness',
    tagline: 'A book club for the quietly isolated.',
    description: `Every other Tuesday, a group of strangers gather at Café Morgenrot in Prenzlauer Berg to read together and talk honestly about what it means to be alone in a city full of people.

This month we're reading Noreena Hertz's "The Lonely Century" alongside selected essays on solitude, urban design, and chosen community. Sasha facilitates in both English and German — all are welcome regardless of language comfort.

We believe the antidote to loneliness isn't just more people — it's better conversations. Come find yours.`,
    category: 'Book Clubs',
    city: 'Berlin',
    location: 'Café Morgenrot, Kastanienallee 85, Prenzlauer Berg',
    date: '2025-03-25T18:00:00',
    duration: '2.5 hours',
    price: 0,
    currency: 'EUR',
    capacity: 24,
    attendees: 18,
    host: {
      name: 'Sasha Vogt',
      avatar: '/hosts/sasha-vogt.jpg',
      bio: 'Sasha is a philosopher and community builder based in Berlin. They run four different reading circles across the city.',
    },
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    tags: ['book club', 'philosophy', 'community', 'free', 'bilingual'],
    featured: true,
    resources: [
      { type: 'book', title: 'The Lonely Century — Noreena Hertz', url: '#' },
      { type: 'article', title: 'On Being Alone Together', url: '#' },
    ],
  },
  {
    id: '4',
    slug: 'wabi-sabi-ceramics',
    title: 'Wabi-Sabi Ceramics',
    tagline: 'Find beauty in the imperfect.',
    description: `In a sun-filled studio in Shimokitazawa, you'll spend a Sunday afternoon learning hand-building techniques in clay — no wheel, no pressure, no perfect outcomes. The wabi-sabi philosophy embraces asymmetry, roughness, and transience as sources of beauty.

Yuki, a ceramic artist trained in Kyoto, will guide you through pinching, coiling, and slab-building. You'll leave with your piece to be fired and collected the following week.

All materials included. No experience required. Maximum 10 participants.`,
    category: 'Pottery',
    city: 'Tokyo',
    location: 'Studio Tsuchi, 3-chome Kitazawa, Setagaya',
    date: '2025-03-23T13:00:00',
    duration: '3 hours',
    price: 4500,
    currency: 'JPY',
    capacity: 10,
    attendees: 7,
    host: {
      name: 'Yuki Tanaka',
      avatar: '/hosts/yuki-tanaka.jpg',
      bio: 'Yuki is a ceramic artist who trained at Kyoto\'s traditional craft schools and now runs an open studio in Shimokitazawa.',
    },
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
    tags: ['pottery', 'ceramics', 'mindfulness', 'handmade', 'wabi-sabi'],
    featured: true,
    resources: [
      { type: 'book', title: 'Wabi-Sabi for Artists, Designers, Poets — Leonard Koren', url: '#' },
    ],
  },
  {
    id: '5',
    slug: 'yin-yoga-for-creatives',
    title: 'Yin Yoga for Creatives',
    tagline: 'Open the hips, unlock the mind.',
    description: `This is not a performance yoga class. There's no sequence to remember, no pose to perfect. Yin Yoga works on the connective tissues — fascia, ligaments, joints — through long, passive holds of three to five minutes.

Camille hosts these sessions specifically for designers, artists, and makers who spend long hours at desks or in studios. We focus on the hips, lower back, and shoulders — the places creative tension lives.

The session ends with a 20-minute guided meditation. Mats and props provided. All levels welcome.`,
    category: 'Yoga',
    city: 'Paris',
    location: 'Studio Lumière, 14 Rue des Martyrs, 9e',
    date: '2025-03-21T09:30:00',
    duration: '75 minutes',
    price: 15,
    currency: 'EUR',
    capacity: 18,
    attendees: 14,
    host: {
      name: 'Camille Moreau',
      avatar: '/hosts/camille-moreau.jpg',
      bio: 'Camille is a certified yin yoga teacher and former graphic designer who discovered yoga as a remedy for creative burnout.',
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    tags: ['yoga', 'yin', 'mindfulness', 'creative wellness'],
    featured: false,
  },
  {
    id: '6',
    slug: 'contemporary-west-african-dance',
    title: 'West African Dance Circle',
    tagline: 'Move with your whole body, not just your feet.',
    description: `Kofi brings the rhythms and movements of West African dance to Amsterdam every Saturday morning. This is a community class for all bodies and all levels — come as you are.

The session starts with call-and-response warmup, moves into the core choreography (Sabar, Djembe-driven sequences), and ends with free movement to live drumming.

No dance background needed. Wear comfortable clothes you can move freely in. This is about joy, not technique.`,
    category: 'Dance',
    city: 'Amsterdam',
    location: 'Huis van Bewaring, Haparandadam 6, Noord',
    date: '2025-03-22T10:00:00',
    duration: '90 minutes',
    price: 10,
    currency: 'EUR',
    capacity: 30,
    attendees: 22,
    host: {
      name: 'Kofi Asante',
      avatar: '/hosts/kofi-asante.jpg',
      bio: 'Kofi is a dancer and choreographer from Accra, Ghana, now based in Amsterdam. He teaches West African dance across Europe.',
    },
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80',
    tags: ['dance', 'west african', 'community', 'movement', 'rhythm'],
    featured: true,
  },
  {
    id: '7',
    slug: 'film-philosophy-club',
    title: 'Film & Philosophy Club',
    tagline: 'Watch slowly. Think deeply.',
    description: `We screen one film per session — usually something from the Criterion Collection or festival circuit — and follow with a 90-minute structured discussion. Not a review, not a rant, but a guided philosophical conversation.

This month: Tarkovsky's "Stalker" and its relationship to hope, desire, and the unknowable. Discussion facilitated by Rosa, a philosophy PhD candidate at UCLA.

Wine provided. Bring your questions, not your certainties.`,
    category: 'Film',
    city: 'Los Angeles',
    location: 'The Aero Theatre, Montana Ave, Santa Monica',
    date: '2025-03-28T19:30:00',
    duration: '4 hours',
    price: 20,
    currency: 'USD',
    capacity: 40,
    attendees: 31,
    host: {
      name: 'Rosa Delgado',
      avatar: '/hosts/rosa-delgado.jpg',
      bio: 'Rosa is a philosophy PhD candidate at UCLA whose research focuses on phenomenology and cinema.',
    },
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
    tags: ['film', 'philosophy', 'discussion', 'cinema', 'intellectual'],
    featured: false,
    resources: [
      { type: 'film', title: 'Stalker (1979) — Andrei Tarkovsky', url: '#' },
      { type: 'article', title: 'The Stalker Zone as Philosophical Space', url: '#' },
    ],
  },
  {
    id: '8',
    slug: 'natural-wine-and-conversation',
    title: 'Natural Wine & Real Talk',
    tagline: 'Good wine. Better conversation.',
    description: `Every last Friday of the month, we gather in a small Williamsburg wine bar with no agenda other than to drink interesting wine and have the kinds of conversations you can't have on social media.

Marcus selects three to four natural wines and gives a brief intro to each — winemaker, region, production method. Then we drink and talk. Topics in past sessions have ranged from AI and creativity to grief, to the ethics of gentrification.

No prep required. Just show up thirsty for both.`,
    category: 'Cooking',
    city: 'New York',
    location: 'June Wine Bar, 231 Court St, Carroll Gardens',
    date: '2025-03-28T20:00:00',
    duration: '2 hours',
    price: 35,
    currency: 'USD',
    capacity: 20,
    attendees: 16,
    host: {
      name: 'Marcus Webb',
      avatar: '/hosts/marcus-webb.jpg',
      bio: 'Marcus is a sommelier and former journalist who now runs wine education events across Brooklyn.',
    },
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
    tags: ['wine', 'conversation', 'community', 'natural wine', 'social'],
    featured: false,
  },
  {
    id: '9',
    slug: 'darkroom-photography-intro',
    title: 'Darkroom Photography',
    tagline: 'Watch your image appear in the dark.',
    description: `There is nothing quite like watching a photograph emerge in a tray of developer under a red safelight. In this three-hour intro session, you'll learn the complete darkroom process: exposing photographic paper, developing, stopping, fixing, and washing.

You'll make at least three prints by hand. No prior darkroom experience needed — just bring a roll of 35mm film you've shot (or use one of ours).

Limited to six participants for hands-on attention.`,
    category: 'Photography',
    city: 'London',
    location: 'Darkroom London, 7 Woodfield Rd, Maida Vale',
    date: '2025-03-26T18:00:00',
    duration: '3 hours',
    price: 45,
    currency: 'GBP',
    capacity: 6,
    attendees: 4,
    host: {
      name: 'Anya Shah',
      avatar: '/hosts/anya-shah.jpg',
      bio: 'Anya is a fine art photographer and darkroom technician who has been teaching analogue processes in London for eight years.',
    },
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    tags: ['photography', 'darkroom', 'analogue', 'film', 'craft'],
    featured: true,
    resources: [
      { type: 'book', title: 'The Negative — Ansel Adams', url: '#' },
    ],
  },
  {
    id: '10',
    slug: 'type-design-workshop',
    title: 'Type Design Workshop',
    tagline: 'Every letter is a decision.',
    description: `Typography is one of design's most invisible arts. In this half-day workshop, you'll draw letterforms by hand, understand the anatomy of type, and begin sketching your own typeface concept.

Led by Lena, a type designer who has worked with Fontsmith and Google Fonts, this session is for designers who've always been curious about type but never looked under the hood.

You'll work with pencil and paper — no software. Materials provided. Ideal for graphic designers, product designers, and illustrators.`,
    category: 'Design',
    city: 'Berlin',
    location: 'Type Foundry Berlin, Oranienstr. 6, Kreuzberg',
    date: '2025-03-29T10:00:00',
    duration: '4 hours',
    price: 55,
    currency: 'EUR',
    capacity: 12,
    attendees: 8,
    host: {
      name: 'Lena Fischer',
      avatar: '/hosts/lena-fischer.jpg',
      bio: 'Lena is a type designer based in Berlin. Her typefaces have been used by the New York Times, Google, and several European publishing houses.',
    },
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    tags: ['typography', 'design', 'type', 'lettering', 'craft'],
    featured: false,
    resources: [
      { type: 'book', title: 'Stop Stealing Sheep & Find Out How Type Works — Spiekermann', url: '#' },
    ],
  },
  {
    id: '11',
    slug: 'somatic-movement-lab',
    title: 'Somatic Movement Lab',
    tagline: 'Listen to what your body already knows.',
    description: `Somatics is the practice of moving from the inside out — noticing sensation, exploring impulse, letting the body lead. This is not choreography. There's no right way to move.

Isabelle facilitates these open sessions in a loft space in Le Marais. We begin on the floor, work through structured improvisation scores, and end with time for integration and sharing.

Appropriate for dancers, non-dancers, therapists, and anyone curious about embodied movement. Wear clothes that allow full range of motion.`,
    category: 'Dance',
    city: 'Paris',
    location: 'Atelier du Marais, 18 Rue de Bretagne, 3e',
    date: '2025-03-30T15:00:00',
    duration: '2 hours',
    price: 20,
    currency: 'EUR',
    capacity: 15,
    attendees: 10,
    host: {
      name: 'Isabelle Renard',
      avatar: '/hosts/isabelle-renard.jpg',
      bio: 'Isabelle is a somatic movement educator and dance artist trained in Body-Mind Centering and Contact Improvisation.',
    },
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
    tags: ['movement', 'somatic', 'improvisation', 'embodied', 'dance'],
    featured: false,
  },
  {
    id: '12',
    slug: 'riso-print-studio',
    title: 'Risograph Print Studio',
    tagline: 'Print in layers. Think in ink.',
    description: `Risograph printing is a beautiful, unpredictable, and deeply satisfying process. Using RISO duplicators that print like photocopiers but in layers of fluorescent ink, you'll create limited-edition prints in an open studio environment.

Bring your artwork digitally prepared (we'll send a guide), or choose from our archive of designs to work with. We'll guide you through the registration process, ink choices, and paper selection.

Each participant takes home five to ten prints. Maximum eight people per session.`,
    category: 'Design',
    city: 'Amsterdam',
    location: 'Print Club Amsterdam, Czaar Peterstraat 17, Oostenburg',
    date: '2025-04-05T13:00:00',
    duration: '3 hours',
    price: 35,
    currency: 'EUR',
    capacity: 8,
    attendees: 5,
    host: {
      name: 'Noor van den Berg',
      avatar: '/hosts/noor-van-den-berg.jpg',
      bio: 'Noor runs Print Club Amsterdam, a community risograph studio that hosts open sessions and artist residencies.',
    },
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    tags: ['print', 'risograph', 'design', 'printmaking', 'community'],
    featured: false,
  },
  {
    id: '13',
    slug: 'early-morning-film-walkers',
    title: 'Early Morning Film Walkers',
    tagline: 'Shoot the city before it wakes up.',
    description: `We meet at 5:30am at Grand Army Plaza. By 7am, the city is still quiet enough to hear your own shutter. This is a group walk for film photographers — 35mm, medium format, instant, pinhole — all welcome.

The route changes each month. In March we're walking through Carroll Gardens to Red Hook. Bring whatever camera you're shooting with, and however many rolls you can afford to burn.

We end at a diner for coffee and honest talk about the shots we missed.`,
    category: 'Photography',
    city: 'New York',
    location: 'Grand Army Plaza, Brooklyn',
    date: '2025-03-22T05:30:00',
    duration: '2.5 hours',
    price: 0,
    currency: 'USD',
    capacity: 12,
    attendees: 9,
    host: {
      name: 'Jamie Torres',
      avatar: '/hosts/jamie-torres.jpg',
      bio: 'Jamie is a documentary photographer and photography teacher. They shoot exclusively on 35mm and teach darkroom workshops across NYC.',
    },
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
    tags: ['photography', 'film', '35mm', 'street', 'community', 'free'],
    featured: false,
  },
  {
    id: '14',
    slug: 'miso-and-fermentation-class',
    title: 'Miso & Fermentation Class',
    tagline: 'Slow food for patient people.',
    description: `Hiroshi runs one of Tokyo's most-loved food workshops — a three-hour class on traditional fermentation, focused on making shiro miso from scratch. You'll soak, steam, and blend soybeans; mix with koji and salt; and press into fermentation crocks to take home.

Your miso will be ready to eat in three to six months. Hiroshi will send you a fermentation guide and check-in emails.

This session is conducted in Japanese and English. All equipment and ingredients included.`,
    category: 'Cooking',
    city: 'Tokyo',
    location: 'Hakko Kitchen, 2-chome Ebisu, Shibuya',
    date: '2025-03-29T11:00:00',
    duration: '3 hours',
    price: 6500,
    currency: 'JPY',
    capacity: 8,
    attendees: 6,
    host: {
      name: 'Hiroshi Kato',
      avatar: '/hosts/hiroshi-kato.jpg',
      bio: 'Hiroshi is a fermentation specialist and former chef who runs fermentation workshops and a small batch miso business in Tokyo.',
    },
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    tags: ['cooking', 'fermentation', 'miso', 'japanese', 'slow food'],
    featured: false,
    resources: [
      { type: 'book', title: 'The Art of Fermentation — Sandor Katz', url: '#' },
    ],
  },
  {
    id: '15',
    slug: 'slow-fiction-reading-group',
    title: 'Slow Fiction Reading Group',
    tagline: 'Read less. Understand more.',
    description: `We take one short story or a single chapter and spend two hours with it. Not skimming — reading closely, re-reading difficult passages, asking what the writer chose and why.

This month we're with Alice Munro's "The Bear Came Over the Mountain." No prep required — we read aloud together in the session.

The group meets in Elena's apartment in Silver Lake, around her kitchen table. Eight people maximum. Bring something to drink.`,
    category: 'Book Clubs',
    city: 'Los Angeles',
    location: 'Silver Lake (address sent on RSVP)',
    date: '2025-03-23T15:00:00',
    duration: '2 hours',
    price: 0,
    currency: 'USD',
    capacity: 8,
    attendees: 6,
    host: {
      name: 'Elena Park',
      avatar: '/hosts/elena-park.jpg',
      bio: 'Elena is a fiction editor at a literary magazine and teaches creative writing at CalArts.',
    },
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
    tags: ['reading', 'fiction', 'literature', 'intimate', 'free'],
    featured: false,
    resources: [
      { type: 'book', title: 'Runaway (Stories) — Alice Munro', url: '#' },
    ],
  },
  {
    id: '16',
    slug: 'urban-sketching-walk',
    title: 'Urban Sketching Walk',
    tagline: 'Draw the city as you see it, not as it is.',
    description: `Urban sketching is about presence. You stand in front of a building, a market, a crowd — and you draw what you see, not what you know. The result is never perfect. That's the point.

This two-hour walk moves through Hackney, stopping at four or five locations to sketch. Tom leads the group, shares loose drawing techniques, and talks about what makes a sketch a record and what makes it art.

Bring any drawing materials you have. We'll have extra pens and paper if you need them.`,
    category: 'Design',
    city: 'London',
    location: 'Hackney Central Station (meet outside)',
    date: '2025-03-30T10:00:00',
    duration: '2 hours',
    price: 0,
    currency: 'GBP',
    capacity: 15,
    attendees: 11,
    host: {
      name: 'Tom Alcott',
      avatar: '/hosts/tom-alcott.jpg',
      bio: 'Tom is an illustrator and urban sketcher whose drawings of London have been exhibited in galleries and published in travel books.',
    },
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    tags: ['sketching', 'illustration', 'drawing', 'urban', 'free'],
    featured: true,
  },
]

export const getFeatured = () => activities.filter(a => a.featured)
export const getByCity = (city: City) => activities.filter(a => a.city === city)
export const getByCategory = (cat: Category) => activities.filter(a => a.category === cat)
export const getBySlug = (slug: string) => activities.find(a => a.slug === slug)
