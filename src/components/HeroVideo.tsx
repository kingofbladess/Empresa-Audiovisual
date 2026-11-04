"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; srcMobile?: string; introSrc?: string; poster?: string };

/**
 * Video de portada. Si hay `introSrc`, la intro se reproduce una sola vez por
 * sesión y al terminar pasa al loop (el último fotograma de la intro debe ser
 * igual al primero del loop). Con "reducir movimiento" activo solo se muestra el póster.
 */
export function HeroVideo({ src, srcMobile, introSrc, poster }: Props) {
  const [phase, setPhase] = useState<"intro" | "loop" | "still">("loop");
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setPhase("still");
    let seen = false;
    try {
      seen = sessionStorage.getItem("hero-intro") === "1";
    } catch {}
    if (introSrc && !seen && window.innerWidth >= 768) setPhase("intro");
  }, [introSrc]);

  useEffect(() => {
    ref.current?.play().catch(() => {});
  }, [phase]);

  if (phase === "still" && poster) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt="" className="h-full w-full object-cover" />;
  }

  if (phase === "intro" && introSrc) {
    return (
      <video
        key="intro"
        ref={ref}
        className="h-full w-full object-cover"
        src={introSrc}
        poster={poster}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => {
          try {
            sessionStorage.setItem("hero-intro", "1");
          } catch {}
          setPhase("loop");
        }}
      />
    );
  }

  return (
    <video key="loop" ref={ref} className="h-full w-full object-cover" autoPlay muted loop playsInline poster={poster} preload="auto">
      {srcMobile && <source src={srcMobile} media="(max-width: 767px)" type="video/mp4" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
