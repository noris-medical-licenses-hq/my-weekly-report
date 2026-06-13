import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Topic } from "@/lib/types";
import { TopicRow } from "./TopicRow";

interface TopicsTableProps {
  topics: Topic[];
  onChange: (id: string, patch: Partial<Topic>) => void;
  onDelete: (id: string) => void;
  onSave: () => void;
  onReorder: (newOrder: Topic[]) => void;
  groups: string[];
  customStatuses: string[];
  onAddGroup: (name: string) => void;
  onAddStatus: (name: string) => void;
}

export function TopicsTable({
  topics,
  onChange,
  onDelete,
  onSave,
  onReorder,
  groups,
  customStatuses,
  onAddGroup,
  onAddStatus,
}: TopicsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const PRIORITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };
  const STATUS_ORDER: Record<string, number> = { at_risk: 0, blocked: 1, on_track: 2, done: 3 };

  function cycleSort(key: string) {
    if (sortKey !== key) { setSortKey(key); setSortDir("asc"); }
    else if (sortDir === "asc") setSortDir("desc");
    else { setSortKey(null); setSortDir(null); }
  }

  const displayTopics = React.useMemo(() => {
    if (!sortKey || !sortDir) return topics;
    return [...topics].sort((a, b) => {
      let av: string | number;
      let bv: string | number;
      if (sortKey === "priority") { av = PRIORITY_ORDER[a.priority] ?? 99; bv = PRIORITY_ORDER[b.priority] ?? 99; }
      else if (sortKey === "status") { av = STATUS_ORDER[a.status] ?? 99; bv = STATUS_ORDER[b.status] ?? 99; }
      else { av = (a as unknown as Record<string, string>)[sortKey] ?? ""; bv = (b as unknown as Record<string, string>)[sortKey] ?? ""; }
      if (typeof av === "number") return sortDir === "asc" ? av - (bv as number) : (bv as number) - av;
      return sortDir === "asc" ? (av as string).localeCompare(bv as string, "he") : (bv as string).localeCompare(av as string, "he");
    });
  }, [topics, sortKey, sortDir]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = displayTopics.findIndex((t) => t.id === active.id);
    const newIndex = displayTopics.findIndex((t) => t.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) onReorder(arrayMove(displayTopics, oldIndex, newIndex));
  };

  function SortIcon({ col }: { col: string }) {
    if (sortKey !== col) return <span className="ms-0.5 text-muted-foreground/30">↕</span>;
    return <span className="ms-0.5 text-primary">{sortDir === "asc" ? "↑" : "↓"}</span>;
  }

  if (topics.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border bg-card py-16 text-center text-sm text-muted-foreground">
        אין נושאים תואמים. נקה סינון או הוסף נושא חדש.
      </div>
    );
  }

  const th =
    "border-s border-border px-2 py-1.5 text-right font-semibold whitespace-nowrap";

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="rounded-md border border-border bg-card">
        <table className="w-full border-collapse text-right">
          <thead className="sticky top-[120px] z-10 bg-muted text-[11px] uppercase tracking-wide text-muted-foreground shadow-[0_2px_4px_-2px_rgba(0,0,0,0.12)]">
            <tr>
              <th className="w-8 border-s border-b border-border" />
              <th className="w-8 border-s border-b border-border" />
              <th
                className={`${th} w-44 border-b cursor-pointer select-none hover:bg-muted/60`}
                onClick={() => cycleSort("group")}
              >
                קבוצה <SortIcon col="group" />
              </th>
              <th
                className={`${th} border-b cursor-pointer select-none hover:bg-muted/60`}
                onClick={() => cycleSort("topic")}
              >
                נושא <SortIcon col="topic" />
              </th>
              <th className={`${th} w-10 border-b text-center`} title="שינוי מהדוח הקודם">
                שינוי
              </th>
              <th
                className={`${th} w-20 border-b cursor-pointer select-none hover:bg-muted/60`}
                onClick={() => cycleSort("priority")}
              >
                עדיפות <SortIcon col="priority" />
              </th>
              <th className={`${th} w-10 border-b text-center`} title="דורש תמיכה">
                תמיכה
              </th>
              <th className={`${th} w-10 border-b text-center`}>נסקר</th>
              <th
                className={`${th} w-24 border-b cursor-pointer select-none hover:bg-muted/60`}
                onClick={() => cycleSort("status")}
              >
                סטטוס <SortIcon col="status" />
              </th>
              <th className="w-8 border-s border-b border-border" />
            </tr>
          </thead>
          <SortableContext items={displayTopics.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            <tbody>
              {displayTopics.map((t) => (
                <TopicRow
                  key={t.id}
                  topic={t}
                  expanded={expandedId === t.id}
                  onToggle={() => setExpandedId(expandedId === t.id ? null : t.id)}
                  onChange={(patch) => onChange(t.id, patch)}
                  onDelete={() => onDelete(t.id)}
                  onSave={onSave}
                  groups={groups}
                  customStatuses={customStatuses}
                  onAddGroup={onAddGroup}
                  onAddStatus={onAddStatus}
                />
              ))}
            </tbody>
          </SortableContext>
        </table>
      </div>
    </DndContext>
  );
}
