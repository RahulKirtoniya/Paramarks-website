"use client";

import { useId, useState } from "react";

/**
 * The interactive registered seal — the site's signature moment.
 * A visitor types their own brand; it is engraved into the seal's core and
 * "stamped", making the promise ("your brand in qualified hands") tangible.
 *
 * Self-contained: renders the guilloché seal + the input together. All motion
 * is CSS and disabled under prefers-reduced-motion.
 */

const GOLD = "#C6A15B";
const GOLD_SOFT = "#D6B778";
const C = 220;

function rosette(rx: number, ry: number, count: number) {
  return Array.from({ length: count }, (_, i) => (
    <ellipse
      key={`${rx}-${i}`}
      cx={C}
      cy={C}
      rx={rx}
      ry={ry}
      transform={`rotate(${(360 / count) * i} ${C} ${C})`}
      fill="none"
      stroke={GOLD}
      strokeWidth={0.6}
      opacity={0.5}
    />
  ));
}

function ticks(r: number, count: number, len: number) {
  return Array.from({ length: count }, (_, i) => {
    const a = (Math.PI * 2 * i) / count;
    return (
      <line
        key={i}
        x1={C + Math.cos(a) * r}
        y1={C + Math.sin(a) * r}
        x2={C + Math.cos(a) * (r - len)}
        y2={C + Math.sin(a) * (r - len)}
        stroke={GOLD}
        strokeWidth={0.8}
        opacity={0.55}
      />
    );
  });
}

function fitSize(len: number) {
  if (len <= 3) return 46;
  if (len <= 5) return 36;
  if (len <= 8) return 26;
  if (len <= 12) return 19;
  return 15;
}

export default function HeroRegister({
  legend = "PARAMARKS PC \u00B7 TRADEMARK \u0026 IP \u00B7 SURINAME \u00B7 EST. 1997 \u00B7 ",
  inputLabel,
  placeholder,
  action,
  confirm, // template with {brand}
}: {
  legend?: string;
  inputLabel: string;
  placeholder: string;
  action: string;
  confirm: string;
}) {
  const [value, setValue] = useState("");
  const [stamped, setStamped] = useState(false);
  const inputId = useId();
  const mark = value.trim().toUpperCase();
  const hasMark = mark.length > 0;

  function stamp() {
    if (!hasMark) return;
    setStamped(false);
    // restart the animation on repeat presses
    requestAnimationFrame(() => setStamped(true));
  }

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <style>{`
        .hr-seal.stamped .hr-core { animation: hr-press 0.5s cubic-bezier(0.16,1,0.3,1); transform-origin: center; }
        .hr-seal.stamped .hr-pulse { animation: hr-pulse 0.9s ease-out forwards; }
        .hr-mark { transition: opacity .35s ease; }
        @keyframes hr-press { 0%{transform:scale(1)} 30%{transform:scale(0.955)} 100%{transform:scale(1)} }
        @keyframes hr-pulse { 0%{opacity:.55; r:86px} 100%{opacity:0; r:150px} }
        @media (prefers-reduced-motion: reduce){
          .hr-seal.stamped .hr-core, .hr-seal.stamped .hr-pulse { animation: none; }
        }
      `}</style>

      <svg
        viewBox="0 0 440 440"
        className={`hr-seal h-auto w-full${stamped ? " stamped" : ""}`}
        role="img"
        aria-label="Paramarks registered seal"
        fill="none"
      >
        <defs>
          <path
            id="hr-legend"
            d="M 220,220 m -170,0 a 170,170 0 1,1 340,0 a 170,170 0 1,1 -340,0"
          />
          <radialGradient id="hr-core-fill" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="#2A1846" />
            <stop offset="100%" stopColor="#150B26" />
          </radialGradient>
        </defs>

        {/* Rotating legend ring */}
        <g className="seal-ring-spin">
          <circle cx={C} cy={C} r={196} stroke={GOLD} strokeWidth={0.8} opacity={0.5} />
          <circle cx={C} cy={C} r={186} stroke={GOLD} strokeWidth={0.8} opacity={0.5} />
          {ticks(196, 120, 4)}
          <text
            className="seal-fade"
            fill={GOLD_SOFT}
            style={{ fontFamily: "Manrope, sans-serif", fontSize: "12.5px", fontWeight: 600, letterSpacing: "0.28em" }}
          >
            <textPath href="#hr-legend" startOffset="0%">
              {legend.repeat(2)}
            </textPath>
          </text>
        </g>

        {/* Drawn frames */}
        <circle className="seal-draw" style={{ "--len": "1080" } as React.CSSProperties} cx={C} cy={C} r={172} stroke={GOLD} strokeWidth={1} />
        <circle className="seal-draw" style={{ "--len": "980" } as React.CSSProperties} cx={C} cy={C} r={156} stroke={GOLD} strokeWidth={0.6} opacity={0.6} />

        {/* Guilloché rosette */}
        <g className="seal-fade-2">
          {rosette(118, 44, 30)}
          {rosette(78, 26, 24)}
        </g>

        {/* Stamp pulse */}
        <circle className="hr-pulse" cx={C} cy={C} r={86} fill="none" stroke={GOLD} strokeWidth={1} opacity={0} />

        {/* Core */}
        <g className="hr-core">
          <circle className="seal-draw" style={{ "--len": "540" } as React.CSSProperties} cx={C} cy={C} r={86} stroke={GOLD} strokeWidth={1} />
          <circle cx={C} cy={C} r={70} fill="url(#hr-core-fill)" className="seal-fade" />
          <circle cx={C} cy={C} r={70} stroke={GOLD} strokeWidth={0.6} opacity={0.5} className="seal-fade" />

          {/* Center: monogram when empty, the visitor's mark when typed */}
          {!hasMark ? (
            <g className="hr-mark seal-fade-2">
              <text x={C} y={C + 2} textAnchor="middle" dominantBaseline="central" fill={GOLD_SOFT} style={{ fontFamily: '"Spectral", Georgia, serif', fontSize: "76px", fontWeight: 600 }}>
                P
              </text>
              <text x={C + 34} y={C - 22} textAnchor="middle" dominantBaseline="central" fill={GOLD} style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 600 }}>
                &#174;
              </text>
            </g>
          ) : (
            <g className="hr-mark">
              <text
                x={C}
                y={C}
                textAnchor="middle"
                dominantBaseline="central"
                fill={GOLD_SOFT}
                textLength={mark.length > 8 ? 120 : undefined}
                lengthAdjust="spacingAndGlyphs"
                style={{
                  fontFamily: '"Spectral", Georgia, serif',
                  fontSize: `${fitSize(mark.length)}px`,
                  fontWeight: 600,
                  letterSpacing: mark.length <= 8 ? "0.02em" : "0",
                }}
              >
                {mark}
              </text>
              <text x={C} y={C + 32} textAnchor="middle" dominantBaseline="central" fill={GOLD} style={{ fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.32em" }}>
                &#174; REGISTERED
              </text>
            </g>
          )}
        </g>
      </svg>

      {/* Input — engrave your brand */}
      <div className="mt-8">
        <label htmlFor={inputId} className="block text-center text-[0.8rem] font-medium text-sand-200/70">
          {inputLabel}
        </label>
        <div className="mx-auto mt-3 flex max-w-[340px] items-center gap-3 border-b border-sand-50/25 pb-2 focus-within:border-gold-400">
          <input
            id={inputId}
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, 22))}
            onKeyDown={(e) => {
              if (e.key === "Enter") stamp();
            }}
            onBlur={stamp}
            placeholder={placeholder}
            autoComplete="off"
            className="w-full bg-transparent text-center font-serif text-lg text-sand-50 placeholder:font-sans placeholder:text-sm placeholder:tracking-wide placeholder:text-sand-200/40 focus:outline-none"
          />
        </div>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={stamp}
            disabled={!hasMark}
            className="text-sm font-semibold text-gold-300 underline decoration-gold-500/50 underline-offset-[6px] transition-colors hover:text-gold-200 disabled:opacity-40 disabled:no-underline"
          >
            {action}
          </button>
        </div>

        {/* Confirmation, announced politely */}
        <p aria-live="polite" className="mt-4 min-h-[1.5rem] text-center font-serif text-[0.98rem] italic text-gold-300">
          {stamped && hasMark ? confirm.replace("{brand}", value.trim()) : ""}
        </p>
      </div>
    </div>
  );
}