import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ ok: true })
    res.cookies.set('admin_auth', process.env.ADMIN_PASSWORD!, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 })
    return res
  }
  return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
}
