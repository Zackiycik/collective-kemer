"use client";

import { useEffect, useRef } from "react";
import {
  ARCH_BAND,
  ARCH_BASE,
  ARCH_DOOR,
  ARCH_STRIPS,
  ARCH_VIEWBOX,
  DOOR_BOX,
} from "./arch-paths";

/**
 * Açılış: krem duvarda marka kemeri belirir, kapı kanatları açılır ve kamera
 * kapı boşluğundan içeri girer. Duvar, kapı şeklinde delikli dev bir yüzeydir;
 * deliğin ardında gerçek sayfa (hero videosu) durur. Sahne büyüdükçe delik
 * ekranı kaplar ve site açılmış olur.
 *
 * Oturum başına bir kez oynar. `html.intro-seen` (layout'taki satır içi betik,
 * tekrar ziyaret veya azaltılmış hareket) varsa hiç görünmez; JS çalışmazsa
 * CSS'teki güvenlik animasyonu katmanı kaldırır.
 */

const STORAGE_KEY = "ck-intro-seen";
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_DOORS = "cubic-bezier(0.77, 0, 0.175, 1)";
const EASE_PUSH = "cubic-bezier(0.76, 0, 0.24, 1)";

// Kamera kapının alt-orta bölgesine doğru ilerler (viewBox koordinatı).
const FOCUS = { x: (DOOR_BOX.left + DOOR_BOX.right) / 2, y: 282 };
// Kemerin yuvarlak tepesi bittikten sonra kapının tam genişliğe ulaştığı yükseklik.
const DOOR_FULL_WIDTH_Y = 250;
const VB = { x: 436, y: 170, w: 200, h: 160 };
const ORIGIN = {
  x: ((FOCUS.x - VB.x) / VB.w) * 100,
  y: ((FOCUS.y - VB.y) / VB.h) * 100,
};
const LEAF_W = (DOOR_BOX.right - DOOR_BOX.left) / 2;

export function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const leftRef = useRef<SVGGElement>(null);
  const rightRef = useRef<SVGGElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    const stage = stageRef.current;
    const word = wordRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const skip = skipRef.current;
    if (!root || !stage || !word || !left || !right || !skip) return;

    if (
      html.classList.contains("intro-seen") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof root.animate !== "function"
    ) {
      root.style.display = "none";
      html.classList.add("intro-seen");
      return;
    }

    const anims: Animation[] = [];
    let done = false;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const play = (
      el: Element,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions,
    ) => {
      const a = el.animate(keyframes, { fill: "forwards", ...options });
      anims.push(a);
      return a;
    };

    const finish = () => {
      if (done) return;
      done = true;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* gizli sekme vb. */
      }
      html.style.overflow = prevOverflow;
      html.classList.add("intro-done");
      root.style.display = "none";
      anims.forEach((a) => a.cancel());
    };

    // Kapı boşluğunun ekranı tamamen kaplaması için gereken ölçek.
    const r = stage.getBoundingClientRect();
    const ux = r.width / VB.w;
    const uy = r.height / VB.h;
    const ox = r.left + (ORIGIN.x / 100) * r.width;
    const oy = r.top + (ORIGIN.y / 100) * r.height;
    const halfDoor = LEAF_W * ux;
    const scale =
      Math.max(
        ox / halfDoor,
        (window.innerWidth - ox) / halfDoor,
        oy / ((FOCUS.y - DOOR_FULL_WIDTH_Y) * uy),
        (window.innerHeight - oy) / ((DOOR_BOX.bottom - FOCUS.y) * uy),
      ) * 1.12;

    // 1) Logo belirir
    play(
      stage,
      [
        { opacity: 0, transform: "scale(0.94)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 1100, easing: EASE_OUT },
    );
    play(
      word,
      [
        { opacity: 0, transform: "translateY(10px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 900, delay: 250, easing: EASE_OUT },
    );
    // Krem zemin, kanatlar tam görünürken kalkar; artık sadece kapı boşluğu açılacak.
    play(root, [{ backgroundColor: "#e9e5de" }, { backgroundColor: "rgba(233,229,222,0)" }], {
      duration: 1,
      delay: 1500,
    });
    // 2) Yazı çekilir, kapı kanatları açılır
    play(word, [{ opacity: 1 }, { opacity: 0 }], {
      duration: 380,
      delay: 1500,
      easing: EASE_OUT,
    });
    const doorOpts = { duration: 1050, delay: 1550, easing: EASE_DOORS };
    play(left, [{ transform: "scaleX(1)" }, { transform: "scaleX(0.04)" }], doorOpts);
    play(right, [{ transform: "scaleX(1)" }, { transform: "scaleX(0.04)" }], doorOpts);
    // 3) Kamera kapıdan içeri girer
    const push = play(
      stage,
      [{ transform: "scale(1)" }, { transform: `scale(${scale})` }],
      { duration: 1350, delay: 2150, easing: EASE_PUSH, composite: "replace" },
    );
    push.finished.then(finish).catch(() => {});

    const onSkip = () => {
      if (done) return;
      const fade = root.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 220,
        easing: EASE_OUT,
        fill: "forwards",
      });
      fade.finished.then(finish).catch(finish);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onSkip();
    skip.addEventListener("click", onSkip);
    window.addEventListener("keydown", onKey);

    return () => {
      skip.removeEventListener("click", onSkip);
      window.removeEventListener("keydown", onKey);
      if (!done) {
        anims.forEach((a) => a.cancel());
        html.style.overflow = prevOverflow;
      }
    };
  }, []);

  return (
    <div ref={rootRef} className="intro fixed inset-0 z-[100] overflow-hidden bg-cream">
      <div className="flex h-full flex-col items-center justify-center gap-7">
        <div
          ref={stageRef}
          className="intro-stage relative aspect-[200/160] w-[clamp(180px,24vw,320px)] will-change-transform"
          style={{ transformOrigin: `${ORIGIN.x}% ${ORIGIN.y}%` }}
        >
          <svg
            viewBox={ARCH_VIEWBOX}
            overflow="visible"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <clipPath id="intro-door">
                <path d={ARCH_DOOR} />
              </clipPath>
              <linearGradient id="intro-leaf" gradientUnits="userSpaceOnUse" x1="0" y1="220" x2="0" y2="320">
                <stop stopColor="#606244" />
                <stop offset="1" stopColor="#4d4e38" />
              </linearGradient>
              <linearGradient id="intro-band" gradientUnits="userSpaceOnUse" x1="0" y1="196" x2="0" y2="322">
                <stop stopColor="#52563a" />
                <stop offset="1" stopColor="#454831" />
              </linearGradient>
            </defs>

            {/* Duvar: kapı şeklinde delikli, ekranı taşan yüzey */}
            <path
              fill="#e9e5de"
              fillRule="evenodd"
              d={`M-30000 -30000H30000V30000H-30000Z ${ARCH_DOOR}`}
            />
            <path fill="url(#intro-band)" d={ARCH_BAND} />
            <path fill="#7a7851" d={ARCH_BASE} />
            {ARCH_STRIPS.map((d) => (
              <path key={d.slice(0, 16)} fill="#e9e5de" d={d} />
            ))}

            {/* Kapı kanatları */}
            <g clipPath="url(#intro-door)">
              <g ref={leftRef} className="intro-leaf intro-leaf-l">
                <rect x={DOOR_BOX.left} y={DOOR_BOX.top} width={LEAF_W + 0.2} height="100" fill="url(#intro-leaf)" />
                <rect x={DOOR_BOX.left + 5} y="252" width={LEAF_W - 9} height="60" fill="none" stroke="#7a7851" strokeWidth="0.5" opacity="0.7" />
                <circle cx={DOOR_BOX.left + LEAF_W - 3.2} cy="284" r="1.1" fill="#e9e5de" />
              </g>
              <g ref={rightRef} className="intro-leaf intro-leaf-r">
                <rect x={DOOR_BOX.left + LEAF_W - 0.2} y={DOOR_BOX.top} width={LEAF_W + 0.2} height="100" fill="url(#intro-leaf)" />
                <rect x={DOOR_BOX.left + LEAF_W + 4} y="252" width={LEAF_W - 9} height="60" fill="none" stroke="#7a7851" strokeWidth="0.5" opacity="0.7" />
                <circle cx={DOOR_BOX.left + LEAF_W + 3.2} cy="284" r="1.1" fill="#e9e5de" />
              </g>
            </g>
          </svg>
        </div>

        <p
          ref={wordRef}
          className="intro-word flex flex-col items-center text-olive-500"
          aria-hidden
        >
          <span className="text-[clamp(1.1rem,2vw,1.6rem)] tracking-[0.32em]">COLLECTIVE</span>
          <span className="mt-2 text-[clamp(0.7rem,1.2vw,0.95rem)] tracking-[0.42em]">KEMER</span>
        </p>
      </div>

      <button
        ref={skipRef}
        type="button"
        className="intro-skip absolute bottom-6 right-6 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-olive-900/70 transition-colors duration-200 hover:text-olive-900 md:bottom-10 md:right-10"
        aria-label="Açılış animasyonunu geç"
      >
        Geç
      </button>
    </div>
  );
}
