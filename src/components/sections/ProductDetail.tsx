"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BrutalImage from "@/components/ui/BrutalImage";
import { COLLECTIONS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import type { BrutalImageVariant, ColorScheme, Product, ProductSize } from "@/types";

gsap.registerPlugin(useGSAP);

const ACID = "#FFE600";
const INK = "#0A0A0A";
const CHALK = "#F5F0E8";
const MUTED = "#888888";
const HAIRLINE = "#E0D9CF"; // light divider that reads on the chalk background

// The brutalist outlined-text treatment (transparent fill + ink stroke).
const OUTLINED_INK = {
  color: "transparent",
  WebkitTextFillColor: "transparent",
  WebkitTextStroke: `2px ${INK}`,
} as const;

// Secondary "detail shot" placeholder uses a contrasting variant so the stack
// reads as two distinct frames rather than a repeat.
const SECONDARY_VARIANT: Record<ColorScheme, BrutalImageVariant> = {
  dark: "pattern",
  yellow: "dark",
  light: "yellow",
};

const TRUST = [
  { icon: "📦", text: "FREE SHIPPING for orders over $500 AUD" },
  { icon: "↩", text: "RETURN 7 hari — no questions asked" },
  { icon: "🔒", text: "SECURE CHECKOUT via Midtrans" },
];

export default function ProductDetail({ product }: { product: Product }) {
  const rootRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [justAdded, setJustAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const [copied, setCopied] = useState(false);

  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const collection = COLLECTIONS.find((c) => c.slug === product.collectionSlug);
  const collectionName = collection?.name ?? "SHOP";

  const specs = [
    { label: "MATERIAL", value: product.material },
    { label: "FIT", value: product.fit },
    { label: "PRINT", value: product.print },
    { label: "ORIGIN", value: product.origin },
  ];

  // Clear timers on unmount.
  useEffect(() => {
    return () => {
      if (addedTimer.current) clearTimeout(addedTimer.current);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  // Entrance — runs in a layout effect (useGSAP) so the from-states are set
  // before paint, avoiding any flash of fully-rendered content.
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(
        ".pd-image-zone",
        { x: -60, opacity: 0, duration: 0.9, clearProps: "transform" },
        0.1
      )
        .from(".pd-head", { y: 40, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.2)
        .from(".pd-price", { y: 30, opacity: 0, duration: 0.7 }, 0.4)
        .from(
          ".pd-rest",
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.08, clearProps: "transform" },
          0.5
        );
    },
    { scope: rootRef, dependencies: [product.slug] }
  );

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      id: product.id,
      name: product.name,
      size: selectedSize,
      price: product.priceNumber,
      priceFormatted: product.price,
      variant: product.colorScheme,
    });
    openCart();
    setJustAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setJustAdded(false), 2200);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // Clipboard can be blocked (insecure context / permissions) — fail quiet.
    }
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={rootRef} className="relative min-h-screen bg-chalk pt-[68px]">
      {/* Back-nav bar — sits just under the fixed navbar. */}
      <div className="flex items-center justify-between gap-4 border-b-[3px] border-ink px-6 py-3 md:px-12">
        <button
          type="button"
          onClick={() => router.back()}
          data-cursor-hover
          className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-widest text-ink underline-offset-4 hover:underline"
        >
          ← BACK
        </button>
        <div
          className="hidden truncate font-mono text-[10px] uppercase tracking-widest md:block"
          style={{ color: MUTED }}
        >
          SHOP / {collectionName} / {product.name}
        </div>
        <div
          className="shrink-0 font-mono text-[10px] uppercase tracking-widest"
          style={{ color: MUTED }}
        >
          REF #{product.ref}
        </div>
      </div>

      {/* Main split — 55 / 45 on desktop, stacked on mobile. */}
      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]">
        {/* Image zone (left, sticky) */}
        <div className="px-6 pt-8 md:px-12 lg:pr-8">
          <div className="pd-image-zone lg:sticky lg:top-24">
            <div className="flex flex-col gap-4">
              <BrutalImage
                src={product.imageSrc}
                alt={product.name}
                variant={product.colorScheme}
                aspectRatio="4/5"
                label={product.name}
                priority
                className="b-border"
              />
              <BrutalImage
                alt={`${product.name} — detail`}
                variant={SECONDARY_VARIANT[product.colorScheme]}
                aspectRatio="3/4"
                label="DETAIL"
                className="b-border"
              />
            </div>

            {/* Decorative thumbnail rail — visual cue that more views exist.
                Grid + max-w keeps each ~80px on desktop but lets them shrink to
                fit narrow phones instead of overflowing the column. */}
            <div className="mt-4 grid max-w-[356px] grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  type="button"
                  data-cursor-hover
                  aria-label={`Preview view ${i + 1}`}
                  className="aspect-square b-border transition-transform duration-150 hover:scale-[0.97]"
                  style={{ backgroundColor: i === 0 ? ACID : CHALK }}
                />
              ))}
            </div>
            <p
              className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em]"
              style={{ color: MUTED }}
            >
              HOVER TO PREVIEW · CLICK TO EXPAND
            </p>
          </div>
        </div>

        {/* Info zone (right, scrollable) */}
        <div className="px-6 pb-24 pt-10 md:px-12 lg:pl-12">
          {/* a) Header */}
          {product.isNew && (
            <div
              className="pd-head flicker mb-5 inline-flex w-fit items-center gap-2 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-widest"
              style={{ backgroundColor: ACID, color: INK, border: `2px solid ${ACID}` }}
            >
              ● NEW ARRIVAL
            </div>
          )}
          <Link
            href="/"
            className="pd-head block w-fit font-mono text-[11px] uppercase tracking-widest underline-offset-4 hover:underline"
            style={{ color: MUTED }}
          >
            {collectionName}
          </Link>
          <h1
            className="pd-head mt-3 font-display uppercase text-ink"
            style={{ fontSize: "clamp(52px, 7vw, 88px)", lineHeight: 0.92 }}
          >
            {product.name}
          </h1>
          <p
            className="pd-head mt-2 font-display uppercase"
            style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1, ...OUTLINED_INK }}
          >
            {product.subtitle}
          </p>

          {/* b) Price */}
          <div className="pd-price mt-7 flex items-center justify-between gap-4 border-y-[3px] border-ink py-5">
            <div
              className="font-display leading-none"
              style={{
                fontSize: "clamp(36px, 5vw, 52px)",
                color: ACID,
                WebkitTextStroke: `1px ${INK}`,
              }}
            >
              {product.price}
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span
                className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink"
                style={{ border: `2px solid ${INK}`, padding: "4px 8px" }}
              >
                FREE SHIP &gt; $500 AUD
              </span>
              <span
                className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink"
                style={{ border: `2px solid ${INK}`, padding: "4px 8px" }}
              >
                LOCAL MADE IDN
              </span>
            </div>
          </div>

          {/* c) Description */}
          <p
            className="pd-rest mt-7 font-mono"
            style={{ fontSize: 13, color: "#777777", lineHeight: 1.9, maxWidth: 420 }}
          >
            {product.description}
          </p>

          {/* d) Specs */}
          <div
            className="pd-rest mt-8 grid grid-cols-2 gap-4 pt-6"
            style={{ borderTop: `1px solid ${HAIRLINE}` }}
          >
            {specs.map((spec) => (
              <div key={spec.label}>
                <div
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: 9, color: MUTED }}
                >
                  {spec.label}
                </div>
                <div
                  className="mt-1 font-mono font-bold text-ink"
                  style={{ fontSize: 12 }}
                >
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          {/* e) Size selector */}
          <div className="pd-rest mt-8">
            <div className="flex items-center justify-between">
              <div
                className="font-mono uppercase tracking-widest"
                style={{ fontSize: 10, color: MUTED }}
              >
                SELECT SIZE{selectedSize ? ` — ${selectedSize}` : ""}
              </div>
              <a
                href="#"
                data-cursor-hover
                className="font-mono text-[9px] uppercase tracking-widest text-ink underline underline-offset-4"
              >
                SIZE GUIDE →
              </a>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    data-cursor-hover
                    aria-label={`Select size ${size}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedSize(size)}
                    className="flex h-11 w-11 items-center justify-center font-mono text-xs font-bold"
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

          {/* f) Actions */}
          <div className="pd-rest mt-9 flex flex-col gap-3">
            <button
              type="button"
              data-cursor-hover
              data-cursor-text="ADD"
              aria-label="Add to bag"
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={cn(
                "w-full b-border px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200",
                !selectedSize
                  ? "cursor-not-allowed"
                  : "bg-acid text-ink shadow-[5px_5px_0_0_#0A0A0A] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_#0A0A0A]"
              )}
              style={
                !selectedSize
                  ? { backgroundColor: HAIRLINE, color: "#9A9387", borderColor: HAIRLINE }
                  : undefined
              }
            >
              {!selectedSize
                ? "SELECT A SIZE"
                : justAdded
                  ? "✓ ADDED TO BAG"
                  : "ADD TO BAG →"}
            </button>

            <button
              type="button"
              data-cursor-hover
              aria-pressed={wished}
              aria-label="Add to wishlist"
              onClick={() => setWished((v) => !v)}
              className="w-full b-border bg-transparent px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-acid"
            >
              {wished ? "● " : "○ "}ADD TO WISHLIST
            </button>
          </div>

          {/* g) Trust strip */}
          <div
            className="pd-rest mt-8 flex flex-col gap-3 pt-5"
            style={{ borderTop: `1px solid ${HAIRLINE}` }}
          >
            {TRUST.map((row) => (
              <div key={row.text} className="flex items-center gap-2.5">
                <span aria-hidden style={{ fontSize: 13 }}>
                  {row.icon}
                </span>
                <span className="font-mono" style={{ fontSize: 11, color: "#555555" }}>
                  {row.text}
                </span>
              </div>
            ))}
          </div>

          {/* h) Share strip */}
          <div
            className="pd-rest mt-6 flex flex-wrap items-center gap-3 pt-4"
            style={{ borderTop: `1px solid ${HAIRLINE}` }}
          >
            <span
              className="font-mono text-[9px] uppercase tracking-widest"
              style={{ color: MUTED }}
            >
              SHARE:
            </span>
            {["IG", "WA"].map((label) => (
              <button
                key={label}
                type="button"
                data-cursor-hover
                aria-label={`Share on ${label}`}
                className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-acid"
                style={{ border: `2px solid ${INK}`, padding: "4px 12px" }}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              data-cursor-hover
              onClick={handleCopyLink}
              aria-label="Copy link to this product"
              className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-acid"
              style={{ border: `2px solid ${INK}`, padding: "4px 12px" }}
            >
              {copied ? "COPIED ✓" : "COPY LINK"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
