import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pt-32">
      <p className="label text-accent">Error 404 · Toma descartada</p>
      <h1 className="display mt-6 text-[clamp(3rem,10vw,9rem)]">Esta escena<br /><span className="serif text-fg/60">no existe.</span></h1>
      <div className="mt-10"><Button href="/">Volver al inicio</Button></div>
    </section>
  );
}
