import type { Topic } from "./types";
import { SEED_TOPICS } from "./seed-data";

/**
 * Data layer abstraction.
 * Currently backed by localStorage. Swap implementation for Supabase later
 * by replacing the function bodies — signatures stay the same.
 */

const STORAGE_KEY = "weekly-reporting:topics:v3";

function migrateFields(topics: Topic[]): Topic[] {
  let changed = false;
  const result = topics.map((t) => {
    if (!t.previousWeekUpdate && t.currentWeekUpdate) {
      changed = true;
      return { ...t, previousWeekUpdate: t.currentWeekUpdate, currentWeekUpdate: "" };
    }
    return t;
  });
  if (changed) write(result);
  return result;
}

function read(): Topic[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_TOPICS));
      return SEED_TOPICS;
    }
    return migrateFields(JSON.parse(raw) as Topic[]);
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

/**
 * Roll over: move the current week's update into "previous week" and clear
 * current-week fields. Not auto-invoked — exposed for future weekly cron.
 */
export function rolloverWeek(topics: Topic[]): Topic[] {
  return topics.map((p) => ({
    ...p,
    previousWeekUpdate: p.currentWeekUpdate,
    currentWeekUpdate: "",
    reviewed: false,
    changedSincePrevious: false,
    updatedAt: new Date().toISOString(),
  }));
}