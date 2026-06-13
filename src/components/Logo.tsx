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

// Option E : Tête de cheval trait minimaliste (inspiré logo réel Elevage Adhame)
export function LogoE({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="50" height="50" rx="3" fill="#13201A"/>
      {/* Tête de cheval - trait doré style gravure */}
      <g stroke="#B8943A" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Chanfrein / museau */}
        <path d="M18 38 C17 36 16 34 16 32 C16 29 17 27 18 25" strokeWidth="1.8"/>
        {/* Front */}
        <path d="M18 25 C19 22 20 19 22 17" strokeWidth="1.8"/>
        {/* Oreilles */}
        <path d="M22 17 C22 15 23 13 24 12 C25 13 25 15 24 17" strokeWidth="1.5"/>
        <path d="M24 12 C25 11 26 11 27 12" strokeWidth="1.2"/>
        {/* Encolure arrière - grande courbe */}
        <path d="M24 17 C27 16 31 15 34 16 C36 17 37 19 36 22 C35 26 32 29 29 31" strokeWidth="1.8"/>
        {/* Bas de l'encolure */}
        <path d="M29 31 C27 33 24 35 22 37 C20 38 18 38 18 38" strokeWidth="1.8"/>
        {/* Naseau */}
        <path d="M16 32 C15 33 15 34 16 35 C17 35 18 34 18 33" strokeWidth="1.3"/>
        {/* Oeil */}
        <circle cx="24" cy="21" r="1.2" fill="#B8943A" stroke="none"/>
        {/* Bride / licol */}
        <path d="M17 29 C20 30 23 30 26 29" strokeWidth="1"/>
        <path d="M17 33 L28 33" strokeWidth="0.8" opacity="0.6"/>
        {/* Crinière - quelques traits */}
        <path d="M24 17 C23 19 22 21 22 23" strokeWidth="1" opacity="0.7"/>
        <path d="M25 16 C24 18 23 20 23 22" strokeWidth="0.8" opacity="0.5"/>
      </g>
    </svg>
  )
}

export default LogoE
