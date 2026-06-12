/**
 * One-time migration: inserts SEED_TOPICS into Supabase.
 * Run with:  npx tsx scripts/run-migration.ts
 */

import { createClient } from "@supabase/supabase-js";
import { SEED_TOPICS } from "../src/lib/seed-data.ts";

const SUPABASE_URL = "https://rocybqcwizkrdwmbyhwv.supabase.co";
const SUPABASE_KEY = "sb_publishable_iMdJcHjRY-lmv1uZCyH6sA_O85bSbJE";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  console.log("Connecting to Supabase:", SUPABASE_URL);
  console.log(`Loaded ${SEED_TOPICS.length} topics from seed-data.ts`);

  // 1. Delete all existing reports (cascades to topics)
  const { data: existing } = await supabase.from("reports").select("id");
  if (existing && existing.length > 0) {
    console.log(`Deleting ${existing.length} existing report(s)...`);
    for (const r of existing) {
      const { error } = await supabase.from("reports").delete().eq("id", r.id);
      if (error) { console.error("Delete failed:", error.message); process.exit(1); }
    }
  }

  // 2. Create a fresh report
  const today = new Date().toISOString().split("T")[0];
  const { data: report, error: rErr } = await supabase
    .from("reports")
    .insert({ week_start: today, week_end: today })
    .select("id")
    .single();

  if (rErr || !report) {
    console.error("ERROR creating report:", rErr?.message);
    process.exit(1);
  }
  console.log(`Created report: ${report.id}`);

  // 3. Map SEED_TOPICS → DB rows
  const base = Date.now();
  const rows = SEED_TOPICS.map((t, i) => ({
    id: t.id,
    report_id: report.id,
    group_name: t.group,
    topic_name: t.topic,
    status: t.status,
    priority: t.priority,
    changed_since_previous: t.changedSincePrevious,
    reviewed: t.reviewed,
    previous_week_update: t.previousWeekUpdate,
    current_week_update: t.currentWeekUpdate,
    risks_and_challenges: t.risksAndChallenges,
    next_week_priority: t.nextWeekPriority,
    support_required: t.supportRequired,
    updated_at: t.updatedAt,
    created_at: new Date(base + i).toISOString(),
  }));

  // 4. Insert all topics
  const { error: insErr } = await supabase.from("topics").insert(rows);
  if (insErr) {
    console.error("ERROR inserting topics:", insErr.message);
    process.exit(1);
  }

  console.log(`\n✓ Inserted ${rows.length} topics into report ${report.id}`);

  // 5. Verify: read back שרת ענן
  const { data: sample, error: sErr } = await supabase
    .from("topics")
    .select("*")
    .eq("report_id", report.id)
    .eq("topic_name", "שרת ענן")
    .single();

  if (sErr || !sample) {
    console.error("Could not fetch sample topic:", sErr?.message);
  } else {
    console.log("\n── שרת ענן (database row) ─────────────────────────────");
    console.log(JSON.stringify(sample, null, 2));
  }

  // 6. Summary
  const { count } = await supabase
    .from("topics")
    .select("*", { count: "exact", head: true })
    .eq("report_id", report.id);

  console.log(`\n── Summary ─────────────────────────────────────────────`);
  console.log(`Reports inserted : 1`);
  console.log(`Topics in report : ${count}`);
  console.log(`Report ID        : ${report.id}`);
  console.log(`Migration        : completed`);
}

main().catch((e) => { console.error(e); process.exit(1); });
