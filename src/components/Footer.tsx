'use client'
import Link from 'next/link'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'

export default function Footer() {
  const locale = useLocale()

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
            {[['/',t(locale,'nav.accueil')],['/chevaux',t(locale,'nav.chevaux')],['/etalons',t(locale,'nav.etalons')],['/prestations',t(locale,'nav.prestations')],['/evenements',t(locale,'nav.evenements')]].map(([href,label]) => (
              <div key={href} style={{ marginBottom:6 }}>
                <Link href={href} style={{ fontSize:12, color:'rgba(255,255,255,.5)', textDecoration:'none' }}>{label}</Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize:9, letterSpacing:'.18em', textTransform:'uppercase', color:'#B8943A', marginBottom:10 }}>{t(locale,'footer.contact')}</div>
            <p style={{ fontSize:12, lineHeight:2 }}>Maroc<br/>contact@harasadham.ma</p>
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
