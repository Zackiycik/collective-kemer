import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { Year } from "./Year";
import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-olive-900 text-cream">
      <Container className="grid gap-14 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <Logo tone="dark" className="text-2xl" />
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-cream/80">
            Kent Ormanı&apos;nın içinde; etkinlik, workshop, toplantı ve gastronomi
            deneyimi için doğayla iç içe bir buluşma noktası.
          </p>
        </div>

        <nav aria-label="Alt menü" className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.28em] text-cream/80">Keşfet</p>
          <ul className="mt-6 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-cream/85 transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.28em] text-cream/80">İletişim</p>
          <address className="mt-6 space-y-1 text-sm not-italic leading-relaxed text-cream/85">
            {site.address.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <div className="mt-5 space-y-2 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="block text-cream underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-cream/85 underline-offset-4 hover:underline"
            >
              Instagram: @collectivekemer
            </a>
            <a
              href={site.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-cream/85 underline-offset-4 hover:underline"
            >
              Yol tarifi al
            </a>
          </div>
        </div>
      </Container>
      <div className="border-t border-cream/15">
        <Container className="flex flex-col justify-between gap-2 py-6 text-xs text-cream/80 sm:flex-row">
          <span>© <Year initial={2026} /> Collective Kemer. Tüm hakları saklıdır.</span>
          <span>{site.tagline}</span>
        </Container>
      </div>
    </footer>
  );
}
