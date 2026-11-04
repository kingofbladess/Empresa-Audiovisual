"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";
import { waLink } from "@/lib/whatsapp";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-18 items-center justify-between gap-6 py-4">
        <Logo />
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`label relative py-2 transition-colors hover:text-fg ${isActive(item.href) ? "text-fg" : "text-muted"}`}
                >
                  {item.label}
                  {isActive(item.href) && <span className="absolute -bottom-0.5 left-0 h-px w-full bg-accent" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="label hidden border border-line-strong px-4 py-2.5 text-fg transition-colors hover:border-accent hover:text-accent sm:block"
          >
            Hablemos
          </a>
          <button
            type="button"
            className="relative h-10 w-10 lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute left-2 right-2 h-px bg-fg transition-transform duration-300 ${open ? "top-1/2 rotate-45" : "top-[40%]"}`} />
            <span className={`absolute left-2 right-2 h-px bg-fg transition-transform duration-300 ${open ? "top-1/2 -rotate-45" : "top-[60%]"}`} />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`fixed inset-x-0 top-18 bottom-0 bg-bg transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{ height: "calc(100dvh - 4.5rem)" }}
      >
        <nav aria-label="Móvil" className="container-x flex h-full flex-col justify-between py-10">
          <ul className="space-y-2">
            {nav.map((item, i) => (
              <li key={item.href} className={open ? "intro" : ""} style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}>
                <Link href={item.href} className={`display block py-2 text-5xl ${isActive(item.href) ? "text-accent" : ""}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="label space-y-2 text-muted">
            <p>{site.descriptor}</p>
            <p>WhatsApp {site.whatsapp.display}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
