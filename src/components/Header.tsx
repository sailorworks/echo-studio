// Header.tsx
"use client";
import Image from "next/image";
// Remove Link import if only scrolling
// import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]
  );

  const headerHeight = useTransform(scrollY, [0, 100], ["100px", "80px"]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Function to scroll to a specific section index
  const scrollToSection = (sectionIndex: number) => {
    const targetScrollY = sectionIndex * window.innerHeight;
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth", // Uses the browser's smooth scroll
    });

    // Close mobile menu if open after clicking a link
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-6 md:py-4"
      style={{
        background: headerBackground,
        height: headerHeight,
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo - Scrolls to Top (Section 0) */}
        <div className="flex-shrink-0 ml-2">
          {/* Use an anchor or button for the click handler */}
          <a
            href="#" // Use # or role="button" for semantics
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              scrollToSection(0); // Scroll to Hero section (index 0)
            }}
            className="cursor-pointer"
            aria-label="Scroll to top"
          >
            <div className="relative h-10 w-32 md:h-16 md:w-56">
              <Image
                src="/echostudioslogo.jpg"
                alt="Echo Studios Logo"
                fill
                className="object-contain object-left"
                sizes="(max-width: 768px) 128px, 224px"
                priority // Logo is always visible initially
              />
            </div>
          </a>
        </div>

        {/* Hamburger menu button for mobile */}
        <button
          className="md:hidden flex items-center p-2 text-gray-100 hover:text-teal-400"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen} // Accessibility
        >
          {/* SVG remains the same */}
          <svg /* ... */>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            ></path>
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Assuming "Our Story" maps to WhatWeDoSection (index 1) */}
          <NavButton onClick={() => scrollToSection(1)}>Our Story</NavButton>
          <NavButton onClick={() => scrollToSection(2)}>Founders</NavButton>
          <NavButton onClick={() => scrollToSection(3)}>Contact Us</NavButton>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 mt-2">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Use the same onClick logic, passing the section index */}
            <MobileNavButton onClick={() => scrollToSection(1)}>
              Our Story
            </MobileNavButton>
            <MobileNavButton onClick={() => scrollToSection(2)}>
              Founders
            </MobileNavButton>
            <MobileNavButton onClick={() => scrollToSection(3)}>
              Contact Us
            </MobileNavButton>
          </div>
        </div>
      )}
    </motion.header>
  );
};

// --- MODIFIED BUTTON COMPONENTS ---

// Navigation button component for desktop (using <a> for semantics)
const NavButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void; // Changed href to onClick
}) => {
  return (
    <a
      href="#" // Keep href for semantics/accessibility, prevent default in handler
      onClick={(e) => {
        e.preventDefault(); // Prevent jumping to top due to '#'
        onClick(); // Call the passed scroll function
      }}
      className="px-3 py-2 text-sm md:text-base font-medium text-gray-100 hover:text-teal-400 transition-colors cursor-pointer"
    >
      {children}
    </a>
  );
};

// Navigation button component for mobile (using <a> for semantics)
const MobileNavButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void; // Changed href, kept onClick for menu toggle
}) => {
  return (
    <a
      href="#" // Keep href for semantics/accessibility
      className="block px-3 py-3 text-base font-medium text-gray-100 hover:text-teal-400 transition-colors border-b border-gray-800 cursor-pointer"
      onClick={(e) => {
        e.preventDefault(); // Prevent jumping to top due to '#'
        onClick(); // Call the passed scroll function (which also closes menu)
      }}
    >
      {children}
    </a>
  );
};

export default Header;
