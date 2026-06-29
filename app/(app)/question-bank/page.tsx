import { BankExplorer } from "@/components/bank/BankExplorer";
import { OFFICIAL_QUESTIONS } from "@/lib/data/satBank";
import { ACEBOARD_QUESTIONS } from "@/lib/data/aceboardQuestions";
import { getBankProgress } from "@/lib/data/bank";

export default async function QuestionBankPage() {
  const progress = await getBankProgress();

  return (
    <div className="mx-auto max-w-[1000px]">
      <header className="mb-6">
        <h2 className="text-[22px] font-semibold tracking-tight text-white">
          Question Bank
        </h2>
        <p className="mt-1.5 text-[14px] text-white/55">
          Practice AceBoard questions in-app, or jump to official College Board
          questions — all organized by the official SAT domains, skills, and
          difficulty. Track what you&apos;ve finished.
        </p>
      </header>

      <BankExplorer
        official={OFFICIAL_QUESTIONS}
        aceboard={ACEBOARD_QUESTIONS}
        initialProgress={progress}
      />
    </div>
  );
}
