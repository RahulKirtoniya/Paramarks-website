/**
 * The registered seal — the site's signature motif. A guilloché rosette
 * (the engraved line-work of certificates and banknotes: the visual language
 * of authenticity and registration), rendered in fine gold on deep plum.
 * Draws itself in once on load; the legend ring turns very slowly.
 *
 * Pure SVG, no client JS — safe in a server component. Motion is CSS-only and
 * fully disabled under prefers-reduced-motion.
 */

const GOLD = "#C6A15B";
const GOLD_SOFT = "#D6B778";

function rosette(cx: number, cy: number, rx: number, ry: number, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (360 / count) * i;
    return (
      <ellipse
        key={i}
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        transform={`rotate(${angle} ${cx} ${cy})`}
        fill="none"
        stroke={GOLD}
        strokeWidth={0.6}
        opacity={0.5}
      />
    );
  });
}

function ticks(cx: number, cy: number, r: number, count: number, len: number) {
  return Array.from({ length: count }, (_, i) => {
    const a = (Math.PI * 2 * i) / count;
    const x1 = cx + Math.cos(a) * r;
    const y1 = cy + Math.sin(a) * r;
    const x2 = cx + Math.cos(a) * (r - len);
    const y2 = cy + Math.sin(a) * (r - len);
    return (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={GOLD} strokeWidth={0.8} opacity={0.55} />
    );
  });
}

export default function Seal({
  className = "",
  legend = "PARAMARKS PC \u00B7 TRADEMARK \u0026 IP \u00B7 SURINAME \u00B7 EST. 1997 \u00B7 ",
}: {
  className?: string;
  legend?: string;
}) {
  const C = 220;
  return (
    <svg
      viewBox="0 0 440 440"
      className={className}
      role="img"
      aria-label="Paramarks registered seal"
      fill="none"
    >
      <defs>
        <path id="seal-legend-path" d="M 220,220 m -170,0 a 170,170 0 1,1 340,0 a 170,170 0 1,1 -340,0" />
        <radialGradient id="seal-core" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#2A1846" />
          <stop offset="100%" stopColor="#150B26" />
        </radialGradient>
      </defs>

      {/* Rotating legend ring */}
      <g className="seal-ring-spin">
        <circle cx={C} cy={C} r={196} stroke={GOLD} strokeWidth={0.8} opacity={0.5} />
        <circle cx={C} cy={C} r={186} stroke={GOLD} strokeWidth={0.8} opacity={0.5} />
        {ticks(C, C, 196, 120, 4)}
        <text
          className="seal-fade"
          fill={GOLD_SOFT}
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "12.5px",
            fontWeight: 600,
            letterSpacing: "0.28em",
          }}
        >
          <textPath href="#seal-legend-path" startOffset="0%">
            {legend.repeat(2)}
          </textPath>
        </text>
      </g>

      {/* Drawn outer frame */}
      <circle className="seal-draw" style={{ "--len": "1080" } as React.CSSProperties} cx={C} cy={C} r={172} stroke={GOLD} strokeWidth={1} />
      <circle className="seal-draw" style={{ "--len": "980" } as React.CSSProperties} cx={C} cy={C} r={156} stroke={GOLD} strokeWidth={0.6} opacity={0.6} />

      {/* Guilloché rosette */}
      <g className="seal-fade-2">
        {rosette(C, C, 118, 44, 30)}
        {rosette(C, C, 78, 26, 24)}
      </g>

      {/* Inner ring + core */}
      <circle className="seal-draw" style={{ "--len": "540" } as React.CSSProperties} cx={C} cy={C} r={86} stroke={GOLD} strokeWidth={1} />
      <circle cx={C} cy={C} r={70} fill="url(#seal-core)" className="seal-fade" />
      <circle cx={C} cy={C} r={70} stroke={GOLD} strokeWidth={0.6} opacity={0.5} className="seal-fade" />

      {/* Monogram */}
      <g className="seal-fade-2">
        <text
          x={C}
          y={C + 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill={GOLD_SOFT}
          style={{ fontFamily: '"Bodoni Moda", Georgia, serif', fontSize: "76px", fontWeight: 600 }}
        >
          P
        </text>
        <text
          x={C + 34}
          y={C - 22}
          textAnchor="middle"
          dominantBaseline="central"
          fill={GOLD}
          style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 600 }}
        >
          &#174;
        </text>
      </g>
    </svg>
  );
}
