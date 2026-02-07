"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles, faPenToSquare, faRotate, faImage, faUpload } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "@/lib/api";
import "./AdCreative.css";

type Props = { creative: any; onChange: (c:any)=>void };

export default function AdCreative({ creative, onChange }: Props) {
  const [local, setLocal] = useState<any>(creative || {});
  const [isEditingHeadline, setIsEditingHeadline] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [modelSuggestions, setModelSuggestions] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [headlineOptions, setHeadlineOptions] = useState<string[]>([]);
  const [descriptionOptions, setDescriptionOptions] = useState<string[]>([]);
  const [usedHeadlines, setUsedHeadlines] = useState<Set<string>>(new Set());
  const [usedDescriptions, setUsedDescriptions] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{message: string; type: 'info' | 'warning' | 'success'} | null>(null);

  function update(changes: any) {
    const next = { ...local, ...changes };
    setLocal(next);
    onChange(next);
  }

  const showToast = (message: string, type: 'info' | 'warning' | 'success' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  async function fetchModelSuggestions() {
    setLoading(true);
    try {
      let base: any = {};
      try { base = JSON.parse(localStorage.getItem('adpatterns_last_payload') || '{}'); } catch(e){}
      
      let selectedPlatform = 'Meta';
      try { 
        selectedPlatform = localStorage.getItem('adpatterns_selected_platform') || 'Meta'; 
      } catch(e){}

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
        const data = await response.json();
        setModelSuggestions(data);
      }
    } catch (error) {
      console.error('Error fetching model suggestions:', error);
    }
    setLoading(false);
  }

  function regenerateHeadline() {
    if (!modelSuggestions?.headlines?.length) {
      fetchModelSuggestions().then(() => {
        if (modelSuggestions?.headlines?.length) {
          // Filter out already used headlines
          const availableHeadlines = modelSuggestions.headlines.filter(
            (h: string) => !usedHeadlines.has(h)
          );
          
          if (availableHeadlines.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableHeadlines.length);
            const newHeadline = availableHeadlines[randomIndex];
            
            // Add to options list and mark as used
            setHeadlineOptions(prev => [...prev, newHeadline]);
            setUsedHeadlines(prev => new Set([...prev, newHeadline]));
          } else {
            showToast('All available headlines have been shown. Please fetch new suggestions or edit manually.', 'warning');
          }
        }
      });
    } else {
      // Filter out already used headlines
      const availableHeadlines = modelSuggestions.headlines.filter(
        (h: string) => !usedHeadlines.has(h)
      );
      
      if (availableHeadlines.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableHeadlines.length);
        const newHeadline = availableHeadlines[randomIndex];
        
        // Add to options list and mark as used
        setHeadlineOptions(prev => [...prev, newHeadline]);
        setUsedHeadlines(prev => new Set([...prev, newHeadline]));
      } else {
        showToast('All available headlines have been shown. Please fetch new suggestions or edit manually.', 'warning');
      }
    }
  }

  function regenerateDescription() {
    if (!modelSuggestions?.descriptions?.length) {
      fetchModelSuggestions().then(() => {
        if (modelSuggestions?.descriptions?.length >= 2) {
          generateNewDescription();
        }
      });
    } else {
      generateNewDescription();
    }
  }

  function generateNewDescription() {
    // Create combined descriptions that haven't been used
    const availableDescriptions = modelSuggestions.descriptions.filter(
      (d: string) => !usedDescriptions.has(d)
    );
    
    if (availableDescriptions.length >= 2) {
      const idx1 = Math.floor(Math.random() * availableDescriptions.length);
      let idx2 = Math.floor(Math.random() * availableDescriptions.length);
      while (idx2 === idx1 && availableDescriptions.length > 1) {
        idx2 = Math.floor(Math.random() * availableDescriptions.length);
      }
      
      const newDescription = `${availableDescriptions[idx1]} ${availableDescriptions[idx2]}`;
      
      // Add to options list and mark both as used
      setDescriptionOptions(prev => [...prev, newDescription]);
      setUsedDescriptions(prev => new Set([...prev, availableDescriptions[idx1], availableDescriptions[idx2]]));
    } else if (availableDescriptions.length === 1) {
      const newDescription = availableDescriptions[0];
      setDescriptionOptions(prev => [...prev, newDescription]);
      setUsedDescriptions(prev => new Set([...prev, availableDescriptions[0]]));
    } else {
      showToast('All available descriptions have been shown. Please fetch new suggestions or edit manually.', 'warning');
    }
  }

  function selectHeadline(headline: string) {
    update({ headline });
  }

  function selectDescription(description: string) {
    update({ description });
  }

  function simulateImage() {
    update({ image: 'https://via.placeholder.com/600x314.png?text=AI+Generated+Image' });
  }

  return (
    <div className="ac-card">
      <div className="ac-header">
        <div className="ac-header-left">
          <span className="ac-icon"><FontAwesomeIcon icon={faWandMagicSparkles} /></span>
          <h3 className="ac-title">Ad Creative</h3>
        </div>
        <span className="ac-badge">Editable</span>
      </div>

      <div className="ac-grid">
        <div className="ac-field ac-field-full">
          <div className="ac-label-row">
            <label className="ac-label">Headline</label>
            <div className="ac-btn-group">
              <button 
                className={`ac-regen-btn ${isEditingHeadline ? 'ac-regen-btn--active' : ''}`}
                onClick={() => setIsEditingHeadline(!isEditingHeadline)}
              >
                <FontAwesomeIcon icon={faPenToSquare} /> Edit
              </button>
              <button className="ac-regen-btn" onClick={regenerateHeadline}>
                <FontAwesomeIcon icon={faRotate} /> Regenerate
              </button>
            </div>
          </div>
          <input 
            className="ac-input" 
            value={local.headline || ''} 
            onChange={(e)=>update({ headline: e.target.value })}
            placeholder="Enter headline..."
            disabled={!isEditingHeadline}
            readOnly={!isEditingHeadline}
          />
          
          {/* Generated headline options */}
          {headlineOptions.length > 0 && (
            <div className="ac-options">
              <div className="ac-options-label">Generated Headlines (Click to use):</div>
              {headlineOptions.map((headline, idx) => (
                <div 
                  key={idx} 
                  className={`ac-option ${local.headline === headline ? 'ac-option--selected' : ''}`}
                  onClick={() => selectHeadline(headline)}
                >
                  {headline}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="ac-field ac-field-full">
          <div className="ac-label-row">
            <label className="ac-label">Description</label>
            <div className="ac-btn-group">
              <button 
                className={`ac-regen-btn ${isEditingDescription ? 'ac-regen-btn--active' : ''}`}
                onClick={() => setIsEditingDescription(!isEditingDescription)}
              >
                <FontAwesomeIcon icon={faPenToSquare} /> Edit
              </button>
              <button className="ac-regen-btn" onClick={regenerateDescription}>
                <FontAwesomeIcon icon={faRotate} /> Regenerate
              </button>
            </div>
          </div>
          <textarea 
            className="ac-textarea" 
            value={local.description || ''} 
            onChange={(e)=>update({ description: e.target.value })}
            rows={4}
            placeholder="Enter description..."
            disabled={!isEditingDescription}
            readOnly={!isEditingDescription}
          />
          
          {/* Generated description options */}
          {descriptionOptions.length > 0 && (
            <div className="ac-options">
              <div className="ac-options-label">Generated Descriptions (Click to use):</div>
              {descriptionOptions.map((description, idx) => (
                <div 
                  key={idx} 
                  className={`ac-option ${local.description === description ? 'ac-option--selected' : ''}`}
                  onClick={() => selectDescription(description)}
                >
                  {description}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="ac-field">
          <label className="ac-label">Call to Action</label>
          <div className="ac-cta-group">
            {['Shop Now', 'Learn More', 'Sign Up', 'Get Offer', 'Contact Us', 'Book Now'].map((cta) => (
              <button
                key={cta}
                className={`ac-cta-btn ${local.cta === cta ? 'ac-cta-btn--active' : ''}`}
                onClick={() => update({ cta })}
              >
                {cta}
              </button>
            ))}
          </div>
        </div>

        <div className="ac-field ac-field-full">
          <label className="ac-label">Ad Image</label>
          <div className="ac-image-grid">
            <div className="ac-image-box">
              {local.image ? (
                <img src={local.image} alt="ad creative" className="ac-image" />
              ) : (
                <div className="ac-image-placeholder">
                  <span className="ac-placeholder-icon"><FontAwesomeIcon icon={faImage} /></span>
                  <span className="ac-placeholder-text">AI-generated image will appear here</span>
                </div>
              )}
            </div>
            <div className="ac-image-box">
              <div className="ac-image-placeholder">
                <button className="ac-upload-btn" onClick={()=>document.getElementById('ac-upload')?.click()}>
                  <FontAwesomeIcon icon={faUpload} /> Upload
                </button>
                <input 
                  id="ac-upload" 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={(e)=>{ 
                    const f = (e.target as HTMLInputElement).files?.[0]; 
                    if(f){ 
                      const url = URL.createObjectURL(f); 
                      update({ image: url }); 
                    } 
                  }} 
                />
              </div>
            </div>
            <div className="ac-image-box">
              <div className="ac-image-placeholder ac-image-placeholder--clickable" onClick={simulateImage}>
                <span className="ac-placeholder-icon"><FontAwesomeIcon icon={faRotate} /></span>
                <span className="ac-placeholder-text">Regenerate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {toast && (
        <div className={`ac-toast ac-toast--${toast.type}`}>
          <span className="ac-toast-icon">
            {toast.type === 'warning' && '⚠️'}
            {toast.type === 'success' && '✓'}
            {toast.type === 'info' && 'ℹ️'}
          </span>
          <span className="ac-toast-message">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
