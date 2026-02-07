"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faWandMagicSparkles, faRocket } from "@fortawesome/free-solid-svg-icons";
import "./Features.css";

// Dynamically import TextBlockAnimation to avoid SSR issues
const TextBlockAnimation = dynamic(
  () => import("../ui/text-block-animation"),
  { ssr: false }
);

export default function Features() {
  return (
    <section className="features-section">
      <div className="features-container">
        {/* Main Heading */}
        <div className="features-hero">
          <TextBlockAnimation
            blockColor="#eb723a"
            animateOnScroll={true}
            delay={0.2}
            duration={0.8}
          >
            <h2 className="features-title">Advertising Made Simple</h2>
          </TextBlockAnimation>
          <TextBlockAnimation
            blockColor="#ff8a4b"
            animateOnScroll={true}
            delay={0.4}
            duration={0.7}
            stagger={0.05}
          >
            <p className="features-subtitle">
              AdPatterns takes the complexity out of digital advertising. Our AI 
              understands your business and creates campaigns that convert, while 
              you stay in complete control.
            </p>
          </TextBlockAnimation>
        </div>

        {/* Feature Cards */}
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <TextBlockAnimation
              blockColor="#eb723a"
              animateOnScroll={true}
              duration={0.6}
            >
              <div className="feature-icon">
                <FontAwesomeIcon icon={faBullseye} />
              </div>
            </TextBlockAnimation>
            <TextBlockAnimation
              blockColor="#eb723a"
              animateOnScroll={true}
              duration={0.6}
              stagger={0.03}
            >
              <h3 className="feature-title">You're In Control</h3>
            </TextBlockAnimation>
            <TextBlockAnimation
              blockColor="#ff8a4b"
              animateOnScroll={true}
              duration={0.5}
              stagger={0.02}
            >
              <p className="feature-description">
                AI suggests, you decide. No auto-publishing, no hidden automation. 
                Every ad goes through you first.
              </p>
            </TextBlockAnimation>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <TextBlockAnimation
              blockColor="#eb723a"
              animateOnScroll={true}
              duration={0.6}
            >
              <div className="feature-icon">
                <FontAwesomeIcon icon={faWandMagicSparkles} />
              </div>
            </TextBlockAnimation>
            <TextBlockAnimation
              blockColor="#eb723a"
              animateOnScroll={true}
              duration={0.6}
              stagger={0.03}
            >
              <h3 className="feature-title">AI-Powered Creation</h3>
            </TextBlockAnimation>
            <TextBlockAnimation
              blockColor="#ff8a4b"
              animateOnScroll={true}
              duration={0.5}
              stagger={0.02}
            >
              <p className="feature-description">
                Our AI generates headlines, descriptions, and targeting based on 
                your product details.
              </p>
            </TextBlockAnimation>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <TextBlockAnimation
              blockColor="#eb723a"
              animateOnScroll={true}
              duration={0.6}
            >
              <div className="feature-icon">
                <FontAwesomeIcon icon={faRocket} />
              </div>
            </TextBlockAnimation>
            <TextBlockAnimation
              blockColor="#eb723a"
              animateOnScroll={true}
              duration={0.6}
              stagger={0.03}
            >
              <h3 className="feature-title">Smart Targeting</h3>
            </TextBlockAnimation>
            <TextBlockAnimation
              blockColor="#ff8a4b"
              animateOnScroll={true}
              duration={0.5}
              stagger={0.02}
            >
              <p className="feature-description">
                Reach the right audience with AI-optimized demographics, interests, 
                and keywords.
              </p>
            </TextBlockAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
