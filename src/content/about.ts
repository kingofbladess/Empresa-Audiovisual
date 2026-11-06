import type { ServiceSlug } from "./types";

/** Contenido institucional (portada, Servicios y Nosotros). */
export const about = {
  proposition:
    "Ayudamos a artistas, emprendedores, marcas emergentes y empresas en crecimiento a construir su identidad desde cero. Diseñamos una ruta específica para cada cliente, con metas a corto, medio y largo plazo, y una X que marca el objetivo de cada etapa.",
  mission:
    "Ayudar a negocios emergentes a dar el primer paso o reconectar con su esencia, creando su identidad, definiendo sus objetivos y diseñando su camino hacia el crecimiento.",
  vision:
    "Consolidarnos en Maracay, estado Aragua, como una productora de estrategia y marca reconocida por su acompañamiento personalizado, ofreciendo más servicios a futuro, con proyección nacional e internacional.",
  audience: "Artistas, emprendedores, negocios y marcas que buscan iniciar, redefinir o expandir su presencia.",
  team: "Somos un grupo multidisciplinario de creadores de contenido, cineastas, productores, estrategas, diseñadores y expertos en branding.",
  availability: "Estamos activos en varios proyectos, acompañando procesos semana a semana por vía online.",
  /** Valores y su color de marca. */
  values: [
    { name: "Respeto", color: "var(--gris)", text: "Escuchamos cada historia antes de proponer." },
    { name: "Optimismo", color: "var(--accent)", text: "Vemos oportunidades donde otros ven límites." },
    { name: "Resiliencia", color: "var(--cafe)", text: "Seguimos en la ruta aunque el camino cambie." },
    { name: "Unión", color: "var(--fg)", text: "Creamos con el cliente, no solo para él." },
    { name: "Valentía", color: "var(--rec)", text: "Damos el primer paso y te acompañamos en el tuyo." },
  ],
  archetypes: [
    { name: "Héroe", text: "Superamos los desafíos junto al cliente." },
    { name: "Explorador", text: "Curiosos, visionarios y creativos." },
  ],
  /** Proceso de trabajo. */
  method: [
    { step: "01", name: "Diagnóstico e inmersión", text: "Conocemos tu negocio desde su esencia: funcionamiento, clientela y necesidades reales. Investigamos el mercado y la competencia para proponer un posicionamiento estratégico." },
    { step: "02", name: "Diseño de ruta y objetivos", text: "Trazamos contigo un plan con metas claras y realistas, según el estado de tu negocio, tu equipo, tu presupuesto y tus oportunidades de crecimiento." },
    { step: "03", name: "Creación de marca y estética", text: "Desarrollamos el concepto, la estética y la presencia de tu marca, física y digital, junto a diseñadores, estrategas y creativos." },
    { step: "04", name: "Lanzamiento y campañas", text: "Ejecutamos el lanzamiento o relanzamiento con campañas online y offline, contenido audiovisual y análisis de métricas, hasta lograr posicionamiento, ventas y crecimiento." },
  ],
  /** Cómo empieza la relación con un cliente. */
  start: [
    { name: "Nos contactas", text: "Por WhatsApp, por el formulario o por Instagram." },
    { name: "Reunión sin costo", text: "Nos conocemos, sin compromiso." },
    { name: "Definimos la meta", text: "Hablamos de tu estado actual, a dónde quieres ir y qué te duele hoy." },
    { name: "Costo por secciones", text: "Solo pagas los servicios que de verdad necesitas." },
  ],
  /** Situaciones en las que suele estar un cliente. Cada una lleva a un servicio. */
  situations: [
    { title: "Quieres empezar y no sabes por dónde", text: "Tienes una idea, un capital o ganas de hacer contenido, pero te falta el primer paso.", service: "estrategia-empresarial" },
    { title: "Tu negocio se mueve, pero sin rumbo", text: "Tienes varios frentes abiertos y necesitas norte y dirección para crecer.", service: "direccion-creativa" },
    { title: "Tu marca no tiene voz en redes", text: "No cuentas con creadores de contenido, editores ni diseñadores.", service: "contenido" },
    { title: "Eres artista y quieres crecer", text: "Tienes redes, pero no sabes crear contenido, darte a conocer ni escalar tu carrera.", service: "artistas" },
    { title: "Vendes en línea sin orden", text: "No tienes fotógrafo, orden ni estrategia de venta.", service: "productos-ventas" },
    { title: "Estás listo para darle play", text: "Tienes todo para tu próxima marca, campaña o evento, y buscas quién lo dirija.", service: "campanas" },
  ] satisfies { title: string; text: string; service: ServiceSlug }[],
};
