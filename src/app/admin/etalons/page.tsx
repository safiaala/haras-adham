'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Etalon } from '@/lib/types'
import { uploadImage } from '@/lib/cloudinary'

const empty = (): Partial<Etalon> => ({
  nom:'', annee_naissance:undefined, race:'Barbe Marocain', robe:'',
  taille_cm:undefined, eleveur:'', studbook:'', tarif_saillie:'',
  description:'', palmares:'', video_url:'', pedigree:'',
  photos:[], actif:true, methodes:[]
})

export default function AdminEtalonsPage() {
  const [list, setList] = useState<Etalon[]>([])
  const [form, setForm] = useState<Partial<Etalon>>(empty())
  const [editing, setEditing] = useState<string|null>(null)
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function load() {
    const { data } = await supabase.from('etalons').select('*').order('created_at', { ascending:false })
    setList(data || [])
  }
  useEffect(() => { load() }, [])

  function openNew() { setForm(empty()); setEditing(null); setOpen(true); setMsg('') }
  function openEdit(e: Etalon) { setForm(e); setEditing(e.id); setOpen(true); setMsg('') }

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
        const { error } = await supabase.from('etalons').update(form).eq('id', editing)
        if (error) { setMsg(`Erreur : ${error.message}`); return }
      } else {
        const { error } = await supabase.from('etalons').insert(form)
        if (error) { setMsg(`Erreur : ${error.message}`); return }
      }
      setOpen(false); setMsg(''); await load()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cet étalon ?')) return
    await supabase.from('etalons').delete().eq('id', id)
    await load()
  }

  const inp = (label: string, key: keyof Etalon, type='text') => (
    <div>
      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{label}</label>
      <input type={type} value={(form[key] as string) ?? ''} onChange={e => setForm(f => ({ ...f, [key]: type==='number' ? Number(e.target.value) : e.target.value }))}
        style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none' }}/>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#f5f3ef', padding:40 }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <div>
            <a href="/admin" style={{ fontSize:10, color:'#888', textDecoration:'none', letterSpacing:'.08em' }}>← Admin</a>
            <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:22, color:'#13201A', marginTop:4 }}>Étalons</h1>
          </div>
          <button onClick={openNew} className="btn-gold">+ Ajouter un étalon</button>
        </div>

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
            <div style={{ background:'#fbf9f5', padding:28, width:'100%', maxWidth:600, maxHeight:'90vh', overflowY:'auto' }}>
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
                  {inp('Studbook','studbook')}
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Description</label>
                  <textarea value={form.description ?? ''} onChange={e => setForm(f => ({ ...f, description:e.target.value }))} rows={3}
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', resize:'vertical' }}/>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Palmarès</label>
                  <textarea value={form.palmares ?? ''} onChange={e => setForm(f => ({ ...f, palmares:e.target.value }))} rows={3}
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', resize:'vertical' }}/>
                </div>
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
