'use client'
import { useEffect, useState } from 'react'
import AdminHeader from '@/components/AdminHeader'
import { countryFromTel } from '@/lib/countries'

interface Message {
  id: string
  nom: string
  email: string
  tel?: string
  sujet?: string
  message: string
  lu: boolean
  created_at: string
}

export default function AdminMessagesPage() {
  const [list, setList] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message | null>(null)
  const [loading, setLoading] = useState(true)

  async function load() {
    const res = await fetch('/api/admin/messages')
    const data = await res.json()
    setList(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  async function markLu(id: string, lu: boolean) {
    await fetch('/api/admin/messages', { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id, lu }) })
    setList(l => l.map(m => m.id === id ? { ...m, lu } : m))
    if (selected?.id === id) setSelected(s => s ? { ...s, lu } : s)
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce message ?')) return
    await fetch('/api/admin/messages', { method:'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id }) })
    setList(l => l.filter(m => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  useEffect(() => { load() }, [])

  const nonLus = list.filter(m => !m.lu).length

  return (
    <div style={{ padding:40 }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <AdminHeader title={`Messages reçus${nonLus > 0 ? ` (${nonLus} non lu${nonLus > 1 ? 's' : ''})` : ''}`}/>

        {loading ? (
          <div style={{ textAlign:'center', padding:60, color:'#888', fontSize:13 }}>Chargement…</div>
        ) : list.length === 0 ? (
          <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', padding:60, textAlign:'center', color:'#888', fontSize:13, fontStyle:'italic' }}>
            Aucun message reçu pour le moment.<br/>
            <span style={{ fontSize:11, marginTop:8, display:'block' }}>⚠️ Pensez à exécuter <code>add-messages-table.sql</code> dans Supabase si la table n&apos;existe pas encore.</span>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap:16 }}>
            {/* Liste */}
            <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
              {list.map(m => (
                <div key={m.id}
                  onClick={() => { setSelected(m); if (!m.lu) markLu(m.id, true) }}
                  style={{ background: selected?.id === m.id ? '#fff' : m.lu ? '#fafaf8' : '#fff', border:`.5px solid ${selected?.id === m.id ? '#B8943A' : 'rgba(195,200,195,.3)'}`, padding:'14px 18px', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'start', gap:12 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                      {!m.lu && <span style={{ width:7, height:7, borderRadius:'50%', background:'#B8943A', flexShrink:0, display:'inline-block' }}/>}
                      <span style={{ fontWeight: m.lu ? 400 : 600, fontSize:13, color:'#13201A' }}>{m.nom}</span>
                      {m.sujet && <span style={{ fontSize:11, color:'#888' }}>— {m.sujet}</span>}
                    </div>
                    <div style={{ fontSize:11, color:'#888', marginBottom:3, display:'flex', alignItems:'center', gap:5 }}>
                      {m.tel && (() => { const p = countryFromTel(m.tel!); return p ? <span title={p.name}>{p.flag}</span> : null })()}
                      {m.email}
                    </div>
                    <div style={{ fontSize:11, color:'#6b6b6b', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{m.message}</div>
                  </div>
                  <div style={{ fontSize:10, color:'#aaa', flexShrink:0, textAlign:'right' }}>
                    {new Date(m.created_at).toLocaleDateString('fr', { day:'numeric', month:'short' })}
                    <br/>
                    {new Date(m.created_at).toLocaleTimeString('fr', { hour:'2-digit', minute:'2-digit' })}
                  </div>
                </div>
              ))}
            </div>

            {/* Détail */}
            {selected && (
              <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', padding:28, position:'sticky', top:100, alignSelf:'start' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:20 }}>
                  <div>
                    <div style={{ fontFamily:'Noto Serif,serif', fontSize:18, color:'#13201A', marginBottom:4 }}>{selected.nom}</div>
                    <a href={`mailto:${selected.email}`} style={{ fontSize:12, color:'#B8943A', textDecoration:'none' }}>{selected.email}</a>
                    {selected.tel && (() => { const pays = countryFromTel(selected.tel); return (
                      <div style={{ fontSize:12, color:'#888', marginTop:2, display:'flex', alignItems:'center', gap:6 }}>
                        {pays && <span title={pays.name}>{pays.flag}</span>}
                        <a href={`tel:${selected.tel}`} style={{ color:'#888', textDecoration:'none' }}>{selected.tel}</a>
                        {pays && <span style={{ fontSize:10, color:'#aaa' }}>{pays.name}</span>}
                      </div>
                    )})()}
                  </div>
                  <button onClick={() => setSelected(null)} style={{ background:'transparent', border:'none', fontSize:20, cursor:'pointer', color:'#888' }}>✕</button>
                </div>

                {selected.sujet && (
                  <div style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A', marginBottom:12 }}>{selected.sujet}</div>
                )}

                <div style={{ fontSize:13, color:'#333', lineHeight:1.8, whiteSpace:'pre-wrap', borderLeft:'3px solid #B8943A', paddingLeft:16, marginBottom:20 }}>
                  {selected.message}
                </div>

                <div style={{ fontSize:10, color:'#aaa', marginBottom:20 }}>
                  {new Date(selected.created_at).toLocaleDateString('fr', { weekday:'long', year:'numeric', month:'long', day:'numeric' })} à {new Date(selected.created_at).toLocaleTimeString('fr', { hour:'2-digit', minute:'2-digit' })}
                </div>

                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.sujet || 'Votre message'}`}
                    style={{ fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', padding:'8px 16px', background:'#13201A', color:'#fff', textDecoration:'none', fontFamily:'Plus Jakarta Sans,sans-serif' }}>
                    ✉ Répondre
                  </a>
                  <button onClick={() => markLu(selected.id, !selected.lu)}
                    style={{ fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', padding:'8px 16px', border:'.5px solid rgba(195,200,195,.5)', background:'transparent', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>
                    {selected.lu ? 'Marquer non lu' : 'Marquer lu'}
                  </button>
                  <button onClick={() => handleDelete(selected.id)}
                    style={{ fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', padding:'8px 16px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>
                    Supprimer
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
