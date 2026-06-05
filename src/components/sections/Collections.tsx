"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLLECTIONS, getCollectionLeadProduct } from "@/lib/data";
import type { Collection, ColorScheme } from "@/types";
import HoverReveal from "@/components/ui/HoverReveal";
import { useTextReveal } from "@/hooks/useTextReveal";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const ACID = "#FFE600";
const INK = "#0A0A0A";
const CHALK = "#F5F0E8";

interface Scheme {
  bg: string;
  text: string;
  accent: string;
  shadow: string;
  tagBg: string;
  tagText: string;
  patternOpacity: number;
}

const SCHEMES: Record<ColorScheme, Scheme> = {
  dark: { bg: INK, text: CHALK, accent: ACID, shadow: ACID, tagBg: ACID, tagText: INK, patternOpacity: 6 },
  yellow: { bg: ACID, text: INK, accent: INK, shadow: INK, tagBg: INK, tagText: ACID, patternOpacity: 4 },
  light: { bg: CHALK, text: INK, accent: INK, shadow: ACID, tagBg: INK, tagText: ACID, patternOpacity: 4 },
  purple: { bg: "#8A2BE2", text: CHALK, accent: ACID, shadow: INK, tagBg: ACID, tagText: INK, patternOpacity: 5 },
};

function patternBackground(color: string, opacityPct: number): string {
  const line = `color-mix(in srgb, ${color} ${opacityPct}%, transparent)`;
  return `repeating-linear-gradient(45deg, ${line} 0, ${line} 2px, transparent 2px, transparent 16px)`;
}

function CollectionCard({
  collection,
  index,
}: {
  collection: Collection;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const scheme = SCHEMES[collection.colorScheme];
  const idx = String(index + 1).padStart(2, "0");

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-text="EXPLORE"
      className="collection-card flex h-full w-full flex-col b-border"
      style={{
        backgroundColor: scheme.bg,
        color: scheme.text,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        transform: hovered ? "translate(-3px, -3px)" : "translate(0px, 0px)",
        boxShadow: hovered
          ? `9px 9px 0 0 ${scheme.shadow}`
          : `6px 6px 0 0 ${scheme.shadow}`,
      }}
    >
      {/* Image zone */}
      <div
        className="relative flex shrink-0 items-center justify-center overflow-hidden border-b-[3px] border-ink"
        style={{
          height: "clamp(360px, 40vw, 520px)",
          backgroundImage: patternBackground(scheme.text, scheme.patternOpacity),
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-3 left-1 select-none font-display leading-none"
          style={{ fontSize: "clamp(140px, 18vw, 240px)", color: scheme.text, opacity: 0.07 }}
        >
          {idx}
        </span>

        <span
          className="absolute right-4 top-4 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: scheme.tagBg, color: scheme.tagText }}
        >
          {collection.tag}
        </span>

        <div className="relative z-10 px-4 text-center">
          <div
            className="font-display leading-[0.95]"
            style={{ fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "6px" }}
          >
            {collection.name}
          </div>
          <div
            className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em]"
            style={{ opacity: 0.65 }}
          >
            {collection.pieces} PIECES — {collection.season}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-1 items-end justify-between p-5">
        <div className="pr-3">
          <div
            className="font-mono text-[10px] uppercase tracking-widest"
            style={{ opacity: 0.5 }}
          >
            {collection.id}
          </div>
          <p className="mt-2 font-mono text-sm font-bold leading-snug">
            {collection.description}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <div className="font-display text-3xl leading-none">{collection.price}</div>
          {/* The whole card is a link now, so this is just a visual affordance. */}
          <span
            className="mt-3 whitespace-nowrap font-mono text-[11px] uppercase tracking-widest underline underline-offset-4"
            style={{ color: scheme.accent }}
          >
            VIEW ALL →
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useTextReveal(titleRef);

  // Drag-to-scroll state kept in a ref so pointer moves don't trigger renders.
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  const updateProgress = useCallback(() => {
    const el = scrollerRef.current;
    const bar = progressRef.current;
    if (!el || !bar) return;
    const max = el.scrollWidth - el.clientWidth;
    const pct = max > 0 ? (el.scrollLeft / max) * 100 : 0;
    bar.style.width = `${pct}%`;
  }, []);

  // Header + horizontal card entrance.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", once: true },
        });
      }
      gsap.from(".collection-card-wrap", {
        x: 100,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        // Drop the inline transform afterwards so the fixed HoverReveal preview
        // isn't trapped in a transformed containing block (which would re-clip it).
        clearProps: "transform",
        scrollTrigger: { trigger: scrollerRef.current ?? section, start: "top 80%", once: true },
      });

      // Subtle vertical parallax on the whole scroller for depth as the page
      // scrolls. Safe because the HoverReveal preview is portaled to <body>,
      // so this transform never becomes its containing block.
      if (scrollerRef.current && !prefersReducedMotion()) {
        gsap.to(scrollerRef.current, {
          y: 30,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, section);
    return () => ctx.revert();
  }, []);

  // Initialise + keep the progress bar in sync on resize.
  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, [updateProgress]);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current.active = true;
    drag.current.moved = false;
    drag.current.startX = e.pageX - el.offsetLeft;
    drag.current.scrollLeft = el.scrollLeft;
    // Disable snap while dragging so the motion is smooth, restore on release.
    el.style.scrollSnapType = "none";
    el.style.cursor = "grabbing";
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.active) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = x - drag.current.startX;
    if (Math.abs(walk) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.scrollLeft - walk;
  };

  const endDrag = () => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current.active = false;
    el.style.scrollSnapType = "";
    el.style.cursor = "grab";
  };

  // Cancel the click that follows a real drag so cards/links don't fire.
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section id="collections" ref={sectionRef} className="overflow-hidden bg-chalk py-24">
      {/* Header */}
      <div className="px-6 md:px-16">
        <div
          ref={headerRef}
          className="flex items-end justify-between border-b-[3px] border-ink pb-6"
        >
          <div>
            <p
              className="font-mono text-xs uppercase tracking-[0.25em]"
              style={{ color: "var(--muted)" }}
            >
              SEASON 4 — SILENT DYSTOPIA
            </p>
            <h2
              ref={titleRef}
              className="mt-3 font-display leading-[0.9] text-ink"
              style={{ fontSize: "clamp(52px, 8vw, 108px)" }}
            >
              COLLECTIONS
            </h2>
          </div>

          <Link
            href="/lookbook"
            data-cursor-hover
            className="hidden shrink-0 b-border bg-chalk px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-[6px_6px_0_0_#FFE600] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_#FFE600] md:inline-block"
          >
            VIEW ALL →
          </Link>
        </div>

        {/* Drag hint */}
        <p
          className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "var(--muted)" }}
        >
          ← DRAG TO EXPLORE →
        </p>
      </div>

      {/* Horizontal scroller */}
      <div
        ref={scrollerRef}
        className="no-scrollbar mt-8 flex cursor-grab snap-x snap-mandatory select-none gap-6 overflow-x-auto overflow-y-hidden px-6 md:px-16"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onScroll={updateProgress}
        onClickCapture={onClickCapture}
      >
        {COLLECTIONS.map((collection, index) => {
          const lead = getCollectionLeadProduct(collection.slug);
          const href = lead ? `/products/${lead.slug}` : "/";
          return (
            <HoverReveal
              key={collection.id}
              imageVariant={collection.colorScheme}
              imageSrc={collection.imageSrc}
              imageLabel={collection.name}
              className="collection-card-wrap w-[clamp(300px,40vw,420px)] shrink-0 snap-start"
            >
              <Link href={href} className="block h-full">
                <CollectionCard collection={collection} index={index} />
              </Link>
            </HoverReveal>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-8 px-6 md:px-16">
        <div className="h-[2px] w-full" style={{ backgroundColor: "#E0D9CF" }}>
          <div
            ref={progressRef}
            className="h-full bg-ink"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </section>
  );
}
