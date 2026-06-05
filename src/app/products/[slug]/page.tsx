import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ProductDetail from "@/components/sections/ProductDetail";
import RelatedProducts from "@/components/sections/RelatedProducts";
import { ALL_PRODUCTS, getProductBySlug } from "@/lib/data";

interface ProductPageProps {
  // Next.js 15: route params are delivered as a Promise.
  params: Promise<{ slug: string }>;
}

// The catalogue is fixed. dynamicParams=false makes any slug outside
// generateStaticParams return a real 404 status (handled by app/not-found.tsx)
// instead of an on-demand soft-404 (200) — fully-static notFound() routes would
// otherwise be prerendered and cached as 200. Also keeps the route export-safe.
export const dynamicParams = false;

// Pre-render every product at build time (required for static export).
export function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found — BRUTAL COUTURE" };
  }

  const title = `${product.name} — BRUTAL COUTURE`;
  return {
    title,
    description: product.description,
    openGraph: { title, description: product.description, type: "website" },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <ProductDetail product={product} />
        <RelatedProducts product={product} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
