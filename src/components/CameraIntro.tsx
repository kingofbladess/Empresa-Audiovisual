"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/content/site";

/*
 * INTRO DE LA CÁMARA (controlada por el scroll)
 *
 * El scroll avanza 4 escenas, una tras otra:
 * Fase 1 · El objetivo se acopla a la cámara y gira hacia nosotros.
 * Fase 2 · Otra cámara de frente: entramos por el diafragma.
 * Fase 3 · Viajamos por dentro del lente, entre sus elementos de vidrio.
 * Fase 4 · Salimos del lente y se abre el set de rodaje.
 *
 * Cada fase es un archivo propio y se descargan en orden, así la primera se puede usar
 * casi de inmediato. Si el visitante va más rápido que la descarga, la imagen espera al
 * final de lo disponible.
 *
 * Al terminar el recorrido, la portada (children) aparece con un fundido sobre
 * ese mismo set: su fondo es el último fotograma del video.
 * Cómo volver a generar los videos: ver README.
 */

const cfg = site.cameraIntro;
const PARTS = cfg.videoParts;
/** Segundo en que empieza cada parte dentro del recorrido completo. */
const STARTS = PARTS.map((_, i) => PARTS.slice(0, i).reduce((a, b) => a + b, 0));
const TOTAL = PARTS.reduce((a, b) => a + b, 0);

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const partAt = (t: number) => STARTS.filter((start) => t >= start).length - 1;

/** Tramo del recorrido en que avanza el video; el resto es el fundido a la portada. */
const VIDEO_END = 0.9;
/** Suavizado del avance: fracción de la distancia al objetivo que se recorre en cada cuadro. */
const SMOOTHING = 0.18;
/** Diferencia mínima (segundos) que justifica pedir otro fotograma: medio cuadro a 24 fps. */
const FRAME = 1 / 48;
/** Margen para no pedir el instante exacto en que termina un video. */
const END_MARGIN = 0.05;

type Connection = { saveData?: boolean; effectiveType?: string; downlink?: number };

/** Elige la versión según orientación, tamaño de pantalla y conexión. */
function pickVersion() {
  if (window.innerHeight > window.innerWidth) return "movil";
  const conn = (navigator as Navigator & { connection?: Connection }).connection;
  const slow = conn?.saveData || /2g|3g/.test(conn?.effectiveType ?? "") || (conn?.downlink ?? 10) < 3;
  return slow || window.innerWidth <= 1024 ? "sd" : "hd";
}

export function CameraIntro({ children }: { children: ReactNode }) {
  const skip = !cfg.enabled;
  const outer = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const copyBox = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const skipBtn = useRef<HTMLButtonElement>(null);
  const loadBar = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  // La intro avanza solo cuando el visitante hace scroll, así que también se muestra
  // con "reducir movimiento" activado (en Windows suele venir así por defecto).
  // Siempre está el botón "Saltar intro".

  useEffect(() => {
    if (skip) return;
    const vids = videos.current;
    const ready = PARTS.map(() => false);
    let readyUntil = 0; // hasta qué segundo hay video disponible sin saltos
    let scrollRaf = 0;
    let seekRaf = 0;
    let lastPhase = -1;
    let shown = 0;
    let wasInteractive = false;
    let target = 0;
    let current = 0;

    const show = (index: number) => {
      if (index === shown) return;
      shown = index;
      vids.forEach((v, i) => {
        if (v) v.style.visibility = i === index ? "visible" : "hidden";
      });
    };

    // Sigue al scroll con suavidad y no pide un fotograma hasta que llegó el anterior:
    // si se acumulan peticiones, el video se queda congelado mientras se desliza.
    const seek = () => {
      seekRaf = 0;
      if (!readyUntil) return;
      const goal = Math.min(target, readyUntil - END_MARGIN);
      current += (goal - current) * SMOOTHING;
      if (Math.abs(goal - current) < FRAME) current = goal;
      const index = partAt(current);
      const v = vids[index];
      if (!v || !ready[index] || v.seeking) return; // `seeked` la vuelve a lanzar
      const local = Math.min(current - STARTS[index], PARTS[index] - END_MARGIN);
      if (Math.abs(v.currentTime - local) > FRAME) v.currentTime = local;
      else show(index);
      if (current !== goal) seekRaf = requestAnimationFrame(seek);
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

      target = seg(p, 0, VIDEO_END) * (TOTAL - END_MARGIN);
      kickSeek();

      // El texto acompaña a la imagen: no se adelanta a lo que ya se puede mostrar.
      const ph = Math.max(0, partAt(Math.min(target, Math.max(0, readyUntil - END_MARGIN))));
      if (ph !== lastPhase) {
        lastPhase = ph;
        setPhase(ph);
      }

      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
      if (hint.current) {
        const h = seg(p, 0, 0.04);
        hint.current.style.opacity = String(1 - h);
        hint.current.style.transform = `scale(${1 + h * 0.25})`;
        hint.current.style.visibility = h < 1 ? "visible" : "hidden";
      }
      const copyOpacity = 1 - seg(p, 0.84, 0.9);
      if (copyBox.current) copyBox.current.style.opacity = String(copyOpacity * seg(p, 0.02, 0.05));
      if (skipBtn.current) {
        skipBtn.current.style.opacity = String(copyOpacity);
        skipBtn.current.style.visibility = copyOpacity < 0.05 ? "hidden" : "visible";
      }

      if (image.current) {
        const o = seg(p, 0.88, 0.98);
        image.current.style.opacity = String(o);
        // Oculta del todo: detrás del video no debe gastar en pintar su vidrio ni sus animaciones.
        image.current.style.visibility = o > 0 ? "visible" : "hidden";
        const interactive = o > 0.95;
        if (interactive !== wasInteractive) {
          wasInteractive = interactive;
          image.current.style.pointerEvents = interactive ? "auto" : "none";
          image.current.inert = !interactive; // sin esto, el teclado enfoca botones invisibles
        }
        // La entrada de la portada (barras y textos) se dispara al aparecer, no al cargar.
        image.current.toggleAttribute("data-revealed", o > 0);
      }
    };

    const onScroll = () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(render);
    };

    const markReady = (index: number) => {
      ready[index] = true;
      // Solo cuenta lo que está disponible de corrido desde el principio.
      const firstMissing = ready.indexOf(false);
      readyUntil = firstMissing === -1 ? TOTAL : STARTS[firstMissing];
      onScroll();
    };

    // Safari no muestra fotogramas al buscar hasta que el video se reprodujo una vez.
    // En los demás navegadores ese arranque solo gastaría.
    const needsPrime = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const prime = (index: number) => {
      const v = vids[index];
      if (!v) return;
      if (!needsPrime) return markReady(index);
      v.play()
        .then(() => v.pause())
        .catch(() => {})
        .finally(() => markReady(index));
    };

    const cleanups: (() => void)[] = [];
    vids.forEach((v, i) => {
      if (!v) return;
      const onLoaded = () => prime(i);
      const onSeeked = () => {
        if (partAt(current) === i) show(i);
        kickSeek();
      };
      v.addEventListener("loadeddata", onLoaded, { once: true });
      v.addEventListener("seeked", onSeeked);
      cleanups.push(() => {
        v.removeEventListener("loadeddata", onLoaded);
        v.removeEventListener("seeked", onSeeked);
      });
    });

    // Cada parte se descarga completa: así los saltos del scroll dentro de ella son inmediatos.
    const abort = new AbortController();
    const blobUrls: string[] = [];
    const showProgress = (fraction: number) => {
      if (loadBar.current) loadBar.current.style.transform = `scaleX(${Math.min(1, fraction)})`;
    };
    const loadPart = async (index: number, url: string) => {
      const res = await fetch(url, { signal: abort.signal });
      if (!res.ok || !res.body) throw new Error("sin video");
      const total = Number(res.headers.get("content-length")) || 0;
      const reader = res.body.getReader();
      const chunks: Uint8Array<ArrayBuffer>[] = [];
      let received = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value as Uint8Array<ArrayBuffer>);
        received += value.length;
        if (total) showProgress((index + received / total) / PARTS.length);
      }
      return URL.createObjectURL(new Blob(chunks, { type: "video/mp4" }));
    };
    const loadAll = async () => {
      const version = pickVersion();
      for (let i = 0; i < PARTS.length; i++) {
        const url = `${cfg.videoBase}/${version}-${i + 1}.mp4`;
        const v = vids[i];
        if (!v || abort.signal.aborted) return;
        try {
          const blobUrl = await loadPart(i, url);
          blobUrls.push(blobUrl);
          v.src = blobUrl;
        } catch {
          if (abort.signal.aborted) return;
          v.src = url; // plan B: transmitirlo directamente
        }
      }
      if (loadBar.current?.parentElement) loadBar.current.parentElement.style.opacity = "0";
    };
    loadAll();

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      abort.abort();
      blobUrls.forEach((url) => URL.revokeObjectURL(url));
      cleanups.forEach((fn) => fn());
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
    <div ref={outer} data-intro className="relative" style={{ height: `${cfg.length * 100 + 100}svh` }}>
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden bg-[#030303]">
        {/* La portada real: aparece con un fundido al final */}
        <div ref={image} className="hero-stage absolute inset-0" style={{ opacity: 0, visibility: "hidden", zIndex: 1, pointerEvents: "none" }} inert>
          {children}
        </div>

        {PARTS.map((_, i) => (
          <video
            key={i}
            ref={(node) => {
              videos.current[i] = node;
            }}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ visibility: i === 0 ? "visible" : "hidden" }}
            muted
            playsInline
            preload="auto"
            poster={i === 0 ? cfg.poster : undefined}
            aria-hidden
          />
        ))}

        {/* Avance de la descarga */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-0.5 transition-opacity duration-500" aria-hidden>
          <div ref={loadBar} className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
        </div>

        {/* Oscurece la parte baja para que los textos se lean sobre cualquier escena */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(0deg,rgba(0,0,0,.8),transparent)]" />

        {/* Textos de cada fase */}
        <div ref={copyBox} className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-[max(1.25rem,4svh)] opacity-0">
          <div className="container-x flex items-end justify-between gap-6">
            <div key={phase} className="intro max-w-xl pr-14 md:pr-0">
              <p className="label text-accent">{copy.label}</p>
              <p className="display mt-2 text-[clamp(1.7rem,min(5vw,9svh),4.2rem)]">{copy.title}</p>
              <p className="serif mt-1 text-[clamp(1.05rem,min(2.2vw,4.5svh),1.8rem)] text-fg/80">{copy.text}</p>
            </div>
            {/* Progreso */}
            <div className="hidden h-32 w-px bg-line-strong md:block">
              <div ref={bar} className="h-full w-px origin-top bg-accent" style={{ transform: "scaleY(0)" }} />
            </div>
          </div>
        </div>

        {/* Indicación para empezar: se desvanece con el scroll */}
        <div ref={hint} className="pointer-events-none absolute inset-x-0 bottom-[max(1.5rem,5svh)] z-10 flex flex-col items-center text-fg">
          <span className="label intro block" style={{ "--delay": "800ms" } as React.CSSProperties}>
            Desliza para enfocar
          </span>
          <span className="mt-2 block h-6 w-px animate-pulse bg-fg/60" />
        </div>

        <button ref={skipBtn} type="button" onClick={skipIntro} className="label absolute top-[5.25rem] right-4 z-20 min-h-10 rounded-full border border-line-strong bg-bg/50 px-4 py-2 text-fg/85 hover:text-fg md:right-8">
          Saltar intro
        </button>
      </div>
    </div>
  );
}
