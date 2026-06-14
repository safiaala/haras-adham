import { Section } from '@/lib/sections'
import Link from 'next/link'

function Btn({ b }: { b: { texte: string; href: string; style?: string } }) {
  const cls = b.style === 'gold' ? 'btn-gold' : b.style === 'outline' ? 'btn-outline' : b.style === 'ghost'
    ? 'border border-white/30 text-white/80 px-5 py-2.5 text-xs tracking-widest uppercase font-sans'
    : 'btn-dark'
  return <Link href={b.href} className={cls} style={{ textDecoration:'none' }}>{b.texte}</Link>
}

export default function SectionRenderer({ s }: { s: Section }) {
  const { data } = s

  if (!s.actif) return null

  switch (s.type) {

    case 'hero':
      return (
        <section style={{ position:'relative', minHeight:'90vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
          {data.image && (
            <div style={{ position:'absolute', inset:0 }}>
              <img src={data.image} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(19,32,26,.85),rgba(19,32,26,.4) 55%,transparent)' }}/>
            </div>
          )}
          <div style={{ position:'relative', zIndex:5, padding:'0 60px', maxWidth:800 }}>
            {data.badge && <span style={{ fontSize:10, letterSpacing:'.3em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:14 }}>{data.badge}</span>}
            {data.titre && <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:'clamp(2.6rem,5.5vw,5rem)', color:'#fff', lineHeight:1.05, fontStyle:'italic', marginBottom:20 }} dangerouslySetInnerHTML={{ __html: data.titre }}/>}
            {data.soustitre && <p style={{ color:'rgba(255,255,255,.76)', fontSize:15, maxWidth:480, lineHeight:1.8, marginBottom:28, fontWeight:300 }}>{data.soustitre}</p>}
            {data.boutons && data.boutons.length > 0 && (
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                {data.boutons.map((b, i) => <Btn key={i} b={b}/>)}
              </div>
            )}
          </div>
        </section>
      )

    case 'texte_image': {
      const isLeft = data.position !== 'droite'
      const textBlock = (
        <div style={{ padding:'50px 60px', display:'flex', flexDirection:'column', justifyContent:'center', background: data.fond || '#fbf9f5' }}>
          {data.badge && <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:8 }}>{data.badge}</span>}
          {data.titre && <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'2rem', color:'#13201A', lineHeight:1.2, marginBottom:16 }}>{data.titre}</h2>}
          {data.texte && <p style={{ fontSize:13, color:'#6b6b6b', lineHeight:1.8, marginBottom:12 }}>{data.texte}</p>}
          {data.texte2 && <p style={{ fontSize:13, color:'#6b6b6b', lineHeight:1.8, marginBottom:22 }}>{data.texte2}</p>}
          {data.boutons && data.boutons.length > 0 && (
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              {data.boutons.map((b, i) => <Btn key={i} b={b}/>)}
            </div>
          )}
        </div>
      )
      const imgBlock = data.image
        ? <img src={data.image} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', minHeight:350 }}/>
        : <div style={{ background:'#f0ece4', minHeight:350, display:'flex', alignItems:'center', justifyContent:'center', fontSize:48 }}>🐴</div>

      return (
        <section style={{ display:'grid', gridTemplateColumns:'1fr 1fr' }}>
          {isLeft ? <>{textBlock}{imgBlock}</> : <>{imgBlock}{textBlock}</>}
        </section>
      )
    }

    case 'stats':
      return (
        <div style={{ background: data.fond || '#f0ece4', borderBottom:'.5px solid rgba(195,200,195,.3)' }}>
          <div style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:`repeat(${(data.stats||[]).length},1fr)` }}>
            {(data.stats || []).map((s, i) => (
              <div key={i} style={{ textAlign:'center', padding:'20px 10px', borderRight: i < (data.stats||[]).length-1 ? '.5px solid rgba(195,200,195,.3)' : 'none' }}>
                <div style={{ fontFamily:'Noto Serif,serif', fontSize:'2.2rem', color:'#B8943A', lineHeight:1 }}>{s.nombre}</div>
                <div style={{ fontSize:'8.5px', letterSpacing:'.18em', textTransform:'uppercase', color:'#888', marginTop:3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'cards':
      return (
        <section style={{ background: data.fond || '#f0ece4', padding:'60px 60px' }}>
          <div style={{ maxWidth:1400, margin:'0 auto' }}>
            {(data.badge || data.titre) && (
              <div style={{ marginBottom:32 }}>
                {data.badge && <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>{data.badge}</span>}
                {data.titre && <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'2rem', color:'#13201A' }}>{data.titre}</h2>}
              </div>
            )}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16 }}>
              {(data.cards || []).map((c, i) => (
                <div key={i} style={{ background: c.fond==='dark' ? '#13201A' : c.fond==='gold' ? '#B8943A' : '#fff', padding:'24px 20px', border: c.fond==='white' ? '.5px solid rgba(195,200,195,.3)' : 'none' }}>
                  {c.icone && (
                    <div style={{ width:38, height:38, borderRadius:'50%', border:'.5px solid rgba(184,148,58,.35)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                      <span style={{ fontFamily:'Material Symbols Outlined', color:'#B8943A', fontSize:18 }}>{c.icone}</span>
                    </div>
                  )}
                  <h3 style={{ fontFamily:'Noto Serif,serif', fontSize:16, marginBottom:7, color: c.fond==='dark' ? '#fff' : '#13201A' }}>{c.titre}</h3>
                  <p style={{ fontSize:11, color: c.fond==='dark' ? 'rgba(255,255,255,.55)' : c.fond==='gold' ? 'rgba(255,255,255,.8)' : '#6b6b6b', lineHeight:1.7 }}>{c.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    case 'temoignages':
      return (
        <section style={{ background: data.fond || '#13201A', padding:60 }}>
          <div style={{ maxWidth:1400, margin:'0 auto' }}>
            {(data.badge || data.titre) && (
              <div style={{ textAlign:'center', marginBottom:36 }}>
                {data.badge && <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>{data.badge}</span>}
                {data.titre && <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.9rem', color:'#fff' }}>{data.titre}</h2>}
              </div>
            )}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20 }}>
              {(data.temoignages || []).map((t, i) => (
                <div key={i} style={{ background:'rgba(255,255,255,.04)', borderTop:'2px solid #B8943A', padding:'24px 20px' }}>
                  <p style={{ color:'rgba(255,255,255,.62)', fontSize:12, lineHeight:1.8, fontStyle:'italic', marginBottom:16 }}>{t.texte}</p>
                  <div style={{ fontFamily:'Noto Serif,serif', color:'#fff', fontSize:13 }}>{t.nom}</div>
                  <div style={{ fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'#B8943A', marginTop:2 }}>{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    case 'cta':
      return (
        <section style={{ background: data.fond || '#f0ece4', padding:60, textAlign:'center' }}>
          {data.badge && <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:8 }}>{data.badge}</span>}
          {data.titre && <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'2rem', fontStyle:'italic', color:'#13201A', marginBottom:12 }}>{data.titre}</h2>}
          {data.texte && <p style={{ fontSize:13, color:'#6b6b6b', maxWidth:460, margin:'0 auto 24px', lineHeight:1.8 }}>{data.texte}</p>}
          {data.lien && <Btn b={data.lien}/>}
        </section>
      )

    case 'faq':
      return (
        <section style={{ padding:'55px 60px', background: data.fond || '#f0ece4' }}>
          <div style={{ maxWidth:760, margin:'0 auto' }}>
            {(data.badge || data.titre) && (
              <div style={{ textAlign:'center', marginBottom:28 }}>
                {data.badge && <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>{data.badge}</span>}
                {data.titre && <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.9rem', color:'#13201A' }}>{data.titre}</h2>}
              </div>
            )}
            {(data.faq || []).map((f, i) => (
              <details key={i} style={{ borderBottom:'.5px solid rgba(195,200,195,.35)' }}>
                <summary style={{ fontFamily:'Noto Serif,serif', fontSize:15, padding:'13px 0', cursor:'pointer', listStyle:'none', display:'flex', justifyContent:'space-between', alignItems:'center', color:'#13201A' }}>
                  {f.question}<span style={{ color:'#B8943A', fontSize:12, flexShrink:0, marginLeft:10 }}>▾</span>
                </summary>
                <p style={{ padding:'0 0 13px', fontSize:13, color:'#6b6b6b', lineHeight:1.7 }}>{f.reponse}</p>
              </details>
            ))}
          </div>
        </section>
      )

    case 'galerie':
      return (
        <section style={{ padding:'55px 60px', background: data.fond || '#fbf9f5' }}>
          <div style={{ maxWidth:1400, margin:'0 auto' }}>
            {data.titre && <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.9rem', color:'#13201A', marginBottom:28, textAlign:'center' }}>{data.titre}</h2>}
            {(data.images || []).length > 0 ? (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:8 }}>
                {(data.images || []).map((img, i) => (
                  <div key={i} style={{ overflow:'hidden', height:160 }}>
                    <img src={img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign:'center', color:'#888', fontSize:13, fontStyle:'italic' }}>Aucune image dans cette galerie.</div>
            )}
          </div>
        </section>
      )

    case 'texte':
      return (
        <section style={{ padding:'55px 60px', background: data.fond || '#fbf9f5' }}>
          <div style={{ maxWidth:800, margin:'0 auto' }}>
            {data.badge && <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:10 }}>{data.badge}</span>}
            {data.titre && <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.9rem', color:'#13201A', marginBottom:18 }}>{data.titre}</h2>}
            {data.texte && <p style={{ fontSize:14, color:'#6b6b6b', lineHeight:1.9, whiteSpace:'pre-wrap' }}>{data.texte}</p>}
          </div>
        </section>
      )

    default:
      return null
  }
}
