import type { Metadata } from "next";
import { ContactCta } from "@/components/ContactCta";
import { EventGrid } from "@/components/EventGrid";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { sortedEvents } from "@/content/site";

export const metadata: Metadata = {
  title: "Etkinlikler",
  description:
    "Collective Kemer'de gerçekleşen kurumsal buluşmalar, davetler ve açık hava sineması geceleri.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        title="Etkinlikler"
        kicker="Kurumsal buluşmalardan davetlere ve sinema gecelerine, burada yaşananlar."
        photo={sortedEvents[0].cover}
        position="50% 45%"
      />
      <section className="py-24 md:py-36" aria-label="Etkinlik listesi">
        <Container>
          <EventGrid items={sortedEvents} headingLevel="h2" />
        </Container>
      </section>
      <ContactCta title="Sıradaki etkinlik sizin olsun" />
    </>
  );
}
