import { brand } from "@/lib/brand";

/**
 * AceBoard wordmark + geometric mark. Swappable identity:
 * the mark is a rounded square holding an upward "ace" chevron in the
 * brand accent — deliberately not a bee.
 */
export function Logo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px]"
        style={{ backgroundColor: "var(--brand)" }}
        aria-hidden
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 2.5 14.5 13H10.8L9 9 7.2 13H3.5L9 2.5Z"
            fill="#111827"
          />
        </svg>
      </span>
      {!collapsed && (
        <span className="text-[20px] font-bold tracking-tight text-white">
          {brand.name}
        </span>
      )}
    </div>
  );
}
