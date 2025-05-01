"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HeroImageSliderProps {
  images: string[];
  mobileImages?: string[]; // Add mobile images prop
  interval?: number;
  height?: string;
}

const HeroImageSlider: React.FC<HeroImageSliderProps> = ({
  images,
  mobileImages, // Mobile images array
  interval = 5000,
  height = "100vh",
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Typical mobile breakpoint
    };

    // Check initially
    checkIfMobile();

    // Add listener for resize events
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Determine which image array to use based on device
  const imageSet = isMobile && mobileImages ? mobileImages : images;

  useEffect(() => {
    if (imageSet.length <= 1) return; // Don't start timer if only one image

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSet.length);
    }, interval);

    return () => clearInterval(timer);
  }, [imageSet.length, interval]);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={imageSet[currentImageIndex]}
            alt={`Hero image ${currentImageIndex + 1}`}
            fill
            priority={currentImageIndex === 0}
            sizes={isMobile ? "100vw" : "100vw"}
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicator dots */}
      {imageSet.length > 1 && (
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-3 z-10">
          {imageSet.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/75"
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
