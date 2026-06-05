import NotFoundView from "@/components/ui/NotFoundView";

// Not-found boundary for the product segment (rendered if notFound() is thrown
// while a valid product render is in progress). Invalid slugs are rejected
// earlier by dynamicParams=false and handled by the root app/not-found.tsx.
export default function ProductNotFound() {
  return <NotFoundView />;
}
