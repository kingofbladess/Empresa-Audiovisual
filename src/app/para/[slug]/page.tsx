import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { clientTypes, getClientType } from "@/content/clientTypes";
import { getService } from "@/content/services";
import { projects } from "@/content/projects";
import { Frame } from "@/components/Frame";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { Button, WhatsAppButton } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon } from "@/components/Icons";
import { clientTypeMessage } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return clientTypes.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getClientType((await params).slug);
  if (!t) return {};
  return { title: t.name, description: t.summary, alternates: { canonical: `/para/${t.slug}` } };
}

export default async function ClientTypePage({ params }: Props) {
  const t = getClientType((await params).slug);
  if (!t) notFound();

  const related = t.services.map(getService).filter((s) => !!s);
  const work = projects.filter((p) => p.clientType === t.slug || p.categories.some((c) => t.workCategories.includes(c))).slice(0, 3);
  const others = clientTypes.filter((c) => c.slug !== t.slug);
  const d = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

  return (
    <>
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden">
        <Frame media={t.media} drift priority className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/50 to-bg/30" />
        <div className="container-x pt-40 pb-20">
          <p className="label intro mb-6 text-accent">
            <Link href="/#para-quien" className="press inline-block py-2 hover:text-fg">Para quién</Link> / {t.name}
          </p>
          <h1 className="display intro max-w-5xl text-[clamp(2.8rem,8vw,7.5rem)]" style={d(120)}>{t.headline}</h1>
          <p className="intro mt-8 max-w-2xl text-lg text-fg/80 md:text-xl" style={d(240)}>{t.intro}</p>
          <div className="intro mt-10 flex flex-wrap gap-3" style={d(360)}>
            <WhatsAppButton message={clientTypeMessage(t.name)} variant="solid">Hablemos de tu proyecto</WhatsAppButton>
            <Button href={`/contacto?tipo=${t.slug}`} variant="outline">Formulario</Button>
          </div>
        </div>
      </section>

      <section className="container-x py-24 md:py-36">
        <SectionHeading scene="Cómo te ayudamos" title={<>Lo que hacemos <span className="serif text-accent">por ti</span></>} />
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {t.offer.map((o, i) => (
            <Reveal key={o.title} delay={i * 90} className="glass p-8 md:p-12">
              <p className="label text-accent">0{i + 1}</p>
              <h3 className="display mt-6 text-3xl md:text-4xl">{o.title}</h3>
              <p className="mt-4 text-muted md:text-lg">{o.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-bg-2 py-24 md:py-32">
        <div className="container-x">
          <h2 className="label mb-8 text-accent">Servicios relacionados</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
            {related.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicios#${s.slug}`} className="group glass glass-hover flex h-full flex-col justify-between p-6">
                  <span className="label text-muted">{s.index}</span>
                  <span className="display mt-10 text-2xl">{s.name}</span>
                  <span className="mt-3 text-base text-muted">{s.short}</span>
                  <ArrowIcon className="mt-6 h-5 w-5 text-accent transition-transform group-hover:translate-x-2" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {work.length > 0 && (
        <section className="container-x py-24 md:py-36">
          <SectionHeading scene="Trabajo relacionado" title={<>Así lo <span className="serif text-accent">pensamos</span></>} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-line">
        <div className="container-x py-16">
          <p className="label mb-6 text-muted">Otros caminos</p>
          <ul className="flex flex-wrap gap-3">
            {others.map((c) => (
              <li key={c.slug}>
                <Link href={`/para/${c.slug}`} className="glass-control label inline-flex min-h-11 items-center px-5 py-2.5 text-fg">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand message={clientTypeMessage(t.name)} />
    </>
  );
}
