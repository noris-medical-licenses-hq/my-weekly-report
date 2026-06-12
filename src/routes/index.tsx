import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Download, Plus, Save } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { TopicsTable } from "@/components/reporting/TopicsTable";
import { FilterBar, EMPTY_FILTERS, type Filters } from "@/components/reporting/FilterBar";
import { exportTopicsToExcel } from "@/lib/export-excel";
import { topicsStore } from "@/lib/projects-store";
import { emptyTopic, type Topic } from "@/lib/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "דיווח שבועי" },
      { name: "description", content: "כלי פנימי לדיווח שבועי על פרויקטים" },
      { property: "og:title", content: "דיווח שבועי" },
      { property: "og:description", content: "כלי פנימי לדיווח שבועי על פרויקטים" },
    ],
  }),
  component: Index,
});

function Index() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [dirty, setDirty] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  useEffect(() => {
    setTopics(topicsStore.list());
    setLoaded(true);
  }, []);

  const updateTopic = (id: string, patch: Partial<Topic>) => {
    setTopics((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p,
      ),
    );
    setDirty(true);
  };

  const deleteTopic = (id: string) => {
    if (!window.confirm("למחוק את הנושא?")) return;
    setTopics((prev) => prev.filter((p) => p.id !== id));
    setDirty(true);
  };

  const addTopic = () => {
    setTopics((prev) => [emptyTopic(), ...prev]);
    setDirty(true);
  };

  const save = () => {
    topicsStore.saveAll(topics);
    setDirty(false);
    toast.success("הדיווח נשמר");
  };

  const exportXlsx = () => {
    exportTopicsToExcel(filtered);
    toast.success("הקובץ יוצא");
  };

  const filtered = useMemo(() => {
    return topics.filter((t) => {
      if (filters.group !== "all" && t.group !== filters.group) return false;
      if (filters.priority !== "all" && t.priority !== filters.priority) return false;
      if (filters.status !== "all" && t.status !== filters.status) return false;
      const hasSupport = !!t.supportRequired?.trim();
      if (filters.supportRequired === "yes" && !hasSupport) return false;
      if (filters.supportRequired === "no" && hasSupport) return false;
      if (filters.reviewed === "yes" && !t.reviewed) return false;
      if (filters.reviewed === "no" && t.reviewed) return false;
      if (filters.changed === "yes" && !t.changedSincePrevious) return false;
      if (filters.changed === "no" && t.changedSincePrevious) return false;
      return true;
    });
  }, [topics, filters]);

  const reviewedCount = topics.filter((t) => t.reviewed).length;
  const changedCount = topics.filter((t) => t.changedSincePrevious).length;

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" dir="rtl" />
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              דיווח שבועי
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {loaded
                ? `${filtered.length} מתוך ${topics.length} נושאים · ${reviewedCount} נסקרו · ${changedCount} עם שינוי`
                : "טוען…"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={addTopic}>
              <Plus className="ms-1 h-4 w-4" />
              נושא חדש
            </Button>
            <Button variant="outline" size="sm" onClick={exportXlsx}>
              <Download className="ms-1 h-4 w-4" />
              ייצוא ל-Excel
            </Button>
            <Button size="sm" onClick={save} disabled={!dirty}>
              <Save className="ms-1 h-4 w-4" />
              {dirty ? "שמור שינויים" : "נשמר"}
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1400px] px-6 py-6">
        <FilterBar value={filters} onChange={setFilters} />
        <TopicsTable
          topics={filtered}
          onChange={updateTopic}
          onDelete={deleteTopic}
        />
      </main>
    </div>
  );
}
