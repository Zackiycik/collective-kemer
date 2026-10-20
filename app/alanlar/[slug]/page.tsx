import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ContactCta } from "@/components/ContactCta";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { PageSkeleton } from "@/components/PageSkeleton";
import { Arrow, Container } from "@/components/ui";
import { venues } from "@/content/site";

type Params = PageProps<"/alanlar/[slug]">["params"];

export function generateStaticParams() {
  return venues.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata(
  props: PageProps<"/alanlar/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const v = venues.find((x) => x.slug === slug);
  if (!v) return {};
  return {
    title: v.name,
    description: v.intro,
    openGraph: { images: [v.cover.src] },
  };
}

// URL'ye bağlı içerik Suspense içinde okunur; böylece rota kabuğu her bağlantı
// için ortak kalır ve gezinme anında başlar (Next.js instant navigation).
export default function VenuePage(props: PageProps<"/alanlar/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <VenueContent params={props.params} />
    </Suspense>
  );
}

async function VenueContent({ params }: { params: Params }) {
  const { slug } = await params;
  const v = venues.find((x) => x.slug === slug);
  if (!v) notFound();
  const others = venues.filter((x) => x.slug !== v.slug);

  return (
    <>
      <PageHero
        title={v.name}
        kicker={v.kicker}
        photo={v.cover}
        position={v.coverPosition}
        video={v.heroVideo}
      />

      <section className="py-24 md:py-36">
        <Container className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-display text-[clamp(1.75rem,3.1vw,2.75rem)] font-light leading-[1.22] text-olive-900">
              {v.intro}
            </p>
            <div className="mt-10 max-w-[65ch] space-y-5 text-base leading-relaxed text-ink/75">
              {v.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
          </div>

          {v.headline && (
            <dl className="md:col-span-4 md:col-start-9">
              <div className="border-t border-olive-900/25 pt-6">
                <dt className="text-sm text-ink/80">Kapasite</dt>
                <dd className="tabular mt-3 font-display text-7xl font-light leading-none text-olive-900 md:text-8xl">
                  {v.headline.value}
                  <span className="ml-3 align-baseline text-xl text-ink/80">{v.headline.unit}</span>
                </dd>
              </div>
              {v.capacities.length > 1 &&
                v.capacities.map((c, i) => (
                  <div
                    key={c.label}
                    className={`flex justify-between py-3 text-sm ${i === 0 ? "mt-8 border-t border-olive-900/15" : ""}`}
                  >
                    <dt className="text-ink/80">{c.label}</dt>
                    <dd className="tabular font-medium text-olive-900">{c.value}</dd>
                  </div>
                ))}
            </dl>
          )}
        </Container>
      </section>

      <section className="bg-olive-900 py-24 text-cream md:py-32">
        <Container className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-4xl font-light md:text-5xl">Altyapı</h2>
            <ul className="mt-8 space-y-3 font-display text-2xl font-light text-cream/90 md:text-3xl">
              {v.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 className="font-display text-4xl font-light md:text-5xl">Neler yapılabilir</h2>
            <ul className="mt-8 grid gap-x-10 gap-y-3 border-t border-cream/20 pt-6 text-base text-cream/85 sm:grid-cols-2">
              {v.uses.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {v.games && (
        <section className="py-24 md:py-36" aria-labelledby="games-title">
          <Container>
            <div className="grid gap-8 md:grid-cols-12">
              <h2
                id="games-title"
                className="font-display text-4xl font-light text-olive-900 md:col-span-5 md:text-5xl"
              >
                {v.games.title}
              </h2>
              <p className="max-w-[55ch] text-base leading-relaxed text-ink/75 md:col-span-6 md:col-start-7">
                {v.games.text}
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
              {v.games.photos.map((p) => (
                <div key={p.src} className="relative aspect-[3/4] overflow-hidden bg-olive-900/10">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width:768px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-24 md:py-36" aria-label={`${v.name} fotoğrafları`}>
        <Container>
          <Gallery photos={v.gallery} />
        </Container>
      </section>

      <section className="grid md:grid-cols-2" aria-label="Diğer alanlar">
        {others.map((o) => (
          <Link
            key={o.slug}
            href={`/alanlar/${o.slug}`}
            className="group relative isolate flex min-h-[48svh] items-end overflow-hidden bg-olive-900 p-8 text-cream md:p-12"
          >
            <Image
              src={o.cover.src}
              alt={o.cover.alt}
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              className="-z-10 object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
              style={{ objectPosition: o.coverPosition }}
            />
            <div className="absolute inset-0 -z-10 bg-black/45" />
            <div>
              <p className="text-sm text-cream/75">Diğer alan</p>
              <p className="mt-2 flex items-center gap-4 font-display text-4xl font-light md:text-5xl">
                {o.name}
                <Arrow className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-2" />
              </p>
            </div>
          </Link>
        ))}
      </section>

      <ContactCta title={`${v.name} için teklif alın`} />
    </>
  );
}
