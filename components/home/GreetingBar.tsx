import { Play, Target, CalendarDays, BarChart3, Pencil } from "lucide-react";
import Link from "next/link";
import type { ProfileData } from "@/lib/data/queries";

function StatusPill({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="flex h-9 items-center gap-2 rounded-full border border-line-light bg-white px-3 text-[14px] font-medium text-ink-faint transition-colors duration-150 ease-standard dark:border-line-subtle/80 dark:bg-panel dark:text-ink-body">
      {icon}
      {children}
      <Pencil size={13} className="ml-0.5 text-ink-muted" />
    </span>
  );
}

export function GreetingBar({ profile }: { profile: ProfileData }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl text-ink-faint dark:text-ink-primary">
          Hi {profile.firstName} <span className="align-middle">👋</span>
        </h1>
        <Link
          href="/question-bank"
          className="flex h-9 items-center gap-2 rounded-full border border-line-light bg-white px-3 text-[14px] font-medium text-ink-faint transition-colors duration-150 ease-standard hover:border-brand dark:border-line-subtle/80 dark:bg-panel dark:text-ink-body"
        >
          <span
            className="grid h-5 w-5 place-items-center rounded-full"
            style={{ backgroundColor: "var(--brand)" }}
          >
            <Play size={11} className="ml-0.5 fill-panel text-panel" />
          </span>
          Start Today&apos;s Session
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <StatusPill icon={<Target size={15} className="text-accent-red" />}>
          Goal: {profile.goalScore}
        </StatusPill>
        <StatusPill
          icon={<CalendarDays size={15} className="text-accent-blue" />}
        >
          {profile.daysUntilTest != null
            ? `${profile.daysUntilTest} days until test`
            : "Set your test date"}
        </StatusPill>
        <StatusPill
          icon={<BarChart3 size={15} className="text-accent-amber" />}
        >
          {profile.currentScore != null
            ? `Current: ${profile.currentScore}`
            : "No score yet"}
        </StatusPill>
      </div>
    </div>
  );
}
