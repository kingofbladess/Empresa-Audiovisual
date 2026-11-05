/**
 * Datos generales del estudio XploreMet. Cambia aquí y se actualiza en todo el
 * sitio (menú, pie, SEO, WhatsApp). El logo animable está en src/components/brand.
 */
export const site = {
  /** Nombre de la marca. */
  name: "XploreMet",
  /** Descriptor que acompaña al nombre. */
  descriptor: "Estudio creativo · Productora audiovisual",
  /** Logotipo opcional en /public (SVG recomendado). Si está vacío se usa el nombre como logotipo. */
  logo: "",
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || "xploremet.com" /* provisional: confirmar dominio */,
  /** Frase principal (filosofía). */
  tagline: "No producimos imágenes. Construimos identidades.",
  manifesto:
    "No vendemos simplemente fotografías o videos. Desarrollamos conceptos, construimos identidades y transformamos ideas en marcas y experiencias audiovisuales.",
  intro:
    "Dirección cinematográfica, dirección creativa, fotografía y branding bajo un mismo techo. Acompañamos cada proyecto desde la primera idea hasta la pieza final.",
  description:
    "Estudio creativo y productora audiovisual. Desarrollamos marcas desde cero y producimos fotografía, video y contenido con dirección cinematográfica para artistas, empresas, productos y producciones.",
  location: "Venezuela",
  /** Provisional: confirmar el correo real. */
  email: "hola@xploremet.com",
  whatsapp: {
    /** Número en formato internacional, sin "+" ni espacios. */
    number: "584122927546",
    /** Como se muestra en pantalla. */
    display: "0412 292 7546",
    defaultMessage: "Hola, quiero conversar sobre un proyecto con el estudio.",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "TikTok", href: "https://tiktok.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
    { label: "Behance", href: "https://behance.net/" },
  ],
  /**
   * Video de la portada. Deja `src` vacío para usar el fondo animado provisional.
   * Cuando tengas la animación de Google Flow, ponla en /public/media/ y escribe aquí la ruta.
   */
  heroVideo: {
    /** Loop de fondo, p. ej. "/media/hero/hero.mp4" */
    src: "",
    /** Intro que se ve una vez por visita antes del loop, p. ej. "/media/hero/hero-intro.mp4" */
    introSrc: "",
    srcMobile: "",
    poster: "",
    /** Imagen fija de fondo cuando no hay video (último fotograma de la intro de la cámara). */
    image: "/media/hero/estudio.jpg",
    imageMobile: "/media/hero/estudio-movil.jpg",
  },
  /**
   * Intro de la cámara controlada por el scroll: un video con las 3 escenas unidas. `enabled: false` la desactiva y la portada aparece
   * directamente. Para cambiar las escenas, ver el README.
   */
  cameraIntro: {
    enabled: true,
    video: "/media/intro/escenas-v2.mp4",
    videoMobile: "/media/intro/escenas-movil-v2.mp4",
    poster: "/media/intro/escenas-poster.jpg",
    /** Duración del video en segundos. */
    videoDuration: 22.75,
    /** Segundo del video en que empieza la fase 2 y la fase 3 (para cambiar los textos). */
    videoPhases: [7.67, 15.09],
    /** Largo del recorrido de scroll, en pantallas. */
    length: 6,
    phases: [
      { label: "Fase 01 · El montaje", title: "Todo empieza con una idea.", text: "Cada pieza encuentra su lugar." },
      { label: "Fase 02 · El diafragma", title: "El concepto toma forma.", text: "Cada capa suma enfoque." },
      { label: "Fase 03 · Dentro del lente", title: "Y la marca se ve con claridad.", text: "Del concepto a la imagen final." },
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
