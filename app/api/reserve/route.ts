import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

// ── Calendar helpers ──────────────────────────────────────────────────────────

function parseDurationMinutes(duration: string): number {
  let total = 0
  const hoursMatch = duration.match(/(\d+\.?\d*)\s*hours?/i)
  const minutesMatch = duration.match(/(\d+\.?\d*)\s*min/i)
  if (hoursMatch) total += parseFloat(hoursMatch[1]) * 60
  if (minutesMatch) total += parseFloat(minutesMatch[1])
  return total > 0 ? Math.round(total) : 60
}

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

function toICalDate(dateStr: string): string {
  // Parse explicitly so we always produce YYYYMMDDTHHMMSS regardless of
  // whether the input has seconds ("2026-04-02T17:45" vs "2026-04-02T17:45:00")
  const [datePart, timePart = '00:00:00'] = dateStr.split('T')
  const [y, mo, d] = datePart.split('-')
  const parts = timePart.split(':')
  const h = (parts[0] ?? '00').padStart(2, '0')
  const m = (parts[1] ?? '00').padStart(2, '0')
  const s = (parts[2] ?? '00').padStart(2, '0').slice(0, 2)
  return `${y}${mo}${d}T${h}${m}${s}`
}

function icalEscape(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

function buildGoogleCalendarUrl(args: {
  title: string; description: string; location: string; rawDate: string; duration: string
}): string {
  const durationMins = parseDurationMinutes(args.duration)
  const endDateStr = addMinutesToDateStr(args.rawDate, durationMins)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: args.title,
    dates: `${toICalDate(args.rawDate)}/${toICalDate(endDateStr)}`,
    details: args.description,
    location: args.location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function buildICS(args: {
  id: string; title: string; location: string; rawDate: string; duration: string; attendeeName: string; attendeeEmail: string
}): string {
  const durationMins = parseDurationMinutes(args.duration)
  const endDateStr = addMinutesToDateStr(args.rawDate, durationMins)
  const now = toICalDate(new Date().toISOString().slice(0, 19))
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Circle//Circle Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `DTSTART:${toICalDate(args.rawDate)}`,
    `DTEND:${toICalDate(endDateStr)}`,
    `DTSTAMP:${now}Z`,
    `UID:${args.id}-${args.attendeeEmail}@circle.app`,
    `SUMMARY:${icalEscape(args.title)}`,
    `LOCATION:${icalEscape(args.location)}`,
    `ATTENDEE;CN="${icalEscape(args.attendeeName)}":mailto:${args.attendeeEmail}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

// ── Route handlers ────────────────────────────────────────────────────────────

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const activityId = searchParams.get('activityId')

  if (!activityId) {
    return NextResponse.json({ error: 'Missing activityId' }, { status: 400 })
  }

  const { count, error } = await supabase
    .from('reservations')
    .select('*', { count: 'exact', head: true })
    .eq('activity_id', activityId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ count: count ?? 0 })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name,
      email,
      activityId,
      activitySlug,
      activityTitle,
      activityDate,
      activityRawDate,
      activityDuration,
      activityLocation,
      price,
      currency,
    } = body

    if (!name || !email || !activityId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Save reservation to Supabase
    const { error: dbError } = await supabase.from('reservations').insert({
      name,
      email,
      activity_id: activityId,
      activity_slug: activitySlug,
      activity_title: activityTitle,
      activity_date: activityDate,
      activity_location: activityLocation,
      price,
      currency,
    })

    if (dbError) {
      console.error('Supabase error:', dbError.message)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    // 2. Send confirmation email
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      })

      const priceText =
        price === 0
          ? 'Free'
          : new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)

      const hasCalendarData = activityRawDate && activityDuration

      const gcalUrl = hasCalendarData
        ? buildGoogleCalendarUrl({
            title: activityTitle,
            description: `Your spot at ${activityTitle} is confirmed.`,
            location: activityLocation,
            rawDate: activityRawDate,
            duration: activityDuration,
          })
        : null

      const icsContent = hasCalendarData
        ? buildICS({
            id: activityId,
            title: activityTitle,
            location: activityLocation,
            rawDate: activityRawDate,
            duration: activityDuration,
            attendeeName: name,
            attendeeEmail: email,
          })
        : null

      const calendarSection = gcalUrl ? `
        <div style="margin-bottom:32px;">
          <p style="font-size:13px;color:#888;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.1em;">Add to your calendar</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <a href="${gcalUrl}"
               style="display:inline-block;padding:10px 20px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:20px;font-size:13px;font-family:Helvetica,sans-serif;">
              + Google Calendar
            </a>
            <span style="display:inline-block;padding:10px 20px;background:#f0eeec;color:#555;border-radius:20px;font-size:13px;font-family:Helvetica,sans-serif;">
              .ics attached (Apple / Outlook)
            </span>
          </div>
        </div>
      ` : ''

      const mailOptions: Parameters<typeof transporter.sendMail>[0] = {
        from: `Circle <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `You're in — ${activityTitle}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#1a1a1a;padding:40px 24px;">
            <p style="font-size:13px;letter-spacing:0.15em;text-transform:uppercase;color:#888;margin-bottom:32px;">Circle</p>
            <h1 style="font-size:28px;font-weight:normal;margin:0 0 8px;">You&rsquo;re in, ${name}.</h1>
            <p style="font-size:16px;color:#555;margin:0 0 32px;">
              Your spot at <strong>${activityTitle}</strong> is confirmed.
            </p>
            <div style="background:#f7f6f4;border-radius:12px;padding:24px;margin-bottom:32px;">
              <table style="width:100%;border-collapse:collapse;font-size:14px;">
                <tr>
                  <td style="color:#888;padding:6px 0;vertical-align:top;width:120px;">Date &amp; time</td>
                  <td style="color:#1a1a1a;padding:6px 0;">${activityDate}</td>
                </tr>
                <tr>
                  <td style="color:#888;padding:6px 0;vertical-align:top;">Location</td>
                  <td style="color:#1a1a1a;padding:6px 0;">${activityLocation}</td>
                </tr>
                <tr>
                  <td style="color:#888;padding:6px 0;vertical-align:top;">Price</td>
                  <td style="color:#1a1a1a;padding:6px 0;">${priceText}</td>
                </tr>
              </table>
            </div>
            ${calendarSection}
            <p style="font-size:14px;color:#555;line-height:1.6;margin:0 0 32px;">
              Show up with an open mind. The circle forms when everyone arrives.
            </p>
            <p style="font-size:13px;color:#aaa;">See you there. &mdash; The Circle team</p>
          </div>
        `,
      }

      if (icsContent) {
        mailOptions.attachments = [
          {
            filename: `${activityTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`,
            content: icsContent,
            contentType: 'text/calendar; method=REQUEST',
          },
        ]
      }

      await transporter.sendMail(mailOptions)
    } catch (emailErr) {
      console.error('Email error:', emailErr)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Reserve route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
