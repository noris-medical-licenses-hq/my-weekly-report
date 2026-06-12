import { ChevronDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS_LABELS, type Project, type ProjectStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FieldBlock } from "./FieldBlock";
import { StatusBadge } from "./StatusBadge";

interface ProjectRowProps {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
  onChange: (patch: Partial<Project>) => void;
  onDelete: () => void;
}

export function ProjectRow({
  project,
  expanded,
  onToggle,
  onChange,
  onDelete,
}: ProjectRowProps) {
  return (
    <>
      <tr
        className={cn(
          "border-b border-border transition-colors hover:bg-muted/40",
          expanded && "bg-muted/30",
        )}
      >
        <td className="w-10 px-2 py-2 align-middle">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            aria-label="הרחב פרויקט"
            className="h-7 w-7"
          >
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
            />
          </Button>
        </td>
        <td className="px-3 py-2 align-middle">
          {expanded ? (
            <Input
              value={project.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="שם פרויקט"
              className="h-8"
            />
          ) : (
            <span className="text-sm font-medium text-foreground">
              {project.name || <span className="text-muted-foreground">ללא שם</span>}
            </span>
          )}
        </td>
        <td className="px-3 py-2 align-middle">
          {expanded ? (
            <Select
              value={project.status}
              onValueChange={(v) => onChange({ status: v as ProjectStatus })}
            >
              <SelectTrigger className="h-8 w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(STATUS_LABELS) as ProjectStatus[]).map((s) => (
                  <SelectItem key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <StatusBadge status={project.status} />
          )}
        </td>
        <td className="px-3 py-2 text-center align-middle">
          <Checkbox
            checked={project.reviewedThisWeek}
            onCheckedChange={(v) => onChange({ reviewedThisWeek: v === true })}
            aria-label="נסקר השבוע"
          />
        </td>
        <td className="w-10 px-2 py-2 align-middle">
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            aria-label="מחק פרויקט"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-border bg-muted/20">
          <td colSpan={5} className="px-6 py-5">
            <div className="grid gap-4 md:grid-cols-2">
              <FieldBlock
                id={`${project.id}-prev`}
                label="עדכון שבוע קודם"
                value={project.previousWeekUpdate}
                readOnly
                placeholder="אין עדכון משבוע קודם"
              />
              <FieldBlock
                id={`${project.id}-curr`}
                label="עדכון שבוע נוכחי"
                value={project.currentWeekUpdate}
                onChange={(v) => onChange({ currentWeekUpdate: v })}
                rows={4}
              />
              <FieldBlock
                id={`${project.id}-block`}
                label="חסמים"
                value={project.blockers}
                onChange={(v) => onChange({ blockers: v })}
              />
              <FieldBlock
                id={`${project.id}-help`}
                label="סיוע נדרש ממנכ״ל"
                value={project.helpNeededFromCeo}
                onChange={(v) => onChange({ helpNeededFromCeo: v })}
              />
              <FieldBlock
                id={`${project.id}-next`}
                label="פעולה הבאה"
                value={project.nextAction}
                onChange={(v) => onChange({ nextAction: v })}
              />
              <div className="flex items-end">
                <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm">
                  <Checkbox
                    checked={project.reviewedThisWeek}
                    onCheckedChange={(v) =>
                      onChange({ reviewedThisWeek: v === true })
                    }
                  />
                  <span>נסקר השבוע</span>
                </label>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}