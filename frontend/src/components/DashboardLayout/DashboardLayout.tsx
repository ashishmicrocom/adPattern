"use client";

import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./DashboardLayout.css";

type Props = { 
  children: React.ReactNode;
  productName?: string;
};

export default function DashboardLayout({ children, productName }: Props) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="dl-root">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className={`dl-main ${sidebarCollapsed ? "dl-main--collapsed" : ""}`}>
        <Header 
          productName={productName}
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="dl-content">
          {children}
        </main>
      </div>

      {/* Toggle button */}
      <button
        className="dl-toggle"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {sidebarCollapsed ? "→" : "←"}
      </button>
    </div>
  );
}
