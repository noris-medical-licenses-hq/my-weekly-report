import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Download, LogOut, Plus, RefreshCw, Save } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { TopicsTable } from "@/components/reporting/TopicsTable";
import { FilterBar, EMPTY_FILTERS, type Filters } from "@/components/reporting/FilterBar";
import { exportTopicsToExcel } from "@/lib/export-excel";
import { topicsStore } from "@/lib/projects-store";
import { emptyTopic, type Topic } from "@/lib/types";
import {
  createFreshReport,
  createSupabaseRepositories,
  runMigrationIfNeeded,
} from "@/lib/repository";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw redirect({ to: "/login" });
  },
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
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [dirty, setDirty] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    async function load() {
      try {
        await runMigrationIfNeeded();
        const { topics: repo } = await createSupabaseRepositories();
        setTopics(await repo.list());
      } catch (e) {
        console.error("Supabase load failed, falling back to localStorage:", e);
        setTopics(topicsStore.list());
      }
      setLoaded(true);
    }
    load();
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

  const save = async () => {
    setSaving(true);
    try {
      const { topics: repo } = await createSupabaseRepositories();
      await repo.saveAll(topics);
      topicsStore.saveAll(topics);
      const now = new Date();
      setLastSavedAt(now);
      setDirty(false);
      toast.success("הדיווח נשמר");
    } catch (e) {
      console.error("Supabase save failed, saving to localStorage:", e);
      topicsStore.saveAll(topics);
      const now = new Date();
      setLastSavedAt(now);
      setDirty(false);
      toast.success("הדיווח נשמר (מקומי)");
    } finally {
      setSaving(false);
    }
  };

  const reorderTopics = async (newVisibleOrder: Topic[]) => {
    // Merge the reordered visible subset back into the full topics array.
    // Hidden (filtered-out) topics stay in their current relative positions.
    const visibleIdSet = new Set(newVisibleOrder.map((t) => t.id));
    const filteredIndices = topics
      .map((t, i) => ({ t, i }))
      .filter(({ t }) => visibleIdSet.has(t.id))
      .map(({ i }) => i);

    const newTopics = [...topics];
    filteredIndices.forEach((topicsIdx, pos) => {
      newTopics[topicsIdx] = newVisibleOrder[pos];
    });

    setTopics(newTopics);

    try {
      const { topics: repo } = await createSupabaseRepositories();
      await repo.saveAll(newTopics);
      topicsStore.saveAll(newTopics);
    } catch (e) {
      console.error("Failed to persist reorder:", e);
      topicsStore.saveAll(newTopics);
    }
  };

  const rolloverWeek = async () => {
    if (
      !window.confirm(
        "האם לפתוח שבוע חדש?\nהעדכון השבועי הנוכחי יועבר לעדכון שבוע קודם.",
      )
    )
      return;

    setSaving(true);
    try {
      const rolled = topics.map((t) => ({
        ...t,
        previousWeekUpdate: t.currentWeekUpdate,
        currentWeekUpdate: "",
        updatedAt: new Date().toISOString(),
      }));

      const { topics: repo } = await createFreshReport();
      await repo.saveAll(rolled);
      topicsStore.saveAll(rolled);

      setTopics(rolled);
      setDirty(false);
      setLastSavedAt(new Date());
      toast.success("נפתח שבוע דיווח חדש");
    } catch (e) {
      console.error("Rollover failed:", e);
      toast.error("שגיאה בפתיחת שבוע חדש");
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
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
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm">
              {dirty ? (
                <span className="text-amber-500">● שינויים לא שמורים</span>
              ) : lastSavedAt ? (
                <span className="text-emerald-600">
                  ✓ נשמר{" "}
                  {lastSavedAt.toLocaleTimeString("he-IL", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              ) : (
                <span className="text-muted-foreground">עדכני</span>
              )}
            </span>
            <Button variant="outline" size="sm" onClick={addTopic}>
              <Plus className="ms-1 h-4 w-4" />
              נושא חדש
            </Button>
            <Button variant="outline" size="sm" onClick={exportXlsx}>
              <Download className="ms-1 h-4 w-4" />
              ייצוא ל-Excel
            </Button>
            <Button variant="outline" size="sm" onClick={rolloverWeek} disabled={saving}>
              <RefreshCw className="ms-1 h-4 w-4" />
              פתח שבוע חדש
            </Button>
            <Button size="sm" onClick={save} disabled={!dirty || saving}>
              <Save className="ms-1 h-4 w-4" />
              {saving ? "שומר..." : "שמור הכל"}
            </Button>
            <Button variant="ghost" size="sm" onClick={logout} title="התנתק">
              <LogOut className="h-4 w-4" />
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
          onSave={save}
          onReorder={reorderTopics}
        />
      </main>
    </div>
  );
}
