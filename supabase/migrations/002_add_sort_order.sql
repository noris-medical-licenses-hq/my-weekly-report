-- Run in Supabase SQL editor:
-- https://supabase.com/dashboard/project/rocybqcwizkrdwmbyhwv/sql

-- 1. Add column
ALTER TABLE public.topics
  ADD COLUMN IF NOT EXISTS sort_order integer;

-- 2. Back-fill: 0-based index within each report, ordered by created_at
UPDATE public.topics t
SET sort_order = subq.rn
FROM (
  SELECT id,
    (ROW_NUMBER() OVER (PARTITION BY report_id ORDER BY created_at ASC) - 1)::integer AS rn
  FROM public.topics
) subq
WHERE t.id = subq.id;
