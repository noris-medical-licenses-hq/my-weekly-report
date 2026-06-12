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
        אין נושאים עדיין. לחץ על "נושא חדש" כדי להתחיל.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <table className="w-full text-right">
        <thead className="border-b border-border bg-muted/60 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="w-10" />
            <th className="w-48 px-2 py-2 text-right">קבוצה</th>
            <th className="px-2 py-2 text-right">נושא</th>
            <th className="w-28 px-2 py-2 text-center">שינוי מהדוח הקודם</th>
            <th className="w-20 px-2 py-2 text-center">נסקר</th>
            <th className="w-32 px-2 py-2 text-right">סטטוס</th>
            <th className="w-10" />
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