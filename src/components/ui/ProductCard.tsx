"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrutalImage from "@/components/ui/BrutalImage";
import type { ColorScheme } from "@/types";

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
}

const SCHEMES: Record<ColorScheme, Scheme> = {
  dark: { bg: INK, text: CHALK, accent: ACID, shadow: ACID, tagBg: ACID, tagText: INK },
  yellow: { bg: ACID, text: INK, accent: INK, shadow: INK, tagBg: INK, tagText: ACID },
  light: { bg: CHALK, text: INK, accent: INK, shadow: ACID, tagBg: INK, tagText: ACID },
};

interface ProductCardProps {
  name: string;
  price: string;
  tag: string;
  colorScheme: ColorScheme;
  index: number;
  imageSrc?: string;
  description: string;
  /** When set, the whole card links to /products/{slug}. */
  slug?: string;
}

export default function ProductCard({
  name,
  price,
  tag,
  colorScheme,
  index,
  imageSrc,
  description,
  slug,
}: ProductCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const scheme = SCHEMES[colorScheme];
  const idx = String(index + 1).padStart(2, "0");

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: index * 0.12,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [index]);

  const card = (
    <div
      data-cursor-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="product-card flex h-full flex-col b-border"
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
      {/* Image zone — real photo if imageSrc is set, otherwise the placeholder */}
      <div className="relative border-b-[3px] border-ink">
        <BrutalImage
          src={imageSrc}
          alt={name}
          variant={colorScheme}
          aspectRatio="3/4"
          label={name}
        />
        <span
          className="absolute right-3 top-3 z-10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: scheme.tagBg, color: scheme.tagText }}
        >
          {tag}
        </span>
      </div>

      {/* Footer */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div
            className="font-display leading-none"
            style={{ fontSize: "clamp(24px, 2.4vw, 32px)" }}
          >
            {name}
          </div>
          <div
            className="shrink-0 font-display leading-none"
            style={{ fontSize: "clamp(24px, 2.4vw, 32px)", color: scheme.accent }}
          >
            {price}
          </div>
        </div>
        <div
          className="mt-2 font-mono text-[10px] uppercase tracking-widest"
          style={{ opacity: 0.5 }}
        >
          {idx} — {tag}
        </div>
        <p className="mt-3 font-mono text-sm font-bold leading-snug">
          {description}
        </p>
        <span
          className="mt-4 inline-block w-fit font-mono text-[11px] uppercase tracking-widest underline underline-offset-4"
          style={{ color: scheme.accent }}
        >
          VIEW PRODUCT →
        </span>
      </div>
    </div>
  );

  let content: ReactNode = card;
  if (slug) {
    content = (
      <Link href={`/products/${slug}`} className="block h-full">
        {card}
      </Link>
    );
  }

  return (
    <div ref={wrapperRef} className="product-card-wrap h-full">
      {content}
    </div>
  );
}
