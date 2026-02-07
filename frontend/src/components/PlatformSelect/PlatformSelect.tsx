"use client";

import React from "react";
import "./PlatformSelect.css";

type Props = { selected?: string; onSelect: (platform: string) => void };

// Platform options from model: Meta, Google
export default function PlatformSelect({ selected = "Meta", onSelect }: Props) {
  return (
    <div className="ps-root">
      <div className="ps-grid">
        <button className={`ps-card ${selected === 'Meta' ? 'ps-card--active' : ''}`} onClick={() => onSelect('Meta')}>
          <div className="ps-card__logo">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="12" fill="#1877F2" />
              <path d="M32 16C23.163 16 16 23.163 16 32C16 39.837 22.087 46.293 29.75 47.75V35.5H25.5V32H29.75V29C29.75 24.75 32.25 22.5 36 22.5C37.75 22.5 39.5 22.75 39.5 22.75V27H37.5C35.5 27 35 28 35 29.5V32H39.25L38.5 35.5H35V48C42.663 46.793 48 40.087 48 32C48 23.163 40.837 16 32 16Z" fill="white"/>
            </svg>
          </div>
          <div className="ps-card__body">
            <div className="ps-title">Meta Ads</div>
            <div className="ps-sub">Facebook & Instagram</div>
          </div>
        </button>

        <div className="ps-card ps-card--disabled" aria-disabled>
          <div className="ps-card__logo">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="12" fill="#5F6368" />
              <text x="32" y="40" textAnchor="middle" fill="white" fontSize="28" fontWeight="700">G</text>
            </svg>
          </div>
          <div className="ps-card__body">
            <div className="ps-title">Google Ads</div>
            <div className="ps-sub">Search & Display</div>
          </div>
          <span className="ps-badge">Coming Soon</span>
        </div>
      </div>
    </div>
  );
}
