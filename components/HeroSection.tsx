import Link from 'next/link'
import { HeroIllustration, InkCircleDecoration } from './SVGIllustration'

export function HeroSection() {
  const cities = ['New York', 'London', 'Berlin', 'Tokyo', 'Paris', 'Los Angeles', 'Amsterdam', 'Hamburg']

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col bg-ink">

      {/* Vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)' }}
      />

      {/* Decorative circle ornament — top right */}
      <InkCircleDecoration className="absolute -top-16 -right-16 w-80 h-80 opacity-60" />
      {/* Decorative circle ornament — bottom left */}
      <InkCircleDecoration className="absolute -bottom-24 -left-24 w-96 h-96 opacity-40" />

      {/* Main grid */}
      <div className="
        relative z-10 flex-1
        max-w-7xl w-full mx-auto
        px-6 md:px-12
        grid grid-cols-1 lg:grid-cols-2
        gap-8 items-center
        pt-28 pb-20
      ">
        {/* Left: Text */}
        <div className="space-y-8" style={{ animation: 'fadeUp 0.7s ease both' }}>

          {/* Overline */}
          <p className="text-xs font-medium tracking-[0.35em] uppercase text-ash">
            Find your people. In your city.
          </p>

          {/* Headline */}
          <h1
            className="font-display text-cream leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          >
            Where{' '}
            <em className="italic">offline</em>
            <br />
            community
            <br />
            begins.
          </h1>

          {/* Subtext */}
          <p className="text-base text-ash max-w-sm leading-relaxed">
            Discover pottery studios, book circles, writing sessions,
            and movement classes — curated for the city you call home.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
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
              Explore activities
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="/explore"
              className="
                inline-flex items-center
                px-8 py-3.5 rounded-full
                border border-mist text-cream
                text-sm font-medium
                hover:border-ash hover:text-white
                transition-all duration-200
              "
            >
              Browse cities
            </Link>
          </div>

          {/* Social proof */}
          <p className="text-xs text-mist pt-2">
            2,400+ circles across 8 cities
          </p>
        </div>

        {/* Right: SVG Illustration */}
        <div
          className="relative flex items-center justify-center h-[460px] lg:h-[620px]"
          style={{ animation: 'fadeIn 1s ease 0.3s both' }}
        >
          <HeroIllustration className="max-h-full drop-shadow-2xl" />
        </div>
      </div>

      {/* Cities strip at bottom */}
      <div className="
        relative z-10
        border-t border-mist/30
        bg-charcoal/50 backdrop-blur-sm
        px-6 md:px-12 py-4
      ">
        <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto scrollbar-none">
          <span className="text-xs text-ash shrink-0 tracking-widest uppercase">Now in</span>
          <div className="w-px h-4 bg-mist/50 shrink-0" />
          {cities.map(city => (
            <Link
              key={city}
              href={`/explore?city=${encodeURIComponent(city)}`}
              className="text-xs text-silver shrink-0 hover:text-cream transition-colors duration-200 whitespace-nowrap"
            >
              {city}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
