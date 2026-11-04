import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { clientTypes } from "@/content/clientTypes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  const pages = ["", "/servicios", "/trabajo", "/equipo", "/nosotros", "/contacto"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...clientTypes.map((c) => ({ url: `${base}/para/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...projects.map((p) => ({ url: `${base}/trabajo/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
