"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles, faTag, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "@/lib/api";
import "./AISuggestions.css";

type Props = {};

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
  // Model-generated fields (from notebook model)
  headline?: string;        // → Headline column from model
  ad_description?: string;  // → Ad_Description column from model
  keyword?: string;         // → Keyword column from model
  image_prompt?: string;    // → Image_Prompt column from model
};

function inferAudience(category?: string, productType?: string, target?: string) {
  if (target) return target;
  if (!category) return "General audience";
  const cat = category.toLowerCase();
  if (cat.includes("clothing")) return "Fashion shoppers, 18-45";
  if (cat.includes("education")) return "Students & lifelong learners, 16-35";
  if (cat.includes("restaurant")) return "Local diners, food lovers, 18-50";
  if (cat.includes("software") || cat.includes("technology")) return "Tech-savvy professionals aged 25-45";
  if (cat.includes("health")) return "Health-conscious adults, 25-60";
  if (productType === "Service") return "Local customers looking for services";
  return "Online shoppers, interested in related categories";
}

function pickCTA(price?: string, priceMin?: string, priceMax?: string, productType?: string) {
  // If any price info exists, use Shop Now
  if (price || priceMin || priceMax) return "Shop Now";
  return productType === "Service" ? "Book Now" : "Learn More";
}

// COMMENTED: Mock headline generation - replaced with model data
// function makeHeadlines(p: Payload) {
//   const base = p.name || p.category || "This offering";
//   return [
//     `Transform Your Daily Routine with ${base}`,
//     `The Smart Device That Actually Gets Things Done`,
//     `Track. Monitor. Achieve. All in One Device.`
//   ];
// }

// COMMENTED: Mock description generation - replaced with model data
// function makeDescriptions(p: Payload) {
//   if (p.description) return [p.description];
//   return [`Experience the future of personal technology. ${p.name || 'This product'} seamlessly integrates into your lifestyle, helping you stay healthy, productive, and connected.`];
// }

function inferAgeRange(ageMin?: string, ageMax?: string, target?: string) {
  // First check if we have explicit age fields
  if (ageMin && ageMax) return `${ageMin}-${ageMax}`;
  
  // Fallback to parsing target string
  if (!target) return "25-45";
  const match = target.match(/(\d+)[-–](\d+)/);
  if (match) return `${match[1]}-${match[2]}`;
  return "25-45";
}

function inferAudienceTags(category?: string, target?: string) {
  const tags: string[] = [];
  
  if (target) {
    const lower = target.toLowerCase();
    if (lower.includes("fitness") || lower.includes("health")) tags.push("Fitness Enthusiasts", "Health-Conscious Individuals");
    if (lower.includes("tech") || lower.includes("professional")) tags.push("Tech Early Adopters", "Busy Professionals");
    if (lower.includes("student")) tags.push("Students");
  }
  
  if (category) {
    const cat = category.toLowerCase();
    if (cat.includes("technology") || cat.includes("software")) {
      tags.push("Tech Early Adopters", "Busy Professionals");
    }
    if (cat.includes("fitness") || cat.includes("health")) {
      tags.push("Fitness Enthusiasts", "Health-Conscious Individuals");
    }
  }
  
  if (tags.length === 0) {
    tags.push("General Audience");
  }
  
  return [...new Set(tags)]; // Remove duplicates
}

export default function AISuggestions(_: Props) {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [modelData, setModelData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("adpatterns_last_payload");
      if (raw) setPayload(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  // Fetch model-generated data from backend
  useEffect(() => {
    if (payload) {
      fetchModelSuggestions();
    }
  }, [payload]);

  const fetchModelSuggestions = async () => {
    setLoading(true);
    try {
      // Get selected platform from localStorage (defaults to Meta)
      let selectedPlatform = 'Meta';
      try {
        selectedPlatform = localStorage.getItem('adpatterns_selected_platform') || 'Meta';
      } catch (e) {}

      // Call backend API endpoint to get model data
      const response = await fetch(`${API_URL}/api/generate-suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: payload?.category || 'Clothing',
          user_description: payload?.description,
          price: payload?.price,
          price_range: payload?.priceMin && payload?.priceMax 
            ? `${payload.priceMin}-${payload.priceMax}` 
            : null,
          gender: payload?.gender || 'Male',
          age_min: payload?.ageMin ? parseInt(payload.ageMin) : 1,
          age_max: payload?.ageMax ? parseInt(payload.ageMax) : 100,
          locations: payload?.location,
          target_audience: payload?.target,
          platform: selectedPlatform  // Add platform filter from model
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setModelData({
          headlines: data.headlines || [],
          descriptions: data.descriptions || [],
          keywords: data.keywords || [],
          cta: data.cta || 'Shop Now',
          total_matches: data.total_matches || 0
        });
      } else {
        console.error('Failed to fetch suggestions:', response.statusText);
        // Fallback to default message
        setModelData({
          headlines: [],
          descriptions: [payload?.description || "No description available"],
          keywords: [],
          cta: 'Shop Now',
          total_matches: 0
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching model suggestions:', error);
      // Fallback to user's description if backend fails
      setModelData({
        headlines: [],
        descriptions: [payload?.description || "Backend connection failed. Using your description."],
        keywords: [],
        cta: 'Shop Now',
        total_matches: 0
      });
      setLoading(false);
    }
  };

  const headlines = modelData?.headlines.slice(0, 3) || [];
  // Combine first 2 descriptions into one for longer text
  const descriptions = modelData?.descriptions?.length >= 2 
    ? [`${modelData.descriptions[0]} ${modelData.descriptions[1]}`]
    : modelData?.descriptions?.slice(0, 1) || [payload?.description || "No description available"];
  const audience = useMemo(() => (payload ? inferAudience(payload.category, payload.productType, payload.target) : "—"), [payload]);
  const cta = modelData?.cta || (payload ? pickCTA(payload.price, payload.priceMin, payload.priceMax, payload.productType) : "Learn More");
  const ageRange = useMemo(() => (payload ? inferAgeRange(payload.ageMin, payload.ageMax, payload.target) : "25-45"), [payload]);
  const audienceTags = useMemo(() => (payload ? inferAudienceTags(payload.category, payload.target) : []), [payload]);

  if (!payload) {
    return (
      <div className="ai-card">
        <div className="ai-header">
          <div className="ai-header-icon"><FontAwesomeIcon icon={faWandMagicSparkles} /></div>
          <div>
            <h2 className="ai-title">AI Suggestions</h2>
            <p className="ai-subtitle">Based on your product details</p>
          </div>
          <span className="ai-badge">Auto-Generated</span>
        </div>
        <div className="ai-empty">
          No product data found. Submit the Product/Service form to get AI-powered suggestions.
        </div>
      </div>
    );
  }

  return (
    <div className="ai-card">
      <div className="ai-header">
        <div className="ai-header-icon"><FontAwesomeIcon icon={faWandMagicSparkles} /></div>
        <div>
          <h2 className="ai-title">AI Suggestions</h2>
          <p className="ai-subtitle">Based on your product details</p>
        </div>
        <span className="ai-badge">Auto-Generated</span>
      </div>

      <div className="ai-content">
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
            <div style={{ fontSize: '14px' }}>Generating AI suggestions from model...</div>
          </div>
        )}
        
        {!loading && (
          <>
            {/* Suggested Headlines */}
            <div className="ai-section">
              <h3 className="ai-section-title">
                Suggested Headlines (From Model)
                {modelData?.total_matches > 0 && (
                  <span style={{fontSize: '12px', color: '#888', fontWeight: 'normal', marginLeft: '8px'}}>
                    ({modelData.total_matches} matches)
                  </span>
                )}
              </h3>
              <div className="ai-headlines">
                {headlines.length > 0 ? headlines.map((h: string, i: number) => (
                  <div key={i} className="ai-headline-item">"{h}"</div>
                )) : (
                  <div style={{ color: '#888', fontSize: '13px' }}>
                    No headlines available from model. Make sure backend is running and CSV file exists.
                  </div>
                )}
              </div>
            </div>

            {/* Suggested Description */}
            <div className="ai-section">
              <h3 className="ai-section-title">Suggested Descriptions (From Model)</h3>
              <div className="ai-headlines">
                {descriptions.length > 0 ? descriptions.map((d: string, i: number) => (
                  <div key={i} className="ai-headline-item" style={{marginBottom: '8px'}}>"{d}"</div>
                )) : (
                  <div style={{ color: '#888', fontSize: '13px' }}>No descriptions available</div>
                )}
              </div>
            </div>

            {/* Target Age and CTA */}
            <div className="ai-row">
              <div className="ai-detail-box">
                <h4 className="ai-detail-title">Target Age</h4>
                <div className="ai-detail-value">{ageRange}</div>
              </div>
              <div className="ai-detail-box">
                <h4 className="ai-detail-title">Target Gender</h4>
                <div className="ai-detail-value">{payload.gender || 'Male'}</div>
              </div>
            </div>

            {/* Target Audience */}
            <div className="ai-section">
              <h3 className="ai-section-title">Target Audience</h3>
              {payload.target && (
                <div className="ai-description" style={{marginBottom: '12px'}}>
                  <p>{payload.target}</p>
                </div>
              )}
              {/* <div className="ai-tags">
                {audienceTags.map((tag, i) => (
                  <span key={i} className="ai-tag">{tag}</span>
                ))}
              </div> */}
            </div>

            {/* Suggested CTA */}
            <div className="ai-section">
              <h3 className="ai-section-title">Suggested CTA</h3>
              <div className="ai-cta-btn">{cta}</div>
            </div>

            {/* Campaign Goal */}
            <div className="ai-section">
              <h3 className="ai-section-title">Campaign Goal</h3>
              <div className="ai-goal">Drive online sales and product awareness</div>
            </div>

            {/* CTA Button */}
            <Link href="/create-campaign" className="ai-create-btn">
              Create Campaign with These Suggestions <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
