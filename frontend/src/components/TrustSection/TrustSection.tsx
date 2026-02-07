"use client";

import React from "react";
import { ShieldCheck, Ban, Settings, Tag } from "lucide-react";
import "./TrustSection.css";

const TrustSection: React.FC = () => {
  const features = [
    {
      icon: <Ban className="trust-feature-icon" />,
      title: "No auto-publishing",
      description: "Every campaign requires your explicit approval before going live. You're always in control.",
    },
    {
      icon: <Settings className="trust-feature-icon" />,
      title: "Full creative control",
      description: "Edit, refine, and customize every aspect of your campaign to match your vision perfectly.",
    },
    {
      icon: <Tag className="trust-feature-icon" />,
      title: "Transparent AI labels",
      description: "All AI-generated content is clearly marked, so you always know what's suggested vs. created by you.",
    },
    {
      icon: <ShieldCheck className="trust-feature-icon" />,
      title: "Your data stays yours",
      description: "We never share your data. Your business information and campaigns remain completely private.",
    },
  ];

  return (
    <section className="trust-section">
      <div className="trust-container">
        {/* Header */}
        <div className="trust-header">
          <div className="trust-icon-wrapper">
            <ShieldCheck className="trust-main-icon" />
          </div>
          <h2 className="trust-title">Built on Trust</h2>
          <p className="trust-subtitle">
            We believe in transparency and control. That's why every AI suggestion is clearly labeled,
            every action requires your approval, and your data stays yours.
          </p>
        </div>

        {/* Features Grid */}
        <div className="trust-features-grid">
          {features.map((feature, index) => (
            <div key={index} className="trust-feature-item">
              <div className="trust-feature-icon-wrapper">
                {feature.icon}
              </div>
              <div className="trust-feature-content">
                <h3 className="trust-feature-title">{feature.title}</h3>
                <p className="trust-feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Card */}
        <div className="trust-cta-card">
          <h3 className="trust-cta-title">Ready to Create Your First Campaign?</h3>
          <p className="trust-cta-description">
            Join thousands of business owners who trust AdPatterns to create effective advertising campaigns.
          </p>
          <button className="trust-cta-button">
            Start Ad Setup
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
