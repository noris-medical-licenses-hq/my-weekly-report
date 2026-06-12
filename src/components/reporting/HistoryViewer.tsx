import { Fragment, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import type { Topic } from "@/lib/types";
import { cn } from "@/lib/utils";

interface HistoryViewerProps {
  topics: Topic[];
}

export function HistoryViewer({ topics }: HistoryViewerProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (topics.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border bg-card py-16 text-center text-sm text-muted-foreground">
        אין נושאים בדוח זה.
      </div>
    );
  }

  const th = "border-s border-border px-2 py-1.5 text-right font-semibold whitespace-nowrap";
  const cell = "border-s border-border px-2 py-1 align-middle";

  return (
    <div className="rounded-md border border-border bg-card">
      <table className="w-full border-collapse text-right">
        <thead className="sticky top-0 z-20 bg-muted text-[11px] uppercase tracking-wide text-muted-foreground shadow-[0_2px_4px_-2px_rgba(0,0,0,0.12)]">
          <tr>
            <th className="w-8 border-s border-b border-border" />
            <th className={`${th} w-44 border-b`}>קבוצה</th>
            <th className={`${th} border-b`}>נושא</th>
            <th className={`${th} w-10 border-b text-center`} title="שינוי מהדוח הקודם">שינוי</th>
            <th className={`${th} w-20 border-b`}>עדיפות</th>
            <th className={`${th} w-10 border-b text-center`} title="דורש תמיכה">תמיכה</th>
            <th className={`${th} w-10 border-b text-center`}>נסקר</th>
            <th className={`${th} w-24 border-b`}>סטטוס</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((t) => {
            const expanded = expandedId === t.id;
            return (
              <Fragment key={t.id}>
                <tr
                  className={cn(
                    "border-b border-border hover:bg-muted/40",
                    expanded && "bg-muted/30",
                  )}
                >
                  <td className="w-8 border-s border-border px-0.5 py-1 align-middle">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setExpandedId(expanded ? null : t.id)}
                      aria-label="הרחב"
                      className="h-6 w-6"
                    >
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
                      />
                    </Button>
                  </td>
                  <td className={cell}>
                    <span className="text-xs text-muted-foreground">{t.group}</span>
                  </td>
                  <td className={cell}>
                    <span className="text-sm font-medium text-foreground">
                      {t.topic || <span className="text-muted-foreground">ללא נושא</span>}
                    </span>
                  </td>
                  <td className={cn(cell, "text-center")}>
                    <Checkbox checked={t.changedSincePrevious} disabled aria-label="שינוי" />
                  </td>
                  <td className={cell}>
                    <PriorityBadge priority={t.priority} />
                  </td>
                  <td className={cn(cell, "text-center")}>
                    <Checkbox checked={!!t.supportRequired?.trim()} disabled aria-label="תמיכה" />
                  </td>
                  <td className={cn(cell, "text-center")}>
                    <Checkbox checked={t.reviewed} disabled aria-label="נסקר" />
                  </td>
                  <td className={cell}>
                    <StatusBadge status={t.status} />
                  </td>
                </tr>
                {expanded && (
                  <tr className="border-b border-border bg-muted/20">
                    <td colSpan={8} className="px-6 py-5">
                      <div className="grid gap-4 md:grid-cols-2">
                        <ReadField label="עדכון שבוע קודם" value={t.previousWeekUpdate} />
                        <ReadField label="עדכון שבוע נוכחי" value={t.currentWeekUpdate} />
                        {t.risksAndChallenges && (
                          <ReadField label="סיכונים ואתגרים" value={t.risksAndChallenges} />
                        )}
                        {t.nextWeekPriority && (
                          <ReadField label="עדיפות לשבוע הבא" value={t.nextWeekPriority} />
                        )}
                        {t.supportRequired?.trim() && (
                          <ReadField label="תמיכה נדרשת" value={t.supportRequired} />
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ReadField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold text-muted-foreground">{label}</p>
      <p className="whitespace-pre-wrap text-sm text-foreground">
        {value?.trim() || <span className="text-muted-foreground">—</span>}
      </p>
    </div>
  );
}
