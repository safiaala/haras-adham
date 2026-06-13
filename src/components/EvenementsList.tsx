'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Evenement } from '@/lib/types'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'

const typeColor: Record<string,string> = { comp:'tag-blue', stage:'tag-green', vente:'tag-amber', autre:'tag-purple' }
const typeLabel: Record<string,string> = { comp:'Compétition', stage:'Stage', vente:'Vente', autre:'Autre' }

export default function EvenementsList() {
  const [events, setEvents] = useState<Evenement[]>([])
  const locale = useLocale()

  useEffect(() => {
    supabase.from('evenements').select('*').order('date_debut', { ascending:true })
      .then(({ data }) => setEvents(data || []))
  }, [])

  return (
    <section style={{ padding:'40px 60px', maxWidth:1400, margin:'0 auto' }}>
      <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.9rem', color:'#13201A', marginBottom:24 }}>{t(locale,'evenements.agenda')}</h2>
      {events.length === 0 ? (
        <div style={{ textAlign:'center', padding:60, color:'#888', fontSize:13, fontStyle:'italic' }}>{t(locale,'evenements.empty')}</div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))', gap:14 }}>
          {events.map(ev => {
            const d = new Date(ev.date_debut)
            return (
              <div key={ev.id} style={{ border:'.5px solid rgba(195,200,195,.3)', background:'#fff', overflow:'hidden' }}>
                {ev.photo && <img src={ev.photo} alt={ev.titre} style={{ width:'100%', height:160, objectFit:'cover' }}/>}
                <div style={{ padding:'16px 18px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:10 }}>
                    <div style={{ background:'#13201A', padding:'8px 12px', textAlign:'center', flexShrink:0 }}>
                      <div style={{ fontSize:18, fontFamily:'Noto Serif,serif', color:'#B8943A', lineHeight:1 }}>{d.getDate()}</div>
                      <div style={{ fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.6)', marginTop:2 }}>{d.toLocaleDateString('fr',{month:'short'})}</div>
                    </div>
                    {ev.type && <span className={`tag ${typeColor[ev.type]||'tag-purple'}`}>{typeLabel[ev.type]||ev.type}</span>}
                  </div>
                  <div style={{ fontFamily:'Noto Serif,serif', fontSize:15, color:'#13201A', marginBottom:6 }}>{ev.titre}</div>
                  {ev.lieu && <div style={{ fontSize:10, color:'#B8943A', letterSpacing:'.08em', marginBottom:6 }}>📍 {ev.lieu}</div>}
                  {ev.description && <p style={{ fontSize:11, color:'#6b6b6b', lineHeight:1.7 }}>{ev.description}</p>}
                  {ev.lien_inscription && (
                    <a href={ev.lien_inscription} target="_blank" rel="noreferrer" className="btn-dark" style={{ marginTop:12, display:'inline-block', fontSize:9 }}>{t(locale,'evenements.inscrire')}</a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
