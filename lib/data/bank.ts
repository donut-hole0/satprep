import "server-only";
import { createClient } from "@/lib/supabase/server";

export type BankStatus = "practiced" | "done";

export interface ProgressRow {
  status: BankStatus | null;
  saved: boolean;
}

/** Current user's tracking for official questions, keyed by Question ID. */
export async function getBankProgress(): Promise<Record<string, ProgressRow>> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return {};

  const { data } = await supabase
    .from("question_progress")
    .select("external_id, status, saved")
    .eq("user_id", user.id);

  const map: Record<string, ProgressRow> = {};
  for (const r of data ?? []) {
    map[r.external_id as string] = {
      status: (r.status as BankStatus | null) ?? null,
      saved: !!r.saved,
    };
  }
  return map;
}
