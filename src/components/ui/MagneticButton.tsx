"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticVariant = "dark" | "acid" | "outline";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: MagneticVariant;
}

const VARIANT_CLASSES: Record<MagneticVariant, string> = {
  dark: "bg-ink text-acid hover:bg-acid hover:text-ink",
  acid: "bg-acid text-ink hover:bg-ink hover:text-acid",
  outline: "bg-transparent text-ink hover:bg-ink hover:text-acid",
};

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const COLOR_TRANSITION =
  "background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease";
// Snappy while following the pointer, slow + springy when resetting.
const FOLLOW_TRANSITION = `transform 0.15s ${EASE}, ${COLOR_TRANSITION}`;
const RESET_TRANSITION = `transform 0.5s ${EASE}, ${COLOR_TRANSITION}`;

/**
 * A brutalist button that magnetically leans toward the pointer on hover and
 * springs back on leave.
 */
export default function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
  type = "button",
  disabled = false,
  variant = "dark",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    const el = ref.current;
    if (!el || disabled) return;
    el.style.transition = FOLLOW_TRANSITION;
  };

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el || disabled) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = RESET_TRANSITION;
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
      style={{ transition: RESET_TRANSITION, willChange: "transform" }}
      className={cn(
        "b-border inline-flex items-center justify-center px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] disabled:pointer-events-none disabled:opacity-40",
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
