"use client";

import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "@/lib/api";
import "./CampaignSummary.css";

type Payload = { 
  productType?: string; 
  name?: string; 
  category?: string; 
  description?: string; 
  price?: string;
  priceMin?: string;
  priceMax?: string;
  location?: string; 
  target?: string;
  ageMin?: string;
  ageMax?: string;
  gender?: string;
};

function inferAgeRange(ageMin?: string, ageMax?: string, target?: string) {
  // First check if we have explicit age fields
  if (ageMin && ageMax) return `${ageMin}-${ageMax}`;
  
  // Fallback to parsing target string
  if (!target) return "25-45";
  const match = target.match(/(\d+)[-–](\d+)/);
  if (match) return `${match[1]}-${match[2]}`;
  return "25-45";
}

function inferInterests(category?: string, target?: string) {
  const interests: string[] = [];
  
  if (target) {
    const lower = target.toLowerCase();
    if (lower.includes("tech")) interests.push("Technology");
    if (lower.includes("fitness") || lower.includes("health")) interests.push("Fitness");
    if (lower.includes("professional") || lower.includes("business")) interests.push("Productivity");
  }
  
  if (category) {
    const cat = category.toLowerCase();
    if (cat.includes("technology") || cat.includes("software")) interests.push("Technology");
    if (cat.includes("fitness") || cat.includes("health")) interests.push("Fitness");
  }
  
  if (interests.length === 0) interests.push("General");
  
  return [...new Set(interests)];
}

export default function CampaignSummary() {
  const [data, setData] = useState<Payload | null>(null);
  const [platform, setPlatform] = useState<string>('Meta');
  const [modelData, setModelData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('adpatterns_last_payload');
      if (raw) setData(JSON.parse(raw));
      
      // Get selected platform
      const selectedPlatform = localStorage.getItem('adpatterns_selected_platform') || 'Meta';
      setPlatform(selectedPlatform);
    } catch (e) {}
  }, []);

  // Fetch model suggestions when data is available
  useEffect(() => {
    if (data) {
      fetchModelSuggestions();
    }
  }, [data, platform]);

  const fetchModelSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/generate-suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: data?.category || 'Clothing',
          user_description: data?.description,
          price: data?.price,
          price_range: data?.priceMin && data?.priceMax 
            ? `${data.priceMin}-${data.priceMax}` 
            : null,
          gender: data?.gender || 'Male',
          age_min: data?.ageMin ? parseInt(data.ageMin) : 1,
          age_max: data?.ageMax ? parseInt(data.ageMax) : 100,
          locations: data?.location,
          target_audience: data?.target,
          platform: platform
        })
      });
      
      if (response.ok) {
        const responseData = await response.json();
        setModelData(responseData);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching model suggestions:', error);
      setLoading(false);
    }
  };

  const ageRange = useMemo(() => inferAgeRange(data?.ageMin, data?.ageMax, data?.target), [data?.ageMin, data?.ageMax, data?.target]);
  const interests = useMemo(() => inferInterests(data?.category, data?.target), [data?.category, data?.target]);
  
  // Use model data if available, otherwise fallback to user input
  const headline = modelData?.headlines?.[0] || (data?.name ? `${data.name}: Special Offer` : 'Transform Your Daily Routine with This Product');
  const description = modelData?.descriptions?.[0] && modelData?.descriptions?.[1] 
    ? `${modelData.descriptions[0]} ${modelData.descriptions[1]}` 
    : data?.description || 'Experience the future of personal technology. Track. Monitor. Achieve.';

  if (!data) {
    return (
      <div className="cs-empty">
        No product data found. Complete the Product/Service form first.
      </div>
    );
  }

  return (
    <div className="cs-root">
      {/* Product Summary Section */}
      <div className="cs-section">
        <div className="cs-section-header">
          <h3 className="cs-section-title">Product Summary</h3>
          <span className="cs-badge">Read-only</span>
        </div>
        <div className="cs-grid">
          <div className="cs-field">
            <div className="cs-label">Name</div>
            <div className="cs-value">{data.name || '—'}</div>
          </div>
          <div className="cs-field">
            <div className="cs-label">Category</div>
            <div className="cs-value">{data.category || '—'}</div>
          </div>
          <div className="cs-field">
            <div className="cs-label">Platform</div>
            <div className="cs-value">{platform}</div>
          </div>
          <div className="cs-field">
            <div className="cs-label">Price</div>
            <div className="cs-value">
              {data.price ? `₹${data.price}` : 
               data.priceMin && data.priceMax ? `₹${data.priceMin} - ₹${data.priceMax}` : 
               '—'}
            </div>
          </div>
          <div className="cs-field">
            <div className="cs-label">Location</div>
            <div className="cs-value">{data.location || '—'}</div>
          </div>
          <div className="cs-field">
            <div className="cs-label">Age Range</div>
            <div className="cs-value">
              {data.ageMin && data.ageMax ? `${data.ageMin} - ${data.ageMax}` : '—'}
            </div>
          </div>
          <div className="cs-field">
            <div className="cs-label">Gender</div>
            <div className="cs-value">{data.gender || 'Male'}</div>
          </div>
          <div className="cs-field cs-field-full">
            <div className="cs-label">Audience</div>
            <div className="cs-value">{data.target || '—'}</div>
          </div>
        </div>
      </div>

      {/* AI Suggestions Section */}
      <div className="cs-section">
        <div className="cs-section-header">
          <div className="cs-section-header-left">
            <span className="cs-ai-icon"><FontAwesomeIcon icon={faWandMagicSparkles} /></span>
            <h3 className="cs-section-title">AI Suggestions Preview</h3>
          </div>
          <span className="cs-badge cs-badge--ai">
            {loading ? 'Loading...' : modelData ? `${modelData.total_matches || 0} matches` : 'Auto-Generated'}
          </span>
        </div>

        <div className="cs-ai-content">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              Fetching AI suggestions from model...
            </div>
          ) : (
            <>
              <div className="cs-ai-field">
                <div className="cs-ai-label">Headline:</div>
                <div className="cs-ai-value">"{headline}"</div>
              </div>

              <div className="cs-ai-field">
                <div className="cs-ai-label">Description:</div>
                <div className="cs-ai-value">{description}</div>
              </div>

              <div className="cs-ai-row">
                <div className="cs-ai-mini">
                  <div className="cs-ai-label">Age Group:</div>
                  <div className="cs-ai-value-sm">{ageRange}</div>
                </div>
                <div className="cs-ai-mini">
                  <div className="cs-ai-label">Target Audience:</div>
                  <div className="cs-ai-value-sm">{data.target || '—'}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
