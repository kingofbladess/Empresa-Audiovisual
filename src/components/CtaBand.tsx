import { Button, WhatsAppButton } from "./Button";
import { Reveal } from "./Reveal";

/** Bloque final de llamada a la acción. */
export function CtaBand({ title = "¿Cuál es tu X?", subtitle = "La primera reunión es sin costo", message }: { title?: string; subtitle?: string; message?: string }) {
  return (
    <section className="container-x cv py-20 md:py-32">
      <Reveal className="cta-band relative overflow-hidden p-8 md:p-14">
        <h2 className="display text-[clamp(3rem,8vw,7rem)]">
          {title}
          <span className="serif mt-3 block text-[clamp(1.5rem,3vw,2.6rem)] leading-tight">{subtitle}</span>
        </h2>
        <div className="on-dark actions mt-8 flex flex-wrap gap-3 bg-transparent">
          <Button href="/contacto">Cuéntanos tu proyecto</Button>
          <WhatsAppButton message={message} />
        </div>
      </Reveal>
    </section>
  );
}
