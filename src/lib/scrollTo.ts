import { getLenis } from "@/lib/lenis";

// Roughly the fixed navbar height — keeps the target clear of the header.
const NAV_OFFSET = -90;

/**
 * Smoothly scroll to an element by id, driven through the live Lenis instance so
 * it matches the rest of the site's scrolling. Accepts "#id" or "id". Falls back
 * to native smooth scroll if Lenis isn't mounted yet.
 */
export function smoothScrollTo(id: string) {
  const targetId = id.startsWith("#") ? id.slice(1) : id;
  const el = document.getElementById(targetId);
  if (!el) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.2 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
