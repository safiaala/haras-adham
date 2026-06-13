'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const sections = [
  {
    titre: 'Accueil — Hero',
    champs: [
      { cle:'herobadge', label:'Badge (petit texte doré)', type:'text' },
      { cle:'heroh1', label:'Titre principal', type:'text' },
      { cle:'herosub', label:'Sous-titre', type:'textarea' },
    ]
  },
  {
    titre: 'Accueil — Statistiques',
    champs: [
      { cle:'s1n', label:'Stat 1 — Nombre', type:'text' },
      { cle:'s1l', label:'Stat 1 — Label', type:'text' },
      { cle:'s2n', label:'Stat 2 — Nombre', type:'text' },
      { cle:'s2l', label:'Stat 2 — Label', type:'text' },
      { cle:'s3n', label:'Stat 3 — Nombre', type:'text' },
      { cle:'s3l', label:'Stat 3 — Label', type:'text' },
      { cle:'s4n', label:'Stat 4 — Nombre', type:'text' },
      { cle:'s4l', label:'Stat 4 — Label', type:'text' },
    ]
  },
  {
    titre: 'Accueil — Introduction',
    champs: [
      { cle:'intro1', label:'Paragraphe 1', type:'textarea' },
      { cle:'intro2', label:'Paragraphe 2', type:'textarea' },
    ]
  },
  {
    titre: 'Accueil — YouTube',
    champs: [
      { cle:'ytt', label:'Titre chaîne', type:'text' },
      { cle:'yts', label:'Sous-titre chaîne', type:'text' },
    ]
  },
  {
    titre: 'Contact & Coordonnées',
    champs: [
      { cle:'addr', label:'Adresse', type:'text' },
      { cle:'tel', label:'Téléphone', type:'text' },
      { cle:'email', label:'Email', type:'text' },
    ]
  },
  {
    titre: 'Navigation',
    champs: [
      { cle:'navsub', label:'Sous-titre logo (nav)', type:'text' },
    ]
  },
  {
    titre: 'Étalons — Conseil Génétique',
    champs: [
      { cle:'etalons_conseil_badge', label:'Badge', type:'text' },
      { cle:'etalons_conseil_titre', label:'Titre', type:'text' },
      { cle:'etalons_conseil_item1', label:'Point 1', type:'text' },
      { cle:'etalons_conseil_item2', label:'Point 2', type:'text' },
      { cle:'etalons_conseil_item3', label:'Point 3', type:'text' },
      { cle:'etalons_conseil_cta',   label:'Bouton (texte)', type:'text' },
    ]
  },
  {
    titre: 'Localisation Google Maps',
    champs: [
      { cle:'lat', label:'Latitude (ex: 33.8869)', type:'text' },
      { cle:'lng', label:'Longitude (ex: -5.5473)', type:'text' },
    ]
  },
]

export default function AdminPagesPage() {
  const [config, setConfig] = useState<Record<string,string>>({})
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
    <div style={{ minHeight:'100vh', background:'#f5f3ef', padding:40 }}>
      <div style={{ maxWidth:800, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <div>
            <a href="/admin" style={{ fontSize:10, color:'#888', textDecoration:'none' }}>← Admin</a>
            <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:22, color:'#13201A', marginTop:4 }}>Contenu des pages</h1>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-gold">
            {saved ? '✓ Sauvegardé !' : saving ? 'Sauvegarde...' : 'Sauvegarder tout'}
          </button>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {sections.map(s => (
            <div key={s.titre} style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', padding:24 }}>
              <div style={{ fontFamily:'Noto Serif,serif', fontSize:15, color:'#B8943A', marginBottom:16, paddingBottom:10, borderBottom:'.5px solid rgba(195,200,195,.3)' }}>{s.titre}</div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {s.champs.map(c => (
                  <div key={c.cle}>
                    <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{c.label}</label>
                    {c.type === 'textarea' ? (
                      <textarea
                        value={config[c.cle] ?? ''}
                        onChange={e => setConfig(prev => ({ ...prev, [c.cle]: e.target.value }))}
                        rows={3}
                        style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', resize:'vertical' }}
                      />
                    ) : (
                      <input
                        type="text"
                        value={config[c.cle] ?? ''}
                        onChange={e => setConfig(prev => ({ ...prev, [c.cle]: e.target.value }))}
                        style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none' }}
                      />
                    )}
                  </div>
                ))}
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
