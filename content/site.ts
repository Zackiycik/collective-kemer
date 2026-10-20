import { photo, type Photo } from "./photos";

export const site = {
  name: "Collective Kemer",
  url: "https://www.collectivekemer.com",
  tagline: "Event · Workshop · Meeting · Food Market",
  email: "satis@collectivekemer.com",
  instagram: "https://www.instagram.com/collectivekemer/",
  directions: "https://share.google/w8SYP1VFcFNv8Wsvb",
  address: {
    lines: [
      "Kent Ormanı, Göktürk Merkez Mah.",
      "Pirinççi Köy Yolu Sk. No:45/1",
      "34075 Eyüpsultan / İstanbul",
    ],
    street: "Pirinççi Köy Yolu Sk. No:45/1",
    locality: "Eyüpsultan",
    region: "İstanbul",
    postalCode: "34075",
    country: "TR",
  },
  mapEmbed:
    "https://www.google.com/maps?q=Collective+Kemer+Pirin%C3%A7%C3%A7i+K%C3%B6y+Yolu+Sk.+No%3A45%2F1+Eyüpsultan+İstanbul&output=embed",
} as const;

export const nav = [
  { href: "/alanlar/atolye", label: "Atölye" },
  { href: "/alanlar/cadir-meydan", label: "Çadır Meydan" },
  { href: "/alanlar/sahne", label: "Sahne" },
  { href: "/gastronomi", label: "Gastronomi" },
  { href: "/etkinlikler", label: "Etkinlikler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export type Venue = {
  slug: string;
  name: string;
  /** Kısa slogan, kart ve hero altında */
  kicker: string;
  intro: string;
  description: string[];
  /** Büyük rakam gösterimi; kapasite paylaşılmayacaksa verilmez */
  headline?: { value: string; unit: string };
  capacities: { label: string; value: string }[];
  features: string[];
  uses: string[];
  cover: Photo;
  /** Varsa sayfa hero'sunda sessiz döngü video oynar */
  heroVideo?: { src: string; poster: string };
  /** Hero görselinin odak noktası (object-position) */
  coverPosition?: string;
  gallery: Photo[];
  /** Varsa galerinin üstünde ayrı bir bölüm olarak gösterilir */
  games?: { title: string; text: string; photos: Photo[] };
};

export const venues: Venue[] = [
  {
    slug: "atolye",
    name: "Atölye",
    kicker: "Toplantı, workshop ve butik buluşmalar",
    intro:
      "Doğayla iç içe konumlanan Atölye; toplantılar, özel kutlamalar, workshoplar ve yaratıcı buluşmalar için tasarlanmış çok amaçlı bir deneyim alanı.",
    description: [
      "Projeksiyon ve ses sistemi altyapısı, özel arka bahçesi ve esnek kullanım yapısıyla Atölye, hem kurumsal etkinliklere hem de butik organizasyonlara ev sahipliği yapar.",
      "Ahşap dokulu iç mekân, orman manzaralı geniş camlar ve açık hava alanına açılan arka bahçe; küçük ölçekli buluşmaların da ihtiyaç duyduğu sakin ve odaklı atmosferi sunar.",
    ],
    headline: { value: "35-50", unit: "kişi" },
    capacities: [{ label: "Kapasite", value: "35-50 kişi" }],
    features: [
      "Projeksiyon altyapısı",
      "Ses sistemi",
      "Özel arka bahçe",
      "Esnek yerleşim",
    ],
    uses: [
      "Kurumsal toplantılar",
      "Workshoplar",
      "Özel kutlamalar",
      "Yaratıcı buluşmalar",
    ],
    cover: photo("atolye-interior-2"),
    coverPosition: "50% 50%",
    gallery: [
      photo("drone-atolye-interior"),
      photo("atolye-interior-1"),
      photo("atolye-interior-3"),
      photo("atolye-interior-4"),
      photo("atolye-interior-2"),
    ],
  },
  {
    slug: "cadir-meydan",
    name: "Çadır Meydan",
    kicker: "Lansmanlar, söyleşiler ve büyük davetler",
    intro:
      "Çadır Meydan, çok amaçlı etkinlik alanımızdır. Kurumsal organizasyonlardan özel davetlere kadar farklı kullanım senaryolarına uygun esnek bir yapıya sahiptir.",
    description: [
      "Müzik performansları, söyleşiler, marka lansmanları, şirket buluşmaları, toplu yemek organizasyonları ve özel davetler için tasarlanmış kapalı etkinlik alanı.",
      "Açık büfe servis düzenine uygun altyapısı ve esnek yerleşim planıyla farklı konseptlere kolayca adapte olur. Projeksiyon, ses sistemi ve servis altyapısıyla kurumsal toplantılar, eğitimler, workshoplar, networking etkinlikleri ve gastronomi deneyimleri için profesyonel kullanım imkânı sunar.",
    ],
    headline: { value: "300", unit: "kişiye kadar" },
    capacities: [
      { label: "Tiyatro düzeni", value: "160 kişi" },
      { label: "Sınıf düzeni", value: "140 kişi" },
      { label: "Kokteyl düzeni", value: "300 kişi" },
    ],
    features: [
      "Projeksiyon",
      "Ses sistemi",
      "Servis altyapısı",
      "Açık büfe düzenine uygun",
      "Esnek yerleşim planı",
    ],
    uses: [
      "Müzik performansları",
      "Söyleşiler",
      "Marka lansmanları",
      "Şirket buluşmaları",
      "Toplu yemek organizasyonları",
      "Özel davetler",
      "Eğitimler ve networking",
    ],
    cover: photo("tent-piano-night"),
    coverPosition: "50% 42%",
    heroVideo: { src: "/media/video/cadir-hero.mp4", poster: "/media/video/cadir-hero.jpg" },
    gallery: [
      photo("courtyard-tent"),
      photo("drone-tent-interior"),
      photo("corp-tent-audience"),
      photo("tent-lounge"),
      photo("tent-piano-night"),
      photo("tent-night"),
      photo("live-duo"),
      photo("live-vocalist"),
      photo("terrace-umbrella-dusk"),
    ],
  },
  {
    slug: "sahne",
    name: "Collective Sahne",
    kicker: "Ormanın içinde açık hava amfisi",
    intro:
      "Collective Sahne, orman içinde konumlanan geniş açık hava etkinlik alanımızdır. Konserlerden açık hava sinemasına, kurumsal organizasyonlardan özel davetlere kadar farklı ölçekte deneyimlere ev sahipliği yapacak şekilde tasarlanmıştır.",
    description: [
      "Amfi yapısı, sahne altyapısı ve geniş kullanım alanıyla hem izleyici deneyimini hem de etkinlik akışını güçlü şekilde destekler.",
      "Piknik oturma alanları, açık hava yerleşimleri ve amfi düzeni sayesinde hem büyük ölçekli etkinliklerde hem de butik deneyimlerde güçlü bir atmosfer sunar.",
    ],
    capacities: [],
    features: [
      "Amfi düzeni",
      "Sahne altyapısı",
      "Piknik oturma alanları",
      "Açık hava yerleşimleri",
    ],
    uses: [
      "Canlı müzik ve konserler",
      "Kurumsal etkinlikler",
      "Marka lansmanları",
      "Açık hava sineması ve maç yayınları",
      "Networking etkinlikleri",
      "Toplu yemek ve açık büfe organizasyonları",
      "Takım aktiviteleri ve eğlence alanları",
      "Workshoplar",
    ],
    cover: photo("drone-amphi-umbrellas"),
    coverPosition: "50% 58%",
    heroVideo: { src: "/media/video/sahne-hero.mp4", poster: "/media/video/sahne-hero.jpg" },
    gallery: [
      photo("drone-stage-umbrella"),
      photo("drone-amphi-wide"),
      photo("drone-campus-topdown"),
      photo("amphitheater-screen"),
      photo("aerial-campus-arc"),
      photo("aerial-dance-floor"),
      photo("aerial-lawn-umbrellas"),
      photo("dance-1"),
      photo("aerial-night"),
    ],
    games: {
      title: "Aktiviteler ve eğlence",
      text: "Çimenlik alanda kurulan takım yarışmaları, ip ve strateji oyunları ve eğlenceli aktivite istasyonlarıyla ekipler için hareketli, birbirini tanıma odaklı bir etkinlik akışı.",
      photos: [
        photo("game-survivor"),
        photo("game-basketball"),
        photo("game-rope"),
        photo("game-board"),
      ],
    },
  },
];

export const gastronomy = {
  intro:
    "Collective Kemer, etkinlik deneyimini güçlü gastronomi kurgularıyla tamamlayan çok yönlü bir servis altyapısına sahiptir. Kurumsal organizasyonlardan büyük ölçekli davetlere kadar farklı konseptlere uygun catering çözümleri sunulabilir.",
  concepts: [
    "Açık büfe kahvaltı organizasyonları",
    "Barbekü & Grill deneyimleri",
    "Sokak lezzetleri konseptleri",
    "Kokteyl servisleri",
    "Şirket yemekleri",
    "Festival & outdoor catering alanları",
    "Live cooking deneyimleri",
  ],
  gallery: [
    photo("food-breakfast-table"),
    photo("food-plate-juice"),
    photo("food-chicken-fries"),
    photo("food-schnitzel"),
    photo("food-breakfast-honey"),
    photo("food-napkin-logo"),
    photo("food-chicken-plate"),
    photo("food-salad-bowl"),
    photo("corp-buffet-line"),
    photo("food-sliders"),
    photo("food-wraps"),
    photo("food-croquettes"),
  ],
};

export type EventItem = {
  slug: string;
  title: string;
  /** Görüntülenen tarih */
  dateLabel: string;
  /** ISO, sıralama için */
  date: string;
  category: string;
  venue: string;
  summary: string;
  cover: Photo;
  gallery: Photo[];
};

// Yeni etkinlik eklemek için diziye bir kayıt eklemek yeterli.
// Liste sırası sitedeki sıradır: kurumsal, davet, sinema.
export const events: EventItem[] = [
  {
    slug: "kurumsal-bulusma",
    title: "Kurumsal Buluşma",
    dateLabel: "Yaz 2026",
    date: "2026-08-15", // yaklaşık; yalnızca tip gereği
    category: "Kurumsal",
    venue: "Çadır Meydan & Collective Sahne",
    summary:
      "Çadır Meydan'da başlayan toplantının ardından ormanın içinde uzun masalarda yemek, açık büfe servisi ve çimenlik alanda ekip oyunları.",
    cover: photo("corp-long-tables"),
    gallery: [
      photo("corp-tent-audience"),
      photo("corp-long-tables"),
      photo("corp-buffet-line"),
      photo("game-survivor"),
      photo("game-board"),
      photo("game-rope"),
      photo("game-basketball"),
    ],
  },
  {
    slug: "ozel-davet",
    title: "Özel Davet",
    dateLabel: "Yaz 2026",
    date: "2026-08-29", // yaklaşık; yalnızca tip gereği
    category: "Davet",
    venue: "Collective Kemer",
    summary:
      "Çiçeklerle süslenmiş bir kemer, ormanın gölgesinde mumlu uzun bir masa ve butik ikramlar: özel davetler için kurgulanan açık hava düzeni.",
    cover: photo("davet-table-sky"),
    gallery: [
      photo("davet-table-sky"),
      photo("davet-flower-arch"),
      photo("davet-bouquet"),
      photo("davet-table-long"),
      photo("davet-garden-aerial"),
      photo("food-sliders"),
      photo("food-croquettes"),
    ],
  },
  {
    slug: "acik-hava-sinemasi",
    title: "Açık Hava Sineması",
    dateLabel: "8 Ağustos 2026",
    date: "2026-08-08",
    category: "Sinema",
    venue: "Collective Sahne",
    summary:
      "Amfi düzeninde, ormanın ortasında yıldızların altında bir sinema gecesi. Gün batımında başlayan gösterim, gece boyunca açık havada sürdü.",
    cover: photo("amphitheater-screen-dusk"),
    gallery: [
      photo("amphitheater-screen-dusk"),
      photo("amphitheater-screen"),
      photo("aerial-campus-top"),
      photo("aerial-campus-arc"),
      photo("aerial-night"),
    ],
  },
];

/** Sitedeki sıra, `events` dizisinin sırasıdır. */
export const sortedEvents = events;
