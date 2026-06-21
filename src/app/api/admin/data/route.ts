import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { requireAdmin } from '@/lib/adminAuth'

const ALLOWED_TABLES = [
  'chevaux', 'etalons', 'evenements', 'actualites', 'offres',
  'galerie', 'config', 'pages', 'sections', 'navigation', 'prestations',
]

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  const { table, data } = await req.json()
  if (!ALLOWED_TABLES.includes(table)) return NextResponse.json({ error: 'Table non autorisée' }, { status: 400 })

  const { data: result, error } = await supabaseAdmin.from(table).insert(data).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(result)
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  const { table, data, id, field = 'id' } = await req.json()
  if (!ALLOWED_TABLES.includes(table)) return NextResponse.json({ error: 'Table non autorisée' }, { status: 400 })

  const { error } = await supabaseAdmin.from(table).update(data).eq(field, id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  const { table, data, onConflict } = await req.json()
  if (!ALLOWED_TABLES.includes(table)) return NextResponse.json({ error: 'Table non autorisée' }, { status: 400 })

  const { error } = await supabaseAdmin.from(table).upsert(data, onConflict ? { onConflict } : undefined)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  const { table, id } = await req.json()
  if (!ALLOWED_TABLES.includes(table)) return NextResponse.json({ error: 'Table non autorisée' }, { status: 400 })

  const { error } = await supabaseAdmin.from(table).delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
