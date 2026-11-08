"use client";

import { useEffect, useState } from "react";

const KEY = "xm-tema";

/** Cambia el sitio entre negro y blanco y recuerda la elección. */
export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.dataset.theme === "light");
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    const root = document.documentElement;
    if (next) root.dataset.theme = "light";
    else delete root.dataset.theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next ? "#ffffff" : "#0d0a08");
    try {
      localStorage.setItem(KEY, next ? "blanco" : "negro");
    } catch {
      // Sin almacenamiento el cambio dura solo esta visita.
    }
  };

  return (
    <button type="button" onClick={toggle} className="glass-control flex h-11 w-11 shrink-0 items-center justify-center text-fg" aria-label={light ? "Cambiar a fondo negro" : "Cambiar a fondo blanco"}>
      <svg viewBox="0 0 24 24" aria-hidden className="theme-icon h-4 w-4">
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" />
      </svg>
    </button>
  );
}

/** Se ejecuta antes de pintar para que el tema elegido no parpadee al cargar. */
export const themeScript = `try{if(localStorage.getItem("${KEY}")==="blanco"){document.documentElement.dataset.theme="light";document.querySelector('meta[name="theme-color"]')?.setAttribute("content","#ffffff")}}catch(e){}`;
