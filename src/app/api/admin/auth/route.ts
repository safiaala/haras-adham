import { NextRequest, NextResponse } from 'next/server'
import { deriveToken } from '@/lib/adminToken'
import { authLimiter } from '@/lib/ratelimit'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const { success } = await authLimiter.limit(ip)
  if (!success) {
    return NextResponse.json({ error: 'Trop de tentatives. Réessayez dans 10 minutes.' }, { status: 429 })
  }

  let password: string
  try {
    const body = await req.json()
    password = body?.password ?? ''
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
  }

  if (!password) return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })

  // Vérifie d'abord le hash stocké dans Supabase
  const { data: stored } = await supabaseAdmin
    .from('config')
    .select('valeur')
    .eq('cle', 'admin_password_hash')
    .single()

  const token = await deriveToken(password)

  let valid = false
  if (stored?.valeur) {
    valid = token === stored.valeur
  } else {
    valid = password === process.env.ADMIN_PASSWORD
  }

  if (!valid) return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })

  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}
