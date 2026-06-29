"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { BankStatus } from "@/lib/data/bank";

/**
 * Persist a user's tracking state for one official question. The client sends
 * the full desired state (status + saved), so we upsert the whole row.
 */
export async function saveProgress(
  externalId: string,
  status: BankStatus | null,
  saved: boolean,
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  if (status === null && !saved) {
    // Nothing tracked anymore — drop the row.
    await supabase
      .from("question_progress")
      .delete()
      .eq("user_id", user.id)
      .eq("external_id", externalId);
  } else {
    await supabase.from("question_progress").upsert(
      {
        user_id: user.id,
        external_id: externalId,
        status,
        saved,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,external_id" },
    );
  }

  revalidatePath("/question-bank");
  revalidatePath("/");
}
