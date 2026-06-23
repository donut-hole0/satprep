import { Database } from "lucide-react";
import { Logo } from "@/components/shell/Logo";

/** Shown when Supabase env vars are missing — guides first-time setup. */
export function SetupNotice() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-card border border-line-subtle/50 bg-panel p-6">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="grid h-10 w-10 place-items-center rounded-full"
              style={{ backgroundColor: "var(--brand)" }}
            >
              <Database size={18} className="text-panel" />
            </span>
            <h1 className="text-lg font-bold text-ink-primary">
              Connect your Supabase project
            </h1>
          </div>
          <p className="mb-4 text-[14px] text-ink-secondary">
            AceBoard needs a database to track your real practice activity.
            One-time setup, about 5 minutes:
          </p>
          <ol className="space-y-2.5 text-[14px] text-ink-body">
            <li>
              <span className="font-semibold text-ink-primary">1.</span> Create
              a free project at{" "}
              <span className="text-accent-blue-light">supabase.com</span>.
            </li>
            <li>
              <span className="font-semibold text-ink-primary">2.</span> In the
              SQL Editor, paste and run the contents of{" "}
              <code className="rounded bg-canvas px-1.5 py-0.5 text-[13px] text-accent-amber">
                supabase/schema.sql
              </code>
              .
            </li>
            <li>
              <span className="font-semibold text-ink-primary">3.</span> Create{" "}
              <code className="rounded bg-canvas px-1.5 py-0.5 text-[13px] text-accent-amber">
                .env.local
              </code>{" "}
              in the project root (copy{" "}
              <code className="rounded bg-canvas px-1.5 py-0.5 text-[13px] text-accent-amber">
                .env.local.example
              </code>
              ) and paste your Project URL and anon key from{" "}
              <span className="text-ink-secondary">
                Settings → API
              </span>
              .
            </li>
            <li>
              <span className="font-semibold text-ink-primary">4.</span> Restart
              the dev server.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
