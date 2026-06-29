import { brand } from "@/lib/brand";

/** Clean text wordmark (Keychron-launcher style — no icon tile). */
export function Logo({ collapsed = false }: { collapsed?: boolean }) {
  if (collapsed) {
    return (
      <span className="text-[20px] font-semibold tracking-tight text-white">
        {brand.name.charAt(0)}
      </span>
    );
  }
  return (
    <span className="text-[22px] font-semibold tracking-tight text-white">
      {brand.name}
    </span>
  );
}
