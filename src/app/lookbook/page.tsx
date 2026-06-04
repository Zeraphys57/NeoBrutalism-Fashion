import type { Metadata } from "next";
import LookbookGrid from "@/components/sections/LookbookGrid";

export const metadata: Metadata = {
  title: "Lookbook SS25 — BRUTAL COUTURE",
  description: "Editorial lookbook for the SS25 season drop.",
};

export default function LookbookPage() {
  return <LookbookGrid />;
}
