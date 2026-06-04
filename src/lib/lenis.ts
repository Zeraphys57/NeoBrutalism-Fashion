import type Lenis from "lenis";

/**
 * Module-level handle to the single live Lenis instance. useLenis registers it
 * on mount so non-React utilities (e.g. smoothScrollTo) can drive the scroll.
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}
