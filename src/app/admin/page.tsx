'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [counts, setCounts] = useState([0,0,0,0,0])

  useEffect(() => {
    Promise.all([
      supabase.from('chevaux').select('*', { count:'exact', head:true }),
      supabase.from('etalons').select('*', { count:'exact', head:true }),
      supabase.from('evenements').select('*', { count:'exact', head:true }),
      supabase.from('actualites').select('*', { count:'exact', head:true }),
      supabase.from('offres').select('*', { count:'exact', head:true }),
    ]).then(results => setCounts(results.map(r => r.count ?? 0)))
  }, [])

  const [nbChevaux, nbEtalons, nbEvents, nbNews, nbOffres] = counts

  const sections = [
    { href:'/admin/chevaux',    emoji:'🐴', titre:'Chevaux',     count:nbChevaux,  desc:'Gérer la collection' },
    { href:'/admin/etalons',    emoji:'🏆', titre:'Étalons',     count:nbEtalons,  desc:'Gérer les étalons' },
    { href:'/admin/evenements', emoji:'📅', titre:'Événements',  count:nbEvents,   desc:'Gérer l\'agenda' },
    { href:'/admin/actualites', emoji:'📰', titre:'Actualités',  count:nbNews,     desc:'Gérer les articles' },
    { href:'/admin/offres',     emoji:'💼', titre:'Offres',      count:nbOffres,   desc:'Gérer les offres d\'emploi' },
    { href:'/admin/prestations', emoji:'🏇', titre:'Prestations', count:null,       desc:'Sections et photos' },
    { href:'/admin/pages',      emoji:'📝', titre:'Pages',       count:null,       desc:'Accueil, Contact, Navigation' },
    { href:'/admin/editeur',    emoji:'🎨', titre:'Éditeur',     count:null,       desc:'Modifier toutes les pages par blocs' },
    { href:'/admin/navigation', emoji:'🔀', titre:'Navigation',  count:null,       desc:'Activer/désactiver les pages du menu' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#f5f3ef', padding:40 }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:36 }}>
          <div>
            <div style={{ fontFamily:'Noto Serif,serif', fontSize:26, color:'#13201A' }}>Haras <span style={{ color:'#B8943A' }}>Adham</span></div>
            <div style={{ fontSize:10, letterSpacing:'.2em', textTransform:'uppercase', color:'#888', marginTop:2 }}>Tableau de bord</div>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <Link href="/" target="_blank" style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', padding:'8px 16px', border:'.5px solid rgba(195,200,195,.5)', color:'#888', textDecoration:'none', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Voir le site →</Link>
            <a href="/api/admin/logout" className="btn-dark" style={{ fontSize:10 }}>Déconnexion</a>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:16 }}>
          {sections.map(s => (
            <Link key={s.href} href={s.href} style={{ textDecoration:'none' }}>
              <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', padding:24, transition:'box-shadow .2s', cursor:'pointer' }}
                onMouseOver={e => (e.currentTarget.style.boxShadow='0 4px 16px rgba(19,32,26,.08)')}
                onMouseOut={e => (e.currentTarget.style.boxShadow='none')}>
                <div style={{ fontSize:28, marginBottom:10 }}>{s.emoji}</div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:4 }}>
                  <div style={{ fontFamily:'Noto Serif,serif', fontSize:17, color:'#13201A' }}>{s.titre}</div>
                  <div style={{ fontFamily:'Noto Serif,serif', fontSize:22, color:'#B8943A' }}>{s.count ?? 0}</div>
                </div>
                <div style={{ fontSize:11, color:'#888' }}>{s.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
