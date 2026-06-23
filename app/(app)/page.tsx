import { GreetingBar } from "@/components/home/GreetingBar";
import { StatsStrip } from "@/components/home/StatsStrip";
import { KpiCards } from "@/components/home/KpiCards";
import { ScorePromo } from "@/components/home/ScorePromo";
import { SummerCard } from "@/components/home/SummerCard";
import { VideoList } from "@/components/home/VideoList";
import { LegalFooter } from "@/components/home/LegalFooter";
import { getProfile, getDerivedStats } from "@/lib/data/queries";

export default async function HomePage() {
  const [profile, stats] = await Promise.all([
    getProfile(),
    getDerivedStats(),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-2">
      {profile && <GreetingBar profile={profile} />}
      <StatsStrip />
      <KpiCards stats={stats} />
      <ScorePromo />
      <SummerCard />
      <VideoList />
      <LegalFooter />
    </div>
  );
}
