import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/ContactCta";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Arrow, Container, SectionTitle } from "@/components/ui";
import { photo } from "@/content/photos";
import { venues } from "@/content/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Collective Kemer; Kent Ormanı'nın içinde etkinlik, toplantı, workshop ve food market deneyimi sunan çok amaçlı bir buluşma alanı.",
};

const pillars = [
  {
    title: "Event",
    text: "Konserlerden kurumsal buluşmalara, marka lansmanlarından açık hava sinemasına farklı ölçekte organizasyonlar.",
  },
  {
    title: "Workshop",
    text: "Yaratıcı üretim, eğitim ve atölye çalışmaları için odaklanmaya uygun, doğayla çevrili alanlar.",
  },
  {
    title: "Meeting",
    text: "Projeksiyon ve ses altyapısıyla donatılmış, kurumsal toplantılara ve özel buluşmalara uygun mekânlar.",
  },
  {
    title: "Food Market",
    text: "Açık büfe, barbekü, sokak lezzetleri ve live cooking gibi geniş bir gastronomi kurgusu.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Hakkımızda"
        kicker="Ormanın içinde bir buluşma noktası."
        photo={photo("courtyard-tent")}
        position="50% 35%"
      />

      <section className="py-24 md:py-36">
        <Container className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="font-display text-[clamp(1.75rem,3.2vw,2.9rem)] font-light leading-[1.22] text-olive-900 [text-wrap:balance]">
              Collective Kemer; Göktürk Kent Ormanı&apos;nın içinde, doğayla iç içe
              konumlanan çok amaçlı bir etkinlik ve deneyim alanıdır.
            </p>
            <div className="mt-10 max-w-[65ch] space-y-5 text-base leading-relaxed text-ink/75">
              <p>
                Atölye, Çadır Meydan ve Collective Sahne olmak üzere üç ayrı alanı
                ve açık hava kullanımına uygun geniş bir kampüsü bir araya getirir.
                Küçük ölçekli workshoplardan yüzlerce kişilik konserlere kadar her
                etkinliğe uygun bir kurgu sunar.
              </p>
              <p>
                Etkinlik deneyimini güçlü gastronomi kurgularıyla tamamlar:
                kahvaltı organizasyonlarından kokteyl servislerine, barbekü
                deneyimlerinden live cooking konseptlerine kadar farklı konseptlere
                uygun catering çözümleri sunulabilir.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-olive-900 py-24 text-cream md:py-32">
        <Container>
          <h2 className="font-display text-4xl font-light md:text-5xl">Dört deneyim, tek kampüs</h2>
          <div className="mt-12 grid gap-px bg-cream/20 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.title} className="bg-olive-900 py-8 sm:px-6 lg:first:pl-0">
                <h3 className="font-display text-3xl font-light">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-cream/80">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container>
          <SectionTitle>Üç alan</SectionTitle>
          <ul className="mt-12 divide-y divide-olive-900/15 border-y border-olive-900/15">
            {venues.map((v, i) => (
              <li key={v.slug}>
                <Link
                  href={`/alanlar/${v.slug}`}
                  className="group grid items-center gap-6 py-6 md:grid-cols-12"
                >
                  <Reveal
                    variant="image"
                    delay={i * 0.06}
                    className="relative aspect-[16/10] overflow-hidden bg-olive-900/10 md:col-span-3"
                  >
                    <Image
                      src={v.cover.src}
                      alt={v.cover.alt}
                      fill
                      sizes="(min-width:768px) 25vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: v.coverPosition }}
                    />
                  </Reveal>
                  <h3 className="font-display text-4xl font-light text-olive-900 md:col-span-4 md:text-5xl">
                    {v.name}
                  </h3>
                  <p className="text-sm text-ink/80 md:col-span-3">{v.kicker}</p>
                  <p className="tabular flex items-center justify-between gap-4 text-sm text-olive-900 md:col-span-2 md:justify-end">
                    {v.headline ? `${v.headline.value} ${v.headline.unit}` : ""}
                    <Arrow className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1.5" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
