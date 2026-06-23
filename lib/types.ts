/**
 * Data contracts derived from the audited app content.
 * Mock fixtures in lib/data/* implement these; swap for a real API later.
 */
export type Subject = "SAT" | "ACT" | "AP";
export type Theme = "light" | "dark";

export interface UserProfile {
  id: string;
  firstName: string;
  initials: string;
  avatarUrl?: string;
  activeSubject: Subject;
  goalScore: number;
  currentScore: number;
  daysUntilTest: number;
  streakDays: number;
}

export interface DashboardStats {
  members: number;
  tutors: number;
  events: number;
  resources: number;
  questions: number;
  tests: number;
}

export type KpiTint = "indigo" | "green" | "amber" | "purple" | "red";

export interface KpiCard {
  key: "attempted" | "accuracy" | "streak" | "saved" | "errorLog";
  title: string;
  value: number | string;
  subLabel: string;
  tint: KpiTint;
  badge?: { label: string; color: "purple" | "red" };
}

export interface VideoItem {
  id: string;
  title: string;
  channel: string;
  featured?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string; // key into the icon registry
  emoji?: string;
}

export interface NavGroup {
  heading?: string;
  items: NavItem[];
}
