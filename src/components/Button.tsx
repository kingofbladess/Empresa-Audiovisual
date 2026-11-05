import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon, WhatsAppIcon } from "./Icons";
import { waLink } from "@/lib/whatsapp";

type Variant = "solid" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  solid: "bg-rec text-white hover:bg-fg hover:text-bg",
  outline: "border border-line-strong text-fg hover:border-accent hover:text-accent",
  ghost: "text-fg hover:text-accent px-0!",
};

const base =
  "group inline-flex items-center gap-3 px-6 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300";

export function Button({ href, children, variant = "solid", className = "" }: { href: string; children: ReactNode; variant?: Variant; className?: string }) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/** Botón que abre WhatsApp con un mensaje ya redactado. */
export function WhatsAppButton({ message, children = "Escríbenos por WhatsApp", variant = "outline", className = "" }: { message?: string; children?: ReactNode; variant?: Variant; className?: string }) {
  return (
    <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={`${base} ${styles[variant]} ${className}`}>
      <WhatsAppIcon className="h-4 w-4" />
      {children}
    </a>
  );
}
