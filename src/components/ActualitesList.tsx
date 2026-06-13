'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Actualite } from '@/lib/types'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'

export default function ActualitesList() {
  const [news, setNews] = useState<Actualite[]>([])
  const locale = useLocale()

  useEffect(() => {
    supabase.from('actualites').select('*').eq('publie', true).order('created_at', { ascending:false })
      .then(({ data }) => setNews(data || []))
  }, [])

  return (
    <section style={{ padding:'40px 60px', maxWidth:1400, margin:'0 auto' }}>
      {news.length === 0 ? (
        <div style={{ textAlign:'center', padding:60, color:'#888', fontSize:13, fontStyle:'italic' }}>{t(locale,'actualites.empty')}</div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 }}>
          {news.map(n => (
            <div key={n.id} className="hcard">
              {n.photo
                ? <img src={n.photo} alt={n.titre} style={{ width:'100%', height:200, objectFit:'cover' }}/>
                : <div style={{ width:'100%', height:200, background:'#f0ece4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36 }}>📰</div>
              }
              <div style={{ padding:'16px 18px' }}>
                <div style={{ fontSize:9, letterSpacing:'.12em', textTransform:'uppercase', color:'#B8943A', marginBottom:6 }}>
                  {n.created_at ? new Date(n.created_at).toLocaleDateString('fr', { day:'numeric', month:'long', year:'numeric' }) : ''}
                </div>
                <div style={{ fontFamily:'Noto Serif,serif', fontSize:16, color:'#13201A', marginBottom:8, lineHeight:1.3 }}>{n.titre}</div>
                {n.extrait && <p style={{ fontSize:12, color:'#6b6b6b', lineHeight:1.7 }}>{n.extrait}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
