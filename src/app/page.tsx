// app/page.tsx (or pages/index.tsx)
"use client"; // Required for useEffect and other client-side hooks

import { useEffect } from "react";

// --- Ensure these paths are correct for your project structure ---
import HeroImageSlider from "@/components/HeroSection";
import Header from "@/components/Header";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import Founders from "@/components/Founders";
import ContactUs from "@/components/ContactUs";
import StickyScrollContainer from "@/components/StickyScrollContainer";
// --- End Ensure Paths ---

export default function Home() {
  // Define image paths (as before)
  const heroImages = ["/image1.png", "/image2.png"];
  const mobileHeroImages = ["/mobileimage1.jpg", "/mobileimage2.jpg"];

  // Optional: Enable smooth scrolling using CSS.
  // This works well with the native scrolling required by position: sticky.
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    // Cleanup function to remove the style when the component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- IMPORTANT: NO custom wheel/scroll event listener here ---

  return (
    <>
      {/* Header remains fixed at the top */}
      <Header />

      {/* The main content area */}
      <main>
        {/* StickyScrollContainer wraps all the sections that should scroll sequentially */}
        <StickyScrollContainer>
          {/* Pass each section component directly as a child */}
          {/* Do NOT pass height="100vh" to children; the container handles sizing */}
          <HeroImageSlider
            images={heroImages}
            mobileImages={mobileHeroImages}
            interval={5000} // Pass other necessary props
          />

          <WhatWeDoSection />

          <Founders />

          <ContactUs />

          {/* Add more sections here if needed, they will be included in the effect */}
        </StickyScrollContainer>
      </main>
    </>
  );
}
