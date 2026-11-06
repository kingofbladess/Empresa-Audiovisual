"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/content/site";
import { Isotipo, Logotipo } from "./brand/Brand";

/*
 * INTRO DE LA CÁMARA (controlada por el scroll)
 *
 * El scroll avanza un video con las 3 escenas unidas, en orden:
 * Fase 1 · El objetivo se acopla a la cámara y gira hacia nosotros.
 * Fase 2 · Otra cámara de frente: entramos por el diafragma.
 * Fase 3 · Viajamos por dentro del lente, entre sus elementos de vidrio.
 *
 * Al terminar el recorrido, la portada (children) aparece con un fundido.
 * Cómo volver a generar el video: ver README.
 */

const cfg = site.cameraIntro;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/** Tramo del recorrido en que avanza el video; el resto es el fundido a la portada. */
const VIDEO_END = 0.9;
/** Suavizado del avance: fracción de la distancia al objetivo que se recorre en cada cuadro. */
const SMOOTHING = 0.18;
/** Diferencia mínima (segundos) que justifica pedir otro fotograma: medio cuadro a 24 fps. */
const FRAME = 1 / 48;

export function CameraIntro({ children }: { children: ReactNode }) {
  const skip = !cfg.enabled;
  const outer = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const copyBox = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const skipBtn = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState(0);

  // La intro avanza solo cuando el visitante hace scroll, así que también se muestra
  // con "reducir movimiento" activado (en Windows suele venir así por defecto).
  // Siempre está el botón "Saltar intro".

  useEffect(() => {
    if (skip) return;
    const v = video.current;
    let scrollRaf = 0;
    let seekRaf = 0;
    let lastPhase = -1;
    let target = 0;
    let current = 0;

    // Sigue al scroll con suavidad y no pide un fotograma hasta que llegó el anterior:
    // si se acumulan peticiones, el video se queda congelado mientras se desliza.
    const seek = () => {
      seekRaf = 0;
      if (!v) return;
      current += (target - current) * SMOOTHING;
      if (Math.abs(target - current) < FRAME) current = target;
      if (v.readyState < 1) return;
      if (v.seeking) return; // `seeked` la vuelve a lanzar
      if (Math.abs(v.currentTime - current) > FRAME) v.currentTime = current;
      if (current !== target) seekRaf = requestAnimationFrame(seek);
    };
    const kickSeek = () => {
      if (!seekRaf) seekRaf = requestAnimationFrame(seek);
    };

    const render = () => {
      scrollRaf = 0;
      const el = outer.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = clamp(-rect.top / (rect.height - (stage.current?.offsetHeight ?? window.innerHeight)));

      const duration = v && Number.isFinite(v.duration) && v.duration ? v.duration : cfg.videoDuration;
      const time = seg(p, 0, VIDEO_END) * (duration - 0.05);
      target = time;
      kickSeek();

      const ph = time < cfg.videoPhases[0] ? 0 : time < cfg.videoPhases[1] ? 1 : 2;
      if (ph !== lastPhase) {
        lastPhase = ph;
        setPhase(ph);
      }

      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
      if (hint.current) {
        const h = seg(p, 0, 0.05);
        hint.current.style.opacity = String(1 - h);
        hint.current.style.transform = `scale(${1 + h * 0.25})`;
      }
      const copyOpacity = 1 - seg(p, 0.84, 0.9);
      if (copyBox.current) copyBox.current.style.opacity = String(copyOpacity * seg(p, 0.03, 0.07));
      if (skipBtn.current) {
        skipBtn.current.style.opacity = String(copyOpacity);
        skipBtn.current.style.visibility = copyOpacity < 0.05 ? "hidden" : "visible";
      }

      if (image.current) {
        const o = seg(p, 0.88, 0.98);
        image.current.style.opacity = String(o);
        image.current.style.pointerEvents = o > 0.95 ? "auto" : "none";
        image.current.inert = o <= 0.95; // sin esto, el teclado enfoca botones invisibles
        // La entrada de la portada (barras y textos) se dispara al aparecer, no al cargar.
        image.current.toggleAttribute("data-revealed", o > 0);
      }
    };

    const onScroll = () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(render);
    };

    // Safari en iPhone no muestra fotogramas al buscar hasta que el video se reprodujo una vez.
    const prime = () => {
      if (!v) return;
      v.play()
        .then(() => v.pause())
        .catch(() => {})
        .finally(onScroll);
    };
    v?.addEventListener("loadedmetadata", prime, { once: true });
    v?.addEventListener("seeked", kickSeek);
    if (v && v.readyState >= 1) prime();

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      v?.removeEventListener("loadedmetadata", prime);
      v?.removeEventListener("seeked", kickSeek);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(scrollRaf);
      cancelAnimationFrame(seekRaf);
    };
  }, [skip]);

  if (skip) return <>{children}</>;

  const skipIntro = () => {
    const el = outer.current;
    if (!el) return;
    // "instant": con "auto" se heredaría el scroll suave de la página y recorrería toda la intro.
    window.scrollTo({ top: el.offsetTop + el.offsetHeight - window.innerHeight, behavior: "instant" });
  };

  const copy = cfg.phases[phase];

  return (
    <div ref={outer} className="relative" style={{ height: `${cfg.length * 100 + 100}svh` }}>
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden bg-[#030303]">
        {/* La portada real: aparece con un fundido al final */}
        <div ref={image} className="hero-stage absolute inset-0" style={{ opacity: 0, zIndex: 1, pointerEvents: "none" }} inert>
          {children}
        </div>

        <video ref={video} className="pointer-events-none absolute inset-0 h-full w-full object-cover" muted playsInline preload="auto" poster={cfg.poster} aria-hidden>
          <source src={cfg.videoMobile} media="(max-width: 767px)" type="video/mp4" />
          <source src={cfg.video} type="video/mp4" />
        </video>

        {/* Oscurece la parte baja para que los textos se lean sobre cualquier escena */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(0deg,rgba(0,0,0,.8),transparent)]" />

        {/* Textos de cada fase */}
        <div ref={copyBox} className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-10 opacity-0 md:pb-14">
          <div className="container-x flex items-end justify-between gap-6">
            <div key={phase} className="intro max-w-xl">
              <p className="label text-accent">{copy.label}</p>
              <p className="display mt-3 text-[clamp(2rem,5vw,4.2rem)]">{copy.title}</p>
              <p className="serif mt-2 text-[clamp(1.2rem,2.2vw,1.8rem)] text-fg/70">{copy.text}</p>
            </div>
            {/* Progreso */}
            <div className="hidden h-32 w-px bg-line-strong md:block">
              <div ref={bar} className="h-full w-px origin-top bg-accent" style={{ transform: "scaleY(0)" }} />
            </div>
          </div>
        </div>

        {/* Marca: el logo se anima al cargar y se desvanece al empezar el scroll */}
        <div ref={hint} className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.72),rgba(0,0,0,.35)_60%,transparent)] text-fg">
          <Isotipo animate variant="outlined" className="h-[34vmin] w-[34vmin]" />
          <Logotipo animate className="mt-[4vmin] h-[5vmin] min-h-6 w-auto" />
          <span className="label intro mt-[6vmin] block text-fg/70" style={{ "--delay": "2200ms" } as React.CSSProperties}>
            Desliza para enfocar
          </span>
          <span className="mx-auto mt-3 block h-8 w-px animate-pulse bg-fg/50" />
        </div>

        <button ref={skipBtn} type="button" onClick={skipIntro} className="label absolute top-22 right-4 z-20 border border-line-strong bg-bg/50 px-3 py-2 text-muted backdrop-blur hover:text-fg md:top-24 md:right-8">
          Saltar intro
        </button>
      </div>
    </div>
  );
}
