"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "@/lib/api";
import "./GenerateCampaign.css";

type Draft = {
  campaignName: string;
  objective: string;
  budgetDaily: string;
  adset: {
    ageMin: number;
    ageMax: number;
    gender: string;
    location: string;
    interests: string[];
    keywords: string[];
    url: string;
  };
  creative: {
    headline: string;
    description: string;
    cta: string;
    image?: string;
  };
};

export default function GenerateCampaign() {
  const [state, setState] = useState<'idle'|'loading'|'done'>('idle');
  const router = useRouter();

  async function buildDraft(): Promise<Draft> {
    // base from last product payload
    let base: any = {};
    try { base = JSON.parse(localStorage.getItem('adpatterns_last_payload') || '{}'); } catch(e){}

    // Get selected platform from localStorage
    let selectedPlatform = 'Meta'; // default to Meta
    try { 
      selectedPlatform = localStorage.getItem('adpatterns_selected_platform') || 'Meta'; 
    } catch(e){}

    const name = base.name ? `${base.name} — ${selectedPlatform} Campaign` : `New ${selectedPlatform} Campaign`;
    
    // Fetch model suggestions from backend
    let modelData: any = null;
    try {
      const response = await fetch(`${API_URL}/api/generate-suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: base.category || 'Clothing',
          user_description: base.description,
          price: base.price,
          price_range: base.priceMin && base.priceMax 
            ? `${base.priceMin}-${base.priceMax}` 
            : null,
          gender: base.gender || 'Male',
          age_min: base.ageMin ? parseInt(base.ageMin) : 1,
          age_max: base.ageMax ? parseInt(base.ageMax) : 100,
          locations: base.location,
          target_audience: base.target,
          platform: selectedPlatform
        })
      });
      
      if (response.ok) {
        modelData = await response.json();
      }
    } catch (error) {
      console.error('Error fetching model suggestions:', error);
    }

    // Use model data if available, otherwise fallback to basic data
    const headline = modelData?.headlines?.[0] || (base.name ? `${base.name}: Special Offer` : 'Great product — Try now');
    const description = modelData?.descriptions?.[0] && modelData?.descriptions?.[1] 
      ? `${modelData.descriptions[0]} ${modelData.descriptions[1]}`
      : base.description || 'High quality, reliable and designed for you.';
    const keywords = modelData?.keywords || [base.category].filter(Boolean);

    return {
      campaignName: name,
      objective: 'Sales',
      budgetDaily: '₹500',
      adset: {
        ageMin: base.ageMin ? parseInt(base.ageMin) : 18,
        ageMax: base.ageMax ? parseInt(base.ageMax) : 45,
        gender: base.gender || 'Male',
        location: base.location || 'All locations',
        interests: base.target ? [base.target] : ['General'],
        keywords: keywords,
        url: 'https://example.com'
      },
      creative: {
        headline,
        description,
        cta: modelData?.cta || 'Shop Now',
        image: undefined
      }
    };
  }

  async function generate() {
    setState('loading');
    try {
      const draft = await buildDraft();
      try { localStorage.setItem('adpatterns_last_campaign', JSON.stringify(draft)); } catch(e){}
      setState('done');
      // navigate to campaign review after short delay
      setTimeout(() => {
        router.push('/campaign-review');
      }, 800);
    } catch (error) {
      console.error('Error generating campaign:', error);
      setState('idle');
      alert('Failed to generate campaign. Please try again.');
    }
  }

  return (
    <div className="gc-root">
      <div className="gc-panel-header">
        <h2 className="gc-panel-title">Generate Your Campaign</h2>
        <p className="gc-panel-subtitle">Our AI will create a complete campaign based on your product</p>
      </div>

      {state === 'idle' && (
        <div className="gc-content">
          <div className="gc-icon-wrap">
            <div className="gc-icon"><FontAwesomeIcon icon={faWandMagicSparkles} /></div>
          </div>
          <h3 className="gc-ready-title">Ready to Generate</h3>
          <p className="gc-ready-text">Click below to create your AI-powered ad campaign</p>
          <button className="gc-btn gc-btn--primary" onClick={generate}>
            Generate Campaign with AI <FontAwesomeIcon icon={faWandMagicSparkles} />
          </button>
        </div>
      )}

      {state === 'loading' && (
        <div className="gc-content gc-content-loading">
          <div className="gc-spinner"></div>
          <h3 className="gc-loading-title">Generating Your Campaign...</h3>
          <p className="gc-loading-text">Our AI is analyzing your product and creating optimized ad content</p>
        </div>
      )}

      {state === 'done' && (
        <div className="gc-content">
          <div className="gc-icon-wrap gc-icon-wrap--success">
            <div className="gc-icon">✓</div>
          </div>
          <h3 className="gc-success-title">Campaign Generated Successfully!</h3>
          <p className="gc-success-text">Redirecting to campaign review...</p>
        </div>
      )}
    </div>
  );
}
