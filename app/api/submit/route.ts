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

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      title, tagline, description, category, city, location,
      date, duration, price, currency, capacity,
      hostName, hostBio, hostEmail,
    } = body

    if (!title || !hostEmail || !hostName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Save to Supabase
    const { error: dbError } = await supabase.from('submissions').insert({
      title, tagline, description, category, city, location,
      date, duration,
      price: Number(price) || 0,
      currency,
      capacity: Number(capacity) || 0,
      host_name: hostName,
      host_bio: hostBio,
      host_email: hostEmail,
      status: 'pending',
    })

    if (dbError) {
      console.error('Supabase error:', dbError.message)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    // Email the admin
    try {
      await transporter.sendMail({
        from: `Circle <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: `New circle submission — ${title}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1a1a;padding:40px 24px;">
            <p style="font-size:13px;letter-spacing:0.15em;text-transform:uppercase;color:#888;margin-bottom:32px;">Circle · New Submission</p>

            <h1 style="font-size:26px;font-weight:normal;margin:0 0 4px;">${title}</h1>
            <p style="font-size:15px;color:#555;margin:0 0 32px;font-style:italic;">${tagline}</p>

            <div style="background:#f7f6f4;border-radius:12px;padding:24px;margin-bottom:32px;">
              <table style="width:100%;border-collapse:collapse;font-size:14px;">
                <tr><td style="color:#888;padding:5px 0;width:120px;">Host</td><td style="color:#1a1a1a;padding:5px 0;">${hostName}</td></tr>
                <tr><td style="color:#888;padding:5px 0;">Email</td><td style="color:#1a1a1a;padding:5px 0;">${hostEmail}</td></tr>
                <tr><td style="color:#888;padding:5px 0;">Category</td><td style="color:#1a1a1a;padding:5px 0;">${category}</td></tr>
                <tr><td style="color:#888;padding:5px 0;">City</td><td style="color:#1a1a1a;padding:5px 0;">${city}</td></tr>
                <tr><td style="color:#888;padding:5px 0;">Location</td><td style="color:#1a1a1a;padding:5px 0;">${location}</td></tr>
                <tr><td style="color:#888;padding:5px 0;">Date</td><td style="color:#1a1a1a;padding:5px 0;">${date}</td></tr>
                <tr><td style="color:#888;padding:5px 0;">Duration</td><td style="color:#1a1a1a;padding:5px 0;">${duration}</td></tr>
                <tr><td style="color:#888;padding:5px 0;">Price</td><td style="color:#1a1a1a;padding:5px 0;">${price} ${currency}</td></tr>
                <tr><td style="color:#888;padding:5px 0;">Capacity</td><td style="color:#1a1a1a;padding:5px 0;">${capacity} people</td></tr>
              </table>
            </div>

            <div style="margin-bottom:32px;">
              <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:8px;">Description</p>
              <p style="font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap;">${description}</p>
            </div>

            <div style="margin-bottom:32px;">
              <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:8px;">Host bio</p>
              <p style="font-size:14px;color:#333;line-height:1.7;">${hostBio}</p>
            </div>

            <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'}/admin" style="display:inline-block;padding:12px 28px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:100px;font-size:14px;">Review in admin →</a>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('Admin email error:', emailErr)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Submit route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
