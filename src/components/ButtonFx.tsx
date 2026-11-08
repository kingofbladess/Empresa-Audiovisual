"use client";

import { useEffect } from "react";

/**
 * Efectos de los botones con un solo escucha para toda la página:
 * el brillo sigue al puntero (--mx/--my) y los botones principales (.btn)
 * se acercan unos píxeles hacia él (--tx/--ty). Solo con mouse.
 */
export function ButtonFx() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(".btn, .glass-control");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      if (el.classList.contains("btn") && !el.classList.contains("btn--ghost") && !reduce.matches) {
        el.style.setProperty("--tx", `${((x / r.width - 0.5) * 6).toFixed(1)}px`);
        el.style.setProperty("--ty", `${((y / r.height - 0.5) * 4).toFixed(1)}px`);
      }
    };
    const out = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(".btn");
      if (!el || el.contains(e.relatedTarget as Node | null)) return;
      el.style.removeProperty("--tx");
      el.style.removeProperty("--ty");
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", out, { passive: true });
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", out);
    };
  }, []);
  return null;
}
