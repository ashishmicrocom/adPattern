"use client";

import React from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import CampaignReview from "../../components/CampaignReview/CampaignReview";
import "./page.css";

export default function Page() {
  return (
    <DashboardLayout>
      <main className="cr-page">
        <CampaignReview />
      </main>
    </DashboardLayout>
  );
}
