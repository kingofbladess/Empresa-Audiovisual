/**
 * Datos generales del estudio. El nombre y el logotipo son PROVISIONALES:
 * cámbialos aquí y se actualizan en todo el sitio (menú, pie, SEO, WhatsApp).
 */
export const site = {
  /** Nombre provisional del estudio. */
  name: "UMBRAL",
  /** Descriptor que acompaña al nombre. */
  descriptor: "Estudio creativo · Productora audiovisual",
  /** Logotipo opcional en /public (SVG recomendado). Si está vacío se usa el nombre como logotipo. */
  logo: "",
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || "umbral.studio",
  /** Frase principal (filosofía). */
  tagline: "No producimos imágenes. Construimos identidades.",
  manifesto:
    "No vendemos simplemente fotografías o videos. Desarrollamos conceptos, construimos identidades y transformamos ideas en marcas y experiencias audiovisuales.",
  intro:
    "Dirección cinematográfica, dirección creativa, fotografía y branding bajo un mismo techo. Acompañamos cada proyecto desde la primera idea hasta la pieza final.",
  description:
    "Estudio creativo y productora audiovisual. Desarrollamos marcas desde cero y producimos fotografía, video y contenido con dirección cinematográfica para artistas, empresas, productos y producciones.",
  location: "Venezuela",
  email: "hola@umbral.studio",
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
    src: "",
    srcMobile: "",
    poster: "",
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
