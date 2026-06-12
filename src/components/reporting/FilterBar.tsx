import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  GROUPS,
  PRIORITY_LABELS,
  STATUS_LABELS,
  type Group,
  type Priority,
  type ProjectStatus,
} from "@/lib/types";

export interface Filters {
  group: Group | "all";
  priority: Priority | "all";
  status: ProjectStatus | "all";
  supportRequired: "all" | "yes" | "no";
  reviewed: "all" | "yes" | "no";
  changed: "all" | "yes" | "no";
}

export const EMPTY_FILTERS: Filters = {
  group: "all",
  priority: "all",
  status: "all",
  supportRequired: "all",
  reviewed: "all",
  changed: "all",
};

interface Props {
  value: Filters;
  onChange: (next: Filters) => void;
}

const YN = [
  { v: "all", l: "הכל" },
  { v: "yes", l: "כן" },
  { v: "no", l: "לא" },
] as const;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

export function FilterBar({ value, onChange }: Props) {
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) =>
    onChange({ ...value, [k]: v });
  const isDirty = JSON.stringify(value) !== JSON.stringify(EMPTY_FILTERS);

  return (
    <div className="mb-3 rounded-md border border-border bg-card p-3">
      <div className="flex flex-wrap items-end gap-3">
        <Field label="קבוצה">
          <Select value={value.group} onValueChange={(v) => set("group", v as Group | "all")}>
            <SelectTrigger className="h-8 w-56 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">הכל</SelectItem>
              {GROUPS.map((g) => (
                <SelectItem key={g} value={g} className="text-xs">{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="עדיפות">
          <Select value={value.priority} onValueChange={(v) => set("priority", v as Priority | "all")}>
            <SelectTrigger className="h-8 w-32 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">הכל</SelectItem>
              {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => (
                <SelectItem key={p} value={p} className="text-xs">{PRIORITY_LABELS[p]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="סטטוס">
          <Select value={value.status} onValueChange={(v) => set("status", v as ProjectStatus | "all")}>
            <SelectTrigger className="h-8 w-32 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">הכל</SelectItem>
              {(Object.keys(STATUS_LABELS) as ProjectStatus[]).map((s) => (
                <SelectItem key={s} value={s} className="text-xs">{STATUS_LABELS[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="דורש תמיכה">
          <Select value={value.supportRequired} onValueChange={(v) => set("supportRequired", v as "all" | "yes" | "no")}>
            <SelectTrigger className="h-8 w-24 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {YN.map((y) => <SelectItem key={y.v} value={y.v} className="text-xs">{y.l}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="נסקר">
          <Select value={value.reviewed} onValueChange={(v) => set("reviewed", v as "all" | "yes" | "no")}>
            <SelectTrigger className="h-8 w-24 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {YN.map((y) => <SelectItem key={y.v} value={y.v} className="text-xs">{y.l}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="שינוי מהדוח הקודם">
          <Select value={value.changed} onValueChange={(v) => set("changed", v as "all" | "yes" | "no")}>
            <SelectTrigger className="h-8 w-24 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {YN.map((y) => <SelectItem key={y.v} value={y.v} className="text-xs">{y.l}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        {isDirty && (
          <Button variant="ghost" size="sm" onClick={() => onChange(EMPTY_FILTERS)} className="h-8 text-xs">
            <X className="ms-1 h-3.5 w-3.5" />
            נקה סינון
          </Button>
        )}
      </div>
    </div>
  );
}