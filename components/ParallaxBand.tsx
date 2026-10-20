"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Photo } from "@/content/photos";

export function ParallaxBand({
  photo,
  position = "50% 50%",
  children,
  className = "",
}: {
  photo: Photo;
  position?: string;
  children?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className={`relative isolate flex min-h-[80svh] items-center overflow-hidden bg-olive-900 text-cream ${className}`}
    >
      <motion.div
        className="absolute inset-x-0 -bottom-[12%] -top-[12%] -z-10"
        style={reduce ? undefined : { y }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-black/45" />
      {children}
    </section>
  );
}
