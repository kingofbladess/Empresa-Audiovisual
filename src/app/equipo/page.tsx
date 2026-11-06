import type { Metadata } from "next";
import { PageHeader, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { TeamCard } from "@/components/TeamCard";
import { JournalCard } from "@/components/JournalCard";
import { CtaBand } from "@/components/CtaBand";
import { team } from "@/content/team";
import { journal } from "@/content/journal";

export const metadata: Metadata = {
  title: "Nuestro equipo",
  description: "Directores, fotógrafos, editores, diseñadores y estrategas. Conoce al equipo y nuestra bitácora creativa.",
  alternates: { canonical: "/equipo" },
};

export default function EquipoPage() {
  return (
    <>
      <PageHeader
        scene="Nuestro equipo"
        title={<>Las personas <span className="serif text-accent">detrás de cámara</span></>}
        intro="Un equipo multidisciplinario que combina cine, fotografía, diseño y estrategia en cada proyecto."
      />
      <section className="container-x pb-28">
        <h2 className="sr-only">Integrantes del equipo</h2>
        {team.some((m) => m.placeholder) && (
          <p className="glass mb-10 max-w-3xl px-5 py-4 text-base text-fg/85">
            Estructura del equipo por especialidad. Los perfiles se completarán con las fotografías y nombres de cada integrante.
          </p>
        )}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 4) * 80}>
              <TeamCard member={m} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="bitacora" className="scroll-mt-20 border-t border-line bg-bg-2 py-28 md:py-40">
        <div className="container-x">
          <SectionHeading scene="Bitácora creativa" title={<>Desde <span className="serif text-accent">el set</span></>}>
            Procesos de producción, detrás de cámaras, proyectos en desarrollo y experiencias del equipo.
          </SectionHeading>
          <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2">
            {journal.map((e, i) => (
              <Reveal key={e.slug} delay={(i % 2) * 120} >
                <JournalCard entry={e} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="¿Quieres sumarte?" subtitle="Siempre buscamos talento" message="Hola, me gustaría formar parte del equipo del estudio." />
    </>
  );
}
