"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-6 md:py-4 bg-black">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left - increased size and positioned to the left on mobile */}
        <div className="flex-shrink-0 ml-2">
          <Link href="/">
            <div className="relative h-10 w-32 md:h-16 md:w-56">
              <Image
                src="/echostudioslogo.jpg"
                alt="Echo Studios Logo"
                fill
                className="object-contain object-left"
                sizes="(max-width: 768px) 128px, 224px"
              />
            </div>
          </Link>
        </div>

        {/* Hamburger menu button for mobile */}
        <button
          className="md:hidden flex items-center p-2 text-gray-100 hover:text-teal-400"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
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
          <NavButton href="/our-story">Our Story</NavButton>
          <NavButton href="/founders">Founders</NavButton>
          <NavButton href="/contact-us">Contact Us</NavButton>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 mt-2">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavButton href="/our-story" onClick={toggleMobileMenu}>
              Our Story
            </MobileNavButton>
            <MobileNavButton href="/founders" onClick={toggleMobileMenu}>
              Founders
            </MobileNavButton>
            <MobileNavButton href="/contact-us" onClick={toggleMobileMenu}>
              Contact Us
            </MobileNavButton>
          </div>
        </div>
      )}
    </header>
  );
};

// Navigation button component for desktop
const NavButton = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm md:text-base font-medium text-gray-100 hover:text-teal-400 transition-colors"
    >
      {children}
    </Link>
  );
};

// Navigation button component for mobile
const MobileNavButton = ({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onClick: () => void;
}) => {
  return (
    <Link
      href={href}
      className="block px-3 py-3 text-base font-medium text-gray-100 hover:text-teal-400 transition-colors border-b border-gray-800"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;
