'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Actualite } from '@/lib/types'
import { uploadImage } from '@/lib/cloudinary'

const empty = (): Partial<Actualite> => ({ titre:'', contenu:'', extrait:'', photo:'', publie:true })

export default function AdminActualitesPage() {
  const [list, setList] = useState<Actualite[]>([])
  const [form, setForm] = useState<Partial<Actualite>>(empty())
  const [editing, setEditing] = useState<string|null>(null)
  const [open, setOpen] = useState(false)
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

  return (
    <div style={{ minHeight:'100vh', background:'#f5f3ef', padding:40 }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <div>
            <a href="/admin" style={{ fontSize:10, color:'#888', textDecoration:'none' }}>← Admin</a>
            <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:22, color:'#13201A', marginTop:4 }}>Actualités</h1>
          </div>
          <button onClick={() => { setForm(empty()); setEditing(null); setOpen(true) }} className="btn-gold">+ Ajouter</button>
        </div>

        <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', overflow:'hidden' }}>
          {list.length === 0 ? (
            <div style={{ textAlign:'center', padding:40, color:'#888', fontSize:13, fontStyle:'italic' }}>Aucune actualité.</div>
          ) : (
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12, fontFamily:'Plus Jakarta Sans,sans-serif' }}>
              <thead>
                <tr style={{ background:'#f5f3ef' }}>
                  {['Photo','Titre','Date','Publiée','Actions'].map(h => (
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
                    <td style={{ padding:'10px 12px', fontWeight:500 }}>{n.titre}</td>
                    <td style={{ padding:'10px 12px', color:'#888' }}>{n.created_at ? new Date(n.created_at).toLocaleDateString('fr') : '—'}</td>
                    <td style={{ padding:'10px 12px' }}><span className={`tag ${n.publie ? 'tag-green' : 'tag-red'}`}>{n.publie ? 'Oui' : 'Non'}</span></td>
                    <td style={{ padding:'10px 12px' }}>
                      <div style={{ display:'flex', gap:6 }}>
                        <button onClick={() => { setForm(n); setEditing(n.id); setOpen(true) }} style={{ fontSize:10, padding:'4px 10px', border:'.5px solid rgba(195,200,195,.5)', background:'transparent', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Modifier</button>
                        <button onClick={() => handleDelete(n.id)} style={{ fontSize:10, padding:'4px 10px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Supprimer</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {open && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
            <div style={{ background:'#fbf9f5', padding:28, width:'100%', maxWidth:560, maxHeight:'90vh', overflowY:'auto' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:18, color:'#13201A' }}>{editing ? 'Modifier' : 'Ajouter'} une actualité</h2>
                <button onClick={() => setOpen(false)} style={{ background:'transparent', border:'none', fontSize:22, cursor:'pointer', color:'#888' }}>✕</button>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Titre *</label>
                  <input value={form.titre ?? ''} onChange={e => setForm(f => ({ ...f, titre:e.target.value }))}
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none' }}/>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Extrait (affiché sur la carte)</label>
                  <textarea value={form.extrait ?? ''} onChange={e => setForm(f => ({ ...f, extrait:e.target.value }))} rows={2}
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', resize:'vertical' }}/>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Contenu complet</label>
                  <textarea value={form.contenu ?? ''} onChange={e => setForm(f => ({ ...f, contenu:e.target.value }))} rows={5}
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', resize:'vertical' }}/>
                </div>
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
