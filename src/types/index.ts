// Core domain types for Brutal Couture.

export type CollectionTag = "NEW" | "SOLD OUT" | "LIMITED" | "ARCHIVE" | "SEASON 2" | "SEASON 4";

export type ColorScheme = "dark" | "yellow" | "light" | "purple";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

// Visual treatments for the BrutalImage placeholder system.
export type BrutalImageVariant = "dark" | "yellow" | "light" | "pattern" | "purple";

// Masonry footprint for lookbook tiles.
export type LookbookSize = "small" | "medium" | "large";

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  priceNumber: number;
  tag: CollectionTag;
  pieces: number;
  season: string;
  colorScheme: ColorScheme;
  imageSrc?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  priceNumber: number;
  description: string;
  material: string;
  fit: string;
  print: string;
  origin: string;
  sizes: ProductSize[];
  ref: string;
  imageSrc?: string;
  /** URL-friendly id used by the /products/[slug] detail route. */
  slug: string;
  /** Slug of the parent collection (see COLLECTIONS). */
  collectionSlug: string;
  /** Drives the BrutalImage placeholder + accent treatment. */
  colorScheme: ColorScheme;
  /** Slugs of 2–3 related products surfaced on the detail page. */
  relatedSlugs: string[];
  /** Flags a fresh drop — toggles the "NEW ARRIVAL" badge. */
  isNew: boolean;
}

export interface LookbookItem {
  id: string;
  title: string;
  collection: string;
  variant: BrutalImageVariant;
  imageSrc?: string;
  size: LookbookSize;
}

export interface WornByItem {
  id: string;
  handle: string;
  location: string;
  variant: BrutalImageVariant;
  imageSrc?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ManifestoLine {
  text: string;
  outlined: boolean;
}
