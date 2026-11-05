"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/content/site";

/*
 * INTRO DE LA CÁMARA (controlada por el scroll)
 *
 * Fase 1 · Interior: vemos desde dentro del cuerpo de la cámara hacia la
 *          montura; al fondo, una imagen que no se distingue.
 * Fase 2 · Primer lente: un elemento de vidrio entra y enfoca un poco más.
 * Fase 3 · Lente final: vista exterior, el objetivo se acopla a la cámara,
 *          entramos por el cristal y la imagen (la portada) queda nítida.
 *
 * La "imagen" que se ve a través de la cámara es la propia portada (children),
 * así que al terminar el recorrido la portada queda en pantalla sin cortes.
 * Si `site.cameraIntro.video` tiene un archivo, el scroll avanza ese video
 * en lugar del prototipo animado por código.
 */

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeIn = (t: number) => t * t * t;

/** Radio del cristal en vmin (el mismo en el interior y en el exterior). */
const GLASS = 11.5;
const RINGS = [11.5, 14, 17, 21, 26, 32, 40, 50, 63, 80, 100];

export function CameraIntro({ children }: { children: ReactNode }) {
  const cfg = site.cameraIntro;
  const [skip, setSkip] = useState(!cfg.enabled);
  const outer = useRef<HTMLDivElement>(null);
  const refs = {
    image: useRef<HTMLDivElement>(null),
    shutterTop: useRef<HTMLDivElement>(null),
    shutterBottom: useRef<HTMLDivElement>(null),
    interior: useRef<HTMLDivElement>(null),
    glass: useRef<HTMLDivElement>(null),
    exterior: useRef<HTMLDivElement>(null),
    lens: useRef<SVGGElement>(null),
    flash: useRef<SVGCircleElement>(null),
    video: useRef<HTMLVideoElement>(null),
    copy: useRef<HTMLDivElement>(null),
    hint: useRef<HTMLDivElement>(null),
    bar: useRef<HTMLDivElement>(null),
    skipBtn: useRef<HTMLButtonElement>(null),
  };
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setSkip(true);
  }, []);

  useEffect(() => {
    if (skip) return;
    let raf = 0;
    let lastPhase = -1;

    const render = () => {
      raf = 0;
      const el = outer.current;
      if (!el) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const vmin = Math.min(vw, vh) / 100;
      const rect = el.getBoundingClientRect();
      const p = clamp(-rect.top / (rect.height - vh));

      // Fases para el texto
      const ph = p < 0.28 ? 0 : p < 0.56 ? 1 : 2;
      if (ph !== lastPhase) {
        lastPhase = ph;
        setPhase(ph);
      }
      if (refs.bar.current) refs.bar.current.style.transform = `scaleY(${p})`;
      if (refs.hint.current) refs.hint.current.style.opacity = String(1 - seg(p, 0, 0.04));
      const copyOpacity = 1 - seg(p, 0.84, 0.92);
      if (refs.copy.current) refs.copy.current.style.opacity = String(copyOpacity);
      if (refs.skipBtn.current) {
        refs.skipBtn.current.style.opacity = String(copyOpacity);
        refs.skipBtn.current.style.visibility = copyOpacity < 0.05 ? "hidden" : "visible";
      }

      const img = refs.image.current;

      // ── Modo video (animación de Google Flow) ──
      if (cfg.video) {
        const v = refs.video.current;
        if (v && v.duration) {
          const t = seg(p, 0, 0.9) * (v.duration - 0.05);
          if (Math.abs(v.currentTime - t) > 1 / 60) v.currentTime = t;
        }
        if (img) {
          const o = seg(p, 0.88, 0.98);
          img.style.opacity = String(o);
          img.style.pointerEvents = o > 0.95 ? "auto" : "none";
        }
        return;
      }

      // ── Prototipo animado ──
      const p1 = seg(p, 0, 0.3);
      const p2 = seg(p, 0.28, 0.5);
      const xf = seg(p, 0.5, 0.6); // del interior al exterior
      const p3 = seg(p, 0.58, 0.75); // el objetivo se acopla
      const p4 = seg(p, 0.78, 0.97); // entramos por el cristal

      // Imagen (la portada) vista a través de la cámara
      if (img) {
        const blur = p < 0.3 ? lerp(30, 22, p1) : p < 0.5 ? lerp(22, 10, ease(p2)) : p < 0.78 ? lerp(10, 6, p3) : lerp(6, 0, seg(p, 0.78, 0.92));
        const r0 = lerp(GLASS - 2, GLASS, p1) * vmin;
        const rFinal = Math.hypot(vw, vh) / 2 + 40;
        const r = p4 > 0 ? lerp(GLASS * vmin, rFinal, easeIn(p4)) : r0;
        const done = p >= 0.97;
        img.style.clipPath = done ? "none" : `circle(${r}px at 50% 50%)`;
        img.style.filter = done || blur < 0.2 ? "none" : `blur(${blur}px) brightness(${lerp(0.55, 1, seg(p, 0.3, 0.92))})`;
        img.style.transform = done ? "none" : `scale(${lerp(1.25, 1, seg(p, 0, 0.97))})`;
        img.style.pointerEvents = done ? "auto" : "none";
      }

      // Obturador que se abre al empezar
      const sh = ease(seg(p, 0, 0.07));
      if (refs.shutterTop.current) refs.shutterTop.current.style.transform = `translateY(${-sh * 101}%)`;
      if (refs.shutterBottom.current) refs.shutterBottom.current.style.transform = `translateY(${sh * 101}%)`;

      // Interior: túnel con profundidad (los anillos cercanos se mueven más)
      if (refs.interior.current) {
        refs.interior.current.style.opacity = String(1 - xf);
        refs.interior.current.style.transform = `scale(${1 + ease(xf) * 2.2})`;
      }
      ringRefs.current.forEach((ring, i) => {
        if (ring) ring.style.transform = `translate(-50%,-50%) scale(${1 + (p1 * 0.25 + p2 * 0.15) * (i / RINGS.length) * 1.6})`;
      });
      if (refs.glass.current) {
        const g = ease(p2);
        refs.glass.current.style.opacity = String(seg(p, 0.28, 0.36));
        refs.glass.current.style.transform = `translate(-50%,-50%) scale(${lerp(5, 1, g)}) rotate(${lerp(-40, 0, g)}deg)`;
      }

      // Exterior: la cámara aparece, se acopla el objetivo y entramos por el cristal
      if (refs.exterior.current) {
        const camScale = p4 > 0 ? lerp(1, 14, easeIn(p4)) : lerp(1.7, 1, ease(xf));
        refs.exterior.current.style.opacity = String(xf * (1 - seg(p, 0.88, 0.96)));
        refs.exterior.current.style.transform = `translate(-50%, -53.226%) scale(${camScale})`;
      }
      if (refs.lens.current) {
        const l = ease(p3);
        refs.lens.current.style.opacity = String(seg(p, 0.58, 0.64));
        refs.lens.current.style.transform = `scale(${lerp(2.8, 1, l)}) rotate(${lerp(-35, 0, l)}deg)`;
      }
      if (refs.flash.current) {
        const f = seg(p, 0.74, 0.77) * (1 - seg(p, 0.77, 0.82));
        refs.flash.current.style.opacity = String(f);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, cfg.video]);

  if (skip) return <>{children}</>;

  const skipIntro = () => {
    const el = outer.current;
    if (!el) return;
    window.scrollTo({ top: el.offsetTop + el.offsetHeight - window.innerHeight, behavior: "auto" });
  };

  const copy = cfg.phases[phase];

  return (
    <div ref={outer} className="relative" style={{ height: `${cfg.length * 100 + 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#030303]">
        {/* La imagen: la portada real */}
        <div ref={refs.image} className="absolute inset-0 will-change-[clip-path,filter,transform]" style={cfg.video ? { opacity: 0, zIndex: 1 } : { clipPath: `circle(${GLASS - 2}vmin at 50% 50%)`, filter: "blur(30px) brightness(.55)" }}>
          {children}
        </div>

        {cfg.video ? (
          <video
            ref={refs.video}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            poster={cfg.poster || undefined}
            aria-hidden
          >
            {cfg.videoMobile && <source src={cfg.videoMobile} media="(max-width: 767px)" type="video/mp4" />}
            <source src={cfg.video} type="video/mp4" />
          </video>
        ) : (
          <>
            {/* FASE 1-2 · Interior de la cámara */}
            <div ref={refs.interior} className="pointer-events-none absolute inset-0 origin-center will-change-transform" aria-hidden>
              {RINGS.map((r, i) => {
                const next = RINGS[i + 1] ?? r + 30;
                return (
                  <div
                    key={r}
                    ref={(n) => {
                      ringRefs.current[i] = n;
                    }}
                    className="absolute top-1/2 left-1/2 rounded-full"
                    style={{
                      width: `${2 * next}vmin`,
                      height: `${2 * next}vmin`,
                      border: `${next - r + 0.3}vmin solid ${i % 2 ? "#0c0c0c" : "#121110"}`,
                      boxShadow: `inset 0 0 ${2 + i}vmin rgba(0,0,0,.95)${i === 1 ? ", inset 0 0 0 0.25vmin rgba(201,166,107,.35)" : ""}`,
                      transform: "translate(-50%,-50%)",
                    }}
                  />
                );
              })}
              {/* Pestañas de la bayoneta */}
              {[0, 120, 240].map((a) => (
                <div
                  key={a}
                  className="absolute top-1/2 left-1/2 h-[2.4vmin] w-[7vmin] rounded-sm bg-[#1b1a18]"
                  style={{ transform: `translate(-50%,-50%) rotate(${a}deg) translateY(-${GLASS + 1.4}vmin)`, boxShadow: "0 0 0 1px rgba(201,166,107,.25)" }}
                />
              ))}
              {/* Brillo del metal */}
              <div
                className="absolute inset-0"
                style={{ background: "conic-gradient(from 210deg at 50% 50%, transparent 0deg, rgba(201,166,107,.08) 30deg, transparent 70deg, transparent 200deg, rgba(236,232,225,.05) 230deg, transparent 260deg)" }}
              />
              {/* FASE 2 · Elemento de vidrio */}
              <div
                ref={refs.glass}
                className="absolute top-1/2 left-1/2 rounded-full opacity-0"
                style={{
                  width: `${2 * GLASS}vmin`,
                  height: `${2 * GLASS}vmin`,
                  border: "0.5vmin solid rgba(236,232,225,.18)",
                  background: "radial-gradient(circle at 34% 28%, rgba(255,255,255,.22), transparent 32%), radial-gradient(circle at 70% 76%, rgba(201,166,107,.2), transparent 30%)",
                  boxShadow: "0 0 5vmin rgba(201,166,107,.25), inset 0 0 3vmin rgba(236,232,225,.12)",
                  transform: "translate(-50%,-50%) scale(5)",
                }}
              />
            </div>

            {/* FASE 3 · Exterior: cuerpo de cámara y objetivo */}
            <div
              ref={refs.exterior}
              className="pointer-events-none absolute top-1/2 left-1/2 w-[100vmin] opacity-0 will-change-transform"
              style={{ transformOrigin: "50% 53.226%", transform: "translate(-50%, -53.226%) scale(1.7)" }}
              aria-hidden
            >
              <CameraSvg lensRef={refs.lens} flashRef={refs.flash} />
            </div>

            {/* Obturador */}
            <div ref={refs.shutterTop} className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[#030303]" style={{ boxShadow: "0 1px 0 rgba(201,166,107,.3)" }} />
            <div ref={refs.shutterBottom} className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[#030303]" />
          </>
        )}

        {/* Textos de cada fase */}
        <div ref={refs.copy} className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-10 md:pb-14">
          <div className="container-x flex items-end justify-between gap-6">
            <div key={phase} className="intro max-w-xl">
              <p className="label text-accent">{copy.label}</p>
              <p className="display mt-3 text-[clamp(2rem,5vw,4.2rem)]">{copy.title}</p>
              <p className="serif mt-2 text-[clamp(1.2rem,2.2vw,1.8rem)] text-fg/70">{copy.text}</p>
            </div>
            {/* Progreso */}
            <div className="hidden h-32 w-px bg-line-strong md:block">
              <div ref={refs.bar} className="h-full w-px origin-top bg-accent" style={{ transform: "scaleY(0)" }} />
            </div>
          </div>
        </div>

        <div ref={refs.hint} className="label pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 translate-y-[18vmin] text-center text-fg/60">
          <span className="block">Desliza para enfocar</span>
          <span className="mx-auto mt-3 block h-8 w-px animate-pulse bg-fg/40" />
        </div>

        <button ref={refs.skipBtn} type="button" onClick={skipIntro} className="label absolute top-22 right-4 z-20 border border-line-strong bg-bg/50 px-3 py-2 text-muted backdrop-blur hover:text-fg md:top-24 md:right-8">
          Saltar intro
        </button>
      </div>
    </div>
  );
}

/** Cámara vista de frente (viewBox 1000×620, centro del objetivo en 500,330). */
function CameraSvg({ lensRef, flashRef }: { lensRef: React.Ref<SVGGElement>; flashRef: React.Ref<SVGCircleElement> }) {
  return (
    <svg viewBox="0 0 1000 620" className="block h-auto w-full overflow-visible">
      <defs>
        {/* Agujero del cristal: por ahí se ve la imagen */}
        <mask id="glass-hole" maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="5000" height="5000">
          <rect x="-2000" y="-2000" width="5000" height="5000" fill="#fff" />
          <circle cx="500" cy="330" r="115" fill="#000" />
        </mask>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24221f" />
          <stop offset="0.5" stopColor="#141312" />
          <stop offset="1" stopColor="#0a0a09" />
        </linearGradient>
        <linearGradient id="grip" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0d0d0c" />
          <stop offset="1" stopColor="#1a1917" />
        </linearGradient>
        <radialGradient id="barrel" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#2b2926" />
          <stop offset="1" stopColor="#090909" />
        </radialGradient>
        <pattern id="knurl" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#121212" />
          <rect width="3" height="6" fill="#1e1d1b" />
        </pattern>
      </defs>

      <g mask="url(#glass-hole)">
        {/* Cuerpo */}
        <path d="M395 170 L425 92 Q430 82 442 82 L558 82 Q570 82 575 92 L605 170 Z" fill="url(#body)" stroke="#2c2a27" strokeWidth="2" />
        <rect x="110" y="165" width="780" height="370" rx="44" fill="url(#body)" stroke="#2c2a27" strokeWidth="2" />
        <rect x="110" y="165" width="170" height="370" rx="44" fill="url(#grip)" />
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={i} x1="128" x2="262" y1={200 + i * 17} y2={200 + i * 17} stroke="#0a0a0a" strokeWidth="5" />
        ))}
        <ellipse cx="190" cy="160" rx="34" ry="10" fill="#2a2825" />
        <rect x="170" y="140" width="40" height="18" rx="6" fill="#c9a66b" opacity=".9" />
        <rect x="700" y="140" width="90" height="26" rx="8" fill="#1f1e1c" stroke="#33312d" />
        <circle cx="330" cy="215" r="9" fill="#3a2f22" stroke="#c9a66b" strokeOpacity=".4" />
        <line x1="440" y1="110" x2="560" y2="110" stroke="#c9a66b" strokeOpacity=".25" strokeWidth="2" />
        {/* Montura */}
        <circle cx="500" cy="330" r="168" fill="#0b0b0b" stroke="#3a3833" strokeWidth="10" />
        <circle cx="500" cy="330" r="150" fill="#050505" stroke="#c9a66b" strokeOpacity=".35" strokeWidth="2" />
        <rect x="430" y="300" width="140" height="60" fill="#0e0d0c" opacity=".8" />

        {/* Objetivo (se acopla en la fase 3) */}
        <g ref={lensRef} style={{ transformOrigin: "500px 330px", transformBox: "view-box", opacity: 0 }}>
          <circle cx="500" cy="330" r="182" fill="url(#barrel)" stroke="#33312d" strokeWidth="3" />
          <circle cx="500" cy="330" r="168" fill="none" stroke="url(#knurl)" strokeWidth="22" />
          <circle cx="500" cy="330" r="148" fill="#0c0c0c" stroke="#2c2a27" strokeWidth="3" />
          <circle cx="500" cy="330" r="132" fill="#080808" stroke="#c9a66b" strokeOpacity=".5" strokeWidth="2" />
          <circle cx="500" cy="330" r="120" fill="#050505" />
          <rect x="497" y="140" width="6" height="22" fill="#c9a66b" />
          <text x="500" y="200" textAnchor="middle" fill="#8f8a82" fontSize="11" letterSpacing="4" fontFamily="monospace">
            1:1.4 · 50mm
          </text>
        </g>
      </g>

      {/* Reflejos sobre el cristal */}
      <g pointerEvents="none">
        <path d="M430 270 A 95 95 0 0 1 520 238" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="6" strokeLinecap="round" />
        <path d="M575 380 A 95 95 0 0 1 545 410" fill="none" stroke="#c9a66b" strokeOpacity=".3" strokeWidth="4" strokeLinecap="round" />
        <circle ref={flashRef} cx="500" cy="330" r="125" fill="none" stroke="#c9a66b" strokeWidth="8" opacity="0" style={{ filter: "drop-shadow(0 0 18px #c9a66b)" }} />
      </g>
    </svg>
  );
}
