import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin, getExpectedToken } from '@/lib/adminAuth'
import { deriveToken } from '@/lib/adminToken'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  const { currentPassword, newPassword } = await req.json()

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: 'Le nouveau mot de passe doit contenir au moins 8 caractères' }, { status: 400 })
  }

  // Vérifie l'ancien mot de passe
  const currentToken = await deriveToken(currentPassword)
  const expectedToken = await getExpectedToken()
  if (currentToken !== expectedToken) {
    return NextResponse.json({ error: 'Mot de passe actuel incorrect' }, { status: 401 })
  }

  // Stocke le nouveau hash dans Supabase
  const newToken = await deriveToken(newPassword)
  const { error } = await supabaseAdmin
    .from('config')
    .upsert({ cle: 'admin_password_hash', valeur: newToken }, { onConflict: 'cle' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
