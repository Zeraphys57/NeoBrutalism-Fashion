"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import BrutalImage from "@/components/ui/BrutalImage";
import type { BrutalImageVariant } from "@/types";

interface HoverRevealProps {
  children: ReactNode;
  imageSrc?: string;
  imageVariant?: BrutalImageVariant;
  imageLabel?: string;
  className?: string;
}

/**
 * Wraps card content and floats a small BrutalImage preview that trails the
 * cursor while hovering. The preview is `position: fixed` so it escapes any
 * `overflow` clipping on ancestors (e.g. the horizontal scroller), and uses
 * gsap.quickTo for a premium, slightly-lagged follow.
 */
export default function HoverReveal({
  children,
  imageSrc,
  imageVariant = "dark",
  imageLabel,
  className,
}: HoverRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const [mounted, setMounted] = useState(false);

  // Portal target only exists on the client.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const reveal = revealRef.current;
    if (!reveal) return;
    gsap.set(reveal, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.85 });
    xTo.current = gsap.quickTo(reveal, "x", { duration: 0.5, ease: "power3" });
    yTo.current = gsap.quickTo(reveal, "y", { duration: 0.5, ease: "power3" });
    return () => {
      gsap.killTweensOf(reveal);
    };
  }, [mounted]);

  const onEnter = (e: MouseEvent<HTMLDivElement>) => {
    const reveal = revealRef.current;
    if (!reveal) return;
    // Snap to the pointer instantly so it fades in where the cursor is.
    gsap.set(reveal, { x: e.clientX, y: e.clientY });
    gsap.to(reveal, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" });
  };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    xTo.current?.(e.clientX);
    yTo.current?.(e.clientY);
  };

  const onLeave = () => {
    const reveal = revealRef.current;
    if (!reveal) return;
    gsap.to(reveal, { opacity: 0, scale: 0.85, duration: 0.3, ease: "power3.out" });
  };

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ position: "relative" }}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}

      {/* Portaled to <body> so no transformed ancestor (e.g. the parallaxed
          scroller) can turn this fixed element into a clipped/offset one. */}
      {mounted &&
        createPortal(
          <div
            ref={revealRef}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[9990]"
            style={{ width: 220 }}
          >
            <BrutalImage
              src={imageSrc}
              alt={imageLabel ?? "Collection preview"}
              variant={imageVariant}
              aspectRatio="3/4"
              label={imageLabel}
              className="b-border shadow-[6px_6px_0_0_#FFE600]"
            />
          </div>,
          document.body
        )}
    </div>
  );
}
