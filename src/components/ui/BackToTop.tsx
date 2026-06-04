"use client";

import { useEffect, useState } from "react";

/**
 * Floating jump-to-top control. Hidden until the user has scrolled past 600px,
 * then smooth-scrolls the window back to the top on click.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      data-cursor-hover
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center b-border bg-acid font-mono text-lg font-bold text-ink shadow-[4px_4px_0_0_#0A0A0A] transition-transform duration-200 hover:-translate-y-px"
    >
      ↑
    </button>
  );
}
