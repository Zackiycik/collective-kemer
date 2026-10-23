import { ButtonLink, Container, SectionTitle } from "./ui";
import { site } from "@/content/site";

export function ContactCta({
  title = "Bir etkinlik mi planlıyorsunuz?",
}: {
  title?: string;
}) {
  return (
    <section className="bg-cream-soft py-24 md:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle>{title}</SectionTitle>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/75">
            Tarih, katılımcı sayısı ve konseptinizi bize yazın; hayalindeki
            etkinliği birlikte tasarlayalım!
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href={`mailto:${site.email}`}>{site.email}</ButtonLink>
            <ButtonLink href="/iletisim" variant="outline">
              Konum ve iletişim
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
