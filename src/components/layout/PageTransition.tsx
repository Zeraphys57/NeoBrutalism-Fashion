"use client";

import { useContext, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Freezes the App Router context for the lifetime of one route instance. The
 * App Router swaps `children` synchronously on navigation, so without this the
 * exiting motion.div would render the NEW page during its exit animation (a
 * flash). Each keyed motion.div mounts a fresh FrozenRouter that captures the
 * context at mount, so the outgoing subtree keeps rendering its own old content.
 */
function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  if (!frozen) return <>{children}</>;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

/**
 * Route transition. The page wrapper only animates opacity — animating a
 * transform here would turn it into the containing block for every
 * `position: fixed` child (navbar, cursor reveal, back-to-top), so the
 * directional motion is delivered by a self-contained ink wipe instead.
 *
 * The wipe is keyed by pathname so it remounts on every navigation: it starts
 * covering the viewport (scaleX 1) and sweeps away (scaleX 0), masking the
 * route swap behind it.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>

      <motion.div
        key={`wipe-${pathname}`}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9995] bg-ink"
        style={{ transformOrigin: "right" }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
    </>
  );
}
