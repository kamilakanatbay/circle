import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

function checkAuth(req: Request) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

// ── Calendar helpers ──────────────────────────────────────────────────────────

/** Parse a human duration string like "3.5 hours", "90 minutes", "1 hour 30 minutes" → total minutes */
function parseDurationMinutes(duration: string): number {
  let total = 0
  const hoursMatch = duration.match(/(\d+\.?\d*)\s*hours?/i)
  const minutesMatch = duration.match(/(\d+\.?\d*)\s*min/i)
  if (hoursMatch) total += parseFloat(hoursMatch[1]) * 60
  if (minutesMatch) total += parseFloat(minutesMatch[1])
  return total > 0 ? Math.round(total) : 60 // default 1 hour if unparseable
}

/**
 * Add minutes to a date string like "2025-04-12T08:00:00".
 * Treats the string as-is (no timezone conversion) to keep the time the host intended.
 */
function addMinutesToDateStr(dateStr: string, minutes: number): string {
  const [datePart, timePart = '00:00:00'] = dateStr.split('T')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hours, mins, secs = 0] = timePart.split(':').map(Number)

  const d = new Date(Date.UTC(year, month - 1, day, hours, mins, secs))
  d.setUTCMinutes(d.getUTCMinutes() + minutes)

  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`
  )
}

/** "2025-04-12T08:00:00" → "20250412T080000" (iCal / Google Calendar format) */
function toICalDate(dateStr: string): string {
  const [datePart, timePart = '00:00:00'] = dateStr.split('T')
  const [y, mo, d] = datePart.split('-')
  const parts = timePart.split(':')
  const h = (parts[0] ?? '00').padStart(2, '0')
  const m = (parts[1] ?? '00').padStart(2, '0')
  const s = (parts[2] ?? '00').padStart(2, '0').slice(0, 2)
  return `${y}${mo}${d}T${h}${m}${s}`
}

/** Escape special chars in iCal text fields */
function icalEscape(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

function buildGoogleCalendarUrl(s: {
  title: string; description: string; location: string; date: string; duration: string
}): string {
  const durationMins = parseDurationMinutes(s.duration)
  const endDateStr = addMinutesToDateStr(s.date, durationMins)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: s.title,
    dates: `${toICalDate(s.date)}/${toICalDate(endDateStr)}`,
    details: s.description,
    location: s.location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function buildICS(s: {
  id: string; title: string; description: string; location: string
  date: string; duration: string; host_name: string; host_email: string
}): string {
  const durationMins = parseDurationMinutes(s.duration)
  const endDateStr = addMinutesToDateStr(s.date, durationMins)
  const now = toICalDate(new Date().toISOString().slice(0, 19))

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Circle//Circle Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `DTSTART:${toICalDate(s.date)}`,
    `DTEND:${toICalDate(endDateStr)}`,
    `DTSTAMP:${now}Z`,
    `UID:${s.id}@circle.app`,
    `SUMMARY:${icalEscape(s.title)}`,
    `DESCRIPTION:${icalEscape(s.description)}`,
    `LOCATION:${icalEscape(s.location)}`,
    `ORGANIZER;CN="${icalEscape(s.host_name)}":mailto:${s.host_email}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

// ── Route handlers ────────────────────────────────────────────────────────────

// GET — fetch all submissions
export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ submissions: data })
}

// PATCH — update submission fields (admin edits before approving)
export async function PATCH(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, data } = await req.json()

  if (!id || !data || typeof data !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const allowed = [
    'title', 'tagline', 'description', 'category', 'city', 'location',
    'date', 'duration', 'price', 'currency', 'capacity',
    'host_name', 'host_bio', 'host_email',
  ]
  const update: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in data) update[key] = data[key]
  }

  const { error } = await supabase
    .from('submissions')
    .update(update)
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}

// POST — approve or reject a submission
export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, action } = await req.json()

  if (!id || !['approved', 'rejected'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Fetch the submission
  const { data: submission, error: fetchError } = await supabase
    .from('submissions')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !submission) {
    return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
  }

  // Update status
  const { error: updateError } = await supabase
    .from('submissions')
    .update({ status: action })
    .eq('id', id)

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 })

  // Email the host
  try {
    const isApproved = action === 'approved'

    const mailOptions: Parameters<typeof transporter.sendMail>[0] = {
      from: `Circle <${process.env.GMAIL_USER}>`,
      to: submission.host_email,
      subject: isApproved
        ? `Your circle is approved — ${submission.title}`
        : `Update on your circle submission — ${submission.title}`,
      html: isApproved ? buildApprovalHtml(submission) : buildRejectionHtml(submission),
    }

    if (isApproved) {
      const icsContent = buildICS(submission)
      mailOptions.attachments = [
        {
          filename: `${submission.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`,
          content: icsContent,
          contentType: 'text/calendar; method=REQUEST',
        },
      ]
    }

    await transporter.sendMail(mailOptions)
  } catch (emailErr) {
    console.error('Host email error:', emailErr)
  }

  return NextResponse.json({ ok: true })
}

// ── Email templates ───────────────────────────────────────────────────────────

function buildApprovalHtml(submission: {
  title: string; city: string; location: string; date: string
  capacity: number; description: string; duration: string; host_name: string; host_email: string; id: string
}): string {
  const gcalUrl = buildGoogleCalendarUrl(submission)

  return `
    <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#1a1a1a;padding:40px 24px;">
      <p style="font-size:13px;letter-spacing:0.15em;text-transform:uppercase;color:#888;margin-bottom:32px;">Circle</p>
      <h1 style="font-size:28px;font-weight:normal;margin:0 0 8px;">Your circle is live.</h1>
      <p style="font-size:16px;color:#555;margin:0 0 32px;">
        <strong>${submission.title}</strong> has been approved and is now live on Circle.
      </p>
      <div style="background:#f7f6f4;border-radius:12px;padding:24px;margin-bottom:32px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="color:#888;padding:5px 0;width:100px;">City</td><td style="color:#1a1a1a;padding:5px 0;">${submission.city}</td></tr>
          <tr><td style="color:#888;padding:5px 0;">Location</td><td style="color:#1a1a1a;padding:5px 0;">${submission.location}</td></tr>
          <tr><td style="color:#888;padding:5px 0;">Date</td><td style="color:#1a1a1a;padding:5px 0;">${submission.date}</td></tr>
          <tr><td style="color:#888;padding:5px 0;">Duration</td><td style="color:#1a1a1a;padding:5px 0;">${submission.duration}</td></tr>
          <tr><td style="color:#888;padding:5px 0;">Capacity</td><td style="color:#1a1a1a;padding:5px 0;">${submission.capacity} people</td></tr>
        </table>
      </div>

      <!-- Calendar buttons -->
      <div style="margin-bottom:32px;">
        <p style="font-size:13px;color:#888;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.1em;">Add to your calendar</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <a href="${gcalUrl}"
             style="display:inline-block;padding:10px 20px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:20px;font-size:13px;font-family:Helvetica,sans-serif;">
            + Google Calendar
          </a>
          <span style="display:inline-block;padding:10px 20px;background:#f0eeec;color:#555;border-radius:20px;font-size:13px;font-family:Helvetica,sans-serif;">
            .ics file attached (Apple / Outlook)
          </span>
        </div>
      </div>

      <p style="font-size:14px;color:#555;line-height:1.6;">
        People can now find and reserve spots at your circle. We'll be in touch if anything comes up.
      </p>
      <p style="font-size:13px;color:#aaa;margin-top:32px;">— The Circle team</p>
    </div>
  `
}

function buildRejectionHtml(submission: { title: string }): string {
  return `
    <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#1a1a1a;padding:40px 24px;">
      <p style="font-size:13px;letter-spacing:0.15em;text-transform:uppercase;color:#888;margin-bottom:32px;">Circle</p>
      <h1 style="font-size:28px;font-weight:normal;margin:0 0 8px;">Thanks for submitting.</h1>
      <p style="font-size:16px;color:#555;margin:0 0 32px;">
        After reviewing <strong>${submission.title}</strong>, we're not able to add it to Circle right now.
      </p>
      <p style="font-size:14px;color:#555;line-height:1.6;">
        This might be because of timing, fit, or city availability. We'd love for you to try again —
        feel free to submit a different circle or reach out with any questions.
      </p>
      <p style="font-size:13px;color:#aaa;margin-top:32px;">— The Circle team</p>
    </div>
  `
}
