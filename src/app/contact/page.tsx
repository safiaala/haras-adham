'use client'
import { useState } from 'react'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'

export default function ContactPage() {
  const locale = useLocale()
  const [form, setForm] = useState({ nom:'', email:'', sujet:'', message:'' })
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(form) })
      setStatus(res.ok ? 'ok' : 'error')
    } catch { setStatus('error') }
  }

  const sujets = ['opt1','opt2','opt3','opt4','opt5','opt6','opt7'].map(k => t(locale, `contact.sujet.${k}`))

  return (
    <>
      <section style={{ background:'#13201A', padding:'65px 60px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'start' }}>
          <div>
            <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:8 }}>{t(locale,'contact.badge')}</span>
            <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:'clamp(2.2rem,4vw,3.5rem)', color:'#fff', lineHeight:1.1, marginBottom:18 }}>{t(locale,'contact.title')}</h1>
            <p style={{ fontSize:13, color:'rgba(255,255,255,.58)', lineHeight:1.8, marginBottom:28 }}>{t(locale,'contact.desc')}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {[
                { icon:'location_on', key:'contact.addr', val:'Maroc' },
                { icon:'phone',       key:'contact.tel',  val:'À compléter' },
                { icon:'mail',        key:'contact.email',val:'contact@harasadham.ma' },
                { icon:'schedule',    key:'contact.horaires', val:t(locale,'contact.horaires.val') },
              ].map(c => (
                <div key={c.key} style={{ display:'flex', gap:12, alignItems:'start' }}>
                  <span style={{ fontFamily:'Material Symbols Outlined', color:'#B8943A', flexShrink:0, marginTop:1 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(255,255,255,.38)', marginBottom:2 }}>{t(locale,c.key)}</div>
                    <div style={{ color:'rgba(255,255,255,.78)', fontSize:12 }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <a href="https://www.youtube.com/@harasadham1227" target="_blank" rel="noreferrer" style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A', textDecoration:'none' }}>YouTube →</a>
              <a href="https://www.instagram.com/haras.adham.maroc/" target="_blank" rel="noreferrer" style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A', textDecoration:'none' }}>Instagram →</a>
            </div>
          </div>

          <div style={{ background:'#fbf9f5', padding:32 }}>
            {status === 'ok' ? (
              <div style={{ textAlign:'center', padding:40 }}>
                <div style={{ fontSize:32, marginBottom:12 }}>✓</div>
                <div style={{ fontFamily:'Noto Serif,serif', fontSize:18, color:'#13201A', marginBottom:8 }}>{t(locale,'contact.ok')}</div>
                <p style={{ fontSize:13, color:'#6b6b6b' }}>{t(locale,'contact.ok.desc')}</p>
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
    </>
  )
}
