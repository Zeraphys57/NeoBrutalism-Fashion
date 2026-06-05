import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/ui/CartDrawer";
import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "BRUTAL COUTURE — Wear Your Rage",
  description:
    "Neo-brutalist fashion out of Australia. Hard edges, electric yellow, zero apologies. SS25 — wear your rage.",
  openGraph: {
    title: "BRUTAL COUTURE — Wear Your Rage",
    description:
      "Neo-brutalist fashion out of Australia. Hard edges, electric yellow, zero apologies. SS25 — wear your rage.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-mono antialiased">
        <CartProvider>
          <Cursor />
          <SmoothScroll>
            <PageTransition>{children}</PageTransition>
          </SmoothScroll>
          {/* Outside SmoothScroll so the fixed drawer isn't affected by Lenis. */}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
