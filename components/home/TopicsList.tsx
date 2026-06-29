import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { TopicGroup } from "@/lib/data/queries";

/** "Continue practicing" — real domains from the question bank. */
export function TopicsList({ groups }: { groups: TopicGroup[] }) {
  if (groups.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#1E1E1E]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
        <span className="text-[14px] font-medium text-white">
          Continue practicing
        </span>
        <Link
          href="/question-bank"
          className="text-[12.5px] text-white/50 transition-colors hover:text-white/80"
        >
          View all
        </Link>
      </div>
      <ul>
        {groups.map((group) => (
          <li key={group.domain}>
            <Link
              href="/question-bank"
              className="group flex items-center gap-4 border-b border-white/[0.05] px-5 py-3.5 transition-colors duration-150 last:border-0 hover:bg-white/[0.03]"
            >
              <div className="min-w-0 flex-1">
                <div className="text-[14.5px] font-medium text-white">
                  {group.domain}
                </div>
                <div className="truncate text-[12.5px] text-white/45">
                  {group.topics.map((t) => t.topic).join(" · ")}
                </div>
              </div>
              <span className="shrink-0 rounded-md bg-white/[0.06] px-2 py-0.5 text-[12px] tabular-nums text-white/60">
                {group.total}
              </span>
              <ChevronRight
                size={16}
                className="shrink-0 text-white/25 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-white/60"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
