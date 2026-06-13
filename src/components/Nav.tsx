'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/',            label: 'Accueil' },
  { href: '/chevaux',     label: 'Chevaux' },
  { href: '/etalons',     label: 'Étalons' },
  { href: '/prestations', label: 'Prestations' },
  { href: '/evenements',  label: 'Événements' },
  { href: '/histoire',    label: 'Histoire' },
  { href: '/actualites',  label: 'Actualités' },
  { href: '/jobs',        label: 'Jobs' },
]

export default function Nav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav style={{ position:'fixed', top:0, width:'100%', zIndex:50, background:'rgba(251,249,245,.93)', backdropFilter:'blur(12px)', borderBottom:'.5px solid rgba(195,200,195,.22)', height:60, padding:'0 28px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto', height:'100%', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:9, textDecoration:'none' }}>
            <div style={{ width:32, height:32, borderRadius:'50%', border:'1.5px solid #B8943A', display:'flex', alignItems:'center', justifyContent:'center', background:'#f0ece4', fontSize:15 }}>🐴</div>
            <div>
              <div style={{ fontFamily:'Noto Serif,serif', fontSize:17, fontWeight:700, letterSpacing:'-.02em', color:'#13201A' }}>Haras <span style={{ color:'#B8943A' }}>Adham</span></div>
              <div style={{ fontSize:'7.5px', letterSpacing:'.22em', textTransform:'uppercase', color:'#888', marginTop:-1 }}>Élevage · Compétition · Passion</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div style={{ display:'flex', gap:22, alignItems:'center' }} className="hidden md:flex">
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:11, letterSpacing:'.11em', textTransform:'uppercase', color: path === l.href ? '#B8943A' : 'rgba(19,32,26,.55)', paddingBottom:2, borderBottom: path === l.href ? '2px solid #B8943A' : '2px solid transparent', textDecoration:'none', transition:'.2s', whiteSpace:'nowrap' }}>{l.label}</Link>
            ))}
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <Link href="/contact" style={{ fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', padding:'8px 18px', background:'#13201A', color:'#fff', textDecoration:'none', fontFamily:'Plus Jakarta Sans,sans-serif', transition:'.2s' }}>Contact</Link>
            <button onClick={() => setOpen(true)} style={{ background:'transparent', border:'none', cursor:'pointer', padding:4, display:'flex' }} className="md:hidden">
              <span style={{ fontFamily:'Material Symbols Outlined', fontSize:22, color:'#13201A' }}>menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ position:'fixed', inset:0, background:'#13201A', zIndex:100, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20 }}>
          <button onClick={() => setOpen(false)} style={{ position:'absolute', top:16, right:20, background:'transparent', border:'none', color:'#fff', fontSize:26, cursor:'pointer' }}>✕</button>
          <div style={{ fontFamily:'Noto Serif,serif', fontSize:26, color:'#B8943A', marginBottom:16, fontStyle:'italic' }}>Haras Adham</div>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:16, letterSpacing:'.1em', textTransform:'uppercase', color:'#fff', textDecoration:'none' }}>{l.label}</Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:16, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A', textDecoration:'none' }}>Contact</Link>
        </div>
      )}
    </>
  )
}
