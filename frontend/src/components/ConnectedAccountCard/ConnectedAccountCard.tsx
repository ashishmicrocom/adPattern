"use client";

import React from "react";
import "./ConnectedAccountCard.css";

type Props = {
  account: { id: string; name: string; connectedAt: string; platform: string };
  onView: () => void;
  onDisconnect: () => void;
};

export default function ConnectedAccountCard({ account, onView, onDisconnect }: Props) {
  return (
    <div className="cac-card">
      <div className="cac-left">
        <div className="cac-logo" aria-hidden>
          {/* small Meta 'M' mark */}
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#1877F2" />
            <path d="M7 7.5L12 12V7l5 4.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="cac-meta">
          <div className="cac-name">{account.name}</div>
          <div className="cac-id">ID: {account.id}</div>
        </div>
      </div>

      <div className="cac-right">
        <div className="cac-badge cac-badge--success">Connected</div>
        <div className="cac-date">{account.connectedAt}</div>
        <div className="cac-actions">
          <button className="cac-btn" onClick={onView}>View permissions</button>
          <button className="cac-btn cac-btn--danger" onClick={onDisconnect}>Disconnect</button>
        </div>
      </div>
    </div>
  );
}
