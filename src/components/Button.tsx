import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon, WhatsAppIcon } from "./Icons";
import { waLink } from "@/lib/whatsapp";

type Variant = "solid" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  solid: "btn btn--solid press",
  outline: "btn glass-control text-fg",
  ghost: "btn btn--ghost press text-fg hover:text-accent px-0!",
};

const base =
  "group inline-flex min-h-12 items-center gap-3 rounded-full px-7 py-3 font-display text-[1.02rem] font-bold uppercase tracking-[0.08em]";

export function Button({ href, children, variant = "solid", className = "" }: { href: string; children: ReactNode; variant?: Variant; className?: string }) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
      <span className="btn__arrow" aria-hidden>
        <ArrowIcon className="h-4 w-4" />
        <ArrowIcon className="h-4 w-4" />
      </span>
    </Link>
  );
}

/** Botón que abre WhatsApp con un mensaje ya redactado. */
export function WhatsAppButton({ message, children = "Escríbenos por WhatsApp", variant = "outline", className = "" }: { message?: string; children?: ReactNode; variant?: Variant; className?: string }) {
  return (
    <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={`${base} ${styles[variant]} ${className}`}>
      <WhatsAppIcon className="btn__icon h-4 w-4" />
      {children}
    </a>
  );
}

/** Botón hacia un sitio externo (se abre en otra pestaña). */
export function ExternalButton({ href, children, variant = "outline", className = "" }: { href: string; children: ReactNode; variant?: Variant; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles[variant]} ${className}`}>
      {children}
      <span className="btn__arrow" aria-hidden>
        <ArrowIcon className="h-4 w-4" />
        <ArrowIcon className="h-4 w-4" />
      </span>
    </a>
  );
}
