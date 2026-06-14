-- ═══════════════════════════════════════════════════════════════
-- HARAS ADHAM — Schéma base de données COMPLET (état actuel)
-- Dernière mise à jour : Juin 2026
-- ═══════════════════════════════════════════════════════════════

-- ──────────────────────────────────────────────────────────────
-- TABLE : chevaux
-- ──────────────────────────────────────────────────────────────
create table public.chevaux (
  id              uuid    default gen_random_uuid() primary key,
  nom             text    not null,
  annee_naissance integer,
  race            text    default 'Barbe Marocain',
  sexe            text    check (sexe in ('Étalon','Jument','Hongre','Cheval','Poulain','Pouliche')),
  discipline      text    check (discipline in ('show','saut','endurance','polo','attelage','dressage')),
  taille_cm       integer,
  nom_pere        text,
  nom_mere        text,
  statut          text    default 'disponible' check (statut in ('disponible','vendu','pension','reproduction')),
  description     text,
  prix            text,
  video_url       text,
  pedigree        text,   -- notes internes, non publiées
  photos          text[]  default '{}',
  en_vedette      boolean default false,
  actif           boolean default true,
  created_at      timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────
-- TABLE : etalons
-- ──────────────────────────────────────────────────────────────
create table public.etalons (
  id                  uuid    default gen_random_uuid() primary key,
  nom                 text    not null,
  annee_naissance     integer,
  race                text    default 'Barbe Marocain',
  robe                text,
  taille_cm           integer,
  eleveur             text,
  statut              text    default 'disponible' check (statut in ('disponible','vendu','pension','reproduction')),
  nom_pere            text,
  nom_mere            text,
  -- Textes longs — FR + traductions EN/ES/AR
  description         text,
  description_en      text,
  description_es      text,
  description_ar      text,
  origine             text,
  origine_en          text,
  origine_es          text,
  origine_ar          text,
  palmares            text,
  palmares_en         text,
  palmares_es         text,
  palmares_ar         text,
  performance         text,
  performance_en      text,
  performance_es      text,
  performance_ar      text,
  production          text,
  production_en       text,
  production_es       text,
  production_ar       text,
  -- Champs techniques
  tarif_saillie       text,
  methodes            text[]  default '{}',
  video_url           text,
  pedigree            text,   -- notes internes, non publiées
  photos              text[]  default '{}',
  photo               text,   -- ancien champ, conservé pour compatibilité
  -- Caractérisation PAX (JSONB, clés = noms de traits, valeurs = 1..4 step 0.5)
  caracterisation     jsonb   default '{}',
  show_caracterisation boolean default true,
  actif               boolean default true,
  created_at          timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────
-- TABLE : evenements
-- ──────────────────────────────────────────────────────────────
create table public.evenements (
  id               uuid  default gen_random_uuid() primary key,
  titre            text  not null,
  date_debut       date  not null,
  date_fin         date,
  lieu             text,
  type             text  default 'autre' check (type in ('comp','stage','vente','autre')),
  description      text,
  photo            text,
  lien_inscription text,
  created_at       timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────
-- TABLE : actualites
-- ──────────────────────────────────────────────────────────────
create table public.actualites (
  id               uuid  default gen_random_uuid() primary key,
  titre            text  not null,
  titre_en         text,
  titre_es         text,
  titre_ar         text,
  contenu_copie    text,
  contenu_copie_en text,
  contenu_copie_es text,
  contenu_copie_ar text,
  extrait          text,
  extrait_en       text,
  extrait_es       text,
  extrait_ar       text,
  photo            text,
  auteur           text,
  url_source       text,
  publie           boolean default true,
  created_at       timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────
-- TABLE : offres (emploi/stage/bénévolat)
-- ──────────────────────────────────────────────────────────────
create table public.offres (
  id          uuid  default gen_random_uuid() primary key,
  titre       text  not null,
  type        text  default 'emploi' check (type in ('emploi','stage','benevole')),
  description text,
  profil      text,
  contact     text,
  active      boolean default true,
  created_at  timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────
-- TABLE : galerie
-- ──────────────────────────────────────────────────────────────
create table public.galerie (
  id         uuid    default gen_random_uuid() primary key,
  url        text    not null,
  legende    text,
  categorie  text    default 'general',
  ordre      integer default 0,
  created_at timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────
-- TABLE : config (textes éditables via /admin)
-- ──────────────────────────────────────────────────────────────
create table public.config (
  cle        text primary key,
  valeur     text,
  updated_at timestamptz default now()
);

insert into public.config (cle, valeur) values
  ('navsub',       'Élevage · Compétition · Passion'),
  ('herobadge',    'L''Excellence du Cheval Barbe'),
  ('heroh1',       'Passion du cheval, art de l''élevage.'),
  ('herosub',      'Au cœur du domaine Adham, nous cultivons l''héritage vivant de la noblesse équine marocaine.'),
  ('s1n', '45+'),  ('s1l', 'Chevaux'),
  ('s2n', '5'),    ('s2l', 'Prestations'),
  ('s3n', '12'),   ('s3l', 'Titres'),
  ('s4n', '30'),   ('s4l', 'Boxes'),
  ('intro1', 'Au Haras Adham, nous nous consacrons à la préservation de cette race emblématique.'),
  ('intro2', 'Chaque naissance au haras est le fruit d''une réflexion profonde.'),
  ('addr',   'Maroc — À compléter'),
  ('tel',    'À compléter'),
  ('email',  'contact@harasadham.ma'),
  ('ytt',    'Haras Adham — Chaîne YouTube'),
  ('yts',    'Vidéos, coulisses, compétitions'),
  -- Étalons — bloc conseil
  ('etalons_conseil_badge',  'Notre expertise'),
  ('etalons_conseil_titre',  'Bien choisir son étalon'),
  ('etalons_conseil_item1',  'Étude du pedigree et des performances'),
  ('etalons_conseil_item2',  'Compatibilité morphologique avec la jument'),
  ('etalons_conseil_item3',  'Conseil personnalisé par nos experts'),
  ('etalons_conseil_cta',    'Prendre rendez-vous');

-- ──────────────────────────────────────────────────────────────
-- TABLE : pages (visibilité dans la navigation)
-- ──────────────────────────────────────────────────────────────
create table public.pages (
  slug       text    primary key,
  actif      boolean default true,
  ordre      integer default 0
);

insert into public.pages (slug, actif, ordre) values
  ('accueil',     true, 1),
  ('chevaux',     true, 2),
  ('etalons',     true, 3),
  ('prestations', true, 4),
  ('evenements',  true, 5),
  ('histoire',    true, 6),
  ('actualites',  true, 7),
  ('jobs',        true, 8),
  ('contact',     true, 9);

-- ──────────────────────────────────────────────────────────────
-- TABLE : sections (contenu dynamique des pages)
-- Gérée via /admin/editeur/[page]
-- ──────────────────────────────────────────────────────────────
create table public.sections (
  id         uuid    default gen_random_uuid() primary key,
  page       text    not null,
  type       text    not null,  -- hero | texte_image | stats | cards | temoignages | cta | faq | galerie | texte
  data       jsonb   default '{}',
  ordre      integer default 0,
  actif      boolean default true,
  created_at timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────
-- SÉCURITÉ — Row Level Security
-- ──────────────────────────────────────────────────────────────
alter table public.chevaux    enable row level security;
alter table public.etalons    enable row level security;
alter table public.evenements enable row level security;
alter table public.actualites enable row level security;
alter table public.offres     enable row level security;
alter table public.galerie    enable row level security;
alter table public.config     enable row level security;
alter table public.pages      enable row level security;
alter table public.sections   enable row level security;

-- Lecture publique
create policy "lecture publique chevaux"    on public.chevaux    for select using (true);
create policy "lecture publique etalons"    on public.etalons    for select using (true);
create policy "lecture publique evenements" on public.evenements for select using (true);
create policy "lecture publique actualites" on public.actualites for select using (publie = true);
create policy "lecture publique offres"     on public.offres     for select using (active = true);
create policy "lecture publique galerie"    on public.galerie    for select using (true);
create policy "lecture publique config"     on public.config     for select using (true);
create policy "lecture publique pages"      on public.pages      for select using (true);
create policy "lecture publique sections"   on public.sections   for select using (true);

-- Écriture admin (service_role via SUPABASE_SERVICE_ROLE_KEY)
create policy "admin chevaux"    on public.chevaux    for all using (auth.role() = 'service_role');
create policy "admin etalons"    on public.etalons    for all using (auth.role() = 'service_role');
create policy "admin evenements" on public.evenements for all using (auth.role() = 'service_role');
create policy "admin actualites" on public.actualites for all using (auth.role() = 'service_role');
create policy "admin offres"     on public.offres     for all using (auth.role() = 'service_role');
create policy "admin galerie"    on public.galerie    for all using (auth.role() = 'service_role');
create policy "admin config"     on public.config     for all using (auth.role() = 'service_role');
create policy "admin pages"      on public.pages      for all using (auth.role() = 'service_role');
create policy "admin sections"   on public.sections   for all using (auth.role() = 'service_role');
