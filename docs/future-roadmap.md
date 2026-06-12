# Future Roadmap

This document captures planned phases for the Weekly Report tool.
The current codebase is intentionally MVP-only. Do not implement future phases until each one is explicitly approved and scoped.

---

## Phase 1 — MVP (complete)

- Local persistence via localStorage
- Auto-load saved data on startup
- Export to Excel (.xlsx) with RTL Hebrew layout
- Inline editing with filters
- TypeScript data model (`types.ts`)
- Repository/service layer (`projects-store.ts`) designed for backend swap

---

## Phase 2 — Supabase backend

**Goal:** Replace localStorage with a real database so data is not tied to a single browser.

**Key steps:**
- Provision a Supabase project and `topics` table matching the `Topic` interface
- Make `topicsStore.list()` and `topicsStore.saveAll()` async (Promise-returning)
- Wire `index.tsx` to use TanStack Query `useQuery` / `useMutation` (already installed)
- Enable Row Level Security (RLS) on the `topics` table
- Migrate seed data into Supabase as initial rows

**Do not start until:** local workflow is proven stable and team decides browser-local storage is insufficient.

---

## Phase 3 — Weekly history

**Goal:** Preserve each week's snapshot so past reports can be viewed.

**Key steps:**
- Add a `report_week` (ISO date string) dimension to the data model
- Expose a "Roll over week" action in the UI that calls the existing `rolloverWeek()` utility and saves a snapshot
- Add a week selector to the header to browse historical snapshots
- Store history rows in Supabase (Phase 2 prerequisite)

**Depends on:** Phase 2.

---

## Phase 4 — CEO comments

**Goal:** Allow a CEO / executive role to attach comments to any topic row.

**Key steps:**
- Add a `ceo_comment` field to the `Topic` interface (or a separate `comments` table)
- Render CEO comments as a read-only callout inside the expanded row
- Restrict write access to the CEO role (Phase 5 prerequisite)

**Depends on:** Phase 2, Phase 5.

---

## Phase 5 — Roles and permissions

**Goal:** Differentiate what each user type can see and edit.

**Roles to define:**
- `reporter` — can edit their own group's topics
- `reviewer` — can mark topics as reviewed, read-only elsewhere
- `admin` — full access, can add/delete topics
- `ceo` — read-only + can add CEO comments

**Key steps:**
- Add Supabase Auth (email or SSO)
- Map auth users to roles in a `user_roles` table
- Enforce permissions via Supabase RLS policies
- Hide destructive actions in the UI based on role

**Depends on:** Phase 2.

---

## Phase 6 — Audit trail

**Goal:** Record who changed what and when, for compliance and accountability.

**Key steps:**
- Add a Supabase trigger or Postgres function that writes to an `audit_log` table on every `UPDATE`/`DELETE` on `topics`
- Log: `user_id`, `topic_id`, `field_changed`, `old_value`, `new_value`, `changed_at`
- Add an admin-only "History" drawer in the UI that shows the audit log for a selected topic row

**Depends on:** Phase 2, Phase 5.

---

## Architecture notes for future developers

- `projects-store.ts` is the **only** file that touches storage. Swap its internals for Supabase without touching any component.
- `types.ts` is the single source of truth for the `Topic` shape. All future fields go here first.
- `export-excel.ts` is a pure function — it receives topics and writes a file. No side effects.
- `rolloverWeek()` in `projects-store.ts` is already implemented and tested conceptually — it just needs a UI trigger and a Supabase write target.
- TanStack Query is already installed; use `useQuery` / `useMutation` when async data fetching is added.
