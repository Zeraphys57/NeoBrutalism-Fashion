"use client";

import type { ReactNode } from "react";
import { useLenis } from "@/hooks/useLenis";

/**
 * App-wide wrapper that enables Lenis smooth scrolling. Renders its children
 * untouched — it exists only to mount the scroll instance at the root.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}
