import { assetPath } from "./paths";

export type ProductColor = {
  name: string;
  hex: string;
  image?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: "Seating" | "Tables" | "Lighting" | "Decor";
  material: string;
  price: number;
  image: string;
  gallery: string[];
  colors: ProductColor[];
  badge?: string;
  description: string;
  base?: string;
  origin?: string;
};

const productPath = (name: string) => assetPath(`/images/products/${name}`);

export const products: Product[] = [
  {
    slug: "arc-lounge-chair",
    name: "Arc Lounge Chair",
    category: "Seating",
    material: "Bouclé",
    price: 1850,
    badge: "New",
    image: productPath("arc-lounge-chair-main.webp"),
    gallery: [
      productPath("arc-lounge-chair-main.webp"),
      productPath("arc-lounge-chair-side.webp"),
      productPath("arc-lounge-chair-rear.webp"),
      productPath("arc-lounge-chair-detail.webp"),
    ],
    colors: [
      { name: "Oat Bouclé", hex: "#d9cfbd", image: productPath("arc-lounge-chair-main.webp") },
      { name: "Warm Taupe", hex: "#97866f", image: productPath("arc-lounge-chair-taupe.webp") },
      { name: "Moss Olive", hex: "#666757", image: productPath("arc-lounge-chair-olive.webp") },
      { name: "Charcoal", hex: "#3f403d", image: productPath("arc-lounge-chair-charcoal.webp") },
    ],
    description: "A sculptural silhouette with an embracing form. Generous comfort meets refined proportion, grounded by a solid base and wrapped in tactile, sustainable upholstery.",
    base: "Solid Oak, Dark Satin",
    origin: "Portugal",
  },
  {
    slug: "strata-side-table",
    name: "Strata Side Table",
    category: "Tables",
    material: "Travertine",
    price: 920,
    image: productPath("strata-side-table-main.webp"),
    gallery: [
      productPath("strata-side-table-main.webp"),
      productPath("strata-side-table-side.webp"),
      productPath("strata-side-table-rear.webp"),
      productPath("strata-side-table-detail.webp"),
    ],
    colors: [
      { name: "Natural Travertine", hex: "#c9b99f", image: productPath("strata-side-table-main.webp") },
      { name: "Charcoal Stone", hex: "#56534d", image: productPath("strata-side-table-charcoal.webp") },
    ],
    description: "A compact table shaped from expressive stone. The clean drum pedestal lets the natural pores and tonal movement of travertine take focus.",
    base: "Solid Stone",
    origin: "Italy",
  },
  {
    slug: "dome-table-lamp",
    name: "Dome Table Lamp",
    category: "Lighting",
    material: "Aluminum",
    price: 480,
    image: productPath("dome-table-lamp-main.webp"),
    gallery: [
      productPath("dome-table-lamp-main.webp"),
      productPath("dome-table-lamp-side.webp"),
      productPath("dome-table-lamp-rear.webp"),
      productPath("dome-table-lamp-detail.webp"),
    ],
    colors: [
      { name: "Brushed Aluminum", hex: "#aaa9a4", image: productPath("dome-table-lamp-main.webp") },
      { name: "Aged Brass", hex: "#9f7b48", image: productPath("dome-table-lamp-brass.webp") },
    ],
    description: "A softly reflective dome balances on a precise cylindrical base, casting a warm pool of light across a desk, shelf, or bedside table.",
    base: "Brushed Metal",
    origin: "Denmark",
  },
  {
    slug: "ribbed-vessel",
    name: "Ribbed Vessel",
    category: "Decor",
    material: "Ceramic",
    price: 210,
    image: productPath("ribbed-vessel-main.webp"),
    gallery: [
      productPath("ribbed-vessel-main.webp"),
      productPath("ribbed-vessel-side.webp"),
      productPath("ribbed-vessel-rear.webp"),
      productPath("ribbed-vessel-detail.webp"),
    ],
    colors: [
      { name: "Ivory", hex: "#ddd5c5", image: productPath("ribbed-vessel-main.webp") },
      { name: "Graphite", hex: "#53514d", image: productPath("ribbed-vessel-graphite.webp") },
    ],
    description: "A hand-finished ceramic vessel with rhythmic fluting and a gently irregular rim. Each piece carries subtle variations in texture and tone.",
    base: "Hand-thrown Ceramic",
    origin: "Portugal",
  },
  {
    slug: "sol-coffee-table",
    name: "Sol Coffee Table",
    category: "Tables",
    material: "Solid Oak",
    price: 1280,
    image: productPath("sol-coffee-table-main.webp"),
    gallery: [
      productPath("sol-coffee-table-main.webp"),
      productPath("sol-coffee-table-side.webp"),
      productPath("sol-coffee-table-rear.webp"),
      productPath("sol-coffee-table-detail.webp"),
    ],
    colors: [
      { name: "Smoked Oak", hex: "#4f4942", image: productPath("sol-coffee-table-main.webp") },
      { name: "Warm Sand", hex: "#b5a78e", image: productPath("sol-coffee-table-sand.webp") },
    ],
    description: "A low architectural table with an expansive oval top and a broad recessed base. Quiet in detail, substantial in presence.",
    base: "Solid Oak",
    origin: "Lithuania",
  },
  {
    slug: "club-lounge-chair",
    name: "Club Lounge Chair",
    category: "Seating",
    material: "Fabric",
    price: 1620,
    image: productPath("club-lounge-chair-main.webp"),
    gallery: [
      productPath("club-lounge-chair-main.webp"),
      productPath("club-lounge-chair-side.webp"),
      productPath("club-lounge-chair-rear.webp"),
      productPath("club-lounge-chair-detail.webp"),
    ],
    colors: [
      { name: "Sand", hex: "#b7a58d", image: productPath("club-lounge-chair-main.webp") },
      { name: "Moss Olive", hex: "#70745d", image: productPath("club-lounge-chair-moss.webp") },
      { name: "Charcoal", hex: "#3c3d3a", image: productPath("club-lounge-chair-charcoal.webp") },
    ],
    description: "A tailored lounge chair pairing soft upholstery with a slender solid-oak frame.",
    base: "Solid Oak",
    origin: "Sweden",
  },
  {
    slug: "stone-bowl",
    name: "Stone Bowl",
    category: "Decor",
    material: "Marble",
    price: 165,
    image: productPath("stone-bowl-main.webp"),
    gallery: [
      productPath("stone-bowl-main.webp"),
      productPath("stone-bowl-top.webp"),
      productPath("stone-bowl-detail.webp"),
    ],
    colors: [
      { name: "Volcanic Stone", hex: "#33322f", image: productPath("stone-bowl-main.webp") },
      { name: "Ivory Limestone", hex: "#d9cfbb", image: productPath("stone-bowl-ivory.webp") },
      { name: "Warm Travertine", hex: "#bba989", image: productPath("stone-bowl-travertine.webp") },
    ],
    description: "A shallow sculptural bowl carved from dark stone and finished by hand.",
    base: "Volcanic Stone",
    origin: "Mexico",
  },
  {
    slug: "linear-bench",
    name: "Linear Bench",
    category: "Seating",
    material: "Solid Oak",
    price: 1450,
    image: productPath("linear-bench-main.webp"),
    gallery: [
      productPath("linear-bench-main.webp"),
      productPath("linear-bench-side.webp"),
      productPath("linear-bench-detail.webp"),
    ],
    colors: [
      { name: "Oat", hex: "#c6b69c", image: productPath("linear-bench-main.webp") },
      { name: "Moss Olive", hex: "#6b7055", image: productPath("linear-bench-olive.webp") },
      { name: "Charcoal", hex: "#3a3b39", image: productPath("linear-bench-charcoal.webp") },
    ],
    description: "A restrained upholstered bench with a solid timber base and calm linear proportions.",
    base: "Solid Oak",
    origin: "Portugal",
  },
];

export const findProduct = (slug: string) => products.find((product) => product.slug === slug);

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
