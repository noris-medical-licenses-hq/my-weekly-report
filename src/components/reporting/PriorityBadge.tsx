import { PRIORITY_LABELS, type Priority } from "@/lib/types";
import { cn } from "@/lib/utils";

const STYLES: Record<Priority, string> = {
  high: "bg-red-50 text-red-700 ring-red-200",
  medium: "bg-amber-50 text-amber-700 ring-amber-200",
  low: "bg-slate-100 text-slate-600 ring-slate-200",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        STYLES[priority],
      )}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  );
}