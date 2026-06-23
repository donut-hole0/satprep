import type { DashboardStats, VideoItem } from "@/lib/types";

// NOTE: The community strip is platform-wide aggregate data. It stays static
// for now — we'll back it with a real seed dataset in a later pass.
export const communityStats: DashboardStats = {
  members: 7885,
  tutors: 80,
  events: 73,
  resources: 113,
  questions: 15686,
  tests: 132,
};

export const videos: VideoItem[] = [
  {
    id: "v_1",
    title: "The 5 Hardest SAT Math Traps (and how to dodge them)",
    channel: "AceBoard Tutors",
    featured: true,
  },
  {
    id: "v_2",
    title: "Reading & Writing: command-of-evidence in 90 seconds",
    channel: "AceBoard Tutors",
  },
  {
    id: "v_3",
    title: "How to pace Module 2 when it adapts harder",
    channel: "AceBoard Tutors",
  },
];
