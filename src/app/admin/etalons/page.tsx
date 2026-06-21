'use client'
import { useEffect, useState } from 'react'
import AdminHeader from '@/components/AdminHeader'
import { supabase } from '@/lib/supabase'
import { adminDb } from '@/lib/adminDb'
import { Etalon } from '@/lib/types'
import { uploadImage } from '@/lib/cloudinary'
import { TRAITS } from '@/components/EtalonCaracterisation'

type Lang = 'fr' | 'en' | 'es' | 'ar'
const LANGS: { code: Lang; label: string }[] = [
  { code:'fr', label:'FR' }, { code:'en', label:'EN' },
  { code:'es', label:'ES' }, { code:'ar', label:'AR' },
]

const empty = (): Partial<Etalon> => ({
  nom:'', annee_naissance:undefined, race:'Barbe Marocain', robe:'',
  taille_cm:undefined, statut:'disponible', eleveur:'', tarif_saillie:'',
  nom_pere:'', nom_mere:'',
  description:'', description_en:'', description_es:'', description_ar:'',
  origine:'', origine_en:'', origine_es:'', origine_ar:'',
  palmares:'', palmares_en:'', palmares_es:'', palmares_ar:'',
  performance:'', performance_en:'', performance_es:'', performance_ar:'',
  production:'', production_en:'', production_es:'', production_ar:'',
  video_url:'', pedigree:'',
  photos:[], actif:true, methodes:[], caracterisation:{}, show_caracterisation:true
})

function LangTabs({ active, onChange }: { active: Lang; onChange: (l: Lang) => void }) {
  return (
    <div style={{ display:'flex', gap:2, marginBottom:6 }}>
      {LANGS.map(l => (
        <button key={l.code} onClick={() => onChange(l.code)}
          style={{ fontSize:9, padding:'3px 9px', border:`.5px solid ${active===l.code ? '#B8943A' : 'rgba(195,200,195,.5)'}`,
            background: active===l.code ? 'rgba(184,148,58,.12)' : 'transparent',
            color: active===l.code ? '#B8943A' : '#aaa', cursor:'pointer',
            fontFamily:'Plus Jakarta Sans,sans-serif', fontWeight: active===l.code ? 700 : 400 }}>
          {l.label}
        </button>
      ))}
    </div>
  )
}

export default function AdminEtalonsPage() {
  const [list, setList] = useState<Etalon[]>([])
  const [form, setForm] = useState<Partial<Etalon>>(empty())
  const [editing, setEditing] = useState<string|null>(null)
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [descLang, setDescLang] = useState<Lang>('fr')
  const [origLang, setOrigLang] = useState<Lang>('fr')
  const [palmLang, setPalmLang] = useState<Lang>('fr')
  const [perfLang, setPerfLang] = useState<Lang>('fr')
  const [prodLang, setProdLang] = useState<Lang>('fr')

  async function load() {
    const { data } = await supabase.from('etalons').select('*').order('created_at', { ascending:false })
    setList(data || [])
  }
  useEffect(() => { load() }, [])

  function openNew() {
    setForm(empty()); setEditing(null); setOpen(true); setMsg('')
    setDescLang('fr'); setOrigLang('fr'); setPalmLang('fr'); setPerfLang('fr'); setProdLang('fr')
  }
  function openEdit(e: Etalon) {
    setForm(e); setEditing(e.id); setOpen(true); setMsg('')
    setDescLang('fr'); setOrigLang('fr'); setPalmLang('fr'); setPerfLang('fr'); setProdLang('fr')
  }

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return
    setUploading(true)
    try {
      const url = await uploadImage(e.target.files[0])
      setForm(f => ({ ...f, photos: [...(f.photos||[]), url] }))
    } finally { setUploading(false) }
  }

  function removePhoto(url: string) {
    setForm(f => ({ ...f, photos: (f.photos||[]).filter(p => p !== url) }))
  }

  async function handleSave() {
    if (!form.nom) { setMsg('Le nom est requis'); return }
    setSaving(true)
    try {
      if (editing) {
        await adminDb.update('etalons', editing, form)
      } else {
        await adminDb.insert('etalons', form)
      }
      setOpen(false); setMsg(''); await load()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cet étalon ?')) return
    await adminDb.delete('etalons', id)
    await load()
  }

  const inp = (label: string, key: keyof Etalon, type='text') => (
    <div>
      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{label}</label>
      <input type={type} value={(form[key] as string) ?? ''} onChange={e => setForm(f => ({ ...f, [key]: type==='number' ? Number(e.target.value) : e.target.value }))}
        style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none' }}/>
    </div>
  )

  // Textarea multilingue : key FR = key, autres = key_en / key_es / key_ar
  function mlKey(base: string, lang: Lang): keyof Etalon {
    return (lang === 'fr' ? base : `${base}_${lang}`) as keyof Etalon
  }

  function mlTextarea(label: string, base: string, lang: Lang, setLang: (l:Lang)=>void, rows=3) {
    const key = mlKey(base, lang)
    return (
      <div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:4 }}>
          <label style={{ fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b' }}>{label}</label>
          <LangTabs active={lang} onChange={setLang}/>
        </div>
        <textarea value={(form[key] as string) ?? ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} rows={rows}
          style={{ width:'100%', padding:'9px 11px', border:`.5px solid ${lang!=='fr' ? 'rgba(184,148,58,.4)' : 'rgba(195,200,195,.6)'}`, fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', resize:'vertical',
            background: lang!=='fr' ? 'rgba(255,252,244,.6)' : '#fff' }}/>
        {lang !== 'fr' && !(form[key] as string) && (form[mlKey(base,'fr') as keyof Etalon] as string) && (
          <div style={{ fontSize:10, color:'#B8943A', marginTop:3, fontStyle:'italic' }}>
            FR : {(form[mlKey(base,'fr') as keyof Etalon] as string)?.substring(0,80)}…
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ padding:40 }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <AdminHeader title="Étalons" action={<button onClick={openNew} className="btn-gold">+ Ajouter un étalon</button>}/>

        {/* LISTE */}
        <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', overflow:'hidden' }}>
          {list.length === 0 ? (
            <div style={{ textAlign:'center', padding:40, color:'#888', fontSize:13, fontStyle:'italic' }}>Aucun étalon. Ajoutez-en un !</div>
          ) : (
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12, fontFamily:'Plus Jakarta Sans,sans-serif' }}>
              <thead>
                <tr style={{ background:'#f5f3ef' }}>
                  {['Photo','Nom','Naissance','Robe','Actif','Actions'].map(h => (
                    <th key={h} style={{ padding:'10px 12px', textAlign:'left', fontSize:9, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', borderBottom:'.5px solid rgba(195,200,195,.4)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map(e => (
                  <tr key={e.id} style={{ borderBottom:'.5px solid rgba(195,200,195,.2)' }}>
                    <td style={{ padding:'10px 12px' }}>
                      {(e.photos?.[0] || e.photo)
                        ? <img src={e.photos?.[0] || e.photo} style={{ width:48, height:48, objectFit:'cover' }} alt=""/>
                        : <div style={{ width:48, height:48, background:'#f0ece4', display:'flex', alignItems:'center', justifyContent:'center' }}>🐴</div>}
                    </td>
                    <td style={{ padding:'10px 12px', fontWeight:500 }}>{e.nom}</td>
                    <td style={{ padding:'10px 12px', color:'#888' }}>{e.annee_naissance || '—'}</td>
                    <td style={{ padding:'10px 12px', color:'#888' }}>{e.robe || '—'}</td>
                    <td style={{ padding:'10px 12px' }}><span className={`tag ${e.actif ? 'tag-green' : 'tag-red'}`}>{e.actif ? 'Actif' : 'Inactif'}</span></td>
                    <td style={{ padding:'10px 12px' }}>
                      <div style={{ display:'flex', gap:6 }}>
                        <button onClick={() => openEdit(e)} style={{ fontSize:10, padding:'4px 10px', border:'.5px solid rgba(195,200,195,.5)', background:'transparent', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Modifier</button>
                        <button onClick={() => handleDelete(e.id)} style={{ fontSize:10, padding:'4px 10px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Supprimer</button>
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
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:18, color:'#13201A' }}>{editing ? 'Modifier' : 'Ajouter'} un étalon</h2>
                <button onClick={() => setOpen(false)} style={{ background:'transparent', border:'none', fontSize:22, cursor:'pointer', color:'#888' }}>✕</button>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {inp('Nom *','nom')}
                  {inp('Année de naissance','annee_naissance','number')}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {inp('Race','race')}
                  {inp('Robe','robe')}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {inp('Taille (cm)','taille_cm','number')}
                  {inp('Tarif saillie','tarif_saillie')}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {inp('Éleveur','eleveur')}
                  <div>
                    <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Statut</label>
                    <select value={form.statut ?? 'disponible'} onChange={e => setForm(f => ({ ...f, statut:e.target.value }))}
                      style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff' }}>
                      {['disponible','vendu','pension','reproduction'].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {inp('Père','nom_pere')}
                  {inp('Mère','nom_mere')}
                </div>

                {/* Champs multilingues */}
                {mlTextarea('Description','description', descLang, setDescLang, 3)}
                {mlTextarea('Origine','origine', origLang, setOrigLang, 2)}
                {mlTextarea('Palmarès','palmares', palmLang, setPalmLang, 3)}
                {mlTextarea('Performance','performance', perfLang, setPerfLang, 3)}
                {mlTextarea('Production','production', prodLang, setProdLang, 2)}

                {inp('Lien vidéo (YouTube, Vimeo…)','video_url')}
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#888', marginBottom:4 }}>
                    🔒 Information non publiée (notes internes)
                  </label>
                  <textarea value={form.pedigree ?? ''} onChange={e => setForm(f => ({ ...f, pedigree:e.target.value }))} rows={2}
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.4)', background:'#f5f3ef', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', resize:'vertical' }}/>
                </div>
                <div>
                  <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, cursor:'pointer' }}>
                    <input type="checkbox" checked={form.actif ?? true} onChange={e => setForm(f => ({ ...f, actif:e.target.checked }))}/>
                    Étalon actif (visible sur le site)
                  </label>
                </div>

                {/* PHOTOS */}
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:8 }}>Photos</label>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:8 }}>
                    {(form.photos||[]).map(p => (
                      <div key={p} style={{ position:'relative', width:80, height:80 }}>
                        <img src={p} style={{ width:80, height:80, objectFit:'cover' }} alt=""/>
                        <button onClick={() => removePhoto(p)} style={{ position:'absolute', top:2, right:2, background:'rgba(0,0,0,.6)', border:'none', color:'#fff', width:18, height:18, borderRadius:'50%', cursor:'pointer', fontSize:11, lineHeight:'18px', textAlign:'center' }}>✕</button>
                      </div>
                    ))}
                    <label style={{ width:80, height:80, border:'1.5px dashed rgba(184,148,58,.4)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:22, color:'#B8943A' }}>
                      {uploading ? '...' : '+'}
                      <input type="file" accept="image/*" onChange={handlePhoto} style={{ display:'none' }}/>
                    </label>
                  </div>
                </div>

                {/* CARACTÉRISATION PAX */}
                <div style={{ borderTop:'.5px solid rgba(195,200,195,.4)', paddingTop:16, marginTop:4 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                    <label style={{ fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A' }}>
                      Caractérisation PAX (1 → 4)
                    </label>
                    <label style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, cursor:'pointer', color:'#6b6b6b' }}>
                      <input type="checkbox" checked={form.show_caracterisation ?? true} onChange={e => setForm(f => ({ ...f, show_caracterisation:e.target.checked }))}/>
                      Afficher sur le site
                    </label>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    {TRAITS.map(trait => {
                      const val = (form.caracterisation || {})[trait.key]
                      const labels = trait.fr
                      return (
                        <div key={trait.key}>
                          <div style={{ fontSize:9, color:'#B8943A', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:4 }}>{labels.cat}</div>
                          <div style={{ display:'grid', gridTemplateColumns:'100px 1fr 100px', gap:8, alignItems:'center' }}>
                            <span style={{ fontSize:11, color:'#888', fontStyle:'italic', textAlign:'right' }}>{labels.g}</span>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                              <input type="range" min="1" max="4" step="0.5"
                                value={val ?? 2.5}
                                onChange={e => setForm(f => ({ ...f, caracterisation: { ...(f.caracterisation||{}), [trait.key]: parseFloat(e.target.value) } }))}
                                style={{ flex:1, accentColor:'#C85A2A' }}/>
                              <span style={{ fontSize:11, fontWeight:600, color:'#C85A2A', minWidth:24, textAlign:'center' }}>{val ?? '—'}</span>
                              {val != null && (
                                <button onClick={() => setForm(f => { const c = { ...(f.caracterisation||{}) }; delete c[trait.key]; return { ...f, caracterisation:c } })}
                                  style={{ fontSize:10, color:'#aaa', background:'none', border:'none', cursor:'pointer', padding:0 }}>✕</button>
                              )}
                            </div>
                            <span style={{ fontSize:11, color:'#888', fontStyle:'italic' }}>{labels.d}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {msg && <p style={{ fontSize:12, color:'#A32D2D' }}>{msg}</p>}
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
