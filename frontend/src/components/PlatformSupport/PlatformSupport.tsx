"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import "./PlatformSupport.css";

interface Card {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
}

const Highlight = ({ children }: { children: React.ReactNode }) => {
  return <span className="ps-highlight">{children}</span>;
};

const TESTIMONIALS: Card[] = [
  {
    id: 0,
    name: "Ashish Kumar",
    designation: "E-commerce Owner",
    content: (
      <p>
        <Highlight>AdPatterns</Highlight> has completely transformed our advertising workflow. The AI-generated campaigns are{" "}
        <Highlight>incredibly effective</Highlight> and easy to launch.
      </p>
    ),
  },
  {
    id: 1,
    name: "Abdul Samad",
    designation: "Marketing Manager",
    content: (
      <p>
        The <Highlight>targeting optimization</Highlight> is brilliant. From audience selection to creative generation, every detail is{" "}
        <Highlight>data-driven and results-focused</Highlight>.
      </p>
    ),
  },
  {
    id: 2,
    name: "Pradhyuman Pareek",
    designation: "Startup Founder",
    content: (
      <p>
        After using <Highlight>AdPatterns</Highlight>, we achieved 3x ROAS in just 2 weeks. The{" "}
        <Highlight>AI-powered suggestions</Highlight> made campaign creation effortless.
      </p>
    ),
  },
];

const platforms = [
  {
    name: "Meta Ads",
    status: "Available Now",
    icon: <FontAwesomeIcon icon={faFacebook} />,
    available: true,
  },
  {
    name: "Google Ads",
    status: "Coming Soon",
    icon: "G",
    available: false,
  },
];

const CardStack = ({ items }: { items: Card[] }) => {
  const CARD_OFFSET = 10;
  const SCALE_FACTOR = 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ps-card-stack">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="ps-stack-card"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            <div className="ps-stack-card-content">{card.content}</div>
            <div className="ps-stack-card-footer">
              <p className="ps-stack-card-name">{card.name}</p>
              <p className="ps-stack-card-designation">{card.designation}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default function PlatformSupport() {
  return (
    <section className="ps-section">
      <div className="ps-container">
        <div className="ps-grid">
          {/* Left Block */}
          <div className="ps-block ps-block-left">
            {/* Card Stack */}
            <div className="ps-card-wrapper">
              <div className="ps-card-fade"></div>
              <CardStack items={TESTIMONIALS} />
            </div>

            {/* Content */}
            <h3 className="ps-block-title">
              AI-Powered Campaign Creation{" "}
              <span className="ps-accent">AdPatterns</span>{" "}
              <span className="ps-block-subtitle">
                Simplify your advertising workflow with our AI that generates
                optimized campaigns and provides actionable insights.
              </span>
            </h3>
          </div>

          {/* Right Block */}
          <div className="ps-block ps-block-right">
            {/* Content */}
            <h3 className="ps-block-title">
              Platform Support{" "}
              <span className="ps-accent">AdPatterns</span>{" "}
              <span className="ps-block-subtitle">
                Create campaigns for major advertising platforms with seamless
                integration and AI-powered optimization.
              </span>
            </h3>

            {/* Platform Cards */}
            <div className="ps-platform-wrapper">
              <div className="ps-platform-glow"></div>
              <div className="ps-platform-list">
                {platforms.map((platform, i) => (
                  <div
                    key={i}
                    className={`ps-platform-item ${
                      !platform.available ? "ps-platform-item--disabled" : ""
                    }`}
                  >
                    <div className="ps-platform-left">
                      <div
                        className={`ps-platform-icon ${
                          !platform.available ? "ps-platform-icon--disabled" : ""
                        }`}
                      >
                        {platform.icon}
                      </div>
                      <div className="ps-platform-info">
                        <p className="ps-platform-name">{platform.name}</p>
                        <p className="ps-platform-status">{platform.status}</p>
                      </div>
                    </div>
                    <button className="ps-platform-btn">
                      {platform.available ? "Configure" : "Notify Me"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Testimonial Section */}
        <div className="ps-bottom-section">
          <div className="ps-stats-wrapper">
            <div className="ps-stats-grid">
              <div className="ps-stat-item">
                <div className="ps-stat-number">1000+</div>
                <p className="ps-stat-label">Campaigns Created</p>
              </div>
              <div className="ps-stat-item">
                <div className="ps-stat-number">3.2x</div>
                <p className="ps-stat-label">Average ROAS</p>
              </div>
              <div className="ps-stat-item">
                <div className="ps-stat-number">95%</div>
                <p className="ps-stat-label">Customer Satisfaction</p>
              </div>
            </div>
          </div>

          <div className="ps-testimonial-wrapper">
            <blockquote className="ps-testimonial">
              <p className="ps-testimonial-text">
                Using AdPatterns has been like unlocking a new level of advertising performance. 
                It's the perfect fusion of AI automation and human control, enabling us to scale campaigns effortlessly.
              </p>
              <div className="ps-testimonial-footer">
                <cite className="ps-testimonial-author">Shudanshu Gupta, Founder</cite>
                <div className="ps-testimonial-logo">AdPatterns</div>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
