import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects, workCategories } from "@/content/projects";
import { getService } from "@/content/services";
import { getClientType } from "@/content/clientTypes";
import { Frame } from "@/components/Frame";
import { Reveal } from "@/components/Reveal";
import { DemoBadge } from "@/components/DemoBadge";
import { WhatsAppButton } from "@/components/Button";
import { ArrowIcon } from "@/components/Icons";
import { projectMessage } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title}${p.demo ? " (proyecto conceptual)" : ""}`,
    description: p.logline,
    alternates: { canonical: `/trabajo/${p.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const d = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

  const meta = [
    { k: "Cliente / marca", v: p.client },
    { k: "Año", v: p.year },
    { k: "Servicios", v: p.services.map((s) => getService(s)?.name).join(", ") },
    { k: "Categorías", v: p.categories.map((c) => workCategories[c]).join(", ") },
    { k: "Para", v: getClientType(p.clientType)?.name ?? "" },
  ];

  return (
    <article>
      <header className="relative isolate flex min-h-[92svh] items-end overflow-hidden">
        <Frame media={p.cover} drift priority className="absolute inset-0 -z-10" showCaption />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/30 to-bg/40" />
        <div className="container-x pt-40 pb-16">
          <div className="intro mb-6 flex flex-wrap items-center gap-4">
            <Link href="/trabajo" className="label text-muted hover:text-fg">← Nuestro trabajo</Link>
            {p.demo && <DemoBadge />}
          </div>
          <h1 className="display intro text-[clamp(3.4rem,13vw,12rem)]" style={d(120)}>{p.title}</h1>
          <p className="serif intro mt-4 max-w-3xl text-[clamp(1.5rem,3vw,2.6rem)] leading-tight text-fg/85" style={d(240)}>{p.logline}</p>
        </div>
      </header>

      {p.demo && (
        <div className="border-y border-accent/30 bg-accent/5">
          <p className="container-x py-4 text-sm text-fg/80">
            <span className="label mr-3 text-accent">Aviso</span>
            Este es un proyecto conceptual creado por el estudio para mostrar su proceso. La marca y el cliente son ficticios.
          </p>
        </div>
      )}

      <section className="container-x grid gap-14 py-24 md:grid-cols-12 md:py-32">
        <Reveal className="md:col-span-4">
          <dl className="border-t border-line">
            {meta.map((m) => (
              <div key={m.k} className="grid grid-cols-3 gap-4 border-b border-line py-4">
                <dt className="label pt-1 text-muted">{m.k}</dt>
                <dd className="col-span-2">{m.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={120} className="md:col-span-7 md:col-start-6">
          <p className="label mb-6 text-accent">El concepto</p>
          <p className="text-[clamp(1.4rem,2.4vw,2.1rem)] leading-snug">{p.concept}</p>
        </Reveal>
      </section>

      {p.video && (
        <section className="container-x pb-24">
          <div className="relative aspect-video overflow-hidden bg-panel">
            {p.video.kind === "embed" ? (
              <iframe src={p.video.src} title={`Video de ${p.title}`} className="absolute inset-0 h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy" />
            ) : (
              <video src={p.video.src} poster={p.video.poster} controls playsInline className="absolute inset-0 h-full w-full object-cover" />
            )}
          </div>
        </section>
      )}

      {/* Galería */}
      <section className="container-x grid gap-4 pb-24 md:grid-cols-12 md:gap-6">
        {p.gallery.map((g, i) => (
          <Reveal key={g.alt} delay={i * 80} className={i === 0 ? "md:col-span-12" : "md:col-span-6"}>
            <Frame media={g} className={`${i === 0 ? "aspect-[2.39/1]" : "aspect-[4/3]"} w-full`} showCaption sizes={i === 0 ? "100vw" : "50vw"} />
          </Reveal>
        ))}
      </section>

      {/* Proceso */}
      <section className="border-t border-line bg-bg-2 py-24 md:py-32">
        <div className="container-x">
          <p className="label mb-12 text-accent">Proceso creativo</p>
          <ol className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {p.process.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 90} className="bg-bg-2 p-8">
                <span className="label text-muted">Paso 0{i + 1}</span>
                <h3 className="display mt-6 text-3xl">{s.step}</h3>
                <p className="mt-3 text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Resultado */}
      <section className="container-x grid gap-10 py-24 md:grid-cols-12 md:py-32">
        <Reveal className="md:col-span-4">
          <p className="label text-accent">Resultado final</p>
        </Reveal>
        <Reveal delay={100} className="md:col-span-8">
          <p className="display text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1]">{p.result}</p>
          {p.credits && (
            <dl className="mt-12 grid gap-4 sm:grid-cols-2">
              {p.credits.map((c) => (
                <div key={c.role}>
                  <dt className="label text-muted">{c.role}</dt>
                  <dd className="mt-1">{c.name}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-12">
            <WhatsAppButton message={projectMessage(p.title)} variant="solid">Quiero algo así</WhatsAppButton>
          </div>
        </Reveal>
      </section>

      {/* Siguiente */}
      <Link href={`/trabajo/${next.slug}`} className="group relative block overflow-hidden border-t border-line">
        <Frame media={next.cover} className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-70" />
        <div className="absolute inset-0 bg-bg/50" />
        <div className="container-x relative flex items-end justify-between gap-6 py-24 md:py-36">
          <div>
            <p className="label text-accent">Siguiente proyecto</p>
            <p className="display mt-4 text-[clamp(2.6rem,8vw,7rem)]">{next.title}</p>
          </div>
          <ArrowIcon className="mb-4 h-10 w-10 shrink-0 transition-transform duration-500 group-hover:translate-x-3" />
        </div>
      </Link>
    </article>
  );
}
