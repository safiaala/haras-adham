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
  pedigree?: string
  palmares?: string
  production?: string
  description?: string
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
  ordre?: number
  created_at?: string
}
