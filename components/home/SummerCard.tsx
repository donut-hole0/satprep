import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

/** Flat sun + rising line-chart illustration. */
function SummerArt() {
  return (
    <svg
      viewBox="0 0 220 160"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <circle cx="168" cy="44" r="22" fill="var(--brand)" />
      {[...Array(8)].map((_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 168 + Math.cos(a) * 30;
        const y1 = 44 + Math.sin(a) * 30;
        const x2 = 168 + Math.cos(a) * 38;
        const y2 = 44 + Math.sin(a) * 38;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--brand)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
      <polyline
        points="20,130 60,110 100,118 140,80 180,50 205,30"
        fill="none"
        stroke="#F7F6F2"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [20, 130],
        [60, 110],
        [100, 118],
        [140, 80],
        [180, 50],
        [205, 30],
      ].map(([x, y]) => (
        <circle key={`${x}`} cx={x} cy={y} r="3.5" fill="#F7F6F2" />
      ))}
    </svg>
  );
}

export function SummerCard() {
  return (
    <Card className="grid items-center gap-6 overflow-hidden p-6 sm:grid-cols-[1fr_220px]">
      <div>
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-ink-muted">
          Summer Prep Window
        </p>
        <h2 className="text-[26px] font-bold uppercase leading-[1.1] text-ink-faint dark:text-ink-primary">
          You&apos;ve got ~10 weeks. This is the window that moves scores.
        </h2>
        <p className="mt-3 max-w-prose text-[15px] text-ink-faint dark:text-ink-secondary">
          No school, no distractions — the students who climb 100+ points almost
          always do it over a focused summer. Lock in a plan now.
        </p>
        <a
          href="/study-plan"
          className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-accent-blue-light transition-colors duration-150 ease-standard hover:text-accent-blue"
        >
          Build Your Summer Plan
          <ArrowRight size={15} />
        </a>
      </div>
      <div className="hidden h-36 rounded bg-canvas/40 p-2 dark:bg-canvas sm:block">
        <SummerArt />
      </div>
    </Card>
  );
}
