export interface Cheval {
  id: string
  nom: string
  annee_naissance?: number
  race?: string
  sexe?: string
  discipline?: string
  pedigree?: string
  video_url?: string
  taille_cm?: number
  nom_pere?: string
  nom_mere?: string
  statut?: string
  description?: string
  prix?: string
  photos?: string[]
  en_vedette?: boolean
  created_at?: string
}

export interface Etalon {
  id: string
  nom: string
  annee_naissance?: number
  race?: string
  robe?: string
  taille_cm?: number
  eleveur?: string
  studbook?: string
  statut?: string
  nom_pere?: string
  nom_mere?: string
  origine?: string
  origine_en?: string
  origine_es?: string
  origine_ar?: string
  pedigree?: string
  palmares?: string
  palmares_en?: string
  palmares_es?: string
  palmares_ar?: string
  performance?: string
  performance_en?: string
  performance_es?: string
  performance_ar?: string
  production?: string
  production_en?: string
  production_es?: string
  production_ar?: string
  show_caracterisation?: boolean
  description?: string
  description_en?: string
  description_es?: string
  description_ar?: string
  tarif_saillie?: string
  methodes?: string[]
  photo?: string
  photos?: string[]
  video_url?: string
  caracterisation?: Record<string, number>
  actif?: boolean
  created_at?: string
}

export interface Evenement {
  id: string
  titre: string
  date_debut: string
  date_fin?: string
  lieu?: string
  type?: string
  description?: string
  photo?: string
  lien_inscription?: string
  created_at?: string
}

export interface Actualite {
  id: string
  titre: string
  contenu?: string
  extrait?: string
  photo?: string
  publie?: boolean
  created_at?: string
}

export interface Offre {
  id: string
  titre: string
  type?: string
  description?: string
  profil?: string
  contact?: string
  active?: boolean
  created_at?: string
}

export interface GaleriePhoto {
  id: string
  url: string
  legende?: string
  categorie?: string
  categorie_en?: string
  categorie_es?: string
  categorie_ar?: string
  ordre?: number
  created_at?: string
}
