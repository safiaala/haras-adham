'use client'
import { useEffect, useState } from 'react'
import { Section, getLocalizedData } from '@/lib/sections'
import { Locale } from '@/lib/locale'
import SectionRenderer from './SectionRenderer'
import { supabase } from '@/lib/supabase'

export default function PageRenderer({ page, extra }: { page: string; extra?: React.ReactNode }) {
  const [sections, setSections] = useState<Section[]>([])
  const [locale, setLocale] = useState<Locale>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale
    if (saved && ['fr','en','es','ar'].includes(saved)) setLocale(saved)

    supabase.from('sections').select('*').eq('page', page).order('ordre')
      .then(({ data }) => setSections((data || []) as Section[]))

    const handler = (e: Event) => setLocale((e as CustomEvent).detail as Locale)
    window.addEventListener('locale-change', handler)
    return () => window.removeEventListener('locale-change', handler)
  }, [page])

  return (
    <>
      {sections.filter(s => s.actif).map(s => (
        <SectionRenderer key={s.id} s={{ ...s, data: getLocalizedData(s.data, locale) }}/>
      ))}
      {extra}
    </>
  )
}
