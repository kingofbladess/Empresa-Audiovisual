/**
 * Tipos de todo el contenido editable del sitio.
 * Para actualizar textos, proyectos, equipo o clientes NO hace falta tocar
 * componentes: basta con editar los archivos de esta carpeta (src/content).
 */

/** Imagen o video. Si `src` está vacío se muestra un "fotograma" generado con la paleta. */
export type Media = {
  /** Ruta dentro de /public (p. ej. "/media/proyectos/eco/portada.jpg") o URL completa. */
  src?: string;
  /** "image" (por defecto) o "video" (mp4/webm, se reproduce en bucle y sin sonido). */
  kind?: "image" | "video";
  /** Texto alternativo para accesibilidad y SEO. */
  alt: string;
  /** Imagen fija que se muestra mientras carga un video. */
  poster?: string;
  /** Colores del fotograma provisional (de oscuro a claro). */
  palette?: [string, string, string];
};

export type ServiceSlug =
  | "estrategia-empresarial"
  | "direccion-creativa"
  | "estudio-mercado"
  | "branding"
  | "grafica-manual"
  | "contenido"
  | "identidad-audiovisual"
  | "campanas"
  | "productos-ventas"
  | "expansion-redes"
  | "artistas"
  | "acompanamiento";

export type Service = {
  slug: ServiceSlug;
  /** Número de orden que se muestra como "01", "02"… */
  index: string;
  name: string;
  short: string;
  description: string;
  items: string[];
  /** "La X": la meta concreta del servicio. */
  goal: string;
  /** Precio orientativo. Vacío = no se muestra. */
  price: string;
};

export type ClientTypeSlug = "artistas" | "empresas" | "productos" | "cine" | "emprendedores";

export type ClientType = {
  slug: ClientTypeSlug;
  name: string;
  /** Línea corta para la tarjeta. */
  kicker: string;
  summary: string;
  /** Titular de su página especializada. */
  headline: string;
  intro: string;
  /** Qué hacemos por este tipo de cliente. */
  offer: { title: string; text: string }[];
  /** Servicios relacionados (se enlazan automáticamente). */
  services: ServiceSlug[];
  /** Categorías del portafolio que se muestran en su página. */
  workCategories: WorkCategory[];
  media: Media;
};

export type WorkCategory =
  | "marcas-personales"
  | "marcas-comerciales"
  | "identidad-corporativa"
  | "fotografia-productos"
  | "campanas"
  | "videoclips"
  | "cortometrajes"
  | "cine"
  | "direccion-creativa"
  | "redes";

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  /** true = proyecto conceptual/demostrativo (se rotula como tal en todo el sitio). */
  demo: boolean;
  categories: WorkCategory[];
  services: ServiceSlug[];
  clientType: ClientTypeSlug;
  /** Una línea para la tarjeta. */
  logline: string;
  concept: string;
  process: { step: string; text: string }[];
  result: string;
  cover: Media;
  gallery: Media[];
  /** Video principal opcional (YouTube/Vimeo embebible o archivo mp4). */
  video?: { src: string; kind: "file" | "embed"; poster?: string };
  credits?: { role: string; name: string }[];
  featured?: boolean;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  /** Función dentro de los proyectos. */
  inProjects: string;
  photo: Media;
  /** true = perfil de ejemplo, pendiente de sustituir por una persona real. */
  placeholder: boolean;
  links?: { label: string; href: string }[];
};

export type ClientLogo = {
  name: string;
  sector: string;
  /** Logo en /public (SVG o PNG con fondo transparente). Si falta se muestra el nombre. */
  logo?: string;
  href?: string;
  demo: boolean;
};

export type JournalEntry = {
  slug: string;
  title: string;
  date: string;
  tag: "Detrás de cámaras" | "En desarrollo" | "Proceso" | "Equipo";
  excerpt: string;
  media: Media;
  demo: boolean;
};
