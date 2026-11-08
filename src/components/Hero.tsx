import { site } from "@/content/site";
import { Button } from "./Button";
import { Viewfinder } from "./Viewfinder";
import { Timecode } from "./Timecode";

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

/** Portada. Su fondo es el último fotograma de la intro, para que el paso sea continuo. */
export function Hero() {
  const { image, imageMobile } = site.heroImage;

  return (
    <section className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-label="Presentación">
      {/* Fondo */}
      <div className="absolute inset-0 -z-10">
        <picture>
          {imageMobile && <source srcSet={imageMobile} media="(orientation: portrait)" />}
          {/* La portada empieza oculta detrás de la intro: su imagen no debe competir con ella. */}
          <img src={image} alt="" className="h-full w-full object-cover" fetchPriority="low" decoding="async" />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.6)_0%,rgba(0,0,0,.12)_38%,rgba(0,0,0,.9)_100%)]" />
      </div>

      {/* Barras de cine que se abren al aparecer la portada */}
      <div className="letterbox pointer-events-none absolute inset-x-0 top-0 z-10 bg-black" />
      <div className="letterbox pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-black" />

      {/* Datos de cámara */}
      <Viewfinder center className="vf--screen vf--hero intro z-20" />
      <div className="hero-meta hud intro pointer-events-none absolute inset-x-0 top-28 z-20 hidden text-white md:block" style={d(1250)}>
        <div className="container-x flex justify-between">
          <span className="flex items-center gap-2">
            <span className="rec-dot h-2.5 w-2.5 rounded-full" /> REC
          </span>
          <span className="hidden sm:inline">
            <Timecode />
          </span>
          <span className="hidden md:inline">{site.location.split(" · ")[0]}</span>
        </div>
      </div>

      <div className="hero-content container-x relative z-20 mt-auto">
        <p className="hero-text label intro mb-4 text-accent" style={d(500)}>
          {site.descriptor}
        </p>
        <p className="display hero-title">
          <span className="intro block" style={d(650)}>
            La <span className="text-accent">X</span> marca
          </span>
          <span className="intro block" style={d(800)}>
            la meta
          </span>
        </p>

        <div className="hero-panel intro flex flex-wrap gap-3" style={d(1000)}>
          <Button href="/contacto">Reunión sin costo</Button>
          <Button href="/servicios" variant="outline">
            Servicios
          </Button>
        </div>
      </div>
    </section>
  );
}
