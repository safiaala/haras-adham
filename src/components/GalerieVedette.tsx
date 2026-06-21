'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { GaleriePhoto } from '@/lib/types'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'

export default function GalerieVedette() {
  const [photos, setPhotos] = useState<GaleriePhoto[]>([])
  const locale = useLocale()

  useEffect(() => {
    supabase.from('galerie').select('*').order('ordre', { ascending: true }).limit(8)
      .then(({ data }) => setPhotos(data || []))
  }, [])

  if (photos.length === 0) return null

  return (
    <section style={{ padding:'60px 60px', maxWidth:1400, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <div>
          <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>{t(locale,'galerie.badge')}</span>
          <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'2rem', color:'#13201A' }}>{t(locale,'galerie.title')}</h2>
        </div>
        <Link href="/galerie" style={{ fontSize:11, letterSpacing:'.08em', color:'#B8943A', textDecoration:'none' }}>{t(locale,'galerie.voir')}</Link>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:3 }}>
        {photos.slice(0,8).map((p, i) => (
          <Link key={p.id} href="/galerie"
            style={{ display:'block', position:'relative', overflow:'hidden', aspectRatio: i === 0 ? '1/1' : '1/1',
              gridColumn: i === 0 ? 'span 2' : undefined, gridRow: i === 0 ? 'span 2' : undefined,
              cursor:'pointer', textDecoration:'none' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.url} alt={p.legende || ''} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform .4s' }}
              onMouseOver={e => ((e.target as HTMLElement).style.transform = 'scale(1.04)')}
              onMouseOut={e => ((e.target as HTMLElement).style.transform = 'scale(1)')}/>
            {p.legende && (
              <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(transparent, rgba(14,26,19,.7))', padding:'20px 10px 8px', fontSize:10, color:'rgba(255,255,255,.85)', letterSpacing:'.04em' }}>
                {p.legende}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
