'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { LOCALES, Locale } from '@/lib/locale'

const NAV_LABELS: Record<Locale, Record<string, string>> = {
  fr: { '/':'Accueil', '/chevaux':'Chevaux', '/etalons':'Étalons', '/prestations':'Prestations', '/evenements':'Événements', '/histoire':'Histoire', '/actualites':'Actualités', '/jobs':'Jobs', contact:'Contact' },
  en: { '/':'Home', '/chevaux':'Horses', '/etalons':'Stallions', '/prestations':'Services', '/evenements':'Events', '/histoire':'History', '/actualites':'News', '/jobs':'Jobs', contact:'Contact' },
  es: { '/':'Inicio', '/chevaux':'Caballos', '/etalons':'Sementales', '/prestations':'Servicios', '/evenements':'Eventos', '/histoire':'Historia', '/actualites':'Noticias', '/jobs':'Empleo', contact:'Contacto' },
  ar: { '/':'الرئيسية', '/chevaux':'الخيول', '/etalons':'الفحول', '/prestations':'الخدمات', '/evenements':'الفعاليات', '/histoire':'التاريخ', '/actualites':'الأخبار', '/jobs':'وظائف', contact:'اتصل بنا' },
}

const links = ['/', '/chevaux', '/etalons', '/prestations', '/evenements', '/histoire', '/actualites', '/jobs']

export default function Nav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [locale, setLocale] = useState<Locale>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale
    if (saved && ['fr','en','es','ar'].includes(saved)) setLocale(saved)
  }, [])

  function changeLocale(l: Locale) {
    setLocale(l)
    localStorage.setItem('locale', l)
    document.documentElement.lang = l
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
    window.dispatchEvent(new CustomEvent('locale-change', { detail: l }))
  }

  const labels = NAV_LABELS[locale]

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

          <div style={{ display:'flex', gap:18, alignItems:'center' }} className="hidden md:flex">
            {links.map(l => (
              <Link key={l} href={l} style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:11, letterSpacing:'.11em', textTransform:'uppercase', color: path === l ? '#B8943A' : 'rgba(19,32,26,.55)', paddingBottom:2, borderBottom: path === l ? '2px solid #B8943A' : '2px solid transparent', textDecoration:'none', transition:'.2s', whiteSpace:'nowrap' }}>{labels[l]}</Link>
            ))}
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            {/* Sélecteur de langue */}
            <div style={{ display:'flex', gap:2 }}>
              {LOCALES.map(l => (
                <button key={l.code} onClick={() => changeLocale(l.code as Locale)}
                  style={{ fontSize:9, letterSpacing:'.08em', padding:'4px 7px', border:`.5px solid ${locale===l.code ? '#B8943A' : 'rgba(195,200,195,.4)'}`, background: locale===l.code ? 'rgba(184,148,58,.1)' : 'transparent', color: locale===l.code ? '#B8943A' : '#888', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif', fontWeight: locale===l.code ? 600 : 400 }}>
                  {l.label}
                </button>
              ))}
            </div>
            <Link href="/contact" style={{ fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', padding:'8px 14px', background:'#13201A', color:'#fff', textDecoration:'none', fontFamily:'Plus Jakarta Sans,sans-serif', transition:'.2s', whiteSpace:'nowrap' }}>{labels.contact}</Link>
            <button onClick={() => setOpen(true)} style={{ background:'transparent', border:'none', cursor:'pointer', padding:4, display:'flex' }} className="md:hidden">
              <span style={{ fontFamily:'Material Symbols Outlined', fontSize:22, color:'#13201A' }}>menu</span>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div style={{ position:'fixed', inset:0, background:'#13201A', zIndex:100, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20 }}>
          <button onClick={() => setOpen(false)} style={{ position:'absolute', top:16, right:20, background:'transparent', border:'none', color:'#fff', fontSize:26, cursor:'pointer' }}>✕</button>
          <div style={{ fontFamily:'Noto Serif,serif', fontSize:26, color:'#B8943A', marginBottom:16, fontStyle:'italic' }}>Haras Adham</div>
          {links.map(l => (
            <Link key={l} href={l} onClick={() => setOpen(false)} style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:16, letterSpacing:'.1em', textTransform:'uppercase', color:'#fff', textDecoration:'none' }}>{labels[l]}</Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:16, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A', textDecoration:'none' }}>{labels.contact}</Link>
          <div style={{ display:'flex', gap:8, marginTop:16 }}>
            {LOCALES.map(l => (
              <button key={l.code} onClick={() => changeLocale(l.code as Locale)}
                style={{ fontSize:11, padding:'6px 12px', border:`.5px solid ${locale===l.code ? '#B8943A' : 'rgba(255,255,255,.2)'}`, background:'transparent', color: locale===l.code ? '#B8943A' : 'rgba(255,255,255,.6)', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
