import type { Group, Priority, ProjectStatus, Topic } from "./types";
import { supabase } from "./supabase";
import { topicsStore } from "./projects-store";

// ─── Domain types ─────────────────────────────────────────────────────────────

export interface Report {
  id: string;
  weekStart: string;
  weekEnd: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Repository interfaces ────────────────────────────────────────────────────

export interface TopicRepository {
  list(): Promise<Topic[]>;
  saveAll(topics: Topic[]): Promise<void>;
}

export interface ReportRepository {
  getOrCreateCurrent(): Promise<Report>;
}

// ─── Local (localStorage) implementations ────────────────────────────────────

export class LocalTopicRepository implements TopicRepository {
  async list(): Promise<Topic[]> {
    return topicsStore.list();
  }
  async saveAll(topics: Topic[]): Promise<void> {
    topicsStore.saveAll(topics);
  }
}

export class LocalReportRepository implements ReportRepository {
  async getOrCreateCurrent(): Promise<Report> {
    const now = new Date().toISOString();
    return { id: "local", weekStart: now, weekEnd: now, createdAt: now, updatedAt: now };
  }
}

// ─── Supabase row shapes ──────────────────────────────────────────────────────

interface ReportRow {
  id: string;
  week_start: string;
  week_end: string;
  created_at: string;
  updated_at: string;
}

interface TopicRow {
  id: string;
  report_id: string;
  group_name: string;
  topic_name: string;
  previous_week_update: string;
  current_week_update: string;
  risks_and_challenges: string;
  next_week_priority: string;
  support_required: string;
  reviewed: boolean;
  priority: string;
  status: string;
  changed_since_previous: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

function rowToReport(row: ReportRow): Report {
  return {
    id: row.id,
    weekStart: row.week_start,
    weekEnd: row.week_end,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function rowToTopic(row: TopicRow): Topic {
  return {
    id: row.id,
    group: row.group_name as Group,
    topic: row.topic_name,
    status: row.status as ProjectStatus,
    priority: row.priority as Priority,
    changedSincePrevious: row.changed_since_previous,
    reviewed: row.reviewed,
    previousWeekUpdate: row.previous_week_update,
    currentWeekUpdate: row.current_week_update,
    risksAndChallenges: row.risks_and_challenges,
    nextWeekPriority: row.next_week_priority,
    supportRequired: row.support_required,
    updatedAt: row.updated_at,
  };
}

function topicToRow(topic: Topic, reportId: string): Omit<TopicRow, "created_at"> {
  return {
    id: topic.id,
    report_id: reportId,
    group_name: topic.group,
    topic_name: topic.topic,
    status: topic.status,
    priority: topic.priority,
    changed_since_previous: topic.changedSincePrevious,
    reviewed: topic.reviewed,
    previous_week_update: topic.previousWeekUpdate,
    current_week_update: topic.currentWeekUpdate,
    risks_and_challenges: topic.risksAndChallenges,
    next_week_priority: topic.nextWeekPriority,
    support_required: topic.supportRequired,
    updated_at: topic.updatedAt,
  };
}

// ─── Supabase implementations ─────────────────────────────────────────────────

const CURRENT_REPORT_KEY = "weekly-reporting:current-report-id";

export class SupabaseReportRepository implements ReportRepository {
  async getOrCreateCurrent(): Promise<Report> {
    const storedId =
      typeof window !== "undefined" ? localStorage.getItem(CURRENT_REPORT_KEY) : null;

    if (storedId) {
      const { data } = await supabase
        .from("reports")
        .select("*")
        .eq("id", storedId)
        .maybeSingle();
      if (data) return rowToReport(data as ReportRow);
    }

    // Reuse the most recent existing report before creating a new one
    const { data: latest } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latest) {
      const report = rowToReport(latest as ReportRow);
      if (typeof window !== "undefined") localStorage.setItem(CURRENT_REPORT_KEY, report.id);
      return report;
    }

    const today = new Date().toISOString().split("T")[0];
    const { data: created, error } = await supabase
      .from("reports")
      .insert({ week_start: today, week_end: today })
      .select("*")
      .single();

    if (error) throw new Error(`Failed to create report: ${error.message}`);

    const report = rowToReport(created as ReportRow);
    if (typeof window !== "undefined") localStorage.setItem(CURRENT_REPORT_KEY, report.id);
    return report;
  }
}

export class SupabaseTopicRepository implements TopicRepository {
  constructor(private readonly reportId: string) {}

  async list(): Promise<Topic[]> {
    const { data, error } = await supabase
      .from("topics")
      .select("*")
      .eq("report_id", this.reportId)
      .order("created_at", { ascending: true });

    if (error) throw new Error(`Failed to load topics: ${error.message}`);
    return (data as TopicRow[]).map(rowToTopic);
  }

  async saveAll(topics: Topic[]): Promise<void> {
    const { error: delErr } = await supabase
      .from("topics")
      .delete()
      .eq("report_id", this.reportId);
    if (delErr) throw new Error(`Failed to clear topics: ${delErr.message}`);

    if (topics.length === 0) return;

    const rows = topics.map((t) => topicToRow(t, this.reportId));
    const { error: insErr } = await supabase.from("topics").insert(rows);
    if (insErr) throw new Error(`Failed to save topics: ${insErr.message}`);
  }
}

// ─── One-time migration: localStorage → Supabase ─────────────────────────────

const MIGRATION_FLAG = "weekly-reporting:supabase-migrated:v1";

export async function runMigrationIfNeeded(): Promise<{
  skipped: boolean;
  count: number;
}> {
  if (typeof window === "undefined") return { skipped: true, count: 0 };
  if (localStorage.getItem(MIGRATION_FLAG)) return { skipped: true, count: 0 };

  const reportRepo = new SupabaseReportRepository();
  const report = await reportRepo.getOrCreateCurrent();

  const { data: existing } = await supabase
    .from("topics")
    .select("id")
    .eq("report_id", report.id)
    .limit(1);

  if (existing && existing.length > 0) {
    localStorage.setItem(MIGRATION_FLAG, new Date().toISOString());
    return { skipped: true, count: 0 };
  }

  const localTopics = topicsStore.list();

  if (localTopics.length === 0) {
    localStorage.setItem(MIGRATION_FLAG, new Date().toISOString());
    return { skipped: true, count: 0 };
  }

  // Stagger created_at by 1 ms per row to preserve insertion order
  const rows = localTopics.map((t, i) => ({
    ...topicToRow(t, report.id),
    created_at: new Date(Date.now() + i).toISOString(),
  }));

  const { error } = await supabase.from("topics").insert(rows);
  if (error) throw new Error(`Migration insert failed: ${error.message}`);

  localStorage.setItem(MIGRATION_FLAG, new Date().toISOString());
  console.info(`[migration] Migrated ${localTopics.length} topics to Supabase.`);
  return { skipped: false, count: localTopics.length };
}

// ─── Factory ──────────────────────────────────────────────────────────────────

export async function createSupabaseRepositories(): Promise<{
  topics: TopicRepository;
  report: Report;
}> {
  const reportRepo = new SupabaseReportRepository();
  const report = await reportRepo.getOrCreateCurrent();
  return { topics: new SupabaseTopicRepository(report.id), report };
}

// Creates a brand-new report (weekly rollover) and updates the stored current-report pointer.
export async function createFreshReport(): Promise<{
  topics: TopicRepository;
  report: Report;
}> {
  const today = new Date().toISOString().split("T")[0];
  const weekEnd = new Date(Date.now() + 6 * 86400000).toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("reports")
    .insert({ week_start: today, week_end: weekEnd })
    .select("*")
    .single();

  if (error) throw new Error(`Failed to create report: ${error.message}`);

  const report = rowToReport(data as ReportRow);
  if (typeof window !== "undefined") {
    localStorage.setItem(CURRENT_REPORT_KEY, report.id);
  }
  return { topics: new SupabaseTopicRepository(report.id), report };
}
