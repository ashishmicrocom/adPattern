"use client";
import React from "react";
import Link from "next/link";
import {
  NotepadTextDashed,
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const FooterUI = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <section className={`footer-section ${className || ''}`}>
      <footer className="footer-main">
        <div className="footer-container">
          <div className="footer-header">
            <div className="footer-content-wrapper">
              <div className="footer-brand-section">
                <div className="footer-brand-name">
                  <span className="footer-brand-text">
                    {brandName}
                  </span>
                </div>
                <p className="footer-description">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="footer-social-links">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="footer-social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="footer-social-icon">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="footer-nav-links">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      className="footer-nav-link"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <nav>
                <Link
                  href={creatorUrl}
                  target="_blank"
                  className="footer-creator-link"
                >
                  Crafted by {creatorName}
                </Link>
              </nav>
            )}
          </div>
        </div>

        {/* Large background text */}
        <div className="footer-bg-text">
          {brandName.toUpperCase()}
        </div>

        {/* Bottom logo */}
        <div className="footer-logo-container">
          <div className="footer-logo-inner">
            {brandIcon || (
              <NotepadTextDashed className="footer-logo-icon" />
            )}
          </div>
        </div>

        {/* Bottom line */}
        <div className="footer-bottom-line"></div>

        {/* Bottom shadow */}
        <div className="footer-bottom-shadow"></div>
      </footer>
    </section>
  );
};

export default FooterUI;
