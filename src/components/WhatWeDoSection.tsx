"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const WhatWeDoSection = () => {
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

  return (
    <section className="relative w-full h-screen">
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

      {/* Optional Content Overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, margin: "-20%" }}
      >
        <div className="px-6 md:px-20 text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-20%" }}
          ></motion.h2>
          {/* You can add additional content here if needed */}
        </div>
      </motion.div>
    </section>
  );
};

export default WhatWeDoSection;
