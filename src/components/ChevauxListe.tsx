'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Cheval } from '@/lib/types'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'

const disciplines = ['all','cso','dressage','endurance','tbourida','poulain']
const statutColor: Record<string,string> = { disponible:'tag-green', vendu:'tag-red', pension:'tag-blue', reproduction:'tag-purple' }
const SEXE_KEY: Record<string,string> = { 'Étalon':'sexe.etalon', 'Jument':'sexe.jument', 'Hongre':'sexe.hongre', 'Cheval':'sexe.cheval', 'Poulain':'sexe.poulain', 'Pouliche':'sexe.pouliche' }

export default function ChevauxListe() {
  const [chevaux, setChevaux] = useState<Cheval[]>([])
  const [filtre, setFiltre] = useState('all')
  const [search, setSearch] = useState('')
  const locale = useLocale()

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
    <section style={{ padding:'40px 60px', maxWidth:1400, margin:'0 auto' }}>
      <div style={{ display:'flex', flexWrap:'wrap', gap:12, alignItems:'center', marginBottom:28 }}>
        <input type="text" placeholder={t(locale,'chevaux.search')} value={search} onChange={e => setSearch(e.target.value)}
          style={{ background:'transparent', borderBottom:'.5px solid rgba(195,200,195,.5)', padding:'8px 8px', fontSize:12, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', minWidth:200 }}/>
        <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
          {disciplines.map(d => (
            <button key={d} onClick={() => setFiltre(d)}
              style={{ fontSize:10, letterSpacing:'.06em', padding:'5px 13px', border:`.5px solid ${filtre===d ? '#B8943A' : 'rgba(195,200,195,.45)'}`, background: filtre===d ? 'rgba(184,148,58,.07)' : 'transparent', color: filtre===d ? '#B8943A' : '#6b6b6b', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif', borderRadius:1 }}>
              {d === 'all' ? t(locale,'chevaux.all') : d.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:60, color:'#888', fontSize:13, fontStyle:'italic' }}>
          {chevaux.length === 0 ? t(locale,'chevaux.empty') : t(locale,'chevaux.none')}
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
                <div style={{ fontSize:10, color:'#888', marginBottom:6 }}>
                  {c.annee_naissance ? `${c.annee_naissance}` : ''}{c.annee_naissance && c.race ? ' · ' : ''}{c.race}
                  {c.sexe ? ` · ${t(locale, SEXE_KEY[c.sexe] || 'sexe.cheval')}` : ''}
                </div>
                <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                  {c.discipline && <span className="tag tag-blue">{c.discipline.toUpperCase()}</span>}
                  {c.statut && <span className={`tag ${statutColor[c.statut]||'tag-green'}`}>{c.statut}</span>}
                </div>
                {c.prix && <div style={{ fontSize:12, color:'#B8943A', fontWeight:600, marginTop:8 }}>{c.prix}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
