import type { Service } from "./types";

/**
 * Los 12 servicios de XploreMet Prod. `goal` es "la X": la meta concreta de cada
 * servicio. `price` se muestra tal cual; déjalo vacío para ocultarlo.
 */
export const services: Service[] = [
  {
    slug: "estrategia-empresarial",
    index: "01",
    name: "Estrategia y dirección empresarial",
    short: "Tu idea, convertida en una propuesta de negocio.",
    description:
      "Un estudio por horas para desarrollar la visión y la misión de tu negocio hasta que te sientas listo para arrancar. Nos basamos en un estudio corto del mercado, de tu producto o servicio, de tu capital y de tus herramientas.",
    items: ["Visión y misión del negocio", "Estudio corto de mercado", "Revisión de capital y herramientas", "Propuesta de negocio"],
    goal: "Lograr una propuesta de negocios que estudie a tus clientes y tu entorno, y deje la línea para comenzar a trabajar.",
    price: "5$ la hora",
  },
  {
    slug: "direccion-creativa",
    index: "02",
    name: "Dirección creativa",
    short: "La emoción que hace vender tu sueño.",
    description:
      "Si ya tienes una dirección de negocios, le sumamos sentimiento. Estudiamos a tus clientes y su entorno, hacemos un estudio básico de mercado y creamos un concepto creativo para tu marca.",
    items: ["Estudio de clientes y entorno", "Estudio básico de mercado", "Concepto básico de branding", "Concepto creativo de marca"],
    goal: "Vender tu sueño y expandir tu negocio de manera creativa.",
    price: "7$ la hora",
  },
  {
    slug: "estudio-mercado",
    index: "03",
    name: "Estudio de mercado",
    short: "Saber dónde estás parado antes de moverte.",
    description:
      "Desde una versión básica por horas hasta un estudio a profundidad: fortalezas, debilidades, competidores cercanos y lejanos, y un plan breve y estratégico para mejorar tu marca, con seguimiento por Meet.",
    items: ["Fortalezas y debilidades", "Competidores cercanos y lejanos", "Propuestas de mejora", "Formatos, calendarios y cronogramas"],
    goal: "Tener un estudio especializado de tu negocio y su proyección.",
    price: "Desde 5$ la hora · Completo desde 200$",
  },
  {
    slug: "branding",
    index: "04",
    name: "Branding (concepto)",
    short: "El concepto que le da dirección a todo.",
    description:
      "La parte elemental de la marca. Partiendo de al menos un estudio básico de tu producto o servicio, creamos el concepto, con estrategias de negocio y una introducción a la parte visual y gráfica.",
    items: ["Concepto de marca", "Estrategias de negocio", "Introducción a lo visual y gráfico"],
    goal: "Crear el concepto de marca y su dirección visual.",
    price: "25$ por 3 horas",
  },
  {
    slug: "grafica-manual",
    index: "05",
    name: "Creación gráfica y manual de marca",
    short: "Tu marca lista para usar, imprimir y publicar.",
    description:
      "Gráfica, logos y manual corporativo. Es un trabajo detallado: el alcance depende de si ya tienes concepto de marca, de la profundidad que necesites y de tu presupuesto.",
    items: ["Logotipo y variaciones", "Sistema gráfico", "Manual de marca", "Piezas para impresión y redes"],
    goal: "Conseguir el manual de marca y sus variaciones para usarse, imprimirse o montarse en redes.",
    price: "Según alcance",
  },
  {
    slug: "contenido",
    index: "06",
    name: "Creación de contenido y estrategia",
    short: "Videos pensados para mover un número.",
    description:
      "Partimos del estudio de tu marca y de tu brief para crear videos que aumenten un porcentaje concreto dentro de ella, con pautas especializadas, edición y días de subida. Luego estudiamos métricas o ventas.",
    items: ["Brief y pautas especializadas", "Edición y montaje", "Días de subida", "Estudio de métricas o ventas"],
    goal: "Tener un cronograma de lo que debes subir, con videos que cubren un mes.",
    price: "Según pautas y extensión",
  },
  {
    slug: "identidad-audiovisual",
    index: "07",
    name: "Dirección creativa en redes e identidad audiovisual",
    short: "Una estética y un sonido propios.",
    description:
      "Buscamos la estética y el sonido que van con el tono de tu marca: guiones especializados, diseño de sonido e investigación de arte, todo unido a los objetivos de tu branding y tu crecimiento.",
    items: ["Guiones especializados", "Diseño de sonido", "Investigación de arte", "Contenido libre y listo para usar en carpetas"],
    goal: "Tener un punto específico y una dirección de arte en materia de marca.",
    price: "Desde 50$",
  },
  {
    slug: "campanas",
    index: "08",
    name: "Campañas publicitarias y en redes",
    short: "Una herramienta para alcanzar un número.",
    description:
      "Campañas online y offline con objetivos específicos, ancladas a tu concepto, estudio de mercado, branding y estrategia de contenido, con acompañamiento en métricas y estadísticas de venta.",
    items: ["Objetivos específicos", "Arte y cronograma", "Campañas online y offline", "Seguimiento de métricas y ventas"],
    goal: "Crear una estrategia para alcanzar un número específico.",
    price: "Según campaña",
  },
  {
    slug: "productos-ventas",
    index: "09",
    name: "Estudio de productos y ventas",
    short: "Lo mejor de tu producto, al máximo.",
    description:
      "Un acompañamiento junto a tu marca para estudiar ventas, buscar innovación, revisar métricas y mejorar tus productos, incluyendo su fotografía.",
    items: ["Estudio de ventas", "Innovación de producto", "Fotografía", "Métricas y mejoras"],
    goal: "Maximizar tu producto o servicio y restar sus puntos negativos.",
    price: "Según alcance",
  },
  {
    slug: "expansion-redes",
    index: "10",
    name: "Expansión y crecimiento en redes",
    short: "Aprende a crear y a crecer.",
    description:
      "Estudiamos cómo puedes crear contenido y crecer en redes, con sesiones por Meet, acompañamiento y herramientas de creación.",
    items: ["Estudio especializado", "Sesiones por Meet", "Acompañamiento", "Herramientas de creación"],
    goal: "Diseñar un camino de crecimiento que salga de ti y pueda mejorarse al 100%.",
    price: "Según sesiones",
  },
  {
    slug: "artistas",
    index: "11",
    name: "Servicios para artistas",
    short: "Todo lo anterior, adaptado a tu carrera.",
    description:
      "Adaptamos cada servicio a tu objetivo: concepto de marca y gráfico, estudio de mercado, imagen en redes, fotografía, videoclips, contenido, venta de tu arte, expansión y cronograma de actividades.",
    items: ["Fotografía y videoclips", "Concepto audiovisual y gráfico", "Imagen en redes", "Venta de tu arte y expansión"],
    goal: "Lograr el estudio, la estrategia y tu crecimiento con tiempo.",
    price: "Según objetivo",
  },
  {
    slug: "acompanamiento",
    index: "12",
    name: "Acompañamiento especializado",
    short: "Encontrar tus fortalezas y hacerlas crecer.",
    description:
      "Días de pauta para estudiar el entorno de tu marca, sus fortalezas y debilidades, con estrategia de marca, métricas y una exposición de resultados al finalizar.",
    items: ["Días de pauta", "Fortalezas y debilidades", "Estrategia de marca", "Métricas y resultados"],
    goal: "Buscar tus puntos fuertes y maximizarlos.",
    price: "Según tiempo",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
