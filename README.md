# UMBRAL · Web del estudio creativo y productora audiovisual

> "UMBRAL" es un nombre provisional. Se cambia en un solo lugar: `src/content/site.ts`.

**Tecnología:** Next.js 15 (App Router) · React 19 · Tailwind CSS 4 · TypeScript.
Mismo stack que `omnia-landing`, así que se despliega igual (Vercel o Docker/Dokploy).

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

La portada empieza con una intro de 3 fases controlada por el scroll (`src/components/CameraIntro.tsx`):

1. **Interior:** vista desde dentro de la cámara hacia la montura; al fondo, la portada desenfocada.
2. **Primer lente:** entra un elemento de vidrio y la imagen se enfoca un poco más.
3. **Lente final:** vista exterior, el objetivo se acopla, entramos por el cristal y la portada queda nítida.

Se configura en `site.cameraIntro` (textos de cada fase, largo del recorrido, `enabled: false` para quitarla).
Los usuarios con "reducir movimiento" activado ven la portada directamente.

**Con el video de Google Flow:** une las 3 fases en un solo video y ponlo en `cameraIntro.video`.
El scroll lo avanza fotograma a fotograma. Para que el avance sea fluido, expórtalo con un fotograma
clave en cada cuadro:

```bash
ffmpeg -i intro_flow.mp4 -an -c:v libx264 -g 1 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart -vf scale=1920:-2 public/media/intro/camara.mp4
ffmpeg -i intro_flow.mp4 -an -c:v libx264 -g 1 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart -vf "crop=ih*9/16:ih,scale=720:-2" public/media/intro/camara-movil.mp4
```

El último fotograma del video debe parecerse a la portada: al final del recorrido la portada aparece encima con un fundido.
En `cameraIntro.videoPhases` se indican los segundos del video en que empiezan la fase 2 y la fase 3,
para que los textos cambien en el momento justo. El último fotograma se usa también como fondo de
la portada (`heroVideo.image`).

## WhatsApp

- Botón flotante en todas las páginas.
- Cada servicio, tipo de cliente y proyecto abre WhatsApp con un mensaje relacionado.
- El formulario de contacto valida los campos y abre WhatsApp con el mensaje completo
  (nombre, tipo de cliente, servicio, descripción y correo). Alternativa: enviar por correo.
- Número en `site.ts` → `whatsapp.number` (formato internacional, sin "+").

## Siguientes etapas sugeridas

1. Fotos, videos y logo reales; nombre definitivo y dominio.
2. Animación de portada (Google Flow) en `site.heroVideo`.
3. Envío del formulario también a correo (Resend) o a una base de datos.
4. Panel o CMS (Sanity, Decap o Supabase) si se quiere editar sin tocar código.
