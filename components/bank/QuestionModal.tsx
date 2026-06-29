"use client";

import { useState } from "react";
import { X, Check, Bookmark } from "lucide-react";
import type { AceboardQuestion } from "@/lib/data/aceboardQuestions";
import type { Difficulty } from "@/lib/data/satBank";

const diffStyle: Record<Difficulty, string> = {
  Easy: "text-emerald-400 bg-emerald-400/10",
  Medium: "text-amber-400 bg-amber-400/10",
  Hard: "text-rose-400 bg-rose-400/10",
};

export function QuestionModal({
  question,
  saved,
  onClose,
  onAnswered,
  onToggleSaved,
}: {
  question: AceboardQuestion;
  saved: boolean;
  onClose: () => void;
  onAnswered: () => void; // mark the question done
  onToggleSaved: () => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const revealed = picked !== null;
  const isCorrect = picked === question.correctKey;

  function choose(key: string) {
    if (revealed) return;
    setPicked(key);
    onAnswered();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium ${diffStyle[question.difficulty]}`}
            >
              {question.difficulty}
            </span>
            <span className="text-[12.5px] text-white/45">
              {question.domain} · {question.skill}
            </span>
          </div>
          <button
            onClick={onClose}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Stem */}
        <p className="whitespace-pre-line text-[15px] leading-relaxed text-white/90">
          {question.stem}
        </p>

        {/* Choices */}
        <div className="mt-5 space-y-2">
          {question.choices.map((ch) => {
            const isAnswer = ch.key === question.correctKey;
            const isPicked = ch.key === picked;
            let cls =
              "border-white/[0.1] text-white/80 hover:border-white/25 hover:bg-white/[0.03]";
            if (revealed && isAnswer)
              cls = "border-emerald-500/50 bg-emerald-500/10 text-white";
            else if (revealed && isPicked)
              cls = "border-rose-500/50 bg-rose-500/10 text-white";
            else if (revealed) cls = "border-white/[0.06] text-white/40";
            return (
              <button
                key={ch.key}
                onClick={() => choose(ch.key)}
                disabled={revealed}
                className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-[14px] transition-colors ${cls}`}
              >
                <span className="font-mono text-[13px] text-white/40">
                  {ch.key}
                </span>
                <span className="flex-1">{ch.text}</span>
                {revealed && isAnswer && (
                  <Check size={16} className="text-emerald-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {revealed && (
          <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#212121] p-4">
            <p
              className={`text-[13px] font-semibold ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}
            >
              {isCorrect ? "Correct" : "Not quite"}
            </p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/70">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={onToggleSaved}
            className={
              "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] transition-colors " +
              (saved
                ? "text-amber-400"
                : "text-white/50 hover:bg-white/[0.06] hover:text-white/80")
            }
          >
            <Bookmark size={14} className={saved ? "fill-amber-400" : ""} />
            {saved ? "Saved" : "Save"}
          </button>
          <button
            onClick={onClose}
            style={{ backgroundColor: "#3E5FE0" }}
            className="rounded-[10px] px-4 py-2 text-[13.5px] font-medium text-white transition-[filter] hover:brightness-110"
          >
            {revealed ? "Done" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
