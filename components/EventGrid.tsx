import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import type { EventItem } from "@/content/site";

/** Öne çıkan ilk etkinlik büyük, diğerleri yanında üst üste. */
export function EventGrid({
  items,
  headingLevel = "h3",
}: {
  items: EventItem[];
  /** Sayfada üstte h2 yoksa "h2" verilir (başlık sırası atlanmasın) */
  headingLevel?: "h2" | "h3";
}) {
  const [lead, ...rest] = items;
  if (!lead) return null;
  return (
    <div className="grid gap-x-6 gap-y-12 md:grid-cols-12">
      <Link href={`/etkinlikler/${lead.slug}`} className="group block md:col-span-7">
        <Reveal variant="image" className="relative aspect-[4/5] overflow-hidden bg-olive-900/10 md:aspect-[5/6]">
          <Image
            src={lead.cover.src}
            alt={lead.cover.alt}
            fill
            sizes="(min-width:768px) 58vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
          />
        </Reveal>
        <EventMeta item={lead} large as={headingLevel} />
      </Link>
      <div className="flex flex-col gap-12 md:col-span-5">
        {rest.map((e, i) => (
          <Link key={e.slug} href={`/etkinlikler/${e.slug}`} className="group block">
            <Reveal
              variant="image"
              delay={0.1 + i * 0.08}
              className="relative aspect-[16/11] overflow-hidden bg-olive-900/10"
            >
              <Image
                src={e.cover.src}
                alt={e.cover.alt}
                fill
                sizes="(min-width:768px) 40vw, 100vw"
                className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
              />
            </Reveal>
            <EventMeta item={e} as={headingLevel} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function EventMeta({
  item,
  large,
  as: Tag = "h3",
}: {
  item: EventItem;
  large?: boolean;
  as?: "h2" | "h3";
}) {
  return (
    <div className="mt-5">
      <p className="text-sm text-ink/80">
        {item.category}, {item.dateLabel}
      </p>
      <Tag
        className={`mt-1 font-display font-light leading-tight text-olive-900 ${
          large ? "text-4xl md:text-5xl" : "text-3xl"
        }`}
      >
        {item.title}
      </Tag>
    </div>
  );
}
