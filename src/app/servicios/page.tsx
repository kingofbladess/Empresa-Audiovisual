import type { Metadata } from "next";
import { PageHeader } from "@/components/SectionHeading";
import { ServiceAccordion } from "@/components/ServiceAccordion";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Estrategia, estudio de mercado, branding, manual de marca, contenido, campañas y acompañamiento. Cada servicio tiene una meta concreta y se cotiza por secciones.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      <PageHeader scene="Servicios" title={<>Cada servicio tiene <span className="serif text-accent">su X</span></>} intro="Eliges lo que tu marca necesita hoy y sumas lo demás cuando llegue el momento." />

      <section className="container-x pb-10">
        <ServiceAccordion />
      </section>

      <CtaBand title="¿No sabes por dónde empezar?" subtitle="Te ayudamos a encontrar tu X" />
    </>
  );
}
