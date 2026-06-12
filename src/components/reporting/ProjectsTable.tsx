import { useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectRow } from "./ProjectRow";

interface ProjectsTableProps {
  projects: Project[];
  onChange: (id: string, patch: Partial<Project>) => void;
  onDelete: (id: string) => void;
}

export function ProjectsTable({ projects, onChange, onDelete }: ProjectsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card py-16 text-center text-sm text-muted-foreground">
        אין פרויקטים עדיין. לחץ על "פרויקט חדש" כדי להתחיל.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <table className="w-full text-right">
        <thead className="border-b border-border bg-muted/50 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="w-10" />
            <th className="px-3 py-2.5 text-right">שם פרויקט</th>
            <th className="px-3 py-2.5 text-right">סטטוס נוכחי</th>
            <th className="px-3 py-2.5 text-center">נסקר השבוע</th>
            <th className="w-10" />
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <ProjectRow
              key={p.id}
              project={p}
              expanded={expandedId === p.id}
              onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)}
              onChange={(patch) => onChange(p.id, patch)}
              onDelete={() => onDelete(p.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}