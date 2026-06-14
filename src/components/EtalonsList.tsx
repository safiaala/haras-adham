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
        <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
          {etalons.map(e => (
            <Link key={e.id} href={`/etalons/${e.id}`}
              style={{ display:'grid', gridTemplateColumns:'320px 1fr', border:'.5px solid rgba(195,200,195,.3)', background:'#fff', cursor:'pointer', textDecoration:'none', color:'inherit', overflow:'hidden' }}>
              {/* Image */}
              <div style={{ position:'relative', height:260, flexShrink:0 }}>
                {(e.photos?.[0] || e.photo)
                  ? <img src={e.photos?.[0] || e.photo} alt={e.nom} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }}/>
                  : <div style={{ width:'100%', height:'100%', background:'#f0ece4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:50 }}>🐴</div>
                }
                {e.statut && (
                  <div style={{ position:'absolute', top:12, left:12 }}>
                    <span className={`tag ${{ disponible:'tag-green', vendu:'tag-red', pension:'tag-blue', reproduction:'tag-purple' }[e.statut] || 'tag-green'}`}>
                      {t(locale, `statut.${e.statut}`) || e.statut}
                    </span>
                  </div>
                )}
              </div>

              {/* Infos */}
              <div style={{ padding:'24px 28px', display:'flex', flexDirection:'column', justifyContent:'space-between', borderLeft:'.5px solid rgba(195,200,195,.2)' }}>
                <div>
                  <div style={{ fontFamily:'Noto Serif,serif', fontSize:22, color:'#13201A', marginBottom:4 }}>{e.nom}</div>
                  {e.robe && <div style={{ fontSize:10, color:'#B8943A', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10 }}>{e.robe}</div>}

                  <div style={{ display:'flex', flexDirection:'column', gap:0, marginBottom:14 }}>
                    {[
                      [t(locale,'etalons.race'),      e.race],
                      [t(locale,'etalons.naissance'), e.annee_naissance ? String(e.annee_naissance) : null],
                      [t(locale,'etalons.taille'),    e.taille_cm ? `${e.taille_cm} cm` : null],
                      [t(locale,'etalons.pere'),      e.nom_pere],
                      [t(locale,'etalons.mere'),      e.nom_mere],
                      [t(locale,'etalons.eleveur'),   e.eleveur],
                      [t(locale,'etalons.methodes'),  e.methodes?.length ? e.methodes.join(', ') : null],
                    ].filter(([,v]) => v).map(([k, v]) => (
                      <div key={k as string} style={{ display:'flex', gap:12, borderBottom:'.5px solid rgba(195,200,195,.15)', padding:'6px 0', fontSize:11 }}>
                        <span style={{ color:'#aaa', minWidth:120, flexShrink:0 }}>{k as string}</span>
                        <span style={{ fontWeight:500, color:'#13201A' }}>{v as string}</span>
                      </div>
                    ))}
                  </div>

                  {e.description && (
                    <p style={{ fontSize:12, color:'#6b6b6b', lineHeight:1.7, marginBottom:10,
                      display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                      {e.description}
                    </p>
                  )}
                </div>

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:12, paddingTop:12, borderTop:'.5px solid rgba(195,200,195,.25)' }}>
                  {e.tarif_saillie
                    ? <div>
                        <div style={{ fontSize:9, color:'#888', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:2 }}>{t(locale,'etalons.saillie')}</div>
                        <div style={{ fontSize:14, color:'#B8943A', fontWeight:600 }}>{e.tarif_saillie}</div>
                      </div>
                    : <div/>
                  }
                  <span style={{ fontSize:10, color:'#B8943A', letterSpacing:'.06em', textTransform:'uppercase' }}>
                    🔍 {t(locale,'etalons.voir_fiche')}
                  </span>
                </div>
              </div>
            </Link>
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
