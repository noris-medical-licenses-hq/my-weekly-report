import type { Topic } from "./types";
import { SEED_TOPICS } from "./seed-data";

// localStorage is a cache/fallback only. Supabase is the source of truth.
// Do NOT add any automatic field transformation here — a previous migrateFields()
// function silently moved currentWeekUpdate → previousWeekUpdate on every
// startup where Supabase failed, corrupting live report data (incident: 2026-06-12).

const STORAGE_KEY = "weekly-reporting:topics:v3";

function read(): Topic[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_TOPICS));
      return SEED_TOPICS;
    }
    // Spread default before topic data so existing entries with the field override it.
    return (JSON.parse(raw) as Topic[]).map((t) => ({ managerComment: "", ...t }));
  } catch {
    return SEED_TOPICS;
  }
}

function write(topics: Topic[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
}

export const topicsStore = {
  list(): Topic[] {
    return read();
  },
  saveAll(topics: Topic[]): void {
    write(topics);
  },
};