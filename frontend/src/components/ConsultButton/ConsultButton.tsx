"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ConsultButton.css";

type Position = {
  bottom?: string;
  right?: string;
  left?: string;
  top?: string;
};

interface Props {
  buttonSize?: number;
  imageSize?: number;
  imageSrc?: string;
  imageAlt?: string;
  revolvingText?: string;
  revolvingSpeed?: number;
  popupHeading?: string;
  popupDescription?: string;
  popupBadgeText?: string;
  ctaButtonText?: string;
  ctaButtonAction?: () => void;
  position?: Position;
}

export default function ConsultButton({
  buttonSize,
  imageSize,
  imageSrc = "/consultant-avatar.jpg",
  imageAlt = "Consultant",
  revolvingText = "FREE CONSULT - BOOK A CALL - ",
  revolvingSpeed = 10,
  popupHeading = "Schedule a Call",
  popupDescription = "Discuss to our specialists.",
  popupBadgeText = "Free",
  ctaButtonText = "Book Now",
  ctaButtonAction = () => (window.location.href = "/booking"),
  position = { bottom: "2rem", right: "2rem" },
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const lgButtonSize = buttonSize || 160;
  const smButtonSize = buttonSize ? Math.round(buttonSize * 0.8) : 128;
  const lgImageSize = imageSize || 96;
  const smImageSize = imageSize ? Math.round(imageSize * 0.833) : 80;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ap-consult__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ap-consult__popup"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
          >
            <button
              className="ap-consult__popup-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="ap-consult__popup-inner">
              <div className="ap-consult__popup-header">
                <h3 className="ap-consult__popup-title">{popupHeading}</h3>
                <span className="ap-consult__popup-badge">{popupBadgeText}</span>
              </div>

              <p className="ap-consult__popup-desc">{popupDescription}</p>

              <button className="ap-consult__cta" onClick={ctaButtonAction}>
                {ctaButtonText}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="ap-consult__wrapper" style={position as React.CSSProperties}>
        <motion.div
          className="ap-consult__button"
          style={{ width: smButtonSize, height: smButtonSize }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.24 }}
          onClick={() => setIsOpen((s) => !s)}
        >
          <motion.div
            className="ap-consult__rotator"
            animate={{ rotate: 360 }}
            transition={{ duration: revolvingSpeed, ease: "linear", repeat: Infinity }}
          >
            <svg viewBox="0 0 200 200" className="ap-consult__svg">
              <defs>
                <path
                  id="apConsultPath"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
              </defs>
              <text className="ap-consult__rotor-text">
                <textPath href="#apConsultPath" startOffset="0%">
                  {revolvingText}
                </textPath>
              </text>
            </svg>
          </motion.div>

          <div className="ap-consult__avatar" style={{ width: smImageSize, height: smImageSize }}>
            <img
              src={imageSrc}
              alt={imageAlt}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </motion.div>

        <style>{`
          @media (min-width: 1024px) {
            .ap-consult__button { width: ${lgButtonSize}px !important; height: ${lgButtonSize}px !important; }
            .ap-consult__avatar { width: ${lgImageSize}px !important; height: ${lgImageSize}px !important; }
          }
        `}</style>
      </div>
    </>
  );
}
