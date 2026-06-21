'use client'
import { useState, useEffect } from 'react'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'
import { supabase } from '@/lib/supabase'

function CopyBtn({ value, locale }: { value: string; locale: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const label = copied
    ? (locale==='en' ? 'Copied!' : locale==='es' ? '¡Copiado!' : locale==='ar' ? 'تم النسخ!' : 'Copié !')
    : (locale==='en' ? 'Copy' : locale==='es' ? 'Copiar' : locale==='ar' ? 'نسخ' : 'Copier')
  return (
    <button onClick={copy} title={label} style={{ background:'transparent', border:'none', cursor:'pointer', color: copied ? '#3B6D11' : '#B8943A', padding:0, display:'flex', alignItems:'center' }}>
      <span style={{ fontFamily:'Material Symbols Outlined', fontSize:16 }}>{copied ? 'check' : 'content_copy'}</span>
    </button>
  )
}

export default function ContactPage() {
  const locale = useLocale()
  const [form, setForm] = useState({ nom:'', email:'', tel:'', sujet:'', message:'' })
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
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(form) })
      setStatus(res.ok ? 'ok' : 'error')
    } catch { setStatus('error') }
  }

  const sujets = ['opt1','opt2'].map(k => t(locale, `contact.sujet.${k}`))

  const infos = [
    { icon:'location_on', key:'contact.addr', val: cfg.addr || '', sub: t(locale,'contact.country') },
    { icon:'phone',       key:'contact.tel',  val: cfg.tel  || 'À compléter' },
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
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <a href="https://www.youtube.com/@harasadham1227" target="_blank" rel="noreferrer"
                style={{ display:'flex', alignItems:'center', gap:7, fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A', textDecoration:'none', border:'.5px solid rgba(184,148,58,.35)', padding:'7px 13px' }}>
                <span style={{ fontFamily:'Material Symbols Outlined', fontSize:16 }}>play_circle</span>YouTube
              </a>
                      <a href={cfg.social_instagram || 'https://www.instagram.com/haras.adham.maroc/'} target="_blank" rel="noreferrer"
                style={{ display:'flex', alignItems:'center', gap:7, fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A', textDecoration:'none', border:'.5px solid rgba(184,148,58,.35)', padding:'7px 13px' }}>
                <span style={{ fontFamily:'Material Symbols Outlined', fontSize:16 }}>photo_camera</span>Instagram
              </a>
            </div>
          </div>

          <div style={{ background:'#fbf9f5', padding:32 }}>
            {status === 'ok' ? (
              <div style={{ textAlign:'center', padding:40 }}>
                <div style={{ width:60, height:60, borderRadius:'50%', background:'#EAF3DE', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:26 }}>✓</div>
                <div style={{ fontFamily:'Noto Serif,serif', fontSize:20, color:'#13201A', marginBottom:12 }}>{t(locale,'contact.ok')}</div>
                <p style={{ fontSize:13, color:'#6b6b6b', lineHeight:1.8, maxWidth:320, margin:'0 auto 20px' }}>{t(locale,'contact.ok.desc')}</p>
                <button onClick={() => setStatus('idle')} className="btn-outline" style={{ fontSize:10 }}>
                  {locale === 'ar' ? 'إرسال رسالة أخرى' : locale === 'es' ? 'Enviar otro mensaje' : locale === 'en' ? 'Send another message' : 'Envoyer un autre message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  {[['nom','contact.nom','text'],['email','contact.email','email']].map(([k,lk,tp]) => (
                    <div key={k}>
                      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{t(locale,lk)}</label>
                      <input type={tp} required value={form[k as keyof typeof form]} onChange={e => setForm({...form,[k]:e.target.value})}
                        style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff' }}/>
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{t(locale,'contact.tel')}</label>
                  <input type="tel" value={form.tel} onChange={e => setForm({...form,tel:e.target.value})}
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff' }}/>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{t(locale,'contact.sujet')}</label>
                  <select value={form.sujet} onChange={e => setForm({...form,sujet:e.target.value})} required
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff' }}>
                    <option value="">—</option>
                    {sujets.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{t(locale,'contact.message')}</label>
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
  const labels: Record<string, { titre: string; badge: string; acces: string; rdv: string }> = {
    fr: { titre:'Localiser le Domaine', badge:'Accès & Itinéraire', acces:'Comment venir', rdv:'Prendre rendez-vous →' },
    en: { titre:'Find the Estate',      badge:'Access & Directions',  acces:'Getting here', rdv:'Book an appointment →' },
    es: { titre:'Localizar el Dominio', badge:'Acceso & Ruta',        acces:'Cómo llegar',  rdv:'Reservar una cita →' },
    ar: { titre:'تحديد موقع الضيعة',    badge:'الوصول والاتجاهات',    acces:'كيفية الوصول', rdv:'حجز موعد →' },
  }
  const l = labels[locale] || labels.fr

  const lat  = cfg.lat  || '31.6295'
  const lng  = cfg.lng  || '-7.9811'
  const addr = cfg.addr || 'Haras Adham, Maroc'

  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed&hl=${locale}`

  return (
    <section style={{ background:'#f0ece4' }}>
      <div style={{ maxWidth:1400, margin:'0 auto', padding:'52px 60px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:24, flexWrap:'wrap', gap:12 }}>
          <div>
            <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>{l.badge}</span>
            <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.8rem', color:'#13201A' }}>{l.titre}</h2>
          </div>
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`} target="_blank" rel="noreferrer"
            style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', padding:'10px 20px', background:'#13201A', color:'#fff', textDecoration:'none', fontFamily:'Plus Jakarta Sans,sans-serif', whiteSpace:'nowrap' }}>
            🧭 {l.rdv}
          </a>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:20, alignItems:'start' }}>
          {/* Map embed */}
          <div style={{ border:'.5px solid rgba(195,200,195,.4)', overflow:'hidden', height:400, position:'relative', background:'#e8e4dc' }}>
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

          {/* Infos accès */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', padding:'18px 20px' }}>
              <div style={{ fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'#B8943A', marginBottom:10 }}>{l.acces}</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {addr && (
                  <div style={{ display:'flex', gap:10, alignItems:'start', fontSize:12, color:'#4a4a3a', lineHeight:1.6 }}>
                    <span style={{ fontFamily:'Material Symbols Outlined', color:'#B8943A', fontSize:16, flexShrink:0, marginTop:1 }}>location_on</span>
                    <span>{addr}</span>
                  </div>
                )}
                {cfg.tel && (
                  <div style={{ display:'flex', gap:10, alignItems:'center', fontSize:12, color:'#4a4a3a' }}>
                    <span style={{ fontFamily:'Material Symbols Outlined', color:'#B8943A', fontSize:16, flexShrink:0 }}>phone</span>
                    <a href={`tel:${cfg.tel}`} style={{ color:'#4a4a3a', textDecoration:'none' }}>{cfg.tel}</a>
                  </div>
                )}
                <div style={{ display:'flex', gap:10, alignItems:'center', fontSize:12, color:'#4a4a3a' }}>
                  <span style={{ fontFamily:'Material Symbols Outlined', color:'#B8943A', fontSize:16, flexShrink:0 }}>schedule</span>
                  <span>{locale === 'ar' ? 'الإثنين–السبت 9ص–5م' : locale === 'es' ? 'Lun–Sáb 9h–17h' : locale === 'en' ? 'Mon–Sat 9am–5pm' : 'Lun–Sam 9h–17h'}</span>
                </div>
              </div>
            </div>

            <div style={{ background:'#13201A', padding:'18px 20px' }}>
              <div style={{ fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:8 }}>
                {locale === 'ar' ? 'زيارة خاصة' : locale === 'es' ? 'Visita privada' : locale === 'en' ? 'Private visit' : 'Visite privée'}
              </div>
              <p style={{ fontSize:11, color:'rgba(255,255,255,.65)', lineHeight:1.7, margin:'0 0 14px' }}>
                {locale === 'ar' ? 'نرحب بكم لزيارة الضيعة بموعد مسبق.' : locale === 'es' ? 'Le damos la bienvenida para una visita privada del dominio, con cita previa.' : locale === 'en' ? 'We welcome you for a private visit to the estate by appointment.' : 'Nous vous accueillons pour une visite privée du domaine sur rendez-vous.'}
              </p>
              <a href="mailto:contact@harasadham.ma"
                style={{ fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A', textDecoration:'none' }}>
                {locale === 'ar' ? 'اتصل بنا →' : locale === 'es' ? 'Contáctenos →' : locale === 'en' ? 'Contact us →' : 'Nous contacter →'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
