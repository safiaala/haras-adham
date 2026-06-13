'use client'
import { useEffect, useState } from 'react'
import { Locale } from './locale'

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale
    if (saved && ['fr','en','es','ar'].includes(saved)) setLocale(saved)
    const handler = (e: Event) => setLocale((e as CustomEvent).detail as Locale)
    window.addEventListener('locale-change', handler)
    return () => window.removeEventListener('locale-change', handler)
  }, [])

  return locale
}
