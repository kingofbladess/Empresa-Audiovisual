import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Frame } from "@/components/Frame";
import { WhatsAppButton, Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { services } from "@/content/services";
import { clientTypes } from "@/content/clientTypes";
import { serviceMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Dirección creativa, dirección cinematográfica, producción audiovisual y fotográfica, branding y estrategia para redes sociales.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      <PageHeader scene="Servicios" title={<>Del concepto <span className="serif text-accent">al resultado</span></>} intro="Organizamos nuestro trabajo en seis especialidades que se combinan según lo que necesite cada proyecto." />

      <nav aria-label="Especialidades" className="container-x mb-10">
        <ul className="flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.slug}>
              <a href={`#${s.slug}`} className="label inline-block border border-line-strong px-4 py-2.5 text-muted transition-colors hover:border-accent hover:text-accent">
                {s.index} {s.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((s, i) => {
        const forTypes = clientTypes.filter((c) => c.services.includes(s.slug));
        return (
          <section key={s.slug} id={s.slug} className="scroll-mt-24 border-t border-line">
            <div className="container-x grid gap-10 py-20 md:grid-cols-12 md:gap-14 md:py-28">
              <Reveal className={`md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
                <Frame media={s.media} className="aspect-[4/5] w-full" drift sizes="(min-width:768px) 40vw, 100vw" />
              </Reveal>
              <div className={`md:col-span-6 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
                <Reveal>
                  <p className="label text-accent">{s.index} · Especialidad</p>
                  <h2 className="display mt-5 text-[clamp(2.4rem,5vw,4.6rem)]">{s.name}</h2>
                  <p className="serif mt-4 text-3xl text-fg/80">{s.short}</p>
                  <p className="mt-6 text-lg text-muted">{s.description}</p>
                </Reveal>
                <Reveal delay={120}>
                  <ul className="mt-10 grid gap-x-8 sm:grid-cols-2" role="list">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-3 border-b border-line py-3.5">
                        <span className="mt-2.5 h-1 w-3 shrink-0 bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {forTypes.length > 0 && (
                    <p className="mt-8 text-sm text-muted">
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
                  <div className="mt-10 flex flex-wrap gap-3">
                    <WhatsAppButton message={serviceMessage(s.name)} variant="solid">Consultar este servicio</WhatsAppButton>
                    <Button href={`/contacto?servicio=${s.slug}`} variant="ghost">Formulario</Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand title="¿No sabes por dónde empezar?" subtitle="Te ayudamos a definirlo." />
    </>
  );
}
