"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleInfo, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PlatformSelect from "../PlatformSelect/PlatformSelect";
import CampaignSummary from "../CampaignSummary/CampaignSummary";
import GenerateCampaign from "../GenerateCampaign/GenerateCampaign";
import "./CreateCampaign.css";

export default function CreateCampaign() {
  const [step, setStep] = useState<number>(1);
  const [platform, setPlatform] = useState<string>(() => {
    // Load platform from localStorage if available
    try {
      return localStorage.getItem('adpatterns_selected_platform') || 'Meta';
    } catch {
      return 'Meta';
    }
  }); // Match model Platform column: Meta, Google

  // Persist platform to localStorage when changed
  const handlePlatformSelect = (p: string) => {
    setPlatform(p);
    try {
      localStorage.setItem('adpatterns_selected_platform', p);
    } catch (e) {
      console.error('Failed to save platform to localStorage', e);
    }
  };

  return (
    <div className="cc-root">
      {/* Progress Steps */}
      <div className="cc-progress">
        <div className={`cc-progress-step ${step >= 1 ? 'cc-progress-step--complete' : ''} ${step === 1 ? 'cc-progress-step--active' : ''}`}>
          <div className="cc-progress-circle">
            {step > 1 ? <FontAwesomeIcon icon={faCheck} /> : '1'}
          </div>
          {step < 3 && <div className="cc-progress-line"></div>}
        </div>
        <div className={`cc-progress-step ${step >= 2 ? 'cc-progress-step--complete' : ''} ${step === 2 ? 'cc-progress-step--active' : ''}`}>
          <div className="cc-progress-circle">
            {step > 2 ? <FontAwesomeIcon icon={faCheck} /> : '2'}
          </div>
          {step < 3 && <div className="cc-progress-line"></div>}
        </div>
        <div className={`cc-progress-step ${step >= 3 ? 'cc-progress-step--complete' : ''} ${step === 3 ? 'cc-progress-step--active' : ''}`}>
          <div className="cc-progress-circle">3</div>
        </div>
      </div>

      <div className="cc-body">
        {step === 1 && (
          <div className="cc-panel">
            <div className="cc-panel-header">
              <h2 className="cc-panel-title">Select Advertising Platform</h2>
              <p className="cc-panel-subtitle">Choose where you want to run your ads</p>
            </div>
            <PlatformSelect selected={platform} onSelect={handlePlatformSelect} />
            <div className="cc-actions">
              <button className="cc-btn cc-btn--primary" onClick={()=>setStep(2)}>
                Continue <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="cc-panel">
            <div className="cc-panel-header">
              <h2 className="cc-panel-title">Review Your Setup</h2>
              <p className="cc-panel-subtitle">Verify your product details and AI suggestions before generating</p>
            </div>
            <CampaignSummary />
            <div className="cc-notice">
              <span className="cc-notice-icon"><FontAwesomeIcon icon={faCircleInfo} /></span>
              <span>You'll be able to edit all details after the campaign is generated</span>
            </div>
            <div className="cc-actions">
              <button className="cc-btn" onClick={()=>setStep(1)}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
              </button>
              <button className="cc-btn cc-btn--primary" onClick={()=>setStep(3)}>
                Continue to Generate <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="cc-panel">
            <GenerateCampaign />
            <div className="cc-actions">
              <button className="cc-btn" onClick={()=>setStep(2)}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
