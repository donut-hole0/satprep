import { ListChecks, Target, Flame, Bookmark, AlertTriangle } from "lucide-react";
import type { DerivedStats } from "@/lib/data/queries";

interface Tile {
  label: string;
  value: number | string;
  sub: string;
  icon: typeof ListChecks;
}

function KpiTile({ tile }: { tile: Tile }) {
  const { icon: Icon } = tile;
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#212121] p-4">
      <div className="flex items-center justify-between">
        <span className="text-[12.5px] text-white/50">{tile.label}</span>
        <Icon size={15} className="text-white/30" />
      </div>
      <div className="mt-2 text-[26px] font-semibold leading-none tracking-tight tabular-nums text-white">
        {tile.value}
      </div>
      <div className="mt-1.5 text-[12px] text-white/40">{tile.sub}</div>
    </div>
  );
}

export function KpiCards({ stats }: { stats: DerivedStats }) {
  const tiles: Tile[] = [
    {
      label: "Attempted",
      value: stats.attempted,
      sub: `${stats.todayAttempted} today`,
      icon: ListChecks,
    },
    {
      label: "Accuracy",
      value: `${stats.accuracyPct}%`,
      sub: `${stats.correct} correct`,
      icon: Target,
    },
    {
      label: "Day streak",
      value: stats.streak,
      sub: stats.streak > 0 ? "keep it up" : "not started",
      icon: Flame,
    },
    {
      label: "Saved",
      value: stats.savedCount,
      sub: "for review",
      icon: Bookmark,
    },
    {
      label: "To review",
      value: stats.errorCount,
      sub: stats.errorCount > 0 ? "needs review" : "no errors",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {tiles.map((tile) => (
        <KpiTile key={tile.label} tile={tile} />
      ))}
    </div>
  );
}
