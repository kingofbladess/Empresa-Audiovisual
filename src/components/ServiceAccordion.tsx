"use client";

import { useEffect } from "react";
import { services } from "@/content/services";
import { serviceMessage } from "@/lib/whatsapp";
import { Button, WhatsAppButton } from "./Button";
import { XMark } from "./Icons";

/** Lista de servicios: de entrada solo el nombre y su promesa; el detalle se abre uno a la vez. */
export function ServiceAccordion() {
  // Los enlaces a /servicios#algo deben abrir ese servicio.
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ block: "start" });
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return (
    <div className="border-t border-line">
      {services.map((s) => (
        <details key={s.slug} id={s.slug} name="servicios" className="service group scroll-mt-24 border-b border-line">
          <summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 py-4 [&::-webkit-details-marker]:hidden">
            <span className="label w-7 shrink-0 text-accent">{s.index}</span>
            <span className="min-w-0 flex-1">
              <span className="display block text-[clamp(1.6rem,2.6vw,2.25rem)] transition-colors group-hover:text-accent">{s.name}</span>
              <span className="mt-1 block text-base text-muted">{s.short}</span>
            </span>
            {s.price && <span className="label hidden shrink-0 text-sand sm:block">{s.price}</span>}
            <span aria-hidden className="service__mark shrink-0 text-accent">
              <XMark className="h-4 w-4" />
            </span>
          </summary>
          <div className="grid gap-6 pb-8 md:grid-cols-2 md:pl-11">
            <ul className="grid gap-2" role="list">
              {s.items.map((item) => (
                <li key={item} className="flex gap-3 text-base text-muted">
                  <span className="mt-[0.7em] h-0.5 w-3 shrink-0 bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div>
              <p className="font-semibold text-fg">{s.goal}</p>
              {s.price && <p className="label mt-3 text-sand sm:hidden">{s.price}</p>}
              <div className="mt-5 flex flex-wrap gap-3">
                <WhatsAppButton message={serviceMessage(s.name)} variant="solid">Consultar</WhatsAppButton>
                <Button href={`/contacto?servicio=${s.slug}`} variant="outline">Formulario</Button>
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
