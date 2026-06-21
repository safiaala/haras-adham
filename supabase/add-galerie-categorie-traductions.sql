-- Migration : ajout des traductions de catégorie pour la galerie
-- À exécuter via le dashboard Supabase → SQL Editor

alter table public.galerie
  add column if not exists categorie_en text,
  add column if not exists categorie_es text,
  add column if not exists categorie_ar text;
