import { NextRequest, NextResponse } from 'next/server'
import { deriveToken } from './adminToken'

export async function requireAdmin(req: NextRequest): Promise<NextResponse | null> {
  const cookie = req.cookies.get('admin_auth')
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!cookie || !adminPassword) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const expected = await deriveToken(adminPassword)
  if (cookie.value !== expected) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  return null
}
