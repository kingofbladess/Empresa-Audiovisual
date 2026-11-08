/** Rótulo obligatorio para todo contenido conceptual o de ejemplo. */
export function DemoBadge({ text = "Proyecto conceptual", className = "" }: { text?: string; className?: string }) {
  return (
    <span className={`on-dark label inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-bg/60 px-3 py-1 text-accent backdrop-blur ${className}`}>
      <span className="h-1 w-1 rounded-full bg-accent" />
      {text}
    </span>
  );
}
