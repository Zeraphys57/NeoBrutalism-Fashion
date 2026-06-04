"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURED_PRODUCT } from "@/lib/data";
import type { ProductSize } from "@/types";
import { cn } from "@/lib/utils";
import BrutalImage from "@/components/ui/BrutalImage";
import { useCart } from "@/context/CartContext";

gsap.registerPlugin(ScrollTrigger);

const ACID = "#FFE600";
const INK = "#0A0A0A";
const CHALK = "#F5F0E8";
const MUTED = "#888888";

const NAME_FIRST = FEATURED_PRODUCT.name.split(" ")[0];
const [SUB_FIRST, ...SUB_REST_PARTS] = FEATURED_PRODUCT.subtitle.split(" ");
const SUB_REST = SUB_REST_PARTS.join(" ");

const SPECS = [
  { label: "MATERIAL", value: FEATURED_PRODUCT.material },
  { label: "FIT", value: FEATURED_PRODUCT.fit },
  { label: "PRINT", value: FEATURED_PRODUCT.print },
  { label: "ORIGIN", value: FEATURED_PRODUCT.origin },
];

const acidLine = `color-mix(in srgb, ${ACID} 3.5%, transparent)`;
const diagonalTexture = `repeating-linear-gradient(45deg, ${acidLine} 0, ${acidLine} 2px, transparent 2px, transparent 14px)`;

export default function FeaturedProduct() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem, openCart } = useCart();

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;
    const ctx = gsap.context(() => {
      const trigger = { trigger: section, start: "top 72%", once: true };
      gsap.from(left, { x: -80, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: trigger });
      gsap.from(right, { x: 80, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: trigger });
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      id: FEATURED_PRODUCT.id,
      name: FEATURED_PRODUCT.name,
      size: selectedSize,
      price: FEATURED_PRODUCT.priceNumber,
      priceFormatted: FEATURED_PRODUCT.price,
      variant: "pattern",
    });
    openCart();
    setAddedToCart(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAddedToCart(false), 2200);
  };

  return (
    <section
      id="lookbook"
      ref={sectionRef}
      className="grid grid-cols-1 overflow-hidden border-y-[3px] border-acid bg-ink md:grid-cols-2"
    >
      {/* Left — product visual */}
      <div
        ref={leftRef}
        className="featured-left relative flex min-h-[600px] items-center justify-center overflow-hidden p-8 md:border-r-[3px] md:border-acid"
        style={{ backgroundImage: diagonalTexture }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-2 z-0 select-none font-display leading-none"
          style={{ fontSize: "clamp(120px, 16vw, 220px)", color: ACID, opacity: 0.07 }}
        >
          01
        </span>

        <div
          className="relative z-10"
          style={{
            width: "clamp(280px, 30vw, 360px)",
            border: `3px solid ${ACID}`,
            boxShadow: `12px 12px 0 0 ${ACID}`,
          }}
        >
          <BrutalImage
            src={FEATURED_PRODUCT.imageSrc}
            alt={FEATURED_PRODUCT.name}
            variant="pattern"
            aspectRatio="4/5"
            label={FEATURED_PRODUCT.ref}
          />
        </div>
      </div>

      {/* Right — product info */}
      <div
        ref={rightRef}
        className="featured-right flex flex-col justify-center px-8 py-16 md:px-16"
      >
        <div
          className="flicker mb-7 inline-flex w-fit items-center gap-2 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest"
          style={{ backgroundColor: ACID, color: INK, border: `2px solid ${ACID}` }}
        >
          ● FEATURED DROP
        </div>

        <h2 className="font-display uppercase" style={{ fontSize: "clamp(52px, 7vw, 88px)", lineHeight: 0.95 }}>
          <span className="block" style={{ color: CHALK }}>{NAME_FIRST}</span>
          <span className="block" style={{ color: ACID }}>{SUB_FIRST}</span>
          <span className="block" style={{ color: CHALK }}>{SUB_REST}</span>
        </h2>

        <p
          className="mt-6 font-mono"
          style={{ fontSize: 14, color: MUTED, maxWidth: 380, lineHeight: 1.8 }}
        >
          {FEATURED_PRODUCT.description}
        </p>

        <div
          className="mt-8 grid grid-cols-2 gap-4 pt-6"
          style={{ borderTop: "1px solid #222222" }}
        >
          {SPECS.map((spec) => (
            <div key={spec.label}>
              <div className="font-mono uppercase tracking-widest" style={{ fontSize: 9, color: MUTED }}>
                {spec.label}
              </div>
              <div className="mt-1 font-mono font-bold" style={{ fontSize: 12, color: CHALK }}>
                {spec.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="font-mono uppercase tracking-widest" style={{ fontSize: 10, color: MUTED }}>
            SELECT SIZE{selectedSize ? ` — ${selectedSize}` : ""}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {FEATURED_PRODUCT.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  data-cursor-hover
                  aria-label={`Select size ${size}`}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedSize(size)}
                  className="size-btn flex h-11 w-11 items-center justify-center font-mono text-xs font-bold"
                  style={{
                    backgroundColor: isSelected ? ACID : "transparent",
                    color: isSelected ? INK : "#555555",
                    border: `3px solid ${isSelected ? ACID : "#333333"}`,
                    boxShadow: isSelected ? `3px 3px 0 0 ${ACID}` : "none",
                    transition:
                      "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <div
            className="shrink-0 font-display leading-none"
            style={{ fontSize: "clamp(36px, 4.5vw, 52px)", color: ACID }}
          >
            {FEATURED_PRODUCT.price}
          </div>
          <button
            type="button"
            data-cursor-hover
            data-cursor-text="ADD"
            aria-label="Add to bag"
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={cn(
              "featured-cta min-w-[150px] flex-1 whitespace-nowrap border-[3px] border-acid px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-200",
              !selectedSize
                ? "cursor-not-allowed bg-mid text-[#333333]"
                : addedToCart
                  ? "bg-acid text-ink"
                  : "cursor-pointer bg-acid text-ink hover:bg-transparent hover:text-acid"
            )}
          >
            {!selectedSize
              ? "SELECT A SIZE"
              : addedToCart
                ? "✓ ADDED TO BAG"
                : "ADD TO BAG →"}
          </button>
        </div>
      </div>
    </section>
  );
}
