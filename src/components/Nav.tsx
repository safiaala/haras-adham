'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { LOCALES, Locale } from '@/lib/locale'
import { t } from '@/lib/translations'
import { supabase } from '@/lib/supabase'

const ALL_LINKS = [
  { href:'/',             key:'nav.accueil' },
  { href:'/chevaux',      key:'nav.chevaux' },
  { href:'/etalons',      key:'nav.etalons' },
  { href:'/prestations',  key:'nav.prestations' },
  { href:'/evenements',   key:'nav.evenements' },
  { href:'/galerie',      key:'nav.galerie' },
  { href:'/histoire',     key:'nav.histoire' },
  { href:'/actualites',   key:'nav.actualites' },
  { href:'/jobs',         key:'nav.jobs' },
]

const SLUG_MAP: Record<string, string> = {
  '/':'accueil', '/chevaux':'chevaux', '/etalons':'etalons',
  '/prestations':'prestations', '/evenements':'evenements',
  '/galerie':'galerie', '/histoire':'histoire', '/actualites':'actualites', '/jobs':'jobs',
}

export default function Nav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [locale, setLocale] = useState<Locale>('fr')
  const [activePages, setActivePages] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  async function loadPages() {
    const { data, error } = await supabase.from('pages').select('slug,actif')
    if (data) {
      setActivePages(data.filter(p => p.actif).map(p => p.slug))
    } else {
      // fallback si erreur
      setActivePages(['accueil','chevaux','etalons','prestations','evenements','galerie','histoire','actualites','jobs','contact'])
    }
    setLoaded(true)
  }

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale
    if (saved && ['fr','en','es','ar'].includes(saved)) setLocale(saved)

    const handler = (e: Event) => {
      const l = (e as CustomEvent).detail as Locale
      setLocale(l)
      document.documentElement.lang = l
      document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
    }
    window.addEventListener('locale-change', handler)

    loadPages()

    // Mise à jour en temps réel quand les pages changent
    const channel = supabase.channel('pages-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pages' }, () => loadPages())
      .subscribe()

    return () => {
      window.removeEventListener('locale-change', handler)
      supabase.removeChannel(channel)
    }
  }, [])

  function changeLocale(l: Locale) {
    setLocale(l)
    localStorage.setItem('locale', l)
    document.documentElement.lang = l
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
    window.dispatchEvent(new CustomEvent('locale-change', { detail: l }))
  }

  const visibleLinks = ALL_LINKS.filter(l => activePages.includes(SLUG_MAP[l.href] || ''))

  return (
    <>
      <nav style={{ position:'fixed', top:0, width:'100%', zIndex:50, background:'rgba(251,249,245,.93)', backdropFilter:'blur(12px)', borderBottom:'.5px solid rgba(195,200,195,.22)', height:60, padding:'0 28px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto', height:'100%', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Logo" width={42} height={42} style={{ objectFit:'cover', borderRadius:'50%' }}/>
            <div>
              <div style={{ fontFamily:'Noto Serif,serif', fontSize:17, fontWeight:700, letterSpacing:'-.02em', color:'#13201A' }}>{t(locale,'brand.name')} <span style={{ color:'#B8943A' }}>Adham</span></div>
              <div style={{ fontSize:'7.5px', letterSpacing:'.22em', textTransform:'uppercase', color:'#888', marginTop:-1 }}>{t(locale,'nav.elevage')}</div>
            </div>
          </Link>

          <div style={{ display:'flex', gap:18, alignItems:'center' }} className="hidden md:flex">
            {visibleLinks.map(l => (
              <Link key={l.href} href={l.href} style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:11, letterSpacing:'.11em', textTransform:'uppercase', color: path===l.href ? '#B8943A' : 'rgba(19,32,26,.55)', paddingBottom:2, borderBottom: path===l.href ? '2px solid #B8943A' : '2px solid transparent', textDecoration:'none', transition:'.2s', whiteSpace:'nowrap' }}>
                {t(locale, l.key)}
              </Link>
            ))}
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ display:'flex', gap:2 }}>
              {LOCALES.map(l => (
                <button key={l.code} onClick={() => changeLocale(l.code as Locale)}
                  style={{ fontSize:9, letterSpacing:'.08em', padding:'4px 7px', border:`.5px solid ${locale===l.code ? '#B8943A' : 'rgba(195,200,195,.4)'}`, background: locale===l.code ? 'rgba(184,148,58,.1)' : 'transparent', color: locale===l.code ? '#B8943A' : '#888', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif', fontWeight: locale===l.code ? 600 : 400 }}>
                  {l.label}
                </button>
              ))}
            </div>
            <Link href="/contact" style={{ fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', padding:'8px 14px', background:'#13201A', color:'#fff', textDecoration:'none', fontFamily:'Plus Jakarta Sans,sans-serif', whiteSpace:'nowrap' }}>
              {t(locale,'nav.contact')}
            </Link>
            <button onClick={() => setOpen(true)} style={{ background:'transparent', border:'none', cursor:'pointer', padding:4, display:'flex' }} className="md:hidden">
              <span style={{ fontFamily:'Material Symbols Outlined', fontSize:22, color:'#13201A' }}>menu</span>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div style={{ position:'fixed', inset:0, background:'#13201A', zIndex:100, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20 }}>
          <button onClick={() => setOpen(false)} style={{ position:'absolute', top:16, right:20, background:'transparent', border:'none', color:'#fff', fontSize:26, cursor:'pointer' }}>✕</button>
          <div style={{ fontFamily:'Noto Serif,serif', fontSize:26, color:'#B8943A', marginBottom:16, fontStyle:'italic' }}>{t(locale,'brand.name')} Adham</div>
          {visibleLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:16, letterSpacing:'.1em', textTransform:'uppercase', color:'#fff', textDecoration:'none' }}>
              {t(locale, l.key)}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:16, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A', textDecoration:'none' }}>
            {t(locale,'nav.contact')}
          </Link>
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
