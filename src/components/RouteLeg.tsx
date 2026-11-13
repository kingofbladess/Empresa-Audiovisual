import { Reveal } from "./Reveal";

const paths = [
  "M0 0C0 55 680 8 680 60C680 112 0 65 0 120",
  "M0 0C0 50 340 15 340 60C340 105 0 70 0 120",
  "M0 0C0 60 940 5 940 60C940 115 0 60 0 120",
];

/** Tramo de la ruta entre dos secciones: sale de una bandera y llega a la siguiente. */
export function RouteLeg({ variant = 0 }: { variant?: 0 | 1 | 2 }) {
  return (
    <Reveal className="route-leg container-x" >
      <div className="relative h-[clamp(3.5rem,7vw,6rem)]">
        <svg viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden className="absolute inset-y-0 right-0 left-1 h-full w-[calc(100%-0.25rem)] overflow-visible">
          <path d={paths[variant]} className="route-line" />
        </svg>
      </div>
    </Reveal>
  );
}
