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
import {
  GROUPS,
  PRIORITY_LABELS,
  STATUS_LABELS,
  type Group,
  type Priority,
  type ProjectStatus,
  type Topic,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { FieldBlock } from "./FieldBlock";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";

interface TopicRowProps {
  topic: Topic;
  expanded: boolean;
  onToggle: () => void;
  onChange: (patch: Partial<Topic>) => void;
  onDelete: () => void;
}

export function TopicRow({
  topic,
  expanded,
  onToggle,
  onChange,
  onDelete,
}: TopicRowProps) {
  const cell = "border-s border-border px-2 py-1.5 align-middle";
  return (
    <>
      <tr
        className={cn(
          "border-b border-border transition-colors hover:bg-muted/40",
          expanded && "bg-muted/30",
        )}
      >
        <td className="w-9 border-s border-border px-1 py-1.5 align-middle">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            aria-label="הרחב"
            className="h-7 w-7"
          >
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
            />
          </Button>
        </td>
        <td className={cell}>
          {expanded ? (
            <Select
              value={topic.group}
              onValueChange={(v) => onChange({ group: v as Group })}
            >
              <SelectTrigger className="h-8 w-full text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GROUPS.map((g) => (
                  <SelectItem key={g} value={g} className="text-xs">
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <span className="text-xs text-muted-foreground">{topic.group}</span>
          )}
        </td>
        <td className={cell}>
          {expanded ? (
            <Input
              value={topic.topic}
              onChange={(e) => onChange({ topic: e.target.value })}
              placeholder="נושא"
              className="h-8 text-sm"
            />
          ) : (
            <span className="text-sm font-medium text-foreground">
              {topic.topic || <span className="text-muted-foreground">ללא נושא</span>}
            </span>
          )}
        </td>
        <td className={cn(cell, "text-center")}>
          <Checkbox
            checked={topic.changedSincePrevious}
            onCheckedChange={(v) => onChange({ changedSincePrevious: v === true })}
            aria-label="שינוי מהדוח הקודם"
          />
        </td>
        <td className={cell}>
          {expanded ? (
            <Select
              value={topic.priority}
              onValueChange={(v) => onChange({ priority: v as Priority })}
            >
              <SelectTrigger className="h-8 w-28 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => (
                  <SelectItem key={p} value={p} className="text-xs">
                    {PRIORITY_LABELS[p]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <PriorityBadge priority={topic.priority} />
          )}
        </td>
        <td className={cn(cell, "text-center")}>
          <Checkbox
            checked={!!topic.supportRequired?.trim()}
            onCheckedChange={(v) =>
              onChange({ supportRequired: v === true ? topic.supportRequired || " " : "" })
            }
            aria-label="דורש תמיכה"
          />
        </td>
        <td className={cn(cell, "text-center")}>
          <Checkbox
            checked={topic.reviewed}
            onCheckedChange={(v) => onChange({ reviewed: v === true })}
            aria-label="נסקר"
          />
        </td>
        <td className={cell}>
          {expanded ? (
            <Select
              value={topic.status}
              onValueChange={(v) => onChange({ status: v as ProjectStatus })}
            >
              <SelectTrigger className="h-8 w-32 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(STATUS_LABELS) as ProjectStatus[]).map((s) => (
                  <SelectItem key={s} value={s} className="text-xs">
                    {STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <StatusBadge status={topic.status} />
          )}
        </td>
        <td className="w-9 border-s border-border px-1 py-1.5 align-middle">
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            aria-label="מחק"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-border bg-muted/20">
          <td colSpan={9} className="px-6 py-5">
            <div className="grid gap-4 md:grid-cols-2">
              <FieldBlock
                id={`${topic.id}-prev`}
                label="עדכון שבוע קודם"
                value={topic.previousWeekUpdate}
                readOnly
                placeholder="אין עדכון משבוע קודם"
              />
              <FieldBlock
                id={`${topic.id}-curr`}
                label="עדכון שבוע נוכחי"
                value={topic.currentWeekUpdate}
                onChange={(v) => onChange({ currentWeekUpdate: v })}
                rows={4}
              />
              <FieldBlock
                id={`${topic.id}-risk`}
                label="סיכונים ואתגרים"
                value={topic.risksAndChallenges}
                onChange={(v) => onChange({ risksAndChallenges: v })}
              />
              <FieldBlock
                id={`${topic.id}-next`}
                label="עדיפות לשבוע הבא"
                value={topic.nextWeekPriority}
                onChange={(v) => onChange({ nextWeekPriority: v })}
              />
              <FieldBlock
                id={`${topic.id}-support`}
                label="תמיכה נדרשת"
                value={topic.supportRequired}
                onChange={(v) => onChange({ supportRequired: v })}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}