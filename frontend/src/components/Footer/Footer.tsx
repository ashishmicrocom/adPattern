"use client";

import React from "react";
import { FooterUI } from "@/components/ui/footer";
import {
  Twitter,
  Linkedin,
  Github,
  Mail,
  Zap,
} from "lucide-react";
import "./Footer.css";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      icon: <Twitter style={{ width: '24px', height: '24px' }} />,
      href: "https://twitter.com/adpatterns",
      label: "Twitter",
    },
    {
      icon: <Linkedin style={{ width: '24px', height: '24px' }} />,
      href: "https://linkedin.com/company/adpatterns",
      label: "LinkedIn",
    },
    {
      icon: <Github style={{ width: '24px', height: '24px' }} />,
      href: "https://github.com/adpatterns",
      label: "GitHub",
    },
    {
      icon: <Mail style={{ width: '24px', height: '24px' }} />,
      href: "mailto:contact@adpatterns.com",
      label: "Email",
    },
  ];

  const navLinks = [
    { label: "Pricing", href: "/pricing" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Platform Support", href: "#platform-support" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <FooterUI
      brandName="AdPatterns"
      brandDescription="AI-powered advertising platform for business owners. Create effective ad campaigns in minutes with full creative control."
      socialLinks={socialLinks}
      navLinks={navLinks}
      creatorName="AdPatterns Team"
      creatorUrl="https://adpatterns.com"
      brandIcon={
        <Zap style={{ width: '56px', height: '56px' }} />
      }
    />
  );
};

export default Footer;
