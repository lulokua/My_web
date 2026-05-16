"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";

function LenisRouteHandler() {
  const lenis = useLenis();
  const pathname = usePathname();
  const previousPathWithoutLocale = useRef<string | null>(null);

  useEffect(() => {
    if (!lenis || !pathname) {
      return;
    }

    const currentPathWithoutLocale = pathname.replace(/^\/(us|zh)/, "") || "/";

    if (
      previousPathWithoutLocale.current !== null &&
      previousPathWithoutLocale.current !== currentPathWithoutLocale
    ) {
      lenis.scrollTo(0, { immediate: true });
    }

    previousPathWithoutLocale.current = currentPathWithoutLocale;
    lenis.resize();
  }, [lenis, pathname]);

  return null;
}

function LenisResizeHandler() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) {
      return;
    }

    const observer = new ResizeObserver(() => {
      lenis.resize();
    });

    observer.observe(document.body);

    return () => observer.disconnect();
  }, [lenis]);

  return null;
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <LenisRouteHandler />
      <LenisResizeHandler />
      {children}
    </ReactLenis>
  );
}
