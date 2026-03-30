import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

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

    // 2. Send confirmation email — non-blocking, won't fail the reservation
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

      await transporter.sendMail({
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
            <p style="font-size:14px;color:#555;line-height:1.6;margin:0 0 32px;">
              Show up with an open mind. The circle forms when everyone arrives.
            </p>
            <p style="font-size:13px;color:#aaa;">See you there. &mdash; The Circle team</p>
          </div>
        `,
      })
    } catch (emailErr) {
      // Email failed but reservation was saved — log and continue
      console.error('Email error:', emailErr)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Reserve route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
