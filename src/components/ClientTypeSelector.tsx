"use client";

import Link from "next/link";
import { useState } from "react";
import type { ClientType } from "@/content/types";
import { Frame } from "./Frame";
import { ArrowIcon } from "./Icons";

/**
 * Selector de tipo de cliente. En escritorio, al pasar o enfocar una
 * categoría cambia la vista previa; al hacer clic se abre su página.
 * En móvil se muestran como tarjetas.
 */
export function ClientTypeSelector({ types }: { types: ClientType[] }) {
  const [active, setActive] = useState(0);
  const current = types[active];

  return (
    <>
      {/* Escritorio */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-12">
        <ul className="lg:col-span-6" role="list">
          {types.map((t, i) => (
            <li key={t.slug} className="border-t border-line last:border-b">
              <Link
                href={`/para/${t.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group flex items-baseline gap-6 py-6"
                aria-describedby={`ct-${t.slug}`}
              >
                <span className={`label transition-colors ${i === active ? "text-accent" : "text-muted"}`}>0{i + 1}</span>
                <span
                  className={`display text-[clamp(1.8rem,3vw,3rem)] transition-all duration-500 ${
                    i === active ? "translate-x-2 text-fg" : "text-fg/30"
                  }`}
                >
                  {t.name}
                </span>
                <ArrowIcon
                  className={`ml-auto h-6 w-6 shrink-0 transition-all duration-500 ${i === active ? "text-accent opacity-100" : "-translate-x-3 opacity-0"}`}
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className="lg:col-span-6">
          <div className="sticky top-28">
            <div className="relative aspect-[4/3] overflow-hidden">
              {types.map((t, i) => (
                <div
                  key={t.slug}
                  className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
                  aria-hidden={i !== active}
                >
                  <Frame media={t.media} drift className="h-full w-full" sizes="50vw" />
                </div>
              ))}
              <span className="label absolute top-4 left-4 bg-bg/70 px-2 py-1 text-accent backdrop-blur">{current.kicker}</span>
            </div>
            <p id={`ct-${current.slug}`} className="mt-6 max-w-lg text-lg text-fg/80">
              {current.summary}
            </p>
            <Link href={`/para/${current.slug}`} className="label mt-6 inline-flex items-center gap-3 text-accent hover:text-fg">
              Cómo te ayudamos <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>

      {/* Móvil y tablet */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:hidden" role="list">
        {types.map((t, i) => (
          <li key={t.slug}>
            <Link href={`/para/${t.slug}`} className="group relative block overflow-hidden border border-line">
              <Frame media={t.media} className="aspect-[4/3] w-full" sizes="(min-width:640px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="label mb-2 text-accent">
                  0{i + 1} · {t.kicker}
                </p>
                <p className="display text-3xl">{t.name}</p>
                <p className="mt-2 line-clamp-2 text-sm text-fg/70">{t.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
