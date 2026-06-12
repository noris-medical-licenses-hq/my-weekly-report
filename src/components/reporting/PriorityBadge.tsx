import { PRIORITY_LABELS, type Priority } from "@/lib/types";
import { cn } from "@/lib/utils";

const STYLES: Record<Priority, string> = {
  high: "bg-rose-100 text-rose-800 ring-rose-300",
  medium: "bg-amber-100 text-amber-800 ring-amber-300",
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