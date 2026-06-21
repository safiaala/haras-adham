import { NextRequest, NextResponse } from 'next/server'
import { deriveToken } from '@/lib/adminToken'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (password === process.env.ADMIN_PASSWORD) {
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
