'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Offre } from '@/lib/types'
import { useLocale } from '@/lib/useLocale'
import { t } from '@/lib/translations'
import Link from 'next/link'

const typeColor: Record<string,string> = { emploi:'tag-green', stage:'tag-blue', benevole:'tag-purple' }

const METIERS = [
  { emoji:'🐴', titre:{ fr:'Palefrenier / Soigneur', en:'Stable Hand / Groom', es:'Palafrenero / Cuidador', ar:'حارس الإسطبل / مُعتنٍ' },
    desc:{ fr:'Soins quotidiens, alimentation, pansage. 7j/7.', en:'Daily care, feeding, grooming. 7 days a week.', es:'Cuidados diarios, alimentación, cepillado. 7 días.', ar:'رعاية يومية، تغذية، تنظيف. 7 أيام في الأسبوع.' },
    mission:{ fr:'Le palefrenier est le gardien du bien-être des chevaux au quotidien. Il assure les soins de base (alimentation, pansage, curage des boxes), surveille l\'état de santé des animaux et alerte en cas d\'anomalie.', en:'The groom is the daily guardian of horse welfare. They provide basic care (feeding, grooming, mucking out), monitor the animals\' health and report any anomalies.', es:'El palafrenero es el guardián del bienestar diario de los caballos. Se encarga de los cuidados básicos y monitorea la salud de los animales.', ar:'حارس الإسطبل هو المسؤول اليومي عن رفاهية الخيول. يتولى الرعاية الأساسية ومراقبة صحة الحيوانات.' },
    formation:{ fr:'BEPA / Bac Pro CGEA option équine.', en:'Equine vocational diploma.', es:'Diploma vocacional ecuestre.', ar:'دبلوم مهني في الخيول.' },
    tags:[['tag-green','CDI'],['tag-blue','Stage']] },
  { emoji:'🎓', titre:{ fr:'Moniteur d\'équitation', en:'Riding Instructor', es:'Monitor de Equitación', ar:'مدرب الفروسية' },
    desc:{ fr:'Cours adultes et enfants. Préparation examens FFE.', en:'Adult and children lessons. FFE exam preparation.', es:'Clases adultos y niños. Preparación exámenes FFE.', ar:'دروس للكبار والأطفال. تحضير امتحانات FFE.' },
    mission:{ fr:'Le moniteur encadre les cavaliers de tous niveaux, du premier galop aux examens FFE. Il programme les cours et adapte son enseignement à chaque profil.', en:'The instructor guides riders of all levels, from first canter to FFE exams, planning lessons adapted to each profile.', es:'El monitor guía a jinetes de todos los niveles, planificando clases adaptadas a cada perfil.', ar:'يرشد المدرب الفرسان من جميع المستويات، مخططاً دروساً مكيّفة لكل ملف.' },
    formation:{ fr:'BPJEPS AE ou DEJEPS.', en:'BPJEPS AE or DEJEPS.', es:'BPJEPS AE o DEJEPS.', ar:'BPJEPS AE أو DEJEPS.' },
    tags:[['tag-green','CDI']] },
  { emoji:'🔨', titre:{ fr:'Maréchal-ferrant', en:'Farrier', es:'Herrador', ar:'حداد الخيول' },
    desc:{ fr:'Pare et ferre. Artisan itinérant.', en:'Trims and shoes. Travelling craftsman.', es:'Para y hierra. Artesano itinerante.', ar:'يُشذّب ويُحدي. حرفي متنقل.' },
    mission:{ fr:'Le maréchal-ferrant est un artisan spécialisé dans les soins des sabots. Il pare, ferre et orthopédie les pieds des chevaux en collaboration avec le vétérinaire.', en:'The farrier is a specialist craftsman in hoof care. They trim, shoe and orthopaedically treat horses\' feet in collaboration with the vet.', es:'El herrador es un artesano especializado en el cuidado de los cascos, trabajando en colaboración con el veterinario.', ar:'الحداد هو حرفي متخصص في رعاية حوافر الخيول، يعمل بالتنسيق مع الطبيح البيطري.' },
    formation:{ fr:'CAP + Brevet de Maîtrise.', en:'CAP + Mastery Certificate.', es:'CAP + Certificado de Maestría.', ar:'CAP + شهادة إتقان.' },
    tags:[['tag-purple','Artisan']] },
  { emoji:'🏇', titre:{ fr:'Cavalier de compétition', en:'Competition Rider', es:'Jinete de Competición', ar:'فارس منافسات' },
    desc:{ fr:'Monte et prépare pour les concours. Valorisation sportive.', en:'Rides and prepares for competitions. Sports valorisation.', es:'Monta y prepara para los concursos. Valoración deportiva.', ar:'يركب ويُحضّر للمسابقات. التثمين الرياضي.' },
    mission:{ fr:'Le cavalier de compétition monte et prépare les chevaux du haras en vue des concours. Il élabore les programmes d\'entraînement et gère la condition physique des chevaux.', en:'The competition rider rides and prepares the stud\'s horses for competitions, developing training programmes and managing their physical condition.', es:'El jinete de competición monta y prepara los caballos del haras para los concursos, elaborando programas de entrenamiento.', ar:'يركب فارس المنافسات خيول الهراس ويُحضّرها للمسابقات، ويضع برامج التدريب ويدير لياقتها البدنية.' },
    formation:{ fr:'BPJEPS ou Galop 7+.', en:'BPJEPS or Galop 7+.', es:'BPJEPS o Galop 7+.', ar:'BPJEPS أو Galop 7+.' },
    tags:[['tag-blue','Compétition']] },
  { emoji:'🐾', titre:{ fr:'Vétérinaire équin', en:'Equine Vet', es:'Veterinario Equino', ar:'طبيب بيطري للخيول' },
    desc:{ fr:'Médecine sportive, chirurgie, reproduction.', en:'Sports medicine, surgery, reproduction.', es:'Medicina deportiva, cirugía, reproducción.', ar:'طب رياضي، جراحة، تكاثر.' },
    mission:{ fr:'Le vétérinaire équin assure le suivi médical complet des chevaux : bilans de santé, vaccinations, gestion des urgences et supervision du programme de reproduction.', en:'The equine vet provides complete medical monitoring: health checks, vaccinations, emergency management and reproduction programme supervision.', es:'El veterinario equino proporciona seguimiento médico completo: controles de salud, vacunaciones y supervisión del programa de reproducción.', ar:'يوفر الطبيح البيطري للخيول متابعة طبية شاملة: فحوصات صحية، تطعيمات، وإشراف على برنامج التكاثر.' },
    formation:{ fr:'Doctorat vétérinaire + spécialisation.', en:'Veterinary doctorate + specialisation.', es:'Doctorado veterinario + especialización.', ar:'دكتوراه بيطرية + تخصص.' },
    tags:[['tag-red','Bac+6']] },
  { emoji:'🌾', titre:{ fr:'Directeur de haras', en:'Stud Manager', es:'Director de Haras', ar:'مدير الهراس' },
    desc:{ fr:'Gestion élevage, sélection, commercial.', en:'Breeding management, selection, commercial.', es:'Gestión cría, selección, comercial.', ar:'إدارة التربية، الانتقاء، التجارة.' },
    mission:{ fr:'Le directeur de haras pilote l\'ensemble des activités : gestion de l\'élevage, sélection génétique, supervision des équipes, relations commerciales et stratégie de développement.', en:'The stud manager oversees all activities: breeding management, genetic selection, team supervision, commercial relations and development strategy.', es:'El director del haras dirige todas las actividades: gestión de la cría, selección genética, supervisión de equipos y relaciones comerciales.', ar:'يُشرف مدير الهراس على جميع الأنشطة: إدارة التربية، الانتقاء الجيني، الإشراف على الفرق والعلاقات التجارية.' },
    formation:{ fr:'BTSA ACSE + 5 ans d\'expérience.', en:'BTSA ACSE + 5 years\' experience.', es:'BTSA ACSE + 5 años de experiencia.', ar:'BTSA ACSE + 5 سنوات من الخبرة.' },
    tags:[['tag-green','Cadre']] },
]

export default function JobsList() {
  const [offres, setOffres] = useState<Offre[]>([])
  const locale = useLocale()

  useEffect(() => {
    supabase.from('offres').select('*').eq('active', true).order('created_at', { ascending:false })
      .then(({ data }) => setOffres(data || []))
  }, [])

  const l = locale as 'fr'|'en'|'es'|'ar'

  return (
    <section style={{ padding:'40px 60px', maxWidth:1400, margin:'0 auto' }}>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:36, alignItems:'start' }}>
        <div>
          {offres.length === 0 ? (
            <div style={{ textAlign:'center', padding:60, color:'#888', fontSize:13, fontStyle:'italic', border:'.5px solid rgba(195,200,195,.3)' }}>
              {t(locale,'jobs.empty')}<br/>
              <Link href="/contact" style={{ color:'#B8943A' }}>{t(locale,'jobs.candidature')}</Link>
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
                  {o.profil && <div style={{ fontSize:11, color:'#888', borderTop:'.5px solid rgba(195,200,195,.3)', paddingTop:8, marginTop:8 }}><strong style={{ color:'#13201A' }}>Profil : </strong>{o.profil}</div>}
                  <Link href="/contact" className="btn-dark" style={{ marginTop:12, display:'inline-block', fontSize:9 }}>{t(locale,'jobs.postuler')}</Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ position:'sticky', top:72 }}>
          <div style={{ fontFamily:'Noto Serif,serif', fontSize:'1.15rem', color:'#13201A', marginBottom:12 }}>{t(locale,'jobs.metiers')}</div>
          <div style={{ border:'.5px solid rgba(195,200,195,.35)', background:'#fff' }}>
            {METIERS.map((m, i) => (
              <details key={i} style={{ borderBottom: i < METIERS.length-1 ? '.5px solid rgba(195,200,195,.25)' : 'none' }}>
                <summary style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 14px', cursor:'pointer', listStyle:'none', fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:13, fontWeight:500 }}>
                  <span>{m.emoji} {m.titre[l]}</span><span style={{ fontSize:10, color:'#888' }}>▾</span>
                </summary>
                <div style={{ padding:'0 14px 14px', fontSize:12, color:'#6b6b6b', lineHeight:1.65 }}>
                  <p style={{ marginBottom:10 }}>{m.desc[l]}</p>
                  <div style={{ background:'#f5f3ef', borderLeft:'2px solid #B8943A', padding:'10px 12px', marginBottom:10 }}>
                    <div style={{ fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#B8943A', marginBottom:4 }}>{t(locale,'jobs.mission')}</div>
                    <p style={{ fontSize:11, lineHeight:1.7 }}>{m.mission[l]}</p>
                  </div>
                  <strong>{t(locale,'jobs.formation')} :</strong> {m.formation[l]}
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
