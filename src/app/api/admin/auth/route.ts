import { NextRequest, NextResponse } from 'next/server'
import { deriveToken } from '@/lib/adminToken'
import { authLimiter } from '@/lib/ratelimit'

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
  if (password && password === process.env.ADMIN_PASSWORD) {
    const token = await deriveToken(password)
    const res = NextResponse.json({ ok: true })
    res.cookies.set('admin_auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    })
    return res
  }
  return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
}
