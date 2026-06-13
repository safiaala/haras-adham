'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Cheval } from '@/lib/types'
import { uploadImage } from '@/lib/cloudinary'

const emptyCheval = (): Partial<Cheval> => ({ nom:'', annee_naissance:undefined, race:'Barbe Marocain', sexe:'', discipline:'', pedigree:'', nom_pere:'', nom_mere:'', statut:'disponible', description:'', prix:'', photos:[], en_vedette:false })

export default function AdminChevauxPage() {
  const [list, setList] = useState<Cheval[]>([])
  const [form, setForm] = useState<Partial<Cheval>>(emptyCheval())
  const [editing, setEditing] = useState<string|null>(null)
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function load() {
    const { data } = await supabase.from('chevaux').select('*').order('created_at', { ascending:false })
    setList(data || [])
  }
  useEffect(() => { load() }, [])

  function openNew() { setForm(emptyCheval()); setEditing(null); setOpen(true); setMsg('') }
  function openEdit(c: Cheval) { setForm(c); setEditing(c.id); setOpen(true); setMsg('') }

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
        await supabase.from('chevaux').update(form).eq('id', editing)
      } else {
        await supabase.from('chevaux').insert(form)
      }
      setOpen(false); setMsg(''); await load()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce cheval ?')) return
    await supabase.from('chevaux').delete().eq('id', id)
    await load()
  }

  const inp = (label: string, key: keyof Cheval, type='text') => (
    <div>
      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{label}</label>
      <input type={type} value={(form[key] as string) ?? ''} onChange={e => setForm(f => ({ ...f, [key]: type==='number' ? Number(e.target.value) : e.target.value }))}
        style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none' }}/>
    </div>
  )

  const sel = (label: string, key: keyof Cheval, opts: string[]) => (
    <div>
      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{label}</label>
      <select value={(form[key] as string) ?? ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff' }}>
        <option value="">—</option>
        {opts.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#f5f3ef', padding:40 }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <div>
            <a href="/admin" style={{ fontSize:10, color:'#888', textDecoration:'none', letterSpacing:'.08em' }}>← Admin</a>
            <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:22, color:'#13201A', marginTop:4 }}>Chevaux</h1>
          </div>
          <button onClick={openNew} className="btn-gold">+ Ajouter un cheval</button>
        </div>

        {/* LISTE */}
        <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', overflow:'hidden' }}>
          {list.length === 0 ? (
            <div style={{ textAlign:'center', padding:40, color:'#888', fontSize:13, fontStyle:'italic' }}>Aucun cheval. Ajoutez-en un !</div>
          ) : (
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12, fontFamily:'Plus Jakarta Sans,sans-serif' }}>
              <thead>
                <tr style={{ background:'#f5f3ef' }}>
                  {['Photo','Nom','Naissance','Discipline','Statut','Vedette','Actions'].map(h => (
                    <th key={h} style={{ padding:'10px 12px', textAlign:'left', fontSize:9, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', borderBottom:'.5px solid rgba(195,200,195,.4)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map(c => (
                  <tr key={c.id} style={{ borderBottom:'.5px solid rgba(195,200,195,.2)' }}>
                    <td style={{ padding:'10px 12px' }}>
                      {c.photos?.[0] ? <img src={c.photos[0]} style={{ width:48, height:48, objectFit:'cover' }} alt=""/> : <div style={{ width:48, height:48, background:'#f0ece4', display:'flex', alignItems:'center', justifyContent:'center' }}>🐴</div>}
                    </td>
                    <td style={{ padding:'10px 12px', fontWeight:500 }}>{c.nom}</td>
                    <td style={{ padding:'10px 12px', color:'#888' }}>{c.annee_naissance || '—'}</td>
                    <td style={{ padding:'10px 12px', color:'#888' }}>{c.discipline || '—'}</td>
                    <td style={{ padding:'10px 12px' }}>
                      <span className={`tag ${c.statut==='disponible'?'tag-green':c.statut==='vendu'?'tag-red':c.statut==='pension'?'tag-blue':'tag-purple'}`}>{c.statut}</span>
                    </td>
                    <td style={{ padding:'10px 12px' }}>{c.en_vedette ? '⭐' : '—'}</td>
                    <td style={{ padding:'10px 12px' }}>
                      <div style={{ display:'flex', gap:6 }}>
                        <button onClick={() => openEdit(c)} style={{ fontSize:10, padding:'4px 10px', border:'.5px solid rgba(195,200,195,.5)', background:'transparent', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Modifier</button>
                        <button onClick={() => handleDelete(c.id)} style={{ fontSize:10, padding:'4px 10px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Supprimer</button>
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
                <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:18, color:'#13201A' }}>{editing ? 'Modifier' : 'Ajouter'} un cheval</h2>
                <button onClick={() => setOpen(false)} style={{ background:'transparent', border:'none', fontSize:22, cursor:'pointer', color:'#888' }}>✕</button>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {inp('Nom *','nom')}
                  {inp('Année de naissance','annee_naissance','number')}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {inp('Race','race')}
                  {sel('Sexe','sexe',['Étalon','Jument','Hongre','Cheval','Poulain','Pouliche'])}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {sel('Discipline','discipline',['cso','dressage','endurance','tbourida','poulain'])}
                  {sel('Statut','statut',['disponible','vendu','pension','reproduction'])}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {inp('Nom du père','nom_pere')}
                  {inp('Nom de la mère','nom_mere')}
                </div>
                {inp('Pedigree','pedigree')}
                {inp('Prix','prix')}
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Description</label>
                  <textarea value={form.description ?? ''} onChange={e => setForm(f => ({ ...f, description:e.target.value }))} rows={3}
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', resize:'vertical' }}/>
                </div>
                <div>
                  <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, cursor:'pointer' }}>
                    <input type="checkbox" checked={form.en_vedette ?? false} onChange={e => setForm(f => ({ ...f, en_vedette:e.target.checked }))}/>
                    Mettre en vedette sur la page d&apos;accueil
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
