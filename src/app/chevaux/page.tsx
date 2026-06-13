'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Cheval } from '@/lib/types'

const disciplines = [
  { key:'all', label:'Tous' },
  { key:'cso', label:'CSO' },
  { key:'dressage', label:'Dressage' },
  { key:'endurance', label:'Endurance' },
  { key:'tbourida', label:'Tbourida' },
  { key:'poulain', label:'Poulains' },
]

const statutColor: Record<string,string> = {
  disponible:'tag-green', vendu:'tag-red', pension:'tag-blue', reproduction:'tag-purple'
}

export default function ChevauxPage() {
  const [chevaux, setChevaux] = useState<Cheval[]>([])
  const [filtre, setFiltre] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    supabase.from('chevaux').select('*').order('created_at', { ascending:false })
      .then(({ data }) => setChevaux(data || []))
  }, [])

  const filtered = chevaux.filter(c => {
    const matchD = filtre === 'all' || c.discipline === filtre
    const matchS = !search || c.nom.toLowerCase().includes(search.toLowerCase())
    return matchD && matchS
  })

  return (
    <section style={{ padding:'55px 60px', maxWidth:1400, margin:'0 auto' }}>
      <div style={{ marginBottom:28 }}>
        <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:6 }}>Notre Collection</span>
        <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:'2.4rem', color:'#13201A' }}>La Collection d'Exception</h1>
      </div>

      {/* Filtres */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:12, alignItems:'center', marginBottom:28 }}>
        <input
          type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ background:'transparent', borderBottom:'.5px solid rgba(195,200,195,.5)', padding:'8px 8px', fontSize:12, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', minWidth:200 }}
        />
        <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
          {disciplines.map(d => (
            <button key={d.key} onClick={() => setFiltre(d.key)}
              style={{ fontSize:10, letterSpacing:'.06em', padding:'5px 13px', border:`.5px solid ${filtre===d.key ? '#B8943A' : 'rgba(195,200,195,.45)'}`, background: filtre===d.key ? 'rgba(184,148,58,.07)' : 'transparent', color: filtre===d.key ? '#B8943A' : '#6b6b6b', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif', borderRadius:1 }}
            >{d.label}</button>
          ))}
        </div>
      </div>

      {/* Grille */}
      {filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:60, color:'#888', fontSize:13, fontStyle:'italic' }}>
          {chevaux.length === 0 ? 'Aucun cheval enregistré pour le moment.' : 'Aucun résultat pour ces filtres.'}
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))', gap:14 }}>
          {filtered.map(c => (
            <div key={c.id} className="hcard">
              {c.photos?.[0]
                ? <img src={c.photos[0]} alt={c.nom} style={{ width:'100%', height:190, objectFit:'cover' }}/>
                : <div style={{ width:'100%', height:190, background:'#f0ece4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:40 }}>🐴</div>
              }
              <div style={{ padding:'12px 14px' }}>
                <div style={{ fontFamily:'Noto Serif,serif', fontSize:15, color:'#13201A', marginBottom:4 }}>{c.nom}</div>
                <div style={{ fontSize:10, color:'#888', marginBottom:6 }}>{c.age ? `${c.age} ans` : ''}{c.age && c.race ? ' · ' : ''}{c.race}</div>
                <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                  {c.discipline && <span className={`tag tag-blue`}>{c.discipline.toUpperCase()}</span>}
                  {c.statut && <span className={`tag ${statutColor[c.statut] || 'tag-green'}`}>{c.statut}</span>}
                </div>
                {c.prix && <div style={{ fontSize:12, color:'#B8943A', fontWeight:600, marginTop:8 }}>{c.prix}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Barbe info */}
      <section style={{ background:'#13201A', padding:'50px 60px', margin:'60px -60px -55px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:50, alignItems:'center' }}>
          <div>
            <span style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#B8943A', display:'block', marginBottom:8 }}>La race que nous préservons</span>
            <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.8rem', color:'#fff', marginBottom:12 }}>Le Cheval Barbe Marocain</h2>
            <p style={{ fontSize:12, color:'rgba(255,255,255,.58)', lineHeight:1.8, marginBottom:16 }}>Le Barbe est l'une des races équines les plus anciennes du monde. Sabots durs, croupe tombante, endurance légendaire.</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {[['Taille','142–162 cm'],['Longévité','25–35 ans'],['Poids','400–500 kg'],['UNESCO','Tbourida 2021']].map(([k,v]) => (
                <div key={k} style={{ background:'rgba(255,255,255,.05)', padding:'10px 12px' }}>
                  <div style={{ fontSize:9, letterSpacing:'.13em', textTransform:'uppercase', color:'#B8943A', marginBottom:3 }}>{k}</div>
                  <div style={{ color:'#fff', fontSize:12 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8Bdzs6F3bireBl9NK48-APTvsUSWDuW1jdLn20Q7OAXeBkInIL0OiGLinwz5TnUrIaXaacVhWGMPLvCcqQeQqrRfMesTPk6p0kFASk9lykPv22BKnptw_N9R_TsI3ffITXxh4ineBtF6vJwesVGrrNVtlfDbWNR6G-Q1SQ3Ay8LCPcA6KbPm142CWSsAR_EA1iuzIT3lzMqUN6R0_-qkJD3lRWVI-tJqIQoSGJ04XeKiikM_uisYN4AJf2BiYwuHVLaZ2GTtykaze" alt="Barbe" style={{ width:'100%', height:300, objectFit:'cover' }}/>
        </div>
      </section>
    </section>
  )
}
