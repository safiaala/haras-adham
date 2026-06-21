#!/usr/bin/env node
/**
 * Sauvegarde complète des données Supabase du Haras Adham.
 *
 * Produit, dans le dossier backups/<horodatage>/ :
 *   - data.json  : toutes les tables (fidélité totale : tableaux, JSON, nulls conservés)
 *   - restore.sql: instructions INSERT pour réimporter dans une base au schéma identique
 *
 * Usage :  node scripts/backup-supabase.mjs
 * Lit NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY depuis .env.local
 *
 * ⚠️ La table "messages" contient des données personnelles : garder ces sauvegardes
 *    hors du dépôt Git (le dossier backups/ est gitignoré).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

// Toutes les tables du site (ordre = ordre de réimport conseillé)
const TABLES = [
  'config', 'pages', 'sections',
  'chevaux', 'etalons', 'evenements', 'actualites', 'offres', 'galerie',
  'messages',
]

// --- Lecture des variables d'environnement (.env.local) ---
function loadEnv() {
  const env = {}
  try {
    const raw = readFileSync(join(ROOT, '.env.local'), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m) env[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
    }
  } catch {
    /* fichier absent : on tentera process.env */
  }
  return {
    url: env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
  }
}

const { url, key } = loadEnv()
if (!url || !key) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant (.env.local).')
  process.exit(1)
}

async function fetchTable(table) {
  const res = await fetch(`${url}/rest/v1/${table}?select=*`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  })
  if (!res.ok) {
    if (res.status === 404) { console.warn(`⚠️  Table "${table}" introuvable — ignorée.`); return null }
    throw new Error(`${table}: HTTP ${res.status} ${await res.text()}`)
  }
  return res.json()
}

// --- Conversion d'une valeur JS en littéral SQL Postgres ---
function sqlVal(v) {
  if (v === null || v === undefined) return 'NULL'
  if (typeof v === 'boolean') return v ? 'true' : 'false'
  if (typeof v === 'number') return String(v)
  if (Array.isArray(v)) {
    // tableau Postgres text[] : '{"a","b"}'
    const items = v.map(x => '"' + String(x).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"')
    return "'{" + items.join(',') + "}'"
  }
  if (typeof v === 'object') {
    // jsonb
    return "'" + JSON.stringify(v).replace(/'/g, "''") + "'::jsonb"
  }
  return "'" + String(v).replace(/'/g, "''") + "'"
}

function buildInserts(table, rows) {
  if (!rows || rows.length === 0) return `-- ${table} : aucune donnée\n`
  const cols = Object.keys(rows[0])
  let out = `-- ${table} (${rows.length} lignes)\n`
  for (const r of rows) {
    const vals = cols.map(c => sqlVal(r[c])).join(', ')
    out += `insert into public.${table} (${cols.join(', ')}) values (${vals}) on conflict do nothing;\n`
  }
  return out + '\n'
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const dir = join(ROOT, 'backups', stamp)
mkdirSync(dir, { recursive: true })

const all = {}
let sql = `-- Sauvegarde Haras Adham — ${new Date().toISOString()}\n`
sql += `-- Réimport : exécuter ce fichier dans Supabase → SQL Editor (schéma déjà créé via supabase/schema.sql)\n\n`

let total = 0
for (const t of TABLES) {
  const rows = await fetchTable(t)
  if (rows === null) continue
  all[t] = rows
  total += rows.length
  sql += buildInserts(t, rows)
  console.log(`✓ ${t.padEnd(12)} ${rows.length} lignes`)
}

writeFileSync(join(dir, 'data.json'), JSON.stringify(all, null, 2), 'utf8')
writeFileSync(join(dir, 'restore.sql'), sql, 'utf8')

console.log(`\n✅ Sauvegarde terminée : ${total} lignes au total`)
console.log(`   ${join('backups', stamp, 'data.json')}`)
console.log(`   ${join('backups', stamp, 'restore.sql')}`)
