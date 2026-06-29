"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups } from "@/lib/data/nav";
import { iconRegistry } from "./icons";

/** Keychron-style nav: blue filled pill for the active route, muted otherwise. */
export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="nav-scroll flex-1 overflow-y-auto">
      {navGroups.map((group, gi) => (
        <div key={group.heading ?? `g-${gi}`} className="mb-1">
          {group.heading && (
            <p className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
              {group.heading}
            </p>
          )}
          <ul className="flex flex-col gap-1">
            {group.items.map((item) => {
              const Icon = iconRegistry[item.icon];
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={active ? { backgroundColor: "#3E5FE0" } : undefined}
                    className={
                      active
                        ? "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[14px] font-medium text-white"
                        : "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[14px] text-white/55 transition-colors duration-150 ease-standard hover:bg-white/[0.06] hover:text-white"
                    }
                  >
                    {Icon && (
                      <Icon
                        size={18}
                        strokeWidth={active ? 2.1 : 1.8}
                        className="shrink-0"
                      />
                    )}
                    <span className="truncate">
                      {item.label}
                      {item.emoji && <span className="ml-1">{item.emoji}</span>}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
