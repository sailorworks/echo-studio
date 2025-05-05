// components/StickyScrollContainer.tsx
"use client";
import React, { ReactNode, useRef, useState, useEffect, Children } from "react";
import { motion } from "framer-motion";

interface StickyScrollContainerProps {
  children: ReactNode;
  // Optional: Add a prop to pass the header height if needed for initial calculations,
  // but we'll primarily calculate it dynamically in the Header component.
}

const StickyScrollContainer: React.FC<StickyScrollContainerProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const childArray = Children.toArray(children);
  const numSections = childArray.length;

  // Effect to update activeIndex based on scroll (remains the same)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Consider adding a small offset if sections don't perfectly align at the top
      // e.g., let currentActiveIndex = Math.floor((scrollY + windowHeight * 0.1) / windowHeight);
      let currentActiveIndex = Math.floor(scrollY / windowHeight);

      currentActiveIndex = Math.max(
        0,
        Math.min(numSections - 1, currentActiveIndex)
      );
      if (currentActiveIndex !== activeIndex) {
        setActiveIndex(currentActiveIndex);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [numSections, activeIndex]); // Dependency array is correct

  const sectionVariants = {
    hidden: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${numSections * 100}vh` }} // Height calculation remains the same
    >
      {childArray.map((child, index) => {
        const isVisible = index <= activeIndex; // Visibility logic remains the same

        return (
          <motion.div
            key={index}
            // *** ADD UNIQUE ID TO EACH SECTION ***
            id={`section-${index}`} // e.g., section-0, section-1, etc.
            className={`w-full h-screen sticky top-0 left-0 overflow-hidden ${
              isVisible ? "pointer-events-auto" : "pointer-events-none"
            }`}
            style={{
              zIndex: index + 1, // Z-index logic remains the same
            }}
            variants={sectionVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {/* Render the actual child component */}
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

export default StickyScrollContainer;
