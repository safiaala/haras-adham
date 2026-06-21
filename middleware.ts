import { NextRequest, NextResponse } from 'next/server'
import { deriveToken } from '@/lib/adminToken'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const cookie = req.cookies.get('admin_auth')
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!cookie || !adminPassword) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    const expected = await deriveToken(adminPassword)
    if (cookie.value !== expected) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }
}

export const config = { matcher: ['/admin/:path*'] }
