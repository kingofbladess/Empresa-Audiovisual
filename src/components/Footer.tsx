import Link from "next/link";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";
import { waLink } from "@/lib/whatsapp";

export function Footer() {
  const socials = site.social.filter((s) => s.href);
  return (
    <footer className="glass-bar">
      <div className="container-x py-14">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <Logo size="lg" />
            <p className="serif mt-6 text-3xl text-accent">{site.tagline}</p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="display mt-6 inline-block text-4xl transition-colors hover:text-accent md:text-5xl"
            >
              {site.whatsapp.display}
            </a>
            {site.email && (
              <p className="mt-2 text-muted">
                <a href={`mailto:${site.email}`} className="press inline-block py-1.5 hover:text-fg">
                  {site.email}
                </a>
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <p className="label mb-5 text-accent">Menú</p>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="press inline-block py-1.5 text-muted hover:text-fg">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {socials.length > 0 && (
            <div className="md:col-span-2">
              <p className="label mb-5 text-accent">Redes</p>
              <ul>
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="press inline-block py-1.5 text-muted hover:text-fg">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="label mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 pb-16 text-muted md:flex-row md:pb-0">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.descriptor}
          </p>
          <p>Proyectos y marcas mostrados son conceptuales salvo indicación</p>
        </div>
      </div>
    </footer>
  );
}
