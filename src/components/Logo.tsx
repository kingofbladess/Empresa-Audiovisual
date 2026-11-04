import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

/** Logotipo provisional: usa `site.logo` si existe; si no, compone el nombre. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`} aria-label={`${site.name}, ir al inicio`}>
      {site.logo ? (
        <Image src={site.logo} alt={site.name} width={140} height={32} className="h-7 w-auto" />
      ) : (
        <>
          <span className="relative grid h-7 w-7 place-items-center border border-fg/80">
            <span className="h-3 w-3 rounded-full bg-accent" />
          </span>
          <span className="display text-xl tracking-[0.02em]">{site.name}</span>
        </>
      )}
    </Link>
  );
}
