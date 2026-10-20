import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/ContactCta";
import { EventGrid } from "@/components/EventGrid";
import { FilmButton } from "@/components/FilmButton";
import { HeroVideo } from "@/components/HeroVideo";
import { Intro } from "@/components/Intro";
import { ParallaxBand } from "@/components/ParallaxBand";
import { Reveal } from "@/components/Reveal";
import { Arrow, ButtonLink, Container, SectionTitle } from "@/components/ui";
import { photo } from "@/content/photos";
import { gastronomy, sortedEvents, venues } from "@/content/site";

export default function Home() {
  return (
    <>
      <Intro />

      {/* HERO */}
      <section className="relative isolate flex min-h-[100dvh] items-end text-cream">
        <HeroVideo
          src="/media/video/hero-loop.mp4"
          poster="/media/video/hero-poster.jpg"
          alt="Collective Kemer'in ormanın içindeki havadan görünümü"
        />
        <div className="hero-copy relative mx-auto w-full max-w-[1440px] px-6 pb-16 md:px-10 md:pb-24">
          <h1 className="font-display text-[clamp(3.5rem,11vw,9.5rem)] font-light leading-[0.9] tracking-[-0.02em]">
            Collective
            <br />
            Kemer
          </h1>
          <p className="mt-6 max-w-md text-base text-cream/85 md:text-lg">
            Ormanın içinde etkinlik, workshop, toplantı ve food market.
          </p>
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <FilmButton
              src="/media/video/tanitim-filmi.mp4"
              poster="/media/video/film-poster.jpg"
            />
            <Link
              href="#alanlar"
              className="group inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em]"
            >
              Alanları keşfet
              <Arrow className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* MANİFESTO */}
      <section className="py-28 md:py-44">
        <Container>
          <p className="mx-auto max-w-4xl text-center font-display text-[clamp(2rem,4.4vw,3.75rem)] font-light leading-[1.14] text-olive-900 [text-wrap:balance]">
            Göktürk Kent Ormanı&apos;nın içinde, doğayla iç içe bir buluşma
            noktası. Toplantıdan konsere, workshoptan açık hava sinemasına her
            ölçekte deneyim için.
          </p>
        </Container>
      </section>

      {/* ALANLAR */}
      <section id="alanlar" aria-label="Alanlar" className="scroll-mt-20">
        {venues.map((v, i) => (
          <Link
            key={v.slug}
            href={`/alanlar/${v.slug}`}
            className="group relative isolate flex min-h-[85dvh] items-end overflow-hidden bg-olive-900 text-cream"
          >
            <Image
              src={v.cover.src}
              alt={v.cover.alt}
              fill
              sizes="100vw"
              className="-z-10 object-cover transition-transform duration-[1600ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
              style={{ objectPosition: v.coverPosition }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/15 to-black/25" />
            <Container className="pb-14 md:pb-20">
              <div
                className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
                  i % 2 ? "md:flex-row-reverse md:text-right" : ""
                }`}
              >
                <div>
                  <h2 className="font-display text-[clamp(3rem,7.5vw,6rem)] font-light leading-[0.95] tracking-[-0.015em]">
                    {v.name}
                  </h2>
                  <p className="mt-4 max-w-md text-base text-cream/85 md:text-lg">
                    {v.kicker}
                  </p>
                </div>
                <div className={`flex items-center gap-6 ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                  {v.headline && (
                    <p className="tabular font-display text-3xl font-light md:text-4xl">
                      {v.headline.value}{" "}
                      <span className="text-base text-cream/75">{v.headline.unit}</span>
                    </p>
                  )}
                  <span
                    className={`inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] ${
                      v.headline ? "border-l border-cream/30 pl-6" : ""
                    }`}
                  >
                    Keşfet
                    <Arrow className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1.5" />
                  </span>
                </div>
              </div>
            </Container>
          </Link>
        ))}
      </section>

      {/* KONUM BANDI */}
      <ParallaxBand photo={photo("drone-campus-topdown")} position="50% 45%">
        <Container className="py-24">
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.25rem)] font-light leading-[1.02] tracking-[-0.015em]">
              Şehre yakın,
              <br />
              ormanın içinde.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream/85">
              Göktürk Kent Ormanı&apos;nın içinde; üç farklı alan, bir meydan ve
              geniş bir açık hava kullanımıyla tek bir kampüs.
            </p>
            <div className="mt-8">
              <ButtonLink href="/iletisim" variant="ghost-light">
                Konumu gör
              </ButtonLink>
            </div>
          </div>
        </Container>
      </ParallaxBand>

      {/* GASTRONOMİ */}
      <section className="py-24 md:py-40">
        <Container className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <SectionTitle>Deneyimin bir parçası: yemek</SectionTitle>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/75">
              {gastronomy.intro}
            </p>
            <ul className="mt-8 grid gap-x-8 gap-y-3 border-t border-olive-900/15 pt-6 text-sm text-ink/80 sm:grid-cols-2">
              {gastronomy.concepts.slice(0, 6).map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/gastronomi" variant="outline">
                Tüm konseptler
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:col-span-7">
            {gastronomy.gallery.slice(0, 4).map(
              (p, i) => (
                <Reveal
                  key={p.src}
                  variant="image"
                  delay={i * 0.08}
                  className={`relative aspect-[3/4] overflow-hidden ${i % 2 ? "mt-10" : ""}`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width:768px) 28vw, 50vw"
                    className="object-cover"
                  />
                </Reveal>
              ),
            )}
          </div>
        </Container>
      </section>

      {/* ETKİNLİKLER */}
      <section className="bg-cream-soft py-24 md:py-36">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle>Burada yaşananlar</SectionTitle>
            <ButtonLink href="/etkinlikler" variant="outline">
              Tüm etkinlikler
            </ButtonLink>
          </div>
          <div className="mt-14">
            <EventGrid items={sortedEvents.slice(0, 3)} />
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
