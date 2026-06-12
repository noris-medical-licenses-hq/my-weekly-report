-- Add manager_comment column to topics table.
-- Run in Supabase SQL Editor: ALTER TABLE public.topics ADD COLUMN IF NOT EXISTS manager_comment TEXT;

ALTER TABLE public.topics ADD COLUMN IF NOT EXISTS manager_comment TEXT;
