# Supabase Integration — Phase 1

## Status: Implemented (SQL pending manual run)

## Manual step required

Run `supabase/migrations/001_create_tables.sql` in the Supabase SQL editor:
https://supabase.com/dashboard/project/rocybqcwizkrdwmbyhwv/sql

## What was implemented

- `src/lib/supabase.ts` — Supabase client (uses `VITE_SUPABASE_ANON_KEY`)
- `src/lib/repository.ts` — Repository pattern:
  - `TopicRepository` / `ReportRepository` interfaces
  - `LocalTopicRepository` / `LocalReportRepository` — localStorage fallback
  - `SupabaseTopicRepository` / `SupabaseReportRepository` — Supabase implementations
  - `runMigrationIfNeeded()` — one-time localStorage → Supabase migration (flag: `weekly-reporting:supabase-migrated:v1`)
  - `createSupabaseRepositories()` — factory used in `index.tsx`
- `src/routes/index.tsx` — updated to async load/save with localStorage fallback

## What was NOT changed

- Auth, RLS, permissions (none implemented — Phase 1 is open access)
- UI layout, filtering, Excel export
- localStorage key `weekly-reporting:topics:v3` (still written as fallback on every save)

## Project details

- Project ID: `rocybqcwizkrdwmbyhwv`
- URL: `https://rocybqcwizkrdwmbyhwv.supabase.co`
- Key env var: `VITE_SUPABASE_ANON_KEY` (also aliased as `VITE_SUPABASE_PUBLISHABLE_KEY` for Lovable compatibility)
