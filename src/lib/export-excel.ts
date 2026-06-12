import * as XLSX from "xlsx";
import { STATUS_LABELS, type Project } from "./types";

export function exportProjectsToExcel(projects: Project[]): void {
  const rows = projects.map((p) => ({
    "שם פרויקט": p.name,
    סטטוס: STATUS_LABELS[p.status],
    "נסקר השבוע": p.reviewedThisWeek ? "כן" : "לא",
    "עדכון שבוע קודם": p.previousWeekUpdate,
    "עדכון שבוע נוכחי": p.currentWeekUpdate,
    חסמים: p.blockers,
    "סיוע נדרש ממנכ״ל": p.helpNeededFromCeo,
    "פעולה הבאה": p.nextAction,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = [
    { wch: 22 }, { wch: 12 }, { wch: 12 }, { wch: 40 },
    { wch: 40 }, { wch: 30 }, { wch: 30 }, { wch: 30 },
  ];
  if (!ws["!views"]) ws["!views"] = [{}];
  ws["!views"][0]!.RTL = true;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "דיווח שבועי");

  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `weekly-report-${date}.xlsx`);
}