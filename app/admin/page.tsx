'use client'

import { useState, useEffect, useCallback } from 'react'

interface Submission {
  id: string
  created_at: string
  title: string
  tagline: string
  description: string
  category: string
  city: string
  location: string
  date: string
  duration: string
  price: number
  currency: string
  capacity: number
  host_name: string
  host_bio: string
  host_email: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [acting, setActing] = useState<string | null>(null)

  const fetchSubmissions = useCallback(async (pw: string) => {
    setLoading(true)
    const res = await fetch('/api/admin', {
      headers: { 'x-admin-password': pw },
    })
    if (res.status === 401) {
      setAuthError(true)
      setAuthed(false)
      setLoading(false)
      return
    }
    const { submissions } = await res.json()
    setSubmissions(submissions ?? [])
    setLoading(false)
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthError(false)
    const res = await fetch('/api/admin', {
      headers: { 'x-admin-password': password },
    })
    if (res.status === 401) {
      setAuthError(true)
      return
    }
    const { submissions } = await res.json()
    setSubmissions(submissions ?? [])
    setAuthed(true)
  }

  async function handleAction(id: string, action: 'approved' | 'rejected') {
    setActing(id + action)
    await fetch('/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify({ id, action }),
    })
    setActing(null)
    fetchSubmissions(password)
  }

  const pending = submissions.filter(s => s.status === 'pending')
  const reviewed = submissions.filter(s => s.status !== 'pending')

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-5">
          <div className="space-y-1">
            <p className="text-xs tracking-[0.3em] uppercase text-ash">Circle</p>
            <h1 className="font-display text-2xl text-cream">Admin</h1>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="
              w-full px-4 py-3 rounded-xl
              bg-charcoal border border-carbon
              text-cream placeholder:text-ash/40 text-sm
              focus:outline-none focus:border-mist
              transition-colors
            "
          />
          {authError && (
            <p className="text-xs text-red-400">Wrong password.</p>
          )}
          <button
            type="submit"
            className="
              w-full py-3.5 rounded-full
              bg-cream text-ink text-sm font-semibold
              hover:bg-white transition-colors
            "
          >
            Enter
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-6 md:px-12 py-16 pb-28">
      <div className="flex items-end justify-between mb-12">
        <div className="space-y-1">
          <p className="text-xs tracking-[0.3em] uppercase text-ash">Circle</p>
          <h1 className="font-display text-3xl text-cream">Admin</h1>
        </div>
        <button
          onClick={() => fetchSubmissions(password)}
          className="text-xs text-ash hover:text-cream transition-colors"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-ash text-sm">Loading…</p>
      ) : (
        <div className="space-y-16">

          {/* Pending */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-xl text-cream">Pending</h2>
              {pending.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-cream/10 text-cream text-xs">
                  {pending.length}
                </span>
              )}
            </div>

            {pending.length === 0 ? (
              <p className="text-sm text-ash">No pending submissions.</p>
            ) : (
              <div className="space-y-3">
                {pending.map(s => (
                  <SubmissionRow
                    key={s.id}
                    s={s}
                    expanded={expanded === s.id}
                    onToggle={() => setExpanded(expanded === s.id ? null : s.id)}
                    onApprove={() => handleAction(s.id, 'approved')}
                    onReject={() => handleAction(s.id, 'rejected')}
                    acting={acting}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Reviewed */}
          {reviewed.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-display text-xl text-cream">Reviewed</h2>
              <div className="space-y-3">
                {reviewed.map(s => (
                  <SubmissionRow
                    key={s.id}
                    s={s}
                    expanded={expanded === s.id}
                    onToggle={() => setExpanded(expanded === s.id ? null : s.id)}
                    acting={acting}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  )
}

function SubmissionRow({
  s,
  expanded,
  onToggle,
  onApprove,
  onReject,
  acting,
}: {
  s: Submission
  expanded: boolean
  onToggle: () => void
  onApprove?: () => void
  onReject?: () => void
  acting: string | null
}) {
  const date = new Date(s.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  })

  return (
    <div className="rounded-xl border border-carbon bg-charcoal overflow-hidden">
      {/* Header row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-carbon/40 transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0">
          <StatusBadge status={s.status} />
          <div className="min-w-0">
            <p className="text-sm font-medium text-cream truncate">{s.title}</p>
            <p className="text-xs text-ash">{s.host_name} · {s.city} · {date}</p>
          </div>
        </div>
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          className={`shrink-0 text-mist transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        >
          <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-carbon/60 pt-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            {[
              { label: 'Category', value: s.category },
              { label: 'City', value: s.city },
              { label: 'Location', value: s.location },
              { label: 'Date', value: s.date },
              { label: 'Duration', value: s.duration },
              { label: 'Price', value: `${s.price} ${s.currency}` },
              { label: 'Capacity', value: `${s.capacity} people` },
              { label: 'Host email', value: s.host_email },
            ].map(({ label, value }) => (
              <div key={label} className="space-y-0.5">
                <p className="text-[10px] uppercase tracking-widest text-mist">{label}</p>
                <p className="text-cream">{value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-widest text-mist">Description</p>
            <p className="text-sm text-ash leading-relaxed whitespace-pre-wrap">{s.description}</p>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-widest text-mist">Host bio</p>
            <p className="text-sm text-ash leading-relaxed">{s.host_bio}</p>
          </div>

          {s.status === 'pending' && onApprove && onReject && (
            <div className="flex gap-3 pt-2">
              <button
                onClick={onApprove}
                disabled={!!acting}
                className="
                  px-6 py-2.5 rounded-full text-sm font-semibold
                  bg-cream text-ink hover:bg-white
                  disabled:opacity-50 transition-colors
                "
              >
                {acting === s.id + 'approved' ? 'Approving…' : 'Approve'}
              </button>
              <button
                onClick={onReject}
                disabled={!!acting}
                className="
                  px-6 py-2.5 rounded-full text-sm
                  border border-mist text-ash hover:text-cream hover:border-ash
                  disabled:opacity-50 transition-colors
                "
              >
                {acting === s.id + 'rejected' ? 'Rejecting…' : 'Reject'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === 'pending'
      ? 'bg-cream/10 text-cream'
      : status === 'approved'
      ? 'bg-green-900/40 text-green-300'
      : 'bg-red-900/40 text-red-300'

  return (
    <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest ${styles}`}>
      {status}
    </span>
  )
}
