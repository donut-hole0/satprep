import type { NavGroup } from "@/lib/types";

/**
 * Left-rail nav. Trimmed to routes that actually exist and work — the rest of
 * the app's surfaces return as they're built, rather than linking to "coming
 * soon" placeholders.
 */
export const navGroups: NavGroup[] = [
  {
    items: [
      { label: "Home", href: "/", icon: "home" },
      { label: "Practice", href: "/question-bank", icon: "stack" },
    ],
  },
];
