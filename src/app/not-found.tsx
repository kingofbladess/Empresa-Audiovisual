import { Button, WhatsAppButton } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pt-32">
      <p className="label text-accent">Error 404 · Toma descartada</p>
      <h1 className="display mt-6 text-[clamp(3rem,10vw,9rem)]">Esta escena<br /><span className="serif text-accent">no existe.</span></h1>
      <p className="mt-6 max-w-xl text-lg text-fg/85">Puede que el enlace haya cambiado. Vuelve al inicio o escríbenos y te ayudamos a encontrar lo que buscas.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/">Volver al inicio</Button>
        <Button href="/servicios" variant="outline">Ver servicios</Button>
        <WhatsAppButton>Escríbenos</WhatsAppButton>
      </div>
    </section>
  );
}
