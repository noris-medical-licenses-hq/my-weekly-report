import { useState } from "react";
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
}

export function TopicsTable({
  topics,
  onChange,
  onDelete,
  onSave,
  onReorder,
}: TopicsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = topics.findIndex((t) => t.id === active.id);
    const newIndex = topics.findIndex((t) => t.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      onReorder(arrayMove(topics, oldIndex, newIndex));
    }
  };

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
          <thead className="sticky top-0 z-20 bg-muted text-[11px] uppercase tracking-wide text-muted-foreground shadow-[0_2px_4px_-2px_rgba(0,0,0,0.12)]">
            <tr>
              <th className="w-8 border-s border-b border-border" />
              <th className="w-8 border-s border-b border-border" />
              <th className={`${th} w-44 border-b`}>קבוצה</th>
              <th className={`${th} border-b`}>נושא</th>
              <th className={`${th} w-10 border-b text-center`} title="שינוי מהדוח הקודם">
                שינוי
              </th>
              <th className={`${th} w-20 border-b`}>עדיפות</th>
              <th className={`${th} w-10 border-b text-center`} title="דורש תמיכה">
                תמיכה
              </th>
              <th className={`${th} w-10 border-b text-center`}>נסקר</th>
              <th className={`${th} w-24 border-b`}>סטטוס</th>
              <th className="w-8 border-s border-b border-border" />
            </tr>
          </thead>
          <SortableContext items={topics.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            <tbody>
              {topics.map((t) => (
                <TopicRow
                  key={t.id}
                  topic={t}
                  expanded={expandedId === t.id}
                  onToggle={() => setExpandedId(expandedId === t.id ? null : t.id)}
                  onChange={(patch) => onChange(t.id, patch)}
                  onDelete={() => onDelete(t.id)}
                  onSave={onSave}
                />
              ))}
            </tbody>
          </SortableContext>
        </table>
      </div>
    </DndContext>
  );
}
