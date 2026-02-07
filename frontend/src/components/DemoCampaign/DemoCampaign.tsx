"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast, { Toaster } from 'react-hot-toast';
import { 
  faBullhorn, 
  faChartLine, 
  faDollarSign, 
  faUsers, 
  faCalendar,
  faRocket,
  faCheckCircle,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import "./DemoCampaign.css";

interface DemoCampaignProps {
  showPublishButton?: boolean;
  onPublish?: () => void;
}

export default function DemoCampaign({ showPublishButton = true, onPublish }: DemoCampaignProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const router = useRouter();

  const demoCampaign = {
    id: "demo-campaign-001",
    name: "Summer Fashion Collection Launch",
    platform: "Meta",
    status: "draft",
    objective: "Sales",
    budget: 500,
    budgetType: "daily",
    startDate: "2026-02-10",
    endDate: "2026-03-10",
    targeting: {
      ageMin: 18,
      ageMax: 45,
      gender: "All",
      locations: ["United States", "Canada", "United Kingdom"],
      interests: ["Fashion", "Online Shopping", "Summer Fashion", "Clothing Brands"]
    },
    adCreative: {
      headline: "Discover Your Summer Style - Up to 40% Off! ☀️",
      description: "Transform your wardrobe with our exclusive summer collection. Premium fabrics, trending styles, and unbeatable prices. Limited time offer - Shop now and save big!",
      cta: "Shop Now",
      imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
      linkUrl: "https://yourstore.com/summer-collection"
    },
    metrics: {
      estimatedReach: "50,000 - 150,000",
      estimatedClicks: "2,500 - 7,500",
      estimatedCTR: "3.5% - 5.0%",
      estimatedCPC: "$0.15 - $0.30"
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    
    const toastId = toast.loading('Publishing campaign...');
    
    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
      
      if (onPublish) {
        onPublish();
      }
      
      // Show success message
      toast.success('Campaign published successfully! Your ads will start running soon.', {
        id: toastId,
        duration: 5000,
        icon: '🎉'
      });
    }, 2000);
  };

  const handleEdit = () => {
    router.push("/campaign-review");
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="demo-campaign">
      {/* Header */}
      <div className="dc-header">
        <div className="dc-header-content">
          <div className="dc-header-left">
            <FontAwesomeIcon icon={faBullhorn} className="dc-icon-main" />
            <div>
              <h1 className="dc-title">{demoCampaign.name}</h1>
              <div className="dc-meta">
                <span className={`dc-badge dc-badge--${demoCampaign.status}`}>
                  {isPublished ? "Active" : demoCampaign.status}
                </span>
                <span className="dc-platform">{demoCampaign.platform} Ads</span>
                <span className="dc-objective">{demoCampaign.objective}</span>
              </div>
            </div>
          </div>
          <div className="dc-header-actions">
            <button className="dc-btn dc-btn--secondary" onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} /> Edit Campaign
            </button>
            {showPublishButton && !isPublished && (
              <button 
                className="dc-btn dc-btn--primary" 
                onClick={handlePublish}
                disabled={isPublishing}
              >
                <FontAwesomeIcon icon={isPublishing ? faRocket : faCheckCircle} spin={isPublishing} />
                {isPublishing ? "Publishing..." : "Publish Campaign"}
              </button>
            )}
            {isPublished && (
              <div className="dc-published-badge">
                <FontAwesomeIcon icon={faCheckCircle} /> Campaign Live
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dc-grid">
        {/* Budget & Schedule */}
        <div className="dc-card">
          <div className="dc-card-header">
            <FontAwesomeIcon icon={faDollarSign} className="dc-card-icon" />
            <h2>Budget & Schedule</h2>
          </div>
          <div className="dc-card-body">
            <div className="dc-info-row">
              <span className="dc-label">Budget Type:</span>
              <span className="dc-value">{demoCampaign.budgetType}</span>
            </div>
            <div className="dc-info-row">
              <span className="dc-label">Daily Budget:</span>
              <span className="dc-value dc-value--highlight">${demoCampaign.budget}</span>
            </div>
            <div className="dc-info-row">
              <span className="dc-label">Total Budget:</span>
              <span className="dc-value">${demoCampaign.budget * 28} (28 days)</span>
            </div>
            <div className="dc-info-row">
              <span className="dc-label">
                <FontAwesomeIcon icon={faCalendar} /> Start Date:
              </span>
              <span className="dc-value">{demoCampaign.startDate}</span>
            </div>
            <div className="dc-info-row">
              <span className="dc-label">
                <FontAwesomeIcon icon={faCalendar} /> End Date:
              </span>
              <span className="dc-value">{demoCampaign.endDate}</span>
            </div>
          </div>
        </div>

        {/* Targeting */}
        <div className="dc-card">
          <div className="dc-card-header">
            <FontAwesomeIcon icon={faUsers} className="dc-card-icon" />
            <h2>Target Audience</h2>
          </div>
          <div className="dc-card-body">
            <div className="dc-info-row">
              <span className="dc-label">Age Range:</span>
              <span className="dc-value">{demoCampaign.targeting.ageMin} - {demoCampaign.targeting.ageMax}</span>
            </div>
            <div className="dc-info-row">
              <span className="dc-label">Gender:</span>
              <span className="dc-value">{demoCampaign.targeting.gender}</span>
            </div>
            <div className="dc-info-row">
              <span className="dc-label">Locations:</span>
              <div className="dc-tags">
                {demoCampaign.targeting.locations.map((loc, idx) => (
                  <span key={idx} className="dc-tag">{loc}</span>
                ))}
              </div>
            </div>
            <div className="dc-info-row">
              <span className="dc-label">Interests:</span>
              <div className="dc-tags">
                {demoCampaign.targeting.interests.map((interest, idx) => (
                  <span key={idx} className="dc-tag dc-tag--interest">{interest}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Performance */}
        <div className="dc-card">
          <div className="dc-card-header">
            <FontAwesomeIcon icon={faChartLine} className="dc-card-icon" />
            <h2>Estimated Performance</h2>
          </div>
          <div className="dc-card-body">
            <div className="dc-info-row">
              <span className="dc-label">Est. Reach:</span>
              <span className="dc-value dc-value--success">{demoCampaign.metrics.estimatedReach}</span>
            </div>
            <div className="dc-info-row">
              <span className="dc-label">Est. Clicks:</span>
              <span className="dc-value dc-value--success">{demoCampaign.metrics.estimatedClicks}</span>
            </div>
            <div className="dc-info-row">
              <span className="dc-label">Est. CTR:</span>
              <span className="dc-value">{demoCampaign.metrics.estimatedCTR}</span>
            </div>
            <div className="dc-info-row">
              <span className="dc-label">Est. CPC:</span>
              <span className="dc-value">{demoCampaign.metrics.estimatedCPC}</span>
            </div>
          </div>
        </div>

        {/* Ad Creative */}
        <div className="dc-card dc-card--wide">
          <div className="dc-card-header">
            <h2>Ad Creative</h2>
          </div>
          <div className="dc-card-body">
            <div className="dc-creative">
              <div className="dc-creative-preview">
                <div className="dc-ad-preview">
                  <div className="dc-ad-header">
                    <div className="dc-ad-profile">
                      <div className="dc-ad-avatar">YS</div>
                      <div>
                        <div className="dc-ad-name">Your Store</div>
                        <div className="dc-ad-sponsored">Sponsored</div>
                      </div>
                    </div>
                  </div>
                  <div className="dc-ad-image">
                    <img src={demoCampaign.adCreative.imageUrl} alt="Ad preview" />
                  </div>
                  <div className="dc-ad-content">
                    <h3 className="dc-ad-headline">{demoCampaign.adCreative.headline}</h3>
                    <p className="dc-ad-description">{demoCampaign.adCreative.description}</p>
                    <a href={demoCampaign.adCreative.linkUrl} className="dc-ad-link" target="_blank" rel="noopener noreferrer">
                      {demoCampaign.adCreative.linkUrl}
                    </a>
                    <button className="dc-ad-cta">
                      {demoCampaign.adCreative.cta}
                    </button>
                  </div>
                </div>
              </div>
              <div className="dc-creative-details">
                <h3>Creative Details</h3>
                <div className="dc-info-row">
                  <span className="dc-label">Headline:</span>
                  <span className="dc-value">{demoCampaign.adCreative.headline}</span>
                </div>
                <div className="dc-info-row">
                  <span className="dc-label">Description:</span>
                  <span className="dc-value">{demoCampaign.adCreative.description}</span>
                </div>
                <div className="dc-info-row">
                  <span className="dc-label">Call to Action:</span>
                  <span className="dc-value dc-value--highlight">{demoCampaign.adCreative.cta}</span>
                </div>
                <div className="dc-info-row">
                  <span className="dc-label">Landing Page:</span>
                  <a href={demoCampaign.adCreative.linkUrl} className="dc-link" target="_blank" rel="noopener noreferrer">
                    {demoCampaign.adCreative.linkUrl}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="dc-footer">
        <div className="dc-info-box">
          <h3>📊 What happens after publishing?</h3>
          <ul>
            <li>Your campaign will be submitted to {demoCampaign.platform} for review</li>
            <li>Review typically takes 24-48 hours</li>
            <li>Once approved, ads will start running on schedule</li>
            <li>You'll receive real-time performance updates in your dashboard</li>
            <li>You can pause, edit, or stop the campaign anytime</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}
