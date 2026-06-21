export type SectionType = 'hero' | 'texte_image' | 'stats' | 'cards' | 'temoignages' | 'cta' | 'faq' | 'galerie' | 'texte'
export type Locale = 'fr' | 'en' | 'es' | 'ar'

export interface Bouton { texte: string; href: string; style?: 'dark' | 'gold' | 'outline' | 'ghost' }
export interface StatItem { nombre: string; label: string }
export interface CardItem { titre: string; texte: string; icone?: string; fond?: 'white' | 'dark' | 'gold' }
export interface TemoignageItem { texte: string; nom: string; role: string }
export interface FaqItem { question: string; reponse: string }

export type TranslatableFields = {
  badge?: string
  titre?: string
  soustitre?: string
  texte?: string
  texte2?: string
  boutons?: Bouton[]
  stats?: StatItem[]
  cards?: CardItem[]
  temoignages?: TemoignageItem[]
  faq?: FaqItem[]
  lien?: Bouton
}

export interface SectionData extends TranslatableFields {
  image?: string
  position?: 'gauche' | 'droite'
  fond?: string
  images?: string[]
  translations?: {
    en?: TranslatableFields
    es?: TranslatableFields
    ar?: TranslatableFields
  }
}

export interface Section {
  id: string
  page: string
  type: SectionType
  ordre: number
  actif: boolean
  data: SectionData
}

export function getLocalizedData(data: SectionData, locale: Locale): SectionData {
  if (locale === 'fr' || !data.translations?.[locale]) return data
  const t = data.translations[locale]!
  return { ...data, ...Object.fromEntries(Object.entries(t).filter(([,v]) => v !== undefined && v !== '')) }
}

export const SECTION_TYPES: { type: SectionType; label: string; emoji: string; desc: string }[] = [
  { type:'hero',         label:'Hero',           emoji:'🖼️', desc:'Grande image avec titre et boutons' },
  { type:'texte_image',  label:'Texte + Image',  emoji:'📄', desc:'Texte à gauche ou droite, image de l\'autre côté' },
  { type:'stats',        label:'Statistiques',   emoji:'📊', desc:'Barre de chiffres clés' },
  { type:'cards',        label:'Cartes',         emoji:'🃏', desc:'Grille de cartes (services, etc.)' },
  { type:'temoignages',  label:'Témoignages',    emoji:'💬', desc:'Avis clients' },
  { type:'cta',          label:'Appel à action', emoji:'👆', desc:'Section avec bouton d\'action' },
  { type:'faq',          label:'FAQ',            emoji:'❓', desc:'Questions-réponses' },
  { type:'galerie',      label:'Galerie',        emoji:'🖼', desc:'Grille de photos' },
  { type:'texte',        label:'Texte libre',    emoji:'✍️', desc:'Bloc de texte' },
]

export const defaultData: Record<SectionType, SectionData> = {
  hero: { badge:'Badge', titre:'Titre principal', soustitre:'Sous-titre', image:'', boutons:[{ texte:'Découvrir', href:'/contact', style:'gold' }] },
  texte_image: { badge:'Badge', titre:'Titre', texte:'Description.', texte2:'', image:'', position:'gauche', fond:'#fbf9f5', boutons:[{ texte:'En savoir plus', href:'/contact', style:'dark' }] },
  stats: { stats:[{ nombre:'45+', label:'Chevaux' },{ nombre:'5', label:'Prestations' },{ nombre:'12', label:'Titres' },{ nombre:'30', label:'Boxes' }], fond:'#f0ece4' },
  cards: { badge:'Badge', titre:'Titre', fond:'#f0ece4', cards:[{ titre:'Carte 1', texte:'Description.', icone:'star', fond:'white' },{ titre:'Carte 2', texte:'Description.', icone:'star', fond:'dark' }] },
  temoignages: { badge:'L\'avis de nos clients', titre:'Témoignages', fond:'#13201A', temoignages:[{ texte:'"Un témoignage."', nom:'Prénom N.', role:'Cavalier' }] },
  cta: { badge:'Nous contacter', titre:'Vivez l\'expérience Adham', texte:'Nous vous accueillons sur rendez-vous.', fond:'#f0ece4', lien:{ texte:'Prendre rendez-vous', href:'/contact', style:'dark' } },
  faq: { badge:'Vos questions', titre:'FAQ', fond:'#f0ece4', faq:[{ question:'Question ?', reponse:'Réponse.' }] },
  galerie: { titre:'Galerie', images:[], fond:'#fbf9f5' },
  texte: { titre:'', texte:'Votre texte ici.', fond:'#fbf9f5' },
}

export const TRANSLATABLE_FIELDS_BY_TYPE: Record<SectionType, (keyof TranslatableFields)[]> = {
  hero:        ['badge','titre','soustitre','boutons'],
  texte_image: ['badge','titre','texte','texte2','boutons'],
  stats:       ['stats'],
  cards:       ['badge','titre','cards'],
  temoignages: ['badge','titre','temoignages'],
  cta:         ['badge','titre','texte','lien'],
  faq:         ['badge','titre','faq'],
  galerie:     ['titre'],
  texte:       ['titre','texte'],
}

export const PAGES = [
  { slug:'accueil',     label:'Accueil',     emoji:'🏠' },
  { slug:'chevaux',     label:'Chevaux',     emoji:'🐴' },
  { slug:'etalons',     label:'Étalons',     emoji:'🏆' },
  { slug:'prestations', label:'Prestations', emoji:'🏇' },
  { slug:'evenements',  label:'Événements',  emoji:'📅' },
  { slug:'galerie',     label:'Galerie',     emoji:'🖼️' },
  { slug:'histoire',    label:'Histoire',    emoji:'📜' },
  { slug:'actualites',  label:'Actualités',  emoji:'📰' },
  { slug:'jobs',        label:'Jobs',        emoji:'💼' },
  { slug:'contact',     label:'Contact',     emoji:'✉️' },
]
