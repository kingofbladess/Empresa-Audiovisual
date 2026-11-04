import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ClientTypeSelector } from "@/components/ClientTypeSelector";
import { ProjectCard } from "@/components/ProjectCard";
import { ClientsWall } from "@/components/ClientsWall";
import { CtaBand } from "@/components/CtaBand";
import { Button } from "@/components/Button";
import { Frame } from "@/components/Frame";
import { ArrowIcon } from "@/components/Icons";
import { site } from "@/content/site";
import { clientTypes } from "@/content/clientTypes";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { clients } from "@/content/clients";
import { about } from "@/content/about";

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: `https://${site.domain}`,
    telephone: `+${site.whatsapp.number}`,
    email: site.email,
    areaServed: site.location,
    sameAs: site.social.map((s) => s.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />

      {/* Manifiesto */}
      <section className="container-x py-28 md:py-44">
        <Reveal>
          <p className="label mb-8 text-accent">Esc. 01 · Manifiesto</p>
        </Reveal>
        <Reveal delay={100}>
          <p className="display max-w-6xl text-[clamp(2rem,5.4vw,5.2rem)] leading-[0.95]">
            No vendemos simplemente <span className="serif text-fg/60">fotografías o videos.</span> Desarrollamos conceptos,
            construimos identidades y transformamos ideas en <span className="text-accent">marcas</span> y experiencias audiovisuales.
          </p>
        </Reveal>
        <div className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {about.method.map((m, i) => (
            <Reveal key={m.step} delay={i * 100} className="bg-bg p-8">
              <p className="label text-accent">{m.step}</p>
              <p className="display mt-6 text-3xl">{m.name}</p>
              <p className="mt-3 text-muted">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Selección del tipo de cliente */}
      <section id="para-quien" className="border-t border-line bg-bg-2 py-28 md:py-40">
        <div className="container-x">
          <SectionHeading scene="Esc. 02 · ¿Qué quieres construir?" title={<>Elige tu <span className="serif text-accent">proyecto</span></>}>
            Cada tipo de cliente necesita un camino distinto. Elige el tuyo y te mostramos cómo podemos ayudarte.
          </SectionHeading>
          <div className="mt-16 md:mt-24">
            <ClientTypeSelector types={clientTypes} />
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="container-x py-28 md:py-40">
        <SectionHeading scene="Esc. 03 · Servicios" title={<>Seis disciplinas,<br />una dirección</>}>
          Integramos dirección creativa, cine, fotografía, branding y estrategia para que todo hable el mismo idioma.
        </SectionHeading>
        <ul className="mt-16 border-t border-line md:mt-24" role="list">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 60} className="border-b border-line">
              <Link href={`/servicios#${s.slug}`} className="group grid items-center gap-4 py-8 md:grid-cols-12 md:gap-8">
                <span className="label text-accent md:col-span-1">{s.index}</span>
                <span className="display text-[clamp(1.9rem,4vw,3.6rem)] transition-transform duration-500 group-hover:translate-x-3 md:col-span-6">{s.name}</span>
                <span className="text-muted md:col-span-4">{s.short}</span>
                <span className="hidden justify-self-end md:col-span-1 md:block">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                    <ArrowIcon />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Proyectos destacados */}
      <section className="border-t border-line py-28 md:py-40">
        <div className="container-x">
          <SectionHeading scene="Esc. 04 · Nuestro trabajo" title={<>Proyectos <span className="serif text-fg/60">en pantalla</span></>}>
            Una muestra de cómo pensamos. Los proyectos actuales son conceptuales: ejercicios del estudio para mostrar nuestro proceso.
          </SectionHeading>
          <div className="mt-16 grid gap-x-6 gap-y-16 md:mt-24 md:grid-cols-2">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 120} className={i % 2 === 1 ? "md:mt-32" : ""}>
                <ProjectCard project={p} aspect={i % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"} />
              </Reveal>
            ))}
          </div>
          <div className="mt-20 flex justify-center">
            <Button href="/trabajo" variant="outline">Ver todo el trabajo</Button>
          </div>
        </div>
      </section>

      {/* Equipo (adelanto) */}
      <section className="relative overflow-hidden border-t border-line">
        <Frame media={{ alt: "Equipo del estudio en set", palette: ["#080706", "#2b2117", "#b8925a"] }} drift className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/20" />
        <div className="container-x relative py-32 md:py-48">
          <Reveal className="max-w-2xl">
            <p className="label mb-6 text-accent">Esc. 05 · Equipo</p>
            <h2 className="display text-[clamp(2.6rem,6vw,5.5rem)]">
              Directores, fotógrafos, editores y <span className="serif text-accent">estrategas.</span>
            </h2>
            <p className="mt-6 text-lg text-fg/75">
              Un equipo multidisciplinario que piensa cada proyecto completo: de la estrategia al último fotograma.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/equipo">Conoce al equipo</Button>
              <Button href="/equipo#bitacora" variant="outline">Bitácora creativa</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Clientes */}
      <section className="container-x py-28 md:py-40">
        <SectionHeading scene="Esc. 06 · Confianza" title={<>Marcas y personas <span className="serif text-fg/60">que confían</span></>}>
          Artistas, empresas y proyectos que han construido su imagen con nosotros.
        </SectionHeading>
        <div className="mt-16 md:mt-20">
          <ClientsWall clients={clients} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
