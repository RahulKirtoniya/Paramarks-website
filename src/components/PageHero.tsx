import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  headline,
  subline,
  children,
}: {
  eyebrow?: string;
  headline: string;
  subline?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-plum-900 text-sand-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 100% at 80% 0%, rgba(198,161,91,0.14), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-gold-500/15 md:block"
      />
      <div className="container-x relative pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="eyebrow text-gold-400">
              <span className="h-px w-6 bg-gold-500/70" aria-hidden />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-5 text-display text-sand-50 animate-rise">{headline}</h1>
          {subline && (
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-sand-200/85">
              {subline}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
      <div className="hairline absolute inset-x-0 bottom-0" aria-hidden />
    </section>
  );
}
