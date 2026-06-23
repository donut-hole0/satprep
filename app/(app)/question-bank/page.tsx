import Link from "next/link";
import { ChevronRight, Sigma, BookText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getTopicGroups } from "@/lib/data/queries";

const domainIcon: Record<string, typeof Sigma> = {
  Math: Sigma,
  "Reading and Writing": BookText,
};

export default async function QuestionBankPage() {
  const groups = await getTopicGroups();

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-2">
      <header>
        <h1 className="text-2xl font-bold text-ink-faint dark:text-ink-primary">
          Question Bank
        </h1>
        <p className="mt-1 text-[14px] text-ink-muted">
          Pick a topic and start practicing. Every answer updates your
          dashboard.
        </p>
      </header>

      {groups.length === 0 && (
        <Card className="p-6 text-[14px] text-ink-muted">
          No questions found. Make sure you ran{" "}
          <code className="text-accent-amber">supabase/schema.sql</code> (it
          seeds the question set).
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {groups.map((group) => {
          const Icon = domainIcon[group.domain] ?? Sigma;
          return (
            <Card key={group.domain} className="p-5">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="grid h-10 w-10 place-items-center rounded-full"
                  style={{ backgroundColor: "var(--brand)" }}
                >
                  <Icon size={18} className="text-panel" />
                </span>
                <div>
                  <h2 className="text-[16px] font-bold text-ink-faint dark:text-ink-primary">
                    {group.domain}
                  </h2>
                  <p className="text-[12px] text-ink-muted">
                    {group.total} questions
                  </p>
                </div>
              </div>

              <ul className="divide-y divide-line-light dark:divide-line-subtle/50">
                {group.topics.map((t) => (
                  <li key={t.topic}>
                    <Link
                      href={`/question-bank/practice?domain=${encodeURIComponent(group.domain)}&topic=${encodeURIComponent(t.topic)}`}
                      className="flex items-center justify-between py-3 transition-colors duration-150 ease-standard hover:text-accent-blue"
                    >
                      <span className="text-[14px] text-ink-faint dark:text-ink-body">
                        {t.topic}
                      </span>
                      <span className="flex items-center gap-2 text-[13px] text-ink-muted">
                        {t.count}
                        <ChevronRight size={16} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
