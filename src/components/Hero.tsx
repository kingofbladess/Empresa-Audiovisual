import { site } from "@/content/site";
import { Button, WhatsAppButton } from "./Button";
import { Timecode } from "./Timecode";
import { HeroVideo } from "./HeroVideo";

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

/** Portada. Fondo: video si `site.heroVideo.src` tiene archivo; si no, la imagen fija. */
export function Hero() {
  const { src, srcMobile, introSrc, poster, image, imageMobile } = site.heroVideo;

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-label="Presentación">
      {/* Fondo */}
      <div className="absolute inset-0 -z-10">
        {src ? (
          <HeroVideo src={src} srcMobile={srcMobile || undefined} introSrc={introSrc || undefined} poster={poster || undefined} />
        ) : (
          <picture>
            {imageMobile && <source srcSet={imageMobile} media="(max-width: 767px)" />}
            {/* La portada empieza oculta detrás de la intro: su imagen no debe competir con ella. */}
            <img src={image} alt="" className="h-full w-full object-cover" fetchPriority="low" decoding="async" />
          </picture>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,10,8,.6)_0%,rgba(13,10,8,.12)_38%,rgba(13,10,8,.9)_100%)]" />
      </div>

      {/* Barras de cine que se abren al aparecer la portada */}
      <div className="letterbox pointer-events-none absolute inset-x-0 top-0 z-10 bg-black" />
      <div className="letterbox pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-black" />

      {/* Datos de cámara */}
      <div className="label intro pointer-events-none absolute inset-x-0 top-28 z-20 hidden text-white/70 md:block" style={d(1250)}>
        <div className="container-x flex justify-between">
          <span className="flex items-center gap-2">
            <span className="rec-dot h-2 w-2 rounded-full bg-rec" /> REC
          </span>
          <span className="hidden sm:inline">
            <Timecode />
          </span>
          <span className="hidden md:inline">{site.location.split(" · ")[0]}</span>
        </div>
      </div>

      <div className="container-x relative z-20 mt-auto pt-24 pb-8 md:pt-36 md:pb-[calc(7vh+1.25rem)]">
        <p className="hero-text label intro mb-4 text-accent" style={d(500)}>
          {site.descriptor}
        </p>
        <h1 className="display hero-title">
          <span className="intro block" style={d(650)}>
            La <span className="text-rec">X</span> marca
          </span>
          <span className="intro block" style={d(800)}>
            la meta<span className="text-accent">.</span>
          </span>
        </h1>

        <div className="glass intro mt-8 grid gap-6 p-6 md:grid-cols-12 md:items-center md:p-8" style={d(1000)}>
          <p className="hero-text text-base text-fg/90 md:col-span-6 md:text-lg">{site.intro}</p>
          <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
            <Button href="/contacto">Reunión sin costo</Button>
            <Button href="/servicios" variant="outline">
              Servicios
            </Button>
            <WhatsAppButton variant="outline" className="max-xl:hidden!">
              WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
