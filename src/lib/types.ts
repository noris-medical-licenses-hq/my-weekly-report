export type ProjectStatus = string;

export const STATUS_LABELS: Record<string, string> = {
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

export const GROUPS: readonly string[] = [
  "מחשוב / תשתיות / פרויקטים",
  "משאבי אנוש",
  "סטאטוס מחסנים גלובלי",
  "שרשרת אספקה / ספקים / ייצור",
];
export type Group = string;

export interface Topic {
  id: string;
  group: string;
  topic: string;
  status: string;
  priority: Priority;
  changedSincePrevious: boolean;
  reviewed: boolean;
  previousWeekUpdate: string;
  currentWeekUpdate: string;
  managerComment: string;
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
  managerComment: "",
  risksAndChallenges: "",
  nextWeekPriority: "",
  supportRequired: "",
  updatedAt: new Date().toISOString(),
});
