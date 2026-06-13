import { supabase } from '@/lib/supabase'
import { Offre } from '@/lib/types'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const typeColor: Record<string,string> = { emploi:'tag-green', stage:'tag-blue', benevole:'tag-purple' }

const metiers = [
  { emoji:'🐴', titre:'Palefrenier / Soigneur', desc:'Soins quotidiens, alimentation, pansage. 7j/7.', formation:'BEPA / Bac Pro CGEA option équine.', tags:[['tag-green','CDI'],['tag-blue','Stage']] },
  { emoji:'🎓', titre:'Moniteur d\'équitation', desc:'Cours adultes et enfants. Préparation examens FFE.', formation:'BPJEPS AE ou DEJEPS.', tags:[['tag-green','CDI']] },
  { emoji:'🔨', titre:'Maréchal-ferrant', desc:'Pare et ferre. Artisan itinérant.', formation:'CAP + Brevet de Maîtrise.', tags:[['tag-purple','Artisan']] },
  { emoji:'🏇', titre:'Cavalier de compétition', desc:'Monte et prépare pour les concours. Valorisation sportive.', formation:'BPJEPS ou Galop 7+.', tags:[['tag-blue','Compétition']] },
  { emoji:'🐾', titre:'Vétérinaire équin', desc:'Médecine sportive, chirurgie, reproduction.', formation:'Doctorat vétérinaire + spécialisation.', tags:[['tag-red','Bac+6']] },
  { emoji:'🌾', titre:'Directeur de haras', desc:'Gestion élevage, sélection, commercial.', formation:'BTSA ACSE + 5 ans d\'expérience.', tags:[['tag-green','Cadre']] },
]

export default async function JobsPage() {
  const { data } = await supabase.from('offres').select('*').eq('active', true).order('created_at', { ascending:false })
  const offres: Offre[] = data || []

  return (
    <section style={{ padding:'55px 60px', maxWidth:1400, margin:'0 auto' }}>
      <div style={{ marginBottom:28 }}>
        <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>Rejoindre l&apos;équipe</span>
        <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:'2.4rem', color:'#13201A' }}>Offres &amp; Métiers</h1>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:36, alignItems:'start' }}>
        <div>
          {offres.length === 0 ? (
            <div style={{ textAlign:'center', padding:60, color:'#888', fontSize:13, fontStyle:'italic', border:'.5px solid rgba(195,200,195,.3)' }}>
              Aucune offre active pour le moment.<br/>
              Envoyez une candidature spontanée via le <Link href="/contact" style={{ color:'#B8943A' }}>formulaire de contact</Link>.
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
              {offres.map(o => (
                <div key={o.id} style={{ border:'.5px solid rgba(195,200,195,.3)', padding:'18px 20px', background:'#fff' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:8 }}>
                    <div style={{ fontFamily:'Noto Serif,serif', fontSize:16, color:'#13201A' }}>{o.titre}</div>
                    {o.type && <span className={`tag ${typeColor[o.type]||'tag-green'}`}>{o.type}</span>}
                  </div>
                  {o.description && <p style={{ fontSize:12, color:'#6b6b6b', lineHeight:1.7, marginBottom:10 }}>{o.description}</p>}
                  {o.profil && (
                    <div style={{ fontSize:11, color:'#888', borderTop:'.5px solid rgba(195,200,195,.3)', paddingTop:8, marginTop:8 }}>
                      <strong style={{ color:'#13201A' }}>Profil : </strong>{o.profil}
                    </div>
                  )}
                  <Link href="/contact" className="btn-dark" style={{ marginTop:12, display:'inline-block', fontSize:9 }}>Postuler →</Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ position:'sticky', top:72 }}>
          <div style={{ fontFamily:'Noto Serif,serif', fontSize:'1.15rem', color:'#13201A', marginBottom:12 }}>Métiers du cheval</div>
          <div style={{ border:'.5px solid rgba(195,200,195,.35)', background:'#fff' }}>
            {metiers.map((m, i) => (
              <details key={m.titre} style={{ borderBottom: i < metiers.length-1 ? '.5px solid rgba(195,200,195,.25)' : 'none' }}>
                <summary style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 14px', cursor:'pointer', listStyle:'none', fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:13, fontWeight:500 }}>
                  <span>{m.emoji} {m.titre}</span><span style={{ fontSize:10, color:'#888' }}>▾</span>
                </summary>
                <div style={{ padding:'0 14px 12px', fontSize:12, color:'#6b6b6b', lineHeight:1.65 }}>
                  {m.desc}<br/><br/><strong>Formation :</strong> {m.formation}<br/>
                  <div style={{ display:'flex', gap:4, marginTop:8 }}>
                    {m.tags.map(([cls,label]) => <span key={label} className={`tag ${cls}`}>{label}</span>)}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
