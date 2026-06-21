'use client'
import { useState, useEffect } from 'react'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'
import { supabase } from '@/lib/supabase'
import { COUNTRIES, countryName, type Country } from '@/lib/countries'

function CopyBtn({ value, locale }: { value: string; locale: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const label = copied ? t(locale as import('@/lib/locale').Locale, 'contact.copie') : t(locale as import('@/lib/locale').Locale, 'contact.copier')
  return (
    <button onClick={copy} title={label} style={{ background:'transparent', border:'none', cursor:'pointer', color: copied ? '#3B6D11' : '#B8943A', padding:0, display:'flex', alignItems:'center' }}>
      <span style={{ fontFamily:'Material Symbols Outlined', fontSize:16 }}>{copied ? 'check' : 'content_copy'}</span>
    </button>
  )
}

export default function ContactPage() {
  const locale = useLocale()
  const [form, setForm] = useState({ nom:'', email:'', tel:'', sujet:'', message:'' })
  const [dialCountry, setDialCountry] = useState<Country>(COUNTRIES[0]) // Maroc par défaut
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'error'>('idle')
  const [cfg, setCfg] = useState<Record<string,string>>({})

  useEffect(() => {
    supabase.from('config').select('*').then(({ data }) => {
      if (data) {
        const map: Record<string,string> = {}
        data.forEach(r => { map[r.cle] = r.valeur })
        setCfg(map)
      }
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    // Stocker l'indicatif + numéro ensemble pour pouvoir identifier le pays côté admin
    const telWithDial = form.tel ? `${dialCountry.dial}${form.tel.replace(/^0/, '')}` : ''
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ ...form, tel: telWithDial }) })
      setStatus(res.ok ? 'ok' : 'error')
    } catch { setStatus('error') }
  }

  const sujets = ['opt1','opt2'].map(k => t(locale, `contact.sujet.${k}`))

  const infos = [
    { icon:'location_on', key:'contact.addr', val: cfg.addr || '', sub: t(locale,'contact.country') },
    { icon:'phone',       key:'contact.tel',  val: cfg.tel  || t(locale, 'contact.tel.fallback') },
    { icon:'mail',        key:'contact.email',val: cfg.email || 'contact@harasadham.ma' },
    { icon:'schedule',    key:'contact.horaires', val: t(locale,'contact.horaires.val') },
  ]

  return (
    <>
      <section style={{ background:'#13201A', padding:'65px 60px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'start' }}>
          <div>
            <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:'clamp(2.2rem,4vw,3.5rem)', color:'#fff', lineHeight:1.1, marginBottom:18 }}>{t(locale,'contact.title')}</h1>
            <p style={{ fontSize:13, color:'rgba(255,255,255,.58)', lineHeight:1.8, marginBottom:28 }}>{t(locale,'contact.desc')}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {infos.map(c => (
                <div key={c.key} style={{ display:'flex', gap:12, alignItems:'start' }}>
                  <span style={{ fontFamily:'Material Symbols Outlined', color:'#B8943A', flexShrink:0, marginTop:1 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(255,255,255,.38)', marginBottom:2 }}>{t(locale,c.key)}</div>
                    {c.icon === 'location_on' ? (
                      <a href={cfg.lat && cfg.lng
                          ? `https://www.google.com/maps?q=${cfg.lat},${cfg.lng}`
                          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.val + ' ' + (c as {sub?:string}).sub)}`}
                        target="_blank" rel="noreferrer"
                        style={{ color:'rgba(255,255,255,.78)', fontSize:12, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:6 }}>
                        <div>
                          {c.val && <div>{c.val}</div>}
                          <div style={{ color:'rgba(255,255,255,.55)', fontSize:11 }}>{(c as {sub?:string}).sub}</div>
                        </div>
                        <span style={{ fontFamily:'Material Symbols Outlined', fontSize:14, color:'#B8943A', flexShrink:0 }}>open_in_new</span>
                      </a>
                    ) : c.icon === 'mail' ? (
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <a href={`mailto:${c.val}`} style={{ color:'#B8943A', fontSize:12, textDecoration:'none' }}>{c.val}</a>
                        <CopyBtn value={c.val} locale={locale}/>
                      </div>
                    ) : c.icon === 'phone' ? (
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <a href={`tel:${c.val}`} style={{ color:'rgba(255,255,255,.78)', fontSize:12, textDecoration:'none' }}>{c.val}</a>
                        <CopyBtn value={c.val} locale={locale}/>
                      </div>
                    ) : (
                      <div style={{ color:'rgba(255,255,255,.78)', fontSize:12 }}>{c.val}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background:'#fbf9f5', padding:32 }}>
            {status === 'ok' ? (
              <div style={{ textAlign:'center', padding:40 }}>
                <div style={{ width:60, height:60, borderRadius:'50%', background:'#EAF3DE', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:26 }}>✓</div>
                <div style={{ fontFamily:'Noto Serif,serif', fontSize:20, color:'#13201A', marginBottom:12 }}>{t(locale,'contact.ok')}</div>
                <p style={{ fontSize:13, color:'#6b6b6b', lineHeight:1.8, maxWidth:320, margin:'0 auto 20px' }}>{t(locale,'contact.ok.desc')}</p>
                <button onClick={() => setStatus('idle')} className="btn-outline" style={{ fontSize:10 }}>
                  {t(locale,'contact.autre_message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  {[['nom','contact.nom','text'],['email','contact.email','email']].map(([k,lk,tp]) => (
                    <div key={k}>
                      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{t(locale,lk)} <span style={{ color:'#A32D2D' }}>*</span></label>
                      <input type={tp} required value={form[k as keyof typeof form]} onChange={e => setForm({...form,[k]:e.target.value})}
                        style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff' }}/>
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{t(locale,'contact.tel')} <span style={{ color:'#A32D2D' }}>*</span></label>
                  <div style={{ display:'flex', border:'.5px solid rgba(195,200,195,.6)', background:'#fff' }}>
                    <select value={dialCountry.code} onChange={e => setDialCountry(COUNTRIES.find(c => c.code === e.target.value) ?? COUNTRIES[0])}
                      style={{ width:'auto', flexShrink:0, padding:'9px 10px', border:'none', borderRight:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#f8f6f2', cursor:'pointer' }}>
                      {COUNTRIES.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.dial} — {countryName(c.code, locale)}</option>
                      ))}
                    </select>
                    <input type="tel" required value={form.tel} onChange={e => setForm({...form,tel:e.target.value})}
                      placeholder="6 12 34 56 78"
                      style={{ flex:1, padding:'9px 11px', border:'none', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'transparent', minWidth:0 }}/>
                  </div>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{t(locale,'contact.sujet')} <span style={{ color:'#A32D2D' }}>*</span></label>
                  <select value={form.sujet} onChange={e => setForm({...form,sujet:e.target.value})} required
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff' }}>
                    <option value="">—</option>
                    {sujets.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{t(locale,'contact.message')} <span style={{ color:'#A32D2D' }}>*</span></label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff', resize:'vertical' }}/>
                </div>
                <button type="submit" disabled={status==='sending'} className="btn-dark" style={{ width:'100%', textAlign:'center' }}>
                  {status === 'sending' ? t(locale,'contact.envoi') : t(locale,'contact.envoyer')}
                </button>
                {status === 'error' && <p style={{ fontSize:12, color:'#A32D2D', textAlign:'center' }}>{t(locale,'contact.error')}</p>}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Carte du domaine */}
      <DomaineMap cfg={cfg} locale={locale}/>
    </>
  )
}

function DomaineMap({ cfg, locale }: { cfg: Record<string,string>; locale: string }) {
  const loc = locale as import('@/lib/locale').Locale

  const lat = cfg.lat || '31.6295'
  const lng = cfg.lng || '-7.9811'

  const latN = parseFloat(lat)
  const lngN = parseFloat(lng)
  const delta = 0.012
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lngN-delta},${latN-delta},${lngN+delta},${latN+delta}&layer=mapnik&marker=${latN},${lngN}`
  const mapLink = `https://www.openstreetmap.org/?mlat=${latN}&mlon=${lngN}#map=14/${latN}/${lngN}`

  return (
    <section style={{ background:'#f0ece4' }}>
      <div style={{ maxWidth:1400, margin:'0 auto', padding:'52px 60px' }}>
        <div style={{ marginBottom:24 }}>
          <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>{t(loc,'contact.carte_badge')}</span>
          <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.8rem', color:'#13201A' }}>{t(loc,'contact.carte_titre')}</h2>
        </div>

        <div style={{ display:'flex', gap:20, alignItems:'flex-start' }}>
          {/* Map embed */}
          <div style={{ flex:1, border:'.5px solid rgba(195,200,195,.4)', overflow:'hidden', height:400, background:'#e8e4dc' }}>
            <iframe
              src={mapSrc}
              width="100%"
              height="400"
              style={{ border:0, display:'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation Haras Adham"
            />
          </div>

          {/* Panneau visite privée */}
          <div style={{ width:280, flexShrink:0, background:'#13201A', padding:'22px 20px', display:'flex', flexDirection:'column', gap:14 }}>
            <div>
              <div style={{ fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:8 }}>
                {t(loc,'contact.visite_privee')}
              </div>
              <div style={{ fontFamily:'Noto Serif,serif', fontSize:'1rem', color:'#fff', lineHeight:1.3, marginBottom:10 }}>
                {t(loc,'contact.rdv_titre')}
              </div>
              <p style={{ fontSize:11, color:'rgba(255,255,255,.55)', lineHeight:1.6, margin:0 }}>
                {t(loc,'contact.rdv_desc')}
              </p>
            </div>
            {cfg.tel && (
              <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', background:'rgba(255,255,255,.06)', borderLeft:'2px solid #B8943A' }}>
                <span style={{ fontFamily:'Material Symbols Outlined', color:'#B8943A', fontSize:16 }}>phone</span>
                <span style={{ fontSize:13, color:'#fff', fontFamily:'Plus Jakarta Sans,sans-serif', letterSpacing:'.02em' }}>{cfg.tel}</span>
              </div>
            )}
            <a href={cfg.tel ? `tel:${cfg.tel}` : 'tel:+212'}
              style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'11px 16px', background:'#B8943A', color:'#fff', textDecoration:'none', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', fontFamily:'Plus Jakarta Sans,sans-serif' }}>
              <span style={{ fontFamily:'Material Symbols Outlined', fontSize:15 }}>phone</span>
              {t(loc,'contact.appeler')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
