"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCart } from "@/context/CartContext";
import BrutalImage from "@/components/ui/BrutalImage";
import type { BrutalImageVariant } from "@/types";

gsap.registerPlugin(useGSAP);

const ACID = "#FFE600";
const INK = "#0A0A0A";
const MUTED = "#888888";

const OUTLINED_ACID = {
  color: "transparent",
  WebkitTextFillColor: "transparent",
  WebkitTextStroke: `2px ${ACID}`,
} as const;

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Lock page scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  // Open / close animation.
  useGSAP(
    () => {
      const root = rootRef.current;
      const backdrop = backdropRef.current;
      const panel = panelRef.current;
      if (!root || !backdrop || !panel) return;

      if (firstRender.current) {
        firstRender.current = false;
        gsap.set(panel, { xPercent: 100 });
        gsap.set(backdrop, { opacity: 0 });
        gsap.set(root, { autoAlpha: 0 });
        return;
      }

      gsap.killTweensOf([root, backdrop, panel]);

      if (isOpen) {
        gsap.set(root, { autoAlpha: 1 });
        gsap.to(backdrop, { opacity: 0.6, duration: 0.5, ease: "power4.inOut" });
        gsap.to(panel, { xPercent: 0, duration: 0.5, ease: "power4.inOut" });
      } else {
        gsap.to(backdrop, { opacity: 0, duration: 0.5, ease: "power4.inOut" });
        gsap.to(panel, {
          xPercent: 100,
          duration: 0.5,
          ease: "power4.inOut",
          onComplete: () => gsap.set(root, { autoAlpha: 0 }),
        });
      }
    },
    { dependencies: [isOpen] }
  );

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9990]" role="dialog" aria-modal="true" aria-label="Shopping bag">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={closeCart}
        className="absolute inset-0"
        style={{ backgroundColor: INK }}
        aria-hidden
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute bottom-0 right-0 top-0 flex flex-col bg-chalk"
        style={{ width: "clamp(340px, 90vw, 480px)", borderLeft: `3px solid ${INK}` }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b-[3px] border-ink p-5">
          <div className="flex items-center gap-3">
            <span className="font-display leading-none text-ink" style={{ fontSize: 40 }}>
              YOUR BAG
            </span>
            {totalItems > 0 && (
              <span
                className="flex items-center justify-center bg-acid font-display leading-none text-ink"
                style={{ minWidth: 28, height: 28, fontSize: 16, padding: "0 7px" }}
              >
                {totalItems}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeCart}
            data-cursor-hover
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center border-[3px] border-ink font-mono font-bold text-ink transition-colors duration-200 hover:bg-acid"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
            <span
              className="font-display leading-none"
              style={{ fontSize: "clamp(120px, 40vw, 180px)", ...OUTLINED_ACID }}
            >
              0
            </span>
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-ink">
              YOUR BAG IS EMPTY
            </p>
            <button
              type="button"
              onClick={closeCart}
              data-cursor-hover
              className="b-border bg-ink px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-acid transition-colors duration-200 hover:bg-acid hover:text-ink"
            >
              CONTINUE SHOPPING →
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 border-b-[3px] border-ink p-5"
              >
                {/* Thumbnail */}
                <div className="shrink-0" style={{ width: 80 }}>
                  <BrutalImage
                    variant={item.variant as BrutalImageVariant}
                    alt={item.name}
                    aspectRatio="1/1"
                    className="b-border"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col">
                  <div className="font-display leading-none text-ink" style={{ fontSize: 20 }}>
                    {item.name}
                  </div>
                  <span className="mt-1 w-fit bg-acid px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                    SIZE {item.size}
                  </span>
                  <div className="mt-2 font-mono text-sm font-bold text-ink">
                    {item.priceFormatted}
                  </div>
                </div>

                {/* Quantity controls */}
                <div className="flex shrink-0 flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      data-cursor-hover
                      aria-label="Decrease quantity"
                      className="flex h-8 w-8 items-center justify-center border-[3px] border-ink font-mono font-bold text-ink transition-colors duration-200 hover:bg-acid"
                    >
                      −
                    </button>
                    <span
                      className="font-display leading-none text-ink"
                      style={{ fontSize: 20, minWidth: 20, textAlign: "center" }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      data-cursor-hover
                      aria-label="Increase quantity"
                      className="flex h-8 w-8 items-center justify-center border-[3px] border-ink font-mono font-bold text-ink transition-colors duration-200 hover:bg-acid"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id, item.size)}
                    data-cursor-hover
                    className="font-mono text-[10px] uppercase tracking-wider transition-colors duration-200 hover:text-ink"
                    style={{ color: MUTED }}
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="shrink-0 border-t-[3px] border-ink p-5">
            <div className="flex items-end justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink">
                SUBTOTAL
              </span>
              <span
                className="font-display leading-none text-acid"
                style={{ fontSize: 32, WebkitTextStroke: `1.5px ${INK}` }}
              >
                {totalPrice}
              </span>
            </div>
            <button
              type="button"
              data-cursor-hover
              className="mt-4 w-full b-border bg-acid px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-[6px_6px_0_0_#0A0A0A] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_#0A0A0A]"
            >
              CHECKOUT →
            </button>
            <p className="mt-3 text-center font-mono" style={{ fontSize: 9, color: MUTED }}>
              SECURE CHECKOUT · IDR 500K = FREE SHIP
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
