import type { MetadataRoute } from "next";
import { events, nav, site, venues } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", ...nav.map((n) => n.href).filter((h) => !h.startsWith("/alanlar"))];
  const paths = [
    ...staticPaths,
    ...venues.map((v) => `/alanlar/${v.slug}`),
    ...events.map((e) => `/etkinlikler/${e.slug}`),
  ];
  return [...new Set(paths)].map((p) => ({ url: `${site.url}${p === "/" ? "" : p}` }));
}
