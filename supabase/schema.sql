-- ═══════════════════════════════════════
-- HARAS ADHAM — Schéma base de données
-- ═══════════════════════════════════════

-- CHEVAUX
create table public.chevaux (
  id uuid default gen_random_uuid() primary key,
  nom text not null,
  age integer,
  race text default 'Barbe Marocain',
  sexe text check (sexe in ('Étalon','Jument','Hongre','Poulain','Pouliche')),
  discipline text check (discipline in ('cso','dressage','endurance','tbourida','poulain')),
  pedigree text,
  statut text default 'disponible' check (statut in ('disponible','vendu','pension','reproduction')),
  description text,
  prix text,
  photos text[] default '{}',
  en_vedette boolean default false,
  created_at timestamptz default now()
);

-- ÉTALONS
create table public.etalons (
  id uuid default gen_random_uuid() primary key,
  nom text not null,
  age integer,
  race text default 'Barbe Marocain',
  robe text,
  pedigree text,
  palmares text,
  description text,
  tarif_saillie text,
  methodes text[] default '{}',
  photo text,
  actif boolean default true,
  created_at timestamptz default now()
);

-- ÉVÉNEMENTS
create table public.evenements (
  id uuid default gen_random_uuid() primary key,
  titre text not null,
  date_debut date not null,
  date_fin date,
  lieu text,
  type text default 'autre' check (type in ('comp','stage','vente','autre')),
  description text,
  photo text,
  lien_inscription text,
  created_at timestamptz default now()
);

-- ACTUALITÉS
create table public.actualites (
  id uuid default gen_random_uuid() primary key,
  titre text not null,
  contenu text,
  extrait text,
  photo text,
  publie boolean default true,
  created_at timestamptz default now()
);

-- OFFRES D'EMPLOI
create table public.offres (
  id uuid default gen_random_uuid() primary key,
  titre text not null,
  type text default 'emploi' check (type in ('emploi','stage','benevole')),
  description text,
  profil text,
  contact text,
  active boolean default true,
  created_at timestamptz default now()
);

-- GALERIE
create table public.galerie (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  legende text,
  categorie text default 'general',
  ordre integer default 0,
  created_at timestamptz default now()
);

-- CONFIG SITE (textes éditables)
create table public.config (
  cle text primary key,
  valeur text,
  updated_at timestamptz default now()
);

-- Valeurs par défaut de la config
insert into public.config (cle, valeur) values
  ('navsub', 'Élevage · Compétition · Passion'),
  ('herobadge', 'L''Excellence du Cheval Barbe'),
  ('heroh1', 'Passion du cheval, art de l''élevage.'),
  ('herosub', 'Au cœur du domaine Adham, nous cultivons l''héritage vivant de la noblesse équine marocaine.'),
  ('s1n', '45+'), ('s1l', 'Chevaux'),
  ('s2n', '5'),   ('s2l', 'Prestations'),
  ('s3n', '12'),  ('s3l', 'Titres'),
  ('s4n', '30'),  ('s4l', 'Boxes'),
  ('intro1', 'Au Haras Adham, nous nous consacrons à la préservation de cette race emblématique.'),
  ('intro2', 'Chaque naissance au haras est le fruit d''une réflexion profonde.'),
  ('addr', 'Maroc — À compléter'),
  ('tel', 'À compléter'),
  ('email', 'contact@harasadham.ma'),
  ('ytt', 'Haras Adham — Chaîne YouTube'),
  ('yts', 'Vidéos, coulisses, compétitions');

-- ═══ SÉCURITÉ RLS ═══

alter table public.chevaux enable row level security;
alter table public.etalons enable row level security;
alter table public.evenements enable row level security;
alter table public.actualites enable row level security;
alter table public.offres enable row level security;
alter table public.galerie enable row level security;
alter table public.config enable row level security;

-- Lecture publique pour tout le monde
create policy "lecture publique chevaux"    on public.chevaux    for select using (true);
create policy "lecture publique etalons"    on public.etalons    for select using (true);
create policy "lecture publique evenements" on public.evenements for select using (true);
create policy "lecture publique actualites" on public.actualites for select using (publie = true);
create policy "lecture publique offres"     on public.offres     for select using (active = true);
create policy "lecture publique galerie"    on public.galerie    for select using (true);
create policy "lecture publique config"     on public.config     for select using (true);

-- Écriture uniquement avec service_role (admin)
create policy "admin chevaux"    on public.chevaux    for all using (auth.role() = 'service_role');
create policy "admin etalons"    on public.etalons    for all using (auth.role() = 'service_role');
create policy "admin evenements" on public.evenements for all using (auth.role() = 'service_role');
create policy "admin actualites" on public.actualites for all using (auth.role() = 'service_role');
create policy "admin offres"     on public.offres     for all using (auth.role() = 'service_role');
create policy "admin galerie"    on public.galerie    for all using (auth.role() = 'service_role');
create policy "admin config"     on public.config     for all using (auth.role() = 'service_role');
