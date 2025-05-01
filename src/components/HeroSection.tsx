// components/HeroSection.tsx (or wherever HeroImageSlider is)
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HeroImageSliderProps {
  images: string[];
  interval?: number;
  height?: string; // e.g., "100vh", "80vh", "500px"
}

const HeroImageSlider: React.FC<HeroImageSliderProps> = ({
  images,
  interval = 5000,
  height = "100vh", // Default remains full viewport height
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return; // Don't start timer if only one image

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      // Use the height prop directly
      style={{ height }}
    >
      <AnimatePresence initial={false} mode="wait">
        {" "}
        {/* mode="wait" can sometimes help transitions */}
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }} // Simpler fade might be smoother on some devices
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // If you prefer the slide:
          // initial={{ opacity: 0, x: 100 }}
          // animate={{ opacity: 1, x: 0 }}
          // exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }} // Slightly faster transition
          className="absolute inset-0"
        >
          <Image
            src={images[currentImageIndex]}
            alt={`Hero image ${currentImageIndex + 1}`}
            fill
            priority={currentImageIndex === 0} // Only prioritize the very first image load
            // sizes tells the browser the image width relative to viewport
            // 100vw is usually correct for full-bleed images
            sizes="100vw"
            className="object-cover object-center" // Ensures image covers the area
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicator dots - Improved for mobile */}
      {images.length > 1 && ( // Only show dots if there's more than one image
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-3 z-10">
          {" "}
          {/* Increased bottom margin and gap */}
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                // Increased size
                index === currentImageIndex
                  ? "bg-white scale-110" // Slightly larger active dot
                  : "bg-white/50 hover:bg-white/75" // Add hover effect for desktop
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentImageIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroImageSlider;
