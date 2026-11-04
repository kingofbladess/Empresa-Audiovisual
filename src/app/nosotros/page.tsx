import type { Metadata } from "next";
import { PageHeader, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Frame } from "@/components/Frame";
import { ClientsWall } from "@/components/ClientsWall";
import { CtaBand } from "@/components/CtaBand";
import { about } from "@/content/about";
import { clients } from "@/content/clients";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Misión, visión, objetivos y valores del estudio creativo y productora audiovisual.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <>
      <PageHeader scene="Nosotros" title={<>Una forma de <span className="serif text-accent">mirar</span></>} intro={site.manifesto} />

      <section className="container-x">
        <Frame media={{ alt: "Plano panorámico del estudio", palette: ["#070605", "#2a2016", "#c9a66b"] }} drift className="aspect-[2.39/1] w-full" />
      </section>

      <section className="container-x grid gap-px py-24 md:grid-cols-2 md:py-36">
        {[
          { k: "Misión", v: about.mission },
          { k: "Visión", v: about.vision },
        ].map((b, i) => (
          <Reveal key={b.k} delay={i * 120} className="border-t border-line pt-8 md:pr-12">
            <p className="label text-accent">{b.k}</p>
            <p className="mt-6 text-xl leading-relaxed md:text-2xl">{b.v}</p>
          </Reveal>
        ))}
      </section>

      <section className="border-t border-line bg-bg-2 py-24 md:py-36">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="label text-accent">Objetivo general</p>
            <p className="display mt-6 text-[clamp(1.7rem,3vw,2.7rem)] leading-[1.02]">{about.goal}</p>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <p className="label mb-6 text-accent">Objetivos específicos</p>
            <ol className="border-t border-line">
              {about.objectives.map((o, i) => (
                <Reveal as="li" key={i} delay={i * 70} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5">
                  <span className="label pt-1 text-muted">0{i + 1}</span>
                  <span className="text-fg/85 md:text-lg">{o}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-x py-24 md:py-36">
        <SectionHeading scene="Valores" title={<>Lo que <span className="serif text-accent">no negociamos</span></>} />
        <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" role="list">
          {about.values.map((v, i) => (
            <Reveal as="li" key={v.name} delay={(i % 4) * 80} className="group bg-bg p-8 transition-colors hover:bg-panel">
              <span className="label text-muted">0{i + 1}</span>
              <p className="display mt-8 text-3xl transition-colors group-hover:text-accent">{v.name}</p>
              <p className="mt-3 text-muted">{v.text}</p>
            </Reveal>
          ))}
          <li className="hidden items-end bg-bg p-8 lg:flex">
            <p className="serif text-3xl text-fg/60">Y una obsesión por el detalle.</p>
          </li>
        </ul>
      </section>

      <section className="border-t border-line py-24 md:py-36">
        <div className="container-x">
          <SectionHeading scene="Método" title={<>Cómo <span className="serif text-fg/60">trabajamos</span></>} />
          <ol className="mt-16 grid gap-10 md:grid-cols-4">
            {about.method.map((m, i) => (
              <Reveal as="li" key={m.step} delay={i * 100}>
                <p className="display text-7xl text-accent/80">{m.step}</p>
                <p className="display mt-4 text-3xl">{m.name}</p>
                <p className="mt-3 text-muted">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x border-t border-line py-24 md:py-36">
        <SectionHeading scene="Confianza" title={<>Marcas y personas <span className="serif text-fg/60">que confían</span></>} />
        <div className="mt-16">
          <ClientsWall clients={clients} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
