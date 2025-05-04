"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HeroImageSliderProps {
  images: string[];
  mobileImages?: string[];
  interval?: number;
  height?: string;
}

const HeroImageSlider: React.FC<HeroImageSliderProps> = ({
  images,
  mobileImages,
  interval = 5000,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

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

  // Image slideshow
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
    <motion.div
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
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

      {/* Mobile-only tagline - positioned above the slider dots */}
      {isMobile && (
        <div className="absolute bottom-40 left-0 right-0 text-center z-10">
          <p className="text-xs text-amber-50/90 font-light italic px-4 py-1 bg-black/40 inline-block rounded-full">
            Echo Studios — For the fans who never stopped believing.
          </p>
        </div>
      )}

      {/* Scroll down indicator */}
      <div className="absolute bottom-20 md:bottom-10 left-0 right-0 flex justify-center z-10">
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          onClick={() =>
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            })
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-white text-xs mb-2 font-light tracking-widest">
            SCROLL DOWN
          </p>
          <motion.div
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            initial={{ y: 0 }}
          >
            <motion.div
              className="w-1 h-2 bg-white rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.2,
              }}
            />
          </motion.div>
        </motion.div>
      </div>

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
    </motion.div>
  );
};

export default HeroImageSlider;
