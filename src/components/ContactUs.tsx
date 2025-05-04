// components/ContactUs.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link
import { motion } from "framer-motion";

// --- REUSE the InstagramIcon component ---
// (Make sure this component is defined here or imported if you moved it to a separate file)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
// --- End InstagramIcon ---

const ContactUs = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      // Add pointer-events-none to the section wrapper
      className="relative w-full h-screen pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Image (z-0) - Make non-interactive */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={isMobile ? "/mobilecontactus.jpg" : "/contactus.jpg"}
          alt="Contact Echo Studios"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Optional: Add gradient overlay for contrast in the corner */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* REMOVED the centered title container */}

      {/* Bottom Left Instagram Link Container (z-40) - Explicitly ENABLE pointer events */}
      <motion.div
        // Position absolutely bottom-left (adjust padding as needed)
        // Use a high z-index and enable pointer events
        className="absolute bottom-40 left-20 z-40 pointer-events-auto"
        initial={{ x: -50, opacity: 0 }} // Animate from left
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }} // Adjust delay if needed
      >
        <Link
          href="https://www.instagram.com/officialechostudios/"
          target="_blank"
          rel="noopener noreferrer"
          // Style the link: icon and text side-by-side
          className="group inline-flex items-center gap-2 text-white hover:text-teal-300 transition-colors duration-300 pointer-events-auto"
          aria-label="Official Echo Studios Instagram"
        >
          <InstagramIcon className="w-28 h-14 md:w-20 md:h-12 group-hover:scale-110 transition-transform duration-300" />

          <span className="text-xl md:text-2xl font-semibold tracking-wide">
            officialechostudios
          </span>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default ContactUs;
