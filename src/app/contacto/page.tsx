import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/Button";
import { site } from "@/content/site";
import { clientTypes } from "@/content/clientTypes";
import { clientTypeMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Escríbenos por WhatsApp al ${site.whatsapp.display} o cuéntanos tu proyecto en el formulario.`,
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader scene="Contacto" title={<>Empecemos <span className="serif text-accent">por la idea</span></>} intro="Cuéntanos qué quieres construir. Te respondemos por WhatsApp o por correo." />
      <section className="container-x grid gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="border border-line p-8">
            <p className="label text-accent">WhatsApp directo</p>
            <p className="display mt-4 text-4xl">{site.whatsapp.display}</p>
            <WhatsAppButton variant="solid" className="mt-6">Abrir chat</WhatsAppButton>
            <p className="label mt-10 text-muted">Correo</p>
            <a href={`mailto:${site.email}`} className="mt-2 block text-lg hover:text-accent">{site.email}</a>
            <p className="label mt-10 text-muted">Ubicación</p>
            <p className="mt-2 text-lg">{site.location}</p>
          </div>
          <div className="mt-8">
            <p className="label mb-4 text-muted">Escribir según tu perfil</p>
            <ul className="space-y-2">
              {clientTypes.map((c) => (
                <li key={c.slug}>
                  <WhatsAppButton message={clientTypeMessage(c.name)} variant="ghost" className="py-2! text-left normal-case! tracking-normal! text-base! font-normal!">
                    {c.name}
                  </WhatsAppButton>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
