import { supabase } from '@/lib/supabase'
import { Actualite } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function ActualitesPage() {
  const { data } = await supabase.from('actualites').select('*').eq('publie', true).order('created_at', { ascending:false })
  const news: Actualite[] = data || []

  return (
    <section style={{ padding:'55px 60px', maxWidth:1400, margin:'0 auto' }}>
      <div style={{ marginBottom:32 }}>
        <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>Du Haras</span>
        <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:'2.4rem', color:'#13201A' }}>Actualités</h1>
      </div>

      {news.length === 0 ? (
        <div style={{ textAlign:'center', padding:60, color:'#888', fontSize:13, fontStyle:'italic' }}>Aucune actualité publiée pour le moment.</div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 }}>
          {news.map(n => (
            <div key={n.id} className="hcard">
              {n.photo
                ? <img src={n.photo} alt={n.titre} style={{ width:'100%', height:200, objectFit:'cover' }}/>
                : <div style={{ width:'100%', height:200, background:'#f0ece4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36 }}>📰</div>
              }
              <div style={{ padding:'16px 18px' }}>
                <div style={{ fontSize:9, letterSpacing:'.12em', textTransform:'uppercase', color:'#B8943A', marginBottom:6 }}>
                  {n.created_at ? new Date(n.created_at).toLocaleDateString('fr', { day:'numeric', month:'long', year:'numeric' }) : ''}
                </div>
                <div style={{ fontFamily:'Noto Serif,serif', fontSize:16, color:'#13201A', marginBottom:8, lineHeight:1.3 }}>{n.titre}</div>
                {n.extrait && <p style={{ fontSize:12, color:'#6b6b6b', lineHeight:1.7 }}>{n.extrait}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
