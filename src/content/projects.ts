import type { Project, WorkCategory } from "./types";

/** Nombres de las categorías (filtros) del portafolio. */
export const workCategories: Record<WorkCategory, string> = {
  "marcas-personales": "Marcas personales",
  "marcas-comerciales": "Marcas comerciales",
  "identidad-corporativa": "Identidad corporativa",
  "fotografia-productos": "Fotografía de productos",
  campanas: "Campañas publicitarias",
  videoclips: "Videoclips",
  cortometrajes: "Cortometrajes",
  cine: "Producciones cinematográficas",
  "direccion-creativa": "Dirección creativa",
  redes: "Contenido para redes",
};

/**
 * PORTAFOLIO
 * Todos los proyectos marcados con `demo: true` son CONCEPTUALES: no son
 * clientes reales y el sitio los rotula como tales. Para publicar un trabajo
 * real, copia un bloque, cambia los textos, pon `demo: false` y coloca las
 * imágenes en /public/media/proyectos/<slug>/.
 */
export const projects: Project[] = [
  {
    slug: "marea-lenta",
    title: "Marea Lenta",
    client: "Aluna Ríos (artista ficticia)",
    year: "2026",
    demo: true,
    featured: true,
    categories: ["videoclips", "direccion-creativa", "marcas-personales"],
    services: ["direccion-creativa", "identidad-audiovisual", "contenido"],
    clientType: "artistas",
    logline: "Videoclip y universo visual para un lanzamiento de pop alternativo.",
    concept:
      "Una canción sobre lo que el mar devuelve. Construimos un universo de tonos marinos y luz de amanecer, rodado en una sola toma que se repite con variaciones, como una marea.",
    process: [
      { step: "Concepto", text: "Moodboard, paleta y tratamiento visual a partir de la letra y la mezcla." },
      { step: "Preproducción", text: "Scouting de costa, ensayo de coreografía y plan de rodaje al amanecer." },
      { step: "Rodaje", text: "Plano secuencia con steadicam, tres variaciones de luz en dos jornadas." },
      { step: "Postproducción", text: "Montaje rítmico, color en tonos cian y grano de película." },
    ],
    result:
      "Videoclip de 3:40, portada del single, sesión fotográfica de prensa y kit de 12 piezas verticales para redes.",
    cover: { alt: "Artista de espaldas frente al mar al amanecer", palette: ["#050a0d", "#123a46", "#8cc7cf"] },
    gallery: [
      { alt: "Detalle de manos en el agua", palette: ["#061014", "#1b4a52", "#bfe1e0"] },
      { alt: "Plano general de costa con niebla", palette: ["#0a0d0f", "#2b3a40", "#c9d4d4"] },
      { alt: "Retrato con luz dorada", palette: ["#0d0906", "#5a3a1e", "#f0c27a"] },
    ],
    credits: [
      { role: "Dirección", name: "Equipo del estudio" },
      { role: "Dirección de fotografía", name: "Equipo del estudio" },
    ],
  },
  {
    slug: "casa-norte",
    title: "Casa Norte",
    client: "Casa Norte Café (marca ficticia)",
    year: "2026",
    demo: true,
    featured: true,
    categories: ["identidad-corporativa", "marcas-comerciales", "redes"],
    services: ["branding", "productos-ventas", "expansion-redes"],
    clientType: "empresas",
    logline: "Marca completa para una cafetería de especialidad, desde el nombre hasta Instagram.",
    concept:
      "Un café que se siente como volver a casa. La identidad toma la geometría de las ventanas de la casa original y una paleta de barro, crema y verde bosque.",
    process: [
      { step: "Estrategia", text: "Entrevistas, público objetivo y territorio de marca." },
      { step: "Identidad", text: "Logotipo, tipografías, paleta, patrones y manual de marca." },
      { step: "Fotografía", text: "Sesión de producto, espacio y equipo con luz natural." },
      { step: "Redes", text: "Plantillas, plan de lanzamiento y primeras 30 publicaciones." },
    ],
    result: "Manual de marca de 40 páginas, señalética, empaques, 80 fotografías y lanzamiento en redes.",
    cover: { alt: "Taza de café sobre mesa de madera", palette: ["#0c0907", "#3e2a1d", "#d8b48c"] },
    gallery: [
      { alt: "Aplicaciones del logotipo en empaques", palette: ["#0a0b08", "#2c3a2a", "#c6cfae"] },
      { alt: "Barista preparando café", palette: ["#0d0a07", "#4a2f1c", "#e3c39b"] },
      { alt: "Cuadrícula de Instagram", palette: ["#0b0a09", "#33302b", "#e8e0d3"] },
    ],
  },
  {
    slug: "obsidiana",
    title: "Obsidiana",
    client: "Obsidiana Parfums (marca ficticia)",
    year: "2026",
    demo: true,
    featured: true,
    categories: ["fotografia-productos", "campanas"],
    services: ["productos-ventas", "contenido", "direccion-creativa"],
    clientType: "productos",
    logline: "Campaña de lanzamiento para un perfume: fotografía de producto y comercial de 30 segundos.",
    concept:
      "La fragancia como piedra volcánica: algo que nace del fuego y se enfría en negro brillante. Luz dura, humo y superficies minerales.",
    process: [
      { step: "Concepto", text: "Territorio creativo, guion del comercial y storyboard." },
      { step: "Arte", text: "Construcción de set con rocas, agua y humo controlado." },
      { step: "Rodaje", text: "Macro a alta velocidad y fotografía de producto en estudio." },
      { step: "Post", text: "Composición, color y versiones para pauta digital y punto de venta." },
    ],
    result: "Comercial de 30 s, cortes de 15 y 6 s, 24 fotografías de campaña y piezas para punto de venta.",
    cover: { alt: "Frasco de perfume negro sobre roca volcánica", palette: ["#080605", "#2b1a10", "#d98a3d"] },
    gallery: [
      { alt: "Gota cayendo sobre superficie negra", palette: ["#050505", "#1c1c1c", "#9a9a9a"] },
      { alt: "Humo envolviendo el frasco", palette: ["#0a0706", "#3a2216", "#f0a35a"] },
      { alt: "Detalle de la tapa", palette: ["#070606", "#2a2422", "#c7b8a8"] },
    ],
  },
  {
    slug: "lo-que-queda",
    title: "Lo que queda",
    client: "Proyecto de autor (conceptual)",
    year: "2025",
    demo: true,
    featured: true,
    categories: ["cortometrajes", "cine"],
    services: ["identidad-audiovisual", "contenido"],
    clientType: "cine",
    logline: "Cortometraje de ficción sobre dos hermanos que vacían la casa de su madre.",
    concept:
      "Una historia contada a través de los objetos. Cámara fija, luz de ventana y un relato que avanza a medida que la casa se queda vacía.",
    process: [
      { step: "Desarrollo", text: "Guion, tratamiento visual y lookbook de dirección de fotografía." },
      { step: "Preproducción", text: "Casting, locación única y diseño de arte por capas." },
      { step: "Rodaje", text: "Cinco jornadas en orden cronológico para acompañar el vaciado." },
      { step: "Postproducción", text: "Montaje, color, diseño sonoro y mezcla para festivales." },
    ],
    result: "Cortometraje de 14 minutos, tráiler, póster y kit de prensa para circuito de festivales.",
    cover: { alt: "Habitación vacía con luz de ventana", palette: ["#080807", "#2f2b24", "#d6c6a5"] },
    gallery: [
      { alt: "Cajas apiladas en un pasillo", palette: ["#0a0908", "#3a342b", "#cbbfa8"] },
      { alt: "Retrato de perfil en penumbra", palette: ["#060607", "#1f2226", "#8d97a3"] },
      { alt: "Claqueta en el set", palette: ["#0b0b0b", "#262626", "#e4e4e4"] },
    ],
  },
  {
    slug: "taller-ines",
    title: "Taller Inés",
    client: "Inés Varela, ceramista (persona ficticia)",
    year: "2025",
    demo: true,
    categories: ["marcas-personales", "redes", "identidad-corporativa"],
    services: ["branding", "expansion-redes", "productos-ventas"],
    clientType: "emprendedores",
    logline: "Marca personal desde cero para una ceramista que lanza su tienda en línea.",
    concept:
      "La marca como huella: tipografía hecha a mano, texturas de arcilla y fotografías que muestran el proceso tanto como la pieza.",
    process: [
      { step: "Descubrimiento", text: "Propósito, público y propuesta de valor del taller." },
      { step: "Identidad", text: "Logotipo, sello para piezas, paleta tierra y etiquetas." },
      { step: "Contenido", text: "Sesión de retrato y proceso, y video corto para redes." },
      { step: "Lanzamiento", text: "Perfil profesional, plan de 8 semanas y plantillas." },
    ],
    result: "Identidad completa, 60 fotografías, 10 videos verticales y estrategia de lanzamiento.",
    cover: { alt: "Manos moldeando arcilla", palette: ["#0c0806", "#4a2c1d", "#d9a27a"] },
    gallery: [
      { alt: "Piezas de cerámica en estantería", palette: ["#0b0a09", "#3b342d", "#ddd0bf"] },
      { alt: "Retrato en el taller", palette: ["#0a0806", "#3d2a1e", "#c99b76"] },
      { alt: "Sello de marca sobre arcilla", palette: ["#0c0a08", "#463728", "#e6cba7"] },
    ],
  },
  {
    slug: "pulso-urbano",
    title: "Pulso Urbano",
    client: "Pulso Sportswear (marca ficticia)",
    year: "2026",
    demo: true,
    categories: ["campanas", "redes", "marcas-comerciales"],
    services: ["direccion-creativa", "contenido", "expansion-redes"],
    clientType: "productos",
    logline: "Campaña de temporada para ropa deportiva, pensada primero para formato vertical.",
    concept:
      "La ciudad como cancha. Atletas reales, luz de calle y montaje al ritmo del pulso cardiaco.",
    process: [
      { step: "Idea", text: "Concepto de campaña y guion modular para piezas de 6 a 30 s." },
      { step: "Casting", text: "Atletas y bailarines locales." },
      { step: "Rodaje", text: "Noche urbana con cámara en mano y gimbal." },
      { step: "Distribución", text: "Versiones por plataforma y calendario de publicación." },
    ],
    result: "Spot principal, 18 piezas verticales, 40 fotografías y guía de uso para redes.",
    cover: { alt: "Atleta corriendo de noche bajo luces de calle", palette: ["#06060a", "#20163a", "#a77cff"] },
    gallery: [
      { alt: "Zapatillas sobre asfalto mojado", palette: ["#050608", "#162133", "#6f9de0"] },
      { alt: "Grupo de bailarines en una esquina", palette: ["#08060a", "#33163a", "#e07cc8"] },
      { alt: "Retrato con flash", palette: ["#060606", "#2a2a2a", "#f2f2f2"] },
    ],
  },
  {
    slug: "voz-propia",
    title: "Voz Propia",
    client: "Dúo Ceniza (artistas ficticios)",
    year: "2025",
    demo: true,
    categories: ["marcas-personales", "direccion-creativa", "videoclips"],
    services: ["direccion-creativa", "productos-ventas", "expansion-redes"],
    clientType: "artistas",
    logline: "Identidad artística y fotografía de álbum para un dúo de música electrónica.",
    concept:
      "Dos voces, una sombra. Retratos en contraluz y un sistema gráfico basado en ondas de sonido reales del disco.",
    process: [
      { step: "Narrativa", text: "Concepto del álbum traducido a imagen." },
      { step: "Sesión", text: "Retratos en estudio con luz dura y humo." },
      { step: "Sistema gráfico", text: "Portada, tipografía y piezas para plataformas." },
      { step: "Visualizers", text: "Loops animados para cada canción." },
    ],
    result: "Portada, 10 visualizers, sesión de prensa y kit para plataformas de streaming.",
    cover: { alt: "Dos siluetas a contraluz con humo", palette: ["#060507", "#241a2e", "#c9a3e8"] },
    gallery: [
      { alt: "Ondas de sonido impresas", palette: ["#070707", "#262626", "#d6d6d6"] },
      { alt: "Retrato con luz azul", palette: ["#05070b", "#14233d", "#6aa3ff"] },
      { alt: "Portada del álbum", palette: ["#080607", "#311c26", "#e88fae"] },
    ],
  },
  {
    slug: "fundacion-raiz",
    title: "Raíz",
    client: "Fundación Raíz (organización ficticia)",
    year: "2026",
    demo: true,
    categories: ["identidad-corporativa", "cine", "direccion-creativa"],
    services: ["branding", "identidad-audiovisual", "contenido"],
    clientType: "empresas",
    logline: "Rebranding y documental institucional para una fundación agrícola.",
    concept:
      "Mostrar el trabajo desde la tierra. Un documental de observación y una identidad que nace de la forma de las raíces.",
    process: [
      { step: "Investigación", text: "Visitas a comunidades y entrevistas." },
      { step: "Identidad", text: "Nuevo símbolo, paleta y sistema editorial." },
      { step: "Documental", text: "Rodaje en campo durante tres semanas." },
      { step: "Entrega", text: "Documental, cápsulas y piezas para donantes." },
    ],
    result: "Documental de 22 minutos, 6 cápsulas, nueva identidad y memoria anual.",
    cover: { alt: "Campo de cultivo al atardecer", palette: ["#080906", "#26331a", "#b8c98a"] },
    gallery: [
      { alt: "Manos con tierra", palette: ["#0a0806", "#3a2a1a", "#c4a07a"] },
      { alt: "Nuevo símbolo de la fundación", palette: ["#070807", "#1f2a1f", "#a8d3a0"] },
      { alt: "Entrevista en campo", palette: ["#0b0a07", "#3b3622", "#e0d49b"] },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
