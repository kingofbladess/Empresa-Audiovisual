import type { Metadata } from "next";
import { PageHeader, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { about } from "@/content/about";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Misión, visión, valores y proceso de XploreMet Prod, productora de estrategia y marca en Maracay, Venezuela.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <>
      <PageHeader scene="Nosotros" title={<>La <span className="text-rec">X</span> marca <span className="serif text-accent">la meta</span></>} intro={site.manifesto} />

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

      <section className="container-x pt-16 md:pt-20">
        <p className="label text-accent">Dónde estamos</p>
        <p className="mt-3 text-xl text-fg/90">{site.location}</p>
      </section>

      <CtaBand />
    </>
  );
}
