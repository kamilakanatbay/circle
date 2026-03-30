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
    await transporter.sendMail({
      from: `Circle <${process.env.GMAIL_USER}>`,
      to: submission.host_email,
      subject: isApproved
        ? `Your circle is approved — ${submission.title}`
        : `Update on your circle submission — ${submission.title}`,
      html: isApproved ? `
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
              <tr><td style="color:#888;padding:5px 0;">Capacity</td><td style="color:#1a1a1a;padding:5px 0;">${submission.capacity} people</td></tr>
            </table>
          </div>
          <p style="font-size:14px;color:#555;line-height:1.6;">
            People can now find and reserve spots at your circle. We'll be in touch if anything comes up.
          </p>
          <p style="font-size:13px;color:#aaa;margin-top:32px;">— The Circle team</p>
        </div>
      ` : `
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
      `,
    })
  } catch (emailErr) {
    console.error('Host email error:', emailErr)
  }

  return NextResponse.json({ ok: true })
}
