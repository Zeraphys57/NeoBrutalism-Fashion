"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import BrutalImage from "@/components/ui/BrutalImage";
import Marquee from "@/components/ui/Marquee";
import { LOOKBOOK_ITEMS } from "@/lib/data";
import type { LookbookSize } from "@/types";
import { useTextReveal } from "@/hooks/useTextReveal";

const INK = "#0A0A0A";
const CHALK = "#F5F0E8";

const OUTLINED_CHALK = {
  color: "transparent",
  WebkitTextFillColor: "transparent",
  WebkitTextStroke: `2px ${CHALK}`,
} as const;

const FILTERS = [
  { label: "ALL", value: "all" },
  { label: "VOID SERIES", value: "void-series" },
  { label: "RAW SIGNAL", value: "raw-signal" },
  { label: "STATIC NOISE", value: "static-noise" },
];

const COLLECTION_NAMES: Record<string, string> = {
  "void-series": "VOID SERIES",
  "raw-signal": "RAW SIGNAL",
  "static-noise": "STATIC NOISE",
};

// Masonry tile aspect ratio per size field.
const ASPECT: Record<LookbookSize, string> = {
  small: "4/5",
  medium: "3/4",
  large: "2/3",
};

export default function LookbookGrid() {
  const [activeFilter, setActiveFilter] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useTextReveal(titleRef);

  const items =
    activeFilter === "all"
      ? LOOKBOOK_ITEMS
      : LOOKBOOK_ITEMS.filter((item) => item.collection === activeFilter);

  // Animate cards in on mount and whenever the filter changes.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lookbook-card",
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.06,
        }
      );
    }, grid);
    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <div className="bg-chalk">
      {/* Header */}
      <header className="bg-ink">
        <Marquee dark />
        <div className="relative px-6 py-16 md:px-16">
          <h1
            ref={titleRef}
            className="font-display leading-[0.85] text-chalk"
            style={{ fontSize: "clamp(80px, 16vw, 160px)" }}
          >
            LOOKBOOK
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-acid">
            SS25 — SEASON EDITORIAL
          </p>
          <span
            className="pointer-events-none absolute bottom-12 right-6 font-display leading-none md:right-16"
            style={{ fontSize: "clamp(36px, 7vw, 64px)", ...OUTLINED_CHALK }}
            aria-hidden
          >
            12 LOOKS
          </span>
        </div>
      </header>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 border-y-[3px] border-ink bg-chalk px-6 py-4 md:px-16">
        <span
          className="font-mono text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "var(--muted)" }}
        >
          FILTER:
        </span>
        {FILTERS.map((filter) => {
          const active = activeFilter === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              data-cursor-hover
              aria-pressed={active}
              aria-label={`Filter by ${filter.label}`}
              onClick={() => setActiveFilter(filter.value)}
              className="border-[3px] border-ink px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors duration-200"
              style={{
                backgroundColor: active ? "#FFE600" : "transparent",
                color: INK,
              }}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Masonry grid */}
      <div
        ref={gridRef}
        className="columns-1 px-6 py-12 sm:columns-2 md:px-16 lg:columns-3"
        style={{ columnGap: 16 }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            data-cursor-hover
            className="lookbook-card mb-4 overflow-hidden border-[3px] border-ink bg-chalk transition-all duration-200 hover:border-acid hover:shadow-[6px_6px_0_0_#FFE600]"
            style={{ breakInside: "avoid" }}
          >
            <BrutalImage
              src={item.imageSrc}
              alt={item.title}
              variant={item.variant}
              aspectRatio={ASPECT[item.size]}
              label={item.title}
            />
            <div className="p-3">
              <h3 className="font-display leading-none text-ink" style={{ fontSize: 20 }}>
                {item.title}
              </h3>
              <div
                className="mt-1 font-mono text-[10px] uppercase tracking-widest"
                style={{ color: "var(--muted)" }}
              >
                {COLLECTION_NAMES[item.collection]}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Back to homepage */}
      <Link
        href="/"
        data-cursor-hover
        className="fixed bottom-8 left-8 z-50 inline-block b-border bg-acid px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-[4px_4px_0_0_#0A0A0A] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#0A0A0A]"
      >
        ← HOME
      </Link>
    </div>
  );
}
