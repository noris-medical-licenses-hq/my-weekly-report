import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, Plus, Save } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { ProjectsTable } from "@/components/reporting/ProjectsTable";
import { exportProjectsToExcel } from "@/lib/export-excel";
import { projectsStore } from "@/lib/projects-store";
import { emptyProject, type Project } from "@/lib/types";

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [dirty, setDirty] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProjects(projectsStore.list());
    setLoaded(true);
  }, []);

  const updateProject = (id: string, patch: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p,
      ),
    );
    setDirty(true);
  };

  const deleteProject = (id: string) => {
    if (!window.confirm("למחוק את הפרויקט?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDirty(true);
  };

  const addProject = () => {
    setProjects((prev) => [emptyProject(), ...prev]);
    setDirty(true);
  };

  const save = () => {
    projectsStore.saveAll(projects);
    setDirty(false);
    toast.success("הדיווח נשמר");
  };

  const exportXlsx = () => {
    exportProjectsToExcel(projects);
    toast.success("הקובץ יוצא");
  };

  const reviewedCount = projects.filter((p) => p.reviewedThisWeek).length;

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
                ? `${projects.length} פרויקטים · ${reviewedCount} נסקרו השבוע`
                : "טוען…"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={addProject}>
              <Plus className="ms-1 h-4 w-4" />
              פרויקט חדש
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
      <main className="mx-auto max-w-6xl px-6 py-6">
        <ProjectsTable
          projects={projects}
          onChange={updateProject}
          onDelete={deleteProject}
        />
      </main>
    </div>
  );
}
