import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Container } from "@/components/ui";
import { photo } from "@/content/photos";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${site.address.lines.join(", ")}. ${site.email}`,
};

const linkCls =
  "text-lg text-olive-900 underline decoration-olive-500/40 underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-olive-900";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="İletişim"
        kicker="Etkinliğinizi birlikte planlayalım."
        photo={photo("aerial-lawn-umbrellas")}
        position="50% 50%"
      />

      <section className="py-24 md:py-32">
        <Container className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <dl className="space-y-10">
              <div>
                <dt className="text-sm text-ink/80">Adres</dt>
                <dd className="mt-3">
                  <address className="font-display text-3xl font-light not-italic leading-snug text-olive-900">
                    {site.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ink/80">E-posta</dt>
                <dd className="mt-3">
                  <a href={`mailto:${site.email}`} className={linkCls}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ink/80">Instagram</dt>
                <dd className="mt-3">
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    @collectivekemer
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-12">
              <ButtonLink href={site.directions} external>
                Yol tarifi al
              </ButtonLink>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="aspect-[4/3] w-full overflow-hidden bg-olive-900/10 md:aspect-[16/11]">
              <iframe
                title="Collective Kemer konumu"
                src={site.mapEmbed}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
