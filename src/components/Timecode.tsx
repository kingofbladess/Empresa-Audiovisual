"use client";

import { useEffect, useRef } from "react";

const FPS = 24;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Contador de tiempo estilo cámara (HH:MM:SS:FF a 24 fps).
 * Escribe directamente en el texto y solo corre mientras se ve: si no,
 * obligaría a repintar la página sin parar.
 */
export function Timecode() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stage = el.closest(".hero-stage"); // detrás de la intro la portada está oculta
    const start = performance.now();
    let timer = 0;
    let onScreen = false;

    const tick = () => {
      const frames = Math.floor(((performance.now() - start) / 1000) * FPS);
      const s = Math.floor(frames / FPS);
      el.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(frames % FPS)}`;
    };
    const sync = () => {
      const visible = onScreen && (!stage || stage.hasAttribute("data-revealed"));
      if (visible && !timer) {
        tick();
        timer = window.setInterval(tick, 1000 / FPS);
      } else if (!visible && timer) {
        clearInterval(timer);
        timer = 0;
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    const mo = new MutationObserver(sync);
    if (stage) mo.observe(stage, { attributes: true, attributeFilter: ["data-revealed"] });

    return () => {
      io.disconnect();
      mo.disconnect();
      clearInterval(timer);
    };
  }, []);

  return (
    <span ref={ref} className="inline-block tabular-nums [contain:content]">
      00:00:00:00
    </span>
  );
}
