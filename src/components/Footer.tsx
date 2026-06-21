'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'
import { supabase } from '@/lib/supabase'

type Cfg = Record<string, string>

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" aria-label={label}
    style={{ display:'flex', alignItems:'center', justifyContent:'center', width:34, height:34, border:'.5px solid rgba(255,255,255,.15)', color:'rgba(255,255,255,.6)', textDecoration:'none', fontSize:15, transition:'all .2s', flexShrink:0 }}
    onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(184,148,58,.15)'; (e.currentTarget as HTMLElement).style.borderColor = '#B8943A'; (e.currentTarget as HTMLElement).style.color = '#B8943A' }}
    onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,.15)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.6)' }}>
    {children}
  </a>
)

export default function Footer() {
  const locale = useLocale()
  const [cfg, setCfg] = useState<Cfg>({})

  useEffect(() => {
    supabase.from('config').select('*').then(({ data }) => {
      if (data) {
        const map: Cfg = {}
        data.forEach((r: { cle: string; valeur: string }) => { map[r.cle] = r.valeur })
        setCfg(map)
      }
    })
  }, [])

  const youtube   = cfg.social_youtube   || 'https://www.youtube.com/@harasadham1227'
  const instagram = cfg.social_instagram || ''
  const facebook  = cfg.social_facebook  || ''
  const whatsapp  = cfg.social_whatsapp  || ''

  const navLinks = [
    { href:'/chevaux',    key:'nav.chevaux' },
    { href:'/etalons',   key:'nav.etalons' },
    { href:'/evenements',key:'nav.evenements' },
    { href:'/galerie',   key:'nav.galerie' },
    { href:'/actualites',key:'nav.actualites' },
    { href:'/contact',   key:'nav.contact' },
  ]

  return (
    <footer style={{ background:'#0E1A13', color:'rgba(255,255,255,.45)', marginTop:60 }}>
      <div style={{ maxWidth:1400, margin:'0 auto', padding:'52px 60px 0' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:40, paddingBottom:40, borderBottom:'.5px solid rgba(255,255,255,.08)' }}>

          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Logo" width={42} height={42} style={{ objectFit:'cover', borderRadius:'50%' }}/>
              <div style={{ fontFamily:'Noto Serif,serif', fontSize:19, color:'#fff' }}>
                {t(locale,'brand.name')} <span style={{ color:'#B8943A' }}>Adham</span>
              </div>
            </div>
            <p style={{ fontSize:12, lineHeight:1.8, marginBottom:20, maxWidth:220 }}>
              {t(locale,'footer.desc')}
            </p>
            <Link href="/contact" style={{ fontSize:9, letterSpacing:'.12em', textTransform:'uppercase', padding:'10px 20px', background:'#B8943A', color:'#fff', textDecoration:'none', fontFamily:'Plus Jakarta Sans,sans-serif', display:'inline-block' }}>
              {t(locale,'btn.contact')}
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.35)', marginBottom:16 }}>{t(locale,'footer.nav')}</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {navLinks.map(l => (
                <Link key={l.href} href={l.href}
                  style={{ fontSize:12, color:'rgba(255,255,255,.55)', textDecoration:'none', transition:'color .15s' }}
                  onMouseOver={e => ((e.target as HTMLElement).style.color = '#B8943A')}
                  onMouseOut={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,.55)')}>
                  {t(locale, l.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Social + contact */}
          <div>
            <div style={{ fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.35)', marginBottom:16 }}>{t(locale,'footer.social')}</div>
            <div style={{ display:'flex', gap:8, marginBottom:28 }}>
              {youtube && (
                <SocialIcon href={youtube} label="YouTube">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>
                </SocialIcon>
              )}
              {instagram && (
                <SocialIcon href={instagram} label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.8 1.7 5 5 .1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c-.2 3.3-1.7 4.8-5 5-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.2-4.8-1.7-5-5C2 16.6 2 16.3 2 12s0-3.6.1-4.9c.2-3.3 1.7-4.8 5-5C8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7 .1 2.7.3.3 2.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.2 4.3 2.6 6.7 7 6.9 1.3.1 1.7.1 5 .1s3.7 0 5-.1c4.3-.2 6.7-2.6 6.9-6.9.1-1.3.1-1.7.1-5s0-3.7-.1-5C23.7 2.7 21.3.3 17 .1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/></svg>
                </SocialIcon>
              )}
              {facebook && (
                <SocialIcon href={facebook} label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1C0 18.1 4.4 23 10.1 24v-8.4H7.1v-3.5h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-1.9.9-1.9 1.9v2.2h3.3l-.5 3.5h-2.8V24C19.6 23 24 18.1 24 12.1z"/></svg>
                </SocialIcon>
              )}
              {whatsapp && (
                <SocialIcon href={`https://wa.me/${whatsapp.replace(/\D/g,'')}`} label="WhatsApp">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.5-.8-2.6-1.7-3.5-3.1-.3-.5.3-.5.9-1.6.1-.2 0-.4-.1-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.9 1.2 3.1c.2.2 2 3 5 4.1.7.2 1.3.4 1.7.5.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.2-.3-.3-.6-.4zM12 21.4c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.7 1 1-3.6-.2-.4C2.4 15.1 2 13.6 2 12 2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zM12 0C5.4 0 0 5.4 0 12c0 2.1.5 4.1 1.5 5.9L0 24l6.3-1.6C8.1 23.4 10 24 12 24c6.6 0 12-5.4 12-12S18.6 0 12 0z"/></svg>
                </SocialIcon>
              )}
            </div>

            <div style={{ fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.35)', marginBottom:12 }}>{t(locale,'footer.contact')}</div>
            <div style={{ display:'flex', flexDirection:'column', gap:6, fontSize:12 }}>
              {cfg.contact_email && (
                <a href={`mailto:${cfg.contact_email}`} style={{ color:'rgba(255,255,255,.55)', textDecoration:'none' }}>{cfg.contact_email}</a>
              )}
              {cfg.contact_tel && (
                <a href={`tel:${cfg.contact_tel}`} style={{ color:'rgba(255,255,255,.55)', textDecoration:'none' }}>{cfg.contact_tel}</a>
              )}
              {cfg.contact_adresse && (
                <span>{cfg.contact_adresse}</span>
              )}
            </div>
          </div>
        </div>

        <div style={{ padding:'16px 0', fontSize:10, textAlign:'center', letterSpacing:'.04em' }}>
          © {new Date().getFullYear()} {t(locale,'brand.name')} Adham — {t(locale,'footer.rights')}
        </div>
      </div>
    </footer>
  )
}
