-- Migration : ajout de la page Galerie dans la navigation
-- À exécuter via le dashboard Supabase → SQL Editor

insert into public.pages (slug, actif, ordre)
values ('galerie', true, 6)
on conflict (slug) do update set actif = true, ordre = 6;

-- Décale les pages suivantes
update public.pages set ordre = 7  where slug = 'histoire';
update public.pages set ordre = 8  where slug = 'actualites';
update public.pages set ordre = 9  where slug = 'jobs';
update public.pages set ordre = 10 where slug = 'contact';

-- Clés config pour les réseaux sociaux (à renseigner via l'admin ou ici)
insert into public.config (cle, valeur) values
  ('social_youtube',   'https://www.youtube.com/@harasadham1227'),
  ('social_instagram', 'https://www.instagram.com/haras.adham.maroc/'),
  ('social_facebook',  ''),
  ('social_whatsapp',  '')
on conflict (cle) do nothing;
