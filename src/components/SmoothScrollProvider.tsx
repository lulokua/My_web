"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

function LenisRouteHandler() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.resize();
    }
  }, [pathname, lenis]);

  return null;
}

function LenisResizeHandler() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const observer = new ResizeObserver(() => {
      lenis.resize();
    });

    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
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
