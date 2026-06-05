import NotFoundView from "@/components/ui/NotFoundView";

// Root 404 boundary. Serves invalid /products/[slug] requests (rejected by
// dynamicParams=false with a real 404 status) and any other unmatched route.
export default function NotFound() {
  return <NotFoundView />;
}
