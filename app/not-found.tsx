import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center py-40">
      <Container className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-olive-500">404</p>
        <h1 className="mt-6 font-display text-6xl font-light text-olive-900 md:text-8xl">
          Bu patika bir yere çıkmıyor
        </h1>
        <p className="mx-auto mt-6 max-w-md text-ink/80">
          Aradığınız sayfa bulunamadı. Ana sayfaya dönüp ormanın içinde yeniden
          yol alabilirsiniz.
        </p>
        <div className="mt-10">
          <ButtonLink href="/">Ana sayfaya dön</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
