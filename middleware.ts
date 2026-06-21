import { NextRequest, NextResponse } from 'next/server'
import { deriveToken } from '@/lib/adminToken'

// Récupère le jeton attendu : hash stocké dans Supabase (mot de passe changé via l'UI)
// sinon repli sur la variable d'environnement ADMIN_PASSWORD.
async function getExpectedToken(): Promise<string | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (url && serviceKey) {
    try {
      const res = await fetch(
        `${url}/rest/v1/config?cle=eq.admin_password_hash&select=valeur`,
        { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
      )
      if (res.ok) {
        const rows = await res.json()
        if (Array.isArray(rows) && rows[0]?.valeur) return rows[0].valeur as string
      }
    } catch {
      // En cas d'échec réseau, on retombe sur la variable d'environnement.
    }
  }
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return null
  return deriveToken(adminPassword)
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const cookie = req.cookies.get('admin_auth')
    if (!cookie) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    const expected = await getExpectedToken()
    if (!expected || cookie.value !== expected) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }
}

export const config = { matcher: ['/admin/:path*'] }
