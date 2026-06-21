'use client'
import { useEffect, useState } from 'react'
import AdminHeader from '@/components/AdminHeader'
import { supabase } from '@/lib/supabase'
import { Offre } from '@/lib/types'

const empty = (): Partial<Offre> => ({ titre:'', type:'emploi', description:'', profil:'', contact:'', active:true })

export default function AdminOffresPage() {
  const [list, setList] = useState<Offre[]>([])
  const [form, setForm] = useState<Partial<Offre>>(empty())
  const [editing, setEditing] = useState<string|null>(null)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  async function load() {
    const { data } = await supabase.from('offres').select('*').order('created_at', { ascending:false })
    setList(data || [])
  }
  useEffect(() => { load() }, [])

  async function handleSave() {
    if (!form.titre) return
    setSaving(true)
    try {
      if (editing) { await supabase.from('offres').update(form).eq('id', editing) }
      else { await supabase.from('offres').insert(form) }
      setOpen(false); await load()
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette offre ?')) return
    await supabase.from('offres').delete().eq('id', id)
    await load()
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f5f3ef', padding:40 }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <AdminHeader title="Offres d\'emploi" action={<button onClick={() => setOpen(true)} className="btn-gold">+ Ajouter</button>}/>

        <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', overflow:'hidden' }}>
          {list.length === 0 ? (
            <div style={{ textAlign:'center', padding:40, color:'#888', fontSize:13, fontStyle:'italic' }}>{"Aucune offre d'emploi."}</div>
          ) : (
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12, fontFamily:'Plus Jakarta Sans,sans-serif' }}>
              <thead>
                <tr style={{ background:'#f5f3ef' }}>
                  {['Titre','Type','Active','Actions'].map(h => (
                    <th key={h} style={{ padding:'10px 12px', textAlign:'left', fontSize:9, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', borderBottom:'.5px solid rgba(195,200,195,.4)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map(o => (
                  <tr key={o.id} style={{ borderBottom:'.5px solid rgba(195,200,195,.2)' }}>
                    <td style={{ padding:'10px 12px', fontWeight:500 }}>{o.titre}</td>
                    <td style={{ padding:'10px 12px' }}><span className="tag tag-blue">{o.type}</span></td>
                    <td style={{ padding:'10px 12px' }}><span className={`tag ${o.active ? 'tag-green' : 'tag-red'}`}>{o.active ? 'Oui' : 'Non'}</span></td>
                    <td style={{ padding:'10px 12px' }}>
                      <div style={{ display:'flex', gap:6 }}>
                        <button onClick={() => { setForm(o); setEditing(o.id); setOpen(true) }} style={{ fontSize:10, padding:'4px 10px', border:'.5px solid rgba(195,200,195,.5)', background:'transparent', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Modifier</button>
                        <button onClick={() => handleDelete(o.id)} style={{ fontSize:10, padding:'4px 10px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Supprimer</button>
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
            <div style={{ background:'#fbf9f5', padding:28, width:'100%', maxWidth:520, maxHeight:'90vh', overflowY:'auto' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:18, color:'#13201A' }}>{editing ? 'Modifier' : 'Ajouter'} une offre</h2>
                <button onClick={() => setOpen(false)} style={{ background:'transparent', border:'none', fontSize:22, cursor:'pointer', color:'#888' }}>✕</button>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Titre *</label>
                  <input value={form.titre ?? ''} onChange={e => setForm(f => ({ ...f, titre:e.target.value }))}
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none' }}/>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Type</label>
                  <select value={form.type ?? 'emploi'} onChange={e => setForm(f => ({ ...f, type:e.target.value }))}
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff' }}>
                    {['emploi','stage','benevole'].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                {[['Description','description'],['Profil recherché','profil'],['Contact','contact']].map(([label, key]) => (
                  <div key={key}>
                    <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{label}</label>
                    <textarea value={(form[key as keyof Offre] as string) ?? ''} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))} rows={3}
                      style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', resize:'vertical' }}/>
                  </div>
                ))}
                <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, cursor:'pointer' }}>
                  <input type="checkbox" checked={form.active ?? true} onChange={e => setForm(f => ({ ...f, active:e.target.checked }))}/>
                  Offre active (visible sur le site)
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
