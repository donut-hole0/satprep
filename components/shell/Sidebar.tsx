import { Logo } from "./Logo";
import { SubjectSwitcher } from "./SubjectSwitcher";
import { SidebarNav } from "./SidebarNav";
import { brand } from "@/lib/brand";

/**
 * Persistent left rail as a floating rounded panel (Keychron-launcher style).
 * Theme-independent dark surface.
 */
export function Sidebar({ subject }: { subject: string }) {
  return (
    <aside className="hidden w-[244px] shrink-0 flex-col rounded-2xl border border-white/[0.06] bg-[#1A1A1A] p-3 md:flex">
      <div className="px-2 pb-5 pt-3">
        <Logo />
      </div>
      <div className="mb-4">
        <SubjectSwitcher subject={subject} />
      </div>
      <SidebarNav />
      <div className="px-2 pt-3 text-[12px] text-white/30">
        {brand.name} · v1.0
      </div>
    </aside>
  );
}
