'use client'
import { useEffect, useState } from 'react'
import AdminHeader from '@/components/AdminHeader'
import { supabase } from '@/lib/supabase'
import { uploadImage } from '@/lib/cloudinary'

type Locale = 'fr' | 'en' | 'es' | 'ar'
const LOCALES: { code: Locale; flag: string; label: string }[] = [
  { code:'fr', flag:'🇫🇷', label:'FR' },
  { code:'en', flag:'🇬🇧', label:'EN' },
  { code:'es', flag:'🇪🇸', label:'ES' },
  { code:'ar', flag:'🇸🇦', label:'AR' },
]

interface Article {
  id: string
  titre: string
  titre_en?: string; titre_es?: string; titre_ar?: string
  extrait?: string
  extrait_en?: string; extrait_es?: string; extrait_ar?: string
  contenu?: string
  contenu_copie?: string
  contenu_copie_en?: string; contenu_copie_es?: string; contenu_copie_ar?: string
  url_source?: string
  photo?: string
  auteur?: string
  publie?: boolean
  created_at?: string
}

const empty = (): Partial<Article> => ({
  titre:'', titre_en:'', titre_es:'', titre_ar:'',
  extrait:'', extrait_en:'', extrait_es:'', extrait_ar:'',
  contenu_copie:'', contenu_copie_en:'', contenu_copie_es:'', contenu_copie_ar:'',
  url_source:'', photo:'', auteur:'', publie:true
})

export default function AdminActualitesPage() {
  const [list, setList] = useState<Article[]>([])
  const [form, setForm] = useState<Partial<Article>>(empty())
  const [editing, setEditing] = useState<string|null>(null)
  const [open, setOpen] = useState(false)
  const [locale, setLocale] = useState<Locale>('fr')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  async function load() {
    const { data } = await supabase.from('actualites').select('*').order('created_at', { ascending:false })
    setList(data || [])
  }
  useEffect(() => { load() }, [])

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return
    setUploading(true)
    try {
      const url = await uploadImage(e.target.files[0])
      setForm(f => ({ ...f, photo: url }))
    } finally { setUploading(false) }
  }

  async function handleSave() {
    if (!form.titre) return
    setSaving(true)
    try {
      if (editing) { await supabase.from('actualites').update(form).eq('id', editing) }
      else { await supabase.from('actualites').insert(form) }
      setOpen(false); await load()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette actualité ?')) return
    await supabase.from('actualites').delete().eq('id', id)
    await load()
  }

  const f = (key: string) => (form as Record<string,string>)[key] ?? ''
  const sf = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }))

  const inp = (label: string, key: string) => (
    <div key={key}>
      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{label}</label>
      <input value={f(key)} onChange={e => sf(key, e.target.value)}
        style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none' }}/>
    </div>
  )

  const ta = (label: string, key: string, rows=3) => (
    <div key={key}>
      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{label}</label>
      <textarea rows={rows} value={f(key)} onChange={e => sf(key, e.target.value)}
        style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', resize:'vertical' }}/>
    </div>
  )

  const suffix = locale === 'fr' ? '' : `_${locale}`

  return (
    <div style={{ minHeight:'100vh', background:'#f5f3ef', padding:40 }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <AdminHeader title="Actualités" action={<button onClick={() => setOpen(true)} className="btn-gold">+ Ajouter</button>}/>

        <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', overflow:'hidden' }}>
          {list.length === 0 ? (
            <div style={{ textAlign:'center', padding:40, color:'#888', fontSize:13, fontStyle:'italic' }}>Aucune actualité.</div>
          ) : (
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead>
                <tr style={{ background:'#f5f3ef' }}>
                  {['Photo','Titre','Date','Source','Publiée','Actions'].map(h => (
                    <th key={h} style={{ padding:'10px 12px', textAlign:'left', fontSize:9, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', borderBottom:'.5px solid rgba(195,200,195,.4)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map(n => (
                  <tr key={n.id} style={{ borderBottom:'.5px solid rgba(195,200,195,.2)' }}>
                    <td style={{ padding:'10px 12px' }}>
                      {n.photo ? <img src={n.photo} style={{ width:48, height:48, objectFit:'cover' }} alt=""/> : <div style={{ width:48, height:48, background:'#f0ece4', display:'flex', alignItems:'center', justifyContent:'center' }}>📰</div>}
                    </td>
                    <td style={{ padding:'10px 12px', fontWeight:500, maxWidth:200 }}>{n.titre}</td>
                    <td style={{ padding:'10px 12px', color:'#888', whiteSpace:'nowrap' }}>{n.created_at ? new Date(n.created_at).toLocaleDateString('fr') : '—'}</td>
                    <td style={{ padding:'10px 12px' }}>
                      {n.url_source ? <a href={n.url_source} target="_blank" rel="noreferrer" style={{ color:'#B8943A', fontSize:10 }}>Voir →</a> : <span style={{ color:'#ccc', fontSize:10 }}>—</span>}
                    </td>
                    <td style={{ padding:'10px 12px' }}><span className={`tag ${n.publie ? 'tag-green' : 'tag-red'}`}>{n.publie ? 'Oui' : 'Non'}</span></td>
                    <td style={{ padding:'10px 12px' }}>
                      <div style={{ display:'flex', gap:6 }}>
                        <button onClick={() => { setForm(n); setEditing(n.id); setOpen(true) }} style={{ fontSize:10, padding:'4px 10px', border:'.5px solid rgba(195,200,195,.5)', background:'transparent', cursor:'pointer' }}>Modifier</button>
                        <button onClick={() => handleDelete(n.id)} style={{ fontSize:10, padding:'4px 10px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer' }}>Supprimer</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* MODAL */}
        {open && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
            <div style={{ background:'#fbf9f5', padding:28, width:'100%', maxWidth:620, maxHeight:'90vh', overflowY:'auto' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:18, color:'#13201A' }}>{editing ? 'Modifier' : 'Ajouter'} une actualité</h2>
                <button onClick={() => setOpen(false)} style={{ background:'transparent', border:'none', fontSize:22, cursor:'pointer', color:'#888' }}>✕</button>
              </div>

              {/* ONGLETS LANGUE */}
              <div style={{ display:'flex', gap:4, marginBottom:16, borderBottom:'.5px solid rgba(195,200,195,.3)', paddingBottom:10 }}>
                {LOCALES.map(l => (
                  <button key={l.code} onClick={() => setLocale(l.code)}
                    style={{ fontSize:11, padding:'5px 10px', border:`.5px solid ${locale===l.code ? '#B8943A' : 'rgba(195,200,195,.4)'}`, background: locale===l.code ? 'rgba(184,148,58,.1)' : 'transparent', color: locale===l.code ? '#B8943A' : '#888', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>

              {locale !== 'fr' && (
                <div style={{ background:'#FAEEDA', border:'.5px solid rgba(184,148,58,.3)', padding:'8px 12px', marginBottom:14, fontSize:11, color:'#854F0B' }}>
                  ✏️ Traduction <strong>{locale.toUpperCase()}</strong> — les champs vides afficheront le français.
                </div>
              )}

              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {/* Champs communs (seulement en FR) */}
                {locale === 'fr' && (
                  <>
                    {inp('URL source (lien vers l\'article original)', 'url_source')}
                    {inp('Auteur / Source', 'auteur')}
                    <div>
                      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:8 }}>Photo</label>
                      {form.photo && <img src={form.photo} style={{ width:'100%', height:120, objectFit:'cover', marginBottom:8 }} alt=""/>}
                      <label style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:11, color:'#B8943A', cursor:'pointer', border:'.5px solid rgba(184,148,58,.4)', padding:'6px 12px' }}>
                        {uploading ? 'Chargement...' : '+ Photo'}
                        <input type="file" accept="image/*" onChange={handlePhoto} style={{ display:'none' }}/>
                      </label>
                    </div>
                    <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, cursor:'pointer' }}>
                      <input type="checkbox" checked={form.publie ?? true} onChange={e => setForm(f => ({ ...f, publie:e.target.checked }))}/>
                      Publier sur le site
                    </label>
                  </>
                )}

                {/* Champs traduits */}
                {inp(`Titre ${locale !== 'fr' ? `(${locale.toUpperCase()})` : '*'}`, `titre${suffix}`)}
                {ta(`Résumé ${locale !== 'fr' ? `(${locale.toUpperCase()})` : ''}`, `extrait${suffix}`, 3)}
                {ta(`Contenu copié ${locale !== 'fr' ? `(${locale.toUpperCase()})` : ''}(si le lien disparaît)`, `contenu_copie${suffix}`, 6)}

                <div style={{ display:'flex', gap:10, justifyContent:'flex-end', marginTop:8 }}>
                  <button onClick={() => setOpen(false)} className="btn-outline">Annuler</button>
                  <button onClick={handleSave} disabled={saving} className="btn-gold">{saving ? 'Sauvegarde...' : 'Sauvegarder'}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
