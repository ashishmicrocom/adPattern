"use client";

import React from "react";
import Link from "next/link";
import "./Hero.css";
import AnimatedGridPattern from "../ui/animated-grid-pattern";
import { Magnetic } from "../ui/magnetic";

const Hero: React.FC = () => {
  return (
    <section className="ap-hero">
      {/* Background animated grid - Fixed position */}
      <div className="ap-hero__grid-wrapper">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.06}
          duration={3}
          className=""
        />
      </div>

      <div className="ap-hero__inner">
        <h1 className="ap-hero__title">Turn <span className="ap-hero__accent">Patterns</span> into Profitable Ads</h1>
        <p className="ap-hero__subtitle">Leverage pattern-driven creatives and data to scale high-performing ad campaigns—fast.</p>

        <Magnetic>
          <Link href="/product-service">
            <div className="ap-hero__card" role="link" tabIndex={0} aria-label="Open Product & Service form">
              <div>
                <div className="label">READY TO GO?</div>
                <div className="title">Get Started</div>
              </div>
              <div className="ap-hero__circle" role="img" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M7 7h10v10" stroke="currentColor" strokeWidth={"1.8"} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        </Magnetic>
       

        {/* <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
          <button className="ap-btn ap-btn--primary">Get Started</button>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
