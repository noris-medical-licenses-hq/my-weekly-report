import { STATUS_LABELS, type ProjectStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const STYLES: Record<ProjectStatus, string> = {
  on_track: "bg-emerald-100 text-emerald-800 ring-emerald-300",
  at_risk: "bg-amber-100 text-amber-800 ring-amber-300",
  blocked: "bg-red-100 text-red-900 ring-red-400",
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