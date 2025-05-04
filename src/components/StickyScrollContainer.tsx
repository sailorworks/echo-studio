// components/StickyScrollContainer.tsx
"use client";
import React, { ReactNode, useRef, useState, useEffect, Children } from "react";
import { motion } from "framer-motion";

interface StickyScrollContainerProps {
  children: ReactNode;
}

const StickyScrollContainer: React.FC<StickyScrollContainerProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const childArray = Children.toArray(children);
  const numSections = childArray.length;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
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
  }, [numSections, activeIndex]);

  const sectionVariants = {
    hidden: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${numSections * 100}vh` }}
    >
      {childArray.map((child, index) => {
        const isVisible = index <= activeIndex;

        return (
          <motion.div
            key={index}
            // ** ADDED POINTER EVENTS LOGIC BASED ON VISIBILITY **
            className={`w-full h-screen sticky top-0 left-0 overflow-hidden ${
              isVisible ? "pointer-events-auto" : "pointer-events-none" // Auto when visible, None when hidden
            }`}
            style={{
              zIndex: index + 1,
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
