/**
 * Single source of truth for brand identity.
 * Rename the product or recolor the accent here — nothing else hardcodes them.
 * The accent must also be mirrored in app/globals.css (--brand) since CSS
 * variables can't read TS at build time.
 */
export const brand = {
  name: "AceBoard",
  /** High-voltage accent. Keep in sync with --brand in globals.css. */
  accent: "#FFD500",
  tagline: "Smarter SAT & ACT prep",
} as const;
