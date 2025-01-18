"use client";

import { useState } from "react";
import NavbarModule from "./navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`${NavbarModule.backgroundColor}`}>
      {/* Desktop Navbar */}
      <div className="hidden md:flex gap-14 px-20">
        <Link
          href="/"
          className={`transition-colors duration-300 ${NavbarModule.h2ColorText} hover:text-customCream`}
        >
          Home
        </Link>
        <Link
          href="/expertise"
          className={`transition-colors duration-300 ${NavbarModule.h2ColorText} hover:text-customCream`}
        >
          Expertise
        </Link>
        <Link
          href="/contact"
          className={`transition-colors duration-300 ${NavbarModule.h2ColorText} hover:text-customCream`}
        >
          Contact
        </Link>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="md:hidden flex justify-between items-center">
        <button
          className="text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Sliding Side Menu */}
      <div
        className={`${NavbarModule.responsiveNav} ${
          isMenuOpen ? NavbarModule.showMenu : NavbarModule.hideMenu
        } md:hidden`}
      >
        <Link
          href="/"
          className={`transition-colors duration-300 ${NavbarModule.h2ColorText} hover:text-customCream`}
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/expertise"
          className={`transition-colors duration-300 ${NavbarModule.h2ColorText} hover:text-customCream`}
          onClick={() => setIsMenuOpen(false)}
        >
          Expertise
        </Link>
        <Link
          href="/contact"
          className={`transition-colors duration-300 ${NavbarModule.h2ColorText} hover:text-customCream`}
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
