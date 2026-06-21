export interface Country {
  code: string
  flag: string
  name: string
  dial: string
}

export const COUNTRIES: Country[] = [
  { code:'MA', flag:'🇲🇦', name:'Maroc',           dial:'+212' },
  { code:'FR', flag:'🇫🇷', name:'France',           dial:'+33'  },
  { code:'BE', flag:'🇧🇪', name:'Belgique',         dial:'+32'  },
  { code:'CH', flag:'🇨🇭', name:'Suisse',           dial:'+41'  },
  { code:'ES', flag:'🇪🇸', name:'Espagne',          dial:'+34'  },
  { code:'DE', flag:'🇩🇪', name:'Allemagne',        dial:'+49'  },
  { code:'IT', flag:'🇮🇹', name:'Italie',           dial:'+39'  },
  { code:'NL', flag:'🇳🇱', name:'Pays-Bas',         dial:'+31'  },
  { code:'PT', flag:'🇵🇹', name:'Portugal',         dial:'+351' },
  { code:'GB', flag:'🇬🇧', name:'Royaume-Uni',      dial:'+44'  },
  { code:'DZ', flag:'🇩🇿', name:'Algérie',          dial:'+213' },
  { code:'TN', flag:'🇹🇳', name:'Tunisie',          dial:'+216' },
  { code:'LY', flag:'🇱🇾', name:'Libye',            dial:'+218' },
  { code:'MR', flag:'🇲🇷', name:'Mauritanie',       dial:'+222' },
  { code:'SN', flag:'🇸🇳', name:'Sénégal',          dial:'+221' },
  { code:'CI', flag:'🇨🇮', name:"Côte d'Ivoire",    dial:'+225' },
  { code:'SA', flag:'🇸🇦', name:'Arabie Saoudite',  dial:'+966' },
  { code:'AE', flag:'🇦🇪', name:'Émirats Arabes',   dial:'+971' },
  { code:'QA', flag:'🇶🇦', name:'Qatar',            dial:'+974' },
  { code:'KW', flag:'🇰🇼', name:'Koweït',           dial:'+965' },
  { code:'BH', flag:'🇧🇭', name:'Bahreïn',          dial:'+973' },
  { code:'OM', flag:'🇴🇲', name:'Oman',             dial:'+968' },
  { code:'EG', flag:'🇪🇬', name:'Égypte',           dial:'+20'  },
  { code:'US', flag:'🇺🇸', name:'États-Unis',       dial:'+1'   },
  { code:'CA', flag:'🇨🇦', name:'Canada',           dial:'+1'   },
]

/** Trouve le pays à partir d'un numéro stocké (ex: "+212612345678") */
export function countryFromTel(tel: string): Country | null {
  if (!tel) return null
  const normalized = tel.startsWith('+') ? tel : '+' + tel
  // Trier par longueur décroissante de l'indicatif pour éviter les faux positifs (+1 vs +213)
  const sorted = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length)
  return sorted.find(c => normalized.startsWith(c.dial)) ?? null
}
