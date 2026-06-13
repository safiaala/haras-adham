import { NextRequest, NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isAuthApi = path === '/api/admin/auth'
  const isLoginPage = path === '/admin/login'

  if (isAuthApi || isLoginPage) return NextResponse.next()

  const isAdmin = path.startsWith('/admin')
  if (!isAdmin) return NextResponse.next()

  const cookie = req.cookies.get('admin_auth')
  if (cookie?.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] }
