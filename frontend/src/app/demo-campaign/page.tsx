"use client";

import React from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import DemoCampaign from "../../components/DemoCampaign/DemoCampaign";
import "./page.css";

export default function DemoCampaignPage() {
  return (
    <DashboardLayout>
      <main className="demo-campaign-page">
        <DemoCampaign />
      </main>
    </DashboardLayout>
  );
}
