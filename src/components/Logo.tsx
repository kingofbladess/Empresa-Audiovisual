import Link from "next/link";
import { site } from "@/content/site";
import { Isotipo, Logotipo } from "./brand/Brand";

/** Logo del menú y del pie: isotipo animable + logotipo. */
export function Logo({ className = "", size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const big = size === "lg";
  return (
    <Link href="/" className={`group flex items-center gap-3 text-fg ${className}`} aria-label={`${site.name}, ir al inicio`}>
      <Isotipo variant={big ? "outlined" : "white"} animate replayOnHover className={big ? "h-16 w-16" : "h-10 w-10"} />
      <Logotipo className={big ? "h-7 w-auto" : "h-[0.95rem] w-auto"} animate />
    </Link>
  );
}
