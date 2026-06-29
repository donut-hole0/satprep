"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";
import { logout } from "@/app/(auth)/actions";

/** Maps the current route to a page title shown in the panel header. */
function titleFor(pathname: string): string {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/question-bank")) return "Practice";
  return "AceBoard";
}

export function Topbar({
  firstName,
  initials,
}: {
  firstName: string;
  initials: string;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between border-b border-white/[0.06] px-7 py-4">
      <h1 className="text-[20px] font-semibold tracking-tight text-white">
        {titleFor(pathname)}
      </h1>

      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-white/[0.08] py-1 pl-1 pr-2.5 transition-colors duration-150 ease-standard hover:bg-white/[0.14]"
      >
        <span
          className="grid h-7 w-7 place-items-center rounded-full text-[12px] font-semibold text-white"
          style={{ backgroundColor: "#3E5FE0" }}
        >
          {initials}
        </span>
        <span className="hidden text-[13px] text-white/80 sm:inline">
          {firstName}
        </span>
        <ChevronDown size={15} className="text-white/50" />
      </button>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-7 top-14 z-20 w-44 overflow-hidden rounded-xl border border-white/[0.08] bg-[#222222] py-1 shadow-lg">
            <form action={logout}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-[14px] text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
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
