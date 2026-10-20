import type { Metadata } from "next";
import { ContactCta } from "@/components/ContactCta";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { photo } from "@/content/photos";
import { gastronomy } from "@/content/site";

export const metadata: Metadata = {
  title: "Gastronomi & Catering",
  description: gastronomy.intro,
};

export default function GastronomyPage() {
  return (
    <>
      <PageHero
        title="Gastronomi & Catering"
        kicker="Kahvaltıdan kokteyle, etkinliğe göre kurgulanan servis."
        photo={photo("food-plate-juice")}
        position="50% 72%"
      />

      <section className="py-24 md:py-36">
        <Container className="grid gap-14 md:grid-cols-12">
          <p className="font-display text-[clamp(1.75rem,3.1vw,2.75rem)] font-light leading-[1.22] text-olive-900 md:col-span-8">
            {gastronomy.intro}
          </p>
        </Container>
      </section>

      <section className="bg-olive-900 py-24 text-cream md:py-32">
        <Container>
          <h2 className="font-display text-4xl font-light md:text-5xl">Servis konseptleri</h2>
          <ul className="mt-10 grid gap-x-12 gap-y-5 border-t border-cream/20 pt-8 font-display text-2xl font-light text-cream/90 md:grid-cols-2 md:text-3xl">
            {gastronomy.concepts.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-24 md:py-36" aria-label="Yemek fotoğrafları">
        <Container>
          <Gallery photos={gastronomy.gallery} />
        </Container>
      </section>

      <ContactCta title="Menünüzü birlikte kurgulayalım" />
    </>
  );
}
