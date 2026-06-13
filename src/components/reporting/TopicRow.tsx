import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, GripVertical, Plus, Save, Trash2 } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  type Priority,
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
  onSave: () => void;
  groups: string[];
  customStatuses: string[];
  onAddGroup: (name: string) => void;
  onAddStatus: (name: string) => void;
}

export function TopicRow({
  topic,
  expanded,
  onToggle,
  onChange,
  onDelete,
  onSave,
  groups,
  customStatuses,
  onAddGroup,
  onAddStatus,
}: TopicRowProps) {
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const [addGroupInput, setAddGroupInput] = useState("");
  const [addStatusOpen, setAddStatusOpen] = useState(false);
  const [addStatusInput, setAddStatusInput] = useState("");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: topic.id });

  const dragStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    position: isDragging ? "relative" : undefined,
    zIndex: isDragging ? 9 : undefined,
  };

  const handleChange = (patch: Partial<Topic>) => {
    setSavedAt(null);
    onChange(patch);
  };

  const handleSave = () => {
    onSave();
    setSavedAt(new Date());
  };

  const cell = "border-s border-border px-2 py-1 align-middle";

  return (
    <>
      <tr
        ref={setNodeRef}
        style={dragStyle}
        className={cn(
          "border-b border-border transition-colors hover:bg-muted/40",
          expanded && "bg-muted/30",
        )}
      >
        {/* drag handle */}
        <td className="w-8 border-s border-border px-0.5 py-1 align-middle">
          <button
            {...listeners}
            {...attributes}
            type="button"
            aria-label="גרור לשינוי סדר"
            className="flex h-6 w-6 cursor-grab items-center justify-center rounded text-muted-foreground hover:text-foreground active:cursor-grabbing"
          >
            <GripVertical className="h-4 w-4" />
          </button>
        </td>
        {/* expand toggle */}
        <td className="w-8 border-s border-border px-0.5 py-1 align-middle">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            aria-label="הרחב"
            className="h-6 w-6"
          >
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
            />
          </Button>
        </td>
        <td className={cell}>
          {expanded ? (
            <div className="flex items-center gap-1">
              <Select value={topic.group} onValueChange={(v) => handleChange({ group: v })}>
                <SelectTrigger className="h-7 flex-1 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {groups.map((g) => (
                    <SelectItem key={g} value={g} className="text-xs">{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => setAddGroupOpen(true)}>
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">{topic.group}</span>
          )}
        </td>
        <td className={cell}>
          {expanded ? (
            <Input
              value={topic.topic}
              onChange={(e) => handleChange({ topic: e.target.value })}
              placeholder="נושא"
              className="h-7 text-sm"
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
            onCheckedChange={(v) => handleChange({ changedSincePrevious: v === true })}
            aria-label="שינוי מהדוח הקודם"
          />
        </td>
        <td className={cell}>
          {expanded ? (
            <Select
              value={topic.priority}
              onValueChange={(v) => handleChange({ priority: v as Priority })}
            >
              <SelectTrigger className="h-7 w-full text-xs">
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
              handleChange({ supportRequired: v === true ? topic.supportRequired || " " : "" })
            }
            aria-label="דורש תמיכה"
          />
        </td>
        <td className={cn(cell, "text-center")}>
          <Checkbox
            checked={topic.reviewed}
            onCheckedChange={(v) => handleChange({ reviewed: v === true })}
            aria-label="נסקר"
          />
        </td>
        <td className={cell}>
          {expanded ? (
            <div className="flex items-center gap-1">
              <Select value={topic.status} onValueChange={(v) => handleChange({ status: v })}>
                <SelectTrigger className="h-7 flex-1 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(STATUS_LABELS).map((s) => (
                    <SelectItem key={s} value={s} className="text-xs">
                      {STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                  {customStatuses.map((s) => (
                    <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => setAddStatusOpen(true)}>
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <StatusBadge status={topic.status} />
          )}
        </td>
        <td className="w-8 border-s border-border px-0.5 py-1 align-middle">
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            aria-label="מחק"
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-border bg-muted/20">
          <td colSpan={10} className="px-6 py-5">
            <div className="grid gap-4 md:grid-cols-2">
              <FieldBlock
                id={`${topic.id}-prev`}
                label="עדכון קודם"
                value={topic.previousWeekUpdate}
                readOnly
                placeholder="אין עדכון משבוע קודם"
              />
              <FieldBlock
                id={`${topic.id}-curr`}
                label="עדכון שבוע נוכחי"
                value={topic.currentWeekUpdate}
                onChange={(v) => handleChange({ currentWeekUpdate: v })}
                rows={4}
              />
              <FieldBlock
                id={`${topic.id}-risk`}
                label="סיכונים ואתגרים"
                value={topic.risksAndChallenges}
                onChange={(v) => handleChange({ risksAndChallenges: v })}
              />
              <FieldBlock
                id={`${topic.id}-manager`}
                label="הערת מנהל"
                value={topic.managerComment}
                onChange={(v) => handleChange({ managerComment: v })}
                rows={3}
                placeholder="הזן הערת מנהל..."
              />
              <FieldBlock
                id={`${topic.id}-next`}
                label="עדיפות לשבוע הבא"
                value={topic.nextWeekPriority}
                onChange={(v) => handleChange({ nextWeekPriority: v })}
              />
              <FieldBlock
                id={`${topic.id}-support`}
                label="תמיכה נדרשת"
                value={topic.supportRequired}
                onChange={(v) => handleChange({ supportRequired: v })}
              />
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-border pt-3 mt-1">
              {savedAt && (
                <span className="text-xs text-emerald-600">
                  ✓ נשמר{" "}
                  {savedAt.toLocaleTimeString("he-IL", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
              <Button size="sm" onClick={handleSave}>
                <Save className="ms-1 h-3 w-3" />
                שמור
              </Button>
            </div>
          </td>
        </tr>
      )}

      <Dialog open={addGroupOpen} onOpenChange={setAddGroupOpen}>
        <DialogContent dir="rtl" className="max-w-sm">
          <DialogHeader>
            <DialogTitle>הוסף קבוצה חדשה</DialogTitle>
          </DialogHeader>
          <Input
            value={addGroupInput}
            onChange={(e) => setAddGroupInput(e.target.value)}
            placeholder="שם הקבוצה"
            dir="rtl"
            onKeyDown={(e) => {
              if (e.key === "Enter" && addGroupInput.trim()) {
                onAddGroup(addGroupInput.trim());
                setAddGroupInput("");
                setAddGroupOpen(false);
              }
            }}
          />
          <DialogFooter>
            <Button
              size="sm"
              disabled={!addGroupInput.trim()}
              onClick={() => {
                onAddGroup(addGroupInput.trim());
                setAddGroupInput("");
                setAddGroupOpen(false);
              }}
            >
              הוסף
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={addStatusOpen} onOpenChange={setAddStatusOpen}>
        <DialogContent dir="rtl" className="max-w-sm">
          <DialogHeader>
            <DialogTitle>הוסף סטטוס חדש</DialogTitle>
          </DialogHeader>
          <Input
            value={addStatusInput}
            onChange={(e) => setAddStatusInput(e.target.value)}
            placeholder="שם הסטטוס"
            dir="rtl"
            onKeyDown={(e) => {
              if (e.key === "Enter" && addStatusInput.trim()) {
                onAddStatus(addStatusInput.trim());
                setAddStatusInput("");
                setAddStatusOpen(false);
              }
            }}
          />
          <DialogFooter>
            <Button
              size="sm"
              disabled={!addStatusInput.trim()}
              onClick={() => {
                onAddStatus(addStatusInput.trim());
                setAddStatusInput("");
                setAddStatusOpen(false);
              }}
            >
              הוסף
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
