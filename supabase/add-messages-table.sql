-- Migration : table messages (formulaire de contact)
-- À exécuter dans Supabase SQL Editor

create table if not exists public.messages (
  id         uuid    default gen_random_uuid() primary key,
  nom        text    not null,
  email      text    not null,
  tel        text,
  sujet      text,
  message    text    not null,
  lu         boolean default false,
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

-- Lecture admin uniquement
create policy "admin messages" on public.messages for all using (auth.role() = 'service_role');
