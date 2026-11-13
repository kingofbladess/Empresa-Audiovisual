"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/content/site";
import { Viewfinder } from "./Viewfinder";

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

/** Dónde aparece cada punto de enfoque (x %, y %) y en qué tramo de su escena. */
const AF_POS = [
  [[22, 40], [72, 28], [62, 58]],
  [[76, 46], [28, 27], [40, 57]],
  [[25, 52], [66, 25], [80, 52]],
  [[70, 40], [22, 30], [42, 24]],
];
const AF_AT = [0.1, 0.36, 0.62];
/** Datos de cámara que cambian en cada escena. */
const APERTURE = ["2.8", "4", "1.8", "5.6"];
const ISO = ["800", "640", "400", "200"];

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
  const hud = useRef<HTMLDivElement>(null);
  const timecode = useRef<HTMLSpanElement>(null);
  const skipBtn = useRef<HTMLButtonElement>(null);
  const loadBar = useRef<HTMLDivElement>(null);
  const afLayer = useRef<HTMLDivElement>(null);
  const focal = useRef<HTMLSpanElement>(null);
  const fstop = useRef<HTMLSpanElement>(null);
  const iso = useRef<HTMLSpanElement>(null);
  const ruler = useRef<HTMLDivElement>(null);
  const meters = useRef<(HTMLElement | null)[]>([]);
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
    let lastP = 0;
    let meterTimer = 0;

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
      const shownTime = Math.min(target, Math.max(0, readyUntil - END_MARGIN));
      const ph = Math.max(0, partAt(shownTime));
      if (ph !== lastPhase) {
        lastPhase = ph;
        setPhase(ph);
        if (fstop.current) fstop.current.textContent = APERTURE[ph];
        if (iso.current) iso.current.textContent = ISO[ph];
      }

      // Dentro de cada escena van apareciendo sus puntos de enfoque, uno tras otro.
      const local = clamp((shownTime - STARTS[ph]) / PARTS[ph]);
      afLayer.current?.querySelectorAll<HTMLElement>("[data-af]").forEach((el) => {
        el.toggleAttribute("data-on", Number(el.dataset.phase) === ph && local >= Number(el.dataset.at));
      });
      // El foco recorre la regla en cada escena y la focal abre de 24 a 85 mm en todo el viaje.
      if (ruler.current) ruler.current.style.transform = `translateY(${(1 - local) * 100}%)`;
      if (focal.current) focal.current.textContent = String(Math.round(24 + 61 * seg(p, 0, VIDEO_END)));
      // Los vúmetros suben con la velocidad del scroll y caen al detenerse.
      const level = Math.min(1, 0.12 + Math.abs(p - lastP) * 90);
      lastP = p;
      meters.current.forEach((m, i) => {
        if (m) m.style.transform = `scaleY(${Math.min(1, level * (i ? 0.86 : 1))})`;
      });
      clearTimeout(meterTimer);
      meterTimer = window.setTimeout(() => meters.current.forEach((m) => m && (m.style.transform = "scaleY(0.06)")), 160);

      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      if (hint.current) {
        const h = seg(p, 0, 0.04);
        hint.current.style.opacity = String(1 - h);
        hint.current.style.transform = `scale(${1 + h * 0.25})`;
        hint.current.style.visibility = h < 1 ? "visible" : "hidden";
      }
      const copyOpacity = 1 - seg(p, 0.84, 0.9);
      if (copyBox.current) copyBox.current.style.opacity = String(copyOpacity * seg(p, 0.02, 0.05));
      if (hud.current) hud.current.style.opacity = String(copyOpacity);
      if (timecode.current) {
        // El contador sigue al video: avanza y retrocede con el scroll.
        const pad = (n: number) => String(n).padStart(2, "0");
        const frames = Math.floor(target * 24);
        timecode.current.textContent = `00:${pad(Math.floor(frames / 1440))}:${pad(Math.floor(frames / 24) % 60)}:${pad(frames % 24)}`;
      }
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
      clearTimeout(meterTimer);
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
      <div ref={stage} className="on-dark sticky top-0 h-[100svh] overflow-hidden bg-[#030303]">
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

        {/* Visor de cámara sobre el video */}
        <div ref={hud} className="pointer-events-none absolute inset-0 z-10">
          <Viewfinder center className="vf--screen" />
          <div className="hud absolute top-[6.25rem] left-[clamp(1.75rem,4vw,3.5rem)] text-white" aria-hidden>
            <p className="flex items-center gap-3">
              <span className="rec-dot h-2.5 w-2.5 rounded-full" /> REC
              <span ref={timecode}>00:00:00:00</span>
            </p>
            <p className="mt-1.5 flex gap-4 text-[0.78rem] text-white/75">
              <span>4K</span>
              <span>24 FPS</span>
              <span>
                ƒ/<span ref={fstop}>{APERTURE[0]}</span>
              </span>
              <span className="hidden sm:inline">
                ISO <span ref={iso}>{ISO[0]}</span>
              </span>
              <span>
                <span ref={focal}>24</span> mm
              </span>
              <span className="hidden sm:inline">5600K</span>
            </p>
          </div>

          {/* Puntos de enfoque con las ideas de cada escena */}
          <div ref={afLayer} className="absolute inset-0" aria-hidden>
            {cfg.phases.map((ph, i) =>
              ph.tags.map((tag, j) => (
                <span key={tag} data-af data-phase={i} data-at={AF_AT[j]} className="af" style={{ left: `${AF_POS[i][j][0]}%`, top: `${AF_POS[i][j][1]}%` }}>
                  <i className="af__box" />
                  <span className="af__label hud">
                    <span className="flag-point w-3!" /> {tag}
                  </span>
                </span>
              )),
            )}
          </div>

          {/* Vúmetros (izquierda) y regla de foco (derecha) */}
          <div className="absolute top-1/2 left-[clamp(1.75rem,4vw,3.5rem)] hidden -translate-y-1/2 items-end gap-1.5 md:flex" aria-hidden>
            {[0, 1].map((i) => (
              <span key={i} className="meter">
                <i
                  ref={(node) => {
                    meters.current[i] = node;
                  }}
                />
              </span>
            ))}
            <span className="hud ml-1 text-[0.7rem] text-white/70">L R</span>
          </div>
          <div className="focus-ruler absolute top-1/2 right-[clamp(1.75rem,4vw,3.5rem)] hidden -translate-y-1/2 md:block" aria-hidden>
            <span className="focus-ruler__ticks" />
            <div className="hud absolute inset-y-0 left-4 flex flex-col justify-between whitespace-nowrap text-[0.7rem] text-white/70">
              <span className="font-sans text-[0.95rem] leading-none">∞</span>
              <span>10</span>
              <span>5</span>
              <span>3</span>
              <span>1.5 m</span>
            </div>
            <div ref={ruler} className="focus-ruler__marker" style={{ transform: "translateY(100%)" }} />
          </div>
        </div>

        {/* Textos de cada fase */}
        <div ref={copyBox} className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-[max(1.25rem,4svh)] opacity-0">
          <div className="container-x flex items-end justify-between gap-6">
            <div key={phase} className="intro max-w-xl pr-14 md:pr-0">
              <p className="start-title text-[clamp(1.75rem,min(4.6vw,9svh),3.8rem)]">{copy.title}</p>
              <p className="start-sub mt-2 text-[clamp(1.05rem,min(1.9vw,4.5svh),1.6rem)]">{copy.text}</p>
            </div>
            {/* Avance: una ruta con una bandera por escena */}
            <div className="relative mr-20 mb-2 hidden h-8 w-44 shrink-0 md:block" aria-hidden>
              <div className="absolute inset-x-[3px] bottom-[3px] h-px bg-line-strong">
                <div ref={bar} className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
              </div>
              {cfg.phases.map((p, i) => (
                <span
                  key={p.title}
                  className={`flag-point absolute bottom-0 w-4! transition-opacity duration-500 ${i <= phase ? "opacity-100" : "opacity-40"}`}
                  style={{ left: `calc(${(i / (cfg.phases.length - 1)) * 100}% - ${(i / (cfg.phases.length - 1)) * 1}rem)` }}
                />
              ))}
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

        <button ref={skipBtn} type="button" onClick={skipIntro} className="glass-control label absolute top-[6rem] right-7 z-20 min-h-11 px-4 py-2 text-fg md:right-10">
          Saltar intro
        </button>
      </div>
    </div>
  );
}
