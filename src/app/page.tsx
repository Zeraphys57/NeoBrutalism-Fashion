"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Collections from "@/components/sections/Collections";
import FeaturedProduct from "@/components/sections/FeaturedProduct";
import ThisSeason from "@/components/sections/ThisSeason";
import About from "@/components/sections/About";
import WornBy from "@/components/sections/WornBy";
import Newsletter from "@/components/sections/Newsletter";
import Marquee from "@/components/ui/Marquee";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";

// Loader animates on the client only — skip SSR so the count/intro doesn't flash.
const Loader = dynamic(() => import("@/components/ui/Loader"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div
        style={{
          opacity: loading ? 0 : 1,
          pointerEvents: loading ? "none" : "auto",
          transition: "opacity 0.5s ease 0.2s",
        }}
      >
        <ScrollProgress />
        <Navbar />

        <main>
          <Hero />
          <Marquee />
          <Collections />
          <Marquee dark reverse />
          <FeaturedProduct />
          <ThisSeason />
          <About />
          <WornBy />
          <Newsletter />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
