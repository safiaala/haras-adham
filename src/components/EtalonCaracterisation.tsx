import React from 'react'
import { t } from '@/lib/translations'
import { Locale } from '@/lib/locale'

type TraitLang = { cat: string; g: string; d: string }

export const TRAITS: { key: string; fr: TraitLang; en: TraitLang; es: TraitLang; ar: TraitLang }[] = [
  {
    key:'geometrie_forme',
    fr:{ cat:'Géométrie - Forme',       g:'Carré',       d:'Rectangle' },
    en:{ cat:'Geometry - Shape',         g:'Square',      d:'Rectangular' },
    es:{ cat:'Geometría - Forma',        g:'Cuadrado',    d:'Rectangular' },
    ar:{ cat:'الهندسة - الشكل',          g:'مربع',        d:'مستطيل' },
  },
  {
    key:'geometrie_orientation',
    fr:{ cat:'Géométrie - Orientation',  g:'Descendant',  d:'Montant' },
    en:{ cat:'Geometry - Orientation',   g:'Descending',  d:'Ascending' },
    es:{ cat:'Geometría - Orientación',  g:'Descendente', d:'Ascendente' },
    ar:{ cat:'الهندسة - الاتجاه',        g:'نازل',        d:'صاعد' },
  },
  {
    key:'tete',
    fr:{ cat:'Tête',       g:'Chic',      d:'Commune' },
    en:{ cat:'Head',       g:'Refined',   d:'Common' },
    es:{ cat:'Cabeza',     g:'Refinada',  d:'Común' },
    ar:{ cat:'الرأس',      g:'أنيق',      d:'عادي' },
  },
  {
    key:'encolure',
    fr:{ cat:'Encolure',   g:'Courte',    d:'Longue' },
    en:{ cat:'Neck',       g:'Short',     d:'Long' },
    es:{ cat:'Cuello',     g:'Corto',     d:'Largo' },
    ar:{ cat:'الرقبة',     g:'قصيرة',     d:'طويلة' },
  },
  {
    key:'epaule',
    fr:{ cat:'Épaule',     g:'Verticale', d:'Oblique' },
    en:{ cat:'Shoulder',   g:'Vertical',  d:'Oblique' },
    es:{ cat:'Hombro',     g:'Vertical',  d:'Oblicuo' },
    ar:{ cat:'الكتف',      g:'عمودي',     d:'مائل' },
  },
  {
    key:'garrot',
    fr:{ cat:'Garrot',     g:'Court',     d:'Prolongé' },
    en:{ cat:'Withers',    g:'Short',     d:'Prominent' },
    es:{ cat:'Cruz',       g:'Corta',     d:'Prominente' },
    ar:{ cat:'الكاهل',     g:'قصير',      d:'بارز' },
  },
  {
    key:'ligne_dessus',
    fr:{ cat:'Ligne du dessus', g:'Creux',  d:'Tendu' },
    en:{ cat:'Topline',          g:'Hollow', d:'Taut' },
    es:{ cat:'Línea dorsal',     g:'Cóncava',d:'Tensa' },
    ar:{ cat:'الخط العلوي',      g:'مقعر',   d:'مشدود' },
  },
  {
    key:'croupe_longueur',
    fr:{ cat:'Croupe - Longueur',    g:'Courte',      d:'Longue' },
    en:{ cat:'Croup - Length',       g:'Short',       d:'Long' },
    es:{ cat:'Grupa - Longitud',     g:'Corta',       d:'Larga' },
    ar:{ cat:'العجز - الطول',        g:'قصير',        d:'طويل' },
  },
  {
    key:'croupe_orientation',
    fr:{ cat:'Croupe - Orientation', g:'Horizontale', d:'Oblique' },
    en:{ cat:'Croup - Orientation',  g:'Horizontal',  d:'Oblique' },
    es:{ cat:'Grupa - Orientación',  g:'Horizontal',  d:'Oblicua' },
    ar:{ cat:'العجز - الاتجاه',      g:'أفقي',        d:'مائل' },
  },
  {
    key:'ossature',
    fr:{ cat:'Ossature',  g:'Légère',    d:'Lourde' },
    en:{ cat:'Bone',      g:'Light',     d:'Heavy' },
    es:{ cat:'Osamenta',  g:'Ligera',    d:'Pesada' },
    ar:{ cat:'الهيكل العظمي', g:'خفيف', d:'ثقيل' },
  },
  {
    key:'taille_morpho',
    fr:{ cat:'Taille',  g:'Petit',     d:'Grand' },
    en:{ cat:'Size',    g:'Small',     d:'Large' },
    es:{ cat:'Talla',   g:'Pequeño',   d:'Grande' },
    ar:{ cat:'الحجم',   g:'صغير',      d:'كبير' },
  },
  {
    key:'pas',
    fr:{ cat:'Pas',   g:'Rigide',  d:'Souple' },
    en:{ cat:'Walk',  g:'Stiff',   d:'Supple' },
    es:{ cat:'Paso',  g:'Rígido',  d:'Flexible' },
    ar:{ cat:'الخطو', g:'متصلب',   d:'مرن' },
  },
  {
    key:'galop_equilibre',
    fr:{ cat:'Galop - Équilibre',  g:'Sur le nez',  d:'Équilibré' },
    en:{ cat:'Canter - Balance',   g:'On the forehand', d:'Balanced' },
    es:{ cat:'Galope - Equilibrio',g:'Sobre la mano',d:'Equilibrado' },
    ar:{ cat:'الغالوب - التوازن',  g:'على الأمام',  d:'متوازن' },
  },
  {
    key:'galop_amplitude',
    fr:{ cat:'Galop - Amplitude',  g:'Court',   d:'Long' },
    en:{ cat:'Canter - Stride',    g:'Short',   d:'Long' },
    es:{ cat:'Galope - Amplitud',  g:'Corto',   d:'Largo' },
    ar:{ cat:'الغالوب - الخطوة',   g:'قصيرة',   d:'طويلة' },
  },
  {
    key:'elasticite',
    fr:{ cat:'Élasticité',   g:'Peu',       d:'Beaucoup' },
    en:{ cat:'Elasticity',   g:'Little',    d:'Much' },
    es:{ cat:'Elasticidad',  g:'Poca',      d:'Mucha' },
    ar:{ cat:'المرونة',      g:'قليلة',     d:'كثيرة' },
  },
  {
    key:'force',
    fr:{ cat:'Force',    g:'Peu',    d:'Beaucoup' },
    en:{ cat:'Power',    g:'Little', d:'Much' },
    es:{ cat:'Fuerza',   g:'Poca',   d:'Mucha' },
    ar:{ cat:'القوة',    g:'قليلة',  d:'كثيرة' },
  },
  {
    key:'sang',
    fr:{ cat:'Sang',   g:'Peu',    d:'Beaucoup' },
    en:{ cat:'Blood',  g:'Little', d:'Much' },
    es:{ cat:'Sangre', g:'Poco',   d:'Mucho' },
    ar:{ cat:'الدم',   g:'قليل',   d:'كثير' },
  },
]

const SCALE = [1, 1.5, 2, 2.5, 3, 3.5, 4]

function pct(v: number) {
  return ((v - 1) / 3) * 100
}

export default function EtalonCaracterisation({ data, locale }: { data: Record<string, number>, locale: Locale }) {
  const hasSomeValue = TRAITS.some(tr => data[tr.key] != null)
  if (!hasSomeValue) return null

  const lang = (locale === 'en' || locale === 'es' || locale === 'ar') ? locale : 'fr'

  return (
    <div>
      <div style={{ width:40, height:2, background:'#B8943A', marginBottom:14 }}/>
      <div style={{ fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'#B8943A', marginBottom:28 }}>
        {t(locale,'etalons.pax')}
      </div>

      {/* Échelle */}
      <div style={{ display:'grid', gridTemplateColumns:'160px 1fr 120px', gap:0, alignItems:'center', marginBottom:10 }}>
        <div/>
        <div style={{ padding:'0 16px' }}>
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
        const labels = trait[lang]
        return (
          <div key={trait.key}>
            <div style={{ fontSize:11, color:'#B8943A', fontWeight:600, marginBottom:2, paddingTop: i === 0 ? 0 : 6 }}>
              {labels.cat}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'160px 1fr 120px', gap:0, alignItems:'center', marginBottom:2 }}>
              <div style={{ fontSize:11, color:'#555', fontStyle:'italic', textAlign:'right', paddingRight:16 }}>
                {labels.g}
              </div>
              <div style={{ position:'relative', padding:'6px 16px' }}>
                <div style={{ position:'relative', height:6, background:'rgba(184,148,58,.15)', borderRadius:3 }}>
                  <div style={{ position:'absolute', left:0, right:0, top:'50%', height:1, background:'#ccc', transform:'translateY(-50%)' }}/>
                  <div style={{ position:'absolute', left:'50%', top:-4, bottom:-4, width:1, background:'#ccc', transform:'translateX(-50%)' }}/>
                  {val != null && (
                    <div style={{
                      position:'absolute',
                      left:`${pct(val)}%`,
                      top:'50%',
                      transform:'translate(-50%,-50%)',
                      width:14, height:14,
                      borderRadius:'50%',
                      background:'#C85A2A',
                      zIndex:2,
                      boxShadow:'0 1px 4px rgba(0,0,0,.2)',
                    }}/>
                  )}
                </div>
              </div>
              <div style={{ fontSize:11, color:'#555', fontStyle:'italic', paddingLeft:4 }}>
                {labels.d}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
