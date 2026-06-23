export function LegalFooter() {
  return (
    <footer className="mx-auto max-w-3xl space-y-1 pt-4 text-center text-[11px] leading-relaxed text-ink-faint/80">
      <p>
        SAT® and AP® are trademarks registered by the College Board, which is
        not affiliated with, and does not endorse, this product.
      </p>
      <p>
        ACT® is a registered trademark of ACT, Inc., which is not affiliated
        with, and does not endorse, this product.
      </p>
      <p>
        AI features are powered by large language models.{" "}
        <a href="/ai-transparency" className="underline hover:text-ink-muted">
          AI Transparency Policy
        </a>
        .
      </p>
    </footer>
  );
}
