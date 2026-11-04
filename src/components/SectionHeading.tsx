import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Encabezado de sección: número de escena, título grande y texto opcional. */
export function SectionHeading({ scene, title, children, className = "" }: { scene: string; title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={`grid gap-6 md:grid-cols-12 md:items-end ${className}`}>
      <Reveal className="md:col-span-7">
        <p className="label mb-5 flex items-center gap-3 text-muted">
          <span className="text-accent">{scene}</span>
          <span className="h-px w-10 bg-line-strong" />
        </p>
        <h2 className="display text-[clamp(2.4rem,6vw,5.5rem)]">{title}</h2>
      </Reveal>
      {children && (
        <Reveal delay={120} className="text-muted md:col-span-4 md:col-start-9 md:pb-2 md:text-lg">
          {children}
        </Reveal>
      )}
    </div>
  );
}

/** Cabecera de página interior. */
export function PageHeader({ scene, title, intro }: { scene: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <header className="container-x pt-40 pb-16 md:pt-48 md:pb-24">
      <p className="label intro mb-6 flex items-center gap-3 text-muted">
        <span className="text-accent">{scene}</span>
        <span className="h-px w-10 bg-line-strong" />
      </p>
      <h1 className="display intro text-[clamp(3rem,10vw,9.5rem)]" style={{ "--delay": "120ms" } as React.CSSProperties}>
        {title}
      </h1>
      {intro && (
        <p className="intro mt-8 max-w-2xl text-lg text-muted md:text-xl" style={{ "--delay": "260ms" } as React.CSSProperties}>
          {intro}
        </p>
      )}
    </header>
  );
}
