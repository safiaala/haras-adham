'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Cheval } from '@/lib/types'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'
import Link from 'next/link'

export default function ChevauxVedette() {
  const [chevaux, setChevaux] = useState<Cheval[]>([])
  const locale = useLocale()

  useEffect(() => {
    supabase.from('chevaux').select('*').eq('en_vedette', true).limit(4)
      .then(({ data }) => setChevaux(data || []))
  }, [])

  if (chevaux.length === 0) return null

  return (
    <section style={{ padding:'60px 60px', maxWidth:1400, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:28, flexWrap:'wrap', gap:12 }}>
        <div>
          <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>{t(locale,'chevaux.badge')}</span>
          <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'2rem', color:'#13201A' }}>{t(locale,'chevaux.title')}</h2>
        </div>
        <Link href="/chevaux" className="btn-outline">{t(locale,'chevaux.voir')} →</Link>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))', gap:14 }}>
        {chevaux.map(c => (
          <div key={c.id} className="hcard">
            {c.photos?.[0]
              ? <img src={c.photos[0]} alt={c.nom} style={{ width:'100%', height:190, objectFit:'cover' }}/>
              : <div style={{ width:'100%', height:190, background:'#f0ece4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:40 }}>🐴</div>
            }
            <div style={{ padding:'12px 14px' }}>
              <div style={{ fontFamily:'Noto Serif,serif', fontSize:15, color:'#13201A', marginBottom:4 }}>{c.nom}</div>
              <div style={{ fontSize:10, color:'#888' }}>{c.annee_naissance || ''}{c.annee_naissance && c.race ? ' · ' : ''}{c.race}</div>
              {c.discipline && <span className="tag tag-blue" style={{ marginTop:6 }}>{c.discipline.toUpperCase()}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
