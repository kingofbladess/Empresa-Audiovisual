import type { JournalEntry } from "./types";

/** BITÁCORA CREATIVA: procesos, detrás de cámaras, proyectos en desarrollo y equipo. */
export const journal: JournalEntry[] = [
  {
    slug: "amanecer-en-la-costa",
    title: "Rodar al amanecer: 40 minutos de luz",
    date: "2026-10-12",
    tag: "Detrás de cámaras",
    excerpt: "Cómo planificamos un plano secuencia que solo podía rodarse en la media hora dorada.",
    media: { alt: "Equipo de rodaje en la playa al amanecer", palette: ["#0a0907", "#4a3420", "#f2b878"] },
    demo: true,
  },
  {
    slug: "construir-una-marca-desde-cero",
    title: "Antes del logo: las preguntas que hacemos",
    date: "2026-09-28",
    tag: "Proceso",
    excerpt: "Las cinco conversaciones que tenemos con cada cliente antes de diseñar nada.",
    media: { alt: "Pizarra con notas de estrategia de marca", palette: ["#09090a", "#2a2a30", "#cfcfe0"] },
    demo: true,
  },
  {
    slug: "cortometraje-en-desarrollo",
    title: "En desarrollo: un cortometraje sobre la memoria",
    date: "2026-09-10",
    tag: "En desarrollo",
    excerpt: "Primeras pruebas de cámara y lookbook de nuestro próximo proyecto de autor.",
    media: { alt: "Pruebas de cámara con luz de ventana", palette: ["#070707", "#2c2a26", "#d9cfbd"] },
    demo: true,
  },
  {
    slug: "un-dia-en-el-estudio",
    title: "Un día en el estudio",
    date: "2026-08-30",
    tag: "Equipo",
    excerpt: "Cómo nos organizamos entre rodajes, sesiones y entregas.",
    media: { alt: "Estudio con luces y fondo infinito", palette: ["#0a0a0a", "#303030", "#ececec"] },
    demo: true,
  },
];
