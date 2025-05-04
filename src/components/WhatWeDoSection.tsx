"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const WhatWeDoSection = () => {
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

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Responsive image based on screen size */}
      <div className="absolute inset-0">
        <Image
          src={isMobile ? "/mobilewhat.jpg" : "/what.jpg"}
          alt="What We Do"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Content Overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="px-6 md:px-20 text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          ></motion.h2>
          {/* You can add additional content here if needed */}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default WhatWeDoSection;
