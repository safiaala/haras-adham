'use client'
import { useEffect, useState, use } from 'react'
import { supabase } from '@/lib/supabase'
import { adminDb } from '@/lib/adminDb'
import { Section, SectionType, SectionData, SECTION_TYPES, defaultData, PAGES, TranslatableFields, TRANSLATABLE_FIELDS_BY_TYPE } from '@/lib/sections'
import { uploadImage } from '@/lib/cloudinary'
import { LOCALES, Locale } from '@/lib/locale'

const LOCALE_FLAGS: Record<Locale, string> = { fr:'🇫🇷', en:'🇬🇧', es:'🇪🇸', ar:'🇸🇦' }

export default function PageEditor({ params }: { params: Promise<{ page: string }> }) {
  const { page } = use(params)
  const pageInfo = PAGES.find(p => p.slug === page)
  const [sections, setSections] = useState<Section[]>([])
  const [editing, setEditing] = useState<Section|null>(null)
  const [adding, setAdding] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function load() {
    const { data } = await supabase.from('sections').select('*').eq('page', page).order('ordre')
    setSections((data || []) as Section[])
  }
  useEffect(() => { load() }, [page])

  async function addSection(type: SectionType) {
    const maxOrdre = sections.reduce((m, s) => Math.max(m, s.ordre), 0)
    await adminDb.insert('sections', { page, type, ordre: maxOrdre + 1, actif: true, data: defaultData[type] })
    setAdding(false)
    await load()
  }

  async function deleteSection(id: string) {
    if (!confirm('Supprimer cette section ?')) return
    await adminDb.delete('sections', id)
    await load()
  }

  async function toggleActif(s: Section) {
    await adminDb.update('sections', s.id, { actif: !s.actif })
    await load()
  }

  async function moveSection(s: Section, dir: 'up' | 'down') {
    const idx = sections.findIndex(x => x.id === s.id)
    const swap = dir === 'up' ? sections[idx-1] : sections[idx+1]
    if (!swap) return
    await Promise.all([
      adminDb.update('sections', s.id, { ordre: swap.ordre }),
      adminDb.update('sections', swap.id, { ordre: s.ordre }),
    ])
    await load()
  }

  async function saveSection() {
    if (!editing) return
    setSaving(true)
    try {
      await adminDb.update('sections', editing.id, { data: editing.data, actif: editing.actif })
      setMsg('Sauvegardé ✓')
      setTimeout(() => setMsg(''), 2000)
      await load()
    } finally { setSaving(false) }
  }

  const typeInfo = SECTION_TYPES.find(t => t.type === editing?.type)

  return (
    <div style={{ minHeight:'100vh', background:'#f5f3ef', display:'grid', gridTemplateColumns: editing ? '1fr 420px' : '1fr' }}>
      {/* LISTE SECTIONS */}
      <div style={{ padding:40 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <div>
            <a href="/admin/editeur" style={{ fontSize:10, color:'#888', textDecoration:'none' }}>← Éditeur</a>
            <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:22, color:'#13201A', marginTop:4 }}>{pageInfo?.emoji} {pageInfo?.label}</h1>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <a href={`/${page === 'accueil' ? '' : page}`} target="_blank" style={{ fontSize:10, padding:'8px 14px', border:'.5px solid rgba(195,200,195,.5)', color:'#888', textDecoration:'none', fontFamily:'Plus Jakarta Sans,sans-serif', letterSpacing:'.08em', textTransform:'uppercase' }}>Voir la page →</a>
            <button onClick={() => setAdding(true)} className="btn-gold">+ Ajouter une section</button>
          </div>
        </div>

        {sections.length === 0 && (
          <div style={{ textAlign:'center', padding:60, color:'#888', fontSize:13, fontStyle:'italic', border:'1.5px dashed rgba(184,148,58,.3)', background:'#fff' }}>
            Cette page n&apos;a pas encore de sections.<br/>Cliquez sur <strong>+ Ajouter une section</strong> pour commencer.
          </div>
        )}

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {sections.map((s, idx) => {
            const info = SECTION_TYPES.find(t => t.type === s.type)
            return (
              <div key={s.id} style={{ background:'#fff', border:`.5px solid ${editing?.id===s.id ? '#B8943A' : 'rgba(195,200,195,.3)'}`, padding:'16px 20px', display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
                  <button onClick={() => moveSection(s,'up')} disabled={idx===0} style={{ background:'transparent', border:'.5px solid rgba(195,200,195,.4)', cursor:'pointer', padding:'2px 6px', fontSize:10, color:'#888', lineHeight:1 }}>▲</button>
                  <button onClick={() => moveSection(s,'down')} disabled={idx===sections.length-1} style={{ background:'transparent', border:'.5px solid rgba(195,200,195,.4)', cursor:'pointer', padding:'2px 6px', fontSize:10, color:'#888', lineHeight:1 }}>▼</button>
                </div>
                <div style={{ fontSize:20 }}>{info?.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'Noto Serif,serif', fontSize:14, color:'#13201A' }}>{info?.label}</div>
                  <div style={{ fontSize:10, color:'#888', marginTop:1 }}>{s.data.titre || s.data.badge || info?.desc}</div>
                </div>
                <span style={{ fontSize:9, padding:'3px 8px', background: s.actif ? '#EAF3DE' : '#f5f3ef', color: s.actif ? '#3B6D11' : '#888', borderRadius:1, letterSpacing:'.06em', textTransform:'uppercase' }}>{s.actif ? 'Visible' : 'Masqué'}</span>
                <div style={{ display:'flex', gap:6 }}>
                  <button onClick={() => toggleActif(s)} style={{ fontSize:10, padding:'4px 10px', border:'.5px solid rgba(195,200,195,.5)', background:'transparent', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>{s.actif ? 'Masquer' : 'Afficher'}</button>
                  <button onClick={() => setEditing(editing?.id===s.id ? null : s)} style={{ fontSize:10, padding:'4px 10px', border:`.5px solid ${editing?.id===s.id ? '#B8943A' : 'rgba(195,200,195,.5)'}`, background: editing?.id===s.id ? 'rgba(184,148,58,.08)' : 'transparent', color: editing?.id===s.id ? '#B8943A' : '#333', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>Modifier</button>
                  <button onClick={() => deleteSection(s.id)} style={{ fontSize:10, padding:'4px 10px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' }}>✕</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* PANNEAU ÉDITION */}
      {editing && (
        <EditingPanel editing={editing} setEditing={setEditing} typeInfo={typeInfo} msg={msg} saving={saving} saveSection={saveSection}/>
      )}

      {/* MODAL AJOUT */}
      {adding && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
          <div style={{ background:'#fbf9f5', padding:28, width:'100%', maxWidth:600, maxHeight:'90vh', overflowY:'auto' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
              <h2 style={{ fontFamily:'Noto Serif,serif', fontSize:18, color:'#13201A' }}>Ajouter une section</h2>
              <button onClick={() => setAdding(false)} style={{ background:'transparent', border:'none', fontSize:22, cursor:'pointer', color:'#888' }}>✕</button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {SECTION_TYPES.map(t => (
                <button key={t.type} onClick={() => addSection(t.type)}
                  style={{ border:'.5px solid rgba(195,200,195,.4)', background:'#fff', padding:16, textAlign:'left', cursor:'pointer', transition:'border-color .2s' }}
                  onMouseOver={e => (e.currentTarget.style.borderColor='#B8943A')}
                  onMouseOut={e => (e.currentTarget.style.borderColor='rgba(195,200,195,.4)')}>
                  <div style={{ fontSize:22, marginBottom:6 }}>{t.emoji}</div>
                  <div style={{ fontFamily:'Noto Serif,serif', fontSize:13, color:'#13201A', marginBottom:3 }}>{t.label}</div>
                  <div style={{ fontSize:10, color:'#888' }}>{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function EditingPanel({ editing, setEditing, typeInfo, msg, saving, saveSection }: {
  editing: Section; setEditing: (s: Section|null) => void
  typeInfo: typeof SECTION_TYPES[0]|undefined; msg: string; saving: boolean; saveSection: () => void
}) {
  const [locale, setLocale] = useState<Locale>('fr')

  function setTranslation(field: string, value: unknown) {
    if (locale === 'fr') {
      const newData = { ...editing.data, [field]: value }
      setEditing({ ...editing, data: newData })
    } else {
      const translations = { ...(editing.data.translations || {}), [locale]: { ...(editing.data.translations?.[locale] || {}), [field]: value } }
      setEditing({ ...editing, data: { ...editing.data, translations } })
    }
  }

  const localizedSection: Section = locale === 'fr' ? editing : {
    ...editing,
    data: { ...editing.data, ...(editing.data.translations?.[locale] || {}) }
  }

  return (
    <div style={{ background:'#fff', borderLeft:'.5px solid rgba(195,200,195,.3)', padding:28, overflowY:'auto', maxHeight:'100vh', position:'sticky', top:0 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div>
          <div style={{ fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#888' }}>Modifier</div>
          <div style={{ fontFamily:'Noto Serif,serif', fontSize:16, color:'#13201A' }}>{typeInfo?.emoji} {typeInfo?.label}</div>
        </div>
        <button onClick={() => setEditing(null)} style={{ background:'transparent', border:'none', fontSize:20, cursor:'pointer', color:'#888' }}>✕</button>
      </div>

      {/* ONGLETS LANGUE */}
      <div style={{ display:'flex', gap:4, marginBottom:16, borderBottom:'.5px solid rgba(195,200,195,.3)', paddingBottom:12 }}>
        {LOCALES.map(l => (
          <button key={l.code} onClick={() => setLocale(l.code as Locale)}
            style={{ fontSize:11, padding:'5px 10px', border:`.5px solid ${locale===l.code ? '#B8943A' : 'rgba(195,200,195,.4)'}`, background: locale===l.code ? 'rgba(184,148,58,.1)' : 'transparent', color: locale===l.code ? '#B8943A' : '#888', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif', display:'flex', alignItems:'center', gap:4 }}>
            {LOCALE_FLAGS[l.code as Locale]} {l.label}
          </button>
        ))}
      </div>
      {locale !== 'fr' && (
        <div style={{ background:'#FAEEDA', border:'.5px solid rgba(184,148,58,.3)', padding:'8px 12px', marginBottom:14, fontSize:11, color:'#854F0B' }}>
          ✏️ Vous éditez la traduction <strong>{locale.toUpperCase()}</strong>. Les champs vides afficheront le français par défaut.
        </div>
      )}

      <SectionForm section={localizedSection} locale={locale} onChange={(s) => {
        if (locale === 'fr') {
          setEditing(s)
        } else {
          const translatableFields = TRANSLATABLE_FIELDS_BY_TYPE[editing.type]
          const translation: Partial<TranslatableFields> = {}
          translatableFields.forEach(f => {
            const v = (s.data as Record<string, unknown>)[f]
            if (v !== undefined) (translation as Record<string, unknown>)[f] = v
          })
          const translations = { ...(editing.data.translations || {}), [locale]: translation }
          setEditing({ ...editing, data: { ...editing.data, translations } })
        }
      }}/>

      {msg && <p style={{ fontSize:12, color:'#3B6D11', textAlign:'center', margin:'8px 0' }}>{msg}</p>}
      <div style={{ display:'flex', gap:10, marginTop:16 }}>
        <button onClick={() => setEditing(null)} className="btn-outline" style={{ flex:1 }}>Annuler</button>
        <button onClick={saveSection} disabled={saving} className="btn-gold" style={{ flex:1 }}>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</button>
      </div>
    </div>
  )
}

function SectionForm({ section, onChange, locale }: { section: Section; onChange: (s: Section) => void; locale?: Locale }) {
  const [uploading, setUploading] = useState<string|null>(null)

  function set(path: string, value: unknown) {
    const parts = path.split('.')
    const newData = JSON.parse(JSON.stringify(section.data))
    let obj: Record<string, unknown> = newData
    for (let i = 0; i < parts.length - 1; i++) {
      obj = obj[parts[i]] as Record<string, unknown>
    }
    obj[parts[parts.length - 1]] = value
    onChange({ ...section, data: newData })
  }

  function setArr<T>(key: string, idx: number, field: string, value: unknown) {
    const arr: T[] = JSON.parse(JSON.stringify((section.data as Record<string, T[]>)[key] || []))
    ;(arr[idx] as Record<string, unknown>)[field] = value
    set(key, arr)
  }

  function addToArr(key: string, item: unknown) {
    const arr = JSON.parse(JSON.stringify((section.data as Record<string, unknown[]>)[key] || []))
    arr.push(item)
    set(key, arr)
  }

  function removeFromArr(key: string, idx: number) {
    const arr = JSON.parse(JSON.stringify((section.data as Record<string, unknown[]>)[key] || []))
    arr.splice(idx, 1)
    set(key, arr)
  }

  async function handleUpload(field: string, e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return
    setUploading(field)
    try {
      const url = await uploadImage(e.target.files[0])
      set(field, url)
    } finally { setUploading(null) }
  }

  const d = section.data
  const inp = (label: string, field: string, type='text') => (
    <div key={field}>
      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{label}</label>
      <input type={type} value={(d as Record<string,string>)[field] ?? ''} onChange={e => set(field, e.target.value)}
        style={{ width:'100%', padding:'8px 10px', border:'.5px solid rgba(195,200,195,.6)', fontSize:12, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none' }}/>
    </div>
  )

  const ta = (label: string, field: string, rows=3) => (
    <div key={field}>
      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>{label}</label>
      <textarea rows={rows} value={(d as Record<string,string>)[field] ?? ''} onChange={e => set(field, e.target.value)}
        style={{ width:'100%', padding:'8px 10px', border:'.5px solid rgba(195,200,195,.6)', fontSize:12, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', resize:'vertical' }}/>
    </div>
  )

  const photoField = (label: string, field: string) => (
    <div key={field}>
      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:8 }}>{label}</label>
      {(d as Record<string,string>)[field] && (
        <div style={{ position:'relative', marginBottom:8, display:'inline-block' }}>
          <img src={(d as Record<string,string>)[field]} style={{ width:160, height:100, objectFit:'cover' }} alt=""/>
          <button onClick={() => set(field, '')} style={{ position:'absolute', top:2, right:2, background:'rgba(0,0,0,.6)', border:'none', color:'#fff', width:18, height:18, borderRadius:'50%', cursor:'pointer', fontSize:10 }}>✕</button>
        </div>
      )}
      <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:11, color:'#B8943A', cursor:'pointer', border:'.5px solid rgba(184,148,58,.4)', padding:'6px 12px', width:'fit-content' }}>
        {uploading===field ? 'Chargement...' : '+ Photo'}
        <input type="file" accept="image/*" onChange={e => handleUpload(field, e)} style={{ display:'none' }}/>
      </label>
    </div>
  )

  const fondSel = () => (
    <div>
      <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Couleur de fond</label>
      <select value={d.fond || '#fbf9f5'} onChange={e => set('fond', e.target.value)}
        style={{ width:'100%', padding:'8px 10px', border:'.5px solid rgba(195,200,195,.6)', fontSize:12, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff' }}>
        <option value="#fbf9f5">Crème clair</option>
        <option value="#f0ece4">Crème moyen</option>
        <option value="#f5f3ef">Crème foncé</option>
        <option value="#13201A">Vert foncé</option>
        <option value="#fff">Blanc</option>
        <option value="#B8943A">Or</option>
      </select>
    </div>
  )

  const gap = { display:'flex', flexDirection:'column' as const, gap:12 }

  switch (section.type) {
    case 'hero':
      return (
        <div style={gap}>
          {inp('Badge (petit texte doré)', 'badge')}
          {ta('Titre (HTML autorisé)', 'titre', 2)}
          {ta('Sous-titre', 'soustitre', 2)}
          {photoField('Image de fond', 'image')}
          <div>
            <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:8 }}>Boutons</label>
            {(d.boutons||[]).map((b, i) => (
              <div key={i} style={{ border:'.5px solid rgba(195,200,195,.3)', padding:10, marginBottom:8 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:6 }}>
                  <div>
                    <label style={{ fontSize:9, color:'#888', textTransform:'uppercase', letterSpacing:'.08em' }}>Texte</label>
                    <input value={b.texte} onChange={e => setArr('boutons', i, 'texte', e.target.value)}
                      style={{ width:'100%', padding:'6px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none', marginTop:3 }}/>
                  </div>
                  <div>
                    <label style={{ fontSize:9, color:'#888', textTransform:'uppercase', letterSpacing:'.08em' }}>Lien</label>
                    <input value={b.href} onChange={e => setArr('boutons', i, 'href', e.target.value)}
                      style={{ width:'100%', padding:'6px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none', marginTop:3 }}/>
                  </div>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <select value={b.style||'dark'} onChange={e => setArr('boutons', i, 'style', e.target.value)}
                    style={{ padding:'5px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none', background:'#fff' }}>
                    {['dark','gold','outline','ghost'].map(s => <option key={s}>{s}</option>)}
                  </select>
                  <button onClick={() => removeFromArr('boutons', i)} style={{ fontSize:10, padding:'3px 8px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer' }}>Supprimer</button>
                </div>
              </div>
            ))}
            <button onClick={() => addToArr('boutons', { texte:'Bouton', href:'/contact', style:'dark' })}
              style={{ fontSize:10, padding:'5px 12px', border:'.5px dashed rgba(184,148,58,.4)', background:'transparent', color:'#B8943A', cursor:'pointer', width:'100%' }}>+ Ajouter un bouton</button>
          </div>
        </div>
      )

    case 'texte_image':
      return (
        <div style={gap}>
          {inp('Badge', 'badge')}
          {inp('Titre', 'titre')}
          {ta('Texte (paragraphe 1)', 'texte')}
          {ta('Texte (paragraphe 2)', 'texte2')}
          {photoField('Image', 'image')}
          <div>
            <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Position de l&apos;image</label>
            <select value={d.position||'droite'} onChange={e => set('position', e.target.value)}
              style={{ width:'100%', padding:'8px 10px', border:'.5px solid rgba(195,200,195,.6)', fontSize:12, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff' }}>
              <option value="droite">Image à droite, texte à gauche</option>
              <option value="gauche">Image à gauche, texte à droite</option>
            </select>
          </div>
          {fondSel()}
          <div>
            <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:8 }}>Boutons</label>
            {(d.boutons||[]).map((b, i) => (
              <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1fr auto', gap:6, marginBottom:6, alignItems:'end' }}>
                <input placeholder="Texte" value={b.texte} onChange={e => setArr('boutons', i, 'texte', e.target.value)}
                  style={{ padding:'7px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none' }}/>
                <input placeholder="Lien" value={b.href} onChange={e => setArr('boutons', i, 'href', e.target.value)}
                  style={{ padding:'7px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none' }}/>
                <button onClick={() => removeFromArr('boutons', i)} style={{ padding:'7px 10px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer', fontSize:11 }}>✕</button>
              </div>
            ))}
            <button onClick={() => addToArr('boutons', { texte:'En savoir plus', href:'/contact', style:'dark' })}
              style={{ fontSize:10, padding:'5px 12px', border:'.5px dashed rgba(184,148,58,.4)', background:'transparent', color:'#B8943A', cursor:'pointer', width:'100%' }}>+ Bouton</button>
          </div>
        </div>
      )

    case 'stats':
      return (
        <div style={gap}>
          {fondSel()}
          <div>
            <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:8 }}>Statistiques</label>
            {(d.stats||[]).map((s, i) => (
              <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1fr auto', gap:6, marginBottom:6, alignItems:'end' }}>
                <input placeholder="Nombre (ex: 45+)" value={s.nombre} onChange={e => setArr('stats', i, 'nombre', e.target.value)}
                  style={{ padding:'7px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none' }}/>
                <input placeholder="Label (ex: Chevaux)" value={s.label} onChange={e => setArr('stats', i, 'label', e.target.value)}
                  style={{ padding:'7px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none' }}/>
                <button onClick={() => removeFromArr('stats', i)} style={{ padding:'7px 10px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer', fontSize:11 }}>✕</button>
              </div>
            ))}
            <button onClick={() => addToArr('stats', { nombre:'0', label:'Label' })}
              style={{ fontSize:10, padding:'5px 12px', border:'.5px dashed rgba(184,148,58,.4)', background:'transparent', color:'#B8943A', cursor:'pointer', width:'100%' }}>+ Statistique</button>
          </div>
        </div>
      )

    case 'cards':
      return (
        <div style={gap}>
          {inp('Badge', 'badge')}
          {inp('Titre', 'titre')}
          {fondSel()}
          <div>
            <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:8 }}>Cartes</label>
            {(d.cards||[]).map((c, i) => (
              <div key={i} style={{ border:'.5px solid rgba(195,200,195,.3)', padding:10, marginBottom:8 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginBottom:6 }}>
                  <input placeholder="Titre" value={c.titre} onChange={e => setArr('cards', i, 'titre', e.target.value)}
                    style={{ padding:'6px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none' }}/>
                  <input placeholder="Icône (ex: handshake)" value={c.icone||''} onChange={e => setArr('cards', i, 'icone', e.target.value)}
                    style={{ padding:'6px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none' }}/>
                </div>
                <textarea placeholder="Description" value={c.texte} rows={2} onChange={e => setArr('cards', i, 'texte', e.target.value)}
                  style={{ width:'100%', padding:'6px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none', resize:'vertical', marginBottom:6 }}/>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <select value={c.fond||'white'} onChange={e => setArr('cards', i, 'fond', e.target.value)}
                    style={{ padding:'5px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none', background:'#fff' }}>
                    <option value="white">Blanc</option>
                    <option value="dark">Vert foncé</option>
                    <option value="gold">Or</option>
                  </select>
                  <button onClick={() => removeFromArr('cards', i)} style={{ fontSize:10, padding:'3px 8px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer' }}>Supprimer</button>
                </div>
              </div>
            ))}
            <button onClick={() => addToArr('cards', { titre:'Nouvelle carte', texte:'Description', icone:'star', fond:'white' })}
              style={{ fontSize:10, padding:'5px 12px', border:'.5px dashed rgba(184,148,58,.4)', background:'transparent', color:'#B8943A', cursor:'pointer', width:'100%' }}>+ Carte</button>
          </div>
        </div>
      )

    case 'temoignages':
      return (
        <div style={gap}>
          {inp('Badge', 'badge')}
          {inp('Titre', 'titre')}
          {fondSel()}
          <div>
            <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:8 }}>Témoignages</label>
            {(d.temoignages||[]).map((t, i) => (
              <div key={i} style={{ border:'.5px solid rgba(195,200,195,.3)', padding:10, marginBottom:8 }}>
                <textarea placeholder="Texte du témoignage" value={t.texte} rows={3} onChange={e => setArr('temoignages', i, 'texte', e.target.value)}
                  style={{ width:'100%', padding:'6px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none', resize:'vertical', marginBottom:6 }}/>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr auto', gap:6, alignItems:'center' }}>
                  <input placeholder="Nom" value={t.nom} onChange={e => setArr('temoignages', i, 'nom', e.target.value)}
                    style={{ padding:'6px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none' }}/>
                  <input placeholder="Rôle" value={t.role} onChange={e => setArr('temoignages', i, 'role', e.target.value)}
                    style={{ padding:'6px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none' }}/>
                  <button onClick={() => removeFromArr('temoignages', i)} style={{ padding:'7px 10px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer', fontSize:11 }}>✕</button>
                </div>
              </div>
            ))}
            <button onClick={() => addToArr('temoignages', { texte:'"Un excellent service."', nom:'Prénom N.', role:'Cavalier' })}
              style={{ fontSize:10, padding:'5px 12px', border:'.5px dashed rgba(184,148,58,.4)', background:'transparent', color:'#B8943A', cursor:'pointer', width:'100%' }}>+ Témoignage</button>
          </div>
        </div>
      )

    case 'cta':
      return (
        <div style={gap}>
          {inp('Badge', 'badge')}
          {inp('Titre', 'titre')}
          {ta('Texte', 'texte')}
          {fondSel()}
          <div style={{ border:'.5px solid rgba(195,200,195,.3)', padding:12 }}>
            <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:8 }}>Bouton</label>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              <input placeholder="Texte" value={d.lien?.texte||''} onChange={e => set('lien', { ...d.lien, texte:e.target.value })}
                style={{ padding:'7px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none' }}/>
              <input placeholder="Lien (/contact)" value={d.lien?.href||''} onChange={e => set('lien', { ...d.lien, href:e.target.value })}
                style={{ padding:'7px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none' }}/>
            </div>
          </div>
        </div>
      )

    case 'faq':
      return (
        <div style={gap}>
          {inp('Badge', 'badge')}
          {inp('Titre', 'titre')}
          {fondSel()}
          <div>
            <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:8 }}>Questions</label>
            {(d.faq||[]).map((f, i) => (
              <div key={i} style={{ border:'.5px solid rgba(195,200,195,.3)', padding:10, marginBottom:8 }}>
                <input placeholder="Question ?" value={f.question} onChange={e => setArr('faq', i, 'question', e.target.value)}
                  style={{ width:'100%', padding:'6px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none', marginBottom:6 }}/>
                <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:6 }}>
                  <textarea placeholder="Réponse" value={f.reponse} rows={2} onChange={e => setArr('faq', i, 'reponse', e.target.value)}
                    style={{ padding:'6px 8px', border:'.5px solid rgba(195,200,195,.6)', fontSize:11, outline:'none', resize:'vertical' }}/>
                  <button onClick={() => removeFromArr('faq', i)} style={{ padding:'6px 10px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer', fontSize:11, alignSelf:'start' }}>✕</button>
                </div>
              </div>
            ))}
            <button onClick={() => addToArr('faq', { question:'Nouvelle question ?', reponse:'Réponse ici.' })}
              style={{ fontSize:10, padding:'5px 12px', border:'.5px dashed rgba(184,148,58,.4)', background:'transparent', color:'#B8943A', cursor:'pointer', width:'100%' }}>+ Question</button>
          </div>
        </div>
      )

    case 'galerie':
      return (
        <div style={gap}>
          {inp('Titre', 'titre')}
          {fondSel()}
          <div>
            <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:8 }}>Photos</label>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:8 }}>
              {(d.images||[]).map((img, i) => (
                <div key={i} style={{ position:'relative' }}>
                  <img src={img} style={{ width:72, height:72, objectFit:'cover' }} alt=""/>
                  <button onClick={() => removeFromArr('images', i)} style={{ position:'absolute', top:2, right:2, background:'rgba(0,0,0,.6)', border:'none', color:'#fff', width:16, height:16, borderRadius:'50%', cursor:'pointer', fontSize:9 }}>✕</button>
                </div>
              ))}
            </div>
            <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:11, color:'#B8943A', cursor:'pointer', border:'.5px dashed rgba(184,148,58,.4)', padding:'8px 14px', width:'fit-content' }}>
              {uploading === 'images' ? 'Chargement...' : '+ Ajouter des photos'}
              <input type="file" accept="image/*" multiple onChange={async e => {
                if (!e.target.files) return
                setUploading('images')
                try {
                  const urls = await Promise.all(Array.from(e.target.files).map(f => uploadImage(f)))
                  const newImages = [...(d.images||[]), ...urls]
                  onChange({ ...section, data: { ...d, images: newImages } })
                } finally { setUploading(null) }
              }} style={{ display:'none' }}/>
            </label>
          </div>
        </div>
      )

    case 'texte':
      return (
        <div style={gap}>
          {inp('Titre (optionnel)', 'titre')}
          {ta('Texte', 'texte', 6)}
          {fondSel()}
        </div>
      )

    default:
      return <p style={{ color:'#888', fontSize:12 }}>Type non supporté.</p>
  }
}
