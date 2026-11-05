import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "direccion-creativa",
    index: "01",
    name: "Dirección creativa",
    short: "La idea que ordena todo lo demás.",
    description:
      "Definimos el concepto, el tono y el lenguaje visual de un proyecto para que cada pieza, desde una foto hasta una campaña, cuente la misma historia.",
    items: [
      "Desarrollo de conceptos creativos",
      "Dirección de arte",
      "Conceptualización visual",
      "Storytelling de marca",
      "Desarrollo de campañas",
      "Identidad y coherencia visual",
    ],
    media: { alt: "Mesa de dirección de arte con referencias visuales", palette: ["#0d0b09", "#3a2a1c", "#FED340"] },
  },
  {
    slug: "direccion-cinematografica",
    index: "02",
    name: "Dirección cinematográfica",
    short: "Pensar cada plano como cine.",
    description:
      "Dirigimos proyectos audiovisuales con criterio narrativo: escenas, luz, encuadre y ritmo al servicio de una historia.",
    items: [
      "Dirección de proyectos audiovisuales",
      "Desarrollo de conceptos cinematográficos",
      "Dirección de escenas",
      "Narrativa visual",
      "Dirección de fotografía",
      "Supervisión creativa de producciones",
    ],
    media: { alt: "Set de rodaje con cámara de cine", palette: ["#07090c", "#1b2a33", "#8fb3c4"] },
  },
  {
    slug: "produccion-audiovisual",
    index: "03",
    name: "Producción audiovisual",
    short: "Del guion a la entrega final.",
    description:
      "Producimos piezas audiovisuales completas: planificación, rodaje, edición, color y sonido, con estándares profesionales en cada etapa.",
    items: [
      "Producción de comerciales",
      "Videoclips",
      "Videos corporativos",
      "Cortometrajes",
      "Contenido para redes sociales",
      "Producción de campañas publicitarias",
      "Edición y postproducción",
    ],
    media: { alt: "Monitor de edición con línea de tiempo", palette: ["#0a0708", "#3b1416", "#d0463c"] },
  },
  {
    slug: "produccion-fotografica",
    index: "04",
    name: "Producción fotográfica",
    short: "Imágenes con intención.",
    description:
      "Sesiones fotográficas con dirección, luz y postproducción pensadas para la identidad de cada marca o persona.",
    items: [
      "Fotografía comercial",
      "Fotografía de productos",
      "Fotografía de retratos",
      "Fotografía artística",
      "Fotografía publicitaria",
      "Sesiones para marcas personales",
    ],
    media: { alt: "Estudio fotográfico con luz de ventana", palette: ["#0b0b0b", "#2e2e2e", "#e7e2d8"] },
  },
  {
    slug: "branding",
    index: "05",
    name: "Branding y desarrollo de marcas",
    short: "Marcas construidas desde cero.",
    description:
      "Creamos marcas completas: concepto, nombre, identidad visual, manual y posicionamiento, para personas y empresas.",
    items: [
      "Creación de marcas desde cero",
      "Identidad corporativa",
      "Identidad visual",
      "Manual de marca",
      "Conceptualización de marcas",
      "Posicionamiento e imagen comercial",
    ],
    media: { alt: "Sistema de identidad visual sobre papel", palette: ["#0a0a0c", "#24222b", "#b9a7e0"] },
  },
  {
    slug: "estrategia-redes",
    index: "06",
    name: "Estrategia y redes sociales",
    short: "Presencia digital con dirección.",
    description:
      "Diseñamos la estrategia, la identidad y el contenido de tus redes para que comuniquen con coherencia y constancia.",
    items: [
      "Desarrollo de estrategias de contenido",
      "Planificación de publicaciones",
      "Creación de contenido audiovisual",
      "Identidad visual para redes sociales",
      "Desarrollo de perfiles profesionales",
      "Organización de la comunicación digital",
    ],
    media: { alt: "Cuadrícula de contenido para redes sociales", palette: ["#08090a", "#1d2b24", "#7fc4a0"] },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
