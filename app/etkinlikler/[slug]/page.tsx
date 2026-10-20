import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ContactCta } from "@/components/ContactCta";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { PageSkeleton } from "@/components/PageSkeleton";
import { Container, SectionTitle } from "@/components/ui";
import { events, sortedEvents } from "@/content/site";

type Params = PageProps<"/etkinlikler/[slug]">["params"];

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(
  props: PageProps<"/etkinlikler/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const e = events.find((x) => x.slug === slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.summary,
    openGraph: { images: [e.cover.src] },
  };
}

export default function EventPage(props: PageProps<"/etkinlikler/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <EventContent params={props.params} />
    </Suspense>
  );
}

async function EventContent({ params }: { params: Params }) {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  if (!e) notFound();
  const others = sortedEvents.filter((x) => x.slug !== e.slug).slice(0, 2);

  return (
    <>
      <PageHero
        title={e.title}
        kicker={`${e.category}, ${e.dateLabel}`}
        photo={e.cover}
        position="50% 45%"
      />

      <section className="py-24 md:py-32">
        <Container className="grid gap-12 md:grid-cols-12">
          <p className="font-display text-[clamp(1.75rem,3.1vw,2.75rem)] font-light leading-[1.22] text-olive-900 md:col-span-7">
            {e.summary}
          </p>
          <dl className="divide-y divide-olive-900/15 border-y border-olive-900/15 text-sm md:col-span-3 md:col-start-10">
            <div className="flex justify-between py-3">
              <dt className="text-ink/80">Tarih</dt>
              <dd className="text-olive-900">{e.dateLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-ink/80">Alan</dt>
              <dd className="text-right text-olive-900">{e.venue}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-ink/80">Tür</dt>
              <dd className="text-olive-900">{e.category}</dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="pb-24 md:pb-36" aria-label={`${e.title} fotoğrafları`}>
        <Container>
          <Gallery photos={e.gallery} />
        </Container>
      </section>

      {others.length > 0 && (
        <section className="bg-cream-soft py-24 md:py-32">
          <Container>
            <SectionTitle>Diğer etkinlikler</SectionTitle>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/etkinlikler/${o.slug}`}
                  className="group relative isolate flex min-h-[44svh] items-end overflow-hidden bg-olive-900 p-8 text-cream"
                >
                  <Image
                    src={o.cover.src}
                    alt={o.cover.alt}
                    fill
                    sizes="(min-width:768px) 50vw, 100vw"
                    className="-z-10 object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 -z-10 bg-black/45" />
                  <div>
                    <p className="text-sm text-cream/75">{o.dateLabel}</p>
                    <p className="mt-2 font-display text-3xl font-light md:text-4xl">{o.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ContactCta />
    </>
  );
}
