'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { GaleriePhoto } from '@/lib/types'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'

export default function GaleriePage() {
  const [photos, setPhotos] = useState<GaleriePhoto[]>([])
  const [selected, setSelected] = useState<GaleriePhoto | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [filtre, setFiltre] = useState('all')
  const locale = useLocale()

  useEffect(() => {
    supabase.from('galerie').select('*').order('ordre', { ascending:true })
      .then(({ data }) => {
        const p = data || []
        setPhotos(p)
        const cats = Array.from(new Set(p.map((x: GaleriePhoto) => x.categorie).filter(Boolean))) as string[]
        setCategories(cats)
      })
  }, [])

  const visible = filtre === 'all' ? photos : photos.filter(p => p.categorie === filtre)

  return (
    <>
      <div style={{ paddingTop:60 }}/>
      <div style={{ maxWidth:1400, margin:'0 auto', padding:'48px 60px' }}>
        <div style={{ marginBottom:36 }}>
          <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>{t(locale,'galerie.badge')}</span>
          <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:'2.4rem', color:'#13201A', marginBottom:0 }}>{t(locale,'galerie.title')}</h1>
        </div>

        {categories.length > 0 && (
          <div style={{ display:'flex', gap:6, marginBottom:28, flexWrap:'wrap' }}>
            <button onClick={() => setFiltre('all')}
              className={filtre === 'all' ? 'tag tag-amber' : 'tag tag-gray'}
              style={{ cursor:'pointer', border:'none', fontSize:10 }}>Tout</button>
            {categories.map(c => (
              <button key={c} onClick={() => setFiltre(c)}
                className={filtre === c ? 'tag tag-amber' : 'tag tag-gray'}
                style={{ cursor:'pointer', border:'none', fontSize:10 }}>{c}</button>
            ))}
          </div>
        )}

        {visible.length === 0 ? (
          <div style={{ textAlign:'center', padding:80, color:'#888', fontSize:13, fontStyle:'italic' }}>{t(locale,'galerie.empty')}</div>
        ) : (
          <div style={{ columns:'3 280px', gap:6 }}>
            {visible.map(p => (
              <div key={p.id} style={{ breakInside:'avoid', marginBottom:6, cursor:'pointer', overflow:'hidden' }}
                onClick={() => setSelected(p)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.legende || ''} style={{ width:'100%', display:'block', transition:'transform .3s' }}
                  onMouseOver={e => ((e.target as HTMLElement).style.transform = 'scale(1.03)')}
                  onMouseOut={e => ((e.target as HTMLElement).style.transform = 'scale(1)')}/>
                {p.legende && (
                  <div style={{ padding:'6px 8px', background:'#f5f3ef', fontSize:10, color:'#6b6b6b' }}>{p.legende}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div onClick={() => setSelected(null)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.88)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:24, cursor:'zoom-out' }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth:'90vw', maxHeight:'90vh', position:'relative' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selected.url} alt={selected.legende || ''} style={{ maxWidth:'100%', maxHeight:'85vh', objectFit:'contain', display:'block' }}/>
            {selected.legende && (
              <div style={{ textAlign:'center', color:'rgba(255,255,255,.7)', fontSize:12, marginTop:10 }}>{selected.legende}</div>
            )}
            <button onClick={() => setSelected(null)}
              style={{ position:'absolute', top:-16, right:-16, background:'#B8943A', border:'none', color:'#fff', width:32, height:32, borderRadius:'50%', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
          </div>
        </div>
      )}
    </>
  )
}
