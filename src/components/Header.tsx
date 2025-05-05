// Header.tsx
"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [currentHeaderHeight, setCurrentHeaderHeight] = useState(100);

  const { scrollY } = useScroll();

  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]
  );

  const headerHeightMotionValue = useTransform(
    scrollY,
    [0, 100],
    [100, 80] // Pixels
  );

  useMotionValueEvent(headerHeightMotionValue, "change", (latest) => {
    setCurrentHeaderHeight(Math.round(latest));
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionIndex: number) => {
    const targetElement = document.getElementById(`section-${sectionIndex}`);
    const scrollOffsetPixels = 100; // Your offset

    if (targetElement) {
      const headerHeight = currentHeaderHeight;
      const targetScrollY =
        sectionIndex === 0
          ? 0
          : targetElement.offsetTop - headerHeight + scrollOffsetPixels;

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    } else {
      console.warn(
        `scrollToSection: Element with id 'section-${sectionIndex}' not found.`
      );
    }

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-6 md:py-4"
      style={{
        background: headerBackground,
        height: headerHeightMotionValue,
      }}
    >
      {/* Container */}
      <div className="container mx-auto flex justify-between items-center h-full">
        {/* Logo */}
        <div className="flex-shrink-0 ml-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(0);
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
                priority
              />
            </div>
          </a>
        </div>

        {/* --- CORRECTED HAMBURGER BUTTON BLOCK --- */}
        <div className="md:hidden">
          {" "}
          {/* Container correctly hides on md and up */}
          <button
            type="button" // Explicit button type
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-teal-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu" // Links button to the menu panel
          >
            <span className="sr-only">Open main menu</span>{" "}
            {/* For screen readers */}
            {/* Hamburger Icon (shown when menu is closed) */}
            {!mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="block h-6 w-6" // Explicit size
                aria-hidden="true" // Hide decorative icon from screen readers
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            ) : (
              /* Close Icon (X) (shown when menu is open) */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="block h-6 w-6" // Explicit size
                aria-hidden="true" // Hide decorative icon from screen readers
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
        {/* --- END CORRECTED BLOCK --- */}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavButton onClick={() => scrollToSection(1)}>Our Story</NavButton>
          <NavButton onClick={() => scrollToSection(2)}>Founders</NavButton>
          <NavButton onClick={() => scrollToSection(3)}>Contact Us</NavButton>
        </nav>
      </div>

      {/* Mobile Navigation Menu Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-black border-t border-gray-800 absolute top-full left-0 right-0 shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
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

// --- Button Components (remain unchanged) ---

const NavButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="px-3 py-2 text-sm md:text-base font-medium text-gray-100 hover:text-teal-400 transition-colors cursor-pointer"
    >
      {children}
    </a>
  );
};

const MobileNavButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <a
      href="#"
      className="block px-3 py-3 text-base font-medium text-gray-100 hover:text-teal-400 transition-colors border-b border-gray-800 last:border-b-0 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

export default Header;
