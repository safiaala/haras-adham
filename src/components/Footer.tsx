'use client'
import Link from 'next/link'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'

export default function Footer() {
  const locale = useLocale()

  return (
    <footer style={{ background:'#13201A', color:'rgba(255,255,255,.5)', padding:'40px 60px 24px', marginTop:60 }}>
      <div style={{ maxWidth:1400, margin:'0 auto' }}>
        <div style={{ marginBottom:24 }}>
          <div style={{ fontFamily:'Noto Serif,serif', fontSize:20, color:'#fff', marginBottom:12 }}>
            {t(locale,'brand.name')} <span style={{ color:'#B8943A' }}>Adham</span>
          </div>
          <Link href="/contact" style={{ fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', padding:'10px 22px', background:'#B8943A', color:'#fff', textDecoration:'none', fontFamily:'Plus Jakarta Sans,sans-serif', display:'inline-block' }}>
            {t(locale,'btn.contact')}
          </Link>
        </div>
        <div style={{ borderTop:'.5px solid rgba(255,255,255,.1)', paddingTop:16, fontSize:10, textAlign:'center' }}>
          © {new Date().getFullYear()} {t(locale,'brand.name')} Adham — {t(locale,'footer.rights')}
        </div>
      </div>
    </footer>
  )
}
