import { Sidebar } from "@/components/shell/Sidebar";
import { Topbar } from "@/components/shell/Topbar";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getProfile, getDerivedStats } from "@/lib/data/queries";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const [profile, stats] = await Promise.all([
    getProfile(),
    getDerivedStats(),
  ]);

  const firstName = profile?.firstName ?? "Student";
  const initials = profile?.initials ?? "ST";
  const subject = profile?.activeSubject ?? "SAT";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-canvas">
      <Sidebar subject={subject} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar firstName={firstName} initials={initials} streak={stats.streak} />
        <main className="flex-1 overflow-y-auto px-4 pb-10 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
