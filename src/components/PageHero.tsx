import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Interior page hero. The headline leads over a faint Suriname engraving.
 * Pass `aside` to fill the right side with supporting content (e.g. an
 * "at a glance" credentials list); without it, the hero stays single-column.
 */
export default function PageHero({
  eyebrow,
  headline,
  subline,
  children,
  aside,
}: {
  eyebrow?: string;
  headline: string;
  subline?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  const text = (
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
  );

  return (
    <section className="relative overflow-hidden bg-plum-900 text-sand-50">
      {/* Faint Suriname background — dimmed for text contrast */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-plum-900 via-plum-900/90 to-plum-900/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-plum-900/30 via-transparent to-plum-900/60" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(52% 100% at 85% 0%, rgba(198,161,91,0.12), transparent 58%)",
          }}
        />
      </div>

      <div className="container-x relative pb-16 pt-20 sm:pb-20 sm:pt-28">
        {aside ? (
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">{text}</div>
            <div className="lg:col-span-5">{aside}</div>
          </div>
        ) : (
          text
        )}
      </div>
      <div className="rule-gold absolute inset-x-0 bottom-0" aria-hidden />
    </section>
  );
}