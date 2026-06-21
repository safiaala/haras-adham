'use client'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { GaleriePhoto } from '@/lib/types'
import AdminHeader from '@/components/AdminHeader'

const empty = (): Partial<GaleriePhoto> => ({ url:'', legende:'', categorie:'', ordre:0 })

export default function AdminGaleriePage() {
  const [list, setList] = useState<GaleriePhoto[]>([])
  const [form, setForm] = useState<Partial<GaleriePhoto>>(empty())
  const [editing, setEditing] = useState<string|null>(null)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function load() {
    const { data } = await supabase.from('galerie').select('*').order('ordre', { ascending:true })
    setList(data || [])
  }
  useEffect(() => { load() }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const ALLOWED = ['image/jpeg','image/png','image/webp','image/gif']
    if (!ALLOWED.includes(file.type)) {
      alert('Format non supporté. Utilisez JPG, PNG, WebP ou GIF.')
      return
    }
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `galerie/${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('photos').upload(path, file, { upsert:true })
      if (!error) {
        const { data } = supabase.storage.from('photos').getPublicUrl(path)
        setForm(f => ({ ...f, url: data.publicUrl }))
      } else {
        const reader = new FileReader()
        reader.onload = ev => setForm(f => ({ ...f, url: ev.target?.result as string }))
        reader.readAsDataURL(file)
      }
    } finally { setUploading(false) }
  }

  async function handleSave() {
    if (!form.url) return
    setSaving(true)
    try {
      if (editing) { await supabase.from('galerie').update(form).eq('id', editing) }
      else { await supabase.from('galerie').insert(form) }
      setOpen(false); await load()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette photo ?')) return
    await supabase.from('galerie').delete().eq('id', id)
    await load()
  }

  const inp = (label: string, key: keyof GaleriePhoto, type='text') => (
    <div>
      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{label}</label>
      <input type={type} value={(form[key] as string) ?? ''} onChange={e => setForm(f => ({ ...f, [key]: type === 'number' ? Number(e.target.value) : e.target.value }))}
        style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', boxSizing:'border-box' }}/>
    </div>
  )

  return (
    <div style={{ padding:40 }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <AdminHeader title="Galerie photos" />

        {list.length === 0 ? (
          <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', padding:60, textAlign:'center', color:'#888', fontSize:13, fontStyle:'italic' }}>
            Aucune photo. Commencez par en ajouter une.
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12 }}>
            {list.map(p => (
              <div key={p.id} style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', overflow:'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.legende || ''} style={{ width:'100%', height:150, objectFit:'cover', display:'block' }}/>
                <div style={{ padding:'10px 12px' }}>
                  {p.legende && <div style={{ fontSize:11, color:'#13201A', marginBottom:4, fontWeight:500 }}>{p.legende}</div>}
                  {p.categorie && <span className="tag tag-blue" style={{ fontSize:9 }}>{p.categorie}</span>}
                  <div style={{ display:'flex', gap:6, marginTop:10 }}>
                    <button onClick={() => { setForm(p); setEditing(p.id); setOpen(true) }}
                      style={{ fontSize:9, padding:'4px 10px', border:'.5px solid rgba(195,200,195,.5)', background:'transparent', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Modifier</button>
                    <button onClick={() => handleDelete(p.id)}
                      style={{ fontSize:9, padding:'4px 10px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Suppr.</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {open && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
            <div style={{ background:'#fbf9f5', padding:28, width:'100%', maxWidth:480 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:18, color:'#13201A' }}>{editing ? 'Modifier la photo' : 'Ajouter une photo'}</h2>
                <button onClick={() => setOpen(false)} style={{ background:'transparent', border:'none', fontSize:22, cursor:'pointer', color:'#888' }}>✕</button>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Photo</label>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display:'none' }}/>
                  <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                    <button onClick={() => fileRef.current?.click()} disabled={uploading}
                      style={{ fontSize:10, padding:'8px 14px', border:'.5px solid rgba(195,200,195,.6)', background:'transparent', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>
                      {uploading ? 'Upload...' : '📁 Choisir un fichier'}
                    </button>
                    {form.url && <span style={{ fontSize:10, color:'#639922' }}>✓ Photo prête</span>}
                  </div>
                  {form.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={form.url} alt="" style={{ marginTop:8, width:'100%', height:120, objectFit:'cover' }}/>
                  )}
                </div>
                {inp('Légende (optionnelle)','legende')}
                {inp('Catégorie (ex: Étalons, Compétition, Domaine)','categorie')}
                {inp('Ordre d\'affichage','ordre','number')}
                <div style={{ display:'flex', gap:10, justifyContent:'flex-end', marginTop:8 }}>
                  <button onClick={() => setOpen(false)} className="btn-outline">Annuler</button>
                  <button onClick={handleSave} disabled={saving || !form.url} className="btn-gold">{saving ? 'Sauvegarde...' : 'Sauvegarder'}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
