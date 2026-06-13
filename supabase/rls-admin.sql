-- Autoriser les écritures depuis le client (admin authentifié par cookie)
-- On supprime les anciennes policies d'écriture et on les remplace

-- CHEVAUX
drop policy if exists "admin chevaux" on public.chevaux;
create policy "admin chevaux insert" on public.chevaux for insert with check (true);
create policy "admin chevaux update" on public.chevaux for update using (true);
create policy "admin chevaux delete" on public.chevaux for delete using (true);

-- ETALONS
drop policy if exists "admin etalons" on public.etalons;
create policy "admin etalons insert" on public.etalons for insert with check (true);
create policy "admin etalons update" on public.etalons for update using (true);
create policy "admin etalons delete" on public.etalons for delete using (true);

-- EVENEMENTS
drop policy if exists "admin evenements" on public.evenements;
create policy "admin evenements insert" on public.evenements for insert with check (true);
create policy "admin evenements update" on public.evenements for update using (true);
create policy "admin evenements delete" on public.evenements for delete using (true);

-- ACTUALITES
drop policy if exists "admin actualites" on public.actualites;
create policy "admin actualites insert" on public.actualites for insert with check (true);
create policy "admin actualites update" on public.actualites for update using (true);
create policy "admin actualites delete" on public.actualites for delete using (true);

-- OFFRES
drop policy if exists "admin offres" on public.offres;
create policy "admin offres insert" on public.offres for insert with check (true);
create policy "admin offres update" on public.offres for update using (true);
create policy "admin offres delete" on public.offres for delete using (true);

-- GALERIE
drop policy if exists "admin galerie" on public.galerie;
create policy "admin galerie insert" on public.galerie for insert with check (true);
create policy "admin galerie update" on public.galerie for update using (true);
create policy "admin galerie delete" on public.galerie for delete using (true);

-- CONFIG
drop policy if exists "admin config" on public.config;
create policy "admin config update" on public.config for update using (true);
