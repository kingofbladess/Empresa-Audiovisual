import Link from "next/link";
import type { Project } from "@/content/types";
import { workCategories } from "@/content/projects";
import { Frame } from "./Frame";
import { DemoBadge } from "./DemoBadge";

export function ProjectCard({ project, priority, aspect = "aspect-[4/5]" }: { project: Project; priority?: boolean; aspect?: string }) {
  return (
    <Link href={`/trabajo/${project.slug}`} className="press group block">
      <div className="relative overflow-hidden rounded-[1.25rem]">
        <Frame media={project.cover} className={`${aspect} w-full`} priority={priority} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
        <div className="absolute inset-0 bg-bg/0 transition-colors duration-500 group-hover:bg-bg/30" />
        {project.demo && <DemoBadge className="absolute top-3 left-3" />}
        <span className="label absolute right-3 bottom-3 translate-y-3 rounded-full border border-line-strong bg-bg/60 px-4 py-2 text-fg opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          Ver proyecto
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="display text-2xl transition-colors group-hover:text-accent md:text-3xl">{project.title}</h3>
          <p className="mt-1 text-sm text-muted">{project.logline}</p>
        </div>
        <span className="label shrink-0 pt-1 text-muted">{project.year}</span>
      </div>
      <p className="label mt-3 text-muted/80">
        {project.categories.slice(0, 2).map((c) => workCategories[c]).join(" · ")}
      </p>
    </Link>
  );
}
