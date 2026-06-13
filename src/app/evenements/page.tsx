import { supabase } from '@/lib/supabase'
import { Evenement } from '@/lib/types'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const typeColor: Record<string,string> = { comp:'tag-blue', stage:'tag-green', vente:'tag-amber', autre:'tag-purple' }
const typeLabel: Record<string,string> = { comp:'Compétition', stage:'Stage', vente:'Vente', autre:'Autre' }

export default async function EvenementsPage() {
  const { data } = await supabase.from('evenements').select('*').order('date_debut', { ascending:true })
  const events: Evenement[] = data || []

  return (
    <>
      {/* HERO */}
      <section style={{ position:'relative', minHeight:400, display:'flex', alignItems:'center', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0 }}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb1hzn-o_4v3Ro08WfX2EOeyug5yTROqBfwrkPLN2NshRz9UZ5u9Hxs9Da5d-BGanxmwvYz5r_7X6BkVLu8_7FmXmQR_bTrpuQT7_xYaMCz8XGNjNmSD3hFv-xPClbBxj7xv2YzTcCXRggy9OUnrj44wwqYmb9QqORQZvtJk3DOf1bPpFi1fWMmiDyKvJ0Gxm78x7ljgsrXI-V8Yh_rAvpHvMdDwsdALJ-OCNhkDF7-076X6SMpB3P-jWKkl-f9jDG4_IZPKekel1K" alt="Événements" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(19,32,26,.82),rgba(19,32,26,.35) 60%,transparent)' }}/>
        </div>
        <div style={{ position:'relative', zIndex:5, padding:60 }}>
          <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:8 }}>Agenda du Haras</span>
          <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:'clamp(2rem,4vw,3.2rem)', color:'#fff', lineHeight:1.1, marginBottom:12 }}>Événements</h1>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.68)', maxWidth:460, lineHeight:1.8 }}>Moments forts de la vie du Haras : Tbourida, concours, stages et ventes aux enchères.</p>
        </div>
      </section>

      {/* AGENDA */}
      <section style={{ padding:'55px 60px', maxWidth:1400, margin:'0 auto' }}>
        <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.9rem', color:'#13201A', marginBottom:28 }}>Agenda</h2>
        {events.length === 0 ? (
          <div style={{ textAlign:'center', padding:60, color:'#888', fontSize:13, fontStyle:'italic' }}>Aucun événement programmé pour le moment.</div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))', gap:14 }}>
            {events.map(ev => {
              const d = new Date(ev.date_debut)
              return (
                <div key={ev.id} style={{ border:'.5px solid rgba(195,200,195,.3)', background:'#fff', overflow:'hidden' }}>
                  {ev.photo && <img src={ev.photo} alt={ev.titre} style={{ width:'100%', height:160, objectFit:'cover' }}/>}
                  <div style={{ padding:'16px 18px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:10 }}>
                      <div style={{ background:'#13201A', padding:'8px 12px', textAlign:'center', flexShrink:0 }}>
                        <div style={{ fontSize:18, fontFamily:'Noto Serif,serif', color:'#B8943A', lineHeight:1 }}>{d.getDate()}</div>
                        <div style={{ fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.6)', marginTop:2 }}>{d.toLocaleDateString('fr',{month:'short'})}</div>
                      </div>
                      {ev.type && <span className={`tag ${typeColor[ev.type]||'tag-purple'}`}>{typeLabel[ev.type]||ev.type}</span>}
                    </div>
                    <div style={{ fontFamily:'Noto Serif,serif', fontSize:15, color:'#13201A', marginBottom:6 }}>{ev.titre}</div>
                    {ev.lieu && <div style={{ fontSize:10, color:'#B8943A', letterSpacing:'.08em', marginBottom:6 }}>📍 {ev.lieu}</div>}
                    {ev.description && <p style={{ fontSize:11, color:'#6b6b6b', lineHeight:1.7 }}>{ev.description}</p>}
                    {ev.lien_inscription && (
                      <a href={ev.lien_inscription} target="_blank" rel="noreferrer" className="btn-dark" style={{ marginTop:12, display:'inline-block', fontSize:9 }}>S'inscrire →</a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* TBOURIDA */}
      <section style={{ background:'#f0ece4', padding:'55px 60px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:50, alignItems:'center' }}>
          <div>
            <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:8 }}>Patrimoine UNESCO 2021</span>
            <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.8rem', color:'#13201A', marginBottom:12 }}>La Tbourida</h2>
            <p style={{ fontSize:12, color:'#6b6b6b', lineHeight:1.8, marginBottom:12 }}>Art équestre traditionnel marocain. Des escadrons lancent leurs Barbes au galop sur 200m puis tirent une salve synchronisée. Inscrite au patrimoine immatériel de l'UNESCO en 2021.</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:16 }}>
              {['Moussem Tissa','Salon El Jadida','Moussem Meknès'].map(t => <span key={t} className="tag tag-amber">{t}</span>)}
            </div>
            <Link href="/histoire" className="btn-dark">En savoir plus →</Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7 }}>
            <div style={{ gridColumn:'span 2', height:160, overflow:'hidden' }}>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyxc8YQ-rC4IqyqI1h4xEkC4Fv9zueSRtsnmYJUE7MmolgbcEGPYfISYLOqw3zs8rQZw63Bp80mP4fL06ZDaBxo_2stUGcXez5Fos-nPX5lR2N5owxgvq7f99QIiGxKbWz542KZhJZSTl6PHVKxE9qSyHER5LzYMo0LQqnySZg9O6NBWoUTAOVEnVHMzq" alt="Tbourida" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
            </div>
            {['https://lh3.googleusercontent.com/aida-public/AB6AXuBVeKLOeBBFA8HIIT1DpWaAe1MGhdrBwZZVAoDRwuc5zkC6F6zCWQ2G1x-PIZSWs7JvqH7Yn0gTx_FlQ7MECSqc7aRvEpNuBMxC-AvarqkeBcF3w0DujNtqT6py_cIpqZue7SFrNSLHIvTTRZrzTwDZh4mj1zuIV7X3JiGXE3VUfl_v7xsPLz4DqS3YwUwxyKXlKanBpcY6wRpB8foN4AFTagyzQ4kvn5ERpsKchn-QYPYuWZGfQvnOKXPmHKGT2Cyz127adhQx8Z88','https://lh3.googleusercontent.com/aida-public/AB6AXuCpJDwiOqr-jy_vKxzQ0qL9E0zIADTrrzIGm91uhxX5xH6_VSKfX2Ix3GXgs26USVKME0el1UwI7oYD_ft1w9pR2q5hu6hTl-_vBLay2tatx66uDDsmNcgmvwBReXYUpsFIHLsAhnKB_TGOX35L0mJt5YRbJ1vko71VMqKveuHCKRd4BM3wLIwkJVODs8xoZgr_WHvXs_I6N9C9_zfPWQsd-v1W6iVJwOwZ5PxKtSh4l30rXlWOimgnBbyl730pgs11r0Z2nrzbhKab'].map((src,i) => (
              <div key={i} style={{ height:130, overflow:'hidden' }}>
                <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(50%)' }}/>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
