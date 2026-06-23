import { type ReactNode } from "react";

/**
 * Surface card with theme-conditional elevation:
 * dark mode → near-shadowless, separation from tint/bg.
 * light mode → real shadow-lg + hairline border.
 */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card border border-line-light bg-white shadow-card-light dark:border-transparent dark:bg-panel dark:shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
