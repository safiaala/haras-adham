'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { countryFromTel } from '@/lib/countries'

function toCSV(rows: Record<string, unknown>[]): string {
  if (!rows.length) return ''
  const keys = Object.keys(rows[0])
  const escape = (v: unknown) => {
    const s = v === null || v === undefined ? '' : Array.isArray(v) ? v.join(', ') : typeof v === 'object' ? JSON.stringify(v) : String(v)
    return `"${s.replace(/"/g, '""')}"`
  }
  return [keys.join(','), ...rows.map(r => keys.map(k => escape(r[k])).join(','))].join('\n')
}

function download(csv: string, filename: string) {
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

interface Dataset { label: string; emoji: string; table: string; filename: string; desc: string }

const DATASETS: Dataset[] = [
  { label:'Chevaux',     emoji:'🐴', table:'chevaux',     filename:'haras-adham-chevaux.csv',     desc:'Tous les chevaux de la collection' },
  { label:'Étalons',     emoji:'🏆', table:'etalons',     filename:'haras-adham-etalons.csv',     desc:'Fiche complète des étalons reproducteurs' },
  { label:'Événements',  emoji:'📅', table:'evenements',  filename:'haras-adham-evenements.csv',  desc:'Agenda des événements' },
  { label:'Actualités',  emoji:'📰', table:'actualites',  filename:'haras-adham-actualites.csv',  desc:'Articles publiés' },
  { label:'Messages',    emoji:'✉️', table:'messages',    filename:'haras-adham-messages.csv',    desc:'Messages reçus via le formulaire' },
]

export default function AdminExportPage() {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState<string | null>(null)
  const [done, setDone] = useState<string | null>(null)

  useEffect(() => {
    Promise.all(DATASETS.map(d =>
      supabase.from(d.table).select('*', { count:'exact', head:true }).then(r => ({ table: d.table, count: r.count ?? 0 }))
    )).then(results => {
      const map: Record<string, number> = {}
      results.forEach(r => { map[r.table] = r.count })
      setCounts(map)
    })
  }, [])

  async function handleExport(d: Dataset) {
    setLoading(d.table)
    const { data } = await supabase.from(d.table).select('*').order('created_at', { ascending: false })
    if (data && data.length > 0) {
      // Pour les messages : ajouter une colonne "pays" dérivée de l'indicatif
      const enriched = d.table === 'messages'
        ? data.map((row: Record<string, unknown>) => {
            const pays = countryFromTel(String(row.tel ?? ''))
            return { ...row, pays: pays ? `${pays.flag} ${pays.name}` : '' }
          })
        : data
      download(toCSV(enriched), d.filename)
      setDone(d.table)
      setTimeout(() => setDone(null), 2000)
    }
    setLoading(null)
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f5f3ef', padding:40 }}>
      <div style={{ maxWidth:700, margin:'0 auto' }}>
        <div style={{ marginBottom:28 }}>
          <a href="/admin" style={{ fontSize:10, color:'#888', textDecoration:'none' }}>← Admin</a>
          <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:22, color:'#13201A', marginTop:4 }}>Export des données</h1>
          <p style={{ fontSize:12, color:'#888', marginTop:4 }}>Téléchargez vos données en format CSV, compatible Excel et Google Sheets.</p>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {DATASETS.map(d => {
            const count = counts[d.table] ?? '—'
            const isLoading = loading === d.table
            const isDone = done === d.table
            return (
              <div key={d.table} style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', padding:'18px 22px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:16 }}>
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <span style={{ fontSize:24 }}>{d.emoji}</span>
                  <div>
                    <div style={{ fontFamily:'Noto Serif,serif', fontSize:15, color:'#13201A' }}>{d.label}</div>
                    <div style={{ fontSize:11, color:'#888', marginTop:2 }}>{d.desc}</div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:14, flexShrink:0 }}>
                  <span style={{ fontFamily:'Noto Serif,serif', fontSize:20, color:'#B8943A' }}>{count}</span>
                  <button onClick={() => handleExport(d)} disabled={isLoading || count === 0}
                    style={{ fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', padding:'8px 16px', background: isDone ? '#EAF3DE' : '#13201A', color: isDone ? '#3B6D11' : '#fff', border:'none', cursor: count === 0 ? 'not-allowed' : 'pointer', fontFamily:'Plus Jakarta Sans,sans-serif', opacity: count === 0 ? 0.4 : 1, transition:'background .3s', whiteSpace:'nowrap' }}>
                    {isLoading ? 'Export...' : isDone ? '✓ Téléchargé' : '⬇ Exporter CSV'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop:20, background:'#FAEEDA', border:'.5px solid rgba(184,148,58,.3)', padding:'12px 16px', fontSize:12, color:'#854F0B' }}>
          💡 Le fichier CSV s&apos;ouvre directement dans Excel ou Google Sheets. L&apos;encodage UTF-8 avec BOM assure l&apos;affichage correct des caractères arabes et accentués.
        </div>
      </div>
    </div>
  )
}
