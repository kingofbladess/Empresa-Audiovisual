import type { TeamMember } from "@/content/types";
import { Frame } from "./Frame";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-[1.25rem]">
        <Frame media={member.photo} className="aspect-[3/4] w-full grayscale transition-[filter] duration-700 group-hover:grayscale-0" sizes="(min-width:1024px) 25vw, 50vw" />
        {member.placeholder && (
          <span className="label absolute top-3 left-3 bg-bg/70 px-2 py-1 text-muted backdrop-blur">Perfil por completar</span>
        )}
      </div>
      <p className="label mt-5 text-accent">{member.role}</p>
      <h3 className="display mt-2 text-2xl">{member.name}</h3>
      <p className="mt-3 text-sm text-fg/75">{member.bio}</p>
      <p className="mt-3 border-l border-line-strong pl-3 text-sm text-muted">
        <span className="text-fg/60">En los proyectos: </span>
        {member.inProjects}
      </p>
    </article>
  );
}
