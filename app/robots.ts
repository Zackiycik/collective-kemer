import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Vercel üzerindeki yayın yalnızca gösterim (demo) amaçlıdır: indekslenmesin.
// Müşterinin kendi sunucusunda (VERCEL ortam değişkeni yok) normal robots çıktısı üretilir.
const isDemo = Boolean(process.env.VERCEL);

export default function robots(): MetadataRoute.Robots {
  if (isDemo) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
