import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { contactLimiter } from '@/lib/ratelimit'

const resend = new Resend(process.env.RESEND_API_KEY)

function esc(s: string): string {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

function sanitize(v: unknown, maxLen = 2000): string {
  if (typeof v !== 'string') return ''
  return v.trim().slice(0, maxLen)
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const { success } = await contactLimiter.limit(ip)
  if (!success) {
    return NextResponse.json({ error: 'Trop de messages. Réessayez dans une heure.' }, { status: 429 })
  }

  const body = await req.json()

  const nom     = sanitize(body.nom,     100)
  const email   = sanitize(body.email,   200)
  const tel     = sanitize(body.tel,      30)
  const sujet   = sanitize(body.sujet,   200)
  const message = sanitize(body.message, 5000)

  if (!nom || !email || !message) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
  }

  // Validation email basique
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
  }

  await supabaseAdmin.from('messages').insert({ nom, email, tel, sujet, message })

  try {
    await resend.emails.send({
      from: 'Haras Adham <onboarding@resend.dev>',
      to: ['contact@harasadham.ma'],
      replyTo: email,
      subject: `[Haras Adham] ${esc(sujet) || 'Nouveau message'} — ${esc(nom)}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#13201A;padding:20px;text-align:center">
            <span style="font-family:Georgia,serif;font-size:20px;color:#B8943A">Haras Adham</span>
          </div>
          <div style="padding:24px;background:#fbf9f5">
            <h2 style="font-family:Georgia,serif;color:#13201A;margin-bottom:16px">Nouveau message</h2>
            <table style="width:100%;font-size:13px;color:#333">
              <tr><td style="padding:6px 0;color:#888;width:80px">Nom</td><td><strong>${esc(nom)}</strong></td></tr>
              <tr><td style="padding:6px 0;color:#888">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
              ${tel ? `<tr><td style="padding:6px 0;color:#888">Tél</td><td>${esc(tel)}</td></tr>` : ''}
              <tr><td style="padding:6px 0;color:#888">Sujet</td><td>${esc(sujet) || '—'}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#fff;border-left:3px solid #B8943A;font-size:13px;line-height:1.7;color:#333">
              ${esc(message).replace(/\n/g,'<br>')}
            </div>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error('Erreur email Resend:', err)
  }

  return NextResponse.json({ ok: true })
}
