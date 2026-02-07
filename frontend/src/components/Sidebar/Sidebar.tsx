"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faPlus, faBullhorn, faChartColumn, faLink, faGear, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

type SidebarProps = {
  /** collapsed state for the fixed left sidebar */
  collapsed?: boolean;
  onToggle?: () => void;
};

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { title: "Dashboard", url: "/ads-dashboard", icon: faChartLine },
    { title: "Create Campaign", url: "/create-campaign", icon: faPlus },
    { title: "Preview Campaign", url: "/demo-campaign", icon: faBullhorn },
    { title: "Campaigns", url: "/campaigns", icon: faBullhorn },
    { title: "Reports", url: "/reports", icon: faChartColumn },
    { title: "Ad Accounts", url: "/ad-accounts", icon: faLink },
    // { title: "Settings", url: "/settings", icon: faGear },
  ];

  const isActive = (url: string) => pathname === url || pathname?.startsWith(url + "/");

  return (
    <aside className={`sb-root ${collapsed ? "sb-collapsed" : ""}`}>
      {/* Logo */}
      <div className="sb-header">
        {!collapsed && (
          <Link href="/ads-dashboard" className="sb-logo-link">
            <div className="sb-logo-icon">A</div>
            <span className="sb-logo-text">AdPatterns</span>
          </Link>
        )}
        {collapsed && (
          <div className="sb-logo-icon sb-logo-icon-center">A</div>
        )}
      </div>

      {/* Navigation */}
      <nav className="sb-nav">
        {navItems.map((item) => {
          const active = isActive(item.url);
          return (
            <Link
              key={item.title}
              href={item.url}
              className={`sb-item ${active ? "sb-item--active" : ""} ${collapsed ? "sb-item--collapsed" : ""}`}
              title={collapsed ? item.title : undefined}
            >
              <span className="sb-icon"><FontAwesomeIcon icon={item.icon} /></span>
              {!collapsed && <span className="sb-label">{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="sb-footer">
        <div className={`sb-user ${collapsed ? "sb-user--collapsed" : ""}`}>
          <div className="sb-avatar">AP</div>
          {!collapsed && (
            <div className="sb-user-info">
              <div className="sb-name">Ad Patterns</div>
              <div className="sb-email">john@company.com</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
