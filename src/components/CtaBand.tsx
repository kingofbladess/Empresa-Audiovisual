import { Button, WhatsAppButton } from "./Button";
import { Reveal } from "./Reveal";
import { site } from "@/content/site";

/** Bloque final de llamada a la acción. */
export function CtaBand({ title = "¿Cuál es tu X?", subtitle = "La primera reunión es sin costo.", message }: { title?: string; subtitle?: string; message?: string }) {
  return (
    <section className="container-x cv py-20 md:py-32">
      <Reveal className="glass relative overflow-hidden p-8 md:p-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_90%_at_90%_100%,rgba(254,211,64,.2),transparent_70%)]" />
        <div className="relative">
          <p className="label mb-5 text-accent">Fin de escena · Siguiente toma</p>
          <h2 className="display text-[clamp(3.4rem,10vw,9.5rem)]">
            {title}
            <span className="serif mt-4 block text-[clamp(1.6rem,3.6vw,3.2rem)] leading-tight text-fg/90">{subtitle}</span>
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/contacto">Cuéntanos tu proyecto</Button>
            <WhatsAppButton message={message} />
          </div>
          <a href={site.typeform} target="_blank" rel="noopener noreferrer" className="press mt-5 inline-block py-2 text-fg/85 underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent">
            ¿Prefieres contarnos con calma? Responde el formulario
          </a>
        </div>
      </Reveal>
    </section>
  );
}
