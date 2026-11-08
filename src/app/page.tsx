import Link from "next/link";
import { preload } from "react-dom";
import { Hero } from "@/components/Hero";
import { CameraIntro } from "@/components/CameraIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { CtaBand } from "@/components/CtaBand";
import { Button } from "@/components/Button";
import { RouteMap } from "@/components/RouteMap";
import { RouteLeg } from "@/components/RouteLeg";
import { Frame } from "@/components/Frame";
import { site } from "@/content/site";
import { clientTypes } from "@/content/clientTypes";
import { services } from "@/content/services";
import { projects } from "@/content/projects";

export default function Home() {
  // Lo primero que se ve es el póster de la intro.
  preload(site.cameraIntro.poster, { as: "image", fetchPriority: "high" });

  const featured = projects.filter((p) => p.featured).slice(0, 2);
  const highlighted = ["estrategia-empresarial", "branding", "contenido", "identidad-audiovisual", "campanas", "artistas"];
  const mainServices = services.filter((s) => highlighted.includes(s.slug));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: `https://${site.domain}`,
    telephone: `+${site.whatsapp.number}`,
    email: site.email || undefined,
    areaServed: "Venezuela",
    address: { "@type": "PostalAddress", addressLocality: "Maracay", addressRegion: "Aragua", addressCountry: "VE" },
    sameAs: site.social.filter((s) => s.href).map((s) => s.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="sr-only">{site.name}: {site.tagline}. {site.descriptor}</h1>
      <CameraIntro>
        <Hero />
      </CameraIntro>

      {/* El mapa: los puntos clave de la ruta */}
      <section className="container-x pt-20 md:pt-28">
        <SectionHeading scene="Tu ruta" title={<>Tu marca, <span className="serif text-accent">punto por punto</span></>} />
        <Reveal delay={120} className="mt-10 md:mt-12">
          <RouteMap />
        </Reveal>
      </section>

      <RouteLeg />

      {/* Servicios */}
      <section className="cv container-x">
        <SectionHeading scene="Servicios" title={<>Doce servicios, una sola <span className="text-rec">X</span></>} />
        <ul className="mt-10 flex flex-wrap gap-3" role="list">
          {mainServices.map((s) => (
            <li key={s.slug}>
              <Link href={`/servicios#${s.slug}`} className="glass-control label inline-flex min-h-12 items-center px-5 py-2.5 text-fg">{s.name}</Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href="/servicios">Ver los doce</Button>
        </div>
      </section>

      <RouteLeg variant={1} />

      {/* Para quién */}
      <section id="para-quien" className="cv container-x">
        <SectionHeading scene="Para quién" title={<>Elige tu <span className="serif text-accent">proyecto</span></>} />
        <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-5" role="list">
          {clientTypes.map((t) => (
            <li key={t.slug} className="max-lg:first:col-span-2">
              <Link href={`/para/${t.slug}`} className="on-dark press group relative block overflow-hidden rounded-[1.25rem]">
                <Frame media={t.media} className="aspect-[4/3] w-full lg:aspect-[4/5]" sizes="(min-width:1024px) 20vw, 50vw" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <span className="display absolute inset-x-0 bottom-0 p-4 text-[1.6rem] leading-none transition-colors group-hover:text-accent">{t.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <RouteLeg variant={2} />

      {/* Proyectos destacados */}
      <section className="cv container-x">
        <SectionHeading scene="Nuestro trabajo" title={<>Proyectos <span className="serif text-accent">en pantalla</span></>} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 120}>
              <ProjectCard project={p} aspect="aspect-[16/10]" />
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/trabajo" variant="outline">Ver todo el trabajo</Button>
        </div>
      </section>

      <RouteLeg />

      <CtaBand />
    </>
  );
}
