"use client";

import { useState } from "react";
import { ISO_VIEWBOX, LOGO_VIEWBOX, IsoFigure, IsoFlag, IsoRing, IsoStick, IsoTicks, IsoX, LogoLetters, LogoM, LogoX } from "./paths";

/*
 * Logo animable de XploreMet (SVG por piezas).
 * Animación de entrada: la retícula enfoca, las marcas se cierran, la X entra,
 * la flecha crece, el asta sube y la bandera ondea (en bucle, muy suave).
 * Las animaciones están en globals.css (clases .xm-*). Con "reducir movimiento"
 * el logo aparece quieto.
 */

type IsoProps = {
  className?: string;
  /** Reproduce la animación de entrada. */
  animate?: boolean;
  /** Vuelve a animarse al pasar el ratón. */
  replayOnHover?: boolean;
  /**
   * "outlined": figura negra con borde blanco (versión oficial sobre negro, para tamaños grandes).
   * "white": figura y marcas en blanco (para tamaños pequeños sobre fondo oscuro).
   * "color": versión base sobre fondo claro.
   */
  variant?: "outlined" | "white" | "color";
  title?: string;
};

export function Isotipo({ className = "", animate = false, replayOnHover = false, variant = "outlined", title = "XploreMet" }: IsoProps) {
  const [run, setRun] = useState(0);
  const dark = variant === "color" ? "#000" : variant === "white" ? "#f2f0ec" : "#000";
  const stroke = variant === "outlined" ? { stroke: "#f2f0ec", strokeWidth: 9, paintOrder: "stroke" as const } : {};
  return (
    <svg
      key={run}
      viewBox={ISO_VIEWBOX}
      role="img"
      aria-label={title}
      className={`${animate || run ? "xm-anim" : ""} overflow-visible ${className}`}
      onMouseEnter={replayOnHover ? () => setRun((r) => r + 1) : undefined}
    >
      <g className="xm-ring" fill="#858484">
        <IsoRing />
      </g>
      <g className="xm-ticks" fill={dark} {...stroke}>
        <IsoTicks />
      </g>
      <g className="xm-x" fill="#E53946">
        <IsoX />
      </g>
      <g className="xm-stick" fill="#8C5F3E" {...stroke}>
        <IsoStick />
      </g>
      <g className="xm-figure" fill={dark} {...stroke}>
        <IsoFigure />
      </g>
      <g className="xm-flag" fill="#FED340">
        <IsoFlag />
      </g>
    </svg>
  );
}

type LogoProps = { className?: string; animate?: boolean; title?: string; mono?: boolean };

/** Logotipo XPLOREMET: X roja y M amarilla, resto en blanco (o todo blanco con `mono`). */
export function Logotipo({ className = "", animate = false, title = "XploreMet", mono = false }: LogoProps) {
  return (
    <svg viewBox={LOGO_VIEWBOX} role="img" aria-label={title} className={`${animate ? "xm-anim" : ""} overflow-visible ${className}`}>
      <g className="xm-word-x" fill={mono ? "currentColor" : "#E53946"}>
        <LogoX />
      </g>
      <g className="xm-word" fill="currentColor">
        <LogoLetters />
      </g>
      <g className="xm-word-m" fill={mono ? "currentColor" : "#FED340"}>
        <LogoM />
      </g>
    </svg>
  );
}
