'use client'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'

export default function Footer() {
  const locale = useLocale()

  return (
    <footer style={{ background:'#13201A', color:'rgba(255,255,255,.5)', padding:'24px 60px', marginTop:60 }}>
      <div style={{ maxWidth:1400, margin:'0 auto' }}>
        <div style={{ borderTop:'.5px solid rgba(255,255,255,.1)', paddingTop:16, fontSize:10, textAlign:'center' }}>
          © {new Date().getFullYear()} Haras Adham — {t(locale,'footer.rights')}
        </div>
      </div>
    </footer>
  )
}
