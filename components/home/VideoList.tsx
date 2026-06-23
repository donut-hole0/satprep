import { Play, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { videos } from "@/lib/data/dashboard";

function WatchPill() {
  return (
    <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-line-light px-3 py-1 text-[12px] font-medium text-ink-faint dark:border-line-subtle/80 dark:text-ink-body">
      <Play size={11} className="fill-current" />
      Watch now
    </span>
  );
}

function Thumb({ large = false }: { large?: boolean }) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded bg-canvas/30 dark:bg-canvas ${large ? "h-24 w-40" : "h-12 w-20"}`}
    >
      <span
        className="grid place-items-center rounded-full"
        style={{
          backgroundColor: "var(--brand)",
          height: large ? 36 : 24,
          width: large ? 36 : 24,
        }}
      >
        <Play
          size={large ? 16 : 11}
          className="ml-0.5 fill-panel text-panel"
        />
      </span>
    </div>
  );
}

export function VideoList() {
  const featured = videos.find((v) => v.featured) ?? videos[0];
  const rest = videos.filter((v) => v.id !== featured.id);

  return (
    <Card className="p-5">
      <h3 className="mb-4 text-[16px] font-bold text-ink-faint dark:text-ink-primary">
        YouTube Videos of the Week
      </h3>

      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-ink-faint dark:text-ink-body">
            {featured.title}
          </p>
          <p className="mt-1 text-[13px] text-ink-muted">{featured.channel}</p>
          <div className="mt-3">
            <WatchPill />
          </div>
        </div>
        <Thumb large />
      </div>

      <ul className="divide-y divide-line-light dark:divide-line-subtle/50">
        {rest.map((v) => (
          <li
            key={v.id}
            className="flex items-center justify-between gap-4 py-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Thumb />
              <div className="min-w-0">
                <p className="truncate text-[14px] font-medium text-ink-faint dark:text-ink-body">
                  {v.title}
                </p>
                <p className="text-[12px] text-ink-muted">{v.channel}</p>
              </div>
            </div>
            <WatchPill />
          </li>
        ))}
      </ul>

      <div className="mt-4 text-center">
        <a
          href="/tutorial-bank"
          className="inline-flex items-center gap-1 text-[14px] font-medium text-accent-blue-light transition-colors duration-150 ease-standard hover:text-accent-blue"
        >
          See all Curated Videos
          <ArrowRight size={15} />
        </a>
      </div>
    </Card>
  );
}
