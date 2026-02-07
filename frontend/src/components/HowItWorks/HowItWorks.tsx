"use client";

import React from "react";
import { InteractiveHoverLinks } from "../ui/interactive-hover-links";
import "./HowItWorks.css";

export default function HowItWorks() {
  const adPatternsLinks = [
    {
      heading: "Tell Us About Your Product",
      subheading: "Share your product details and target audience",
      imgSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      href: "#step-1",
    },
    {
      heading: "AI Generates Your Campaign",
      subheading: "Our AI creates compelling ad copy and visuals",
      imgSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      href: "#step-2",
    },
    {
      heading: "Review & Customize",
      subheading: "Fine-tune everything to match your brand",
      imgSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      href: "#step-3",
    },
    {
      heading: "Publish With Confidence",
      subheading: "Launch your campaign and track performance",
      imgSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      href: "#step-4",
    },
  ];

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        {/* Section Header */}
        <div className="how-it-works-header">
          <h2 className="how-it-works-title">How It Works</h2>
          <p className="how-it-works-subtitle">
            Four simple steps to your first campaign
          </p>
        </div>

        {/* Interactive Links */}
        <div className="how-it-works-content">
          <InteractiveHoverLinks links={adPatternsLinks} />
        </div>
      </div>
    </section>
  );
}
