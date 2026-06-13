'use client'
import Link from 'next/link'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const ALL_LINKS = [
  { href:'/',             key:'nav.accueil',    slug:'accueil' },
  { href:'/chevaux',      key:'nav.chevaux',    slug:'chevaux' },
  { href:'/etalons',      key:'nav.etalons',    slug:'etalons' },
  { href:'/prestations',  key:'nav.prestations',slug:'prestations' },
  { href:'/evenements',   key:'nav.evenements', slug:'evenements' },
  { href:'/histoire',     key:'nav.histoire',   slug:'histoire' },
  { href:'/actualites',   key:'nav.actualites', slug:'actualites' },
  { href:'/jobs',         key:'nav.jobs',       slug:'jobs' },
]

export default function Footer() {
  const locale = useLocale()
  const [activePages, setActivePages] = useState<string[]>([])

  useEffect(() => {
    supabase.from('pages').select('slug,actif').then(({ data }) => {
      if (data) setActivePages(data.filter(p => p.actif).map(p => p.slug))
    })

    const channel = supabase.channel('footer-pages')
      .on('postgres_changes', { event:'*', schema:'public', table:'pages' }, () => {
        supabase.from('pages').select('slug,actif').then(({ data }) => {
          if (data) setActivePages(data.filter(p => p.actif).map(p => p.slug))
        })
      }).subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const visibleLinks = ALL_LINKS.filter(l => activePages.includes(l.slug))

  return (
    <footer style={{ background:'#13201A', color:'rgba(255,255,255,.5)', padding:'40px 60px 24px', marginTop:60 }}>
      <div style={{ maxWidth:1400, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:40, marginBottom:32 }}>
          <div>
            <div style={{ fontFamily:'Noto Serif,serif', fontSize:20, color:'#fff', marginBottom:8 }}>Haras <span style={{ color:'#B8943A' }}>Adham</span></div>
            <p style={{ fontSize:12, lineHeight:1.8, maxWidth:300 }}>{t(locale,'footer.desc')}</p>
            <div style={{ display:'flex', gap:10, marginTop:14 }}>
              <a href="https://www.youtube.com/@harasadham1227" target="_blank" rel="noreferrer" style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A', textDecoration:'none' }}>YouTube →</a>
              <a href="https://www.instagram.com/haras.adham.maroc/" target="_blank" rel="noreferrer" style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A', textDecoration:'none' }}>Instagram →</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize:9, letterSpacing:'.18em', textTransform:'uppercase', color:'#B8943A', marginBottom:10 }}>{t(locale,'footer.nav')}</div>
            {visibleLinks.map(l => (
              <div key={l.href} style={{ marginBottom:6 }}>
                <Link href={l.href} style={{ fontSize:12, color:'rgba(255,255,255,.5)', textDecoration:'none' }}>{t(locale, l.key)}</Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize:9, letterSpacing:'.18em', textTransform:'uppercase', color:'#B8943A', marginBottom:10 }}>{t(locale,'footer.contact')}</div>
            <p style={{ fontSize:12, lineHeight:2 }}>contact@harasadham.ma</p>
            <Link href="/contact" style={{ display:'inline-block', marginTop:12, fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', padding:'8px 16px', background:'#B8943A', color:'#fff', textDecoration:'none' }}>
              {t(locale,'btn.contact')}
            </Link>
          </div>
        </div>
        <div style={{ borderTop:'.5px solid rgba(255,255,255,.1)', paddingTop:16, fontSize:10, textAlign:'center' }}>
          © {new Date().getFullYear()} Haras Adham — {t(locale,'footer.rights')}
        </div>
      </div>
    </footer>
  )
}
