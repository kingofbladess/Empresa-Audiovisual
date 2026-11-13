export type MapPoint = {
  /** Nombre corto que se lee sobre el mapa. */
  name: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  /** Posición en % sobre el mapa ancho (escritorio). */
  x: number;
  y: number;
  /** Posición en % sobre el mapa vertical (móvil). */
  mx: number;
  my: number;
};

/** Los puntos clave del camino con un cliente, en orden. */
export const mapPoints: MapPoint[] = [
  { name: "Salida", title: "Reunión sin costo", text: "Nos conocemos y hablamos de tu meta, sin compromiso.", href: "/contacto", cta: "Agenda la reunión", x: 8, y: 86, mx: 8, my: 93 },
  { name: "Diagnóstico", title: "Diagnóstico", text: "Conocemos tu negocio, tu mercado y tu competencia.", href: "/servicios#estudio-mercado", cta: "Ver estudio de mercado", x: 24, y: 36, mx: 52, my: 78 },
  { name: "Ruta", title: "Ruta y objetivos", text: "Trazamos un plan con metas claras y realistas.", href: "/servicios#estrategia-empresarial", cta: "Ver estrategia", x: 41, y: 76, mx: 8, my: 62 },
  { name: "Marca", title: "Marca y estética", text: "Creamos tu concepto, tu imagen y tu presencia.", href: "/servicios#branding", cta: "Ver branding", x: 58, y: 26, mx: 52, my: 46 },
  { name: "Lanzamiento", title: "Lanzamiento", text: "Salimos con campañas, contenido y métricas.", href: "/servicios#campanas", cta: "Ver campañas", x: 74, y: 66, mx: 8, my: 30 },
  { name: "Meta", title: "La X marca la meta", text: "Cada etapa tiene su X: corto, medio y largo plazo.", href: "/trabajo", cta: "Ver proyectos", x: 90, y: 16, mx: 52, my: 14 },
];
