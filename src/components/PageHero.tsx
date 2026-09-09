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
          background: "radial-gradient(52% 100% at 85% 0%, rgba(198,161,91,0.10), transparent 58%)",
        }}
      />
      <div className="container-x relative pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div className="max-w-3xl">
          {eyebrow && <p className="label label-light">{eyebrow}</p>}
          <h1 className="mt-6 text-display text-sand-50 animate-rise">{headline}</h1>
          {subline && (
            <p className="mt-7 max-w-prose text-[1.1rem] leading-relaxed text-sand-200/85">
              {subline}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
      <div className="rule-gold absolute inset-x-0 bottom-0" aria-hidden />
    </section>
  );
}
