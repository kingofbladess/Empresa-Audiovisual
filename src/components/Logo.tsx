import Link from "next/link";
import { site } from "@/content/site";
import { LogoReplay } from "./brand/LogoReplay";

/**
 * Logo del menú y del pie. Son archivos SVG con su propia animación (public/brand):
 * así el dibujo, muy detallado, no pesa en el HTML ni en el JavaScript de cada página.
 */
export function Logo({ className = "", size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const big = size === "lg";
  return (
    <Link href="/" className={`group flex items-center gap-3 text-fg ${className}`} aria-label={`${site.name}, ir al inicio`}>
      <LogoReplay>
        {/* Con next/image el SVG perdería su animación */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={big ? "/brand/isotipo-grande.svg" : "/brand/isotipo.svg"} alt="" width={1000} height={1000} className={`overflow-visible ${big ? "h-16 w-16" : "h-10 w-10"}`} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logotipo.svg" alt="" width={2000} height={261} className={big ? "h-7 w-auto" : "h-[0.95rem] w-auto"} />
      </LogoReplay>
    </Link>
  );
}
