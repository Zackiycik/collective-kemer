import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost-light";
  external?: boolean;
  className?: string;
};

const VARIANTS = {
  solid: "border-olive-900 bg-olive-900 text-cream hover:border-olive-800 hover:bg-olive-800",
  outline: "border-olive-900 text-olive-900 hover:bg-olive-900 hover:text-cream",
  "ghost-light": "border-cream/70 text-cream hover:border-cream hover:bg-cream hover:text-olive-900",
} as const;

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-3 whitespace-nowrap border px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-[background-color,color,border-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.98]";

export function ButtonLink({
  href,
  children,
  variant = "solid",
  external,
  className = "",
}: ButtonProps) {
  // E-posta adresleri büyük harfe çevrilmez: tr dil kuralı "i"yi "İ" yapar ve adres bozulur.
  const caseCls = href.startsWith("mailto:") ? "!normal-case !tracking-[0.06em] text-sm" : "";
  const cls = `${BUTTON_BASE} ${VARIANTS[variant]} ${caseCls} ${className}`;
  if (external || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 8"
      className={`h-2 w-6 fill-none stroke-current ${className}`}
      strokeWidth="1"
      aria-hidden
    >
      <path d="M0 4h23M19 .5 23 4l-4 3.5" />
    </svg>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

/** Bölüm başlığı: etiket yok, başlık kendi ağırlığını taşır. */
export function SectionTitle({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <Tag
      className={`font-display text-[clamp(2.4rem,4.8vw,4.5rem)] font-light leading-[1.04] tracking-[-0.01em] text-olive-900 [text-wrap:balance] ${className}`}
    >
      {children}
    </Tag>
  );
}
