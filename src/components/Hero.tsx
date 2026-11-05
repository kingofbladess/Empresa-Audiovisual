import { site } from "@/content/site";
import { Button, WhatsAppButton } from "./Button";
import { Timecode } from "./Timecode";
import { HeroVideo } from "./HeroVideo";

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

/**
 * Portada. Si `site.heroVideo.src` tiene un archivo (p. ej. la animación de
 * Google Flow), se reproduce de fondo. Mientras tanto se muestra una escena
 * animada provisional hecha solo con CSS.
 */
export function Hero() {
  const { src, srcMobile, introSrc, poster, image, imageMobile } = site.heroVideo;

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-label="Presentación">
      {/* Fondo */}
      <div className="absolute inset-0 -z-10">
        {src ? (
          <HeroVideo src={src} srcMobile={srcMobile || undefined} introSrc={introSrc || undefined} poster={poster || undefined} />
        ) : image ? (
          <picture>
            {imageMobile && <source srcSet={imageMobile} media="(max-width: 767px)" />}
            <img src={image} alt="" className="h-full w-full object-cover" fetchPriority="high" />
          </picture>
        ) : (
          <SceneFallback />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,.55)_0%,rgba(10,10,10,.1)_40%,rgba(10,10,10,.85)_100%)]" />
      </div>

      {/* Barras de cine que se abren al cargar */}
      <div className="letterbox pointer-events-none absolute inset-x-0 top-0 z-10 bg-black" />
      <div className="letterbox pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-black" />

      {/* Datos de cámara */}
      <div className="label intro pointer-events-none absolute inset-x-0 top-24 z-20 text-white/60 md:top-28" style={d(1500)}>
        <div className="container-x flex justify-between">
          <span className="flex items-center gap-2">
            <span className="rec-dot h-2 w-2 rounded-full bg-rec" /> REC
          </span>
          <span className="hidden sm:inline">
            <Timecode />
          </span>
          <span className="hidden md:inline">24 FPS · 2.39:1</span>
        </div>
      </div>

      <div className="container-x relative z-20 mt-auto pb-[calc(7vh+3rem)] pt-40">
        <p className="label intro mb-6 text-accent" style={d(1400)}>
          {site.descriptor}
        </p>
        <h1 className="display text-[clamp(3.2rem,11.5vw,11rem)]">
          <span className="intro block" style={d(1550)}>
            Construimos
          </span>
          <span className="intro block" style={d(1700)}>
            identidades<span className="text-accent">.</span>
          </span>
          <span className="serif intro mt-2 block text-[clamp(1.8rem,4.6vw,4.4rem)] leading-tight text-fg/85" style={d(1850)}>
            Las contamos como cine.
          </span>
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <p className="intro max-w-xl text-lg text-fg/75 md:col-span-6 md:text-xl" style={d(2000)}>
            {site.intro}
          </p>
          <div className="intro flex flex-wrap gap-3 md:col-span-6 md:justify-end" style={d(2150)}>
            <Button href="/servicios">Servicios</Button>
            <Button href="/trabajo" variant="outline">
              Ver proyectos
            </Button>
            <WhatsAppButton variant="outline" className="sm:hidden xl:inline-flex">
              WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Escena provisional: luz volumétrica, partículas de polvo y haces que cruzan. */
function SceneFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#080706]">
      <div
        className="frame-drift absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 55% at 68% 38%, rgba(201,166,107,.55) 0%, rgba(90,62,32,.35) 35%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 90%, rgba(60,70,80,.45), transparent 70%), linear-gradient(180deg,#0b0a09,#060606)",
        }}
      />
      {/* Silueta de cámara de cine sugerida */}
      <div
        className="frame-drift absolute right-[8%] bottom-[18%] h-[38%] w-[34%] opacity-80"
        style={{
          background:
            "radial-gradient(circle at 30% 45%, #000 0 14%, transparent 15%), radial-gradient(circle at 30% 45%, rgba(201,166,107,.35) 0 18%, transparent 19%), linear-gradient(#050505,#050505) 45% 40%/55% 38% no-repeat, radial-gradient(circle at 62% 15%, #050505 0 12%, transparent 13%), radial-gradient(circle at 82% 15%, #050505 0 12%, transparent 13%), linear-gradient(#050505,#050505) 50% 100%/4% 40% no-repeat",
          filter: "blur(1.5px)",
        }}
      />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="beam absolute top-[-20%] h-[140%] w-[22%]"
          style={{
            left: `${i * 18}%`,
            animationDelay: `${i * 3}s`,
            background: "linear-gradient(90deg, transparent, rgba(236,232,225,.08), transparent)",
          }}
        />
      ))}
      {/* Partículas de polvo en el haz de luz */}
      <div
        className="frame-drift absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 62% 30%, #fff8 50%, transparent), radial-gradient(1.5px 1.5px at 70% 45%, #fff6 50%, transparent), radial-gradient(1px 1px at 58% 52%, #fff5 50%, transparent), radial-gradient(1px 1px at 75% 28%, #fff7 50%, transparent), radial-gradient(2px 2px at 66% 40%, #fff4 50%, transparent), radial-gradient(1px 1px at 80% 55%, #fff5 50%, transparent), radial-gradient(1px 1px at 54% 36%, #fff6 50%, transparent)",
        }}
      />
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 220px 80px rgba(0,0,0,.85)" }} />
    </div>
  );
}
