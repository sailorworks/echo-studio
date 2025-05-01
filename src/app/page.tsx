import HeroImageSlider from "@/components/HeroSection";
import Header from "@/components/Header";

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

        {/* Rest of your content - will be positioned below the full viewport hero */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Our Services</h2>
            {/* Your other content here */}
          </div>
        </section>
      </main>
    </>
  );
}
