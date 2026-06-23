import {
  Users,
  GraduationCap,
  CalendarDays,
  FileText,
  HelpCircle,
  ClipboardList,
} from "lucide-react";
import { communityStats } from "@/lib/data/dashboard";

const items = [
  { icon: Users, value: communityStats.members, label: "Members" },
  { icon: GraduationCap, value: communityStats.tutors, label: "Tutors" },
  { icon: CalendarDays, value: communityStats.events, label: "Events" },
  { icon: FileText, value: communityStats.resources, label: "Resources" },
  { icon: HelpCircle, value: communityStats.questions, label: "Questions" },
  { icon: ClipboardList, value: communityStats.tests, label: "Tests" },
];

const fmt = (n: number) => n.toLocaleString("en-US");

export function StatsStrip() {
  return (
    <div className="grid grid-cols-2 gap-5 rounded-card border border-line-light bg-white p-5 shadow-card-light dark:border-transparent dark:bg-panel dark:shadow-sm sm:grid-cols-3 lg:grid-cols-6">
      {items.map(({ icon: Icon, value, label }) => (
        <div key={label} className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
            style={{ backgroundColor: "var(--brand)" }}
          >
            <Icon size={18} className="text-panel" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="text-[20px] font-bold leading-tight text-ink-faint dark:text-ink-primary">
              {fmt(value)}
            </p>
            <p className="text-[12px] text-ink-muted">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
