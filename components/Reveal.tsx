"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** "image": görsel aşağıdan yukarı perde gibi açılır (clip-path) */
  variant?: "fade" | "image";
};

/**
 * Görünüme girince yumuşakça belirir. İçerik sunucuda görünür gelir; gizleme
 * yalnızca `<html class="js">` varken CSS ile yapılır (bkz. globals.css), bu
 * yüzden JS kapalıyken ya da botlar için metin her zaman erişilebilirdir.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "fade",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${variant === "image" ? "reveal-image" : "reveal"} ${className}`}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {variant === "image" ? (
        // Kırpma iç katmanda: gözlenen dış kabın kesişim alanı sıfıra düşmesin.
        <div className="reveal-clip absolute inset-0">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}
