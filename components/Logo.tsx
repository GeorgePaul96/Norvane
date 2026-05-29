/**
 * Norvane N lettermark — geometric N with the depth face on the right stroke.
 *
 * Proportions derived from the brand logo:
 *  - Post width: ~21 units (each)
 *  - Diagonal band: same visual width as posts
 *  - Right stroke: main front face + parallelogram depth face (~7 units wide)
 *  - Viewbox: 107 × 112 (slightly wider than square to include depth face)
 *
 * Uses `currentColor` so dark/light mode is handled entirely by the parent's
 * text color class (e.g. `dark:text-ink-100 text-ink-900`).
 *
 * The depth face uses `opacity="0.45"` on the same currentColor, which renders
 * as a mid-gray in both dark and light contexts — matching the logo's shadow.
 */

interface LogoMarkProps {
  className?: string;
  /** Height in pixels. Width scales proportionally. */
  height?: number;
}

export function LogoMark({ className = "", height = 28 }: LogoMarkProps) {
  const w = Math.round(height * (107 / 112));
  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 107 112"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Left vertical post */}
      <rect x="0" y="0" width="21" height="112" />

      {/* Diagonal band — parallelogram connecting the two posts */}
      <polygon points="21,0 43,0 79,112 57,112" />

      {/* Right post — front face */}
      <rect x="79" y="0" width="21" height="112" />

      {/* Right post — depth/shadow face (the 3D signature of the mark) */}
      {/* Parallelogram on the right edge, cut at top following the diagonal */}
      <polygon points="100,0 107,0 107,112 100,112" opacity="0.45" />
      {/* Chamfer: angled top connecting front face to depth face */}
      <polygon points="79,0 100,0 100,20" opacity="0.45" />
    </svg>
  );
}

interface LogoFullProps {
  className?: string;
  height?: number;
  /** Hide the wordmark — show only the N mark */
  markOnly?: boolean;
}

export function LogoFull({ className = "", height = 28, markOnly = false }: LogoFullProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark height={height} />
      {!markOnly && (
        <span
          className="font-semibold uppercase tracking-[0.18em] dark:text-ink-100 text-ink-900 leading-none"
          style={{ fontSize: Math.round(height * 0.5) }}
        >
          Norvane
        </span>
      )}
    </div>
  );
}
