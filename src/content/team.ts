import type { TeamMember } from "./types";

/**
 * EQUIPO
 * Los perfiles con `placeholder: true` son ejemplos de cargos pendientes de
 * sustituir por las personas reales. Coloca las fotos en /public/media/equipo/.
 */
export const team: TeamMember[] = [
  {
    slug: "direccion-creativa",
    name: "Nombre Apellido",
    role: "Director creativo",
    bio: "Define el concepto y el lenguaje visual de cada proyecto, y cuida que la idea llegue intacta a la pieza final.",
    inProjects: "Lidera el concepto, aprueba la dirección de arte y acompaña al cliente en cada etapa.",
    photo: { src: "/media/equipo/integrante-01.jpg", alt: "Retrato de un integrante del equipo de XploreMet Prod al atardecer" },
    placeholder: true,
  },
  {
    slug: "direccion-cine",
    name: "Nombre Apellido",
    role: "Director cinematográfico",
    bio: "Dirige la puesta en escena y la narrativa de las producciones audiovisuales.",
    inProjects: "Escribe el tratamiento, dirige el rodaje y supervisa el montaje.",
    photo: { alt: "Retrato del director cinematográfico", palette: ["#07090b", "#1e2b33", "#9db7c7"] },
    placeholder: true,
  },
  {
    slug: "dop",
    name: "Nombre Apellido",
    role: "Director de fotografía",
    bio: "Diseña la luz, la cámara y el look de cada imagen en movimiento.",
    inProjects: "Plan de luces, elección de lentes y cámara, y supervisión del color.",
    photo: { alt: "Retrato del director de fotografía", palette: ["#080706", "#33251a", "#e0b07a"] },
    placeholder: true,
  },
  {
    slug: "productor",
    name: "Nombre Apellido",
    role: "Productor audiovisual",
    bio: "Convierte las ideas en planes realizables: presupuesto, calendario, equipo y logística.",
    inProjects: "Coordina la producción de principio a fin y es el enlace operativo con el cliente.",
    photo: { alt: "Retrato del productor audiovisual", palette: ["#0a0909", "#2f2a2a", "#cfc4c4"] },
    placeholder: true,
  },
  {
    slug: "fotografo",
    name: "Nombre Apellido",
    role: "Fotógrafo",
    bio: "Especialista en retrato, producto y fotografía publicitaria con dirección de arte.",
    inProjects: "Dirige y realiza las sesiones fotográficas y su edición.",
    photo: { alt: "Retrato del fotógrafo", palette: ["#090908", "#2b2b26", "#e6e2d0"] },
    placeholder: true,
  },
  {
    slug: "editor",
    name: "Nombre Apellido",
    role: "Editor y postproductor",
    bio: "Da ritmo a la historia en el montaje y la termina en color y sonido.",
    inProjects: "Montaje, corrección de color, gráficos y entrega en todos los formatos.",
    photo: { alt: "Retrato del editor", palette: ["#0a0708", "#3a1a20", "#d98a95"] },
    placeholder: true,
  },
  {
    slug: "disenador",
    name: "Nombre Apellido",
    role: "Diseñador gráfico",
    bio: "Traduce los conceptos en sistemas gráficos claros y memorables.",
    inProjects: "Logotipos, tipografía, piezas impresas y digitales.",
    photo: { alt: "Retrato del diseñador gráfico", palette: ["#08080b", "#24223a", "#a9a3e6"] },
    placeholder: true,
  },
  {
    slug: "branding",
    name: "Nombre Apellido",
    role: "Especialista en branding",
    bio: "Construye marcas desde la estrategia: propósito, posicionamiento y voz.",
    inProjects: "Talleres de marca, arquitectura de marca y manual de identidad.",
    photo: { alt: "Retrato de la especialista en branding", palette: ["#0a0907", "#38301c", "#e1cd8f"] },
    placeholder: true,
  },
  {
    slug: "estratega",
    name: "Nombre Apellido",
    role: "Estratega digital",
    bio: "Planifica cómo, cuándo y dónde se publica cada pieza para que la marca crezca.",
    inProjects: "Estrategia de contenido, calendario, métricas y gestión de perfiles.",
    photo: { alt: "Retrato del estratega digital", palette: ["#070908", "#1b2e25", "#93d1b2"] },
    placeholder: true,
  },
];
