import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FieldBlockProps {
  id: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  rows?: number;
  placeholder?: string;
}

export function FieldBlock({
  id,
  label,
  value,
  onChange,
  readOnly,
  rows = 3,
  placeholder,
}: FieldBlockProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      <Textarea
        id={id}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        dir="rtl"
        className={
          readOnly
            ? "resize-none bg-muted/40 text-sm leading-relaxed"
            : "resize-y text-sm leading-relaxed"
        }
      />
    </div>
  );
}