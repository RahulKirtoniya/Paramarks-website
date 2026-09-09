import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div
      className={[
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
      ].join(" ")}
    >
      {eyebrow && (
        <p className={light ? "eyebrow text-gold-400" : "eyebrow"}>
          <span className="h-px w-6 bg-gold-500/70" aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2
        className={[
          "mt-4 text-headline",
          light ? "text-sand-50" : "text-plum-700",
        ].join(" ")}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={[
            "mt-4 max-w-prose text-base leading-relaxed sm:text-lg",
            light ? "text-sand-200/80" : "text-ink-500",
            align === "center" ? "mx-auto" : "",
          ].join(" ")}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/** The recurring tagline signature. `variant` tunes it to its surroundings. */
export function Tagline({
  text,
  variant = "default",
  className = "",
}: {
  text: string;
  variant?: "default" | "light" | "quiet";
  className?: string;
}) {
  const color =
    variant === "light"
      ? "text-gold-300"
      : variant === "quiet"
        ? "text-ink-400"
        : "text-gold-600";
  return (
    <p
      className={[
        "font-serif italic tracking-tight",
        color,
        className,
      ].join(" ")}
    >
      {text}
    </p>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={["py-section", className].join(" ")}>
      <div className="container-x">{children}</div>
    </section>
  );
}
