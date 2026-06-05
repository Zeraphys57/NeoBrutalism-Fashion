"use client";

import { useEffect, useRef } from "react";

const LERP = 0.16;
const INTERACTIVE = "a, button, [data-cursor-hover], [data-cursor-text]";

/**
 * Drives the custom cursor: lerps it toward the pointer every frame, toggles
 * `cursor--click` on press, grows it over interactive elements, and shows a
 * trailing text label for elements that declare `data-cursor-text`.
 *
 * Hover is handled via event delegation on the document so it keeps working for
 * elements mounted later (route transitions, filtered grids, etc.).
 * Returns refs for the cursor dot and the text label.
 */
export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const textEl = textRef.current;
    if (!cursor) return;

    // Only run on real pointer devices. Touch / coarse-pointer devices have no
    // use for the square cursor — skip the rAF loop and listeners entirely.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseDown = () => cursor.classList.add("cursor--click");
    const onMouseUp = () => cursor.classList.remove("cursor--click");

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    let rafId = 0;
    const render = () => {
      pos.x += (mouse.x - pos.x) * LERP;
      pos.y += (mouse.y - pos.y) * LERP;
      cursor.style.left = `${pos.x}px`;
      cursor.style.top = `${pos.y}px`;
      if (textEl) {
        textEl.style.left = `${pos.x + 18}px`;
        textEl.style.top = `${pos.y + 18}px`;
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    // Delegated hover: find the interactive ancestor of whatever we entered.
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest(INTERACTIVE);
      if (!el) return;
      cursor.classList.add("cursor--hover");
      const text = el.getAttribute("data-cursor-text");
      if (text && textEl) {
        textEl.textContent = text;
        textEl.classList.add("cursor-text--visible");
      }
    };
    const onOut = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest(INTERACTIVE);
      if (!el) return;
      // Ignore moves into the element's own children.
      const related = e.relatedTarget as Node | null;
      if (related && el.contains(related)) return;
      cursor.classList.remove("cursor--hover");
      if (textEl) textEl.classList.remove("cursor-text--visible");
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { cursorRef, textRef };
}
