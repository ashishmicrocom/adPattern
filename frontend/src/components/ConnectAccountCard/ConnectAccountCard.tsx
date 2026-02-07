"use client";

import React, { useState } from "react";
import "./ConnectAccountCard.css";

type Props = { onConnect: () => void };

export default function ConnectAccountCard({ onConnect }: Props) {
  const [showFlow, setShowFlow] = useState(false);

  return (
    <div className="cac-new">
      <div className="cac-new__content">
        <h3 className="cac-new__title">Connect your Meta Ad Account to run campaigns</h3>
        <p className="cac-new__text">We only request permissions needed to create and manage ads. You will review and approve each step.</p>

        {!showFlow && (
          <div className="cac-new__cta">
            <button className="cac-connect" onClick={() => setShowFlow(true)}>Connect Meta Account</button>
          </div>
        )}

        {showFlow && (
          <div className="cac-flow">
            <ol className="cac-flow__steps">
              <li>1. Login with Facebook</li>
              <li>2. Select Business</li>
              <li>3. Select Ad Account</li>
              <li>4. Grant permissions</li>
            </ol>
            <div className="cac-flow__actions">
              <button className="cac-simulate" onClick={() => { onConnect(); setShowFlow(false); }}>Simulate Connect (UI-only)</button>
              <button className="cac-cancel" onClick={() => setShowFlow(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
