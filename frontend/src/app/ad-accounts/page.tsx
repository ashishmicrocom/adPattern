"use client";

import React from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import AdAccounts from "../../components/AdAccounts/AdAccounts";
import "./page.css";

export default function Page() {
  return (
    <DashboardLayout>
      <main className="aa-page">
        <div className="aa-header">
          <h1 className="aa-title">Ad Accounts</h1>
          <p className="aa-desc">Connect and manage your advertising accounts securely. We only request permissions necessary to create and manage ads on your behalf.</p>
        </div>

        <AdAccounts />
      </main>
    </DashboardLayout>
  );
}
