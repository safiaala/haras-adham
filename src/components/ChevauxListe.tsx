'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Cheval } from '@/lib/types'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'

const FILTRES = ['all','male','jument','poulain','pouliche'] as const
type Filtre = typeof FILTRES[number]

const FILTRE_KEY: Record<Filtre, string> = {
  all:      'chevaux.f_all',
  male:     'chevaux.f_male',
  jument:   'chevaux.f_jument',
  poulain:  'chevaux.f_poulain',
  pouliche: 'chevaux.f_pouliche',
}

const statutColor: Record<string,string> = {
  disponible:'tag-green', vendu:'tag-red', pension:'tag-blue', reproduction:'tag-purple'
}

function matchFiltre(c: Cheval, filtre: Filtre): boolean {
  const sexe = c.sexe || ''
  const isPoulain = sexe === 'Poulain' || sexe === 'Pouliche'
  if (filtre === 'all') return true
  if (filtre === 'male')     return (sexe === 'Étalon' || sexe === 'Hongre' || sexe === 'Cheval') && !isPoulain
  if (filtre === 'jument')   return sexe === 'Jument' && !isPoulain
  if (filtre === 'poulain')  return sexe === 'Poulain'
  if (filtre === 'pouliche') return sexe === 'Pouliche'
  return true
}

function age(yn?: number) {
  if (!yn) return null
  const a = new Date().getFullYear() - yn
  return a > 0 ? a : null
}

export default function ChevauxListe() {
  const [chevaux, setChevaux]     = useState<Cheval[]>([])
  const [filtre, setFiltre]       = useState<Filtre>('all')
  const [search, setSearch]       = useState('')
  const [selected, setSelected]   = useState<Cheval | null>(null)
  const locale = useLocale()

  useEffect(() => {
    supabase.from('chevaux').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setChevaux(data || []))
  }, [])

  const filtered = chevaux.filter(c => {
    const matchF = matchFiltre(c, filtre)
    const matchS = !search || c.nom.toLowerCase().includes(search.toLowerCase())
    return matchF && matchS
  })

  return (
    <section style={{ padding:'40px 60px', maxWidth:1400, margin:'0 auto' }}>

      {/* Barre de recherche + filtres */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:12, alignItems:'center', marginBottom:28 }}>
        <input
          type="text"
          placeholder={t(locale,'chevaux.search')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ background:'transparent', borderBottom:'.5px solid rgba(195,200,195,.5)', padding:'8px 8px', fontSize:12, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', minWidth:200 }}
        />
        <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
          {FILTRES.map(f => (
            <button key={f} onClick={() => setFiltre(f)}
              style={{ fontSize:10, letterSpacing:'.06em', padding:'5px 13px',
                border:`.5px solid ${filtre===f ? '#B8943A' : 'rgba(195,200,195,.45)'}`,
                background: filtre===f ? 'rgba(184,148,58,.07)' : 'transparent',
                color: filtre===f ? '#B8943A' : '#6b6b6b',
                cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif', borderRadius:1 }}>
              {t(locale, FILTRE_KEY[f])}
            </button>
          ))}
        </div>
      </div>

      {/* Grille */}
      {filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:60, color:'#888', fontSize:13, fontStyle:'italic' }}>
          {chevaux.length === 0 ? t(locale,'chevaux.empty') : t(locale,'chevaux.none')}
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))', gap:14 }}>
          {filtered.map(c => (
            <div key={c.id} className="hcard" onClick={() => setSelected(c)}
              style={{ cursor:'pointer', position:'relative' }}>
              {c.photos?.[0]
                ? <img src={c.photos[0]} alt={c.nom} style={{ width:'100%', height:190, objectFit:'cover' }}/>
                : <div style={{ width:'100%', height:190, background:'#f0ece4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:40 }}>🐴</div>
              }
              <div style={{ padding:'12px 14px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
                  <div style={{ fontFamily:'Noto Serif,serif', fontSize:15, color:'#13201A' }}>{c.nom}</div>
                  {c.statut && <span className={`tag ${statutColor[c.statut]||'tag-green'}`} style={{ flexShrink:0, marginLeft:6 }}>{c.statut}</span>}
                </div>
                <div style={{ fontSize:10, color:'#888', marginBottom:6, textTransform:'uppercase', letterSpacing:'.06em' }}>
                  {c.race}{c.race && c.annee_naissance ? ' · ' : ''}{c.annee_naissance ?? ''}
                  {(c.race || c.annee_naissance) && c.sexe ? ' · ' : ''}{c.sexe ?? ''}
                </div>
                {c.taille_cm && (
                  <div style={{ fontSize:10, color:'#888', marginBottom:4 }}>
                    {t(locale,'chevaux.taille')} : {c.taille_cm} cm
                  </div>
                )}
                {(c.nom_pere || c.nom_mere) && (
                  <div style={{ fontSize:10, color:'#888', marginBottom:6 }}>
                    {c.nom_pere && <span style={{ color:'#185FA5' }}>♂ {c.nom_pere}</span>}
                    {c.nom_pere && c.nom_mere && <span> · </span>}
                    {c.nom_mere && <span style={{ color:'#993556' }}>♀ {c.nom_mere}</span>}
                  </div>
                )}
                {c.discipline && <span className="tag tag-blue" style={{ fontSize:9 }}>{c.discipline.toUpperCase()}</span>}
                <div style={{ marginTop:9, fontSize:10, color:'#B8943A', letterSpacing:'.06em', textTransform:'uppercase' }}>
                  🔍 {t(locale,'chevaux.voir_fiche')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal zoom */}
      {selected && (
        <div onClick={() => setSelected(null)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.55)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background:'#fbf9f5', width:'100%', maxWidth:660, maxHeight:'90vh', overflowY:'auto', position:'relative' }}>

            {/* Photo */}
            <div style={{ width:'100%', height:300, background:'#13201A', overflow:'hidden', position:'relative', flexShrink:0 }}>
              {selected.photos?.[0]
                ? <img src={selected.photos[0]} alt={selected.nom} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:72 }}>🐴</div>
              }
              <button onClick={() => setSelected(null)}
                style={{ position:'absolute', top:12, right:14, background:'rgba(0,0,0,.5)', border:'none', color:'#fff', fontSize:20, cursor:'pointer', width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                ✕
              </button>
              {selected.statut && (
                <div style={{ position:'absolute', bottom:14, left:14 }}>
                  <span className={`tag ${statutColor[selected.statut]||'tag-green'}`} style={{ fontSize:10, padding:'3px 10px' }}>{selected.statut}</span>
                </div>
              )}
            </div>

            {/* Contenu */}
            <div style={{ padding:'22px 26px 24px' }}>
              <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.6rem', color:'#13201A', marginBottom:16 }}>{selected.nom}</h2>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 }}>
                {[
                  [t(locale,'chevaux.race'),      selected.race],
                  [t(locale,'chevaux.naissance'),  selected.annee_naissance ? `${selected.annee_naissance}${age(selected.annee_naissance) ? ' ('+age(selected.annee_naissance)+' ans)' : ''}` : null],
                  [t(locale,'chevaux.taille'),     selected.taille_cm ? `${selected.taille_cm} cm` : null],
                  [t(locale,'chevaux.sexe'),       selected.sexe],
                  [t(locale,'chevaux.pere'),       selected.nom_pere],
                  [t(locale,'chevaux.mere'),       selected.nom_mere],
                  [t(locale,'chevaux.discipline'), selected.discipline],
                  [t(locale,'chevaux.pedigree'),   selected.pedigree],
                ].filter(([,v]) => v).map(([k, v]) => (
                  <div key={k as string} style={{ display:'flex', justifyContent:'space-between', borderBottom:'.5px solid rgba(195,200,195,.22)', padding:'7px 0', fontSize:11 }}>
                    <span style={{ color:'#888' }}>{k as string}</span>
                    <span style={{ fontWeight:500, textAlign:'right', maxWidth:'55%' }}>{v as string}</span>
                  </div>
                ))}
              </div>

              {selected.description && (
                <p style={{ marginTop:14, paddingTop:14, borderTop:'.5px solid rgba(195,200,195,.3)', fontSize:12, color:'#6b6b6b', lineHeight:1.75 }}>
                  {selected.description}
                </p>
              )}
              {selected.prix && (
                <div style={{ marginTop:10, fontSize:13, color:'#B8943A', fontWeight:600 }}>{t(locale,'chevaux.prix')} : {selected.prix}</div>
              )}

              <div style={{ display:'flex', gap:9, marginTop:18 }}>
                <a href="/contact"
                  style={{ flex:1, background:'#B8943A', color:'#fff', border:'none', padding:'11px 20px', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif', textAlign:'center', textDecoration:'none', display:'block' }}>
                  {t(locale,'btn.contact')}
                </a>
                <button onClick={() => setSelected(null)}
                  style={{ padding:'10px 22px', border:'.5px solid rgba(19,32,26,.3)', background:'transparent', color:'#13201A', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>
                  {t(locale,'chevaux.fermer')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
