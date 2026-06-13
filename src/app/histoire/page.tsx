'use client'
import { useState } from 'react'

const tabs = ['Origines','Races influencées','Disciplines & Tbourida','Caractère & Soins','Morphologie']

export default function HistoirePage() {
  const [tab, setTab] = useState(0)

  return (
    <>
      <section style={{ position:'relative', minHeight:480, display:'flex', alignItems:'center', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0 }}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQqBUZoidIebpLPOVoeXB0tVJEcagvu_s_kX__L18LE6t0O4GtcoRmJEjPOFOeNSbwRdIGhGd19znOvWHhmCX5KD3UQm2S5CqDugAqq5zsxpAIPvu6TI9vAu7iP6R13owGJWIDF8r_WOSLb0q2NFtfRlj8SU43rMD620W3ua4JATAa3fXaQ3xfeikFSTnEdxrAIZ73EmlWIZAQLC9Vw62MWyV82qc88zcrr7oPQS37aI1M71zGL0_zauEpM0ppZWHb4uYs7XLT_GkR" alt="Histoire" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(19,32,26,.78),rgba(19,32,26,.35) 55%,transparent)' }}/>
        </div>
        <div style={{ position:'relative', zIndex:5, padding:'70px 60px', maxWidth:680 }}>
          <span style={{ display:'inline-block', padding:'3px 10px', background:'rgba(184,148,58,.2)', color:'#B8943A', fontSize:9, letterSpacing:'.28em', textTransform:'uppercase', marginBottom:12 }}>Heritage Curator Collection</span>
          <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:'clamp(2.2rem,4.5vw,4rem)', color:'#fff', fontStyle:'italic', lineHeight:1.05, marginBottom:14 }}>
            Le Cheval Barbe :<br/><span style={{ fontStyle:'normal', color:'#B8943A' }}>{"L'âme du Maghreb."}</span>
          </h1>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.7)', lineHeight:1.8, maxWidth:460 }}>{"Plus qu'une race, une épopée millénaire qui a façonné les plus grandes lignées équines mondiales."}</p>
        </div>
      </section>

      <section style={{ padding:'55px 60px', maxWidth:1400, margin:'0 auto' }}>
        <div style={{ borderBottom:'.5px solid rgba(195,200,195,.4)', display:'flex', gap:0, overflowX:'auto', marginBottom:36 }}>
          {tabs.map((t,i) => (
            <button key={i} onClick={() => setTab(i)}
              style={{ fontSize:11, letterSpacing:'.07em', textTransform:'uppercase', padding:'10px 18px', background:'transparent', border:'none', color: tab===i ? '#B8943A' : '#6b6b6b', borderBottom: tab===i ? '2px solid #B8943A' : '2px solid transparent', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif', whiteSpace:'nowrap', transition:'.2s' }}>
              {t}
            </button>
          ))}
        </div>

        {tab === 0 && (
          <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:50, alignItems:'start' }}>
            <div>
              <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:'2rem', color:'#13201A', marginBottom:18 }}>Origines &amp; Histoire</h2>
              <p style={{ fontSize:13, color:'#6b6b6b', lineHeight:1.8, marginBottom:12 }}>Le cheval Barbe est originaire du <strong>Maghreb et du Sahara septentrional</strong>. Les <strong>peintures rupestres du Tassili n&apos;Ajjer</strong> (~3000 av. J.-C.) témoignent de sa présence millénaire.</p>
              <p style={{ fontSize:13, color:'#6b6b6b', lineHeight:1.8, marginBottom:24 }}>En <strong>711 apr. J.-C.</strong>, Tariq ibn Ziyad traverse Gibraltar avec ses Barbes — donnant naissance aux chevaux andalous. Leurs descendants forgent la robustesse des <strong>Mustangs</strong>.</p>
              <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                {[
                  ['~3000 av. J.-C.','Tassili n\'Ajjer','Premières représentations du cheval en Afrique du Nord.'],
                  ['~200 av. J.-C.','Cavalerie Numide','Les Barbes de Massinissa redoutés de Rome. Hannibal à Cannes.'],
                  ['711 apr. J.-C.','Conquête Al-Andalus','Naissance du PRE et du Lusitanien.'],
                  ['XVIe siècle','Nouveau Monde','Ancêtres des Mustangs et chevaux créoles américains.'],
                  ['2021','Patrimoine UNESCO','Inscription de la Tbourida au patrimoine immatériel.'],
                ].map(([date,titre,desc]) => (
                  <div key={date} className="tli">
                    <div style={{ fontSize:9, letterSpacing:'.15em', textTransform:'uppercase', color:'#B8943A', marginBottom:2 }}>{date}</div>
                    <div style={{ fontSize:12, fontWeight:600, color:'#13201A' }}>{titre}</div>
                    <div style={{ fontSize:11, color:'#6b6b6b', marginTop:1 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVGxf2xHHpxFRmT98yhd0GgS3HEt5CDU0KmJEfoKtnkxK_uIcROSaAq2cCqWUr6Ro8SLtSUiMrTeJEtsp4Wdh2v1r81CXcaWSHN8CvU_5IQu8a2o5qFLluWDiQYJaNUrFuPGhCvGw5Kvm72UTEZcXqpT2Hp8qmg53zT-VBd5pkCrsWIcQStsFqeG054DAFylK-ff3-khZbcsSeTdTt42MnN7c3voMtgItyYxbklvhoNR_84puReCCDOP_UZdHQlbZO8gea6_L_mj_r" alt="Barbe" style={{ width:'100%', height:240, objectFit:'cover', marginBottom:13 }}/>
              <div style={{ background:'#f0ece4', padding:16, borderLeft:'3px solid #B8943A' }}>
                <div style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'.15em', color:'#B8943A', marginBottom:6 }}>Influence Mondiale</div>
                <p style={{ fontSize:11, color:'#6b6b6b', lineHeight:1.7 }}>Ancêtre de l&apos;Andalou, Lusitanien, Lipizzan, Percheron et Mustang.</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginTop:10 }}>
                  {['Andalou 🇪🇸','Lusitanien 🇵🇹','Mustang 🇺🇸','Lipizzan 🇦🇹'].map(r => <span key={r} className="tag tag-blue">{r}</span>)}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 1 && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40 }}>
            <div>
              <h3 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.4rem', color:'#B8943A', marginBottom:14 }}>Sous-races du Barbe</h3>
              {[
                ['🇲🇦 Barbe Marocain','Le plus noble. Haras royaux. Robe souvent grise. Maître de Tbourida.'],
                ['🇩🇿 Barbe Algérien','Légèrement plus robuste. Influence arabe. Excellente résistance en montagne.'],
                ['🌍 Arabe-Barbe','Le plus répandu. Allie élégance arabe et robustesse barbe.'],
                ['🇹🇳 Barbe Tunisien & Libyen','Plus fin, proche de l\'Arabe. Allie l\'élégance orientale à la rusticité maghrébine.'],
              ].map(([n,d]) => (
                <div key={n} style={{ background:'#f5f3ef', padding:'12px 14px', borderLeft:'3px solid #B8943A', marginBottom:9 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:'#13201A', marginBottom:3 }}>{n}</div>
                  <div style={{ fontSize:10, color:'#6b6b6b', lineHeight:1.6 }}>{d}</div>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.4rem', color:'#B8943A', marginBottom:14 }}>Races issues du sang Barbe</h3>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7 }}>
                {[['🇪🇸','Andalou PRE','Descendant direct'],['🇵🇹','Lusitanien','Haute École'],['🇦🇹','Lipizzan','École de Vienne'],['🇺🇸','Mustang','~90% génétique'],['🇫🇷','Percheron','Influence sarrasine'],['🌍','Anglo-Barbe','Endurance sportive']].map(([f,n,s]) => (
                  <div key={n} style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.35)', padding:11, textAlign:'center' }}>
                    <div style={{ fontSize:18, marginBottom:4 }}>{f}</div>
                    <div style={{ fontSize:11, fontWeight:600, color:'#13201A' }}>{n}</div>
                    <div style={{ fontSize:'9.5px', color:'#888', marginTop:1 }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 2 && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
            <div>
              <h3 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.4rem', color:'#13201A', marginBottom:14 }}>Disciplines traditionnelles</h3>
              {[
                ['🎠','Tbourida / Fantasia','Charge de cavalerie synchronisée, tir simultané. Harnachement brodé d\'or.'],
                ['🏃','Endurance','Résistance naturelle à la chaleur. Épreuves sahariennes 80-160 km.'],
                ['🩰','Haute École Royale','École Royale de Meknès. Piaffer, passage, cabrade.'],
                ['🌄','Trek Saharien','Sabots durs, faibles besoins nutritifs. Raids Atlas et Sahara.'],
              ].map(([ic,n,d]) => (
                <div key={n} style={{ display:'flex', gap:12, padding:12, background:'#f5f3ef', marginBottom:10 }}>
                  <span style={{ fontSize:20 }}>{ic}</span>
                  <div>
                    <div style={{ fontSize:11, fontWeight:600, color:'#13201A', marginBottom:2 }}>{n}</div>
                    <div style={{ fontSize:'10.5px', color:'#6b6b6b', lineHeight:1.6 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.4rem', color:'#13201A', marginBottom:14 }}>Les grands Moussems</h3>
              {[
                ['Moussem de Tissa','Septembre','Province de Fès-Meknès. Plus grand moussem du Maroc.'],
                ['Salon du Cheval El Jadida','Octobre','Référence internationale. Expositions, ventes, concours Tbourida.'],
                ['Moussem Moulay Idriss','Août','Fès. Contexte festif et religieux. Fantasia quotidienne.'],
              ].map(([n,m,d]) => (
                <div key={n} style={{ border:'.5px solid rgba(195,200,195,.35)', padding:12, marginBottom:8 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                    <span style={{ fontSize:11, fontWeight:600, color:'#13201A' }}>{n}</span>
                    <span className="tag tag-amber">{m}</span>
                  </div>
                  <div style={{ fontSize:'10.5px', color:'#6b6b6b' }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 3 && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
            <div>
              <h3 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.4rem', color:'#13201A', marginBottom:14 }}>Caractère</h3>
              <div style={{ background:'#f5f3ef', padding:16, marginBottom:14, borderLeft:'3px solid #B8943A' }}>
                <p style={{ fontSize:12, color:'#6b6b6b', lineHeight:1.8 }}>Intelligence vive, loyauté profonde, courage naturel. Moins fougueux que l&apos;Arabe mais plus endurant. Instinct de survie remarquable développé dans le désert.</p>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                {[['Tempérament','Courageux, loyal'],['Intelligence','Très élevée'],['Lien homme','Fort, fidélité'],['Rusticité','Exceptionnelle']].map(([k,v]) => (
                  <div key={k} style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', padding:10 }}>
                    <div style={{ fontSize:'8.5px', textTransform:'uppercase', letterSpacing:'.12em', color:'#B8943A', marginBottom:3 }}>{k}</div>
                    <div style={{ fontSize:'10.5px', color:'#6b6b6b' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.4rem', color:'#13201A', marginBottom:14 }}>Guide des soins</h3>
              {[
                ['🥕','Alimentation','Économe. Foin + eau. Orge modéré. Risque fourbure si trop riche.'],
                ['🪮','Entretien','Sabots très durs — parage 6-8 semaines. Pas de ferrage obligatoire sur terrain souple.'],
                ['🏥','Santé','Robuste. Vermifuge 2-3x/an. Vaccins grippe + tétanos. Longévité 25-35 ans.'],
              ].map(([ic,n,d]) => (
                <div key={n} style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', padding:12, marginBottom:8 }}>
                  <div style={{ fontSize:'10.5px', fontWeight:600, color:'#13201A', marginBottom:4 }}>{ic} {n}</div>
                  <div style={{ fontSize:'10.5px', color:'#6b6b6b', lineHeight:1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 4 && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:22 }}>
            <div>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjjgyq5A_8OsY6_QeGJ1YBS8Uwl4zpw0wYfkFzWUAdwdaV3F2nZp2zY2ffj-udSbvzS_OePOpsGvLCZN6RBJf_VcpKlfmKr5lZbR5b2MWM-2gMe704BAHnBNTwa72QYu_FO1ctaSavQ-JNrB4eEA_s2Fsnw9zzfM1GWUa1kLwx40LNvswK-SLD3RwnTefAHVOVLkl1IMd6xH246UVbRs1K-PRBYtUOch5zaE2sW8DtxqHTrqFZZORf4IfNQHqr2xxZ_pxhY6im9wTJ" alt="Morphologie" style={{ width:'100%', height:260, objectFit:'cover', marginBottom:13 }}/>
              <div style={{ background:'#f0ece4', padding:12, borderLeft:'3px solid #B8943A' }}>
                <p style={{ fontSize:11, color:'#6b6b6b', lineHeight:1.7, fontStyle:'italic' }}>&ldquo;Le cheval des barbares, rustique et infatigable — fondateur de l&apos;équitation mondiale.&rdquo;</p>
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.2rem', color:'#B8943A', marginBottom:12 }}>Caractéristiques distinctives</h3>
              {[
                ['Tête — Profil convexe','Chanfrein busqué. Différent de l\'Arabe (concave). Oreilles longues.'],
                ['Croupe tombante','Queue attachée bas. Différent de l\'Arabe (queue haute).'],
                ['Sabots durs','Adaptés terrains rocailleux sans ferrage.'],
                ['Corps compact','Dos court musclé. Poitrine profonde. Conformation endurance.'],
              ].map(([n,d]) => (
                <div key={n} style={{ background:'#f5f3ef', padding:'9px 11px', borderLeft:'2px solid #B8943A', marginBottom:7 }}>
                  <div style={{ fontSize:'9.5px', fontWeight:600, color:'#13201A' }}>{n}</div>
                  <div style={{ fontSize:10, color:'#6b6b6b', marginTop:1 }}>{d}</div>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontFamily:'Noto Serif,serif', fontSize:'1.2rem', color:'#B8943A', marginBottom:12 }}>Données métriques</h3>
              {[['Taille','142-162 cm'],['Poids','400-500 kg'],['Robes fréquentes','Gris, Bai, Noir'],['Longévité','25-35 ans'],['Maturité','4-5 ans (tardif)'],['Gestation','~335 jours']].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', borderBottom:'.5px solid rgba(195,200,195,.22)', padding:'5px 0', fontSize:11 }}>
                  <span style={{ color:'#888' }}>{k}</span><span style={{ fontWeight:600 }}>{v}</span>
                </div>
              ))}
              <div style={{ background:'#FAEEDA', border:'.5px solid rgba(184,148,58,.3)', padding:10, marginTop:14 }}>
                <div style={{ fontSize:'9.5px', fontWeight:600, color:'#854F0B', marginBottom:4 }}>⚠️ Barbe ≠ Arabe</div>
                <div style={{ fontSize:'10.5px', color:'#854F0B', lineHeight:1.6 }}>Profil <strong>convexe</strong>, croupe <strong>tombante</strong>. L&apos;Arabe : profil concave, croupe horizontale.</div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
