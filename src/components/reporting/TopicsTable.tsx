import { useState } from "react";
import type { Topic } from "@/lib/types";
import { TopicRow } from "./TopicRow";

interface TopicsTableProps {
  topics: Topic[];
  onChange: (id: string, patch: Partial<Topic>) => void;
  onDelete: (id: string) => void;
}

export function TopicsTable({ topics, onChange, onDelete }: TopicsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (topics.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border bg-card py-16 text-center text-sm text-muted-foreground">
        אין נושאים תואמים. נקה סינון או הוסף נושא חדש.
      </div>
    );
  }

  const th = "border-s border-border px-2 py-2 text-right font-semibold";
  return (
    <div className="overflow-x-auto rounded-md border border-border bg-card">
      <table className="w-full border-collapse text-right">
        <thead className="border-b border-border bg-muted/60 text-[11px] uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="w-9 border-s border-border" />
            <th className={`${th} w-52`}>קבוצה</th>
            <th className={th}>נושא</th>
            <th className={`${th} w-28 text-center`}>שינוי</th>
            <th className={`${th} w-28`}>עדיפות</th>
            <th className={`${th} w-24 text-center`}>דורש תמיכה</th>
            <th className={`${th} w-20 text-center`}>נסקר</th>
            <th className={`${th} w-32`}>סטטוס</th>
            <th className="w-9 border-s border-border" />
          </tr>
        </thead>
        <tbody>
          {topics.map((t) => (
            <TopicRow
              key={t.id}
              topic={t}
              expanded={expandedId === t.id}
              onToggle={() => setExpandedId(expandedId === t.id ? null : t.id)}
              onChange={(patch) => onChange(t.id, patch)}
              onDelete={() => onDelete(t.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}