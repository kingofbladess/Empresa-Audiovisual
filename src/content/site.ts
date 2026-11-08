/**
 * Datos generales del estudio XploreMet. Cambia aquí y se actualiza en todo el
 * sitio (menú, pie, SEO, WhatsApp). El logo animable está en src/components/brand.
 */
export const site = {
  /** Nombre de la marca. */
  name: "XploreMet Prod",
  /** Descriptor que acompaña al nombre. */
  descriptor: "Productora de estrategia y marca",
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || "xploremet.com" /* provisional: confirmar dominio */,
  /** Frase principal (filosofía). */
  tagline: "La X marca la meta",
  manifesto:
    "Construimos tu identidad desde cero, con una ruta hecha para ti y una X que marca la meta de cada etapa.",
  intro:
    "Estrategia, marca y producción audiovisual para artistas, emprendedores y empresas en crecimiento. Trazamos contigo el camino a corto, medio y largo plazo.",
  description:
    "Productora de estrategia y marca en Maracay, Venezuela. Ayudamos a artistas, emprendedores y empresas a construir su identidad desde cero, con branding, contenido audiovisual y campañas.",
  location: "Maracay, estado Aragua · Online a nivel nacional",
  /** Formulario para conocer mejor a cada cliente. */
  typeform: "https://form.typeform.com/to/vlF2ikCt",
  /** Correo de contacto. Vacío = no se muestra ni se ofrece enviar por correo. */
  email: "",
  whatsapp: {
    /** Número en formato internacional, sin "+" ni espacios. */
    number: "584122927546",
    /** Como se muestra en pantalla. */
    display: "0412 292 7546",
    defaultMessage: "Hola, quiero conversar sobre un proyecto con el estudio.",
  },
  /** Enlace completo a cada perfil. Las redes sin enlace no se muestran. */
  social: [
    { label: "Instagram", href: "" },
    { label: "TikTok", href: "" },
    { label: "YouTube", href: "" },
    { label: "Behance", href: "" },
  ],
  /** Fondo de la portada: el último fotograma de la intro. */
  heroImage: {
    image: "/media/hero/set-final.jpg",
    imageMobile: "/media/hero/set-final-movil.jpg",
  },
  /**
   * Intro de la cámara controlada por el scroll: un video con las 4 escenas unidas. `enabled: false` la desactiva y la portada aparece
   * directamente. Para cambiar las escenas, ver el README.
   */
  cameraIntro: {
    enabled: true,
    /**
     * Carpeta con una parte por fase, en 3 versiones: hd, sd y movil (hd-1.mp4 … movil-4.mp4).
     * Usa siempre una carpeta nueva al cambiar los videos (ver README).
     */
    videoBase: "/media/intro/v4",
    /** Duración de cada parte, en segundos (cuadros / 24). */
    videoParts: [184 / 24, 178 / 24, 178 / 24, 184 / 24],
    poster: "/media/intro/escenas-poster.jpg",
    /** Largo del recorrido de scroll, en pantallas. */
    length: 8,
    phases: [
      { title: "Todo empieza con una idea", text: "Cada pieza encuentra su lugar", tags: ["Idea", "Público", "Objetivo"] },
      { title: "El concepto toma forma", text: "Cada capa suma enfoque", tags: ["Guion", "Moodboard", "Storyboard"] },
      { title: "Y la marca se ve con claridad", text: "Del concepto a la imagen final", tags: ["Identidad", "Color", "Estética"] },
      { title: "Todo listo para salir a escena", text: "Tu marca, frente a cámara", tags: ["Rodaje", "Edición", "Lanzamiento"] },
    ],
  },
};

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/trabajo", label: "Nuestro trabajo" },
  { href: "/equipo", label: "Nuestro equipo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];
