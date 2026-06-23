import { PanelLeftClose } from "lucide-react";
import { Logo } from "./Logo";
import { SubjectSwitcher } from "./SubjectSwitcher";
import { SidebarNav } from "./SidebarNav";

/**
 * Persistent left rail. Theme-independent — stays dark (canvas) in both
 * light and dark mode. Fixed ~256px width app shell.
 */
export function Sidebar({ subject }: { subject: string }) {
  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col bg-canvas md:flex">
      <div className="px-5 pb-4 pt-5">
        <Logo />
      </div>
      <div className="px-4 pb-3">
        <SubjectSwitcher subject={subject} />
      </div>
      <SidebarNav />
      <div className="border-t border-line-subtle/60 px-3 py-2">
        <button
          type="button"
          title="Collapse sidebar"
          className="flex h-9 w-9 items-center justify-center rounded text-ink-muted transition-colors duration-150 ease-standard hover:bg-white/5 hover:text-white"
        >
          <PanelLeftClose size={18} />
        </button>
      </div>
    </aside>
  );
}
