/**
 * Datos generales del estudio XploreMet. Cambia aquí y se actualiza en todo el
 * sitio (menú, pie, SEO, WhatsApp). El logo animable está en src/components/brand.
 */
export const site = {
  /** Nombre de la marca. */
  name: "XploreMet Prod",
  /** Descriptor que acompaña al nombre. */
  descriptor: "Productora de estrategia y marca",
  /** Logotipo opcional en /public (SVG recomendado). Si está vacío se usa el nombre como logotipo. */
  logo: "",
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || "xploremet.com" /* provisional: confirmar dominio */,
  /** Frase principal (filosofía). */
  tagline: "La X marca la meta.",
  manifesto:
    "Construimos tu identidad desde cero, con una ruta hecha para ti y una X que marca la meta de cada etapa.",
  intro:
    "Estrategia, marca y producción audiovisual para artistas, emprendedores y empresas en crecimiento. Trazamos contigo el camino a corto, medio y largo plazo.",
  description:
    "Productora de estrategia y marca en Maracay, Venezuela. Ayudamos a artistas, emprendedores y empresas a construir su identidad desde cero, con branding, contenido audiovisual y campañas.",
  location: "Maracay, estado Aragua · Online a nivel nacional",
  /** Formulario para conocer mejor a cada cliente. */
  typeform: "https://form.typeform.com/to/vlF2ikCt",
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
      { label: "Fase 01 · El montaje", title: "Todo empieza con una idea.", text: "Cada pieza encuentra su lugar." },
      { label: "Fase 02 · El diafragma", title: "El concepto toma forma.", text: "Cada capa suma enfoque." },
      { label: "Fase 03 · Dentro del lente", title: "Y la marca se ve con claridad.", text: "Del concepto a la imagen final." },
      { label: "Fase 04 · En el set", title: "Todo listo para salir a escena.", text: "Tu marca, frente a cámara." },
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
