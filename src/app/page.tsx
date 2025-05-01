import HeroImageSlider from "@/components/HeroSection";

export default function Home() {
  // Example image paths
  const heroImages = ["/image1.png", "/image2.png"];

  return (
    <main className="relative">
      {/* Full viewport hero slider */}
      <HeroImageSlider images={heroImages} height="100vh" />

      {/* Rest of your content - will be positioned below the full viewport hero */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          {/* Your other content here */}
        </div>
      </section>
    </main>
  );
}
