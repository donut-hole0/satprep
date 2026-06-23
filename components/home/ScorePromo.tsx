import { Sparkles, Upload } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function ScorePromo() {
  return (
    <Card className="flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
          style={{ backgroundColor: "var(--brand)" }}
        >
          <Sparkles size={18} className="text-panel" />
        </span>
        <div>
          <p className="text-[15px] font-bold text-ink-faint dark:text-ink-primary">
            Got Your Test Score?
          </p>
          <p className="text-[13px] text-ink-muted">
            Upload your report and we&apos;ll build a plan around your weak spots.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="flex items-center gap-2 whitespace-nowrap rounded-cta px-5 py-2 text-[14px] font-medium text-panel transition-[filter] duration-150 ease-standard hover:brightness-90"
        style={{ backgroundColor: "var(--brand)" }}
      >
        <Upload size={16} />
        Upload score report
      </button>
    </Card>
  );
}
