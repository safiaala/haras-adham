'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { uploadImage } from '@/lib/cloudinary'

const prestations = [
  { key:'pvente',  titre:'Vente' },
  { key:'ppens',   titre:'Pension' },
  { key:'pens',    titre:'Enseignement' },
  { key:'pcomp',   titre:'Compétition' },
  { key:'prepro',  titre:'Reproduction' },
]

export default function AdminPrestationsPage() {
  const [config, setConfig] = useState<Record<string,string>>({})
  const [uploading, setUploading] = useState<string|null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('config').select('*').then(({ data }) => {
      if (data) {
        const map: Record<string,string> = {}
        data.forEach(r => { map[r.cle] = r.valeur })
        setConfig(map)
      }
    })
  }, [])

  async function handlePhoto(key: string, e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return
    setUploading(key)
    try {
      const url = await uploadImage(e.target.files[0])
      setConfig(prev => ({ ...prev, [`${key}_photo`]: url }))
    } finally { setUploading(null) }
  }

  async function handleSave() {
    setSaving(true)
    try {
      await Promise.all(
        Object.entries(config).map(([cle, valeur]) =>
          supabase.from('config').upsert({ cle, valeur, updated_at: new Date().toISOString() })
        )
      )
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally { setSaving(false) }
  }

  return (
    <div style={{ padding:40 }}>
      <div style={{ maxWidth:800, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <div>
            <a href="/admin" style={{ fontSize:10, color:'#888', textDecoration:'none' }}>← Admin</a>
            <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:22, color:'#13201A', marginTop:4 }}>Prestations</h1>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-gold">
            {saved ? '✓ Sauvegardé !' : saving ? 'Sauvegarde...' : 'Sauvegarder tout'}
          </button>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {prestations.map(p => (
            <div key={p.key} style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', padding:24 }}>
              <div style={{ fontFamily:'Noto Serif,serif', fontSize:15, color:'#B8943A', marginBottom:16, paddingBottom:10, borderBottom:'.5px solid rgba(195,200,195,.3)' }}>
                {p.titre}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  <div>
                    <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Titre</label>
                    <input value={config[`${p.key}_titre`] ?? ''} onChange={e => setConfig(prev => ({ ...prev, [`${p.key}_titre`]: e.target.value }))}
                      style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none' }}/>
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Badge</label>
                    <input value={config[`${p.key}_badge`] ?? ''} onChange={e => setConfig(prev => ({ ...prev, [`${p.key}_badge`]: e.target.value }))}
                      style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none' }}/>
                  </div>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Description</label>
                  <textarea value={config[`${p.key}_desc`] ?? ''} onChange={e => setConfig(prev => ({ ...prev, [`${p.key}_desc`]: e.target.value }))} rows={3}
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', resize:'vertical' }}/>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:8 }}>Photo</label>
                  <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                    {config[`${p.key}_photo`] && (
                      <div style={{ position:'relative' }}>
                        <img src={config[`${p.key}_photo`]} style={{ width:120, height:80, objectFit:'cover' }} alt=""/>
                        <button onClick={() => setConfig(prev => ({ ...prev, [`${p.key}_photo`]: '' }))}
                          style={{ position:'absolute', top:2, right:2, background:'rgba(0,0,0,.6)', border:'none', color:'#fff', width:18, height:18, borderRadius:'50%', cursor:'pointer', fontSize:11, lineHeight:'18px', textAlign:'center' }}>✕</button>
                      </div>
                    )}
                    <label style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:11, color:'#B8943A', cursor:'pointer', border:'.5px solid rgba(184,148,58,.4)', padding:'8px 14px' }}>
                      {uploading === p.key ? 'Chargement...' : config[`${p.key}_photo`] ? 'Changer la photo' : '+ Ajouter une photo'}
                      <input type="file" accept="image/*" onChange={e => handlePhoto(p.key, e)} style={{ display:'none' }}/>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:20, textAlign:'right' }}>
          <button onClick={handleSave} disabled={saving} className="btn-gold">
            {saved ? '✓ Sauvegardé !' : saving ? 'Sauvegarde...' : 'Sauvegarder tout'}
          </button>
        </div>
      </div>
    </div>
  )
}
