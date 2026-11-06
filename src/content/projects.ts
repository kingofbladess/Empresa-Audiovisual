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
    logline: "Videoclip y universo visual para un lanzamiento de pop alternativo",
    concept:
      "Una canción sobre lo que el mar devuelve. Construimos un universo de tonos marinos y luz de amanecer, rodado en una sola toma que se repite con variaciones, como una marea.",
    process: [
      { step: "Concepto", text: "Moodboard, paleta y tratamiento visual a partir de la letra y la mezcla." },
      { step: "Preproducción", text: "Scouting de costa, ensayo de coreografía y plan de rodaje al amanecer." },
      { step: "Rodaje", text: "Plano secuencia con steadicam, tres variaciones de luz en dos jornadas." },
      { step: "Postproducción", text: "Montaje rítmico, color en tonos cian y grano de película." },
    ],
    result:
      "Videoclip de 3:40, portada del single, sesión fotográfica de prensa y kit de 12 piezas verticales para redes",
    cover: { alt: "Artista de espaldas frente al mar al amanecer", palette: ["#100b08", "#5a3a22", "#e3b98f"] },
    gallery: [
      { alt: "Detalle de manos en el agua", palette: ["#120708", "#5a1a1e", "#ef5a64"] },
      { alt: "Plano general de costa con niebla", palette: ["#110d05", "#5c4813", "#fed340"] },
      { alt: "Retrato con luz dorada", palette: ["#0d0d0d", "#3c3b3a", "#c9c6c1"] },
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
    logline: "Marca completa para una cafetería de especialidad, desde el nombre hasta Instagram",
    concept:
      "Un café que se siente como volver a casa. La identidad toma la geometría de las ventanas de la casa original y una paleta de barro, crema y verde bosque.",
    process: [
      { step: "Estrategia", text: "Entrevistas, público objetivo y territorio de marca." },
      { step: "Identidad", text: "Logotipo, tipografías, paleta, patrones y manual de marca." },
      { step: "Fotografía", text: "Sesión de producto, espacio y equipo con luz natural." },
      { step: "Redes", text: "Plantillas, plan de lanzamiento y primeras 30 publicaciones." },
    ],
    result: "Manual de marca de 40 páginas, señalética, empaques, 80 fotografías y lanzamiento en redes",
    cover: { alt: "Taza de café sobre mesa de madera", palette: ["#120708", "#5a1a1e", "#ef5a64"] },
    gallery: [
      { alt: "Aplicaciones del logotipo en empaques", palette: ["#100b08", "#5a3a22", "#e3b98f"] },
      { alt: "Barista preparando café", palette: ["#120708", "#5a1a1e", "#ef5a64"] },
      { alt: "Cuadrícula de Instagram", palette: ["#110d05", "#5c4813", "#fed340"] },
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
    logline: "Campaña de lanzamiento para un perfume: fotografía de producto y comercial de 30 segundos",
    concept:
      "La fragancia como piedra volcánica: algo que nace del fuego y se enfría en negro brillante. Luz dura, humo y superficies minerales.",
    process: [
      { step: "Concepto", text: "Territorio creativo, guion del comercial y storyboard." },
      { step: "Arte", text: "Construcción de set con rocas, agua y humo controlado." },
      { step: "Rodaje", text: "Macro a alta velocidad y fotografía de producto en estudio." },
      { step: "Post", text: "Composición, color y versiones para pauta digital y punto de venta." },
    ],
    result: "Comercial de 30 s, cortes de 15 y 6 s, 24 fotografías de campaña y piezas para punto de venta",
    cover: { alt: "Frasco de perfume negro sobre roca volcánica", palette: ["#0d0d0d", "#3c3b3a", "#c9c6c1"] },
    gallery: [
      { alt: "Gota cayendo sobre superficie negra", palette: ["#120708", "#5a1a1e", "#ef5a64"] },
      { alt: "Humo envolviendo el frasco", palette: ["#100b08", "#5a3a22", "#e3b98f"] },
      { alt: "Detalle de la tapa", palette: ["#120708", "#5a1a1e", "#ef5a64"] },
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
    logline: "Cortometraje de ficción sobre dos hermanos que vacían la casa de su madre",
    concept:
      "Una historia contada a través de los objetos. Cámara fija, luz de ventana y un relato que avanza a medida que la casa se queda vacía.",
    process: [
      { step: "Desarrollo", text: "Guion, tratamiento visual y lookbook de dirección de fotografía." },
      { step: "Preproducción", text: "Casting, locación única y diseño de arte por capas." },
      { step: "Rodaje", text: "Cinco jornadas en orden cronológico para acompañar el vaciado." },
      { step: "Postproducción", text: "Montaje, color, diseño sonoro y mezcla para festivales." },
    ],
    result: "Cortometraje de 14 minutos, tráiler, póster y kit de prensa para circuito de festivales",
    cover: { alt: "Habitación vacía con luz de ventana", palette: ["#110d05", "#5c4813", "#fed340"] },
    gallery: [
      { alt: "Cajas apiladas en un pasillo", palette: ["#0d0d0d", "#3c3b3a", "#c9c6c1"] },
      { alt: "Retrato de perfil en penumbra", palette: ["#120708", "#5a1a1e", "#ef5a64"] },
      { alt: "Claqueta en el set", palette: ["#100b08", "#5a3a22", "#e3b98f"] },
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
    logline: "Marca personal desde cero para una ceramista que lanza su tienda en línea",
    concept:
      "La marca como huella: tipografía hecha a mano, texturas de arcilla y fotografías que muestran el proceso tanto como la pieza.",
    process: [
      { step: "Descubrimiento", text: "Propósito, público y propuesta de valor del taller." },
      { step: "Identidad", text: "Logotipo, sello para piezas, paleta tierra y etiquetas." },
      { step: "Contenido", text: "Sesión de retrato y proceso, y video corto para redes." },
      { step: "Lanzamiento", text: "Perfil profesional, plan de 8 semanas y plantillas." },
    ],
    result: "Identidad completa, 60 fotografías, 10 videos verticales y estrategia de lanzamiento",
    cover: { alt: "Manos moldeando arcilla", palette: ["#120708", "#5a1a1e", "#ef5a64"] },
    gallery: [
      { alt: "Piezas de cerámica en estantería", palette: ["#110d05", "#5c4813", "#fed340"] },
      { alt: "Retrato en el taller", palette: ["#0d0d0d", "#3c3b3a", "#c9c6c1"] },
      { alt: "Sello de marca sobre arcilla", palette: ["#120708", "#5a1a1e", "#ef5a64"] },
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
    logline: "Campaña de temporada para ropa deportiva, pensada primero para formato vertical",
    concept:
      "La ciudad como cancha. Atletas reales, luz de calle y montaje al ritmo del pulso cardiaco.",
    process: [
      { step: "Idea", text: "Concepto de campaña y guion modular para piezas de 6 a 30 s." },
      { step: "Casting", text: "Atletas y bailarines locales." },
      { step: "Rodaje", text: "Noche urbana con cámara en mano y gimbal." },
      { step: "Distribución", text: "Versiones por plataforma y calendario de publicación." },
    ],
    result: "Spot principal, 18 piezas verticales, 40 fotografías y guía de uso para redes",
    cover: { alt: "Atleta corriendo de noche bajo luces de calle", palette: ["#100b08", "#5a3a22", "#e3b98f"] },
    gallery: [
      { alt: "Zapatillas sobre asfalto mojado", palette: ["#120708", "#5a1a1e", "#ef5a64"] },
      { alt: "Grupo de bailarines en una esquina", palette: ["#110d05", "#5c4813", "#fed340"] },
      { alt: "Retrato con flash", palette: ["#0d0d0d", "#3c3b3a", "#c9c6c1"] },
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
    logline: "Identidad artística y fotografía de álbum para un dúo de música electrónica",
    concept:
      "Dos voces, una sombra. Retratos en contraluz y un sistema gráfico basado en ondas de sonido reales del disco.",
    process: [
      { step: "Narrativa", text: "Concepto del álbum traducido a imagen." },
      { step: "Sesión", text: "Retratos en estudio con luz dura y humo." },
      { step: "Sistema gráfico", text: "Portada, tipografía y piezas para plataformas." },
      { step: "Visualizers", text: "Loops animados para cada canción." },
    ],
    result: "Portada, 10 visualizers, sesión de prensa y kit para plataformas de streaming",
    cover: { alt: "Dos siluetas a contraluz con humo", palette: ["#120708", "#5a1a1e", "#ef5a64"] },
    gallery: [
      { alt: "Ondas de sonido impresas", palette: ["#100b08", "#5a3a22", "#e3b98f"] },
      { alt: "Retrato con luz azul", palette: ["#120708", "#5a1a1e", "#ef5a64"] },
      { alt: "Portada del álbum", palette: ["#110d05", "#5c4813", "#fed340"] },
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
    logline: "Rebranding y documental institucional para una fundación agrícola",
    concept:
      "Mostrar el trabajo desde la tierra. Un documental de observación y una identidad que nace de la forma de las raíces.",
    process: [
      { step: "Investigación", text: "Visitas a comunidades y entrevistas." },
      { step: "Identidad", text: "Nuevo símbolo, paleta y sistema editorial." },
      { step: "Documental", text: "Rodaje en campo durante tres semanas." },
      { step: "Entrega", text: "Documental, cápsulas y piezas para donantes." },
    ],
    result: "Documental de 22 minutos, 6 cápsulas, nueva identidad y memoria anual",
    cover: { alt: "Campo de cultivo al atardecer", palette: ["#0d0d0d", "#3c3b3a", "#c9c6c1"] },
    gallery: [
      { alt: "Manos con tierra", palette: ["#120708", "#5a1a1e", "#ef5a64"] },
      { alt: "Nuevo símbolo de la fundación", palette: ["#100b08", "#5a3a22", "#e3b98f"] },
      { alt: "Entrevista en campo", palette: ["#120708", "#5a1a1e", "#ef5a64"] },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
