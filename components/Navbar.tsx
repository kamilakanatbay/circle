'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isMap = pathname === '/map'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
  }

  const navLinks = [
    { label: 'Explore', href: '/explore' },
    { label: 'Cities', href: '/explore?view=cities' },
    { label: 'Map', href: '/map' },
    { label: 'Host', href: '/create' },
  ]

  return (
    <header
      className={`
        fixed top-0 inset-x-0 z-50 h-16
        flex items-center justify-between
        px-6 md:px-12
        transition-all duration-500
        ${scrolled || !isHome || isMap
          ? 'bg-ink/95 backdrop-blur-md border-b border-mist/40'
          : 'bg-transparent'
        }
      `}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-display text-2xl font-bold text-cream tracking-tight hover:text-white transition-colors"
      >
        Circle
      </Link>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map(({ label, href }) => {
          const isActive = pathname === href || (href === '/map' && isMap)
          return (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive ? 'text-cream' : 'text-ash hover:text-cream'
              }`}
            >
              {label}
              {label === 'Map' && (
                <span className="ml-1.5 text-[8px] tracking-widest uppercase align-middle opacity-50">beta</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Auth */}
      {user ? (
        <div className="flex items-center gap-3">
          {user.user_metadata?.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt={user.user_metadata?.full_name ?? 'User'}
              className="w-8 h-8 rounded-full object-cover border border-mist/40"
            />
          )}
          <button
            onClick={signOut}
            className="
              text-sm font-medium px-5 py-2 rounded-full
              border border-mist text-ash
              hover:bg-cream hover:text-ink hover:border-cream
              transition-all duration-200
            "
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="
            text-sm font-medium px-5 py-2 rounded-full
            border border-mist text-cream
            hover:bg-cream hover:text-ink hover:border-cream
            transition-all duration-200
          "
        >
          Sign in
        </button>
      )}
    </header>
  )
}
