import Link from "next/link";
import {
  CheckCheck,
  PieChart,
  Flame,
  Bookmark,
  TriangleAlert,
} from "lucide-react";
import type { KpiTint } from "@/lib/types";
import type { DerivedStats } from "@/lib/data/queries";

const tintBg: Record<KpiTint, string> = {
  indigo: "bg-indigo-50 dark:bg-tint-indigo",
  green: "bg-green-50 dark:bg-tint-green",
  amber: "bg-amber-50 dark:bg-tint-amber",
  purple: "bg-purple-50 dark:bg-tint-purple",
  red: "bg-red-50 dark:bg-tint-red",
};

const iconColor: Record<KpiTint, string> = {
  indigo: "text-indigo-400",
  green: "text-emerald-400",
  amber: "text-amber-400",
  purple: "text-purple-400",
  red: "text-red-400",
};

const badgeColor = {
  purple: "bg-accent-purple/15 text-accent-purple",
  red: "bg-accent-red/15 text-accent-red",
} as const;

interface Tile {
  title: string;
  value: number | string;
  subLabel: string;
  tint: KpiTint;
  icon: typeof CheckCheck;
  badge?: { label: string; color: "purple" | "red"; href: string };
}

function KpiTile({ tile }: { tile: Tile }) {
  const { icon: Icon } = tile;
  return (
    <div
      className={`relative overflow-hidden rounded-card border border-line-light p-4 dark:border-white/5 ${tintBg[tile.tint]}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[15px] font-semibold text-ink-faint dark:text-ink-body">
          {tile.title}
        </p>
        {tile.badge && (
          <Link
            href={tile.badge.href}
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${badgeColor[tile.badge.color]}`}
          >
            {tile.badge.label}
          </Link>
        )}
      </div>
      <p className="text-[28px] font-bold leading-none text-ink-faint dark:text-ink-primary">
        {tile.value}
      </p>
      <p className="mt-1.5 text-[12px] text-ink-muted">{tile.subLabel}</p>
      <Icon
        size={56}
        strokeWidth={1.5}
        className={`pointer-events-none absolute -bottom-2 -right-2 opacity-15 ${iconColor[tile.tint]}`}
      />
    </div>
  );
}

export function KpiCards({ stats }: { stats: DerivedStats }) {
  const tiles: Tile[] = [
    {
      title: "Attempted",
      value: stats.attempted,
      subLabel: `Today: ${stats.todayAttempted}`,
      tint: "indigo",
      icon: CheckCheck,
    },
    {
      title: "Accuracy",
      value: `${stats.accuracyPct}%`,
      subLabel: `${stats.correct} correct`,
      tint: "green",
      icon: PieChart,
    },
    {
      title: "Streak",
      value: stats.streak,
      subLabel: stats.streak > 0 ? "day streak — keep it up" : "Start your streak",
      tint: "amber",
      icon: Flame,
    },
    {
      title: "Saved",
      value: stats.savedCount,
      subLabel: "Marked for review",
      tint: "purple",
      icon: Bookmark,
      badge: { label: "View", color: "purple", href: "/saved-questions" },
    },
    {
      title: "Error Log",
      value: stats.errorCount,
      subLabel: "Need review",
      tint: "red",
      icon: TriangleAlert,
      badge: { label: "View", color: "red", href: "/my-mistakes" },
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {tiles.map((tile) => (
        <KpiTile key={tile.title} tile={tile} />
      ))}
    </div>
  );
}
