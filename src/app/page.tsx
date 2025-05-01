import HeroImageSlider from "@/components/HeroSection";
import Header from "@/components/Header";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import Founders from "@/components/Founders";
import ContactUs from "@/components/ContactUs";

export default function Home() {
  // Desktop image paths
  const heroImages = ["/image1.png", "/image2.png"];
  // Mobile image paths
  const mobileHeroImages = ["/mobileimage1.jpg", "/mobileimage2.jpg"];

  return (
    <>
      {/* Sticky Header */}
      <Header />
      <main className="relative">
        {/* Full viewport hero slider */}
        <HeroImageSlider
          images={heroImages}
          mobileImages={mobileHeroImages}
          height="100vh"
        />

        {/* What We Do Section - Full viewport */}
        <WhatWeDoSection />
        {/* Founders Section - Full viewport */}
        <Founders />
        {/* Contact Us Section - Full viewport */}
        <ContactUs />

        {/* Rest of your content - will be positioned below the What We Do section */}
      </main>
    </>
  );
}
