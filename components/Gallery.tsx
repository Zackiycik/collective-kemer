"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Photo } from "@/content/photos";

export function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) =>
      setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const trigger = lastTrigger.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [index === null, close, step]); // eslint-disable-line react-hooks/exhaustive-deps

  const current = index !== null ? photos[index] : null;

  return (
    <>
      <ul
        className={`columns-1 gap-3 sm:columns-2 [&>li]:mb-3 ${photos.length > 4 ? "lg:columns-3" : ""}`}
      >
        {photos.map((p, i) => (
          <li key={p.src} className="break-inside-avoid">
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setIndex(i);
              }}
              aria-label={`Büyüt: ${p.alt}`}
              className="group relative block w-full overflow-hidden bg-olive-900/10"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Fotoğraf galerisi"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/92 p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            onClick={close}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Kapat"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-cream md:right-8 md:top-8"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current" fill="none" strokeWidth="1.2" aria-hidden>
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            </button>
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Önceki fotoğraf"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-cream md:left-6"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7 stroke-current" fill="none" strokeWidth="1.2" aria-hidden>
                    <path d="M15 4l-8 8 8 8" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Sonraki fotoğraf"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-cream md:right-6"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7 stroke-current" fill="none" strokeWidth="1.2" aria-hidden>
                    <path d="M9 4l8 8-8 8" />
                  </svg>
                </button>
              </>
            )}
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              className="max-h-full w-auto max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-cream/80">
              {index! + 1} / {photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
