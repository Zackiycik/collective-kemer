# Collective Kemer — Website Planı

## Kararlar
| Konu | Karar |
|---|---|
| Amaç | Marka vitrini (atmosfer + alanların tanıtımı) |
| Yapı | Çok sayfalı |
| Dil | Sadece Türkçe |
| Teknoloji | Next.js (App Router) + Tailwind CSS + Motion/GSAP |
| Referans | ferrari.com — sinematik, tam ekran medya, büyük tipografi, bol boşluk |
| Hero | Tanıtım filmi (sessiz, kısa döngü) + "Filmi İzle" ile tam film |
| Tema | Krem zemin (#E9E5DE) + zeytin yeşili vurgu |
| Etkinlikler | Ayrı sayfa, her etkinliğe detay + galeri |
| İletişim | Adres + Google Harita + e-posta (form/telefon yok) |
| Font | Başlık: Cormorant Garamond, metin: Inter (ikisi de `@fontsource-variable` ile self-host, Türkçe karakter destekli) |
| Video | ffmpeg ile sıkıştırılıp projede (public/) tutulacak |
| Logo | PDF'ten vektör çıkarılacak, olmazsa SVG yeniden çizilecek |
| Yayın | Şimdilik lokal geliştirme; hosting sonra |

## Renk Tokenları
- `cream` #E9E5DE — ana zemin
- `olive-900` #52563A — başlıklar, footer, koyu bölümler
- `olive-700` #606245 — ikincil
- `olive-500` #7A7851 — vurgu, linkler, logo yazısı
- Açık ton yardımcıları: #F4F1EC (kart zemini), koyu metin #2B2C1E

## Sayfa Haritası
```
/                      Ana Sayfa
/alanlar/atolye        Atölye (35–50 kişi)
/alanlar/cadir-meydan  Çadır Meydan (Tiyatro 160 / Sınıf 140 / Kokteyl 200)
/alanlar/sahne         Collective Sahne (600–800 kişi, açık hava amfi)
/gastronomi            Catering & Food Market
/etkinlikler           Geçmiş etkinlikler listesi
/etkinlikler/[slug]    Etkinlik detayı + galeri
/hakkimizda            Hikâye / konsept
/iletisim              Adres, harita, e-posta
```

## Ana Sayfa Akışı (Ferrari dili)
1. **Hero** — tam ekran tanıtım filmi döngüsü, ortada büyük "COLLECTIVE KEMER", altında "Event · Workshop · Meeting · Food Market", "Filmi İzle" butonu. Menü şeffaf → scroll'da krem/blur.
2. **Manifesto** — tek cümlelik büyük tipografi ("Ormanın içinde bir buluşma noktası…").
3. **Alanlar** — 3 tam genişlik blok (Atölye / Çadır Meydan / Sahne), her biri büyük görsel/video + kapasite rakamı + "Keşfet →".
4. **Drone geçişi** — kampüsü kuşbakışı gösteren tam ekran parallax video bandı.
5. **Gastronomi** — yatay kaydırmalı yemek görselleri + servis konseptleri listesi.
6. **Etkinliklerden** — son etkinlik kartları (açık hava sineması, kurumsal, davet…) → /etkinlikler.
7. **Konum** — harita + adres + e-posta.
8. **Footer** — koyu zeytin, logo, menü, Instagram linki.

## Alan Detay Sayfası Şablonu
Hero görsel/video → açıklama → kapasite tablosu (yerleşim düzenleri) → altyapı ikonları (projeksiyon, ses, bahçe, büfe) → görsel galeri → bu alanda yapılan etkinlikler → diğer alanlara geçiş.

## Etkinlik İçeriği
Siteye alınan etkinlikler (müşteri adı yazılmaz, türüne göre adlandırılır): Kurumsal Buluşma, Özel Davet, Açık Hava Sineması. Yeni etkinlik, `content/site.ts` içindeki `events` dizisine kayıt eklenerek yapılır; dizi sırası sitedeki sıradır.

## Medya İşleme Hattı
1. Drive klasörleri `gdown` ile `raw-media/` dizinine indirilecek (git dışı).
2. Fotoğraflar: `sharp` ile AVIF/WebP, 3 boyut (640/1280/2400), `- Kopya` kopyaları ayıklanacak, en iyi kareler seçilecek.
3. Videolar: ffmpeg ile H.264 + WebM, 1080p/720p, sessiz, 8–15 sn döngüler (hero ≤ 6 MB), her biri için poster JPG.
4. Next.js `<Image>` + lazy loading. Video için mobilde poster ve düşük çözünürlük.

## Teknik Yapı
```
app/            sayfalar (App Router)
components/     Header, Footer, Hero, SectionMedia, CapacityTable, Gallery, Lightbox, MapEmbed
content/        venues.ts, events.ts, gastronomy.ts
public/media/   işlenmiş görsel/video
scripts/        medya dönüştürme scriptleri
```
- Animasyon: scroll'da fade/scale reveal, hero metin girişi, parallax bant; `prefers-reduced-motion` desteği.
- SEO: metadata, OpenGraph görselleri, `LocalBusiness`/`EventVenue` JSON-LD, sitemap.
- Erişilebilirlik ve mobil öncelikli responsive tasarım.

## Aşamalar
1. ✅ Kurulum: Next.js 16 + Tailwind 4, tokenlar, fontlar, logo SVG
2. ✅ Medya (temel set): 35 foto (WebP), hero döngüsü, tanıtım filmi. Etkinlik videoları henüz eklenmedi
3. ✅ Layout: Header (şeffaf→dolu, mobil menü), Footer
4. ✅ Ana sayfa
5. ✅ Alan sayfaları (3) + Gastronomi
6. ✅ Etkinlikler listesi + detay + galeri/lightbox (3 etkinlik)
7. ✅ Hakkımızda + İletişim (+ sitemap, robots, 404)
8. ✅ Cila (11.10.2026): kapı açılışlı intro, skill tabanlı tasarım düzeltmeleri, Suspense düzeltmesi, güvenlik başlıkları, axe + Lighthouse testleri
9. 🔶 Kalan: JSON-LD, OG görselleri, favicon, yeni tanıtım filmi

## Test sonuçları (11.10.2026)
- axe-core (WCAG 2.2 AA): 9 sayfada 0 ihlal
- Lighthouse mobil/masaüstü: Ana sayfa 97/99, Atölye 92/100, Etkinlikler 96; erişilebilirlik, en iyi uygulamalar ve SEO 100
- npm audit: production bağımlılıklarında 0 açık; 5 "high" yalnızca eslint-config-next içindeki braces@3.0.3 (dev aracı, yaması henüz yok)

## Müşteri Bilgileri (netleşti)
- E-posta: satis@collectivekemer.com
- Instagram: https://www.instagram.com/collectivekemer/
- Konum linki: https://share.google/w8SYP1VFcFNv8Wsvb ("Yol Tarifi" butonu). Harita embed: `https://www.google.com/maps?q=Collective+Kemer&output=embed`
- Tanıtım filmi: **final taslak 1** (hero döngüsü + "Filmi İzle")
- Hakkımızda ve tüm metinler katalogdan türetilerek yazılacak
- Müşteri/marka adları: kullanılabilir ama **mümkün olduğunca kullanılmayacak**. Etkinlikler türüne göre adlandırılacak (ör. "Kurumsal Buluşma — Temmuz 2026")

- Adres: Kent Ormanı, Göktürk Merkez Mah., Pirinççi Köy Yolu Sk. No:45/1, 34075 Eyüpsultan/İstanbul
  (JSON-LD `PostalAddress` ve İletişim sayfasında kullanılacak)

## Güncel Durum (20.10.2026)
- **Hero:** Drone turu, 1080p, sessiz döngü (`public/media/video/hero-loop.mp4`). **Filmi İzle:** dikey tanıtım videosu (`tanitim-filmi.mp4`); pencere `createPortal` ile `document.body`'ye render edilir.
- **Etkinlikler:** Kurumsal Buluşma, Özel Davet, Açık Hava Sineması (sıra `events` dizisinin sırasıdır). Tarihler şimdilik "Yaz 2026"; gerçek tarihler teyit edilecek.
- **Sahne:** Kapasite bilgisi gösterilmez (`headline` opsiyonel); "Aktiviteler ve eğlence" bölümü var. **Çadır Meydan:** 300 kişiye kadar.
- **Gastronomi:** Yumurta içeren görseller kullanılmaz. "Coffee break & brunch" ifadesi sitede yer almaz.
- **Kaldırılanlar:** Caz/jazz içerikleri tüm sitede kaldırıldı.
- **Görseller:** Müşteri logosu taşıyan kareler yayına alınmadan önce logosuz kırpılır. Fotoğraflar WebP, `content/photos.json` boyut manifestidir; yeni fotoğraf eklerken `content/photos.ts` içine alt metin de eklenir.
- **Favicon:** Mekân logosu (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`).
- **Depo kapsamı:** Bu depo yalnızca siteyi çalıştıran dosyaları içerir. Ham medya (`raw-media/`), dönüştürme betikleri ve yerel araç dosyaları yerelde tutulur, depoya alınmaz.
- **Kalan işler:** JSON-LD, OG görselleri, gerçek etkinlik tarihleri.
