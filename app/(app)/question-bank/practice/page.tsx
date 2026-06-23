import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PracticeSession } from "@/components/practice/PracticeSession";
import { Card } from "@/components/ui/Card";
import { getQuestionsByTopic } from "@/lib/data/queries";

export default async function PracticePage({
  searchParams,
}: {
  searchParams: { domain?: string; topic?: string };
}) {
  const domain = searchParams.domain ?? "";
  const topic = searchParams.topic ?? "";
  const questions = await getQuestionsByTopic(domain, topic);

  return (
    <div className="mx-auto max-w-2xl space-y-5 py-2">
      <Link
        href="/question-bank"
        className="inline-flex items-center gap-1.5 text-[14px] text-ink-muted transition-colors hover:text-accent-blue"
      >
        <ArrowLeft size={16} />
        Question Bank
      </Link>

      <header>
        <p className="text-[12px] font-semibold uppercase tracking-wider text-brand-deep dark:text-accent-blue-light">
          {domain}
        </p>
        <h1 className="text-2xl font-bold text-ink-faint dark:text-ink-primary">
          {topic}
        </h1>
      </header>

      {questions.length === 0 ? (
        <Card className="p-6 text-[14px] text-ink-muted">
          No questions for this topic.
        </Card>
      ) : (
        <PracticeSession questions={questions} />
      )}
    </div>
  );
}
