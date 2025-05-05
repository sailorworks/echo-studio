// components/Founders.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Instagram Icon component (remains the same)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className} // Apply passed className
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const Founders = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null); // Ref is kept if needed elsewhere, but not for positioning here

  const founders = [
    { name: "Adam", instaUrl: "https://www.instagram.com/adamhannibal1033/" },
    { name: "Em", instaUrl: "https://www.instagram.com/flux_kosplay/" },
  ];

  // This effect is still needed for swapping the background image
  useEffect(() => {
    const checkIfMobile = () => {
      // Use the same breakpoint as Tailwind's `md` (usually 768px)
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      // pointer-events-none on section is okay if children explicitly enable them
      className="relative w-full h-screen pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={isMobile ? "/mobilefounder.jpg" : "/founder.jpg"}
          alt="Echo Studios Founders"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Centered Title Container (Optional) */}
      {/* <motion.div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 px-6 text-center pointer-events-none" ... > */}
      {/* </motion.div> */}

      {/* --- MODIFIED LINKS CONTAINER POSITIONING --- */}
      <motion.div
        // Default (mobile): position bottom-6 left-6
        // Medium screens and up (md:): override to bottom-40 left-20
        className="absolute bottom-70 left-10 md:bottom-40 md:left-20 z-40 flex flex-row items-center gap-6 md:gap-8 pointer-events-auto"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        {founders.map((founder) => (
          <Link
            key={founder.name}
            href={founder.instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            // pointer-events-auto is inherited, but explicit doesn't hurt
            className="group flex flex-col items-center text-white hover:text-teal-300 transition-colors duration-300 pointer-events-auto"
            aria-label={`${founder.name}'s Instagram profile`}
          >
            <InstagramIcon className="w-8 h-8 md:w-10 md:h-10 mb-1 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm md:text-base font-medium tracking-wide">
              {founder.name}
            </span>
          </Link>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Founders;
