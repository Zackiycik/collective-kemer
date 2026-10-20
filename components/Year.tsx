"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Telif yılı: sunucuda derleme yılı, tarayıcıda güncel yıl (hydration-safe). */
export function Year({ initial }: { initial: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => initial,
  );
  return <>{year}</>;
}
