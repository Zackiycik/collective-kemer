import Image from "next/image";

type LogoProps = {
  /** "dark" = koyu zemin üzerinde (krem logo), "light" = açık zemin üzerinde */
  tone?: "dark" | "light";
  variant?: "primary" | "wordmark" | "icon";
  className?: string;
  /** Yanında görünür marka metni varsa ikon dekoratif kalır */
  decorative?: boolean;
};

export function Logo({
  tone = "light",
  variant = "primary",
  className = "",
  decorative = false,
}: LogoProps) {
  const color = tone === "dark" ? "text-cream" : "text-olive-500";
  const icon = tone === "dark" ? "/brand/icon-light.svg" : "/brand/icon-color.svg";

  if (variant === "icon") {
    return (
      <Image
        src={icon}
        alt={decorative ? "" : "Collective Kemer"}
        width={200}
        height={160}
        className={className}
      />
    );
  }

  if (variant === "wordmark") {
    return (
      <span
        className={`inline-flex flex-col items-center leading-none ${color} ${className}`}
      >
        <span className="tracking-[0.3em] font-normal">COLLECTIVE</span>{" "}
        <span className="mt-[0.5em] flex w-full items-center gap-[0.8em] text-[0.62em] tracking-[0.3em]">
          <span className="h-px flex-1 bg-current opacity-60" />
          KEMER
          <span className="h-px flex-1 bg-current opacity-60" />
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-col items-center ${color} ${className}`}>
      <Image src={icon} alt="" width={200} height={160} className="h-[2.6em] w-auto" aria-hidden />
      <span className="mt-[0.4em] leading-none tracking-[0.3em]">COLLECTIVE</span>{" "}
      <span className="mt-[0.5em] text-[0.6em] leading-none tracking-[0.35em]">
        KEMER
      </span>
    </span>
  );
}
