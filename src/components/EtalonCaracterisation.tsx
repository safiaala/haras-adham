import React from 'react'

export const TRAITS = [
  { key:'geometrie_forme',      cat:'Géométrie - Forme',      g:'Carré',       d:'Rectangle' },
  { key:'geometrie_orientation',cat:'Géométrie - Orientation', g:'Descendant',  d:'Montant' },
  { key:'tete',                 cat:'Tête',                   g:'Chic',        d:'Commune' },
  { key:'encolure',             cat:'Encolure',               g:'Courte',      d:'Longue' },
  { key:'epaule',               cat:'Épaule',                 g:'Verticale',   d:'Oblique' },
  { key:'garrot',               cat:'Garrot',                 g:'Court',       d:'Prolongé' },
  { key:'ligne_dessus',         cat:'Ligne du dessus',        g:'Creux',       d:'Tendu' },
  { key:'croupe_longueur',      cat:'Croupe - Longueur',      g:'Courte',      d:'Longue' },
  { key:'croupe_orientation',   cat:'Croupe - Orientation',   g:'Horizontale', d:'Oblique' },
  { key:'ossature',             cat:'Ossature',               g:'Légère',      d:'Lourde' },
  { key:'taille_morpho',        cat:'Taille',                 g:'Petit',       d:'Grand' },
  { key:'pas',                  cat:'Pas',                    g:'Rigide',      d:'Souple' },
  { key:'galop_equilibre',      cat:'Galop - Équilibre',      g:'Sur le nez',  d:'Équilibré' },
  { key:'galop_amplitude',      cat:'Galop - Amplitude',      g:'Court',       d:'Long' },
  { key:'elasticite',           cat:'Élasticité',             g:'Beaucoup',    d:'Peu' },
  { key:'force',                cat:'Force',                  g:'Beaucoup',    d:'Peu' },
  { key:'sang',                 cat:'Sang',                   g:'Peu',         d:'Beaucoup' },
]

const SCALE = [1, 1.5, 2, 2.5, 3, 3.5, 4]

function pct(v: number) {
  return ((v - 1) / 3) * 100
}

export default function EtalonCaracterisation({ data }: { data: Record<string, number> }) {
  const hasSomeValue = TRAITS.some(t => data[t.key] != null)
  if (!hasSomeValue) return null

  return (
    <div>
      <div style={{ width:40, height:2, background:'#B8943A', marginBottom:14 }}/>
      <div style={{ fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'#B8943A', marginBottom:28 }}>
        Caractérisation PAX de l&apos;étalon
      </div>

      {/* Échelle */}
      <div style={{ display:'grid', gridTemplateColumns:'160px 1fr 120px', gap:0, alignItems:'center', marginBottom:10, paddingLeft:0 }}>
        <div/>
        <div style={{ position:'relative', padding:'0 16px' }}>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            {SCALE.map(v => (
              <span key={v} style={{ fontSize:10, color:'#999', width:28, textAlign:'center' }}>{v}</span>
            ))}
          </div>
        </div>
        <div/>
      </div>

      {/* Lignes */}
      {TRAITS.map((trait, i) => {
        const val = data[trait.key]
        return (
          <div key={trait.key}>
            {/* Catégorie */}
            <div style={{ fontSize:11, color:'#B8943A', fontWeight:600, marginBottom:2, paddingTop: i === 0 ? 0 : 6 }}>
              {trait.cat}
            </div>
            {/* Ligne curseur */}
            <div style={{ display:'grid', gridTemplateColumns:'160px 1fr 120px', gap:0, alignItems:'center', marginBottom:2 }}>
              {/* Label gauche */}
              <div style={{ fontSize:11, color:'#555', fontStyle:'italic', textAlign:'right', paddingRight:16 }}>
                {trait.g}
              </div>

              {/* Barre */}
              <div style={{ position:'relative', padding:'6px 16px' }}>
                {/* Ligne de fond */}
                <div style={{ position:'relative', height:6, background:'rgba(184,148,58,.15)', borderRadius:3 }}>
                  {/* Ligne noire fine */}
                  <div style={{ position:'absolute', left:0, right:0, top:'50%', height:1, background:'#ccc', transform:'translateY(-50%)' }}/>
                  {/* Repère milieu (2.5) */}
                  <div style={{ position:'absolute', left:'50%', top:-4, bottom:-4, width:1, background:'#ccc', transform:'translateX(-50%)' }}/>
                  {/* Dot */}
                  {val != null && (
                    <div style={{
                      position:'absolute',
                      left:`${pct(val)}%`,
                      top:'50%',
                      transform:'translate(-50%,-50%)',
                      width:14,
                      height:14,
                      borderRadius:'50%',
                      background:'#C85A2A',
                      zIndex:2,
                      boxShadow:'0 1px 4px rgba(0,0,0,.2)',
                    }}/>
                  )}
                </div>
              </div>

              {/* Label droite */}
              <div style={{ fontSize:11, color:'#555', fontStyle:'italic', paddingLeft:4 }}>
                {trait.d}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
