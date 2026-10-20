import Image from "next/image";

/**
 * Poster her zaman altta durur; video üstte oynar. `prefers-reduced-motion`
 * açıksa video CSS ile gizlenir ve yalnızca poster görünür (sunucu/istemci
 * çıktısı aynı kalır, hydration uyuşmazlığı olmaz).
 */
export function HeroVideo({
  src,
  poster,
  alt = "",
}: {
  src: string;
  poster: string;
  alt?: string;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-olive-900">
      <Image src={poster} alt={alt} fill preload loading="eager" sizes="100vw" className="object-cover" />
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent md:from-black/25" />
    </div>
  );
}
