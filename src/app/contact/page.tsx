'use client'
import { useState } from 'react'

export default function ContactPage() {
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

  return (
    <>
      <section style={{ background:'#13201A', padding:'65px 60px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'start' }}>
          <div>
            <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:8 }}>Nous rejoindre</span>
            <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:'clamp(2.2rem,4vw,3.5rem)', color:'#fff', lineHeight:1.1, marginBottom:18 }}>Contactez-nous</h1>
            <p style={{ fontSize:13, color:'rgba(255,255,255,.58)', lineHeight:1.8, marginBottom:28 }}>Cavalier, éleveur ou passionné — notre équipe se tient à votre disposition du lundi au samedi.</p>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {[
                { icon:'location_on', label:'Adresse', value:'Maroc' },
                { icon:'phone', label:'Téléphone', value:'À compléter' },
                { icon:'mail', label:'Email', value:'contact@harasadham.ma' },
                { icon:'schedule', label:'Horaires', value:'Lun–Sam 9h–17h' },
              ].map(c => (
                <div key={c.label} style={{ display:'flex', gap:12, alignItems:'start' }}>
                  <span style={{ fontFamily:'Material Symbols Outlined', color:'#B8943A', flexShrink:0, marginTop:1 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(255,255,255,.38)', marginBottom:2 }}>{c.label}</div>
                    <div style={{ color:'rgba(255,255,255,.78)', fontSize:12 }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <a href="https://www.youtube.com/@harasadham1227" target="_blank" rel="noreferrer" style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A', textDecoration:'none' }}>YouTube →</a>
              <a href="https://www.instagram.com/haras.adham.maroc/" target="_blank" rel="noreferrer" style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A', textDecoration:'none' }}>Instagram →</a>
            </div>
          </div>

          {/* FORMULAIRE */}
          <div style={{ background:'#fbf9f5', padding:32 }}>
            {status === 'ok' ? (
              <div style={{ textAlign:'center', padding:40 }}>
                <div style={{ fontSize:32, marginBottom:12 }}>✓</div>
                <div style={{ fontFamily:'Noto Serif,serif', fontSize:18, color:'#13201A', marginBottom:8 }}>Message envoyé !</div>
                <p style={{ fontSize:13, color:'#6b6b6b' }}>Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  {[['nom','Nom complet','text'],['email','Email','email']].map(([k,p,t]) => (
                    <div key={k}>
                      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{p}</label>
                      <input type={t} required value={form[k as keyof typeof form]} onChange={e => setForm({...form,[k]:e.target.value})}
                        style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff' }}/>
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Sujet</label>
                  <select value={form.sujet} onChange={e => setForm({...form,sujet:e.target.value})} required
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff' }}>
                    <option value="">Choisir...</option>
                    {['Achat / Vente','Pension','Enseignement','Compétition','Reproduction','Visite du haras','Autre'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                    style={{ width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff', resize:'vertical' }}/>
                </div>
                <button type="submit" disabled={status==='sending'} className="btn-dark" style={{ width:'100%', textAlign:'center' }}>
                  {status === 'sending' ? 'Envoi...' : 'Envoyer le message'}
                </button>
                {status === 'error' && <p style={{ fontSize:12, color:'#A32D2D', textAlign:'center' }}>Une erreur est survenue. Réessayez ou écrivez-nous directement.</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
