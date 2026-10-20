import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/content/photos";

export function PageHero({
  title,
  kicker,
  photo,
  position = "50% 50%",
  video,
  children,
}: {
  title: string;
  kicker?: string;
  photo: Photo;
  position?: string;
  /** Varsa fotoğrafın üstünde sessiz döngü olarak oynar (hareket azaltmada gizlenir) */
  video?: { src: string; poster: string };
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-olive-900 text-cream">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        preload
        loading="eager"
        sizes="100vw"
        className="-z-10 object-cover"
        style={{ objectPosition: position }}
      />
      {video && (
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover motion-reduce:hidden"
          src={video.src}
          poster={video.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          style={{ objectPosition: position }}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/15 to-black/35" />
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-14 pt-40 md:px-10 md:pb-20">
        <h1 className="max-w-5xl font-display text-[clamp(3rem,8.5vw,6rem)] font-light leading-[0.98] tracking-[-0.015em] [text-wrap:balance]">
          {title}
        </h1>
        {kicker && (
          <p className="mt-5 max-w-xl text-base text-cream/85 md:text-lg">{kicker}</p>
        )}
        {children}
      </div>
    </section>
  );
}
