/**
 * Live exam countdown. Renders only when the user actually has a test date —
 * no dead "set date" control while there's no settings page to set it.
 */
export function TestDateCard({
  daysUntilTest,
  subject,
}: {
  daysUntilTest: number | null;
  subject: string;
}) {
  if (daysUntilTest == null) return null;

  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#1E1E1E] px-5 py-4">
      <div>
        <div className="text-[12.5px] text-white/45">Time left to {subject} exam</div>
        <div className="mt-1 text-[22px] font-semibold tabular-nums text-white">
          {daysUntilTest} <span className="text-[14px] font-normal text-white/50">days</span>
        </div>
      </div>
    </div>
  );
}
