'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'
import { Locale } from '@/lib/locale'

interface Article {
  id: string
  titre: string
  titre_en?: string; titre_es?: string; titre_ar?: string
  extrait?: string
  extrait_en?: string; extrait_es?: string; extrait_ar?: string
  contenu_copie?: string
  contenu_copie_en?: string; contenu_copie_es?: string; contenu_copie_ar?: string
  url_source?: string
  photo?: string
  auteur?: string
  publie?: boolean
  created_at?: string
}

export default function ActualitesList() {
  const [news, setNews] = useState<Article[]>([])
  const [selected, setSelected] = useState<Article|null>(null)
  const locale = useLocale() as Locale

  useEffect(() => {
    supabase.from('actualites').select('*').eq('publie', true).order('created_at', { ascending:false })
      .then(({ data }) => setNews(data || []))
  }, [])

  function getTitre(n: Article) {
    if (locale === 'en' && n.titre_en) return n.titre_en
    if (locale === 'es' && n.titre_es) return n.titre_es
    if (locale === 'ar' && n.titre_ar) return n.titre_ar
    return n.titre
  }

  function getExtrait(n: Article) {
    if (locale === 'en' && n.extrait_en) return n.extrait_en
    if (locale === 'es' && n.extrait_es) return n.extrait_es
    if (locale === 'ar' && n.extrait_ar) return n.extrait_ar
    return n.extrait
  }

  function getContenu(n: Article) {
    if (locale === 'en' && n.contenu_copie_en) return n.contenu_copie_en
    if (locale === 'es' && n.contenu_copie_es) return n.contenu_copie_es
    if (locale === 'ar' && n.contenu_copie_ar) return n.contenu_copie_ar
    return n.contenu_copie
  }

  const readLabel = locale === 'en' ? 'Read article →' : locale === 'es' ? 'Leer artículo →' : locale === 'ar' ? 'قراءة المقال →' : 'Lire l\'article →'
  const sourceLabel = locale === 'en' ? 'Source' : locale === 'es' ? 'Fuente' : locale === 'ar' ? 'المصدر' : 'Source'
  const closeLabel = locale === 'en' ? 'Close' : locale === 'es' ? 'Cerrar' : locale === 'ar' ? 'إغلاق' : 'Fermer'

  return (
    <section style={{ padding:'40px 60px', maxWidth:1400, margin:'0 auto' }}>
      {news.length === 0 ? (
        <div style={{ textAlign:'center', padding:60, color:'#888', fontSize:13, fontStyle:'italic' }}>{t(locale,'actualites.empty')}</div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {news.map((n, i) => (
            <div key={n.id} style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:0, borderBottom:'.5px solid rgba(195,200,195,.25)', background: i%2===0 ? '#fff' : '#fbf9f5' }}>
              {/* DATE + IMAGE */}
              <div style={{ padding:'24px 20px', borderRight:'.5px solid rgba(195,200,195,.2)' }}>
                <div style={{ fontSize:9, letterSpacing:'.15em', textTransform:'uppercase', color:'#B8943A', marginBottom:8 }}>
                  {n.created_at ? new Date(n.created_at).toLocaleDateString(locale === 'ar' ? 'ar' : locale === 'es' ? 'es' : locale === 'en' ? 'en' : 'fr', { day:'numeric', month:'long', year:'numeric' }) : ''}
                </div>
                {n.photo && (
                  <img src={n.photo} alt={getTitre(n)} style={{ width:'100%', height:160, objectFit:'cover', marginBottom:8 }}/>
                )}
                {n.auteur && (
                  <div style={{ fontSize:10, color:'#888', fontStyle:'italic' }}>{n.auteur}</div>
                )}
              </div>

              {/* CONTENU */}
              <div style={{ padding:'24px 28px' }}>
                <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:18, color:'#13201A', marginBottom:10, lineHeight:1.3 }}>{getTitre(n)}</h2>
                {getExtrait(n) && (
                  <p style={{ fontSize:13, color:'#6b6b6b', lineHeight:1.8, marginBottom:14 }}>{getExtrait(n)}</p>
                )}
                <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
                  {n.url_source && (
                    <a href={n.url_source} target="_blank" rel="noreferrer"
                      style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'#fff', background:'#B8943A', padding:'7px 14px', textDecoration:'none', fontFamily:'Plus Jakarta Sans,sans-serif', display:'inline-flex', alignItems:'center', gap:6 }}>
                      {readLabel}
                      <span style={{ fontFamily:'Material Symbols Outlined', fontSize:14 }}>open_in_new</span>
                    </a>
                  )}
                  {getContenu(n) && (
                    <button onClick={() => setSelected(n)}
                      style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'#13201A', border:'.5px solid rgba(19,32,26,.3)', padding:'7px 14px', background:'transparent', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>
                      {n.url_source ? (locale === 'en' ? 'Archived version' : locale === 'es' ? 'Versión archivada' : locale === 'ar' ? 'النسخة المحفوظة' : 'Version archivée') : readLabel.replace('→','')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL CONTENU COPIÉ */}
      {selected && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.6)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div style={{ background:'#fbf9f5', maxWidth:720, width:'100%', maxHeight:'85vh', overflowY:'auto', padding:36 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:20 }}>
              <div>
                {selected.auteur && <div style={{ fontSize:10, color:'#B8943A', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:6 }}>{sourceLabel} : {selected.auteur}</div>}
                <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:22, color:'#13201A', lineHeight:1.3 }}>{getTitre(selected)}</h2>
              </div>
              <button onClick={() => setSelected(null)} style={{ background:'transparent', border:'none', fontSize:24, cursor:'pointer', color:'#888', flexShrink:0, marginLeft:16 }}>✕</button>
            </div>
            {selected.photo && <img src={selected.photo} alt="" style={{ width:'100%', height:260, objectFit:'cover', marginBottom:20 }}/>}
            <p style={{ fontSize:14, color:'#6b6b6b', lineHeight:1.9, whiteSpace:'pre-wrap' }}>{getContenu(selected)}</p>
            <div style={{ marginTop:20, paddingTop:16, borderTop:'.5px solid rgba(195,200,195,.3)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              {selected.url_source && (
                <a href={selected.url_source} target="_blank" rel="noreferrer" style={{ fontSize:11, color:'#B8943A', textDecoration:'none' }}>
                  {sourceLabel} original →
                </a>
              )}
              <button onClick={() => setSelected(null)} className="btn-outline" style={{ fontSize:10 }}>{closeLabel}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
