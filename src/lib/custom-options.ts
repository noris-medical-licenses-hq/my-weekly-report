const CUSTOM_GROUPS_KEY = "weekly-reporting:custom-groups:v1";
const CUSTOM_STATUSES_KEY = "weekly-reporting:custom-statuses:v1";

export function getCustomGroups(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_GROUPS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveCustomGroups(groups: string[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CUSTOM_GROUPS_KEY, JSON.stringify(groups));
}

export function getCustomStatuses(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_STATUSES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveCustomStatuses(statuses: string[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CUSTOM_STATUSES_KEY, JSON.stringify(statuses));
}
