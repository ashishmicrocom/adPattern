"use client";

import React from "react";
import "./EditPanel.css";

type Props = {
  onRegenerateHeadline: () => void;
  onRegenerateDescription: () => void;
  onRegenerateFull: () => void;
  onSave: () => void;
};

export default function EditPanel({ onRegenerateHeadline, onRegenerateDescription, onRegenerateFull, onSave }: Props) {
  return (
    <div className="ep-card">
      <div className="ep-head">Edit & Regenerate</div>
      <div className="ep-actions">
        <button className="ep-btn" onClick={onRegenerateHeadline}>Regenerate Headline</button>
        <button className="ep-btn" onClick={onRegenerateDescription}>Regenerate Description</button>
        <button className="ep-btn ep-btn--primary" onClick={onRegenerateFull}>Regenerate Full Ad</button>
      </div>
      <div style={{ marginTop: 12 }}>
        <button className="ep-save" onClick={onSave}>Save Changes</button>
      </div>
    </div>
  );
}
