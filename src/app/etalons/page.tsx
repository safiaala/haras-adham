import { supabase } from '@/lib/supabase'
import { Etalon } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function EtalonsPage() {
  const { data: etalons } = await supabase.from('etalons').select('*').eq('actif', true).order('created_at', { ascending:false })
  const list: Etalon[] = etalons || []

  return (
    <>
      <section style={{ padding:'55px 60px', maxWidth:1400, margin:'0 auto' }}>
        <div style={{ marginBottom:36 }}>
          <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>Les piliers du Haras</span>
          <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:'2.4rem', color:'#13201A' }}>Étalons d'Exception</h1>
        </div>

        {list.length === 0 ? (
          <div style={{ textAlign:'center', padding:60, color:'#888', fontSize:13, fontStyle:'italic' }}>Aucun étalon enregistré pour le moment.</div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:22 }}>
            {list.map(e => (
              <div key={e.id} style={{ border:'.5px solid rgba(195,200,195,.3)', overflow:'hidden', background:'#fff' }}>
                {e.photo
                  ? <img src={e.photo} alt={e.nom} style={{ width:'100%', height:260, objectFit:'cover' }}/>
                  : <div style={{ width:'100%', height:260, background:'#f0ece4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:50 }}>🐴</div>
                }
                <div style={{ padding:'18px 20px' }}>
                  <div style={{ fontFamily:'Noto Serif,serif', fontSize:20, color:'#13201A', marginBottom:4 }}>{e.nom}</div>
                  {e.robe && <div style={{ fontSize:10, color:'#B8943A', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8 }}>{e.robe}</div>}
                  {e.age && <div style={{ fontSize:11, color:'#888', marginBottom:6 }}>{e.age} ans · {e.race}</div>}
                  {e.description && <p style={{ fontSize:12, color:'#6b6b6b', lineHeight:1.7, marginBottom:10 }}>{e.description}</p>}
                  {e.palmares && (
                    <div style={{ background:'#f0ece4', padding:'8px 10px', marginBottom:10, borderLeft:'2px solid #B8943A' }}>
                      <div style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'.1em', color:'#B8943A', marginBottom:3 }}>Palmarès</div>
                      <div style={{ fontSize:11, color:'#6b6b6b' }}>{e.palmares}</div>
                    </div>
                  )}
                  {e.tarif_saillie && (
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10, paddingTop:10, borderTop:'.5px solid rgba(195,200,195,.3)' }}>
                      <span style={{ fontSize:10, color:'#888', textTransform:'uppercase', letterSpacing:'.08em' }}>Saillie</span>
                      <span style={{ fontSize:13, color:'#B8943A', fontWeight:600 }}>{e.tarif_saillie}</span>
                    </div>
                  )}
                  {e.methodes && e.methodes.length > 0 && (
                    <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginTop:8 }}>
                      {e.methodes.map(m => <span key={m} className="tag tag-blue">{m}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Conseil génétique */}
      <section style={{ background:'#f0ece4', padding:'55px 60px', marginTop:20 }}>
        <div style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:50, alignItems:'start' }}>
          <div>
            <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:8 }}>Science & Art</span>
            <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.9rem', color:'#13201A', marginBottom:14 }}>Expertise & Conseil Génétique</h2>
            <p style={{ fontSize:12, color:'#6b6b6b', lineHeight:1.8, marginBottom:14 }}>Choisir le bon étalon est une science autant qu'un art. Nos experts analysent les lignées pour optimiser le croisement.</p>
            <ul style={{ listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:8, marginBottom:20 }}>
              {['Analyse de pedigree comparative et étude de conformation','Suivi gynécologique et bilan de fertilité personnalisé','IAF, IAC et monte naturelle disponibles. Export international.'].map(item => (
                <li key={item} style={{ display:'flex', gap:9, alignItems:'start', fontSize:12, color:'#6b6b6b' }}>
                  <span style={{ color:'#B8943A', flexShrink:0 }}>✓</span>{item}
                </li>
              ))}
            </ul>
            <a href="/contact" className="btn-dark">Prendre rendez-vous</a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7 }}>
            {['https://lh3.googleusercontent.com/aida-public/AB6AXuBoeWGSn2vXXLfYI7A_quJFEsQXhmhX8etWDxxb3PJtRCxuVnk9KtLibtWOosGLHYfy7tPnR6hMRZlXFqiTlAM7Gup7TSXa9nv9_j17bvY3Iuhvvecihp9IfNyIIcqymNo9bbSEiL_5t-mIfpbMayD3GZ4pOLpE_6SAuY6aDJJgo0uhf9RjVdVOdDcW8DOZG2vkpq_9Q544M6imW_iC6JEPValOJF3Ywa_c015hMpxjarsmtSCnTik7iwn-zP75gMVSIG8Kpri5rqgM','https://lh3.googleusercontent.com/aida-public/AB6AXuAZ8f0ZRnGLz6f6YYKJmWFHFi4MoWLqvAZPLPsHNZc38_ET9htzkY-WOpZXVG3q0QXXQa1wr8SUrB58CadHA6wBzrM1goMOPoRO92Dy-payboCIBe7EIfxwtADPN83iaVPFvZQ2WXw5XOAlRwRQ4Pz7I_5T8L23D3DN4RQz2_M3-8fp-c1n_OpBN3QYAxaDr0kQP8ZbXWJoPBrFLqUdGc5Ce7F3aHoeGgTkzAxi6jwC3RqM0TgwWue-2jk2gffW6ph7tusiSJ-wPwAW','https://lh3.googleusercontent.com/aida-public/AB6AXuBWyPqi47IgcZnUF-8QLb9rVenN4P3HNmM1O3SzWeUl7y_fsCWkJYFolZ_2Gg1TfKRsteLTB40PatjCo1EY6ydVSN6PXmxc_vUUSh1kJ1XRGPKiwk5l_2EgBPHv40ybSvq1iE1MeqTiSF6PxZsnSWc0hEOgFVq9k5JXndx77x4j23SyneHTtAmgRRI_9Xr1WxcaG5DcIxflGgafh4KtY5OVSTb6XzFJhBstGIFQjLKuPTz9tOpowuzp4YEs65mRtLmN_0CWaqEYUyXa','https://lh3.googleusercontent.com/aida-public/AB6AXuDz0XZoJKFu1wPYCeMVHcuy3XVDdHYc98X8FIvoZI6kU9xEY305jkR78NhxFazENX3KsveONVAXRBRxmfEUmLrM7mcUhmLItQt41KqykJuTzPBV23r0ef0h1mgYBC0DpFg97OdfFIJdvk1-pooGvk8tvjdkC3b8-7Los1so0P89LJ0NVlFSdZ31GTy1DqVAHQSZv2z70gozZk3UwhCZVw4iYaFo6tnjEkiQ0-CRoc4MERxo18C5Q_xEvSQ9THO6HnHNS_leeO9obCsO'].map((src,i) => (
              <div key={i} style={{ overflow:'hidden', cursor:'pointer', height:150 }}>
                <img src={src} alt="Poulain" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
