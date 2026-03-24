import Link from 'next/link'
import { HeroSection } from '@/components/HeroSection'
import { ActivityCard } from '@/components/ActivityCard'
import { InkSplashDivider, RingIllustration } from '@/components/SVGIllustration'
import { getFeatured, CATEGORIES } from '@/lib/data'

export default function LandingPage() {
  const featured = getFeatured()

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      <InkSplashDivider className="my-0" />

      {/* ── Featured activities ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-10">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.3em] uppercase text-ash">Happening now</p>
            <h2
              className="font-display text-cream leading-tight tracking-tight"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}
            >
              Featured circles
            </h2>
          </div>
          <Link
            href="/explore"
            className="text-sm text-ash hover:text-cream transition-colors flex items-center gap-1.5 shrink-0"
          >
            View all
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.slice(0, 6).map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

      <InkSplashDivider />

      {/* ── Category browse ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-8">
        <div className="space-y-2">
          <p className="text-xs tracking-[0.3em] uppercase text-ash">Browse by interest</p>
          <h2
            className="font-display text-cream tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}
          >
            What&apos;s your circle?
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              href={`/explore?category=${encodeURIComponent(cat)}`}
              className="
                group relative flex flex-col items-center justify-center
                h-28 rounded-xl border border-carbon bg-charcoal
                hover:border-mist hover:bg-carbon
                transition-all duration-300 hover:-translate-y-0.5
                text-center p-4
              "
            >
              <span className="text-2xl mb-2">{getCategoryEmoji(cat)}</span>
              <span className="text-sm font-medium text-ash group-hover:text-cream transition-colors">
                {cat}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <InkSplashDivider />

      {/* ── Manifesto ── */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24 text-center space-y-8">
        <div className="font-display text-6xl text-mist/40 leading-none select-none">&ldquo;</div>

        <blockquote
          className="font-display text-cream italic leading-tight tracking-tight"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 3.5rem)' }}
        >
          The screen is not the destination.
        </blockquote>

        <p className="text-ash leading-relaxed text-base max-w-xl mx-auto">
          Circle exists for those who know that the best conversations happen
          in rooms, not feeds. We connect curious people with hosts who create
          meaningful offline experiences — one city at a time.
        </p>

        <Link
          href="/explore"
          className="
            inline-flex items-center gap-2
            px-8 py-3.5 rounded-full
            bg-cream text-ink
            text-sm font-semibold
            hover:bg-white
            transition-colors duration-200
          "
        >
          Find your circle
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-mist/20 bg-charcoal/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="space-y-2 mb-14 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-ash">Simple by design</p>
            <h2
              className="font-display text-cream tracking-tight"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}
            >
              How it works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: '01',
                title: 'Choose your city',
                description: 'We curate offline experiences across seven cities worldwide, with more launching soon.',
              },
              {
                step: '02',
                title: 'Find your circle',
                description: 'Browse by category, date, or mood. Every activity is hosted by a real person who cares.',
              },
              {
                step: '03',
                title: 'Show up',
                description: "Reserve your spot. No account required. Confirm by email and we'll see you there.",
              },
            ].map(({ step, title, description }) => (
              <div key={step} className="space-y-4">
                <div className="font-display text-5xl font-bold text-mist/30 leading-none">
                  {step}
                </div>
                <h3 className="font-display text-xl text-cream">{title}</h3>
                <p className="text-sm text-ash leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InkSplashDivider />

      {/* ── Create a Circle ── */}
      <section className="bg-ink">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-7">
            <div className="space-y-2">
              <p className="text-xs tracking-[0.3em] uppercase text-ash">For hosts</p>
              <h2
                className="font-display text-cream tracking-tight leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
              >
                Create a circle<br />of your own.
              </h2>
            </div>
            <p className="text-ash leading-relaxed max-w-md">
              You have a skill, a space, or a story worth sharing. Host a pottery session,
              lead a book discussion, organise a film screening. Circle gives you the tools —
              the rest is yours.
            </p>
            <Link
              href="/create"
              className="
                inline-flex items-center gap-2
                px-8 py-3.5 rounded-full
                bg-cream text-ink
                text-sm font-semibold
                hover:bg-white
                transition-colors duration-200
              "
            >
              Start hosting
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '2,400+', label: 'active circles' },
              { num: '7',      label: 'cities' },
              { num: '0%',     label: 'platform fee' },
              { num: '∞',      label: 'connections made' },
            ].map(({ num, label }) => (
              <div key={label} className="border border-carbon rounded-xl p-7 space-y-2 bg-charcoal/40">
                <div
                  className="font-display text-cream leading-none"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}
                >
                  {num}
                </div>
                <div className="text-sm text-ash">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InkSplashDivider />

      {/* ── The Cirle Ring ── */}
      <section className="bg-charcoal/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Illustration */}
            <div className="flex items-center justify-center order-last lg:order-first h-[340px] lg:h-[420px]">
              <RingIllustration className="max-h-full drop-shadow-2xl" />
            </div>

            {/* Text */}
            <div className="space-y-7">
              <div className="space-y-2">
                <p className="text-xs tracking-[0.3em] uppercase text-ash">Wear the signal</p>
                <h2
                  className="font-display text-cream tracking-tight leading-tight"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
                >
                  The Cirle ring.
                </h2>
              </div>
              <p className="text-ash leading-relaxed">
                A small token. A quiet signal. When you spot someone wearing the Cirle ring or
                bracelet, you already know — they value real connection over digital noise.
                Walk up. Say hello. No app required.
              </p>
              <p className="text-ash leading-relaxed">
                Think of it like the stamps collected along the Camino de Santiago. Each circle
                you attend is a step. The ring is proof you walked it — and an open invitation
                for the next stranger who notices.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/ring"
                  className="
                    inline-flex items-center gap-2
                    px-8 py-3.5 rounded-full
                    bg-cream text-ink
                    text-sm font-semibold
                    hover:bg-white
                    transition-colors duration-200
                  "
                >
                  Get the ring
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link
                  href="/ring#bracelet"
                  className="
                    inline-flex items-center
                    px-8 py-3.5 rounded-full
                    border border-mist text-cream
                    text-sm font-medium
                    hover:border-ash hover:text-white
                    transition-all duration-200
                  "
                >
                  Or a bracelet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InkSplashDivider />

      {/* ── Analog Life Kit ── */}
      <section className="bg-ink">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-14">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div className="space-y-4">
              <p className="text-xs tracking-[0.3em] uppercase text-ash">The analog life</p>
              <h2
                className="font-display text-cream tracking-tight leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
              >
                Live without<br />the screen.
              </h2>
            </div>
            <p className="text-ash leading-relaxed max-w-md">
              A curated kit of everything you need to step away from devices — and step into the
              real world. Each item replaces a digital habit with something that asks for your
              hands, your patience, and your presence.
            </p>
          </div>

          {/* Items grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ANALOG_ITEMS.map(({ icon, name, replaces, description }) => (
              <div
                key={name}
                className="
                  group relative border border-carbon rounded-xl p-7
                  bg-charcoal/30 hover:bg-charcoal/60
                  hover:border-mist transition-all duration-300
                  space-y-4
                "
              >
                <div className="text-3xl">{icon}</div>
                <div className="space-y-1">
                  <h3 className="font-display text-lg text-cream">{name}</h3>
                  <p className="text-xs tracking-widest uppercase text-mist">
                    replaces {replaces}
                  </p>
                </div>
                <p className="text-sm text-ash leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pt-4 border-t border-carbon">
            <div className="flex-1 space-y-1">
              <p className="text-cream font-medium">The Analog Life kit</p>
              <p className="text-sm text-ash">Everything in one box. Ships worldwide.</p>
            </div>
            <Link
              href="/kit"
              className="
                inline-flex items-center gap-2 shrink-0
                px-10 py-4 rounded-full
                bg-cream text-ink
                text-sm font-semibold
                hover:bg-white
                transition-colors duration-200
              "
            >
              Get the kit
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

const ANALOG_ITEMS = [
  {
    icon: '📷',
    name: 'Instant camera',
    replaces: 'Instagram',
    description: 'An Instax Mini so your memories live on paper, not on a server. Print it. Keep it. Give it away.',
  },
  {
    icon: '🎲',
    name: 'Card & board games',
    replaces: 'scrolling',
    description: 'Games that need a table, a few people, and a bit of patience. The kind where the arguments are the point.',
  },
  {
    icon: '✉️',
    name: 'Letter writing kit',
    replaces: 'DMs & texts',
    description: 'Quality paper, envelopes, and a wax seal. Write to someone you\'ve been meaning to reach. They\'ll remember it.',
  },
  {
    icon: '📖',
    name: 'A book',
    replaces: 'doom-scrolling',
    description: 'Curated each season by Circle hosts. No algorithm. No sponsored recommendations. Just someone\'s favourite.',
  },
  {
    icon: '🎵',
    name: 'Retro music player',
    replaces: 'streaming apps',
    description: 'A compact MP3 player. Load it with what you love and leave it there. Yours, completely.',
  },
  {
    icon: '○',
    name: 'The Cirle ring',
    replaces: 'your profile',
    description: 'Your token of belonging. Wear it out in the world and see who notices. The best conversation starter we know.',
  },
]

function getCategoryEmoji(cat: string): string {
  const map: Record<string, string> = {
    'Pottery': '🏺',
    'Yoga': '🧘',
    'Book Clubs': '📖',
    'Design': '✏️',
    'Photography': '📷',
    'Dance': '💃',
    'Cooking': '🍳',
    'Writing': '🖊️',
    'Film': '🎞️',
  }
  return map[cat] ?? '○'
}
