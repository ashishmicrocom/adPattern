"use client";

import React from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import CreateCampaign from "../../components/CreateCampaign/CreateCampaign";
import "./page.css";

export default function Page() {
  return (
    <DashboardLayout>
      <main className="cc-page">
        <CreateCampaign />
      </main>
    </DashboardLayout>
  );
}
