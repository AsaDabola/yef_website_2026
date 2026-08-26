/**
 * The mission band's backdrop: lines running in from both edges and drawing
 * together at a single point — the section's own "we gather in the Word, we
 * send each other out" said visually.
 *
 * Two layers per line: a faint continuous base so the fan reads even when
 * still, and a bright dash sliding along the same path so the eye is carried
 * toward the point they meet. The whole thing is masked out on the left so it
 * never competes with the copy that sits there.
 *
 * Plain SVG plus CSS, so it stays a server component and ships no JavaScript.
 * `prefers-reduced-motion` holds the highlight still.
 */
const LINES = 26;
const W = 1440;
const H = 620;
/** Right of centre, clear of the copy column. */
const CX = W * 0.72;
/**
 * Low enough that the lines meet on the rule dividing the verse from the two
 * columns below it, rather than floating in the middle of the headline. The
 * fraction is measured against the band's rendered height at desktop width.
 */
const CY = H * 0.68;

/** One line from an edge into the meeting point, flat before it sweeps in. */
function path(y: number, fromLeft: boolean): string {
  const x0 = fromLeft ? 0 : W;
  const run = fromLeft ? CX * 0.55 : W - (W - CX) * 0.55;
  const ease = fromLeft ? CX - 120 : CX + 120;
  return `M ${x0} ${y} C ${run} ${y} ${ease} ${CY} ${CX} ${CY}`;
}

export default function ConvergenceLines() {
  // Lines crowd toward the waist, keeping the fan dense where they meet and
  // airy at the top and bottom rather than evenly striped. The spread reaches
  // past the band on both sides so the fan still fills it now that the
  // meeting point sits low.
  const ys = Array.from({ length: LINES }, (_, i) => {
    const t = (i / (LINES - 1)) * 2 - 1; // -1 … 1
    return CY + Math.sign(t) * Math.abs(t) ** 1.4 * (H / 2) * 1.45;
  });

  const lines = [true, false].flatMap((fromLeft) =>
    ys.map((y, i) => ({
      key: `${fromLeft ? "l" : "r"}${i}`,
      d: path(y, fromLeft),
      near: 1 - Math.abs(y - CY) / (H / 2),
      delay: (i * 0.16 + (fromLeft ? 0 : 0.8)).toFixed(2),
    })),
  );

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 size-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="yef-lines-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="black" />
          <stop offset="0.34" stopColor="black" />
          <stop offset="0.62" stopColor="white" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <mask id="yef-lines-mask">
          <rect width={W} height={H} fill="url(#yef-lines-fade)" />
        </mask>
      </defs>

      <g mask="url(#yef-lines-mask)">
        {lines.map((l) => (
          <path
            key={l.key}
            d={l.d}
            fill="none"
            stroke="white"
            strokeWidth={0.5 + l.near * 0.5}
            opacity={0.05 + l.near * 0.1}
          />
        ))}
        {lines.map((l) => (
          <path
            key={`f${l.key}`}
            d={l.d}
            fill="none"
            stroke="white"
            strokeWidth={0.9 + l.near * 0.9}
            opacity={0.15 + l.near * 0.175}
            className="yef-flow"
            style={{ animationDelay: `${l.delay}s` }}
          />
        ))}
        <circle cx={CX} cy={CY} r="3" fill="white" opacity="0.4" />
        <circle
          cx={CX}
          cy={CY}
          r="11"
          fill="none"
          stroke="white"
          opacity="0.11"
        />
      </g>
    </svg>
  );
}
