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
