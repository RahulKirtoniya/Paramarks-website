import type { ReactNode } from "react";

export function SectionHeading({
  label,
  title,
  intro,
  align = "left",
  light = false,
}: {
  label?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {label && (
        <p className={["label", light ? "label-light" : ""].join(" ")}>{label}</p>
      )}
      <h2 className={["mt-5 text-headline", light ? "text-sand-50" : "text-plum-700"].join(" ")}>
        {title}
      </h2>
      {intro && (
        <p
          className={[
            "mt-5 max-w-prose text-[1.05rem] leading-relaxed",
            light ? "text-sand-200/85" : "text-ink-500",
            align === "center" ? "mx-auto" : "",
          ].join(" ")}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/** The recurring tagline signature, set in the Didone italic. */
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
    variant === "light" ? "text-gold-300" : variant === "quiet" ? "text-ink-400" : "text-gold-700";
  return (
    <p className={["font-serif italic tracking-tight", color, className].join(" ")}>{text}</p>
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