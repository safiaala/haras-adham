import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Cheval } from '@/lib/types'

async function getChevaux(): Promise<Cheval[]> {
  const { data } = await supabase.from('chevaux').select('*').eq('en_vedette', true).limit(4)
  return data || []
}

const disciplineLabel: Record<string, string> = {
  cso: 'CSO', dressage: 'Dressage', endurance: 'Endurance', tbourida: 'Tbourida', poulain: 'Poulain'
}

export default async function HomePage() {
  const chevaux = await getChevaux()

  return (
    <>
      {/* HERO */}
      <section style={{ position:'relative', minHeight:'90vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0 }}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz21PkHa_pgRKYUvrZ1YpubpDD5UXf8ptpllZzgu821OgPBHCZrWV8hk4DFo7b2b2adp08bz1cmXT-7WdktTUMSpdFvmT9EIQtYhxmwnSX6OeaUz416RVf2Unvr6WNQ20Htx9w78mrBncLmHqMqVfWt7WauStImKD6cQ7e-_7HokbvkKW1tzyU8T9unDGXRQzMsTNPwQwUp6TcTBhm9VU-YqaKJljAWmqM5NRkh-hc4-T8E8MoChUq1ROuEo1eTI42zRL8vrCxAoo4" alt="Hero" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(12%)' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(19,32,26,.85),rgba(19,32,26,.4) 55%,transparent)' }}/>
        </div>
        <div style={{ position:'relative', zIndex:5, padding:'0 60px', maxWidth:800 }}>
          <span style={{ fontSize:10, letterSpacing:'.3em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:14 }}>L'Excellence du Cheval Barbe</span>
          <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:'clamp(2.6rem,5.5vw,5rem)', color:'#fff', lineHeight:1.05, fontStyle:'italic', marginBottom:20 }}>
            Passion du cheval,<br/><span style={{ fontStyle:'normal', color:'#B8943A' }}>art de l'élevage.</span>
          </h1>
          <p style={{ color:'rgba(255,255,255,.76)', fontSize:15, maxWidth:480, lineHeight:1.8, marginBottom:28, fontWeight:300 }}>
            Au cœur du domaine Adham, nous cultivons l'héritage vivant de la noblesse équine marocaine.
          </p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link href="/chevaux" className="btn-gold">Voir nos chevaux</Link>
            <Link href="/etalons" style={{ border:'.5px solid rgba(255,255,255,.35)', color:'#fff', background:'transparent', padding:'10px 22px', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', textDecoration:'none', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Nos étalons</Link>
            <a href="https://www.youtube.com/@harasadham1227" target="_blank" rel="noreferrer" style={{ border:'.5px solid rgba(255,255,255,.3)', color:'rgba(255,255,255,.75)', background:'transparent', padding:'10px 22px', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', textDecoration:'none', fontFamily:'Plus Jakarta Sans,sans-serif' }}>▶ YouTube</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background:'#f0ece4', borderBottom:'.5px solid rgba(195,200,195,.3)' }}>
        <div style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          {[['45+','Chevaux'],['5','Prestations'],['12','Titres'],['30','Boxes']].map(([n,l],i) => (
            <div key={i} style={{ textAlign:'center', padding:'20px 10px', borderRight: i<3 ? '.5px solid rgba(195,200,195,.3)' : 'none' }}>
              <div style={{ fontFamily:'Noto Serif,serif', fontSize:'2.2rem', color:'#B8943A', lineHeight:1 }}>{n}</div>
              <div style={{ fontSize:'8.5px', letterSpacing:'.18em', textTransform:'uppercase', color:'#888', marginTop:3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* INTRO */}
      <section style={{ padding:'70px 60px', maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
        <div>
          <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:8 }}>Héritage Marocain</span>
          <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'2.2rem', color:'#13201A', lineHeight:1.2, marginBottom:16 }}>Le Cheval Barbe :<br/>L'essence de la fierté</h2>
          <p style={{ fontSize:13, color:'#6b6b6b', lineHeight:1.8, marginBottom:12 }}>Au Haras Adham, nous nous consacrons à la préservation de cette race emblématique. Notre programme de sélection rigoureux honore les caractéristiques ancestrales du Barbe : endurance légendaire, intelligence rare, proximité unique avec l'homme.</p>
          <p style={{ fontSize:13, color:'#6b6b6b', lineHeight:1.8, marginBottom:22 }}>Chaque naissance au haras est le fruit d'une réflexion profonde, mariant les lignées les plus prestigieuses pour faire perdurer l'art de l'élevage marocain.</p>
          <div style={{ display:'flex', gap:10 }}>
            <Link href="/histoire" className="btn-dark">Histoire du Barbe</Link>
            <Link href="/prestations" className="btn-outline">Nos prestations</Link>
          </div>
        </div>
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuArzLB5DbPnf4984A-wAIhf3zUJrHeG6bQh5jFHTbtWMmywGU-SQQZYBbV7HWbcgu-BJAAiCqeG4JArDMMzKb7kihCzk4UIk9oIL22lAkzy24DAV5NX7We1XZiXT_jFLMY7tLSoNu51vww3hOfTeQebxXOauUIXkDkEQiiS_1ZalM4h0cAZsrY4lIv8BFnkfTPGBv_Vm12hr7kR4BklxyBoYgqAEzsJl4HtXH1pCFM2NR7rI6FqGvU6DfGNf3I84nBYflQvWQ2p8dlt" alt="Barbe" style={{ width:'100%', height:350, objectFit:'cover' }}/>
      </section>

      {/* SERVICES */}
      <section style={{ background:'#f0ece4', padding:'60px 60px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:32, flexWrap:'wrap', gap:12 }}>
            <div>
              <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>Services de Prestige</span>
              <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'2rem', color:'#13201A' }}>Nos Prestations</h2>
            </div>
            <Link href="/prestations" className="btn-outline">Voir tout →</Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
            {[
              { icon:'handshake', titre:'Vente & Conseil', desc:'Accompagnement personnalisé dans l\'acquisition de vos futurs partenaires équins.', dark:false },
              { icon:'home_storage', titre:'Pension de Luxe', desc:'Boxes 4×4m, alimentation premium, sorties paddock. Rapport hebdomadaire photo inclus.', dark:true },
              { icon:'school', titre:'Enseignement', desc:'Cours individuels et stages avec cavaliers professionnels. Tous niveaux.', dark:false },
              { icon:'military_tech', titre:'Compétition', desc:'Préparation sportive, coaching et engagements en concours nationaux.', dark:false },
              { icon:'psychiatry', titre:'Reproduction', desc:'Saillie naturelle, IAF et IAC. Suivi poulinières, poulinage 24h/24.', dark:false },
            ].map((s,i) => (
              <div key={i} style={{ background: s.dark ? '#13201A' : '#fff', padding:'24px 20px', border: s.dark ? 'none' : '.5px solid rgba(195,200,195,.3)' }}>
                <div style={{ width:38, height:38, borderRadius:'50%', border:'.5px solid rgba(184,148,58,.35)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                  <span style={{ fontFamily:'Material Symbols Outlined', color:'#B8943A', fontSize:18 }}>{s.icon}</span>
                </div>
                <h3 style={{ fontFamily:'Noto Serif,serif', fontSize:16, marginBottom:7, color: s.dark ? '#fff' : '#13201A' }}>{s.titre}</h3>
                <p style={{ fontSize:11, color: s.dark ? 'rgba(255,255,255,.55)' : '#6b6b6b', lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
            <div style={{ background:'#B8943A', padding:'24px 20px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
              <div>
                <h3 style={{ fontFamily:'Noto Serif,serif', fontSize:16, marginBottom:7, color:'#fff' }}>Découvrez tout</h3>
                <p style={{ fontSize:11, color:'rgba(255,255,255,.8)', lineHeight:1.7 }}>Consultez l'intégralité de nos services et tarifs sur mesure.</p>
              </div>
              <Link href="/prestations" style={{ background:'#13201A', color:'#fff', border:'none', padding:'9px 16px', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', textDecoration:'none', marginTop:14, alignSelf:'flex-start', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Voir →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CHEVAUX EN VEDETTE */}
      {chevaux.length > 0 && (
        <section style={{ padding:'60px 60px', maxWidth:1400, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:28, flexWrap:'wrap', gap:12 }}>
            <div>
              <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>Notre Sélection</span>
              <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'2rem', color:'#13201A' }}>Quelques Chevaux</h2>
            </div>
            <Link href="/chevaux" className="btn-outline">Toute la collection →</Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
            {chevaux.map(c => (
              <div key={c.id} className="hcard">
                {c.photos?.[0] ? <img src={c.photos[0]} alt={c.nom} style={{ width:'100%', height:190, objectFit:'cover' }}/> : <div style={{ width:'100%', height:190, background:'#f0ece4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>🐴</div>}
                <div style={{ padding:'12px 14px' }}>
                  <div style={{ fontFamily:'Noto Serif,serif', fontSize:15, color:'#13201A', marginBottom:4 }}>{c.nom}</div>
                  <div style={{ fontSize:10, color:'#888' }}>{c.age} ans · {c.race}</div>
                  {c.discipline && <span className={`tag tag-blue`} style={{ marginTop:6 }}>{disciplineLabel[c.discipline] || c.discipline}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section style={{ background:'#13201A', padding:60 }}>
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>L'avis de nos clients</span>
            <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.9rem', color:'#fff' }}>Témoignages</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {[
              { text:'"Une structure d\'une qualité rare. Le Haras Adham ne se contente pas de loger les chevaux, il les comprend."', name:'Marie-Laure V.', role:'Propriétaire & Cavalière' },
              { text:'"Le suivi de la reproduction est exceptionnel. Ma poulinière a été entourée de soins constants, résultat magnifique."', name:'Jean-Baptiste R.', role:'Éleveur Sport' },
              { text:'"Transparence totale lors de l\'achat. L\'expertise génétique fournie était irréprochable."', name:'Alexander S.', role:'Cavalier CSO' },
            ].map((t,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,.04)', borderTop:'2px solid #B8943A', padding:'24px 20px' }}>
                <p style={{ color:'rgba(255,255,255,.62)', fontSize:12, lineHeight:1.8, fontStyle:'italic', marginBottom:16 }}>{t.text}</p>
                <div style={{ fontFamily:'Noto Serif,serif', color:'#fff', fontSize:13 }}>{t.name}</div>
                <div style={{ fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'#B8943A', marginTop:2 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:'#f0ece4', padding:60, textAlign:'center' }}>
        <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:8 }}>Nous rencontrer</span>
        <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'2rem', fontStyle:'italic', color:'#13201A', marginBottom:12 }}>Vivez l'expérience Adham</h2>
        <p style={{ fontSize:13, color:'#6b6b6b', maxWidth:460, margin:'0 auto 24px', lineHeight:1.8 }}>Cavalier, investisseur ou passionné — nous vous accueillons pour une visite privée sur rendez-vous.</p>
        <Link href="/contact" className="btn-dark">Prendre rendez-vous</Link>
      </section>
    </>
  )
}
