import type { ClientType } from "./types";

/**
 * Tipos de cliente. Cada uno genera su propia página en /para/[slug]
 * y aparece en el selector de la portada y en el formulario de contacto.
 */
export const clientTypes: ClientType[] = [
  {
    slug: "artistas",
    name: "Artistas y creadores",
    kicker: "Identidad artística",
    summary:
      "Marca personal, identidad artística, videoclips, fotografía promocional, dirección creativa y estrategia para redes.",
    headline: "Tu obra merece una imagen a su altura",
    intro:
      "Trabajamos con músicos, actores, creadores de contenido y artistas visuales para construir un universo propio: cómo te ves, cómo suenas en imagen y cómo te recuerda tu público.",
    offer: [
      { title: "Identidad artística", text: "Concepto, estética y narrativa que conectan tu obra con tu imagen pública." },
      { title: "Videoclips", text: "Dirección, rodaje y postproducción de videoclips con lenguaje cinematográfico." },
      { title: "Fotografía promocional", text: "Sesiones para lanzamientos, prensa, portadas y giras." },
      { title: "Contenido para redes", text: "Estrategia y piezas que mantienen tu narrativa entre lanzamientos." },
    ],
    services: ["artistas", "identidad-audiovisual", "contenido", "expansion-redes"],
    workCategories: ["videoclips", "marcas-personales", "direccion-creativa"],
    media: { alt: "Artista iluminada con luz roja en escenario", palette: ["#100b08", "#5a3a22", "#e3b98f"] },
  },
  {
    slug: "empresas",
    name: "Negocios y empresas",
    kicker: "Identidad corporativa",
    summary:
      "Identidad corporativa, branding, fotografía comercial, videos publicitarios, redes sociales y posicionamiento visual.",
    headline: "Empresas que se ven como lo que son",
    intro:
      "Ayudamos a empresas y negocios a ordenar su imagen y a comunicar con claridad: una identidad coherente, contenido profesional y una presencia que inspira confianza.",
    offer: [
      { title: "Identidad corporativa", text: "Logotipo, sistema visual y manual de marca para toda la empresa." },
      { title: "Fotografía comercial", text: "Instalaciones, equipo, procesos y servicios con calidad editorial." },
      { title: "Video publicitario y corporativo", text: "Piezas que explican quién eres y por qué elegirte." },
      { title: "Posicionamiento en redes", text: "Estrategia y contenido para crecer con una voz consistente." },
    ],
    services: ["branding", "productos-ventas", "contenido", "expansion-redes"],
    workCategories: ["identidad-corporativa", "marcas-comerciales", "campanas"],
    media: { alt: "Oficina moderna con luz fría", palette: ["#120708", "#5a1a1e", "#ef5a64"] },
  },
  {
    slug: "productos",
    name: "Marcas de productos",
    kicker: "Producto y campaña",
    summary:
      "Fotografía de productos, videos comerciales, campañas, identidad visual, presentación de productos y contenido para redes.",
    headline: "Productos que se desean antes de tocarse",
    intro:
      "Diseñamos cómo se presenta tu producto: la luz, el gesto, el entorno y la campaña que lo lleva al público correcto.",
    offer: [
      { title: "Fotografía de producto", text: "Estudio, bodegón y lifestyle con dirección de arte." },
      { title: "Comerciales", text: "Videos de producto para lanzamientos, pauta y punto de venta." },
      { title: "Campañas publicitarias", text: "Concepto creativo y producción de la campaña completa." },
      { title: "Identidad y empaque", text: "Imagen de marca y presentación que sostienen el valor del producto." },
    ],
    services: ["productos-ventas", "contenido", "direccion-creativa", "branding"],
    workCategories: ["fotografia-productos", "campanas", "marcas-comerciales"],
    media: { alt: "Frasco de perfume sobre superficie oscura", palette: ["#110d05", "#5c4813", "#fed340"] },
  },
  {
    slug: "cine",
    name: "Producciones cinematográficas",
    kicker: "Cine y ficción",
    summary:
      "Dirección cinematográfica, dirección de fotografía, preproducción, producción, realización, edición y postproducción.",
    headline: "Del guion a la pantalla",
    intro:
      "Nos sumamos a cortometrajes, largometrajes, series y piezas de autor en las áreas que el proyecto necesite, o lo llevamos completo.",
    offer: [
      { title: "Dirección y realización", text: "Puesta en escena, dirección de actores y narrativa visual." },
      { title: "Dirección de fotografía", text: "Diseño de luz, cámara y look para cada historia." },
      { title: "Preproducción y producción", text: "Plan de rodaje, locaciones, casting, equipo y logística." },
      { title: "Postproducción", text: "Montaje, color, sonido y entrega para festivales y plataformas." },
    ],
    services: ["identidad-audiovisual", "contenido", "direccion-creativa"],
    workCategories: ["cortometrajes", "cine"],
    media: { alt: "Plano general de rodaje nocturno", palette: ["#0d0d0d", "#3c3b3a", "#c9c6c1"] },
  },
  {
    slug: "emprendedores",
    name: "Marcas personales y emprendedores",
    kicker: "Marca desde cero",
    summary:
      "Construcción de marca desde cero, estrategia de comunicación, identidad, concepto visual y presencia digital.",
    headline: "Empieza con una marca, no con un logo",
    intro:
      "Si estás comenzando, te acompañamos a definir qué representas, cómo lo comunicas y cómo se ve, para salir al mercado con una marca sólida.",
    offer: [
      { title: "Estrategia de marca", text: "Propósito, público, propuesta de valor y tono de comunicación." },
      { title: "Identidad visual", text: "Nombre, logotipo, colores, tipografías y aplicaciones." },
      { title: "Sesión de marca personal", text: "Fotografía y video que te presentan con autoridad." },
      { title: "Presencia digital", text: "Perfiles, plan de contenido y primeras piezas listas para publicar." },
    ],
    services: ["branding", "expansion-redes", "productos-ventas", "direccion-creativa"],
    workCategories: ["marcas-personales", "redes", "identidad-corporativa"],
    media: { alt: "Retrato de emprendedora en su taller", palette: ["#100b08", "#5a3a22", "#e3b98f"] },
  },
];

export const getClientType = (slug: string) => clientTypes.find((c) => c.slug === slug);
