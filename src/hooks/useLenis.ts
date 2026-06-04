"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

/**
 * Instantiate a global Lenis smooth-scroll instance and drive it from the
 * requestAnimationFrame loop. Returns a ref to the live Lenis instance.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      // power2-style ease-out (expo): 1.001 - 2^(-10t)
      easing: (t: number) => 1.001 - Math.pow(2, -10 * t),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;
    setLenis(lenis);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return lenisRef;
}
