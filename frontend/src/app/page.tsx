"use client";

import React from "react";
import dynamic from "next/dynamic";
import "../theme/theme.css";
import "./page.css";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import HomeTextSlider from "@/components/HomeTextSlider/HomeTextSlider";
import Features from "../components/Features/Features";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import PlatformSupport from "../components/PlatformSupport/PlatformSupport";
import TrustSection from "../components/TrustSection/TrustSection";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/Footer/Footer";

// load consult button client-side (uses framer-motion; this version uses plain CSS)
const ConsultButton = dynamic(() => import("../components/ConsultButton/ConsultButton").then(mod => mod.default), { ssr: false });

// Load MagneticCursor only on the client to avoid build/runtime issues when gsap
const MagneticCursor = dynamic(
  () => import("../components/ui/magnetic-cursor").then((mod) => mod.default || mod.MagneticCursor),
  { ssr: false, loading: () => null }
);

export default function Page() {
  return (
    <MagneticCursor cursorSize={28} magneticFactor={0.45} blendMode="exclusion">
      <div className="ap-page">
        <Navbar />
        <main>
          <Hero />
        </main>
        {/* Consult floating button */}
         <HomeTextSlider />
         <Features />
         <HowItWorks />
         <PlatformSupport />
         <TrustSection />
         <FAQ />
         <Footer />
        <ConsultButton />
      </div>
    </MagneticCursor>
  );
}
