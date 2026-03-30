import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-mist/30 mt-24 px-6 md:px-12 py-12 bg-void">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="font-display text-2xl text-cream font-bold">Circle</p>
            <p className="text-sm text-ash mt-2 leading-relaxed">
              Offline community. Real connection. Eight cities and growing.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-3">
            {[
              { label: 'Explore activities', href: '/explore' },
              { label: 'Browse cities', href: '/explore?view=cities' },
              { label: 'Host a circle', href: '/create' },
              { label: 'About', href: '#' },
              { label: 'Privacy', href: '#' },
              { label: 'Terms', href: '#' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-ash hover:text-cream transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-mist/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-mist">
            © {year} Circle. Made for cities, for people.
          </p>
          <p className="text-xs text-mist">
            New York · London · Berlin · Tokyo · Paris · LA · Amsterdam · Hamburg
          </p>
        </div>
      </div>
    </footer>
  )
}
