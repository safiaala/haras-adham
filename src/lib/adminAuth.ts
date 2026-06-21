import { NextRequest, NextResponse } from 'next/server'
import { deriveToken } from './adminToken'
import { supabaseAdmin } from './supabase-admin'

async function getExpectedToken(): Promise<string | null> {
  // Cherche d'abord un hash stocké dans Supabase (mot de passe changé via l'UI)
  const { data } = await supabaseAdmin
    .from('config')
    .select('valeur')
    .eq('cle', 'admin_password_hash')
    .single()

  if (data?.valeur) return data.valeur

  // Fallback sur la variable d'environnement
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return null
  return deriveToken(adminPassword)
}

export async function requireAdmin(req: NextRequest): Promise<NextResponse | null> {
  const cookie = req.cookies.get('admin_auth')
  if (!cookie) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const expected = await getExpectedToken()
  if (!expected || cookie.value !== expected) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  return null
}

export { getExpectedToken }
