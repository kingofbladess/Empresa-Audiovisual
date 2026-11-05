import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

// Inter Tight: títulos contundentes y texto. Instrument Serif: acentos cinematográficos. JetBrains Mono: rótulos tipo cámara.
const body = Inter_Tight({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Inter_Tight({ subsets: ["latin"], weight: ["800", "900"], variable: "--font-display", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: { default: `${site.name} | ${site.descriptor}`, template: `%s | ${site.name}` },
  description: site.description,
  keywords: ["productora audiovisual", "dirección creativa", "branding", "videoclips", "fotografía de productos", "dirección cinematográfica", "marca personal", "Venezuela"],
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.manifesto,
    url: `https://${site.domain}`,
    siteName: site.name,
    locale: "es_VE",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#070707" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${body.variable} ${display.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-fg focus:px-4 focus:py-2 focus:text-bg">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
