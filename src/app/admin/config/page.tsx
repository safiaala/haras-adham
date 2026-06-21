'use client'
import { useEffect, useState } from 'react'
import AdminHeader from '@/components/AdminHeader'
import { supabase } from '@/lib/supabase'

type Cfg = Record<string, string>

const GROUPS = [
  {
    label: 'Contact & Coordonnées',
    emoji: '📍',
    keys: [
      { cle:'addr',   label:'Adresse',           placeholder:'Ex: Douar Ouled Aissa, Maroc' },
      { cle:'tel',    label:'Téléphone',          placeholder:'Ex: +212 6 00 00 00 00' },
      { cle:'email',  label:'Email de contact',   placeholder:'contact@harasadham.ma' },
      { cle:'lat',    label:'Latitude GPS',       placeholder:'Ex: 31.6295' },
      { cle:'lng',    label:'Longitude GPS',      placeholder:'Ex: -7.9811' },
    ]
  },
  {
    label: 'Réseaux sociaux',
    emoji: '📱',
    keys: [
      { cle:'social_youtube',   label:'YouTube URL',   placeholder:'https://www.youtube.com/@harasadham1227' },
      { cle:'social_instagram', label:'Instagram URL', placeholder:'https://www.instagram.com/haras.adham.maroc/' },
      { cle:'social_facebook',  label:'Facebook URL',  placeholder:'https://www.facebook.com/harasadham' },
      { cle:'social_whatsapp',  label:'WhatsApp (numéro)', placeholder:'Ex: +212600000000' },
    ]
  },
  {
    label: 'Chiffres clés (page d\'accueil)',
    emoji: '📊',
    keys: [
      { cle:'s1n', label:'Stat 1 — Nombre', placeholder:'45+' },
      { cle:'s1l', label:'Stat 1 — Label',  placeholder:'Chevaux' },
      { cle:'s2n', label:'Stat 2 — Nombre', placeholder:'5' },
      { cle:'s2l', label:'Stat 2 — Label',  placeholder:'Prestations' },
      { cle:'s3n', label:'Stat 3 — Nombre', placeholder:'12' },
      { cle:'s3l', label:'Stat 3 — Label',  placeholder:'Titres' },
      { cle:'s4n', label:'Stat 4 — Nombre', placeholder:'30' },
      { cle:'s4l', label:'Stat 4 — Label',  placeholder:'Boxes' },
    ]
  },
  {
    label: 'Horaires d\'ouverture',
    emoji: '🕐',
    keys: [
      { cle:'horaires', label:'Horaires', placeholder:'Lun–Sam 9h–17h' },
    ]
  },
]

export default function AdminConfigPage() {
  const [cfg, setCfg] = useState<Cfg>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('config').select('*').then(({ data }) => {
      if (data) {
        const map: Cfg = {}
        data.forEach((r: { cle: string; valeur: string }) => { map[r.cle] = r.valeur })
        setCfg(map)
      }
    })
  }, [])

  async function handleSave() {
    setSaving(true)
    const upserts = Object.entries(cfg).map(([cle, valeur]) => ({ cle, valeur }))
    await supabase.from('config').upsert(upserts, { onConflict: 'cle' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function set(cle: string, val: string) {
    setCfg(c => ({ ...c, [cle]: val }))
  }

  return (
    <div style={{ padding:40 }}>
      <div style={{ maxWidth:800, margin:'0 auto' }}>
        <AdminHeader title="Configuration du site" />

        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {GROUPS.map(g => (
            <div key={g.label} style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', overflow:'hidden' }}>
              <div style={{ background:'#f5f3ef', padding:'12px 20px', borderBottom:'.5px solid rgba(195,200,195,.3)', display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:16 }}>{g.emoji}</span>
                <span style={{ fontFamily:'Noto Serif,serif', fontSize:15, color:'#13201A' }}>{g.label}</span>
              </div>
              <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', gap:12 }}>
                {g.keys.map(k => (
                  <div key={k.cle}>
                    <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{k.label}</label>
                    <input
                      value={cfg[k.cle] ?? ''}
                      onChange={e => set(k.cle, e.target.value)}
                      placeholder={k.placeholder}
                      style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff', boxSizing:'border-box' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:16, textAlign:'right' }}>
          <button onClick={handleSave} disabled={saving}
            style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', padding:'10px 22px', background: saved ? '#3B6D11' : '#B8943A', color:'#fff', border:'none', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>
            {saving ? 'Sauvegarde...' : saved ? '✓ Sauvegardé' : 'Sauvegarder tout'}
          </button>
        </div>
      </div>
    </div>
  )
}
