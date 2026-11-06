import type { Metadata } from "next";
import { PageHeader, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ClientsWall } from "@/components/ClientsWall";
import { CtaBand } from "@/components/CtaBand";
import { XMark } from "@/components/Icons";
import { about } from "@/content/about";
import { clients } from "@/content/clients";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Misión, visión, valores y proceso de XploreMet Prod, productora de estrategia y marca en Maracay, Venezuela.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <>
      <PageHeader scene="Nosotros" title={<>La <span className="text-rec">X</span> marca <span className="serif text-accent">la meta</span></>} intro={about.proposition} />

      <section className="container-x grid gap-4 pb-20 md:grid-cols-2 md:pb-28">
        {[
          { k: "Misión", v: about.mission },
          { k: "Visión", v: about.vision },
        ].map((b, i) => (
          <Reveal key={b.k} delay={i * 120} className="glass p-8 md:p-12">
            <h2 className="display text-5xl text-accent">{b.k}</h2>
            <p className="mt-5 text-lg leading-relaxed text-fg/90 md:text-xl">{b.v}</p>
          </Reveal>
        ))}
      </section>

      <section className="cv border-t border-line bg-bg-2 py-20 md:py-28">
        <div className="container-x">
          <SectionHeading scene="Valores" title={<>Lo que <span className="serif text-accent">nos mueve</span></>} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" role="list">
            {about.values.map((v, i) => (
              <Reveal as="li" key={v.name} delay={i * 80} className="glass overflow-hidden p-7">
                <span className="block h-1.5 w-12 rounded-full" style={{ background: v.color }} />
                <h3 className="display mt-6 text-[2.3rem]" style={{ color: v.color }}>{v.name}</h3>
                <p className="mt-3 text-base text-muted">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="cv container-x py-20 md:py-28">
        <SectionHeading scene="Nuestra personalidad" title={<>Dos arquetipos, <span className="serif text-accent">una marca</span></>} />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {about.archetypes.map((a, i) => (
            <Reveal key={a.name} delay={i * 100} className="glass p-8 md:p-10">
              <h3 className={`text-[clamp(2.6rem,11vw,3.75rem)] ${i === 0 ? "display italic" : "serif leading-none text-sand"}`}>{a.name}</h3>
              <p className="mt-4 text-lg text-fg/85">{a.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cv border-t border-line py-20 md:py-28">
        <div className="container-x">
          <SectionHeading scene="Proceso" title={<>Cómo <span className="serif text-accent">trabajamos</span></>} />
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {about.method.map((m, i) => (
              <Reveal as="li" key={m.step} delay={i * 100} className="glass p-7">
                <div className="flex items-center justify-between">
                  <span className="display text-6xl text-accent">{m.step}</span>
                  {i === about.method.length - 1 && <XMark className="h-8 w-8 text-rec" />}
                </div>
                <h3 className="display mt-5 text-[2rem]">{m.name}</h3>
                <p className="mt-3 text-base text-muted">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="cv border-t border-line bg-bg-2 py-20 md:py-28">
        <div className="container-x grid gap-4 md:grid-cols-2">
          <Reveal className="glass p-8 md:p-10">
            <p className="label text-accent">Dónde estamos</p>
            <p className="mt-4 text-xl text-fg/90">{site.location}</p>
          </Reveal>
          <Reveal delay={100} className="glass p-8 md:p-10">
            <p className="label text-accent">Disponibilidad</p>
            <p className="mt-4 text-xl text-fg/90">{about.availability}</p>
          </Reveal>
        </div>
      </section>

      <section className="cv container-x py-20 md:py-28">
        <SectionHeading scene="Confianza" title={<>Marcas y personas <span className="serif text-accent">que confían</span></>} />
        <div className="mt-12">
          <ClientsWall clients={clients} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
