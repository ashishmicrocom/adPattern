"use client";

import React, { useState, useEffect } from "react";
import "./AdSetDetails.css";

type Props = { adset: any; onChange: (a:any)=>void };

export default function AdSetDetails({ adset, onChange }: Props) {
  const [local, setLocal] = useState<any>(adset || {});

  // Update local state when adset prop changes
  useEffect(() => {
    if (adset) {
      setLocal(adset);
    }
  }, [adset]);

  function update(changes: any) {
    const next = { ...local, ...changes };
    setLocal(next);
    onChange(next);
  }

  return (
    <div className="as-card">
      <div className="as-header">
        <h3 className="as-title">Targeting</h3>
        <span className="as-badge">AI Optimized</span>
      </div>

      <div className="as-grid">
        <div className="as-field">
          <label className="as-label">Age Group</label>
          <div className="as-age-row">
            <input type="number" className="as-input as-input-sm" value={local.ageMin || 18} onChange={(e)=>update({ ageMin: Number(e.target.value) })} />
            <span className="as-separator">-</span>
            <input type="number" className="as-input as-input-sm" value={local.ageMax || 45} onChange={(e)=>update({ ageMax: Number(e.target.value) })} />
          </div>
        </div>

        <div className="as-field">
          <label className="as-label">Gender</label>
          <select className="as-select as-select-styled" value={local.gender || 'Male'} onChange={(e)=>update({ gender: e.target.value })}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="as-field as-field-full">
          <label className="as-label">Location</label>
          <input className="as-input" value={local.location || ''} onChange={(e)=>update({ location: e.target.value })} placeholder="United States" />
        </div>

        <div className="as-field as-field-full">
          <label className="as-label">Interests</label>
          <div className="as-tags">
            {(local.interests || []).map((interest: string, i: number) => (
              <span key={i} className="as-tag">{interest}</span>
            ))}
          </div>
          <input 
            className="as-input" 
            value={(local.interests||[]).join(', ')} 
            onChange={(e)=>update({ interests: e.target.value.split(',').map((s:string)=>s.trim()).filter(Boolean) })} 
            placeholder="Technology, Fitness, Productivity"
          />
        </div>

        <div className="as-field as-field-full">
          <label className="as-label">Keywords</label>
          <input 
            className="as-input" 
            value={(local.keywords||[]).join(', ')} 
            onChange={(e)=>update({ keywords: e.target.value.split(',').map((s:string)=>s.trim()).filter(Boolean) })} 
            placeholder="wearable tech, fitness tracker, smart watch"
          />
        </div>

        <div className="as-field as-field-full">
          <label className="as-label">Destination URL</label>
          <input className="as-input" value={local.url || ''} onChange={(e)=>update({ url: e.target.value })} placeholder="techgadgetpro.com/shop" />
        </div>
      </div>
    </div>
  );
}
