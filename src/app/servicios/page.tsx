import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton, Button } from "@/components/Button";
import { XMark } from "@/components/Icons";
import { CtaBand } from "@/components/CtaBand";
import { services } from "@/content/services";
import { clientTypes } from "@/content/clientTypes";
import { about } from "@/content/about";
import { serviceMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Estrategia, estudio de mercado, branding, manual de marca, contenido, campañas y acompañamiento. Cada servicio tiene una meta concreta y se cotiza por secciones.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        scene="Servicios"
        title={<>Cada servicio tiene <span className="serif text-accent">su X</span></>}
        intro="Trabajamos por secciones: eliges lo que tu marca necesita hoy y sumas lo demás cuando llegue el momento. Los precios son una referencia y se ajustan en la reunión."
      />

      <section className="container-x pb-16 md:pb-24">
        <p className="label mb-5 text-accent">Cómo empezamos</p>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {about.start.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 80} className="glass p-6">
              <span className="display text-4xl text-accent">0{i + 1}</span>
              <h2 className="display mt-3 text-[1.9rem]">{s.name}</h2>
              <p className="mt-2 text-base text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x pb-10">
        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((s) => {
            const forTypes = clientTypes.filter((c) => c.services.includes(s.slug));
            return (
              <Reveal as="article" key={s.slug} className="glass flex scroll-mt-28 flex-col p-7 md:p-9">
                <span id={s.slug} className="block scroll-mt-28" />
                <div className="flex items-start justify-between gap-4">
                  <span className="label pt-1 text-accent">{s.index}</span>
                  {s.price && <span className="label rounded-full border border-line-strong bg-white/5 px-4 py-1.5 text-right text-fg">{s.price}</span>}
                </div>
                <h2 className="display mt-5 text-[clamp(2.3rem,3.6vw,3.2rem)]">{s.name}</h2>
                <p className="serif mt-3 text-[1.6rem] leading-snug text-[#e3b98f]">{s.short}</p>
                <p className="mt-4 text-fg/85">{s.description}</p>
                <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2" role="list">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.98rem] text-muted">
                      <span className="mt-[0.7em] h-0.5 w-3 shrink-0 bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-4 rounded-2xl border border-rec/40 bg-rec/10 p-5">
                  <XMark className="mt-0.5 h-6 w-6 shrink-0 text-rec" />
                  <p className="font-semibold text-fg">{s.goal}</p>
                </div>
                {forTypes.length > 0 && (
                  <p className="mt-5 text-[0.95rem] text-muted">
                    Ideal para:{" "}
                    {forTypes.map((c, j) => (
                      <span key={c.slug}>
                        <Link href={`/para/${c.slug}`} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                          {c.name.toLowerCase()}
                        </Link>
                        {j < forTypes.length - 1 ? ", " : "."}
                      </span>
                    ))}
                  </p>
                )}
                <div className="mt-auto flex flex-wrap gap-3 pt-7">
                  <WhatsAppButton message={serviceMessage(s.name)} variant="solid">Consultar</WhatsAppButton>
                  <Button href={`/contacto?servicio=${s.slug}`} variant="outline">Formulario</Button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CtaBand title="¿No sabes por dónde empezar?" subtitle="Te ayudamos a encontrar tu X." />
    </>
  );
}
