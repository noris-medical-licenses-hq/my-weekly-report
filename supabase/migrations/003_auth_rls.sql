-- Replace open anon access with authenticated-only access.
-- Run manually in Supabase dashboard: SQL Editor → run this file.

DROP POLICY IF EXISTS "anon_all" ON public.reports;
DROP POLICY IF EXISTS "anon_all" ON public.topics;

CREATE POLICY "authenticated_all" ON public.reports
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "authenticated_all" ON public.topics
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
