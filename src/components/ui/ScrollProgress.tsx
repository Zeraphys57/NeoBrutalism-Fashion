"use client";

import { useEffect, useRef } from "react";

/**
 * Thin progress bar pinned to the top of the viewport. Scales an inner acid bar
 * from 0 -> 1 based on how far down the document the user has scrolled.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const bar = barRef.current;
      if (!bar) return;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[9997] h-[3px] w-full"
      style={{ backgroundColor: "rgba(255, 230, 0, 0.15)" }}
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full w-full bg-acid"
        style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
      />
    </div>
  );
}
