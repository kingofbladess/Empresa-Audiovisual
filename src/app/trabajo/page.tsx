import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/SectionHeading";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CtaBand } from "@/components/CtaBand";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Nuestro trabajo",
  description: "Portafolio de branding, videoclips, campañas, fotografía de productos, cortometrajes y dirección creativa.",
  alternates: { canonical: "/trabajo" },
};

export default function TrabajoPage() {
  const demoCount = projects.filter((p) => p.demo).length;
  return (
    <>
      <PageHeader
        scene="Nuestro trabajo"
        title={<>Ideas <span className="serif text-accent">en movimiento</span></>}
        intro="Marcas, campañas, videoclips y producciones. Filtra por categoría para explorar."
      />
      <section className="container-x pb-32">
        {demoCount > 0 && (
          <p className="mb-10 max-w-3xl border-l-2 border-accent pl-4 text-sm text-muted">
            Los proyectos marcados como <span className="text-accent">“Proyecto conceptual”</span> son ejercicios demostrativos del estudio, creados para
            mostrar nuestro proceso. No corresponden a clientes reales.
          </p>
        )}
        <Suspense>
          <PortfolioGrid projects={projects} />
        </Suspense>
      </section>
      <CtaBand />
    </>
  );
}
