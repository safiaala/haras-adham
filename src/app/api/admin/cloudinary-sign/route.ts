import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { requireAdmin } from '@/lib/adminAuth'

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return denied
  const { folder } = await req.json()
  const timestamp = Math.round(Date.now() / 1000)
  const apiSecret = process.env.CLOUDINARY_API_SECRET!

  const paramsToSign = `folder=${folder || 'haras-adham'}&timestamp=${timestamp}`
  const signature = crypto
    .createHash('sha256')
    .update(paramsToSign + apiSecret)
    .digest('hex')

  return NextResponse.json({ timestamp, signature })
}
