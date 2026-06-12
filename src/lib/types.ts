export type ProjectStatus = "on_track" | "at_risk" | "blocked" | "done";

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  on_track: "במסלול",
  at_risk: "בסיכון",
  blocked: "חסום",
  done: "הושלם",
};

export type Priority = "high" | "medium" | "low";

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: "גבוהה",
  medium: "בינונית",
  low: "נמוכה",
};

export const GROUPS = [
  "מחשוב / תשתיות / פרויקטים",
  "משאבי אנוש",
  "סטאטוס מחסנים גלובלי",
  "שרשרת אספקה / ספקים / ייצור",
] as const;
export type Group = (typeof GROUPS)[number];

export interface Topic {
  id: string;
  group: Group;
  topic: string;
  status: ProjectStatus;
  priority: Priority;
  changedSincePrevious: boolean;
  reviewed: boolean;
  previousWeekUpdate: string;
  currentWeekUpdate: string;
  risksAndChallenges: string;
  nextWeekPriority: string;
  supportRequired: string;
  updatedAt: string;
}

export const emptyTopic = (): Topic => ({
  id: crypto.randomUUID(),
  group: GROUPS[0],
  topic: "",
  status: "on_track",
  priority: "medium",
  changedSincePrevious: false,
  reviewed: false,
  previousWeekUpdate: "",
  currentWeekUpdate: "",
  risksAndChallenges: "",
  nextWeekPriority: "",
  supportRequired: "",
  updatedAt: new Date().toISOString(),
});