"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { clientTypes } from "@/content/clientTypes";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { contactMessage, serviceMessage, waLink, type ContactPayload } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

const empty: ContactPayload = { name: "", email: "", clientType: "", service: "", description: "" };

/**
 * Formulario de contacto. Al enviarlo se abre WhatsApp con un mensaje
 * redactado a partir de las respuestas (también puede enviarse por correo).
 * Admite valores iniciales por URL: /contacto?tipo=artistas&servicio=branding
 */
export function ContactForm() {
  const params = useSearchParams();
  const [data, setData] = useState<ContactPayload>(() => ({
    ...empty,
    clientType: clientTypes.find((c) => c.slug === params.get("tipo"))?.name ?? "",
    service: services.find((s) => s.slug === params.get("servicio"))?.name ?? "",
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof ContactPayload, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof ContactPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er: typeof errors = {};
    if (data.name.trim().length < 2) er.name = "Escribe tu nombre.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) er.email = "Escribe un correo válido.";
    if (!data.clientType) er.clientType = "Elige una opción.";
    if (data.description.trim().length < 10) er.description = "Cuéntanos un poco más (mínimo 10 caracteres).";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(waLink(contactMessage(data)), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const mailto = () => {
    if (!validate()) return;
    const subject = `Proyecto: ${data.service || data.clientType} · ${data.name}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(contactMessage(data))}`;
  };

  if (sent) {
    return (
      <div className="p-2 md:p-4" role="status">
        <p className="label text-accent">Mensaje preparado</p>
        <h3 className="display mt-4 text-4xl">Gracias, {data.name.split(" ")[0]}.</h3>
        <p className="mt-4 max-w-md text-muted">
          Abrimos WhatsApp con tu mensaje listo. Solo tienes que pulsar enviar. Si no se abrió,{" "}
          <a className="text-fg underline underline-offset-4" href={waLink(contactMessage(data))} target="_blank" rel="noopener noreferrer">
            ábrelo aquí
          </a>
          .
        </p>
        <button type="button" className="glass-control label mt-8 min-h-11 px-5 py-2.5 text-fg" onClick={() => { setSent(false); setData(empty); }}>
          Escribir otro mensaje
        </button>
      </div>
    );
  }

  const err = (k: keyof ContactPayload) =>
    errors[k] && (
      <p id={`${k}-error`} className="mt-2 text-sm text-rec">
        {errors[k]}
      </p>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 md:grid-cols-2">
      <div>
        <label htmlFor="name" className="label text-muted">Nombre</label>
        <input id="name" name="name" autoComplete="name" className="field" placeholder="Tu nombre o el de tu marca" value={data.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="email" className="label text-muted">Correo electrónico</label>
        <input id="email" name="email" type="email" autoComplete="email" className="field" placeholder="tu@correo.com" value={data.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="clientType" className="label text-muted">Tipo de cliente</label>
        <select id="clientType" name="clientType" className="field" value={data.clientType} onChange={set("clientType")} aria-invalid={!!errors.clientType} aria-describedby={errors.clientType ? "clientType-error" : undefined}>
          <option value="">Selecciona…</option>
          {clientTypes.map((c) => (
            <option key={c.slug} value={c.name}>{c.name}</option>
          ))}
          <option value="Otro">Otro</option>
        </select>
        {err("clientType")}
      </div>
      <div>
        <label htmlFor="service" className="label text-muted">Servicio solicitado</label>
        <select id="service" name="service" className="field" value={data.service} onChange={set("service")}>
          <option value="">Aún no lo sé / varios</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>{s.name}</option>
          ))}
        </select>
        {data.service && (
          <a href={waLink(serviceMessage(data.service))} target="_blank" rel="noopener noreferrer" className="label mt-3 inline-flex items-center gap-2 text-accent hover:text-fg">
            <WhatsAppIcon className="h-3.5 w-3.5" /> Preguntar ya por {data.service}
          </a>
        )}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="description" className="label text-muted">Descripción del proyecto</label>
        <textarea id="description" name="description" rows={5} className="field resize-y" placeholder="¿Qué quieres crear? Objetivo, plazos, referencias…" value={data.description} onChange={set("description")} aria-invalid={!!errors.description} aria-describedby={errors.description ? "description-error" : undefined} />
        {err("description")}
      </div>
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <button type="submit" className="press inline-flex min-h-12 items-center gap-3 rounded-full bg-[#25D366] px-7 py-3 font-display text-[1.02rem] font-bold uppercase tracking-[0.08em] text-[#0a0a0a] shadow-[inset_0_1px_0_rgba(255,255,255,.4)] hover:bg-[#3be07f]">
          <WhatsAppIcon className="h-4 w-4" /> Enviar por WhatsApp
        </button>
        {site.email && (
          <button type="button" onClick={mailto} className="glass-control label min-h-12 px-5 py-2.5 text-fg">
            Enviar por correo
          </button>
        )}
      </div>
    </form>
  );
}
