-- CORRECTIF SÉCURITÉ : restreindre les écritures au service_role uniquement
-- Les lectures publiques (select) restent ouvertes pour le site vitrine
-- À exécuter dans Supabase SQL Editor

-- HELPER : liste des tables à protéger
-- chevaux, etalons, evenements, actualites, offres, galerie, config, pages, sections, messages

do $$
declare
  t text;
begin
  foreach t in array array['chevaux','etalons','evenements','actualites','offres','galerie','config','pages','sections'] loop
    execute format('drop policy if exists "admin %s insert" on public.%I', t, t);
    execute format('drop policy if exists "admin %s update" on public.%I', t, t);
    execute format('drop policy if exists "admin %s delete" on public.%I', t, t);

    execute format(
      'create policy "service_role %s write" on public.%I for all to service_role using (true) with check (true)',
      t, t
    );
  end loop;
end $$;

-- Messages : service_role uniquement (lecture via API route admin authentifiée)
drop policy if exists "service_role messages write" on public.messages;
drop policy if exists "lecture admin messages" on public.messages;
drop policy if exists "anon messages select" on public.messages;

create policy "service_role messages all" on public.messages
  for all to service_role using (true) with check (true);
