"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Per-word "wipe up" reveal for a heading. Splits the element's text into words,
 * each wrapped in an overflow-hidden span, then slides the inner spans up from
 * y:100% when the element scrolls into view.
 *
 * The original text is kept as plain text on the server (good for SEO) and only
 * split on the client inside this effect.
 */
export function useTextReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.revealReady === "true") return;

    const text = (el.textContent ?? "").trim();
    if (!text) return;

    const words = text.split(/\s+/);
    el.textContent = "";
    el.dataset.revealReady = "true";

    const inners: HTMLSpanElement[] = [];
    words.forEach((word) => {
      const outer = document.createElement("span");
      outer.style.display = "inline-block";
      outer.style.overflow = "hidden";
      outer.style.verticalAlign = "top";
      outer.style.marginRight = "0.22em";

      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.style.willChange = "transform";
      inner.textContent = word;

      outer.appendChild(inner);
      el.appendChild(outer);
      inners.push(inner);
    });

    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 100 });
      gsap.to(inners, {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.04,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [ref]);
}
