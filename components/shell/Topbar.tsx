"use client";

import { useState } from "react";
import {
  Flame,
  MessageCircle,
  ShoppingCart,
  Bell,
  Info,
  Moon,
  Sun,
  LifeBuoy,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useTheme } from "@/lib/theme";
import { logout } from "@/app/(auth)/actions";

function IconBtn({
  label,
  children,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded text-ink-muted transition-colors duration-150 ease-standard hover:bg-black/5 hover:text-ink-secondary dark:hover:bg-white/5"
    >
      {children}
    </button>
  );
}

export function Topbar({
  firstName,
  initials,
  streak,
}: {
  firstName: string;
  initials: string;
  streak: number;
}) {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative flex h-16 items-center justify-end gap-1 bg-transparent px-4 md:px-6">
      <span className="mr-1 flex items-center gap-1.5 rounded-full bg-panel px-3 py-1.5 text-[13px] font-medium text-ink-body">
        <Flame size={15} className="text-accent-amber" />
        {streak}
      </span>
      <IconBtn label="Messages">
        <MessageCircle size={19} />
      </IconBtn>
      <IconBtn label="Shop">
        <ShoppingCart size={19} />
      </IconBtn>
      <IconBtn label="Notifications">
        <Bell size={19} />
      </IconBtn>
      <IconBtn label="Info">
        <Info size={19} />
      </IconBtn>
      <IconBtn label="Toggle theme" onClick={toggle}>
        {theme === "dark" ? <Moon size={19} /> : <Sun size={19} />}
      </IconBtn>
      <IconBtn label="Support">
        <LifeBuoy size={19} />
      </IconBtn>

      <span className="mx-1 h-6 w-px bg-line-subtle/50" />

      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors duration-150 ease-standard hover:bg-black/5 dark:hover:bg-white/5"
      >
        <span
          className="grid h-8 w-8 place-items-center rounded-full text-[12px] font-semibold text-panel"
          style={{ backgroundColor: "var(--brand)" }}
        >
          {initials}
        </span>
        <span className="hidden text-[14px] font-medium text-ink-secondary sm:inline">
          {firstName}
        </span>
        <ChevronDown size={15} className="text-ink-muted" />
      </button>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-4 top-14 z-20 w-44 overflow-hidden rounded-card border border-line-light bg-white py-1 shadow-card-light dark:border-line-subtle/50 dark:bg-panel md:right-6">
            <form action={logout}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-[14px] text-ink-faint transition-colors hover:bg-black/5 dark:text-ink-body dark:hover:bg-white/5"
              >
                <LogOut size={15} />
                Log out
              </button>
            </form>
          </div>
        </>
      )}
    </header>
  );
}
