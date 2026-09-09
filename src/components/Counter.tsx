"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a stat up from zero the first time it scrolls into view.
 * Preserves the original formatting — the "+", thousands separators ("," or
 * "."), and leaves non-numeric values (e.g. "24/7") static. Honors
 * prefers-reduced-motion by showing the final value immediately.
 */

type Parsed = { prefix: string; target: number; suffix: string; sep: string };

function parse(value: string): Parsed | null {
  if (value.includes("/")) return null; // e.g. "24/7" — not a count
  const m = value.match(/^(\D*)([\d.,\s]+)(.*)$/);
  if (!m) return null;
  const [, prefix, num, suffix] = m;
  const target = parseInt(num.replace(/[.,\s]/g, ""), 10);
  if (!Number.isFinite(target)) return null;
  const sep = num.includes(",") ? "," : num.includes(".") ? "." : "";
  return { prefix, target, suffix, sep };
}

function group(n: number, sep: string): string {
  const s = String(n);
  return sep ? s.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : s;
}

export default function Counter({
  value,
  className = "",
  duration = 1500,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  // SSR / no-JS renders the correct final value.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const parsed = parse(value);
    const el = ref.current;
    if (!parsed || !el) return;

    const finalStr = `${parsed.prefix}${group(parsed.target, parsed.sep)}${parsed.suffix}`;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(finalStr);
      return;
    }

    // Reset to zero, then count up once the element is on screen.
    setDisplay(`${parsed.prefix}${group(0, parsed.sep)}${parsed.suffix}`);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
              const current = Math.round(parsed.target * eased);
              setDisplay(`${parsed.prefix}${group(current, parsed.sep)}${parsed.suffix}`);
              if (t < 1) requestAnimationFrame(tick);
              else setDisplay(finalStr);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
