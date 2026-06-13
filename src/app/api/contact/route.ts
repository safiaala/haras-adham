import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { nom, email, sujet, message } = await req.json()

  if (!nom || !email || !message) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'Haras Adham <onboarding@resend.dev>',
      to: ['contact@harasadham.ma'],
      replyTo: email,
      subject: `[Haras Adham] ${sujet || 'Nouveau message'} — ${nom}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#13201A;padding:20px;text-align:center">
            <span style="font-family:Georgia,serif;font-size:20px;color:#B8943A">Haras Adham</span>
          </div>
          <div style="padding:24px;background:#fbf9f5">
            <h2 style="font-family:Georgia,serif;color:#13201A;margin-bottom:16px">Nouveau message</h2>
            <table style="width:100%;font-size:13px;color:#333">
              <tr><td style="padding:6px 0;color:#888;width:80px">Nom</td><td><strong>${nom}</strong></td></tr>
              <tr><td style="padding:6px 0;color:#888">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:6px 0;color:#888">Sujet</td><td>${sujet || '—'}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#fff;border-left:3px solid #B8943A;font-size:13px;line-height:1.7;color:#333">
              ${message.replace(/\n/g,'<br>')}
            </div>
          </div>
        </div>
      `,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erreur envoi' }, { status: 500 })
  }
}
