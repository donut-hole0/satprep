import { Sidebar } from "@/components/shell/Sidebar";
import { Topbar } from "@/components/shell/Topbar";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getProfile } from "@/lib/data/queries";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const profile = await getProfile();
  const firstName = profile?.firstName ?? "Student";
  const initials = profile?.initials ?? "ST";
  const subject = profile?.activeSubject ?? "SAT";

  return (
    <div className="flex h-screen gap-3 overflow-hidden bg-[#111111] p-3 font-sans text-white">
      <Sidebar subject={subject} />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#1A1A1A]">
        <Topbar firstName={firstName} initials={initials} />
        <div className="flex-1 overflow-y-auto px-7 py-7">{children}</div>
      </main>
    </div>
  );
}
