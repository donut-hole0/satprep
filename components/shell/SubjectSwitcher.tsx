"use client";

import { ChevronDown } from "lucide-react";

/** Deep-teal context selector pill at the top of the rail. */
export function SubjectSwitcher({ subject }: { subject: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-[10px] bg-brand-deep px-3 py-2.5 text-left transition-colors duration-150 ease-standard hover:brightness-110"
    >
      <span className="flex items-center gap-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-blue" />
        <span className="text-[15px] font-semibold text-white">{subject}</span>
      </span>
      <ChevronDown size={18} className="text-white/80" />
    </button>
  );
}
