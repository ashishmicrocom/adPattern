"use client";

import React from "react";
import "./CampaignMeta.css";

type Props = { meta: any; onEdit: (m: any) => void };

export default function CampaignMeta({ meta, onEdit }: Props) {
  return (
    <div className="cm-card">
      <div className="cm-header">
        <h3 className="cm-title">Campaign Details</h3>
      </div>
      <div className="cm-grid">
        <div className="cm-field">
          <div className="cm-label">Campaign Name</div>
          <div className="cm-value">{meta.campaignName}</div>
        </div>
        <div className="cm-field">
          <div className="cm-label">Objective</div>
          <div className="cm-value cm-badge cm-badge--orange">{meta.objective}</div>
        </div>
        {/* <div className="cm-field">
          <div className="cm-label">Daily Budget</div>
          <div className="cm-value cm-badge--budget">{meta.budgetDaily}</div>
        </div> */}
      </div>
    </div>
  );
}
