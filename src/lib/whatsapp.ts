import { site } from "@/content/site";

/** Enlace wa.me con un mensaje ya escrito. */
export function waLink(message: string = site.whatsapp.defaultMessage) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Mensaje para consultar por un servicio concreto. */
export function serviceMessage(serviceName: string) {
  return `Hola, me interesa el servicio de ${serviceName}. Quisiera conversar sobre mi proyecto.`;
}

/** Mensaje para un tipo de cliente. */
export function clientTypeMessage(clientTypeName: string) {
  return `Hola, escribo como ${clientTypeName.toLowerCase()} y quisiera desarrollar un proyecto con el estudio.`;
}

/** Mensaje para un proyecto del portafolio. */
export function projectMessage(projectTitle: string) {
  return `Hola, vi el proyecto "${projectTitle}" en su web y quiero algo en esa línea para mi marca.`;
}

export type ContactPayload = {
  name: string;
  email: string;
  clientType: string;
  service: string;
  description: string;
};

/** Mensaje completo generado desde el formulario de contacto. */
export function contactMessage(p: ContactPayload) {
  return [
    `Hola, soy ${p.name}.`,
    p.clientType ? `Tipo de cliente: ${p.clientType}.` : null,
    p.service ? `Servicio: ${p.service}.` : null,
    "",
    p.description,
    "",
    `Correo: ${p.email}`,
  ]
    .filter((l): l is string => l !== null)
    .join("\n");
}
