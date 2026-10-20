"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function FilmButton({
  src,
  poster,
  label = "Filmi İzle",
}: {
  src: string;
  poster: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  // Pencere document.body'ye taşınır; animasyonlu üst öğeler `fixed` konumu kendi içine hapsetmesin.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const trigger = triggerRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-cream"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/70 transition-colors duration-300 group-hover:bg-cream group-hover:text-olive-900">
          <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden>
            <path d="M5 3l15 9-15 9z" />
          </svg>
        </span>
        {label}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Tanıtım filmi"
                className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 md:p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.3 }}
                onClick={() => setOpen(false)}
              >
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Filmi kapat"
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-cream md:right-8 md:top-8"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current" fill="none" strokeWidth="1.2" aria-hidden>
                    <path d="M4 4l16 16M20 4L4 20" />
                  </svg>
                </button>
                <video
                  className="max-h-full max-w-full bg-black md:max-w-6xl"
                  src={src}
                  poster={poster}
                  controls
                  autoPlay
                  playsInline
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
