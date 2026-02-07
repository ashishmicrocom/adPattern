"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faBullhorn, faEye } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from 'react-hot-toast';
import { API_URL } from "@/lib/api";
import CampaignMeta from "../CampaignMeta/CampaignMeta";
import AdSetDetails from "../AdSetDetails/AdSetDetails";
import AdCreative from "../AdCreative/AdCreative";
import AdPreview from "../AdPreview/AdPreview";
import "./CampaignReview.css";

type Draft = any;

export default function CampaignReview() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [resetKey, setResetKey] = useState(0); // Key to force AdCreative reset
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('adpatterns_last_campaign');
      if (raw) setDraft(JSON.parse(raw));
    } catch (e) {}
  }, []);

  function save(updated: Draft) {
    setDraft(updated);
    try { localStorage.setItem('adpatterns_last_campaign', JSON.stringify(updated)); } catch(e){}
  }

  async function regenerateAll() {
    if (!draft) return;
    
    setIsRegenerating(true);
    try {
      // Get product data from localStorage
      let base: any = {};
      try { base = JSON.parse(localStorage.getItem('adpatterns_last_payload') || '{}'); } catch(e){}
      
      // Get selected platform
      let selectedPlatform = 'Meta';
      try { 
        selectedPlatform = localStorage.getItem('adpatterns_selected_platform') || 'Meta'; 
      } catch(e){}

      // Fetch fresh model data from backend
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
        const modelData = await response.json();
        
        // Pick random headline and descriptions from model data
        const randomHeadlineIdx = Math.floor(Math.random() * (modelData.headlines?.length || 1));
        const randomDesc1Idx = Math.floor(Math.random() * (modelData.descriptions?.length || 1));
        let randomDesc2Idx = Math.floor(Math.random() * (modelData.descriptions?.length || 1));
        while (randomDesc2Idx === randomDesc1Idx && modelData.descriptions?.length > 1) {
          randomDesc2Idx = Math.floor(Math.random() * modelData.descriptions.length);
        }
        
        const newHeadline = modelData.headlines?.[randomHeadlineIdx] || draft.creative.headline;
        const newDescription = modelData.descriptions?.[randomDesc1Idx] && modelData.descriptions?.[randomDesc2Idx]
          ? `${modelData.descriptions[randomDesc1Idx]} ${modelData.descriptions[randomDesc2Idx]}`
          : draft.creative.description;
        const newKeywords = modelData.keywords || draft.adset.keywords;

        // Update draft with new data
        const updatedDraft = {
          ...draft,
          creative: {
            ...draft.creative,
            headline: newHeadline,
            description: newDescription,
            cta: modelData.cta || draft.creative.cta
          },
          adset: {
            ...draft.adset,
            keywords: newKeywords
          }
        };
        
        save(updatedDraft);
        setResetKey(prev => prev + 1); // Force AdCreative to reset by changing key
        toast.success('Campaign content regenerated successfully!');
      } else {
        toast.error('Failed to regenerate content. Please try again.');
      }
    } catch (error) {
      console.error('Error regenerating campaign:', error);
      toast.error('Error regenerating content. Please try again.');
    }
    setIsRegenerating(false);
  }

  async function publishCampaign() {
    if (!draft) return;
    
    let toastId: string | undefined;
    
    try {
      // Get product data from localStorage for campaign creation
      let base: any = {};
      try { base = JSON.parse(localStorage.getItem('adpatterns_last_payload') || '{}'); } catch(e){}
      
      // Get selected platform
      let selectedPlatform = 'meta';
      try { 
        const platform = localStorage.getItem('adpatterns_selected_platform') || 'Meta';
        selectedPlatform = platform.toLowerCase();
      } catch(e){}

      // Get auth token
      const token = localStorage.getItem('adpatterns_auth_token');
      if (!token) {
        toast.error('Please login first to publish campaigns');
        return;
      }

      toastId = toast.loading('Publishing campaign...');

      // First, create the campaign in the database
      const createResponse = await fetch(`${API_URL}/api/campaigns`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: draft.campaignName || 'Untitled Campaign',
          platform: selectedPlatform,
          objective: 'sales',
          budget: draft.budget || 100,
          budget_type: 'daily',
          start_date: new Date().toISOString(),
          end_date: draft.endDate || null,
          ad_account_id: 'default-account', // TODO: Get from selected ad account
          status: 'draft',
          targeting: {
            age_min: draft.adset?.ageMin || 18,
            age_max: draft.adset?.ageMax || 65,
            gender: base.gender || 'All',
            locations: draft.adset?.locations || [],
            interests: draft.adset?.keywords || []
          },
          ad_creative: {
            headline: draft.creative?.headline || '',
            description: draft.creative?.description || '',
            cta: draft.creative?.cta || 'Learn More',
            image_url: draft.creative?.imageUrl || '',
            link_url: draft.creative?.linkUrl || ''
          }
        })
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to create campaign');
      }

      const createdCampaign = await createResponse.json();
      const campaignId = createdCampaign.id || createdCampaign._id;

      // Then publish the campaign
      const publishResponse = await fetch(`${API_URL}/api/campaigns/${campaignId}/publish`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!publishResponse.ok) {
        const errorData = await publishResponse.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to publish campaign');
      }

      // Success!
      toast.success(
        'Campaign Published Successfully! Your campaign has been submitted and will be reviewed shortly.',
        { id: toastId, duration: 5000 }
      );
      
      // Redirect to ads dashboard after a short delay
      setTimeout(() => {
        router.push('/ads-dashboard');
      }, 1500);
      
    } catch (error: any) {
      console.error('Error publishing campaign:', error);
      toast.error(
        error.message || 'An unexpected error occurred. Please try again.',
        { id: toastId }
      );
    }
  }

  if (!draft) return (
    <>
      <Toaster position="top-right" />
      <div className="cr-empty">
        No generated campaign found. Generate a campaign first.
      </div>
    </>
  );

  return (
    <>
      <Toaster position="top-right" />
      <div className="cr-root">
      {/* Header */}
      <div className="cr-header">
        <div className="cr-header-left">
          <h1 className="cr-title">Review Your Campaign</h1>
          <p className="cr-subtitle">Edit, regenerate, or approve before publishing</p>
        </div>
        <div className="cr-header-actions">
          <button className="cr-btn cr-btn--view" onClick={() => router.push('/demo-campaign')}>
            <FontAwesomeIcon icon={faEye} /> View Preview
          </button>
          <button className="cr-btn cr-btn--regen" onClick={regenerateAll} disabled={isRegenerating}>
            <FontAwesomeIcon icon={faRotate} spin={isRegenerating} /> {isRegenerating ? 'Regenerating...' : 'Regenerate All'}
          </button>
          <button className="cr-btn cr-btn--publish" onClick={publishCampaign}>
            <FontAwesomeIcon icon={faBullhorn} /> Publish Campaign
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="cr-body">
        {/* Left Column - Details */}
        <div className="cr-left">
          <CampaignMeta meta={draft} onEdit={(m:any)=>save({...draft, ...m})} />
          <AdSetDetails adset={draft.adset} onChange={(a:any)=>save({...draft, adset: a})} />
          <AdCreative key={resetKey} creative={draft.creative} onChange={(c:any)=>save({...draft, creative: c})} />
        </div>

        {/* Right Column - Preview */}
        <aside className="cr-right">
          <AdPreview creative={draft.creative} campaignName={draft.campaignName} />
        </aside>
      </div>
      </div>
    </>
  );
}
