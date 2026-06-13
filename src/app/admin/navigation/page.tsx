'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { PAGES } from '@/lib/sections'

interface PageConfig { slug: string; actif: boolean; ordre: number }

export default function AdminNavigationPage() {
  const [pages, setPages] = useState<PageConfig[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function load() {
    const { data } = await supabase.from('pages').select('*').order('ordre')
    setPages(data || [])
  }
  useEffect(() => { load() }, [])

  async function toggle(slug: string) {
    const page = pages.find(p => p.slug === slug)
    if (!page) return
    await supabase.from('pages').update({ actif: !page.actif }).eq('slug', slug)
    await load()
  }

  async function moveOrder(slug: string, dir: 'up' | 'down') {
    const idx = pages.findIndex(p => p.slug === slug)
    const swap = dir === 'up' ? pages[idx-1] : pages[idx+1]
    if (!swap) return
    await Promise.all([
      supabase.from('pages').update({ ordre: swap.ordre }).eq('slug', slug),
      supabase.from('pages').update({ ordre: pages[idx].ordre }).eq('slug', swap.slug),
    ])
    await load()
  }

  const pageInfo = (slug: string) => PAGES.find(p => p.slug === slug)

  return (
    <div style={{ minHeight:'100vh', background:'#f5f3ef', padding:40 }}>
      <div style={{ maxWidth:700, margin:'0 auto' }}>
        <div style={{ marginBottom:28 }}>
          <a href="/admin" style={{ fontSize:10, color:'#888', textDecoration:'none' }}>← Admin</a>
          <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:22, color:'#13201A', marginTop:4 }}>Navigation & Pages</h1>
          <p style={{ fontSize:12, color:'#888', marginTop:4 }}>Activez ou désactivez les pages du site. Les pages désactivées disparaissent du menu et sont inaccessibles.</p>
        </div>

        <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', overflow:'hidden' }}>
          {pages.map((p, idx) => {
            const info = pageInfo(p.slug)
            return (
              <div key={p.slug} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 20px', borderBottom: idx < pages.length-1 ? '.5px solid rgba(195,200,195,.2)' : 'none', opacity: p.actif ? 1 : 0.5 }}>
                <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
                  <button onClick={() => moveOrder(p.slug,'up')} disabled={idx===0}
                    style={{ background:'transparent', border:'.5px solid rgba(195,200,195,.4)', cursor:'pointer', padding:'2px 7px', fontSize:10, color:'#888' }}>▲</button>
                  <button onClick={() => moveOrder(p.slug,'down')} disabled={idx===pages.length-1}
                    style={{ background:'transparent', border:'.5px solid rgba(195,200,195,.4)', cursor:'pointer', padding:'2px 7px', fontSize:10, color:'#888' }}>▼</button>
                </div>
                <div style={{ fontSize:22 }}>{info?.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'Noto Serif,serif', fontSize:15, color:'#13201A' }}>{info?.label}</div>
                  <div style={{ fontSize:10, color:'#888' }}>/{p.slug === 'accueil' ? '' : p.slug}</div>
                </div>
                <span style={{ fontSize:9, padding:'3px 8px', background: p.actif ? '#EAF3DE' : '#FCEBEB', color: p.actif ? '#3B6D11' : '#A32D2D', letterSpacing:'.06em', textTransform:'uppercase', borderRadius:1 }}>
                  {p.actif ? 'Active' : 'Désactivée'}
                </span>
                <button onClick={() => toggle(p.slug)}
                  style={{ fontSize:10, padding:'6px 14px', border:`.5px solid ${p.actif ? '#FCEBEB' : '#EAF3DE'}`, background: p.actif ? '#FCEBEB' : '#EAF3DE', color: p.actif ? '#A32D2D' : '#3B6D11', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif', letterSpacing:'.06em', textTransform:'uppercase' }}>
                  {p.actif ? 'Désactiver' : 'Activer'}
                </button>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop:16, background:'#FAEEDA', border:'.5px solid rgba(184,148,58,.3)', padding:'12px 16px', fontSize:12, color:'#854F0B' }}>
          ⚠️ La page <strong>Accueil</strong> et la page <strong>Contact</strong> ne peuvent pas être désactivées (essentielles au site).
        </div>
      </div>
    </div>
  )
}
