"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import AISuggestions from "../../components/AISuggestions/AISuggestions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faPlay } from "@fortawesome/free-solid-svg-icons";
import "./page.css";

export default function Page() {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="ads-page-container">
        {/* Quick Action Banner
        <div className="ads-demo-banner">
          <div className="ads-demo-content">
            <div className="ads-demo-icon">
              <FontAwesomeIcon icon={faRocket} />
            </div>
            <div className="ads-demo-text">
              <h3>Try Our Demo Campaign</h3>
              <p>See a fully configured campaign ready to publish</p>
            </div>
          </div>
          <button 
            className="ads-demo-btn"
            onClick={() => router.push('/demo-campaign')}
          >
            <FontAwesomeIcon icon={faPlay} /> View Demo Campaign
          </button>
        </div> */}

        {/* Existing Dashboard Content */}
        <div className="ads-page-grid">
          <div className="ads-col-left">
            <SummaryCard />
          </div>
          <div className="ads-col-right">
            <AISuggestions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
