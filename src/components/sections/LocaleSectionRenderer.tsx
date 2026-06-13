'use client'
import { useEffect, useState } from 'react'
import { Section, getLocalizedData } from '@/lib/sections'
import { Locale } from '@/lib/locale'
import SectionRenderer from './SectionRenderer'

export default function LocaleSectionRenderer({ sections }: { sections: Section[] }) {
  const [locale, setLocale] = useState<Locale>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale
    if (saved) setLocale(saved)
    const handler = (e: Event) => setLocale((e as CustomEvent).detail as Locale)
    window.addEventListener('locale-change', handler)
    return () => window.removeEventListener('locale-change', handler)
  }, [])

  return (
    <>
      {sections.filter(s => s.actif).map(s => (
        <SectionRenderer key={s.id} s={{ ...s, data: getLocalizedData(s.data, locale) }}/>
      ))}
    </>
  )
}
