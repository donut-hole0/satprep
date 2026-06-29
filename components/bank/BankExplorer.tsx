"use client";

import { useMemo, useState, useTransition } from "react";
import { ExternalLink, Check, Bookmark, RotateCcw, Play } from "lucide-react";
import {
  TAXONOMY,
  DIFFICULTIES,
  OFFICIAL_BANK_URL,
  type BankQuestion,
  type Section,
  type Difficulty,
} from "@/lib/data/satBank";
import type { AceboardQuestion } from "@/lib/data/aceboardQuestions";
import type { ProgressRow, BankStatus } from "@/lib/data/bank";
import { saveProgress } from "@/app/(app)/question-bank/actions";
import { QuestionModal } from "./QuestionModal";

const ACCENT = "#3E5FE0";
const SECTIONS: Section[] = ["Math", "Reading and Writing"];
const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "unattempted", label: "Unattempted" },
  { key: "done", label: "Done" },
  { key: "saved", label: "Saved" },
] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number]["key"];
const TYPE_FILTERS = [
  { key: "all", label: "All" },
  { key: "aceboard", label: "Practice" },
  { key: "official", label: "Official" },
] as const;
type TypeFilter = (typeof TYPE_FILTERS)[number]["key"];

type Source = "official" | "aceboard";
interface Row {
  id: string;
  source: Source;
  section: Section;
  domain: string;
  skill: string;
  difficulty: Difficulty;
}

const diffStyle: Record<Difficulty, string> = {
  Easy: "text-emerald-400 bg-emerald-400/10",
  Medium: "text-amber-400 bg-amber-400/10",
  Hard: "text-rose-400 bg-rose-400/10",
};

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={active ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}
      className={
        "rounded-lg border px-2.5 py-1 text-[12.5px] transition-colors " +
        (active
          ? "border-transparent text-white"
          : "border-white/[0.1] text-white/55 hover:border-white/20 hover:text-white/80")
      }
    >
      {children}
    </button>
  );
}

export function BankExplorer({
  official,
  aceboard,
  initialProgress,
}: {
  official: BankQuestion[];
  aceboard: AceboardQuestion[];
  initialProgress: Record<string, ProgressRow>;
}) {
  const [section, setSection] = useState<Section>("Math");
  const [domains, setDomains] = useState<Set<string>>(new Set());
  const [skills, setSkills] = useState<Set<string>>(new Set());
  const [diffs, setDiffs] = useState<Set<Difficulty>>(new Set());
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [progress, setProgress] = useState(initialProgress);
  const [activeQ, setActiveQ] = useState<AceboardQuestion | null>(null);
  const [, startTransition] = useTransition();

  const aceboardMap = useMemo(
    () => new Map(aceboard.map((q) => [q.id, q])),
    [aceboard],
  );
  const allItems: Row[] = useMemo(
    () => [
      ...aceboard.map((q) => ({
        id: q.id,
        source: "aceboard" as const,
        section: q.section,
        domain: q.domain,
        skill: q.skill,
        difficulty: q.difficulty,
      })),
      ...official.map((q) => ({ ...q, source: "official" as const })),
    ],
    [aceboard, official],
  );

  const sectionTax = TAXONOMY.find((t) => t.section === section)!;
  const visibleDomains = sectionTax.domains;
  const visibleSkills = visibleDomains
    .filter((d) => domains.size === 0 || domains.has(d.domain))
    .flatMap((d) => d.skills);

  function toggle<T>(set: Set<T>, val: T): Set<T> {
    const next = new Set(set);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    return next;
  }

  function persist(id: string, next: ProgressRow) {
    setProgress((p) => ({ ...p, [id]: next }));
    startTransition(() => saveProgress(id, next.status, next.saved));
  }

  function openOfficial(id: string) {
    window.open(OFFICIAL_BANK_URL, "_blank", "noopener");
    const cur = progress[id] ?? { status: null, saved: false };
    const status: BankStatus = cur.status === "done" ? "done" : "practiced";
    persist(id, { status, saved: cur.saved });
  }

  function toggleDone(id: string) {
    const cur = progress[id] ?? { status: null, saved: false };
    persist(id, {
      status: cur.status === "done" ? null : "done",
      saved: cur.saved,
    });
  }

  function toggleSaved(id: string) {
    const cur = progress[id] ?? { status: null, saved: false };
    persist(id, { status: cur.status, saved: !cur.saved });
  }

  function markDone(id: string) {
    const cur = progress[id] ?? { status: null, saved: false };
    persist(id, { status: "done", saved: cur.saved });
  }

  const filtered = useMemo(() => {
    return allItems.filter((q) => {
      if (q.section !== section) return false;
      if (typeFilter !== "all" && q.source !== typeFilter) return false;
      if (domains.size && !domains.has(q.domain)) return false;
      if (skills.size && !skills.has(q.skill)) return false;
      if (diffs.size && !diffs.has(q.difficulty)) return false;
      const pr = progress[q.id];
      switch (statusFilter) {
        case "unattempted":
          return !pr?.status;
        case "done":
          return pr?.status === "done";
        case "saved":
          return pr?.saved;
        default:
          return true;
      }
    });
  }, [allItems, section, typeFilter, domains, skills, diffs, statusFilter, progress]);

  const inSection = allItems.filter((q) => q.section === section);
  const doneCount = inSection.filter((q) => progress[q.id]?.status === "done").length;
  const savedCount = inSection.filter((q) => progress[q.id]?.saved).length;
  const pct = inSection.length
    ? Math.round((doneCount / inSection.length) * 100)
    : 0;

  const clearAll = () => {
    setDomains(new Set());
    setSkills(new Set());
    setDiffs(new Set());
    setStatusFilter("all");
    setTypeFilter("all");
  };

  return (
    <div className="flex gap-6">
      {/* Filter rail */}
      <aside className="hidden w-[248px] shrink-0 lg:block">
        <div className="space-y-5">
          {/* Section */}
          <div className="flex rounded-[10px] bg-[#161616] p-0.5">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSection(s);
                  clearAll();
                }}
                style={section === s ? { backgroundColor: "#2E2E2E" } : undefined}
                className={
                  "flex-1 rounded-[8px] px-2 py-1.5 text-[12.5px] font-medium transition-colors " +
                  (section === s ? "text-white" : "text-white/45 hover:text-white/70")
                }
              >
                {s === "Reading and Writing" ? "Reading & Writing" : s}
              </button>
            ))}
          </div>

          <FilterGroup label="Type">
            <div className="flex flex-wrap gap-1.5">
              {TYPE_FILTERS.map((t) => (
                <FilterChip
                  key={t.key}
                  active={typeFilter === t.key}
                  onClick={() => setTypeFilter(t.key)}
                >
                  {t.label}
                </FilterChip>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Domain">
            <div className="space-y-1.5">
              {visibleDomains.map((d) => (
                <CheckRow
                  key={d.domain}
                  label={d.domain}
                  checked={domains.has(d.domain)}
                  onChange={() => {
                    setDomains((s) => toggle(s, d.domain));
                    setSkills(new Set());
                  }}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Skill">
            <div className="max-h-56 space-y-1.5 overflow-y-auto pr-1">
              {visibleSkills.map((sk) => (
                <CheckRow
                  key={sk}
                  label={sk}
                  checked={skills.has(sk)}
                  onChange={() => setSkills((s) => toggle(s, sk))}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Difficulty">
            <div className="flex flex-wrap gap-1.5">
              {DIFFICULTIES.map((d) => (
                <FilterChip
                  key={d}
                  active={diffs.has(d)}
                  onClick={() => setDiffs((s) => toggle(s, d))}
                >
                  {d}
                </FilterChip>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Status">
            <div className="flex flex-wrap gap-1.5">
              {STATUS_FILTERS.map((s) => (
                <FilterChip
                  key={s.key}
                  active={statusFilter === s.key}
                  onClick={() => setStatusFilter(s.key)}
                >
                  {s.label}
                </FilterChip>
              ))}
            </div>
          </FilterGroup>

          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 text-[12.5px] text-white/45 transition-colors hover:text-white/80"
          >
            <RotateCcw size={13} />
            Clear filters
          </button>
        </div>
      </aside>

      {/* Results */}
      <div className="min-w-0 flex-1">
        <div className="mb-4 rounded-xl border border-white/[0.06] bg-[#1E1E1E] px-5 py-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <div className="text-[13px] text-white/50">{section} progress</div>
              <div className="mt-1 text-[22px] font-semibold tabular-nums text-white">
                {doneCount}
                <span className="text-[14px] font-normal text-white/40">
                  {" "}
                  / {inSection.length} done
                </span>
              </div>
            </div>
            <div className="text-[12.5px] text-white/45">
              {savedCount} saved · {filtered.length} shown
            </div>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, backgroundColor: ACCENT }}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#1A1A1A]">
          <div className="grid grid-cols-[1fr_84px_104px] items-center gap-3 border-b border-white/[0.06] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/35">
            <div>Question</div>
            <div>Level</div>
            <div className="text-right">Track</div>
          </div>

          {filtered.length === 0 && (
            <div className="px-4 py-10 text-center text-[13px] text-white/40">
              No questions match these filters.
            </div>
          )}

          {filtered.map((q) => {
            const pr = progress[q.id];
            const done = pr?.status === "done";
            return (
              <div
                key={q.id}
                className="grid grid-cols-[1fr_84px_104px] items-center gap-3 border-b border-white/[0.04] px-4 py-3 last:border-0 hover:bg-white/[0.02]"
              >
                <button
                  onClick={() =>
                    q.source === "aceboard"
                      ? setActiveQ(aceboardMap.get(q.id) ?? null)
                      : openOfficial(q.id)
                  }
                  className="group flex min-w-0 items-center gap-3 text-left"
                >
                  <span
                    className={
                      "shrink-0 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide " +
                      (q.source === "aceboard"
                        ? "bg-[#3E5FE0]/15 text-[#7d92f0]"
                        : "bg-white/[0.06] text-white/45")
                    }
                  >
                    {q.source === "aceboard" ? "Practice" : "Official"}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] text-white/85 group-hover:text-white">
                      {q.skill}
                    </span>
                    <span className="block truncate text-[12px] text-white/40">
                      {q.domain}
                      {q.source === "official" && (
                        <span className="ml-1 font-mono">· {q.id}</span>
                      )}
                    </span>
                  </span>
                  {q.source === "aceboard" ? (
                    <Play
                      size={13}
                      className="shrink-0 fill-white/30 text-white/30 group-hover:fill-white/70 group-hover:text-white/70"
                    />
                  ) : (
                    <ExternalLink
                      size={13}
                      className="shrink-0 text-white/25 group-hover:text-white/60"
                    />
                  )}
                </button>

                <div>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium ${diffStyle[q.difficulty]}`}
                  >
                    {q.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => toggleSaved(q.id)}
                    title={pr?.saved ? "Saved" : "Save"}
                    className={
                      "grid h-7 w-7 place-items-center rounded-lg transition-colors " +
                      (pr?.saved
                        ? "bg-white/[0.1] text-amber-400"
                        : "text-white/40 hover:bg-white/[0.06] hover:text-white/70")
                    }
                  >
                    <Bookmark size={14} className={pr?.saved ? "fill-amber-400" : ""} />
                  </button>
                  <button
                    onClick={() => toggleDone(q.id)}
                    title={done ? "Done" : "Mark done"}
                    className={
                      "grid h-7 w-7 place-items-center rounded-lg transition-colors " +
                      (done
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "text-white/40 hover:bg-white/[0.06] hover:text-white/70")
                    }
                  >
                    <Check size={15} strokeWidth={done ? 3 : 2} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-3 px-1 text-[12px] text-white/35">
          <span className="text-[#7d92f0]">Practice</span> questions are answered
          in-app. <span className="text-white/55">Official</span> questions open
          in the College Board bank by ID — opening one marks it practiced.
        </p>
      </div>

      {activeQ && (
        <QuestionModal
          question={activeQ}
          saved={!!progress[activeQ.id]?.saved}
          onClose={() => setActiveQ(null)}
          onAnswered={() => markDone(activeQ.id)}
          onToggleSaved={() => toggleSaved(activeQ.id)}
        />
      )}
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/35">
        {label}
      </p>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className="flex w-full items-start gap-2 text-left text-[13px] text-white/65 transition-colors hover:text-white"
    >
      <span
        style={checked ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}
        className={
          "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border " +
          (checked ? "border-transparent" : "border-white/20")
        }
      >
        {checked && <Check size={11} className="text-white" strokeWidth={3} />}
      </span>
      <span className="leading-snug">{label}</span>
    </button>
  );
}
