"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

type Props = { 
  productName?: string;
  onMenuClick?: () => void;
};

export default function Header({ productName = "My Product", onMenuClick }: Props) {
  return (
    <header className="hd-root">
      <div className="hd-left">
        <button 
          className="hd-menu-btn lg-hidden" 
          aria-label="Toggle menu" 
          onClick={onMenuClick}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="hd-info">
          <h1 className="hd-title">{productName}</h1>
          <p className="hd-subtitle">Manage your ad campaigns</p>
        </div>
      </div>
      
      <div className="hd-right">
        <button className="hd-notif-btn" aria-label="Notifications">
          <span className="hd-bell"><FontAwesomeIcon icon={faBell} /></span>
          <span className="hd-badge"></span>
        </button>
      </div>
    </header>
  );
}
