import type { TeamMember } from "@/content/types";
import { Frame } from "./Frame";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="glass group h-full p-3">
      <div className="relative overflow-hidden rounded-[0.9rem]">
        <Frame media={member.photo} className="aspect-[3/4] w-full" sizes="(min-width:1024px) 25vw, 50vw" />
        {member.placeholder && (
          <span className="on-dark label absolute top-3 left-3 rounded-full border border-line-strong bg-bg/60 px-3 py-1 text-fg/85 backdrop-blur">Perfil por completar</span>
        )}
      </div>
      <div className="px-2 pb-2">
        <p className="label mt-4 text-accent">{member.role}</p>
        <h3 className="display mt-2 text-2xl">{member.name}</h3>
        <p className="mt-3 text-base text-fg/85">{member.bio}</p>
        <p className="mt-3 border-t border-line pt-3 text-base text-muted">
          <span className="text-fg/85">En los proyectos: </span>
          {member.inProjects}
        </p>
      </div>
    </article>
  );
}
