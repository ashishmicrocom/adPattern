"use client";

import React from "react";
import "./AccountPermissions.css";

type Props = { account: { id: string; name: string; connectedAt: string; platform: string } | null };

const PERMISSIONS = [
  "Manage Ads",
  "View Insights",
  "Access Pages",
  "Access Instagram Account",
];

export default function AccountPermissions({ account }: Props) {
  return (
    <div className="aperm-card">
      <div className="aperm-head">Account Permissions</div>
      {!account && (
        <div className="aperm-empty">Select a connected account to view permission details.</div>
      )}

      {account && (
        <div>
          <div className="aperm-which">Showing permissions for <strong>{account.name}</strong></div>
          <ul className="aperm-list">
            {PERMISSIONS.map((p) => (
              <li key={p} className="aperm-item">{p}</li>
            ))}
          </ul>

          <div className="aperm-note">We only use these permissions to create and manage ads on your behalf. No data is shared without your consent.</div>

          <div className="aperm-actions">
            <button className="aperm-btn">Review connected pages</button>
            <button className="aperm-btn ap-btn--danger">Disconnect account</button>
          </div>
        </div>
      )}
    </div>
  );
}
