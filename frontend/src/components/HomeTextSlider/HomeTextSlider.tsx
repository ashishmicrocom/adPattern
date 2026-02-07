"use client";
import React from "react";
import "./HomeTextSlider.css";

const linesA = [
  "Open The Door To A Magical Makeover For Your Business!",
  "Grow Faster With Smarter Ad Automation",
  "Scale Performance Creative & Campaigns",
];

const linesB = [
  "We're The Wizards You Never Knew You Needed.",
  "Pattern-driven creatives that convert.",
  "Maximize ROI with automated bidding.",
];

export default function HomeTextSlider() {
  return (
    <section className="hts" aria-hidden>
      <div className="hts__container">
        <div className="hts__bar hts__bar--one">
          <div className="hts__track hts__track--left">
            {linesA.concat(linesA).map((t, i) => (
              <span key={i} className="hts__text">{t}</span>
            ))}
          </div>
        </div>

        <div className="hts__bar hts__bar--two">
          <div className="hts__track hts__track--right">
            {linesB.concat(linesB).map((t, i) => (
              <span key={i} className="hts__text">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
