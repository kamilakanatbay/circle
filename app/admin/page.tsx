'use client'

import { useState, useEffect, useCallback } from 'react'
import { CATEGORIES, CITIES } from '@/lib/data'

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
  status: 'pending' | 'approved' | 'rejected' | 'inactive'
}

type EditData = Omit<Submission, 'id' | 'created_at' | 'status'>

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [acting, setActing] = useState<string | null>(null)
  const [editing, setEditing] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<EditData>>({})

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

  function startEdit(s: Submission) {
    setEditing(s.id)
    setEditData({
      title: s.title,
      tagline: s.tagline,
      description: s.description,
      category: s.category,
      city: s.city,
      location: s.location,
      date: s.date,
      duration: s.duration,
      price: s.price,
      currency: s.currency,
      capacity: s.capacity,
      host_name: s.host_name,
      host_bio: s.host_bio,
      host_email: s.host_email,
    })
  }

  async function saveEdit(id: string) {
    setActing(id + 'saving')
    await fetch('/api/admin', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify({ id, data: editData }),
    })
    setActing(null)
    setEditing(null)
    setEditData({})
    fetchSubmissions(password)
  }

  function cancelEdit() {
    setEditing(null)
    setEditData({})
  }

  const pending = submissions.filter(s => s.status === 'pending')
  const reviewed = submissions.filter(s => s.status === 'approved' || s.status === 'rejected')
  const inactive = submissions.filter(s => s.status === 'inactive')

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
                    onToggle={() => {
                      setExpanded(expanded === s.id ? null : s.id)
                      if (editing === s.id) cancelEdit()
                    }}
                    onApprove={() => handleAction(s.id, 'approved')}
                    onReject={() => handleAction(s.id, 'rejected')}
                    acting={acting}
                    isEditing={editing === s.id}
                    editData={editData}
                    onEditData={setEditData}
                    onStartEdit={() => startEdit(s)}
                    onSaveEdit={() => saveEdit(s.id)}
                    onCancelEdit={cancelEdit}
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

          {/* Inactive (past events) */}
          {inactive.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-xl text-cream">Inactive</h2>
                <span className="px-2 py-0.5 rounded-full bg-ash/10 text-ash text-xs">
                  {inactive.length}
                </span>
              </div>
              <p className="text-xs text-ash">Events whose date has passed. Hidden from the public.</p>
              <div className="space-y-3">
                {inactive.map(s => (
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

const inputCls = `
  w-full px-3 py-2 rounded-lg
  bg-ink border border-carbon
  text-cream placeholder:text-ash/40 text-sm
  focus:outline-none focus:border-mist
  transition-colors
`

const labelCls = 'text-[10px] uppercase tracking-widest text-mist block mb-1'

function SubmissionRow({
  s,
  expanded,
  onToggle,
  onApprove,
  onReject,
  acting,
  isEditing,
  editData,
  onEditData,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}: {
  s: Submission
  expanded: boolean
  onToggle: () => void
  onApprove?: () => void
  onReject?: () => void
  acting: string | null
  isEditing?: boolean
  editData?: Partial<EditData>
  onEditData?: (d: Partial<EditData>) => void
  onStartEdit?: () => void
  onSaveEdit?: () => void
  onCancelEdit?: () => void
}) {
  const date = new Date(s.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  })

  function field(key: keyof EditData) {
    return (editData?.[key] ?? '') as string
  }

  function set(key: keyof EditData, value: string | number) {
    onEditData?.({ ...editData, [key]: value })
  }

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
        <div className="px-6 pb-6 border-t border-carbon/60 pt-5">
          {isEditing ? (
            /* ── Edit form ── */
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Title</label>
                  <input className={inputCls} value={field('title')} onChange={e => set('title', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Tagline</label>
                  <input className={inputCls} value={field('tagline')} onChange={e => set('tagline', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Category</label>
                  <select className={inputCls} value={field('category')} onChange={e => set('category', e.target.value)}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>City</label>
                  <select className={inputCls} value={field('city')} onChange={e => set('city', e.target.value)}>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Location</label>
                  <input className={inputCls} value={field('location')} onChange={e => set('location', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Date</label>
                  <input className={inputCls} value={field('date')} onChange={e => set('date', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Duration</label>
                  <input className={inputCls} value={field('duration')} onChange={e => set('duration', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Price</label>
                  <input className={inputCls} type="number" value={editData?.price ?? ''} onChange={e => set('price', parseFloat(e.target.value))} />
                </div>
                <div>
                  <label className={labelCls}>Currency</label>
                  <input className={inputCls} value={field('currency')} onChange={e => set('currency', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Capacity</label>
                  <input className={inputCls} type="number" value={editData?.capacity ?? ''} onChange={e => set('capacity', parseInt(e.target.value))} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Description</label>
                <textarea
                  className={`${inputCls} min-h-[160px] resize-y`}
                  value={field('description')}
                  onChange={e => set('description', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Host name</label>
                  <input className={inputCls} value={field('host_name')} onChange={e => set('host_name', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Host email</label>
                  <input className={inputCls} value={field('host_email')} onChange={e => set('host_email', e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Host bio</label>
                  <textarea
                    className={`${inputCls} min-h-[80px] resize-y`}
                    value={field('host_bio')}
                    onChange={e => set('host_bio', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={onSaveEdit}
                  disabled={!!acting}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold bg-cream text-ink hover:bg-white disabled:opacity-50 transition-colors"
                >
                  {acting === s.id + 'saving' ? 'Saving…' : 'Save changes'}
                </button>
                <button
                  onClick={onCancelEdit}
                  className="px-6 py-2.5 rounded-full text-sm border border-mist text-ash hover:text-cream hover:border-silver transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* ── Read-only view ── */
            <div className="space-y-6">
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
                <p className="text-sm text-ash leading-relaxed whitespace-pre-wrap">{s.host_bio}</p>
              </div>

              {s.status === 'pending' && onApprove && onReject && (
                <div className="flex gap-3 pt-2 flex-wrap">
                  <button
                    onClick={onStartEdit}
                    className="px-6 py-2.5 rounded-full text-sm border border-mist text-ash hover:text-cream hover:border-silver transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={onApprove}
                    disabled={!!acting}
                    className="px-6 py-2.5 rounded-full text-sm font-semibold bg-cream text-ink hover:bg-white disabled:opacity-50 transition-colors"
                  >
                    {acting === s.id + 'approved' ? 'Approving…' : 'Approve'}
                  </button>
                  <button
                    onClick={onReject}
                    disabled={!!acting}
                    className="px-6 py-2.5 rounded-full text-sm border border-mist text-ash hover:text-cream hover:border-silver disabled:opacity-50 transition-colors"
                  >
                    {acting === s.id + 'rejected' ? 'Rejecting…' : 'Reject'}
                  </button>
                </div>
              )}
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
      : status === 'inactive'
      ? 'bg-ash/10 text-ash'
      : 'bg-red-900/40 text-red-300'

  return (
    <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest ${styles}`}>
      {status}
    </span>
  )
}
