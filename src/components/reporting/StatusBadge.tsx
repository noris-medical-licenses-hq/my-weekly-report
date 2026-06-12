import { STATUS_LABELS, type ProjectStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const STYLES: Record<ProjectStatus, string> = {
  on_track: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  at_risk: "bg-amber-50 text-amber-700 ring-amber-200",
  blocked: "bg-red-50 text-red-700 ring-red-200",
  done: "bg-slate-100 text-slate-600 ring-slate-200",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        STYLES[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}