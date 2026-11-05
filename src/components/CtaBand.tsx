import { Button, WhatsAppButton } from "./Button";
import { Reveal } from "./Reveal";

/** Bloque final de llamada a la acción. */
export function CtaBand({ title = "¿Tienes una idea?", subtitle = "Convirtámosla en una marca.", message }: { title?: string; subtitle?: string; message?: string }) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_80%_100%,rgba(254,211,64,.18),transparent_70%)]" />
      <div className="container-x relative py-28 md:py-40">
        <Reveal>
          <p className="label mb-6 text-accent">Fin de escena · Siguiente toma</p>
          <h2 className="display text-[clamp(3rem,9vw,8.5rem)]">
            {title}
            <span className="serif mt-3 block text-[clamp(1.8rem,4.5vw,4.2rem)] text-fg/80">{subtitle}</span>
          </h2>
        </Reveal>
        <Reveal delay={150} className="mt-12 flex flex-wrap gap-3">
          <Button href="/contacto">Cuéntanos tu proyecto</Button>
          <WhatsAppButton message={message} />
        </Reveal>
      </div>
    </section>
  );
}
