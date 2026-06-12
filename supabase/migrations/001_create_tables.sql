-- Run this manually in the Supabase SQL editor:
-- https://supabase.com/dashboard/project/rocybqcwizkrdwmbyhwv/sql

create table if not exists public.reports (
  id          uuid        default gen_random_uuid() primary key,
  week_start  date        not null,
  week_end    date        not null,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

create table if not exists public.topics (
  id                      uuid        primary key,
  report_id               uuid        not null references public.reports(id) on delete cascade,
  group_name              text        not null,
  topic_name              text        not null,
  previous_week_update    text        not null default '',
  current_week_update     text        not null default '',
  risks_and_challenges    text        not null default '',
  next_week_priority      text        not null default '',
  support_required        text        not null default '',
  reviewed                boolean     not null default false,
  priority                text        not null,
  status                  text        not null,
  changed_since_previous  boolean     not null default false,
  created_at              timestamptz default now() not null,
  updated_at              timestamptz not null
);

create index if not exists topics_report_id_idx on public.topics(report_id);

-- Auto-update updated_at on reports
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists reports_set_updated_at on public.reports;
create trigger reports_set_updated_at
  before update on public.reports
  for each row execute procedure public.set_updated_at();

-- Allow the anon (publishable) key full access — Phase 1: no auth
grant all on table public.reports to anon;
grant all on table public.topics  to anon;

-- RLS policies (open for Phase 1 — no auth, no user-scoping)
alter table public.reports enable row level security;
alter table public.topics  enable row level security;

create policy "anon_all" on public.reports
  for all to anon using (true) with check (true);

create policy "anon_all" on public.topics
  for all to anon using (true) with check (true);
