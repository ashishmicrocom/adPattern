"use client";

import React, { useState, useEffect } from "react";
import "./Navbar.css";
import AnimatedGridPattern from "../ui/animated-grid-pattern";
import { AnimatedThemeToggle } from "../ui/animated-theme-toggle";
import Drawer from "../Drawer/Drawer";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      console.log('Scroll position:', window.scrollY, 'isScrolled:', scrolled);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className="ap-nav"
      style={{
        background: isScrolled ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.4)' : 'none',
      }}
    >
      {/* background pattern behind the navbar */}
      {/* <AnimatedGridPattern numSquares={12} maxOpacity={0.04} duration={6} className="" /> */}

      <div className="ap-nav__inner">
        <div className="ap-nav__brand">Ad<span className="ap-hero__accent">Patterns</span></div>

        <div className="ap-nav__spacer" />

        {/* <AnimatedThemeToggle /> */}

        <div className="ap-nav__actions">
          <button
            className="ap-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((s) => !s)}
          >
            {/* Keep hamburger icon constant; do not swap to cross */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

  <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
};

export default Navbar;
