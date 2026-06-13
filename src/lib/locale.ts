export const LOCALES = [
  { code: 'fr', label: 'FR', name: 'Français', dir: 'ltr' },
  { code: 'en', label: 'EN', name: 'English',  dir: 'ltr' },
  { code: 'es', label: 'ES', name: 'Español',  dir: 'ltr' },
  { code: 'ar', label: 'AR', name: 'العربية',   dir: 'rtl' },
] as const

export type Locale = 'fr' | 'en' | 'es' | 'ar'

export const LOCALE_NAMES: Record<Locale, string> = {
  fr: 'Français', en: 'English', es: 'Español', ar: 'العربية'
}

export function getLocaleDir(locale: Locale) {
  return locale === 'ar' ? 'rtl' : 'ltr'
}
