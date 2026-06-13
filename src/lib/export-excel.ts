import * as XLSX from "xlsx";
import { PRIORITY_LABELS, STATUS_LABELS, type Topic } from "./types";

export function exportTopicsToExcel(topics: Topic[]): void {
  const rows = topics.map((t) => ({
    קבוצה: t.group,
    נושא: t.topic,
    'שינוי מהדוח הקודם': t.changedSincePrevious ? "כן" : "לא",
    עדיפות: PRIORITY_LABELS[t.priority],
    'דורש תמיכה': t.supportRequired?.trim() ? "כן" : "לא",
    נסקר: t.reviewed ? "כן" : "לא",
    סטטוס: STATUS_LABELS[t.status] ?? t.status,
    "עדכון שבוע קודם": t.previousWeekUpdate,
    "עדכון שבוע נוכחי": t.currentWeekUpdate,
    'הערת מנכ"ל': t.managerComment,
    "סיכונים ואתגרים": t.risksAndChallenges,
    "עדיפות לשבוע הבא": t.nextWeekPriority,
    "תמיכה נדרשת": t.supportRequired,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = [
    { wch: 24 }, { wch: 28 }, { wch: 14 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 12 },
    { wch: 40 }, { wch: 40 }, { wch: 40 }, { wch: 36 }, { wch: 30 }, { wch: 30 },
  ];
  if (!ws["!views"]) ws["!views"] = [{}];
  ws["!views"][0]!.RTL = true;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "דיווח שבועי");

  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `weekly-report-${date}.xlsx`);
}