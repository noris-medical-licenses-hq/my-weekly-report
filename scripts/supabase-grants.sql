-- Run this once in the Supabase SQL editor:
-- https://supabase.com/dashboard/project/rocybqcwizkrdwmbyhwv/sql
--
-- Phase 1: no auth — allow anon key full access to both tables.
-- Required because Supabase enables RLS by default with no policies = blocked.

grant all on table public.reports to anon;
grant all on table public.topics  to anon;

alter table public.reports enable row level security;
alter table public.topics  enable row level security;

drop policy if exists "anon_all" on public.reports;
drop policy if exists "anon_all" on public.topics;

create policy "anon_all" on public.reports
  for all to anon using (true) with check (true);

create policy "anon_all" on public.topics
  for all to anon using (true) with check (true);
