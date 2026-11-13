"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { waLink } from "@/lib/whatsapp";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [overVideo, setOverVideo] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sobre la intro el menú no difumina el video (ver .glass-bar en globals.css).
  useEffect(() => {
    const intro = document.querySelector("[data-intro]");
    setOverVideo(!!intro);
    if (!intro) return;
    const io = new IntersectionObserver(([entry]) => setOverVideo(entry.isIntersecting));
    io.observe(intro);
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      data-over-video={overVideo || undefined}
      className={`site-header fixed inset-x-0 top-0 z-50 transition-all duration-500 ${overVideo ? "on-dark" : ""} ${
        scrolled || open ? "glass-bar" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-18 items-center justify-between gap-6 py-4">
        <Logo />
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-3">
            {nav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`nav-frame label hover:text-fg ${isActive(item.href) ? "text-fg" : "text-muted"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--solid press label hidden min-h-11 items-center gap-2.5 rounded-full px-5 py-2.5 sm:inline-flex"
          >
            <span aria-hidden className="rec-dot h-2 w-2 rounded-full bg-current! shadow-none!" />
            Hablemos
          </a>
          <button
            type="button"
            className="press relative h-11 w-11 lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute left-2 right-2 h-px bg-fg transition-transform duration-300 ${open ? "top-1/2 rotate-45" : "top-[40%]"}`} />
            <span className={`absolute left-2 right-2 h-px bg-fg transition-transform duration-300 ${open ? "top-1/2 -rotate-45" : "top-[60%]"}`} />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        className={`fixed inset-x-0 top-18 bottom-0 bg-bg text-fg transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{ height: "calc(100dvh - 4.5rem)" }}
      >
        {/* Franja de claqueta */}
        <div aria-hidden className="slate-stripes h-3" />
        <nav aria-label="Móvil" className="container-x flex h-[calc(100%-0.75rem)] flex-col justify-between py-8">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href} className={open ? "intro" : ""} style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}>
                <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={`nav-frame display text-[clamp(2rem,11vw,2.6rem)] whitespace-normal! ${isActive(item.href) ? "text-accent" : ""}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hud space-y-2 text-muted">
            <p className="flex items-center gap-2 text-fg">
              <span aria-hidden className="rec-dot h-2 w-2 rounded-full" /> {site.descriptor}
            </p>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="press inline-block py-2 hover:text-accent">
              WhatsApp {site.whatsapp.display}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
