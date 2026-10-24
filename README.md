# Collective Kemer

Göktürk Kent Ormanı'ndaki etkinlik mekânı **Collective Kemer** için tanıtım (vitrin) sitesi. Alanlar (Atölye, Çadır Meydan, Collective Sahne), gastronomi, etkinlikler ve iletişim bilgileri. Yalnızca Türkçe.

- **Canlı demo:** https://collective-kemer-demo.vercel.app
- **Teknoloji:** Next.js 16 (App Router, `cacheComponents`), React 19, Tailwind CSS 4, `motion`

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # üretim derlemesi
npm start        # derlenmiş siteyi çalıştırır
npm run lint
```

Node.js 20 veya üzeri gerekir.

## Yapı

```
app/          sayfalar (ana sayfa, alanlar, gastronomi, etkinlikler, hakkımızda, iletişim)
components/   Header, Footer, Hero, Gallery, FilmButton vb.
content/      site.ts (metinler, alanlar, etkinlikler), photos.ts + photos.json (fotoğraflar)
public/       logo (brand/) ve işlenmiş görsel/video (media/)
```

## İçerik güncelleme

- **Metin, kapasite, alan bilgileri ve etkinlikler:** `content/site.ts`
- **Yeni etkinlik:** `events` dizisine kayıt ekleyin; dizideki sıra sitedeki sıradır.
- **Yeni fotoğraf:** WebP olarak `public/media/photos/` altına koyun, boyutunu `content/photos.json`'a, alt metnini `content/photos.ts`'e ekleyin.
