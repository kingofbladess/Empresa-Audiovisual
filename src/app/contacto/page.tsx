import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { ExternalButton, WhatsAppButton } from "@/components/Button";
import { about } from "@/content/about";
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
      <PageHeader scene="Contacto" title={<>Empecemos <span className="serif text-accent">por la idea</span></>} intro="La primera reunión es sin costo. Cuéntanos dónde estás y a dónde quieres llegar: te respondemos por WhatsApp." />
      <section className="container-x grid gap-16 pb-32 lg:grid-cols-12">
        <div className="glass p-6 md:p-10 lg:col-span-7">
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>
        <aside className="lg:col-span-5">
          <div className="glass p-8">
            <p className="label text-accent">WhatsApp directo</p>
            <p className="display mt-4 text-4xl">{site.whatsapp.display}</p>
            <WhatsAppButton variant="solid" className="mt-6">Abrir chat</WhatsAppButton>
            {site.email && (
              <>
                <p className="label mt-10 text-muted">Correo</p>
                <a href={`mailto:${site.email}`} className="press mt-2 block py-1.5 text-lg hover:text-accent">{site.email}</a>
              </>
            )}
            <p className="label mt-10 text-muted">Ubicación</p>
            <p className="mt-2 text-lg">{site.location}</p>
            <p className="mt-6 text-base text-muted">{about.availability}</p>
          </div>
          <div className="glass mt-4 p-8">
            <p className="label text-accent">¿Prefieres contarnos con calma?</p>
            <p className="mt-3 text-base text-muted">Responde nuestro formulario para conocerte un poco más.</p>
            <ExternalButton href={site.typeform} className="mt-5">Abrir formulario</ExternalButton>
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
