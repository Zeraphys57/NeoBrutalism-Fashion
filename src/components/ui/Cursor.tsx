"use client";

import { useCursor } from "@/hooks/useCursor";

/**
 * The custom cursor: a styled square the useCursor hook positions and resizes,
 * plus a small text label that trails it and shows whatever a hovered element
 * declares via `data-cursor-text`. Hidden from assistive tech.
 */
export default function Cursor() {
  const { cursorRef, textRef } = useCursor();
  return (
    <>
      <div ref={cursorRef} className="cursor" aria-hidden="true" />
      <div ref={textRef} className="cursor-text" aria-hidden="true" />
    </>
  );
}
