'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { CATEGORIES, CITIES } from '@/lib/data'

export default function CreatePage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    title: '',
    tagline: '',
    description: '',
    category: '',
    city: '',
    location: '',
    date: '',
    duration: '',
    price: '',
    currency: 'EUR',
    capacity: '',
    hostName: '',
    hostBio: '',
    hostEmail: '',
  })

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          tagline: form.tagline,
          description: form.description,
          category: form.category,
          city: form.city,
          location: form.location,
          date: form.date,
          duration: form.duration,
          price: form.price,
          currency: form.currency,
          capacity: form.capacity,
          hostName: form.hostName,
          hostBio: form.hostBio,
          hostEmail: form.hostEmail,
        }),
      })
      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error ?? 'Something went wrong')
      }
      setSubmitted(true)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="font-display text-6xl text-mist/40 leading-none select-none">○</div>
          <div className="space-y-3">
            <h1 className="font-display text-3xl text-cream">Circle submitted.</h1>
            <p className="text-ash leading-relaxed">
              Thanks, {form.hostName || 'friend'}. We&apos;ll review your circle and be in touch
              at the email you provided. It usually takes one to two days.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/explore"
              className="
                px-8 py-3.5 rounded-full
                bg-cream text-ink text-sm font-semibold
                hover:bg-white transition-colors
              "
            >
              Browse circles
            </Link>
            <button
              onClick={() => {
                setSubmitted(false)
                setForm({
                  title: '', tagline: '', description: '', category: '', city: '',
                  location: '', date: '', duration: '', price: '', currency: 'EUR',
                  capacity: '', hostName: '', hostBio: '', hostEmail: '',
                })
              }}
              className="
                px-8 py-3.5 rounded-full
                border border-mist text-cream text-sm
                hover:border-ash transition-colors
              "
            >
              Host another
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-6 md:px-12 py-16 pb-28">

      {/* Back */}
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ash hover:text-cream transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-3 mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-ash">For hosts</p>
        <h1
          className="font-display text-cream leading-tight tracking-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          Start hosting.
        </h1>
        <p className="text-ash leading-relaxed max-w-sm">
          Tell us about the circle you want to create. We review every submission
          and will be in touch within two days.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* ── Circle details ── */}
        <fieldset className="space-y-6">
          <legend className="text-[10px] uppercase tracking-[0.3em] text-mist mb-4 block">
            About your circle
          </legend>

          <Field label="Title" required>
            <input
              type="text"
              required
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="e.g. Sunday Morning Ceramics"
            />
          </Field>

          <Field label="Tagline" required hint="One short line. Make it evocative.">
            <input
              type="text"
              required
              value={form.tagline}
              onChange={e => set('tagline', e.target.value)}
              placeholder="e.g. Shape clay. Slow down."
            />
          </Field>

          <Field label="Description" required hint="Describe what happens, who it's for, and what to bring.">
            <textarea
              required
              rows={6}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Walk us through the session..."
              className="resize-none"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-mist block">
                Category<span className="text-cream/60 ml-0.5">*</span>
              </label>
              <CategoryCombobox value={form.category} onChange={v => set('category', v)} />
            </div>

            <Field label="City" required>
              <select
                required
                value={form.city}
                onChange={e => set('city', e.target.value)}
              >
                <option value="">Select a city</option>
                {CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Venue / location" required hint="Full address or neighbourhood — exact address sent to confirmed attendees.">
            <input
              type="text"
              required
              value={form.location}
              onChange={e => set('location', e.target.value)}
              placeholder="e.g. Studio Keramik, Schulterblatt 58, Hamburg"
            />
          </Field>
        </fieldset>

        <Divider />

        {/* ── Time & logistics ── */}
        <fieldset className="space-y-6">
          <legend className="text-[10px] uppercase tracking-[0.3em] text-mist mb-4 block">
            Time &amp; logistics
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Date & time" required>
              <input
                type="datetime-local"
                required
                value={form.date}
                onChange={e => set('date', e.target.value)}
              />
            </Field>

            <Field label="Duration" required hint="e.g. 2 hours, 90 minutes">
              <input
                type="text"
                required
                value={form.duration}
                onChange={e => set('duration', e.target.value)}
                placeholder="2 hours"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2">
              <Field label="Price per person" required hint="Set 0 for free events.">
                <input
                  type="number"
                  required
                  min={0}
                  value={form.price}
                  onChange={e => set('price', e.target.value)}
                  placeholder="0"
                />
              </Field>
            </div>

            <Field label="Currency" required>
              <select
                required
                value={form.currency}
                onChange={e => set('currency', e.target.value)}
              >
                {['EUR', 'USD', 'GBP', 'JPY', 'CHF', 'DKK', 'SEK', 'NOK'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Max capacity" required hint="How many people can join?">
            <input
              type="number"
              required
              min={2}
              max={200}
              value={form.capacity}
              onChange={e => set('capacity', e.target.value)}
              placeholder="12"
            />
          </Field>
        </fieldset>

        <Divider />

        {/* ── Host info ── */}
        <fieldset className="space-y-6">
          <legend className="text-[10px] uppercase tracking-[0.3em] text-mist mb-4 block">
            About you
          </legend>

          <Field label="Your name" required>
            <input
              type="text"
              required
              value={form.hostName}
              onChange={e => set('hostName', e.target.value)}
              placeholder="Your full name"
            />
          </Field>

          <Field label="Your email" required hint="We'll contact you here when your circle is reviewed.">
            <input
              type="email"
              required
              value={form.hostEmail}
              onChange={e => set('hostEmail', e.target.value)}
              placeholder="you@example.com"
            />
          </Field>

          <Field label="Short bio" required hint="A sentence or two. Who are you and why do you run this circle?">
            <textarea
              required
              rows={3}
              value={form.hostBio}
              onChange={e => set('hostBio', e.target.value)}
              placeholder="e.g. I'm a ceramicist based in Hamburg who has been teaching hand-building for seven years..."
              className="resize-none"
            />
          </Field>
        </fieldset>

        <button
          type="submit"
          disabled={submitting}
          className="
            w-full py-4 rounded-full
            bg-cream text-ink
            text-sm font-semibold
            hover:bg-white active:scale-[0.98]
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {submitting ? 'Submitting…' : 'Submit your circle'}
        </button>

        <p className="text-xs text-center text-mist">
          We review every circle before it goes live. No spam, no platforms fees.
        </p>
      </form>
    </main>
  )
}

// ── Small helper components ──────────────────────────────────────────────────

function CategoryCombobox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [input, setInput] = useState(value)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const suggestions = CATEGORIES.filter(c =>
    c.toLowerCase().includes(input.toLowerCase())
  )
  const isCustom = input.trim() !== '' && !CATEGORIES.some(c => c.toLowerCase() === input.toLowerCase())

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const inputBase = `
    w-full px-4 py-3 rounded-xl
    bg-charcoal border border-carbon
    text-cream placeholder:text-ash/40 text-sm
    focus:outline-none focus:border-mist
    transition-colors duration-200
  `

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        required
        value={input}
        placeholder="Select or type a category"
        onChange={e => { setInput(e.target.value); onChange(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        className={inputBase}
      />
      {open && (
        <div className="absolute z-20 mt-1.5 w-full rounded-xl border border-carbon bg-charcoal shadow-2xl overflow-hidden">
          {suggestions.map(cat => (
            <button
              key={cat}
              type="button"
              onMouseDown={() => { setInput(cat); onChange(cat); setOpen(false) }}
              className="w-full text-left px-4 py-2.5 text-sm text-ash hover:bg-carbon hover:text-cream transition-colors"
            >
              {cat}
            </button>
          ))}
          {isCustom && (
            <button
              type="button"
              onMouseDown={() => { onChange(input.trim()); setOpen(false) }}
              className="w-full text-left px-4 py-2.5 text-sm text-mist hover:bg-carbon hover:text-cream transition-colors border-t border-carbon/60"
            >
              Use &ldquo;{input.trim()}&rdquo;
            </button>
          )}
          {suggestions.length === 0 && !isCustom && (
            <p className="px-4 py-3 text-sm text-mist">Type to add a custom category</p>
          )}
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactElement<{ className?: string }>
}) {
  const base = `
    w-full px-4 py-3 rounded-xl
    bg-charcoal border border-carbon
    text-cream placeholder:text-ash/40 text-sm
    focus:outline-none focus:border-mist
    transition-colors duration-200
  `
  const styledChild = React.cloneElement(children, {
    className: `${base} ${children.props.className ?? ''}`,
  })
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] uppercase tracking-widest text-mist block">
        {label}{required && <span className="text-cream/60 ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-ash/70 -mt-0.5">{hint}</p>}
      {styledChild}
    </div>
  )
}

function Divider() {
  return <div className="border-t border-mist/20" />
}
