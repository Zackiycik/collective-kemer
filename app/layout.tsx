import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Vercel demo yayını indekslenmesin; müşterinin sunucusunda bu satır devre dışı kalır.
  robots: process.env.VERCEL ? { index: false, follow: false } : undefined,
  title: {
    default: "Collective Kemer | Etkinlik, Workshop, Toplantı, Food Market",
    template: "%s | Collective Kemer",
  },
  description:
    "Kent Ormanı'nın içinde, doğayla iç içe etkinlik, toplantı, workshop ve gastronomi deneyimi alanı.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className="h-full" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('ck-intro-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('intro-seen')}catch(e){}})()",
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
