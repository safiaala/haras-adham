'use client'
import { useEffect, useState } from 'react'
import { use } from 'react'
import { supabase } from '@/lib/supabase'
import { Etalon } from '@/lib/types'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'
import Link from 'next/link'
import EtalonCaracterisation from '@/components/EtalonCaracterisation'

export default function EtalonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [etalon, setEtalon] = useState<Etalon | null>(null)
  const [loading, setLoading] = useState(true)
  const [photoIdx, setPhotoIdx] = useState(0)
  const locale = useLocale()

  useEffect(() => {
    supabase.from('etalons').select('*').eq('id', id).single()
      .then(({ data }) => { setEtalon(data); setLoading(false) })
  }, [id])

  if (loading) {
    return <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', color:'#888', fontSize:13, fontStyle:'italic' }}>Chargement…</div>
  }

  if (!etalon) {
    return (
      <div style={{ minHeight:'60vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16 }}>
        <div style={{ fontSize:48 }}>🐴</div>
        <p style={{ color:'#888', fontSize:14 }}>Étalon introuvable.</p>
        <Link href="/etalons" className="btn-dark">← Retour aux étalons</Link>
      </div>
    )
  }

  // Toutes les photos : galerie (photos[]) + photo ancienne si pas encore migré
  const allPhotos = [...(etalon.photos || []), ...(etalon.photo && !(etalon.photos||[]).includes(etalon.photo) ? [etalon.photo] : [])].filter(Boolean) as string[]
  const heroPhoto = allPhotos[0]

  return (
    <>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div style={{ position:'relative', height:'65vh', minHeight:400, overflow:'hidden', background:'#13201A' }}>
        {heroPhoto
          ? <img src={heroPhoto} alt={etalon.nom} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }}/>
          : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:80, opacity:.3 }}>🐴</div>
        }
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(19,32,26,.92) 0%, rgba(19,32,26,.4) 50%, transparent 100%)' }}/>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'40px 60px' }}>
          <Link href="/etalons" style={{ fontSize:10, color:'rgba(255,255,255,.5)', letterSpacing:'.12em', textTransform:'uppercase', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:6, marginBottom:16 }}>
            ← {t(locale,'nav.etalons')}
          </Link>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:12 }}>
            {etalon.race && <span className="tag tag-amber">{etalon.race}</span>}
            {etalon.robe && <span className="tag tag-blue">{etalon.robe}</span>}
            {etalon.methodes?.map(m => <span key={m} className="tag" style={{ background:'rgba(255,255,255,.12)', color:'#fff' }}>{m}</span>)}
          </div>
          <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:'clamp(2rem,5vw,3.6rem)', color:'#fff', fontStyle:'italic', lineHeight:1.05, marginBottom:8 }}>
            {etalon.nom}
          </h1>
          {etalon.annee_naissance && (
            <p style={{ color:'rgba(255,255,255,.6)', fontSize:13, letterSpacing:'.06em' }}>
              {t(locale,'etalons.naissance')} {etalon.annee_naissance}
              {etalon.taille_cm ? ` · ${etalon.taille_cm / 100 > 2 ? etalon.taille_cm + ' cm' : etalon.taille_cm + ' cm'}` : ''}
            </p>
          )}
        </div>
      </div>

      {/* ── CORPS ─────────────────────────────────────────────────────── */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'60px 60px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'340px 1fr', gap:50, alignItems:'start' }}>

          {/* Colonne gauche — fiche technique */}
          <div>
            <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', padding:'28px 24px', marginBottom:24 }}>
              <div style={{ fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'#B8943A', marginBottom:18 }}>
                {t(locale,'etalons.fiche')}
              </div>
              {[
                [t(locale,'etalons.race'),      etalon.race],
                [t(locale,'etalons.robe'),      etalon.robe],
                [t(locale,'etalons.taille'),    etalon.taille_cm ? `${etalon.taille_cm} cm` : null],
                [t(locale,'etalons.naissance'), etalon.annee_naissance ? String(etalon.annee_naissance) : null],
                [t(locale,'etalons.eleveur'),   etalon.eleveur],
                [t(locale,'etalons.studbook'),  etalon.studbook],
                [t(locale,'etalons.methodes'),  etalon.methodes?.length ? etalon.methodes.join(', ') : null],
              ].filter(([,v]) => v).map(([k, v]) => (
                <div key={k as string} style={{ display:'flex', gap:12, borderBottom:'.5px solid rgba(195,200,195,.2)', padding:'9px 0', fontSize:11 }}>
                  <span style={{ color:'#aaa', minWidth:110, flexShrink:0 }}>{k as string}</span>
                  <span style={{ fontWeight:500, color:'#13201A' }}>{v as string}</span>
                </div>
              ))}
            </div>

            {/* Tarif + Contact */}
            {etalon.tarif_saillie && (
              <div style={{ background:'#13201A', padding:'24px', marginBottom:16 }}>
                <div style={{ fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(255,255,255,.45)', marginBottom:10 }}>
                  {t(locale,'etalons.saillie')}
                </div>
                <div style={{ fontFamily:'Noto Serif,serif', fontSize:'1.6rem', color:'#B8943A', marginBottom:16 }}>
                  {etalon.tarif_saillie}
                </div>
                <Link href="/contact" className="btn-gold" style={{ display:'block', textAlign:'center', textDecoration:'none', width:'100%' }}>
                  {t(locale,'btn.contact')}
                </Link>
              </div>
            )}
            {!etalon.tarif_saillie && (
              <Link href="/contact" className="btn-dark" style={{ display:'block', textAlign:'center', textDecoration:'none' }}>
                {t(locale,'btn.contact')}
              </Link>
            )}

            {/* Vidéo */}
            {etalon.video_url && (
              <a href={etalon.video_url} target="_blank" rel="noopener noreferrer"
                style={{ display:'flex', alignItems:'center', gap:10, marginTop:14, padding:'12px 16px', border:'.5px solid rgba(184,148,58,.35)', textDecoration:'none' }}>
                <span style={{ fontSize:20 }}>▶</span>
                <span style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A' }}>{t(locale,'chevaux.video')}</span>
              </a>
            )}
          </div>

          {/* Colonne droite — contenu */}
          <div style={{ display:'flex', flexDirection:'column', gap:36 }}>

            {/* Description */}
            {etalon.description && (
              <div>
                <div style={{ fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'#B8943A', marginBottom:14 }}>
                  {t(locale,'etalons.desc_label')}
                </div>
                <p style={{ fontSize:14, color:'#6b6b6b', lineHeight:1.9, whiteSpace:'pre-wrap' }}>
                  {etalon.description}
                </p>
              </div>
            )}

            {/* Pedigree / Origines */}
            {etalon.pedigree && (
              <div>
                <div style={{ width:40, height:2, background:'#B8943A', marginBottom:14 }}/>
                <div style={{ fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'#B8943A', marginBottom:14 }}>
                  {t(locale,'etalons.origines')}
                </div>
                <p style={{ fontSize:13, color:'#6b6b6b', lineHeight:1.85, whiteSpace:'pre-wrap', borderLeft:'2px solid rgba(184,148,58,.3)', paddingLeft:16 }}>
                  {etalon.pedigree}
                </p>
              </div>
            )}

            {/* Palmarès */}
            {etalon.palmares && (
              <div>
                <div style={{ width:40, height:2, background:'#B8943A', marginBottom:14 }}/>
                <div style={{ fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'#B8943A', marginBottom:14 }}>
                  {t(locale,'etalons.palmares')}
                </div>
                <div style={{ background:'#f0ece4', padding:'20px 22px' }}>
                  <p style={{ fontSize:13, color:'#5a5a5a', lineHeight:1.85, whiteSpace:'pre-wrap', margin:0 }}>
                    {etalon.palmares}
                  </p>
                </div>
              </div>
            )}

            {/* Production */}
            {etalon.production && (
              <div>
                <div style={{ width:40, height:2, background:'#B8943A', marginBottom:14 }}/>
                <div style={{ fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'#B8943A', marginBottom:14 }}>
                  {t(locale,'etalons.production')}
                </div>
                <p style={{ fontSize:13, color:'#6b6b6b', lineHeight:1.85, whiteSpace:'pre-wrap' }}>
                  {etalon.production}
                </p>
              </div>
            )}

            {/* Caractérisation PAX */}
            {etalon.caracterisation && Object.keys(etalon.caracterisation).length > 0 && (
              <EtalonCaracterisation data={etalon.caracterisation}/>
            )}
          </div>
        </div>

        {/* ── GALERIE ─────────────────────────────────────────────────── */}
        {allPhotos.length > 1 && (
          <div style={{ marginTop:60 }}>
            <div style={{ width:40, height:2, background:'#B8943A', marginBottom:14 }}/>
            <div style={{ fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'#B8943A', marginBottom:22 }}>
              {t(locale,'etalons.galerie')}
            </div>

            {/* Viewer principal */}
            <div style={{ position:'relative', background:'#13201A', marginBottom:10, overflow:'hidden' }}>
              <div style={{ paddingTop:'56.25%' }}/>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={allPhotos[photoIdx]} alt={etalon.nom} style={{ width:'100%', height:'100%', objectFit:'contain' }}/>
              </div>
              {allPhotos.length > 1 && (
                <>
                  <button onClick={() => setPhotoIdx(i => (i - 1 + allPhotos.length) % allPhotos.length)}
                    style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,.45)', border:'none', color:'#fff', fontSize:20, cursor:'pointer', width:40, height:40, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>‹</button>
                  <button onClick={() => setPhotoIdx(i => (i + 1) % allPhotos.length)}
                    style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,.45)', border:'none', color:'#fff', fontSize:20, cursor:'pointer', width:40, height:40, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>›</button>
                </>
              )}
            </div>

            {/* Miniatures */}
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {allPhotos.map((p, i) => (
                <button key={i} onClick={() => setPhotoIdx(i)}
                  style={{ padding:0, border: i === photoIdx ? '2px solid #B8943A' : '2px solid transparent', cursor:'pointer', background:'none', borderRadius:2, overflow:'hidden', flexShrink:0 }}>
                  <img src={p} alt="" style={{ width:80, height:60, objectFit:'cover', objectPosition:'top', display:'block' }}/>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

    </>
  )
}
