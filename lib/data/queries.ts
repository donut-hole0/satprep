import "server-only";
import { createClient } from "@/lib/supabase/server";

export interface ProfileData {
  firstName: string;
  initials: string;
  activeSubject: string;
  goalScore: number;
  currentScore: number | null;
  daysUntilTest: number | null;
}

export interface DerivedStats {
  attempted: number;
  todayAttempted: number;
  correct: number;
  accuracyPct: number;
  streak: number;
  savedCount: number;
  errorCount: number;
}

const fmtDay = (d: Date) => d.toISOString().slice(0, 10);

function computeStreak(dayKeys: Set<string>): number {
  let streak = 0;
  const cursor = new Date();
  // If the user hasn't practiced yet today, don't break the streak — start
  // counting from yesterday.
  if (!dayKeys.has(fmtDay(cursor))) cursor.setUTCDate(cursor.getUTCDate() - 1);
  while (dayKeys.has(fmtDay(cursor))) {
    streak++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

/** The signed-in user's profile, with safe fallbacks. */
export async function getProfile(): Promise<ProfileData | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("first_name, active_subject, goal_score, current_score, test_date")
    .eq("id", user.id)
    .maybeSingle();

  const firstName = data?.first_name ?? user.email?.split("@")[0] ?? "Student";
  const initials = firstName.slice(0, 2).toUpperCase();

  let daysUntilTest: number | null = null;
  if (data?.test_date) {
    const diff = new Date(data.test_date).getTime() - Date.now();
    daysUntilTest = Math.max(0, Math.ceil(diff / 86_400_000));
  }

  return {
    firstName,
    initials,
    activeSubject: data?.active_subject ?? "SAT",
    goalScore: data?.goal_score ?? 1600,
    currentScore: data?.current_score ?? null,
    daysUntilTest,
  };
}

/** KPI numbers derived entirely from the user's attempts + saved questions. */
export async function getDerivedStats(): Promise<DerivedStats> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const empty: DerivedStats = {
    attempted: 0,
    todayAttempted: 0,
    correct: 0,
    accuracyPct: 0,
    streak: 0,
    savedCount: 0,
    errorCount: 0,
  };
  if (!user) return empty;

  const { data: attempts } = await supabase
    .from("attempts")
    .select("is_correct, created_at")
    .eq("user_id", user.id);

  const { count: savedCount } = await supabase
    .from("saved_questions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const rows = attempts ?? [];
  const attempted = rows.length;
  const correct = rows.filter((r) => r.is_correct).length;
  const today = fmtDay(new Date());
  const todayAttempted = rows.filter(
    (r) => (r.created_at as string).slice(0, 10) === today,
  ).length;
  const dayKeys = new Set(
    rows.map((r) => (r.created_at as string).slice(0, 10)),
  );

  return {
    attempted,
    todayAttempted,
    correct,
    accuracyPct: attempted ? Math.round((correct / attempted) * 100) : 0,
    streak: computeStreak(dayKeys),
    savedCount: savedCount ?? 0,
    errorCount: attempted - correct,
  };
}

export interface TopicGroup {
  domain: string;
  total: number;
  topics: { topic: string; count: number }[];
}

/** Question Bank: counts grouped by domain → topic. */
export async function getTopicGroups(): Promise<TopicGroup[]> {
  const supabase = createClient();
  const { data } = await supabase.from("questions").select("domain, topic");
  const rows = data ?? [];

  const byDomain = new Map<string, Map<string, number>>();
  for (const { domain, topic } of rows) {
    if (!byDomain.has(domain)) byDomain.set(domain, new Map());
    const topics = byDomain.get(domain)!;
    topics.set(topic, (topics.get(topic) ?? 0) + 1);
  }

  return [...byDomain.entries()].map(([domain, topics]) => ({
    domain,
    total: [...topics.values()].reduce((a, b) => a + b, 0),
    topics: [...topics.entries()]
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => a.topic.localeCompare(b.topic)),
  }));
}

export interface PracticeQuestion {
  id: string;
  domain: string;
  topic: string;
  difficulty: string;
  prompt: string;
  choices: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
  saved: boolean;
}

/** All questions for a topic, flagged with whether the user saved each one. */
export async function getQuestionsByTopic(
  domain: string,
  topic: string,
): Promise<PracticeQuestion[]> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("questions")
    .select("id, domain, topic, difficulty, prompt, choices, correct_key, explanation")
    .eq("domain", domain)
    .eq("topic", topic)
    .order("difficulty");

  const savedIds = new Set<string>();
  if (user) {
    const { data: saved } = await supabase
      .from("saved_questions")
      .select("question_id")
      .eq("user_id", user.id);
    saved?.forEach((s) => savedIds.add(s.question_id as string));
  }

  return (data ?? []).map((q) => ({
    id: q.id as string,
    domain: q.domain as string,
    topic: q.topic as string,
    difficulty: q.difficulty as string,
    prompt: q.prompt as string,
    choices: q.choices as { key: string; text: string }[],
    correctKey: q.correct_key as string,
    explanation: q.explanation as string,
    saved: savedIds.has(q.id as string),
  }));
}
