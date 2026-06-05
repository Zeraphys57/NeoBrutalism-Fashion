import type {
  Collection,
  LookbookItem,
  ManifestoLine,
  NavLink,
  Product,
  StatItem,
  WornByItem,
} from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "COLLECTIONS", href: "#collections" },
  { label: "LOOKBOOK", href: "/lookbook" },
  { label: "ARCHIVE", href: "#archive" },
  { label: "ABOUT", href: "#about" },
];

export const MARQUEE_ITEMS: string[] = [
  "NEW DROP SS25",
  "✦",
  "LIMITED EDITION",
  "✦",
  "BRUTALIST FASHION",
  "✦",
  "FREE SHIPPING $500 AUD+",
  "✦",
  "NO RULES, ONLY VIBES",
  "✦",
  "WEAR YOUR RAGE",
  "✦",
];

export const COLLECTIONS: Collection[] = [
  {
    id: "void-series",
    slug: "void-series",
    name: "VOID SERIES",
    description:
      "Monolithic blacks engineered for the void. Heavyweight cuts that swallow the light and give nothing back.",
    price: "$580 AUD",
    priceNumber: 580,
    tag: "SOLD OUT",
    pieces: 12,
    season: "SS25",
    colorScheme: "dark",
    imageSrc: "/images/void_series.png",
  },
  {
    id: "raw-signal",
    slug: "raw-signal",
    name: "RAW SIGNAL",
    description:
      "High-voltage yellow that refuses to whisper. Loud, unfiltered, and built to broadcast on every frequency.",
    price: "$490 AUD",
    priceNumber: 490,
    tag: "SEASON 2",
    pieces: 24,
    season: "SS25",
    colorScheme: "yellow",
    imageSrc: "/images/raw_signal.png",
  },
  {
    id: "static-noise",
    slug: "static-noise",
    name: "STATIC NOISE",
    description:
      "Washed greys and broken grids. A limited run of static for those who tuned out the algorithm.",
    price: "$620 AUD",
    priceNumber: 620,
    tag: "LIMITED",
    pieces: 8,
    season: "SS25",
    colorScheme: "light",
    imageSrc: "/images/static_noise.png",
  },
  {
    id: "silent-dystopia",
    slug: "silent-dystopia",
    name: "SILENT DYSTOPIA",
    description:
      "The pinnacle of world-class couture. Cold architectural forms meeting raw, brutal textiles in a post-industrial wasteland.",
    price: "$1,850 AUD",
    priceNumber: 1850,
    tag: "SEASON 4",
    pieces: 10,
    season: "S4",
    colorScheme: "purple",
    imageSrc: "/images/couture season 4/s4_action_motion_1780647366405.png",
  },
];

export const FEATURED_PRODUCT: Product = {
  id: "signal-oversized-tee",
  slug: "signal-oversized-tee",
  collectionSlug: "raw-signal",
  colorScheme: "yellow",
  isNew: true,
  relatedSlugs: ["raw-cargo-pants", "static-graphic-hoodie", "void-longline-tee"],
  name: "SIGNAL OVERSIZED TEE",
  subtitle: "The flagship statement piece from RAW SIGNAL.",
  price: "$490 AUD",
  priceNumber: 490,
  description:
    "A heavyweight oversized tee built to be heard. Boxy drop-shoulder silhouette, brutalist graphics, and a hand-pulled print that holds up wash after wash.",
  material: "100% Cotton 280gsm",
  fit: "Oversized Drop Shoulder",
  print: "3-Layer Screenprint",
  origin: "Made in Melbourne, Australia",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  ref: "BC-0024",
  imageSrc: "/images/feat_product.png",
};

/**
 * Full catalogue backing the /products/[slug] detail pages. FEATURED_PRODUCT is
 * the lead entry (signal-oversized-tee) so the homepage feature and the detail
 * page never drift out of sync.
 */
export const ALL_PRODUCTS: Product[] = [
  FEATURED_PRODUCT,
  {
    id: "void-bomber-jacket",
    slug: "void-bomber-jacket",
    collectionSlug: "void-series",
    colorScheme: "dark",
    isNew: false,
    relatedSlugs: ["void-longline-tee", "noise-utility-vest", "signal-oversized-tee"],
    name: "VOID BOMBER JACKET",
    subtitle: "Armor for the dark.",
    price: "$1,200 AUD",
    priceNumber: 1200,
    description:
      "A monolithic bomber cut from the void. Matte-black coated shell, blackout hardware, and a weight that settles on the shoulders like intent. Zip it shut and disappear into the architecture.",
    material: "Coated Nylon Shell · Quilted Lining",
    fit: "Boxy Oversized",
    print: "Tonal Rubber Patch",
    origin: "Cut & Sewn in Sydney",
    sizes: ["S", "M", "L", "XL"],
    ref: "BC-0031",
    imageSrc: "/images/void_series.png",
  },
  {
    id: "static-graphic-hoodie",
    slug: "static-graphic-hoodie",
    collectionSlug: "static-noise",
    colorScheme: "light",
    isNew: true,
    relatedSlugs: ["noise-utility-vest", "signal-oversized-tee", "void-bomber-jacket"],
    name: "STATIC GRAPHIC HOODIE",
    subtitle: "Broadcast the noise.",
    price: "$780 AUD",
    priceNumber: 780,
    description:
      "Washed heavyweight fleece carrying a broken-grid graphic pulled straight off a dead channel. Brushed soft on the inside, raw at the hems, and built to fray on your terms — not the algorithm's.",
    material: "420gsm Brushed Fleece",
    fit: "Relaxed Drop Shoulder",
    print: "Distressed Discharge Print",
    origin: "Milled & Made in Melbourne",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    ref: "BC-0027",
    imageSrc: "/images/static_noise.png",
  },
  {
    id: "raw-cargo-pants",
    slug: "raw-cargo-pants",
    collectionSlug: "raw-signal",
    colorScheme: "yellow",
    isNew: false,
    relatedSlugs: ["signal-oversized-tee", "static-graphic-hoodie", "void-bomber-jacket"],
    name: "RAW CARGO PANTS",
    subtitle: "Pockets with an agenda.",
    price: "$650 AUD",
    priceNumber: 650,
    description:
      "Utility cut with nothing decorative about it. Anchored cargo pockets, doubled stitching at every stress point, and a tapered leg that means business from the knee down. Function dressed as a threat.",
    material: "Rip-Stop Cotton Twill",
    fit: "Tapered Utility",
    print: "Webbing & Metal Trims",
    origin: "Constructed in Brisbane",
    sizes: ["S", "M", "L", "XL", "XXL"],
    ref: "BC-0029",
    imageSrc: "/images/raw_signal.png",
  },
  {
    id: "void-longline-tee",
    slug: "void-longline-tee",
    collectionSlug: "void-series",
    colorScheme: "dark",
    isNew: true,
    relatedSlugs: ["void-bomber-jacket", "signal-oversized-tee", "noise-utility-vest"],
    name: "VOID LONGLINE TEE",
    subtitle: "Length as a language.",
    price: "$420 AUD",
    priceNumber: 420,
    description:
      "An elongated tee that falls past the hip and refuses to explain itself. Pitch-black, side-split, and heavy enough to hang with real weight. The quiet half of the VOID SERIES — it still says plenty.",
    material: "100% Cotton 240gsm",
    fit: "Longline Regular",
    print: "Tonal Back Hit",
    origin: "Made in Melbourne, Australia",
    sizes: ["XS", "S", "M", "L", "XL"],
    ref: "BC-0033",
    imageSrc: "/images/lookbook_1.png",
  },
  {
    id: "noise-utility-vest",
    slug: "noise-utility-vest",
    collectionSlug: "static-noise",
    colorScheme: "light",
    isNew: false,
    relatedSlugs: ["static-graphic-hoodie", "raw-cargo-pants", "void-bomber-jacket"],
    name: "NOISE UTILITY VEST",
    subtitle: "Carry the static.",
    price: "$550 AUD",
    priceNumber: 550,
    description:
      "A layering vest engineered for clutter — modular front pockets, adjustable webbing, and a washed shell that reads like interference. Throw it over anything and let the silhouette do the shouting.",
    material: "Washed Ripstop · Mesh Back",
    fit: "Boxy Layering",
    print: "Reflective Tape Detail",
    origin: "Assembled in Perth",
    sizes: ["S", "M", "L", "XL"],
    ref: "BC-0035",
    imageSrc: "/images/lookbook_3.png",
  },
];

/** Look up a single product by its URL slug. */
export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((product) => product.slug === slug);
}

/** Resolve an ordered list of related products, skipping any unknown slugs. */
export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => product !== undefined);
}

/** The first product belonging to a collection — used to link collection cards. */
export function getCollectionLeadProduct(collectionSlug: string): Product | undefined {
  return ALL_PRODUCTS.find((product) => product.collectionSlug === collectionSlug);
}

// Drop a real path here later (e.g. "/images/hero.jpg") to swap the Hero
// placeholder for a photo — no component changes required.
export const HERO_IMAGE_SRC: string | undefined = "/images/hero_banner.png";

export const HERO_STATS: StatItem[] = [
  { value: "1.2K+", label: "PIECES SOLD" },
  { value: "48H", label: "DELIVERY" },
  { value: "100%", label: "INDEPENDENT" },
  { value: "SS25", label: "COLLECTION" },
];

export const MANIFESTO_LINES: ManifestoLine[] = [
  { text: "We don't do subtle.", outlined: false },
  { text: "We don't do apologies.", outlined: true },
  { text: "Fashion that talks back.", outlined: false },
  { text: "Wear it. Mean it.", outlined: true },
];

export const BRAND_STATS: StatItem[] = [
  { value: "2021", label: "FOUNDED" },
  { value: "48+", label: "DROPS" },
  { value: "12K+", label: "COMMUNITY" },
];

export const PRESS_MENTIONS: string[] = [
  "HIGHSNOBIETY",
  "HYPEBEAST",
  "RUSSH MAGAZINE",
  "VOGUE AUSTRALIA",
];

// Editorial lookbook grid. `size` drives the masonry footprint; `variant`
// picks the BrutalImage placeholder until `imageSrc` is filled in.
export const LOOKBOOK_ITEMS: LookbookItem[] = [
  // Season 1: Void Series (6 items)
  { id: "lb-01", title: "S1 01", collection: "void-series", variant: "dark", imageSrc: "/images/void_series.png", size: "large" },
  { id: "lb-02", title: "S1 02", collection: "void-series", variant: "pattern", imageSrc: "/images/lookbook_1.png", size: "medium" },
  { id: "lb-03", title: "S1 03", collection: "void-series", variant: "dark", imageSrc: "/images/lookbook_4.png", size: "small" },
  { id: "lb-04", title: "S1 04", collection: "void-series", variant: "pattern", imageSrc: "/images/backup/backup_1.png", size: "large" },
  { id: "lb-05", title: "S1 05", collection: "void-series", variant: "dark", imageSrc: "/images/backup/backup_2.png", size: "medium" },
  { id: "lb-06", title: "S1 06", collection: "void-series", variant: "dark", imageSrc: "/images/worn_by_1.png", size: "small" },
  // Season 2: Raw Signal (5 items)
  { id: "lb-07", title: "S2 01", collection: "raw-signal", variant: "yellow", imageSrc: "/images/raw_signal.png", size: "large" },
  { id: "lb-08", title: "S2 02", collection: "raw-signal", variant: "pattern", imageSrc: "/images/lookbook_2.png", size: "medium" },
  { id: "lb-09", title: "S2 03", collection: "raw-signal", variant: "yellow", imageSrc: "/images/feat_product.png", size: "small" },
  { id: "lb-10", title: "S2 04", collection: "raw-signal", variant: "pattern", imageSrc: "/images/backup/backup_3.png", size: "large" },
  { id: "lb-11", title: "S2 05", collection: "raw-signal", variant: "yellow", imageSrc: "/images/worn_by_2.png", size: "medium" },
  // Season 3: Static Noise (6 items)
  { id: "lb-12", title: "S3 01", collection: "static-noise", variant: "light", imageSrc: "/images/static_noise.png", size: "large" },
  { id: "lb-13", title: "S3 02", collection: "static-noise", variant: "pattern", imageSrc: "/images/lookbook_3.png", size: "small" },
  { id: "lb-14", title: "S3 03", collection: "static-noise", variant: "light", imageSrc: "/images/hero_banner.png", size: "medium" },
  { id: "lb-15", title: "S3 04", collection: "static-noise", variant: "pattern", imageSrc: "/images/backup/backup_4.png", size: "large" },
  { id: "lb-16", title: "S3 05", collection: "static-noise", variant: "light", imageSrc: "/images/backup/backup_5.png", size: "medium" },
  { id: "lb-17", title: "S3 06", collection: "static-noise", variant: "pattern", imageSrc: "/images/worn_by_3.png", size: "small" },
  // Season 4: Silent Dystopia (8 items)
  { id: "lb-18", title: "S4 01", collection: "silent-dystopia", variant: "dark", imageSrc: "/images/couture season 4/s4_editorial_full_1780647341081.png", size: "large" },
  { id: "lb-19", title: "S4 02", collection: "silent-dystopia", variant: "yellow", imageSrc: "/images/couture season 4/s4_close_portrait_1780647354246.png", size: "medium" },
  { id: "lb-20", title: "S4 03", collection: "silent-dystopia", variant: "light", imageSrc: "/images/couture season 4/s4_action_motion_1780647366405.png", size: "small" },
  { id: "lb-21", title: "S4 04", collection: "silent-dystopia", variant: "pattern", imageSrc: "/images/couture season 4/s4_garment_focus_1780647387806.png", size: "small" },
  { id: "lb-22", title: "S4 05", collection: "silent-dystopia", variant: "yellow", imageSrc: "/images/couture season 4/s4_wide_landscape_1780647403276.png", size: "large" },
  { id: "lb-23", title: "S4 06", collection: "silent-dystopia", variant: "light", imageSrc: "/images/couture season 4/s4_dual_models_1780647417458.png", size: "medium" },
  { id: "lb-24", title: "S4 07", collection: "silent-dystopia", variant: "dark", imageSrc: "/images/couture season 4/s4_texture_detail_1780647440592.png", size: "medium" },
  { id: "lb-25", title: "S4 08", collection: "silent-dystopia", variant: "pattern", imageSrc: "/images/couture season 4/s4_experimental_perspective_1780647452906.png", size: "small" },
];

// Community / UGC wall — fake IG handles across Indonesian cities.
export const WORN_BY_ITEMS: WornByItem[] = [
  { id: "worn-01", handle: "@void_wearer", location: "Melbourne", variant: "dark", imageSrc: "/images/couture season 4/s4_action_motion_1780647366405.png" },
  { id: "worn-02", handle: "@signal.kuu", location: "Sydney", variant: "yellow", imageSrc: "/images/couture season 4/s4_close_portrait_1780647354246.png" },
  { id: "worn-03", handle: "@static.noise", location: "Brisbane", variant: "light", imageSrc: "/images/couture season 4/s4_dual_models_1780647417458.png" },
  { id: "worn-04", handle: "@rage.mode", location: "Perth", variant: "pattern", imageSrc: "/images/couture season 4/s4_editorial_full_1780647341081.png" },
  { id: "worn-05", handle: "@brutal.id", location: "Adelaide", variant: "dark", imageSrc: "/images/couture season 4/s4_experimental_perspective_1780647452906.png" },
  { id: "worn-06", handle: "@acid.tone", location: "Gold Coast", variant: "yellow", imageSrc: "/images/couture season 4/s4_garment_focus_1780647387806.png" },
  { id: "worn-07", handle: "@raw.frequency", location: "Hobart", variant: "light", imageSrc: "/images/couture season 4/s4_texture_detail_1780647440592.png" },
  { id: "worn-08", handle: "@noir.couture", location: "Byron Bay", variant: "pattern", imageSrc: "/images/couture season 4/s4_wide_landscape_1780647403276.png" },
  { id: "worn-09", handle: "@drop.culture", location: "Canberra", variant: "dark", imageSrc: "/images/couture season 4/s4_action_motion_1780647366405.png" },
];
