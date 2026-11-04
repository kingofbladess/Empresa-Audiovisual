import type { ClientLogo } from "./types";

/**
 * MARCAS Y PERSONAS QUE HAN CONFIADO EN NOSOTROS
 * Todos los nombres con `demo: true` son FICTICIOS (ejemplos visuales).
 * Para añadir un cliente real: pon su logo en /public/media/clientes/ y `demo: false`.
 */
export const clients: ClientLogo[] = [
  { name: "Casa Norte", sector: "Café de especialidad", demo: true },
  { name: "Obsidiana", sector: "Perfumería", demo: true },
  { name: "Aluna Ríos", sector: "Música", demo: true },
  { name: "Pulso", sector: "Ropa deportiva", demo: true },
  { name: "Fundación Raíz", sector: "Organización social", demo: true },
  { name: "Dúo Ceniza", sector: "Música electrónica", demo: true },
  { name: "Taller Inés", sector: "Cerámica", demo: true },
  { name: "Altamar", sector: "Hotelería", demo: true },
  { name: "Vértice", sector: "Arquitectura", demo: true },
  { name: "Lúmina", sector: "Cosmética", demo: true },
  { name: "Ferro & Co.", sector: "Gastronomía", demo: true },
  { name: "Selva Films", sector: "Cine independiente", demo: true },
];
