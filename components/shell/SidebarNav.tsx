"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups } from "@/lib/data/nav";
import { iconRegistry } from "./icons";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="nav-scroll flex-1 overflow-y-auto px-3 pb-4">
      {navGroups.map((group, gi) => (
        <div key={group.heading ?? `g-${gi}`} className="mb-1.5">
          {group.heading && (
            <p className="px-3 pb-1 pt-4 text-[12px] font-semibold uppercase tracking-wider text-slate-400">
              {group.heading}
            </p>
          )}
          <ul className="space-y-0.5">
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
                    className={
                      active
                        ? "rounded-nav -ml-3 flex h-12 items-center gap-3 bg-brand pl-6 pr-4 text-[15px] font-medium text-panel"
                        : "flex h-12 items-center gap-3 rounded px-3 text-[15px] text-ink-body/90 transition-colors duration-150 ease-standard hover:bg-white/5 hover:text-white"
                    }
                  >
                    {Icon && (
                      <Icon
                        size={20}
                        strokeWidth={active ? 2.25 : 1.75}
                        className="shrink-0"
                      />
                    )}
                    <span className="truncate">
                      {item.label}
                      {item.emoji && (
                        <span className="ml-1">{item.emoji}</span>
                      )}
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
