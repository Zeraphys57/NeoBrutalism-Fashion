"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrutalImage from "@/components/ui/BrutalImage";
import { WORN_BY_ITEMS } from "@/lib/data";
import type { BrutalImageVariant, WornByItem } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const ACID = "#FFE600";
const INK = "#0A0A0A";
const CHALK = "#F5F0E8";
const MID = "#1A1A1A";
const MUTED = "#888888";

interface FooterScheme {
  bg: string;
  handle: string;
  loc: string;
}

// Per-variant footer colors so the wall reads colorful while text stays legible.
const FOOTER_SCHEMES: Record<BrutalImageVariant, FooterScheme> = {
  dark: { bg: INK, handle: CHALK, loc: MUTED },
  yellow: { bg: ACID, handle: INK, loc: "rgba(10, 10, 10, 0.6)" },
  light: { bg: CHALK, handle: INK, loc: MUTED },
  pattern: { bg: MID, handle: CHALK, loc: MUTED },
};

const OUTLINED_TEXT = {
  color: "transparent",
  WebkitTextFillColor: "transparent",
  WebkitTextStroke: `2px ${INK}`,
} as const;

function WornCard({ item }: { item: WornByItem }) {
  const [hovered, setHovered] = useState(false);
  const scheme = FOOTER_SCHEMES[item.variant];
  const edge = hovered ? ACID : INK;

  return (
    <div className="worn-card">
      <div
        data-cursor-hover
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex flex-col"
        style={{
          border: `3px solid ${edge}`,
          backgroundColor: scheme.bg,
          transform: hovered ? "scale(1.02)" : "scale(1)",
          boxShadow: hovered ? `6px 6px 0 0 ${ACID}` : "0 0 0 0 transparent",
          transition:
            "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        <div style={{ borderBottom: `3px solid ${edge}` }}>
          <BrutalImage
            src={item.imageSrc}
            alt={item.handle}
            variant={item.variant}
            aspectRatio="1/1"
            label={item.handle}
          />
        </div>
        <div className="p-3">
          <div
            className="font-mono text-xs font-bold"
            style={{ color: scheme.handle }}
          >
            {item.handle}
          </div>
          <div
            className="mt-0.5 font-mono text-[10px] uppercase tracking-wider"
            style={{ color: scheme.loc }}
          >
            {item.location}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WornBy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(".worn-card", {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="worn-by" ref={sectionRef} className="bg-chalk px-6 py-24 md:px-16">
      {/* Header — stacks on mobile so the title and the wearer count never
          collide in the narrow space. */}
      <div className="flex flex-col gap-2 border-b-[3px] border-ink pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <h2
          className="font-display leading-[0.9] text-ink"
          style={{ fontSize: "clamp(52px, 8vw, 108px)" }}
        >
          WORN BY
        </h2>
        <span
          className="font-display leading-none"
          style={{ fontSize: "clamp(22px, 4vw, 56px)", ...OUTLINED_TEXT }}
        >
          @12,400+ WEARERS
        </span>
      </div>

      {/* Community grid — 2-up on phones for legible handles, 3 × 3 from sm up. */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {WORN_BY_ITEMS.map((item) => (
          <WornCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
