import { GreetingBar } from "@/components/home/GreetingBar";
import { KpiCards } from "@/components/home/KpiCards";
import { TopicsList } from "@/components/home/TopicsList";
import { TestDateCard } from "@/components/home/TestDateCard";
import {
  getProfile,
  getDerivedStats,
  getTopicGroups,
} from "@/lib/data/queries";

export default async function HomePage() {
  const [profile, stats, groups] = await Promise.all([
    getProfile(),
    getDerivedStats(),
    getTopicGroups(),
  ]);

  const totalQuestions = groups.reduce((sum, g) => sum + g.total, 0);

  return (
    <div className="mx-auto max-w-[860px] space-y-7">
      <GreetingBar
        firstName={profile?.firstName ?? "there"}
        streak={stats.streak}
        totalQuestions={totalQuestions}
      />
      <KpiCards stats={stats} />
      <TopicsList groups={groups} />
      <TestDateCard
        daysUntilTest={profile?.daysUntilTest ?? null}
        subject={profile?.activeSubject ?? "SAT"}
      />
    </div>
  );
}
