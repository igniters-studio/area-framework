/** A red cross in a circle: a practice to avoid. Decorative; the label says it to screen readers. */
export function BadMark({ label }: { label: string }) {
  return (
    <span className="mark mark-bad">
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <circle cx="12" cy="12" r="11" />
        <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

/** A green check in a circle: the AREA way. */
export function GoodMark({ label }: { label: string }) {
  return (
    <span className="mark mark-good">
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <circle cx="12" cy="12" r="11" />
        <path d="M7.5 12.5l3 3 6-6.5" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
