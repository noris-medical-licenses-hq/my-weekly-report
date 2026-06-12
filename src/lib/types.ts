export type ProjectStatus = "on_track" | "at_risk" | "blocked" | "done";

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  on_track: "במסלול",
  at_risk: "בסיכון",
  blocked: "חסום",
  done: "הושלם",
};

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  reviewedThisWeek: boolean;
  previousWeekUpdate: string;
  currentWeekUpdate: string;
  blockers: string;
  helpNeededFromCeo: string;
  nextAction: string;
  updatedAt: string;
}

export const emptyProject = (): Project => ({
  id: crypto.randomUUID(),
  name: "",
  status: "on_track",
  reviewedThisWeek: false,
  previousWeekUpdate: "",
  currentWeekUpdate: "",
  blockers: "",
  helpNeededFromCeo: "",
  nextAction: "",
  updatedAt: new Date().toISOString(),
});