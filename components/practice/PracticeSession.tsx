"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bookmark, Check, X, RotateCcw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import type { PracticeQuestion } from "@/lib/data/queries";

export function PracticeSession({
  questions,
}: {
  questions: PracticeQuestion[];
}) {
  const supabase = useMemo(() => createClient(), []);
  const [userId, setUserId] = useState<string | null>(null);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [saved, setSaved] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(questions.map((q) => [q.id, q.saved])),
  );
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, [supabase]);

  const q = questions[index];
  const isCorrect = submitted && selected === q.correctKey;

  async function handleSubmit() {
    if (selected === null || submitted) return;
    const correct = selected === q.correctKey;
    setSubmitted(true);
    if (correct) setCorrectCount((c) => c + 1);

    if (userId) {
      await supabase.from("attempts").insert({
        user_id: userId,
        question_id: q.id,
        selected_key: selected,
        is_correct: correct,
      });
    }
  }

  function handleNext() {
    if (index + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setSubmitted(false);
  }

  async function toggleSave() {
    const next = !saved[q.id];
    setSaved((s) => ({ ...s, [q.id]: next }));
    if (!userId) return;
    if (next) {
      await supabase
        .from("saved_questions")
        .insert({ user_id: userId, question_id: q.id });
    } else {
      await supabase
        .from("saved_questions")
        .delete()
        .eq("user_id", userId)
        .eq("question_id", q.id);
    }
  }

  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <Card className="p-8 text-center">
        <p className="text-[13px] font-semibold uppercase tracking-wider text-ink-muted">
          Session complete
        </p>
        <p className="my-2 text-[44px] font-bold leading-none text-ink-faint dark:text-ink-primary">
          {pct}%
        </p>
        <p className="text-[14px] text-ink-secondary">
          {correctCount} of {questions.length} correct
        </p>
        <p className="mt-4 text-[13px] text-ink-muted">
          Your dashboard has been updated with these attempts.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/question-bank"
            className="rounded-cta border border-line-light px-5 py-2 text-[14px] font-medium text-ink-faint transition-colors hover:bg-black/5 dark:border-line-subtle/80 dark:text-ink-body dark:hover:bg-white/5"
          >
            Back to bank
          </Link>
          <Link
            href="/"
            className="rounded-cta px-5 py-2 text-[14px] font-semibold text-panel transition-[filter] hover:brightness-90"
            style={{ backgroundColor: "var(--brand)" }}
          >
            View dashboard
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* progress */}
      <div className="flex items-center justify-between text-[13px] text-ink-muted">
        <span>
          Question {index + 1} of {questions.length}
        </span>
        <span className="capitalize">{q.difficulty}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-line-light dark:bg-line-subtle/50">
        <div
          className="h-full rounded-full transition-[width] duration-300 ease-standard"
          style={{
            width: `${((index + (submitted ? 1 : 0)) / questions.length) * 100}%`,
            backgroundColor: "var(--brand)",
          }}
        />
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <p className="text-[16px] font-medium leading-relaxed text-ink-faint dark:text-ink-primary">
            {q.prompt}
          </p>
          <button
            type="button"
            onClick={toggleSave}
            aria-label={saved[q.id] ? "Remove bookmark" : "Save question"}
            className="shrink-0 text-ink-muted transition-colors hover:text-accent-purple"
          >
            <Bookmark
              size={20}
              className={saved[q.id] ? "fill-accent-purple text-accent-purple" : ""}
            />
          </button>
        </div>

        <div className="space-y-2.5">
          {q.choices.map((c) => {
            const chosen = selected === c.key;
            const showCorrect = submitted && c.key === q.correctKey;
            const showWrong = submitted && chosen && c.key !== q.correctKey;

            let cls =
              "border-line-light dark:border-line-subtle/70 hover:border-accent-blue";
            if (showCorrect)
              cls = "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10";
            else if (showWrong)
              cls = "border-accent-red bg-red-50 dark:bg-accent-red/10";
            else if (chosen)
              cls = "border-accent-blue bg-blue-50 dark:bg-accent-blue/10";

            return (
              <button
                key={c.key}
                type="button"
                disabled={submitted}
                onClick={() => setSelected(c.key)}
                className={`flex w-full items-center gap-3 rounded border px-4 py-3 text-left text-[14px] text-ink-faint transition-colors duration-150 ease-standard disabled:cursor-default dark:text-ink-body ${cls}`}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-current text-[12px] font-semibold text-ink-muted">
                  {c.key}
                </span>
                <span className="flex-1">{c.text}</span>
                {showCorrect && <Check size={18} className="text-emerald-500" />}
                {showWrong && <X size={18} className="text-accent-red" />}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div
            className={`mt-4 rounded p-4 text-[14px] ${
              isCorrect
                ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "bg-red-50 text-red-800 dark:bg-accent-red/10 dark:text-red-300"
            }`}
          >
            <p className="mb-1 font-semibold">
              {isCorrect ? "Correct!" : `Correct answer: ${q.correctKey}`}
            </p>
            <p className="opacity-90">{q.explanation}</p>
          </div>
        )}
      </Card>

      <div className="flex justify-end gap-3">
        {!submitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={selected === null}
            className="rounded-cta px-6 py-2.5 text-[14px] font-semibold text-panel transition-[filter] duration-150 ease-standard hover:brightness-90 disabled:opacity-50"
            style={{ backgroundColor: "var(--brand)" }}
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 rounded-cta px-6 py-2.5 text-[14px] font-semibold text-panel transition-[filter] duration-150 ease-standard hover:brightness-90"
            style={{ backgroundColor: "var(--brand)" }}
          >
            {index + 1 >= questions.length ? (
              <>
                <RotateCcw size={15} />
                Finish
              </>
            ) : (
              "Next question"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
