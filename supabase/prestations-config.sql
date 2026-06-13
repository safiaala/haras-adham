insert into public.config (cle, valeur) values
  -- VENTE
  ('pvente_titre', 'Vente'),
  ('pvente_badge', 'Acquisition & Courtage'),
  ('pvente_desc', 'Accompagnement dans la recherche et l''acquisition de votre futur partenaire. Du jeune cheval prometteur au crack de Grand Prix. Réseau étendu en Afrique du Nord et Europe.'),
  ('pvente_photo', ''),
  -- PENSION
  ('ppens_titre', 'Pension'),
  ('ppens_badge', 'Sérénité & Confort'),
  ('ppens_desc', '30 boxes 4×4m, paille ou copeaux. Sorties paddock 4h/jour. Alimentation premium. Rapport photo hebdomadaire. Accès 7j/7.'),
  ('ppens_photo', ''),
  -- ENSEIGNEMENT
  ('pens_titre', 'Enseignement'),
  ('pens_badge', 'Pédagogie & Harmonie'),
  ('pens_desc', 'Cours individuels et petits groupes (max 4). Stages perfectionnement. Tous niveaux, méthodes douces. Préparation Galop 1–7.'),
  ('pens_photo', ''),
  -- COMPETITION
  ('pcomp_titre', 'Compétition'),
  ('pcomp_badge', 'Performance & Rigueur'),
  ('pcomp_desc', 'Préparation sportive, suivi vétérinaire sportif. Circuits CSI, CDI nationaux et internationaux. Camion transport 6 chevaux.'),
  ('pcomp_photo', ''),
  -- REPRODUCTION
  ('prepro_titre', 'Reproduction'),
  ('prepro_badge', 'Génétique & Futur'),
  ('prepro_desc', 'IAF, IAC et monte naturelle. Suivi gynécologique par échographie. Poulinage sous surveillance 24h/24. Transfert d''embryons disponible.'),
  ('prepro_photo', '')
on conflict (cle) do nothing;
