"use client";

import type { ReactNode } from "react";

/** Repite la animación del logo al pasar el ratón: volver a asignar el SVG la reinicia, sin descargarlo. */
export function LogoReplay({ children }: { children: ReactNode }) {
  return (
    <span
      className="contents"
      onMouseEnter={(e) => {
        e.currentTarget.querySelectorAll("img").forEach((img) => {
          const src = img.src;
          img.src = "";
          img.src = src;
        });
      }}
    >
      {children}
    </span>
  );
}
