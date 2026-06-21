import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
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
