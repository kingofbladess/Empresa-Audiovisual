import Link from "next/link";
import { preload } from "react-dom";
import { Hero } from "@/components/Hero";
import { CameraIntro } from "@/components/CameraIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ClientTypeSelector } from "@/components/ClientTypeSelector";
import { ProjectCard } from "@/components/ProjectCard";
import { ClientsWall } from "@/components/ClientsWall";
import { CtaBand } from "@/components/CtaBand";
import { Button } from "@/components/Button";
import { Frame } from "@/components/Frame";
import { ArrowIcon, XMark } from "@/components/Icons";
import { site } from "@/content/site";
import { clientTypes } from "@/content/clientTypes";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { clients } from "@/content/clients";
import { about } from "@/content/about";
import { team } from "@/content/team";

export default function Home() {
  // Lo primero que se ve es el póster de la intro.
  preload(site.cameraIntro.poster, { as: "image", fetchPriority: "high" });

  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const portrait = team.find((m) => m.photo.src)?.photo;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: `https://${site.domain}`,
    telephone: `+${site.whatsapp.number}`,
    email: site.email,
    areaServed: "Venezuela",
    address: { "@type": "PostalAddress", addressLocality: "Maracay", addressRegion: "Aragua", addressCountry: "VE" },
    sameAs: site.social.map((s) => s.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CameraIntro>
        <Hero />
      </CameraIntro>

      {/* Propuesta de valor y ruta */}
      <section className="container-x py-24 md:py-36">
        <Reveal>
          <p className="label mb-6 text-accent">Esc. 01 · Nuestra propuesta</p>
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-5xl font-sans text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.2] font-semibold tracking-tight">
            Construimos tu identidad <span className="text-accent">desde cero</span>, con una ruta hecha para ti y metas a corto, medio y largo plazo. <span className="serif text-[#e3b98f]">Cada etapa tiene su X.</span>
          </p>
        </Reveal>
        <div className="mt-16">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.method.map((m, i) => (
              <Reveal as="li" key={m.step} delay={i * 100} className="route-step glass flex flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="display text-5xl text-accent">{m.step}</span>
                  {i === about.method.length - 1 && <XMark className="h-8 w-8 text-rec" />}
                </div>
                <h3 className="display mt-5 text-[2rem]">{m.name}</h3>
                <p className="mt-3 text-base text-muted">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Situaciones */}
      <section className="cv container-x pb-24 md:pb-36">
        <SectionHeading scene="Esc. 02 · ¿Dónde estás hoy?" title={<>Todo camino empieza <span className="serif text-accent">en algún punto</span></>}>
          Si te ves en alguna de estas situaciones, ya sabemos por dónde empezar.
        </SectionHeading>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {about.situations.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 3) * 80}>
              <Link href={`/servicios#${s.service}`} className="glass glass-hover group flex h-full flex-col p-7">
                <h3 className="display text-[2.1rem]">{s.title}</h3>
                <p className="mt-3 flex-1 text-base text-muted">{s.text}</p>
                <span className="label mt-6 inline-flex items-center gap-2 text-accent">
                  Ver el camino <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Selección del tipo de cliente */}
      <section id="para-quien" className="cv border-t border-line bg-bg-2 py-24 md:py-36">
        <div className="container-x">
          <SectionHeading scene="Esc. 03 · ¿Qué quieres construir?" title={<>Elige tu <span className="serif text-accent">proyecto</span></>}>
            Cada cliente necesita un camino distinto. Elige el tuyo y te mostramos cómo podemos ayudarte.
          </SectionHeading>
          <div className="mt-14 md:mt-20">
            <ClientTypeSelector types={clientTypes} />
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="cv container-x py-24 md:py-36">
        <SectionHeading scene="Esc. 04 · Servicios" title={<>Doce servicios,<br />una sola <span className="text-rec">X</span></>}>
          Solo pagas las secciones que tu marca necesita. Cada servicio tiene una meta concreta.
        </SectionHeading>
        <ul className="mt-14 grid border-t border-line md:mt-20 md:grid-cols-2 md:gap-x-12" role="list">
          {services.map((s) => (
            <li key={s.slug} className="border-b border-line">
              <Link href={`/servicios#${s.slug}`} className="group flex min-h-24 items-center gap-5 py-5">
                <span className="label w-8 shrink-0 text-accent">{s.index}</span>
                <span className="min-w-0 flex-1">
                  <span className="display block text-[1.85rem] transition-colors group-hover:text-accent">{s.name}</span>
                  <span className="mt-1 block text-[0.95rem] text-muted">{s.short}</span>
                </span>
                <ArrowIcon className="h-5 w-5 shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <Button href="/servicios" variant="outline">Ver servicios y precios</Button>
        </div>
      </section>

      {/* Proyectos destacados */}
      <section className="cv border-t border-line py-24 md:py-36">
        <div className="container-x">
          <SectionHeading scene="Esc. 05 · Nuestro trabajo" title={<>Proyectos <span className="serif text-accent">en pantalla</span></>}>
            Una muestra de cómo pensamos. Los proyectos actuales son conceptuales: ejercicios del estudio para mostrar nuestro proceso.
          </SectionHeading>
          <div className="mt-14 grid gap-x-6 gap-y-14 md:mt-20 md:grid-cols-2">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 120} className={i % 2 === 1 ? "md:mt-32" : ""}>
                <ProjectCard project={p} aspect={i % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"} />
              </Reveal>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <Button href="/trabajo" variant="outline">Ver todo el trabajo</Button>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="cv border-t border-line bg-bg-2 py-24 md:py-36">
        <div className="container-x grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-7">
            <p className="label mb-5 text-accent">Esc. 06 · Equipo</p>
            <h2 className="display text-[clamp(3rem,7.4vw,6.8rem)]">
              Creadores, cineastas y <span className="serif text-accent">estrategas</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-fg/85">{about.team}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/equipo">Conoce al equipo</Button>
              <Button href="/nosotros" variant="outline">Nuestra historia</Button>
            </div>
          </Reveal>
          {portrait && (
            <Reveal delay={120} className="glass p-3 md:col-span-5">
              <Frame media={portrait} className="aspect-[4/5] w-full rounded-[0.9rem]" sizes="(min-width:768px) 40vw, 100vw" />
            </Reveal>
          )}
        </div>
      </section>

      {/* Clientes */}
      <section className="cv container-x py-24 md:py-36">
        <SectionHeading scene="Esc. 07 · Confianza" title={<>Marcas y personas <span className="serif text-accent">que confían</span></>}>
          Artistas, empresas y proyectos que construyen su imagen con nosotros.
        </SectionHeading>
        <div className="mt-14 md:mt-20">
          <ClientsWall clients={clients} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
