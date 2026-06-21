'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Evenement } from '@/lib/types'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'

const typeColor: Record<string,string> = { comp:'tag-blue', stage:'tag-green', vente:'tag-amber', autre:'tag-purple' }
const typeLabel: Record<string,Record<string,string>> = {
  fr: { comp:'Compétition', stage:'Stage', vente:'Vente', autre:'Autre' },
  en: { comp:'Competition', stage:'Training', vente:'Sale', autre:'Other' },
  es: { comp:'Competición', stage:'Stage', vente:'Venta', autre:'Otro' },
  ar: { comp:'منافسة', stage:'تدريب', vente:'مزاد', autre:'أخرى' },
}

export default function EvenementsHome() {
  const [events, setEvents] = useState<Evenement[]>([])
  const locale = useLocale()

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    supabase.from('evenements').select('*')
      .gte('date_debut', today)
      .order('date_debut', { ascending: true })
      .limit(3)
      .then(({ data }) => setEvents(data || []))
  }, [])

  if (events.length === 0) return null

  return (
    <section style={{ background:'#f0ece4', padding:'60px 60px' }}>
      <div style={{ maxWidth:1400, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:28, flexWrap:'wrap', gap:12 }}>
          <div>
            <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>{t(locale,'evenements.badge')}</span>
            <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'2rem', color:'#13201A' }}>{t(locale,'evenements.prochains')}</h2>
          </div>
          <Link href="/evenements" style={{ fontSize:11, letterSpacing:'.08em', color:'#B8943A', textDecoration:'none' }}>{t(locale,'evenements.voir_tous')}</Link>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
          {events.map(ev => {
            const d = new Date(ev.date_debut)
            const labels = typeLabel[locale] || typeLabel.fr
            return (
              <div key={ev.id} style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', display:'flex', gap:0, overflow:'hidden' }}>
                {/* Date block */}
                <div style={{ background:'#13201A', padding:'16px 18px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0, minWidth:64 }}>
                  <div style={{ fontFamily:'Noto Serif,serif', fontSize:26, color:'#B8943A', lineHeight:1 }}>{d.getDate()}</div>
                  <div style={{ fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.6)', marginTop:3 }}>
                    {d.toLocaleDateString(locale === 'ar' ? 'ar-MA' : locale, { month:'short' })}
                  </div>
                  <div style={{ fontSize:9, color:'rgba(255,255,255,.4)', marginTop:2 }}>{d.getFullYear()}</div>
                </div>

                {/* Content */}
                <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', justifyContent:'center', gap:5 }}>
                  {ev.type && (
                    <span className={`tag ${typeColor[ev.type] || 'tag-purple'}`} style={{ alignSelf:'start', fontSize:9 }}>
                      {labels[ev.type] || ev.type}
                    </span>
                  )}
                  <div style={{ fontFamily:'Noto Serif,serif', fontSize:14, color:'#13201A', lineHeight:1.4 }}>{ev.titre}</div>
                  {ev.lieu && (
                    <div style={{ fontSize:10, color:'#B8943A', letterSpacing:'.05em' }}>📍 {ev.lieu}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
