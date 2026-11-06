"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Project, WorkCategory } from "@/content/types";
import { workCategories } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

/** Portafolio con filtros por categoría. El filtro queda en la URL (?categoria=…) para poder compartirlo. */
export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const active = (params.get("categoria") as WorkCategory | null) ?? null;

  const available = useMemo(() => {
    const used = new Set(projects.flatMap((p) => p.categories));
    return (Object.keys(workCategories) as WorkCategory[]).filter((c) => used.has(c));
  }, [projects]);

  const list = active ? projects.filter((p) => p.categories.includes(active)) : projects;

  const select = (c: WorkCategory | null) => {
    const url = c ? `/trabajo?categoria=${c}` : "/trabajo";
    router.replace(url, { scroll: false });
  };

  const chip = (selected: boolean) =>
    `glass-control label min-h-11 shrink-0 px-4 py-2.5 ${selected ? "" : "text-fg/85"}`;

  return (
    <div>
      <div className="-mx-4 mb-14 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:px-0" role="toolbar" aria-label="Filtrar proyectos por categoría">
        <div className="flex gap-2 md:flex-wrap">
          <button type="button" className={chip(!active)} aria-pressed={!active} onClick={() => select(null)}>
            Todos ({projects.length})
          </button>
          {available.map((c) => (
            <button key={c} type="button" className={chip(active === c)} aria-pressed={active === c} onClick={() => select(c)}>
              {workCategories[c]}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {list.length} proyectos
      </p>

      <ul className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {list.map((p, i) => (
          <li key={p.slug} className="intro" style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}>
            <ProjectCard project={p} priority={i < 3} />
          </li>
        ))}
      </ul>
      {list.length === 0 && <p className="text-muted">Pronto publicaremos proyectos en esta categoría.</p>}
    </div>
  );
}
