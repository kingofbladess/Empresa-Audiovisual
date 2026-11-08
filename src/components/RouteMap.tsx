"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { mapPoints } from "@/content/mapPoints";
import { ArrowIcon } from "./Icons";
import { Viewfinder } from "./Viewfinder";

/** Tramo curvo entre dos puntos. En el mapa ancho sale en horizontal; en el vertical, en vertical. */
const leg = (a: [number, number], b: [number, number], wide: boolean) => {
  if (wide) {
    const mid = (a[0] + b[0]) / 2;
    return `M${a[0]} ${a[1]}C${mid} ${a[1]} ${mid} ${b[1]} ${b[0]} ${b[1]}`;
  }
  const mid = (a[1] + b[1]) / 2;
  return `M${a[0]} ${a[1]}C${a[0]} ${mid} ${b[0]} ${mid} ${b[0]} ${b[1]}`;
};

function Route({ wide, active, className }: { wide: boolean; active: number; className: string }) {
  const at = (i: number): [number, number] => (wide ? [mapPoints[i].x, mapPoints[i].y] : [mapPoints[i].mx, mapPoints[i].my]);
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className}`}>
      {mapPoints.slice(1).map((_, i) => (
        <path key={i} d={leg(at(i), at(i + 1), wide)} className={i < active ? "route-line route-line--done" : "route-line"} />
      ))}
    </svg>
  );
}

/** Mapa de la ruta: cada bandera es un concepto clave y al pulsarla se abre su detalle. */
export function RouteMap() {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const point = mapPoints[active];
  const last = active === mapPoints.length - 1;

  /** En móvil el detalle va debajo del mapa: se trae a la vista al elegir un punto. */
  const choose = (i: number) => {
    setActive(i);
    panel.current?.scrollIntoView({ block: "nearest" });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="map-board relative overflow-hidden rounded-[1.25rem] lg:col-span-8">
        <Viewfinder />
        <p aria-hidden className="hud absolute top-5 left-6 flex items-center gap-2 text-fg">
          <span className="rec-dot h-2 w-2 rounded-full" /> {String(active + 1).padStart(2, "0")} / {String(mapPoints.length).padStart(2, "0")}
        </p>
        <div className="map-area relative">
          <Route wide active={active} className="hidden lg:block" />
          <Route wide={false} active={active} className="lg:hidden" />
          <ol>
            {mapPoints.map((p, i) => (
              <li key={p.name} className="map-pin" style={{ "--x": `${p.x}%`, "--y": `${p.y}%`, "--mx": `${p.mx}%`, "--my": `${p.my}%` } as React.CSSProperties}>
                <button type="button" aria-pressed={i === active} onClick={() => choose(i)} className="map-pin__button">
                  <span className="flag-point" aria-hidden />
                  <span className="sr-only">Punto {i + 1} de {mapPoints.length}: </span>
                  <span className="map-pin__name label">{p.name}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div ref={panel} className="glass flex scroll-mb-24 flex-col p-6 md:p-8 lg:col-span-4">
        <div aria-live="polite" className="flex-1">
          <h3 className="display text-[clamp(2rem,3.2vw,2.75rem)] text-accent">{point.title}</h3>
          <p className="mt-3 text-lg text-fg">{point.text}</p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href={point.href} className="press label inline-flex min-h-11 items-center gap-2 underline decoration-line-strong underline-offset-4 hover:decoration-fg">
            {point.cta} <ArrowIcon />
          </Link>
          <button type="button" className="glass-control label min-h-11 px-4 py-2" onClick={() => setActive(last ? 0 : active + 1)}>
            {last ? "Volver a la salida" : "Siguiente punto"}
          </button>
        </div>
      </div>
    </div>
  );
}
