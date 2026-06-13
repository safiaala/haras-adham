'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Etalon } from '@/lib/types'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'
import Link from 'next/link'

type Cfg = Record<string, string>

export default function EtalonsList() {
  const [etalons, setEtalons] = useState<Etalon[]>([])
  const [cfg, setCfg] = useState<Cfg>({})
  const locale = useLocale()

  useEffect(() => {
    supabase.from('etalons').select('*').eq('actif', true).order('created_at', { ascending:false })
      .then(({ data }) => setEtalons(data || []))
    supabase.from('config').select('*').then(({ data }) => {
      if (data) {
        const map: Cfg = {}
        data.forEach(r => { map[r.cle] = r.valeur })
        setCfg(map)
      }
    })
  }, [])

  return (
    <section style={{ padding:'40px 60px', maxWidth:1400, margin:'0 auto' }}>
      {etalons.length === 0 ? (
        <div style={{ textAlign:'center', padding:60, color:'#888', fontSize:13, fontStyle:'italic' }}>{t(locale,'etalons.empty')}</div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:22 }}>
          {etalons.map(e => (
            <div key={e.id} style={{ border:'.5px solid rgba(195,200,195,.3)', overflow:'hidden', background:'#fff' }}>
              {e.photo
                ? <img src={e.photo} alt={e.nom} style={{ width:'100%', height:260, objectFit:'cover' }}/>
                : <div style={{ width:'100%', height:260, background:'#f0ece4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:50 }}>🐴</div>
              }
              <div style={{ padding:'18px 20px' }}>
                <div style={{ fontFamily:'Noto Serif,serif', fontSize:20, color:'#13201A', marginBottom:4 }}>{e.nom}</div>
                {e.robe && <div style={{ fontSize:10, color:'#B8943A', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8 }}>{e.robe}</div>}
                {e.annee_naissance && <div style={{ fontSize:11, color:'#888', marginBottom:6 }}>{e.annee_naissance} · {e.race}</div>}
                {e.description && <p style={{ fontSize:12, color:'#6b6b6b', lineHeight:1.7, marginBottom:10 }}>{e.description}</p>}
                {e.palmares && (
                  <div style={{ background:'#f0ece4', padding:'8px 10px', marginBottom:10, borderLeft:'2px solid #B8943A' }}>
                    <div style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'.1em', color:'#B8943A', marginBottom:3 }}>Palmarès</div>
                    <div style={{ fontSize:11, color:'#6b6b6b' }}>{e.palmares}</div>
                  </div>
                )}
                {e.tarif_saillie && (
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10, paddingTop:10, borderTop:'.5px solid rgba(195,200,195,.3)' }}>
                    <span style={{ fontSize:10, color:'#888', textTransform:'uppercase', letterSpacing:'.08em' }}>{t(locale,'etalons.saillie')}</span>
                    <span style={{ fontSize:13, color:'#B8943A', fontWeight:600 }}>{e.tarif_saillie}</span>
                  </div>
                )}
                {e.methodes && e.methodes.length > 0 && (
                  <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginTop:8 }}>
                    {e.methodes.map(m => <span key={m} className="tag tag-blue">{m}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ background:'#f0ece4', padding:'50px 60px', marginTop:50 }}>
        <div style={{ maxWidth:600 }}>
          {cfg.etalons_conseil_badge && (
            <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:8 }}>{cfg.etalons_conseil_badge}</span>
          )}
          <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.9rem', color:'#13201A', marginBottom:14 }}>
            {cfg.etalons_conseil_titre || t(locale,'etalons.conseil')}
          </h2>
          <ul style={{ listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:8, marginBottom:20 }}>
            {[cfg.etalons_conseil_item1, cfg.etalons_conseil_item2, cfg.etalons_conseil_item3].filter(Boolean).map(item => (
              <li key={item} style={{ display:'flex', gap:9, alignItems:'start', fontSize:12, color:'#6b6b6b' }}>
                <span style={{ color:'#B8943A', flexShrink:0 }}>✓</span>{item}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn-dark">{cfg.etalons_conseil_cta || t(locale,'etalons.rdv')}</Link>
        </div>
      </div>
    </section>
  )
}
