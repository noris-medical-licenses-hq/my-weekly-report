import type { Project } from "./types";

/**
 * Data layer abstraction.
 * Currently backed by localStorage. Swap implementation for Supabase later
 * by replacing the function bodies — signatures stay the same.
 */

const STORAGE_KEY = "weekly-reporting:projects:v1";

function read(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Project[];
  } catch {
    return [];
  }
}

function write(projects: Project[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export const projectsStore = {
  list(): Project[] {
    return read();
  },
  saveAll(projects: Project[]): void {
    write(projects);
  },
};

/**
 * Roll over: move the current week's update into "previous week" and clear
 * current-week fields. Not auto-invoked — exposed for future weekly cron.
 */
export function rolloverWeek(projects: Project[]): Project[] {
  return projects.map((p) => ({
    ...p,
    previousWeekUpdate: p.currentWeekUpdate,
    currentWeekUpdate: "",
    reviewedThisWeek: false,
    updatedAt: new Date().toISOString(),
  }));
}