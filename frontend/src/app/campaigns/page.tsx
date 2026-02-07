"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBullhorn, 
  faEye, 
  faEdit, 
  faTrash,
  faPlay,
  faPause,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from 'react-hot-toast';
import "./page.css";

interface Campaign {
  _id: string;
  name: string;
  platform: string;
  status: string;
  objective: string;
  budget: number;
  budget_type: string;
  created_at: string;
  metrics?: {
    impressions: number;
    clicks: number;
    spend: number;
    ctr: number;
  };
}

export default function CampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Use mock data instead of fetching from backend
    setTimeout(() => {
      const mockCampaigns: Campaign[] = [
        {
          _id: "1",
          name: "Summer Fashion Collection Launch",
          platform: "Meta",
          status: "active",
          objective: "Sales",
          budget: 500,
          budget_type: "daily",
          created_at: "2026-02-01T10:00:00Z",
          metrics: {
            impressions: 125000,
            clicks: 4850,
            spend: 2350.75,
            ctr: 3.88
          }
        },
        {
          _id: "2",
          name: "Spring Sale - 40% Off Everything",
          platform: "Google",
          status: "active",
          objective: "Conversions",
          budget: 750,
          budget_type: "daily",
          created_at: "2026-01-28T14:30:00Z",
          metrics: {
            impressions: 89500,
            clicks: 3200,
            spend: 1850.50,
            ctr: 3.57
          }
        },
        {
          _id: "3",
          name: "New Product Launch - Tech Gadgets",
          platform: "Meta",
          status: "paused",
          objective: "Brand Awareness",
          budget: 300,
          budget_type: "daily",
          created_at: "2026-01-25T09:15:00Z",
          metrics: {
            impressions: 45000,
            clicks: 1250,
            spend: 680.25,
            ctr: 2.78
          }
        },
        {
          _id: "4",
          name: "Winter Clearance Sale",
          platform: "Pinterest",
          status: "paused",
          objective: "Catalog Sales",
          budget: 350,
          budget_type: "daily",
          created_at: "2026-01-22T13:30:00Z",
          metrics: {
            impressions: 38500,
            clicks: 1650,
            spend: 920.40,
            ctr: 4.29
          }
        },
        {
          _id: "5",
          name: "Holiday Special Offers",
          platform: "Instagram",
          status: "active",
          objective: "Traffic",
          budget: 400,
          budget_type: "daily",
          created_at: "2026-02-03T16:45:00Z",
          metrics: {
            impressions: 67800,
            clicks: 2890,
            spend: 1120.00,
            ctr: 4.26
          }
        },
        {
          _id: "6",
          name: "Back to School Campaign",
          platform: "TikTok",
          status: "draft",
          objective: "Engagement",
          budget: 250,
          budget_type: "daily",
          created_at: "2026-02-04T11:20:00Z",
          metrics: {
            impressions: 0,
            clicks: 0,
            spend: 0,
            ctr: 0
          }
        },
        {
          _id: "7",
          name: "Premium Membership Drive",
          platform: "LinkedIn",
          status: "active",
          objective: "Lead Generation",
          budget: 600,
          budget_type: "daily",
          created_at: "2026-01-30T08:00:00Z",
          metrics: {
            impressions: 52000,
            clicks: 2100,
            spend: 1580.90,
            ctr: 4.04
          }
        },
        {
          _id: "8",
          name: "Winter Clearance Sale",
          platform: "Pinterest",
          status: "paused",
          objective: "Catalog Sales",
          budget: 350,
          budget_type: "daily",
          created_at: "2026-01-22T13:30:00Z",
          metrics: {
            impressions: 38500,
            clicks: 1650,
            spend: 920.40,
            ctr: 4.29
          }
        },
        {
          _id: "9",
          name: "Holiday Special Offers",
          platform: "Instagram",
          status: "active",
          objective: "Traffic",
          budget: 400,
          budget_type: "daily",
          created_at: "2026-02-03T16:45:00Z",
          metrics: {
            impressions: 67800,
            clicks: 2890,
            spend: 1120.00,
            ctr: 4.26
          }
        }
      ];
      
      setCampaigns(mockCampaigns);
      setLoading(false);
    }, 500);
  }, []);

  function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
      case 'active': return '#22C55E';
      case 'paused': return '#FACC15';
      case 'draft': return '#A0A7B4';
      default: return '#6B7280';
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  if (loading) {
    return (
      <DashboardLayout>
        <Toaster position="top-right" />
        <div className="campaigns-page">
          <div className="campaigns-loading">Loading campaigns...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="campaigns-page">
        {/* Header */}
        <div className="campaigns-header">
          <div>
            <h1 className="campaigns-title">Campaigns</h1>
            <p className="campaigns-subtitle">Manage and monitor your advertising campaigns</p>
          </div>
          <button 
            className="campaigns-create-btn"
            onClick={() => router.push('/create-campaign')}
          >
            <FontAwesomeIcon icon={faPlus} /> Create Campaign
          </button>
        </div>

        {/* Campaigns List */}
        {campaigns.length === 0 ? (
          <div className="campaigns-empty">
            <FontAwesomeIcon icon={faBullhorn} className="campaigns-empty-icon" />
            <h3>No campaigns yet</h3>
            <p>Create your first campaign to get started</p>
            <button 
              className="campaigns-empty-btn"
              onClick={() => router.push('/create-campaign')}
            >
              <FontAwesomeIcon icon={faPlus} /> Create Campaign
            </button>
          </div>
        ) : (
          <div className="campaigns-grid">
            {campaigns.map((campaign) => (
              <div key={campaign._id} className="campaign-card">
                <div className="campaign-card-header">
                  <div className="campaign-card-title-section">
                    <FontAwesomeIcon icon={faBullhorn} className="campaign-card-icon" />
                    <div>
                      <h3 className="campaign-card-title">{campaign.name}</h3>
                      <p className="campaign-card-meta">
                        {campaign.platform} • {campaign.objective}
                      </p>
                    </div>
                  </div>
                  <span 
                    className="campaign-status-badge"
                    style={{ 
                      backgroundColor: `${getStatusColor(campaign.status)}20`,
                      color: getStatusColor(campaign.status),
                      border: `1px solid ${getStatusColor(campaign.status)}50`
                    }}
                  >
                    {campaign.status}
                  </span>
                </div>

                <div className="campaign-card-body">
                  <div className="campaign-stat">
                    <span className="campaign-stat-label">Budget</span>
                    <span className="campaign-stat-value">
                      ${campaign.budget}/{campaign.budget_type}
                    </span>
                  </div>
                  
                  {campaign.metrics && (
                    <>
                      <div className="campaign-stat">
                        <span className="campaign-stat-label">Impressions</span>
                        <span className="campaign-stat-value">
                          {campaign.metrics.impressions.toLocaleString()}
                        </span>
                      </div>
                      <div className="campaign-stat">
                        <span className="campaign-stat-label">Clicks</span>
                        <span className="campaign-stat-value">
                          {campaign.metrics.clicks.toLocaleString()}
                        </span>
                      </div>
                      <div className="campaign-stat">
                        <span className="campaign-stat-label">Spend</span>
                        <span className="campaign-stat-value">
                          ${campaign.metrics.spend.toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}
                  
                  <div className="campaign-stat">
                    <span className="campaign-stat-label">Created</span>
                    <span className="campaign-stat-value">
                      {formatDate(campaign.created_at)}
                    </span>
                  </div>
                </div>

                <div className="campaign-card-actions">
                  <button 
                    className="campaign-action-btn campaign-action-btn--view"
                    onClick={() => router.push(`/campaigns/${campaign._id}`)}
                    title="View Details"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button 
                    className="campaign-action-btn campaign-action-btn--edit"
                    title="Edit Campaign"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  {campaign.status === 'active' ? (
                    <button 
                      className="campaign-action-btn campaign-action-btn--pause"
                      title="Pause Campaign"
                    >
                      <FontAwesomeIcon icon={faPause} />
                    </button>
                  ) : (
                    <button 
                      className="campaign-action-btn campaign-action-btn--play"
                      title="Activate Campaign"
                    >
                      <FontAwesomeIcon icon={faPlay} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
