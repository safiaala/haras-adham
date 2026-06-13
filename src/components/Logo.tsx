'use client'

// Option A : Tête de cheval géométrique minimaliste + monogramme EA
export function LogoA({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="19" stroke="#B8943A" strokeWidth="1"/>
      {/* Tête de cheval stylisée */}
      <path d="M24 8 C24 8 27 10 27 14 C27 17 25 18 24 19 L24 22 C24 22 22 23 20 23 L20 28 C20 29 19 30 18 30 L16 30 C15 30 15 29 16 28 L17 23 C15 22 14 20 14 18 C14 14 17 11 20 10 Z" fill="#B8943A" opacity="0.9"/>
      {/* Crinière */}
      <path d="M20 10 C22 9 25 9 26 11 C27 12 27 13 27 14" stroke="#13201A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Oeil */}
      <circle cx="22" cy="15" r="1.2" fill="#13201A"/>
    </svg>
  )
}

// Option B : Monogramme "EA" stylisé dans un écusson
export function LogoB({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Écusson */}
      <path d="M20 3 L35 9 L35 24 C35 32 20 37 20 37 C20 37 5 32 5 24 L5 9 Z" fill="#13201A" stroke="#B8943A" strokeWidth="1"/>
      {/* Lettres EA */}
      <text x="20" y="26" textAnchor="middle" fill="#B8943A" fontFamily="Georgia, serif" fontSize="14" fontWeight="bold" letterSpacing="-1">EA</text>
      {/* Ligne décorative */}
      <line x1="11" y1="29" x2="29" y2="29" stroke="#B8943A" strokeWidth="0.5" opacity="0.6"/>
    </svg>
  )
}

// Option C : Silhouette cheval galopant ultra-minimaliste + cercle doré
export function LogoC({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cercle extérieur */}
      <circle cx="20" cy="20" r="18" stroke="#B8943A" strokeWidth="0.8"/>
      {/* Cheval galopant simplifié */}
      <g transform="translate(8, 10) scale(0.6)">
        {/* Corps */}
        <ellipse cx="20" cy="16" rx="12" ry="7" fill="#B8943A"/>
        {/* Tête */}
        <ellipse cx="30" cy="10" rx="5" ry="4" fill="#B8943A" transform="rotate(-20 30 10)"/>
        {/* Encolure */}
        <path d="M24 11 C26 9 29 8 30 10" stroke="#B8943A" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Pattes avant */}
        <line x1="26" y1="22" x2="23" y2="30" stroke="#B8943A" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="22" y1="22" x2="28" y2="30" stroke="#B8943A" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Pattes arrière */}
        <line x1="10" y1="22" x2="7" y2="30" stroke="#B8943A" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="14" y1="22" x2="12" y2="30" stroke="#B8943A" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Queue */}
        <path d="M8 14 C4 10 2 8 4 5" stroke="#B8943A" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Crinière */}
        <path d="M29 7 C27 4 25 3 24 5" stroke="#13201A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// Option D : Fer à cheval doré moderne
export function LogoD({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="4" fill="#13201A"/>
      {/* Fer à cheval */}
      <path d="M12 28 L12 18 C12 11 28 11 28 18 L28 28" stroke="#B8943A" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      {/* Clous décoratifs */}
      <circle cx="13.5" cy="27" r="1.5" fill="#B8943A"/>
      <circle cx="26.5" cy="27" r="1.5" fill="#B8943A"/>
      <circle cx="13" cy="21" r="1.2" fill="#B8943A" opacity="0.6"/>
      <circle cx="27" cy="21" r="1.2" fill="#B8943A" opacity="0.6"/>
    </svg>
  )
}

// Logo Elevage Adhame — fidèle au dessin original (trait doré sur fond vert)
export function LogoE({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="110" rx="4" fill="#13201A"/>
      <g stroke="#B8943A" strokeLinecap="round" strokeLinejoin="round" fill="none">

        {/* === TÊTE === */}
        {/* Front (chanfrein droit — caractéristique Barbe) */}
        <path d="M35 78 C34 72 33 66 33 60 C33 54 34 49 36 44" strokeWidth="2.2"/>
        {/* Dessus de la tête */}
        <path d="M36 44 C38 39 41 35 44 32" strokeWidth="2.2"/>

        {/* === OREILLES === */}
        {/* Oreille gauche (visible) */}
        <path d="M44 32 C43 28 44 24 46 22 C48 24 48 28 47 32" strokeWidth="1.8"/>
        {/* Oreille droite (derrière) */}
        <path d="M47 32 C49 28 51 26 52 27 C52 29 51 31 49 33" strokeWidth="1.5"/>

        {/* === ENCOLURE — grande courbe élégante === */}
        {/* Dessus de l'encolure (crinière) */}
        <path d="M47 32 C53 29 62 27 70 28 C76 29 80 33 79 39 C77 46 71 52 64 57 C58 61 52 64 47 68" strokeWidth="2.5"/>
        {/* Bas de l'encolure / poitrail */}
        <path d="M47 68 C44 72 40 76 37 78 C36 79 35 79 35 78" strokeWidth="2.2"/>

        {/* === POITRAIL (bas) === */}
        <path d="M47 68 C50 70 55 71 60 70 C65 69 70 66 72 63" strokeWidth="2"/>

        {/* === MUSEAU / NASEAUX === */}
        <path d="M33 60 C31 61 30 63 30 65 C30 68 32 70 34 70 C36 70 37 68 37 66" strokeWidth="1.8"/>
        {/* Naseau */}
        <path d="M31 65 C30 66 30 68 31 69" strokeWidth="1.4"/>

        {/* === OEIL === */}
        <circle cx="44" cy="47" r="2.5" fill="#B8943A" stroke="none"/>
        <circle cx="44" cy="47" r="3.8" strokeWidth="1" stroke="#B8943A" opacity="0.4"/>

        {/* === BRIDE / LICOL === */}
        {/* Montant de bride */}
        <path d="M36 50 C40 51 44 51 48 50" strokeWidth="1.2" opacity="0.8"/>
        {/* Muserolle */}
        <path d="M33 63 C36 64 40 64 43 63" strokeWidth="1.2" opacity="0.8"/>
        {/* Sous-gorge */}
        <path d="M36 54 C38 56 40 58 41 62" strokeWidth="1" opacity="0.6"/>

        {/* === CRINIÈRE — traits libres === */}
        <path d="M47 32 C45 36 43 41 43 46" strokeWidth="1.4" opacity="0.75"/>
        <path d="M49 31 C47 35 45 40 45 45" strokeWidth="1.1" opacity="0.55"/>
        <path d="M51 30 C50 34 48 39 48 44" strokeWidth="0.9" opacity="0.4"/>

      </g>
    </svg>
  )
}

export default LogoE
