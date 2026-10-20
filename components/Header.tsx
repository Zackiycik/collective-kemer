"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "./Logo";
import { nav, site } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  // Menü, açıldığı sayfaya bağlıdır: rota değişince otomatik kapanır.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) =>
    setOpenPath((cur) => ((typeof v === "function" ? v(cur === pathname) : v) ? pathname : null));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenPath(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;
  const light = !solid; // krem yazı (görsel/koyu zemin üstünde)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${
          solid
            ? "bg-cream/90 py-3 shadow-[0_1px_0_rgba(82,86,58,0.12)] backdrop-blur-md"
            : "bg-gradient-to-b from-black/45 to-transparent py-5"
        } ${open ? "bg-transparent from-transparent" : ""}`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <Logo
              variant="icon"
              decorative
              tone={light ? "dark" : "light"}
              className="h-9 w-auto"
            />
            <Logo
              variant="wordmark"
              tone={light ? "dark" : "light"}
              className="text-[13px]"
            />
          </Link>

          <nav aria-label="Ana menü" className="hidden items-center gap-8 xl:flex">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-[12px] font-medium uppercase tracking-[0.22em] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-current after:transition-transform after:duration-300 ${
                    active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                  } ${light ? "text-cream" : "text-olive-900"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            className={`relative z-[60] flex h-11 w-11 items-center justify-center xl:hidden ${
              light || open ? "text-cream" : "text-olive-900"
            }`}
          >
            <span className="relative block h-3 w-7">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            className="fixed inset-0 z-[45] flex flex-col justify-between overflow-y-auto bg-olive-900 px-6 pb-10 pt-28 text-cream md:px-10 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.08 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className="block py-2 font-display text-4xl font-light leading-tight sm:text-5xl"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-12 space-y-1 text-sm text-cream/80">
              <a href={`mailto:${site.email}`} className="block hover:text-cream">
                {site.email}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-cream"
              >
                Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
