'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Etalon } from '@/lib/types'
import { uploadImage } from '@/lib/cloudinary'

const empty = (): Partial<Etalon> => ({ nom:'', age:undefined, race:'Barbe Marocain', robe:'', pedigree:'', palmares:'', description:'', tarif_saillie:'', methodes:[], photo:'', actif:true })

export default function AdminEtalonsPage() {
  const [list, setList] = useState<Etalon[]>([])
  const [form, setForm] = useState<Partial<Etalon>>(empty())
  const [editing, setEditing] = useState<string|null>(null)
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  async function load() {
    const { data } = await supabase.from('etalons').select('*').order('created_at', { ascending:false })
    setList(data || [])
  }
  useEffect(() => { load() }, [])

  function openNew() { setForm(empty()); setEditing(null); setOpen(true) }
  function openEdit(e: Etalon) { setForm(e); setEditing(e.id); setOpen(true) }

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return
    setUploading(true)
    try {
      const url = await uploadImage(e.target.files[0])
      setForm(f => ({ ...f, photo: url }))
    } finally { setUploading(false) }
  }

  async function handleSave() {
    if (!form.nom) return
    setSaving(true)
    try {
      if (editing) { await supabase.from('etalons').update(form).eq('id', editing) }
      else { await supabase.from('etalons').insert(form) }
      setOpen(false); await load()
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
            <a href="/admin" style={{ fontSize:10, color:'#888', textDecoration:'none' }}>← Admin</a>
            <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:22, color:'#13201A', marginTop:4 }}>Étalons</h1>
          </div>
          <button onClick={openNew} className="btn-gold">+ Ajouter un étalon</button>
        </div>

        <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', overflow:'hidden' }}>
          {list.length === 0 ? (
            <div style={{ textAlign:'center', padding:40, color:'#888', fontSize:13, fontStyle:'italic' }}>Aucun étalon. Ajoutez-en un !</div>
          ) : (
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12, fontFamily:'Plus Jakarta Sans,sans-serif' }}>
              <thead>
                <tr style={{ background:'#f5f3ef' }}>
                  {['Photo','Nom','Âge','Robe','Actif','Actions'].map(h => (
                    <th key={h} style={{ padding:'10px 12px', textAlign:'left', fontSize:9, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', borderBottom:'.5px solid rgba(195,200,195,.4)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map(e => (
                  <tr key={e.id} style={{ borderBottom:'.5px solid rgba(195,200,195,.2)' }}>
                    <td style={{ padding:'10px 12px' }}>
                      {e.photo ? <img src={e.photo} style={{ width:48, height:48, objectFit:'cover' }} alt=""/> : <div style={{ width:48, height:48, background:'#f0ece4', display:'flex', alignItems:'center', justifyContent:'center' }}>🐴</div>}
                    </td>
                    <td style={{ padding:'10px 12px', fontWeight:500 }}>{e.nom}</td>
                    <td style={{ padding:'10px 12px', color:'#888' }}>{e.age ? `${e.age} ans` : '—'}</td>
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
                  {inp('Âge','age','number')}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {inp('Race','race')}
                  {inp('Robe','robe')}
                </div>
                {inp('Pedigree','pedigree')}
                {inp('Palmarès','palmares')}
                {inp('Tarif saillie','tarif_saillie')}
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Description</label>
                  <textarea value={form.description ?? ''} onChange={e => setForm(f => ({ ...f, description:e.target.value }))} rows={3}
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', resize:'vertical' }}/>
                </div>
                <div>
                  <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, cursor:'pointer' }}>
                    <input type="checkbox" checked={form.actif ?? true} onChange={e => setForm(f => ({ ...f, actif:e.target.checked }))}/>
                    Étalon actif (visible sur le site)
                  </label>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:8 }}>Photo principale</label>
                  {form.photo && <img src={form.photo} style={{ width:120, height:120, objectFit:'cover', marginBottom:8 }} alt=""/>}
                  <label style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:11, color:'#B8943A', cursor:'pointer', border:'.5px solid rgba(184,148,58,.4)', padding:'6px 12px' }}>
                    {uploading ? 'Chargement...' : '+ Ajouter une photo'}
                    <input type="file" accept="image/*" onChange={handlePhoto} style={{ display:'none' }}/>
                  </label>
                </div>
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
