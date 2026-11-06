import Image from "next/image";
import type { ClientLogo } from "@/content/types";

/** Galería de marcas y personas. Si un cliente no tiene logo se compone su nombre tipográficamente. */
export function ClientsWall({ clients }: { clients: ClientLogo[] }) {
  const anyDemo = clients.some((c) => c.demo);
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" role="list">
        {clients.map((c, i) => (
          <li key={c.name} className="glass glass-hover group relative flex aspect-[3/2] flex-col items-center justify-center p-4 text-center transition-colors hover:bg-panel">
            {c.logo ? (
              <Image src={c.logo} alt={c.name} width={160} height={60} className="h-10 w-auto opacity-70 grayscale transition group-hover:opacity-100 group-hover:grayscale-0" />
            ) : (
              <span
                className={`text-fg/70 transition-colors group-hover:text-fg ${
                  i % 3 === 0 ? "display text-2xl md:text-3xl" : i % 3 === 1 ? "serif text-3xl md:text-4xl" : "label text-base tracking-[0.35em]"
                }`}
              >
                {c.name}
              </span>
            )}
            <span className="label mt-3 text-muted opacity-0 transition-opacity group-hover:opacity-100">{c.sector}</span>
          </li>
        ))}
      </ul>
      {anyDemo && (
        <p className="label mt-5 text-muted">
          * Marcas ficticias de ejemplo (proyectos conceptuales). Este espacio mostrará a nuestros clientes reales.
        </p>
      )}
    </div>
  );
}
