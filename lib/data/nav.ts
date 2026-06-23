import type { NavGroup } from "@/lib/types";

/**
 * The full left-rail nav, grouped exactly as audited. `icon` keys map to
 * components/shell/icons.tsx. Routes are placeholders for slice 1 — only
 * Home (/) is implemented; the rest are scaffolded hrefs.
 */
export const navGroups: NavGroup[] = [
  {
    items: [
      { label: "Home", href: "/", icon: "home" },
      { label: "Start Here", href: "/start", icon: "compass", emoji: "👈👉" },
    ],
  },
  {
    heading: "Practice",
    items: [
      { label: "Tests", href: "/tests", icon: "clipboard" },
      { label: "Study Plans", href: "/study-plan", icon: "kanban" },
      { label: "Questions", href: "/question-bank", icon: "stack" },
      { label: "Challenge Questions", href: "/challenge-questions", icon: "bolt" },
    ],
  },
  {
    heading: "Progress",
    items: [
      { label: "Mistakes Review", href: "/my-mistakes", icon: "alert" },
      { label: "Saved Questions", href: "/saved-questions", icon: "bookmark" },
      { label: "Performance", href: "/dashboard", icon: "chart" },
      { label: "Score Calculator", href: "/score-calculator", icon: "calculator" },
    ],
  },
  {
    heading: "Learn",
    items: [
      { label: "Classes", href: "/classes", icon: "presentation" },
      { label: "Tutorials", href: "/tutorial-bank", icon: "play" },
      { label: "Events", href: "/calendar", icon: "calendar" },
      { label: "Flashcards", href: "/vocabulary", icon: "cards" },
      { label: "Courses", href: "/courses", icon: "book" },
      { label: "Study Guides", href: "/resources", icon: "doc" },
      { label: "Vocab", href: "/vocabulary/list", icon: "type" },
    ],
  },
  {
    heading: "College Admissions",
    items: [
      { label: "Universities", href: "/colleges", icon: "building" },
      { label: "Applicants", href: "/applicant-profiles", icon: "users" },
      { label: "Scholarships", href: "/scholarships", icon: "award" },
      { label: "Internships", href: "/internships", icon: "briefcase" },
      { label: "Essay Ideas", href: "/essay-ideas", icon: "lightbulb" },
      { label: "Essay Analysis", href: "/essay-editor", icon: "pencil" },
      { label: "Recommendations", href: "/recommendation-letter", icon: "mail" },
    ],
  },
  {
    heading: "Community",
    items: [
      { label: "Students", href: "/community/students", icon: "users" },
      { label: "Tutors", href: "/community/tutors", icon: "grad" },
      { label: "Feed", href: "/community/feed", icon: "feed" },
      { label: "Spaces", href: "/spaces", icon: "spaces" },
      { label: "Chat", href: "/messages", icon: "chat" },
    ],
  },
];
