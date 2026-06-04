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
  "FREE SHIPPING IDR 500K+",
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
    price: "IDR 580K",
    priceNumber: 580000,
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
    price: "IDR 490K",
    priceNumber: 490000,
    tag: "NEW",
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
    price: "IDR 620K",
    priceNumber: 620000,
    tag: "LIMITED",
    pieces: 8,
    season: "SS25",
    colorScheme: "light",
    imageSrc: "/images/static_noise.png",
  },
];

export const FEATURED_PRODUCT: Product = {
  id: "signal-oversized-tee",
  name: "SIGNAL OVERSIZED TEE",
  subtitle: "The flagship statement piece from RAW SIGNAL.",
  price: "IDR 490K",
  priceNumber: 490000,
  description:
    "A heavyweight oversized tee built to be heard. Boxy drop-shoulder silhouette, brutalist graphics, and a hand-pulled print that holds up wash after wash.",
  material: "100% Cotton 280gsm",
  fit: "Oversized Drop Shoulder",
  print: "3-Layer Screenprint",
  origin: "Made Locally in Indonesia",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  ref: "BC-0024",
  imageSrc: "/images/feat_product.png",
};

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
  "NYLON ID",
  "GOODNEWSFROMINDONESIA",
];

// Editorial lookbook grid. `size` drives the masonry footprint; `variant`
// picks the BrutalImage placeholder until `imageSrc` is filled in.
export const LOOKBOOK_ITEMS: LookbookItem[] = [
  { id: "lb-01", title: "VOID 01", collection: "void-series", variant: "dark", imageSrc: "/images/lookbook_1.png", size: "large" },
  { id: "lb-02", title: "RAW 03", collection: "raw-signal", variant: "yellow", imageSrc: "/images/lookbook_2.png", size: "medium" },
  { id: "lb-03", title: "STATIC 02", collection: "static-noise", variant: "light", imageSrc: "/images/lookbook_3.png", size: "small" },
  { id: "lb-04", title: "VOID 04", collection: "void-series", variant: "pattern", imageSrc: "/images/lookbook_4.png", size: "small" },
  { id: "lb-05", title: "RAW 05", collection: "raw-signal", variant: "yellow", imageSrc: "/images/lookbook_1.png", size: "large" },
  { id: "lb-06", title: "STATIC 01", collection: "static-noise", variant: "light", imageSrc: "/images/lookbook_2.png", size: "medium" },
  { id: "lb-07", title: "VOID 07", collection: "void-series", variant: "dark", imageSrc: "/images/lookbook_3.png", size: "medium" },
  { id: "lb-08", title: "SIGNAL 07", collection: "raw-signal", variant: "pattern", imageSrc: "/images/lookbook_4.png", size: "small" },
  { id: "lb-09", title: "STATIC 04", collection: "static-noise", variant: "light", imageSrc: "/images/lookbook_1.png", size: "large" },
  { id: "lb-10", title: "VOID 09", collection: "void-series", variant: "dark", imageSrc: "/images/lookbook_2.png", size: "small" },
  { id: "lb-11", title: "RAW 06", collection: "raw-signal", variant: "yellow", imageSrc: "/images/lookbook_3.png", size: "medium" },
  { id: "lb-12", title: "STATIC 06", collection: "static-noise", variant: "pattern", imageSrc: "/images/lookbook_4.png", size: "medium" },
];

// Community / UGC wall — fake IG handles across Indonesian cities.
export const WORN_BY_ITEMS: WornByItem[] = [
  { id: "worn-01", handle: "@void_wearer", location: "Jakarta", variant: "dark", imageSrc: "/images/worn_by_1.png" },
  { id: "worn-02", handle: "@signal.kuu", location: "Bandung", variant: "yellow", imageSrc: "/images/worn_by_2.png" },
  { id: "worn-03", handle: "@static.noise", location: "Surabaya", variant: "light", imageSrc: "/images/worn_by_3.png" },
  { id: "worn-04", handle: "@rage.mode", location: "Yogyakarta", variant: "pattern", imageSrc: "/images/worn_by_1.png" },
  { id: "worn-05", handle: "@brutal.id", location: "Denpasar", variant: "dark", imageSrc: "/images/worn_by_2.png" },
  { id: "worn-06", handle: "@acid.tone", location: "Medan", variant: "yellow", imageSrc: "/images/worn_by_3.png" },
  { id: "worn-07", handle: "@raw.frequency", location: "Semarang", variant: "light", imageSrc: "/images/worn_by_1.png" },
  { id: "worn-08", handle: "@noir.couture", location: "Makassar", variant: "pattern", imageSrc: "/images/worn_by_2.png" },
  { id: "worn-09", handle: "@drop.culture", location: "Bekasi", variant: "dark", imageSrc: "/images/worn_by_3.png" },
];
