import Link from "next/link";
import { nav, site } from "@/content/site";
import { services } from "@/content/services";
import { Logo } from "./Logo";
import { waLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="container-x py-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo size="lg" />
            <p className="mt-6 max-w-sm text-muted">{site.description}</p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="display mt-10 inline-block text-4xl transition-colors hover:text-accent md:text-5xl"
            >
              {site.whatsapp.display}
            </a>
            <p className="mt-2 text-muted">
              <a href={`mailto:${site.email}`} className="hover:text-fg">
                {site.email}
              </a>
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="label mb-5 text-accent">Menú</p>
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-muted hover:text-fg">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="label mb-5 text-accent">Servicios</p>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicios#${s.slug}`} className="text-muted hover:text-fg">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="label mb-5 text-accent">Redes</p>
            <ul className="space-y-2.5">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="label mt-20 flex flex-col justify-between gap-3 border-t border-line pt-6 text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.descriptor}
          </p>
          <p>Proyectos y marcas mostrados son conceptuales salvo indicación</p>
        </div>
      </div>
    </footer>
  );
}
