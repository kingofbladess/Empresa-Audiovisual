import Image from "next/image";
import type { Media } from "@/content/types";
import { hash } from "@/lib/frame";

type Props = {
  media: Media;
  className?: string;
  /** Movimiento lento tipo travelling (para fondos y portadas). */
  drift?: boolean;
  /** Prioridad de carga (solo para la imagen principal de la página). */
  priority?: boolean;
  sizes?: string;
  /** Muestra el texto alternativo como rótulo cuando el fotograma es provisional. */
  showCaption?: boolean;
};

/**
 * Muestra una imagen o un video. Si todavía no hay archivo (`src` vacío),
 * genera un "fotograma" provisional con la paleta del contenido: luz, viñeta
 * y destello anamórfico. Así el diseño se ve completo sin fotos reales.
 */
export function Frame({ media, className = "", drift, priority, sizes = "100vw", showCaption }: Props) {
  // Si el contenedor ya viene posicionado (absolute/fixed) no añadimos "relative".
  const pos = /\b(absolute|fixed)\b/.test(className) ? "" : "relative";
  const motion = drift ? "frame-drift" : "frame-zoom transition-transform duration-[1400ms] ease-out";

  if (media.src && media.kind === "video") {
    return (
      <div className={`${pos} overflow-hidden ${className}`}>
        <video
          className={`absolute inset-0 h-full w-full object-cover ${motion}`}
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={media.alt}
        />
      </div>
    );
  }

  if (media.src) {
    return (
      <div className={`${pos} overflow-hidden ${className}`}>
        <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} className={`object-cover ${motion}`} />
      </div>
    );
  }

  const [dark, mid, light] = media.palette ?? ["#0b0b0b", "#2a2a2a", "#c9a66b"];
  const h = hash(media.alt);
  const x = 20 + (h % 60);
  const y = 18 + ((h >> 3) % 50);
  const angle = (h >> 5) % 360;
  const flareY = 30 + ((h >> 7) % 45);

  return (
    <div
      role="img"
      aria-label={media.alt}
      className={`${pos} overflow-hidden ${className}`}
      style={{ background: dark }}
    >
      <div
        className={`absolute inset-0 ${motion}`}
        style={{
          background: `radial-gradient(ellipse 55% 65% at ${x}% ${y}%, ${light}cc 0%, ${mid} 38%, ${dark} 78%),
            conic-gradient(from ${angle}deg at ${100 - x}% ${100 - y}%, ${dark}, ${mid}88, ${dark}, ${mid}55, ${dark})`,
        }}
      />
      {/* Siluetas difusas que sugieren una escena */}
      <div
        className={`absolute inset-0 opacity-70 mix-blend-multiply ${motion}`}
        style={{
          background: `radial-gradient(ellipse 18% 42% at ${(x + 22) % 90}% 78%, ${dark} 0%, transparent 70%),
            linear-gradient(180deg, transparent 55%, ${dark} 100%)`,
        }}
      />
      {/* Destello anamórfico */}
      <div
        className="absolute inset-x-0 h-px opacity-60"
        style={{ top: `${flareY}%`, background: `linear-gradient(90deg, transparent, ${light}, transparent)`, boxShadow: `0 0 24px 2px ${light}55` }}
      />
      {/* Viñeta */}
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 160px 40px rgba(0,0,0,.75)" }} />
      {showCaption && (
        <span className="label absolute bottom-3 left-3 max-w-[80%] truncate text-[0.6rem] text-white/45">
          Imagen provisional · {media.alt}
        </span>
      )}
    </div>
  );
}
