import Link from "next/link";
import { ArrowRight } from "lucide-react";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export function GreetingBar({
  firstName,
  streak,
  totalQuestions,
}: {
  firstName: string;
  streak: number;
  totalQuestions: number;
}) {
  const streakLine =
    streak > 0
      ? `You're on a ${streak}-day streak.`
      : "Start a streak today.";

  return (
    <div>
      <h2 className="text-[26px] font-semibold tracking-tight text-white">
        {greeting()}, {firstName}
      </h2>
      <p className="mt-1.5 text-[14.5px] text-white/55">
        {streakLine} {totalQuestions} question
        {totalQuestions === 1 ? "" : "s"} ready in your bank.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          href="/question-bank"
          style={{ backgroundColor: "#3E5FE0" }}
          className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[14px] font-medium text-white transition-[filter] duration-150 hover:brightness-110"
        >
          Start today&apos;s session
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/question-bank"
          className="inline-flex items-center gap-2 rounded-[10px] border border-white/[0.12] px-4 py-2.5 text-[14px] font-medium text-white/85 transition-colors duration-150 hover:bg-white/[0.06]"
        >
          Browse question bank
        </Link>
      </div>
    </div>
  );
}
