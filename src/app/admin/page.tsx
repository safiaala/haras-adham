'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Card { href: string; emoji: string; titre: string; count?: number | null; desc: string; badge?: number }

function CardGrid({ cards }: { cards: Card[] }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12 }}>
      {cards.map(s => (
        <Link key={s.href} href={s.href} style={{ textDecoration:'none' }}>
          <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', padding:'18px 20px', transition:'box-shadow .2s', cursor:'pointer', position:'relative' }}
            onMouseOver={e => (e.currentTarget.style.boxShadow='0 4px 16px rgba(19,32,26,.08)')}
            onMouseOut={e => (e.currentTarget.style.boxShadow='none')}>
            {s.badge != null && s.badge > 0 && (
              <span style={{ position:'absolute', top:12, right:12, background:'#B8943A', color:'#fff', borderRadius:'50%', width:20, height:20, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700 }}>{s.badge}</span>
            )}
            <div style={{ fontSize:24, marginBottom:8 }}>{s.emoji}</div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:3 }}>
              <div style={{ fontFamily:'Noto Serif,serif', fontSize:15, color:'#13201A' }}>{s.titre}</div>
              {s.count != null && (
                <div style={{ fontFamily:'Noto Serif,serif', fontSize:20, color:'#B8943A' }}>{s.count}</div>
              )}
            </div>
            <div style={{ fontSize:11, color:'#aaa' }}>{s.desc}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom:28 }}>
      <div style={{ fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'#B8943A', marginBottom:12 }}>{label}</div>
      {children}
    </div>
  )
}

export default function AdminPage() {
  const [counts, setCounts] = useState({ chevaux:0, etalons:0, evenements:0, actualites:0, offres:0, messagesTotal:0, messagesNonLus:0 })

  useEffect(() => {
    Promise.all([
      supabase.from('chevaux').select('*', { count:'exact', head:true }),
      supabase.from('etalons').select('*', { count:'exact', head:true }),
      supabase.from('evenements').select('*', { count:'exact', head:true }),
      supabase.from('actualites').select('*', { count:'exact', head:true }),
      supabase.from('offres').select('*', { count:'exact', head:true }),
      supabase.from('messages').select('*', { count:'exact', head:true }),
      supabase.from('messages').select('*', { count:'exact', head:true }).eq('lu', false),
    ]).then(([ch, et, ev, ac, of, mt, mn]) => setCounts({
      chevaux: ch.count ?? 0,
      etalons: et.count ?? 0,
      evenements: ev.count ?? 0,
      actualites: ac.count ?? 0,
      offres: of.count ?? 0,
      messagesTotal: mt.count ?? 0,
      messagesNonLus: mn.count ?? 0,
    }))
  }, [])

  return (
    <div style={{ minHeight:'100vh', background:'#f5f3ef', padding:40 }}>
      <div style={{ maxWidth:960, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:36 }}>
          <div>
            <div style={{ fontFamily:'Noto Serif,serif', fontSize:26, color:'#13201A' }}>Haras <span style={{ color:'#B8943A' }}>Adham</span></div>
            <div style={{ fontSize:10, letterSpacing:'.2em', textTransform:'uppercase', color:'#aaa', marginTop:2 }}>Tableau de bord</div>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <Link href="/" target="_blank" style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', padding:'8px 16px', border:'.5px solid rgba(195,200,195,.5)', color:'#888', textDecoration:'none', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Voir le site →</Link>
            <button className="btn-dark" style={{ fontSize:10, cursor:'pointer' }} onClick={async () => { await fetch('/api/admin/logout', { method:'POST' }); window.location.href = '/admin/login' }}>Déconnexion</button>
          </div>
        </div>

        {/* Messages non lus — bandeau si > 0 */}
        {counts.messagesNonLus > 0 && (
          <Link href="/admin/messages" style={{ textDecoration:'none' }}>
            <div style={{ background:'#13201A', padding:'12px 20px', marginBottom:24, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ background:'#B8943A', color:'#fff', borderRadius:'50%', width:22, height:22, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700 }}>{counts.messagesNonLus}</span>
                <span style={{ fontSize:12, color:'#fff', fontFamily:'Plus Jakarta Sans,sans-serif' }}>
                  {counts.messagesNonLus === 1 ? 'nouveau message reçu' : `nouveaux messages reçus`}
                </span>
              </div>
              <span style={{ fontSize:10, color:'#B8943A', letterSpacing:'.1em', textTransform:'uppercase' }}>Voir →</span>
            </div>
          </Link>
        )}

        {/* Contenu */}
        <Section label="Contenu du site">
          <CardGrid cards={[
            { href:'/admin/chevaux',    emoji:'🐴', titre:'Chevaux',    count:counts.chevaux,    desc:'Collection' },
            { href:'/admin/etalons',    emoji:'🏆', titre:'Étalons',    count:counts.etalons,    desc:'Reproducteurs' },
            { href:'/admin/evenements', emoji:'📅', titre:'Événements', count:counts.evenements, desc:'Agenda' },
            { href:'/admin/actualites', emoji:'📰', titre:'Actualités', count:counts.actualites, desc:'Articles' },
            { href:'/admin/offres',     emoji:'💼', titre:'Offres',     count:counts.offres,     desc:'Offres d\'emploi' },
            { href:'/admin/galerie',    emoji:'🖼️', titre:'Galerie',    desc:'Photos du domaine' },
          ]}/>
        </Section>

        {/* Structure */}
        <Section label="Structure du site">
          <CardGrid cards={[
            { href:'/admin/pages',      emoji:'📝', titre:'Pages',      desc:'Activer / désactiver' },
            { href:'/admin/navigation', emoji:'🔀', titre:'Navigation', desc:'Menu principal' },
            { href:'/admin/prestations',emoji:'🏇', titre:'Prestations',desc:'Sections et photos' },
            { href:'/admin/editeur',    emoji:'🎨', titre:'Éditeur',    desc:'Blocs de contenu' },
          ]}/>
        </Section>

        {/* Outils */}
        <Section label="Outils">
          <CardGrid cards={[
            { href:'/admin/messages', emoji:'✉️', titre:'Messages', count:counts.messagesTotal, badge:counts.messagesNonLus, desc:'Formulaire de contact' },
            { href:'/admin/config',   emoji:'⚙️', titre:'Config',   desc:'Adresse, réseaux sociaux, GPS' },
            { href:'/admin/export',   emoji:'📥', titre:'Export CSV',desc:'Données en Excel / CSV' },
          ]}/>
        </Section>

      </div>
    </div>
  )
}
