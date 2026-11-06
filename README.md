# XploreMet Prod · Web de la productora de estrategia y marca

> Nombre, eslogan y datos de contacto se cambian en un solo lugar: `src/content/site.ts`.

**Tecnología:** Next.js 15 (App Router) · React 19 · Tailwind CSS 4 · TypeScript.
Publicado en Vercel. También se puede desplegar con Docker.

## Arrancar

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run build      # compilación de producción
```

## Arquitectura

```
src/
├─ content/          ← TODO el contenido editable (sin tocar componentes)
│  ├─ site.ts        nombre, logo, frase, WhatsApp, correo, redes, video de portada, menú
│  ├─ clientTypes.ts los 5 tipos de cliente (cada uno genera /para/<slug>)
│  ├─ services.ts    los 12 servicios, su meta (la X) y su precio
│  ├─ projects.ts    portafolio + categorías de filtro (cada uno genera /trabajo/<slug>)
│  ├─ team.ts        integrantes
│  ├─ journal.ts     bitácora creativa
│  ├─ clients.ts     marcas y personas que confían
│  ├─ about.ts       misión, visión, valores, proceso y situaciones del cliente
│  └─ types.ts       tipos de todo lo anterior
├─ components/       piezas reutilizables (Hero, Frame, ClientTypeSelector, PortfolioGrid,
│                    ProjectCard, TeamCard, ClientsWall, ContactForm, WhatsAppFloat…)
├─ lib/whatsapp.ts   genera enlaces wa.me con mensajes según servicio, tipo de cliente o formulario
└─ app/              rutas
   ├─ /                    portada
   ├─ /servicios           6 especialidades (anclas #direccion-creativa, #branding…)
   ├─ /para/[tipo]         página especializada por tipo de cliente
   ├─ /trabajo             portafolio con filtros (?categoria=videoclips)
   ├─ /trabajo/[proyecto]  ficha individual
   ├─ /equipo              equipo + bitácora creativa (#bitacora)
   ├─ /nosotros            misión, visión, objetivos, valores, clientes
   ├─ /contacto            formulario → WhatsApp (o correo)
   └─ sitemap.xml, robots.txt, metadatos por página y JSON-LD
```

Todas las páginas se generan estáticas al compilar: carga rápida y buen SEO.

## Cómo actualizar contenido

- **Proyecto real:** en `projects.ts` copia un bloque, cambia textos, pon `demo: false` y las
  rutas de imágenes (`/media/proyectos/<slug>/…`). Los que tengan `demo: true` se rotulan
  automáticamente como *Proyecto conceptual*.
- **Integrante:** en `team.ts`, nombre, foto y `placeholder: false`.
- **Cliente real:** en `clients.ts`, logo en `/public/media/clientes/` y `demo: false`.
- **Imágenes:** mientras un elemento no tenga `src`, el componente `Frame` dibuja un fotograma
  provisional con su paleta. Al poner la foto o el video, se sustituye solo.
- **Fondo de la portada:** su ruta está en `site.heroImage`.

## Intro de la cámara (scroll)

La portada empieza con una intro controlada por el scroll (`src/components/CameraIntro.tsx`): el scroll
avanza un solo video con las 4 escenas unidas, y al final la portada aparece con un fundido.

1. **Fase 1:** el objetivo se acopla a la cámara y gira hacia nosotros (`Fase 1.mp4`).
2. **Fase 2:** otra cámara de frente; entramos por el diafragma (`fase 3.mp4`).
3. **Fase 3:** viaje por dentro del lente (`fase 2.mp4`).
4. **Fase 4:** salimos del lente y se abre el set de rodaje (`fase 4.mp4`).

El último fotograma de la fase 4 es también el fondo de la portada (`heroImage.image`), para que el paso sea continuo.

Se configura en `site.cameraIntro` (textos de cada fase, largo del recorrido, `enabled: false` para quitarla).

**Cómo se entrega el video:** cada fase es un archivo propio y se descargan en orden, así la primera escena está
disponible casi de inmediato. Hay 3 versiones y se elige una según orientación, tamaño y conexión:

| Versión | Tamaño | Peso total | Para quién |
|---|---|---|---|
| `hd` | 1600×900 | 5,5 MB | Pantallas horizontales de más de 1024 px |
| `sd` | 960×540 | 2,6 MB | Horizontales pequeñas o conexión lenta |
| `movil` | 720×1280 | 3,6 MB | Cualquier pantalla vertical |

**Para cambiar las escenas:** las originales están en `media-fuentes/intro/`, fuera de `public/` para que no se
publiquen. El orden de unión es `Fase 1`, `fase 3`, `fase 2`, `fase 4`, con un fundido de 0,5 s en cada unión
(`xfade`, con `offset` 7.42, 14.84 y 22.26). De ahí salen dos másteres: uno horizontal y otro recortado a 9:16,
con la fase 4 recortada en `iw*0.6`, donde queda la cámara.

Cada máster se corta por cuadros (0–184, 184–362, 362–540, 540–724) y se exporta con un fotograma clave cada
12 cuadros, necesario para que el scroll avance fluido:

```bash
ffmpeg -i master.mp4 -vf "trim=start_frame=0:end_frame=184,setpts=PTS-STARTPTS,scale=1600:-2" -an -c:v libx264 -g 12 -keyint_min 12 -sc_threshold 0 -bf 0 -crf 30 -preset medium -pix_fmt yuv420p -movflags +faststart hd-1.mp4
```

Si cambian las duraciones, actualiza `videoParts` en `site.ts` y vuelve a extraer el último fotograma para
`heroImage.image`.

**Usa siempre una carpeta nueva** (`v5`, `v6`…) y actualiza `videoBase`: `/media` se guarda un año en la caché
del navegador, así que con el mismo nombre los visitantes seguirían viendo el video anterior.

## WhatsApp

- Botón flotante en todas las páginas.
- Cada servicio, tipo de cliente y proyecto abre WhatsApp con un mensaje relacionado.
- El formulario de contacto valida los campos y abre WhatsApp con el mensaje completo
  (nombre, tipo de cliente, servicio, descripción y correo). Alternativa: enviar por correo.
- Número en `site.ts` → `whatsapp.number` (formato internacional, sin "+").

## Publicar

El sitio está en Vercel y se publica solo con cada push a `main`. Dominio configurable con la variable
`NEXT_PUBLIC_SITE_DOMAIN` (sin `https://`).

## Siguientes etapas sugeridas

1. Fotos, videos y logo reales; nombre definitivo y dominio.
2. Envío del formulario también a correo (Resend) o a una base de datos.
3. Panel o CMS (Sanity, Decap o Supabase) si se quiere editar sin tocar código.
