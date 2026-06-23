import { Construction } from "lucide-react";

/**
 * Placeholder for every nav route not yet built in slice 1.
 * Keeps the full sidebar clickable without 404s.
 */
export default function ComingSoon() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 py-32 text-center">
      <span
        className="grid h-14 w-14 place-items-center rounded-full"
        style={{ backgroundColor: "var(--brand)" }}
      >
        <Construction size={26} className="text-panel" />
      </span>
      <h1 className="text-xl font-bold text-ink-faint dark:text-ink-primary">
        Coming soon
      </h1>
      <p className="text-[14px] text-ink-muted">
        This section isn&apos;t built yet. The Home dashboard and full app shell
        are live — the remaining routes land in the next slice.
      </p>
    </div>
  );
}
