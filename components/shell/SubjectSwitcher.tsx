"use client";

import { GraduationCap, ChevronDown } from "lucide-react";

/** Subject context card at the top of the rail (device-selector analog). */
export function SubjectSwitcher({ subject }: { subject: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2.5 text-left transition-colors duration-150 ease-standard hover:border-white/15"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.06]">
        <GraduationCap size={18} className="text-white/80" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-medium leading-tight text-white">
          {subject}
        </span>
        <span className="flex items-center gap-1.5 text-[12px] text-[#3ECF8E]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3ECF8E]" />
          Active
        </span>
      </span>
      <ChevronDown size={16} className="shrink-0 text-white/40" />
    </button>
  );
}
