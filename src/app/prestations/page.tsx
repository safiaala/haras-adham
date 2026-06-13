import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

async function getConfig() {
  const { data } = await supabase.from('config').select('*')
  const map: Record<string,string> = {}
  if (data) data.forEach(r => { map[r.cle] = r.valeur })
  return map
}

const defaultImg: Record<string,string> = {
  pvente: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAptJR_8fTXy3rDmHr9AaLJUfZ3xI1pF_SzYVZtfT5ObmuUKnmpxe84_Wu-bJvTf5myeZMNQsN1Qk9sPZeKS-xLUF8LEs8rBA2U1Kb7J0vDDgmhRh2HtVPe0jeNTLAsdLSOeRegsXTBmeURydPPPuofn2HekhE9sxbKF3A-ASZLaRQspF5zhPlzXn1yr9jUjfUAdesFiaWGRoQEs-D10F-FqywLTf-7gI84AkjFnESUSctlSTxzP5U4jcFIjyrZolYXhwmVjnQ2JzDK',
  ppens: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqM16smGlXd1RU6bFo58nWrIrLwTLMmSD-PGpcrnnmDh41WZa2q81XruAlp_2jyoVx0whn-jmCKteq__S_6TkU0nAq6XlNHlGjMQdq8s9uTHcuvwNoqBLaOXo53Gy33hqYPQH-WToSNT8hcFlbHlZbvacZ7jNRT6ESS0XlZUEfeEuln20DDMncC99ghxsmllfTk9emUuCM6W3hO_dcT7gAzxPmZKy7JdYSNWsQGfzCeoSoWxRcewgNdB4lnbn12Bp-NuAyVmIctgKK',
  pens: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2NVAICZ7oqJhye1KTR28lE5XJ2Eley-P5pI0bcQyDvI877-lWZ2d0RRqQ71Rmme68NEILxGX9W38K2wd7tz2iP7YZAvebprE9WK0rcyJFw0kOZacJxMlpNZ3qXmbTYHnR230iS7rNLmpcz_41gZIMKQG9Rp8GZAshT0wnZih_TjvP63dhiS2IMQ_ojdIjx7wE3Jl32tQRB2qBatXIo6x8QRyBPAm847ssE_rPalJyUHMl7eJFnGRTAJ40vVHCgtTEeXAeuU9NZ9kB',
  pcomp: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx-knZ_C0_Sy5CkOt5oWY9xDKqPmewCDS2d5SZ_Dk8GsLFM31Ms88oezeZQLV2S94r3gfIq4BLd-O1YB9B4vbj5CJbqI9j6_R0cTFpe_hopMaiw9Ff5HxTjehSpwIoA4_GzEMdn-KML2uh3_iBwDU23TiNl-shbWWTQ90Ssv-BLR9nMwzuB3Qyyzn8nC69zYtpe_ys1F7E0bnr2YnRjZEkZUl2VSFEBiNOHJy4-AUHCczmCm-1IvG9u0AA6zkkp4Xuo7aYUJfgJJaZ',
  prepro: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPJrHgNeV-Hy5TkRKGfcDUsh0hFitwygsNUY4Qq2JNwCuH6oIsNsT-1JlaEtenGdDoUoMGYCoimueBOBJ1Hj-Imqw6lt5_8f9lZ9NS4QHPjG_Pg5znuSJAPfMHeJOh0yNGz0zGV2wxsbWtbypmw_LBzJinIZTVzmZ5K9uwsVbDH9SW0mponXjwbFwLKNCZJOIRDcZ1MVaepPYWjYbRgXrvgn8CKR_3VUDKz7oHwcbc36bIH_6di7PA4YkNbE-T9iJ8-vyYCX6cd_Ft',
}

export default async function PrestationsPage() {
  const cfg = await getConfig()

  const img = (key: string) => cfg[`${key}_photo`] || defaultImg[key] || ''

  return (
    <>
      <section style={{ background:'#13201A', padding:'65px 60px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:8 }}>Excellence Équestre</span>
          <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:'clamp(2.2rem,4vw,3.5rem)', color:'#fff', lineHeight:1.1, marginBottom:14 }}>{"L'Accompagnement de Prestige"}</h1>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.6)', maxWidth:560, lineHeight:1.8 }}>Expertise héritée du passé, tournée vers l&apos;avenir. Gamme complète de services pour l&apos;épanouissement de l&apos;athlète et le plaisir du cavalier.</p>
        </div>
      </section>

      {/* VENTE */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:420 }}>
        <div style={{ padding:'50px 60px', display:'flex', flexDirection:'column', justifyContent:'center', background:'#fbf9f5' }}>
          <span style={{ fontSize:10, letterSpacing:'.26em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:7 }}>{cfg.pvente_badge || 'Acquisition & Courtage'}</span>
          <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.9rem', color:'#13201A', marginBottom:13 }}>{cfg.pvente_titre || 'Vente'}</h2>
          <p style={{ fontSize:12, color:'#6b6b6b', lineHeight:1.8, marginBottom:16 }}>{cfg.pvente_desc || ''}</p>
          <ul style={{ listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:7, marginBottom:18 }}>
            {['Sélection rigoureuse pedigree, tempérament, performances','Essais personnalisés 48h–72h sur nos installations','Bilan vétérinaire, passeport, transport sécurisé inclus','Suivi post-achat à 3 et 6 mois'].map(item => (
              <li key={item} style={{ display:'flex', gap:8, fontSize:11, color:'#6b6b6b' }}><span style={{ color:'#B8943A' }}>→</span>{item}</li>
            ))}
          </ul>
          <Link href="/chevaux" className="btn-dark" style={{ alignSelf:'flex-start' }}>Consulter le catalogue →</Link>
        </div>
        <img src={img('pvente')} alt="Vente" style={{ width:'100%', objectFit:'cover', minHeight:300 }}/>
      </div>

      {/* PENSION */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:420 }}>
        <img src={img('ppens')} alt="Pension" style={{ width:'100%', objectFit:'cover', minHeight:300 }}/>
        <div style={{ padding:'50px 60px', display:'flex', flexDirection:'column', justifyContent:'center', background:'#f0ece4' }}>
          <span style={{ fontSize:10, letterSpacing:'.26em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:7 }}>{cfg.ppens_badge || 'Sérénité & Confort'}</span>
          <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.9rem', color:'#13201A', marginBottom:13 }}>{cfg.ppens_titre || 'Pension'}</h2>
          <p style={{ fontSize:12, color:'#6b6b6b', lineHeight:1.8, marginBottom:16 }}>{cfg.ppens_desc || ''}</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9, marginBottom:18 }}>
            {[['Boxes','4×4m, curage quotidien'],['Suivi','Vétérinaire partenaire']].map(([k,v]) => (
              <div key={k} style={{ background:'#fff', padding:'10px 12px', border:'.5px solid rgba(195,200,195,.35)' }}>
                <div style={{ fontSize:'8.5px', textTransform:'uppercase', letterSpacing:'.12em', color:'#B8943A', marginBottom:3 }}>{k}</div>
                <div style={{ fontSize:11, color:'#6b6b6b' }}>{v}</div>
              </div>
            ))}
          </div>
          <Link href="/contact" className="btn-dark" style={{ alignSelf:'flex-start' }}>Demander les tarifs →</Link>
        </div>
      </div>

      {/* ENSEIGNEMENT & COMPETITION */}
      <div style={{ padding:'55px 60px', background:'#fff' }}>
        <div style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
          {[
            { key:'pens',  cta:'Réserver un cours' },
            { key:'pcomp', cta:'Nous rejoindre' },
          ].map(s => (
            <div key={s.key} style={{ border:'.5px solid rgba(195,200,195,.35)', padding:28 }}>
              <img src={img(s.key)} alt={cfg[`${s.key}_titre`]} style={{ width:'100%', height:180, objectFit:'cover', marginBottom:16 }}/>
              <span style={{ fontSize:'9.5px', letterSpacing:'.22em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>{cfg[`${s.key}_badge`]}</span>
              <h3 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.5rem', color:'#13201A', marginBottom:10 }}>{cfg[`${s.key}_titre`]}</h3>
              <p style={{ fontSize:11, color:'#6b6b6b', lineHeight:1.7, marginBottom:13 }}>{cfg[`${s.key}_desc`]}</p>
              <Link href="/contact" className="btn-outline">{s.cta}</Link>
            </div>
          ))}
        </div>
      </div>

      {/* REPRODUCTION */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:380 }}>
        <div style={{ padding:'50px 60px', display:'flex', flexDirection:'column', justifyContent:'center', background:'#fbf9f5' }}>
          <span style={{ fontSize:10, letterSpacing:'.26em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:7 }}>{cfg.prepro_badge || 'Génétique & Futur'}</span>
          <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.9rem', color:'#13201A', marginBottom:13 }}>{cfg.prepro_titre || 'Reproduction'}</h2>
          <p style={{ fontSize:12, color:'#6b6b6b', lineHeight:1.8, marginBottom:14 }}>{cfg.prepro_desc || ''}</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:18 }}>
            {[['tag-green','Monte Naturelle'],['tag-blue','IAF disponible'],['tag-amber','IAC Export'],['tag-purple','Transfert embryon']].map(([cls,label]) => (
              <span key={label} className={`tag ${cls}`}>{label}</span>
            ))}
          </div>
          <Link href="/etalons" className="btn-dark" style={{ alignSelf:'flex-start' }}>Catalogue Étalons →</Link>
        </div>
        <img src={img('prepro')} alt="Reproduction" style={{ width:'100%', objectFit:'cover', minHeight:280 }}/>
      </div>

      {/* FAQ */}
      <section style={{ padding:'55px 60px', background:'#f0ece4' }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:28 }}>
            <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>Vos questions</span>
            <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.9rem', color:'#13201A' }}>FAQ</h2>
          </div>
          {[
            ['Puis-je essayer un cheval sur plusieurs jours ?','Oui — forfait "Découverte" 48–72h avec essai dans différentes configurations. Hébergement partenaire disponible.'],
            ['Quel suivi vétérinaire est inclus en pension ?','Contrôle visuel quotidien, gestion des soins programmés (ferrage, vermifugation, vaccins). Accès prioritaire à notre clinique équine partenaire.'],
            ['Y a-t-il des pensions "travail" pour la compétition ?','Oui, programme sur mesure selon objectif. Tarif sur devis selon niveau de travail souhaité.'],
            ['Comment se passe une consultation génétique ?','Rendez-vous de 30 min gratuit. Nos experts analysent le pedigree et proposent 2–3 étalons compatibles.'],
            ['Les visites sont-elles possibles pour les particuliers ?','Sur rendez-vous uniquement (lun–sam, 9h–17h). Visite guidée de 90 minutes avec nos experts.'],
          ].map(([q,a]) => (
            <details key={q} style={{ borderBottom:'.5px solid rgba(195,200,195,.35)' }}>
              <summary style={{ fontFamily:'Noto Serif,serif', fontSize:15, padding:'13px 0', cursor:'pointer', listStyle:'none', display:'flex', justifyContent:'space-between', alignItems:'center', color:'#13201A' }}>
                {q}<span style={{ color:'#B8943A', fontSize:12, flexShrink:0, marginLeft:10 }}>▾</span>
              </summary>
              <p style={{ padding:'0 0 13px', fontSize:13, color:'#6b6b6b', lineHeight:1.7 }}>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
