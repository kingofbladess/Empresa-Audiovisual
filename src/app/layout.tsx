import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Fraunces, Montserrat } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { themeScript } from "@/components/ThemeToggle";
import { ButtonFx } from "@/components/ButtonFx";

// Héroe: Barlow Condensed, condensada y contundente, para títulos y rótulos.
// Texto: Montserrat, la alternativa libre más cercana a Gotham.
// Explorador: Fraunces, de formas peculiares, para los acentos. No se precarga porque no es crítica.
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["700", "800"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const body = Montserrat({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const serif = Fraunces({ subsets: ["latin"], style: "italic", variable: "--font-serif", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: { default: `${site.name} | ${site.descriptor}`, template: `%s | ${site.name}` },
  description: site.description,
  keywords: ["productora audiovisual", "dirección creativa", "branding", "videoclips", "fotografía de productos", "dirección cinematográfica", "marca personal", "estrategia de marca", "Maracay", "Aragua", "Venezuela"],
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.manifesto,
    url: `https://${site.domain}`,
    siteName: site.name,
    locale: "es_VE",
    type: "website",
    images: [{ url: "/media/hero/set-final.jpg", width: 1600, height: 900, alt: `${site.name}: ${site.tagline}` }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0d0a08" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${body.variable} ${display.variable} ${serif.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Sin JavaScript todo el contenido debe seguir a la vista */}
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}.hero-stage{visibility:visible!important;opacity:1!important}.route-leg svg{clip-path:none}`}</style>
        </noscript>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-fg focus:px-4 focus:py-2 focus:text-bg">
          Saltar al contenido
        </a>
        <ButtonFx />
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <aside aria-label="Contacto rápido">
          <WhatsAppFloat />
        </aside>
      </body>
    </html>
  );
}
