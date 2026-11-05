# UMBRAL · Web del estudio creativo y productora audiovisual

> "UMBRAL" es un nombre provisional. Se cambia en un solo lugar: `src/content/site.ts`.

**Tecnología:** Next.js 15 (App Router) · React 19 · Tailwind CSS 4 · TypeScript.
Se puede desplegar en Vercel o con Docker/Dokploy.

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
│  ├─ services.ts    las 6 especialidades y sus servicios
│  ├─ projects.ts    portafolio + categorías de filtro (cada uno genera /trabajo/<slug>)
│  ├─ team.ts        integrantes
│  ├─ journal.ts     bitácora creativa
│  ├─ clients.ts     marcas y personas que confían
│  ├─ about.ts       misión, visión, objetivos, valores y método
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
- **Video de portada:** pon el archivo en `/public/media/hero/` y su ruta en `site.heroVideo`.

## Intro de la cámara (scroll)

La portada empieza con una intro controlada por el scroll (`src/components/CameraIntro.tsx`): el scroll
avanza un solo video con las 3 escenas unidas, y al final la portada aparece con un fundido.

1. **Fase 1:** el objetivo se acopla a la cámara y gira hacia nosotros.
2. **Fase 2:** otra cámara de frente; entramos por el diafragma (archivo `fase 3.mp4`).
3. **Fase 3:** viaje por dentro del lente (archivo `fase 2.mp4`).

Se configura en `site.cameraIntro` (textos de cada fase, largo del recorrido, `enabled: false` para quitarla).

**Para cambiar las escenas:** las originales están en `media-fuentes/intro/`, fuera de `public/` para que no se publiquen (`Fase 1.mp4`, `fase 2.mp4`,
`fase 3.mp4`). El orden de unión es `Fase 1`, `fase 3`, `fase 2`. Se unen con un fundido de 0,5 s y un fotograma clave en cada cuadro (`-g 1`), necesario para
que el scroll avance fluido:

```bash
cd media-fuentes/intro
X="[0:v]settb=1/24,fps=24[a];[1:v]settb=1/24,fps=24[b];[2:v]settb=1/24,fps=24[c];[a][b]xfade=transition=fade:duration=0.5:offset=7.42[ab];[ab][c]xfade=transition=fade:duration=0.5:offset=14.84"
ffmpeg -i "Fase 1.mp4" -i "fase 3.mp4" -i "fase 2.mp4" -filter_complex "$X,scale=1600:-2,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -g 1 -crf 27 -preset medium -movflags +faststart ../../public/media/intro/escenas-v3.mp4
ffmpeg -i "Fase 1.mp4" -i "fase 3.mp4" -i "fase 2.mp4" -filter_complex "$X,crop=ih*9/16:ih,scale=540:-2,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -g 1 -crf 28 -preset medium -movflags +faststart ../../public/media/intro/escenas-movil-v3.mp4
```

`offset` es el segundo en que empieza cada fundido. Si cambia la duración, actualízalo junto con
`videoDuration` y `videoPhases` en `site.ts`.

**Usa siempre un nombre de archivo nuevo** y actualiza la ruta en `site.ts`: `/media` se guarda un año en la
caché del navegador, así que con el mismo nombre los visitantes seguirían viendo el video anterior.

## WhatsApp

- Botón flotante en todas las páginas.
- Cada servicio, tipo de cliente y proyecto abre WhatsApp con un mensaje relacionado.
- El formulario de contacto valida los campos y abre WhatsApp con el mensaje completo
  (nombre, tipo de cliente, servicio, descripción y correo). Alternativa: enviar por correo.
- Número en `site.ts` → `whatsapp.number` (formato internacional, sin "+").

## Publicar en Netlify

La configuración ya está en `netlify.toml` (adaptador oficial `@netlify/plugin-nextjs`, Node 22).

1. En [app.netlify.com](https://app.netlify.com): **Add new project → Import an existing project → GitHub**.
2. Autoriza Netlify y elige el repositorio `empresa-audiovisual`.
3. Rama de producción: `main`. No cambies nada más: Netlify lee el comando y la carpeta de `netlify.toml`.
4. **Deploy**. Cada push a `main` publica la web, y cada pull request recibe su propia vista previa.

Para el dominio propio: *Domain management → Add a domain*.

## Siguientes etapas sugeridas

1. Fotos, videos y logo reales; nombre definitivo y dominio.
2. Animación de portada (Google Flow) en `site.heroVideo`.
3. Envío del formulario también a correo (Resend) o a una base de datos.
4. Panel o CMS (Sanity, Decap o Supabase) si se quiere editar sin tocar código.
