"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faDollarSign, faLocationDot, faBullseye, faUsers, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import "./SummaryCard.css";

type Payload = { 
  name?: string; 
  category?: string; 
  description?: string;
  price?: string;
  priceMin?: string;
  priceMax?: string;
  location?: string; 
  target?: string;
  productType?: string;
  ageMin?: string;
  ageMax?: string;
  gender?: string;
};

export default function SummaryCard({}: {}) {
  const [data, setData] = useState<Payload>({});
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState<Payload>({});
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('adpatterns_last_payload');
      if (raw) {
        const parsed = JSON.parse(raw);
        setData(parsed);
        setLocal(parsed);
      }
    } catch (err) {
      // ignore
    }
  }, []);

  function save() {
    setData(local);
    setEditing(false);
    try { localStorage.setItem('adpatterns_last_payload', JSON.stringify(local)); } catch(e){}
  }
  
  function createCampaign() {
    // Navigate to the guided Create Campaign flow
    router.push('/create-campaign');
  }

  return (
    <div className="sc-card">
      <div className="sc-header">
        <div className="sc-header-left">
          <h2 className="sc-title">Your Product</h2>
          <p className="sc-subtitle">The foundation for all your ad campaigns</p>
        </div>
        <button className="sc-edit-btn" onClick={() => setEditing(!editing)}>
          <FontAwesomeIcon icon={faPenToSquare} /> {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="sc-content">
        {/* Product Icon and Name */}
        <div className="sc-product-header">
          <div className="sc-icon">{data.name ? data.name.charAt(0).toUpperCase() : "P"}</div>
          <div className="sc-product-info">
            {editing ? (
              <input 
                className="sc-input-inline" 
                value={local.name || ''} 
                onChange={(e)=>setLocal({...local, name: e.target.value})}
                placeholder="Product Name"
              />
            ) : (
              <h3 className="sc-product-name">{data.name || 'Untitled Product'}</h3>
            )}
            {editing ? (
              <input 
                className="sc-input-inline sc-input-small" 
                value={local.category || ''} 
                onChange={(e)=>setLocal({...local, category: e.target.value})}
                placeholder="Category"
              />
            ) : (
              <p className="sc-product-category">{data.category || 'No Category'}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="sc-description">
          {editing ? (
            <textarea 
              className="sc-textarea" 
              value={local.description || ''} 
              onChange={(e)=>setLocal({...local, description: e.target.value})}
              placeholder="Product description..."
              rows={3}
            />
          ) : (
            <p>{data.description || 'A revolutionary product that combines multiple features in one sleek package.'}</p>
          )}
        </div>

        {/* Metadata Grid */}
        <div className="sc-meta-grid">
          <div className="sc-meta-item">
            <span className="sc-meta-icon"><FontAwesomeIcon icon={faDollarSign} /></span>
            <div>
              <div className="sc-meta-label">Price:</div>
              {editing ? (
                <>
                  <input 
                    className="sc-input-inline sc-input-small" 
                    value={local.price || ''} 
                    onChange={(e)=>setLocal({...local, price: e.target.value, priceMin: '', priceMax: ''})}
                    placeholder="Single price"
                  />
                  <div style={{fontSize: '11px', color: '#666', marginTop: '4px'}}>Or range:</div>
                  <div style={{display: 'flex', gap: '8px', marginTop: '4px'}}>
                    <input 
                      className="sc-input-inline sc-input-small" 
                      style={{width: '80px'}}
                      value={local.priceMin || ''} 
                      onChange={(e)=>setLocal({...local, priceMin: e.target.value, price: ''})}
                      placeholder="Min"
                    />
                    <input 
                      className="sc-input-inline sc-input-small" 
                      style={{width: '80px'}}
                      value={local.priceMax || ''} 
                      onChange={(e)=>setLocal({...local, priceMax: e.target.value, price: ''})}
                      placeholder="Max"
                    />
                  </div>
                </>
              ) : (
                <div className="sc-meta-value">
                  {data.price ? `₹${data.price}` : 
                   data.priceMin && data.priceMax ? `₹${data.priceMin} - ₹${data.priceMax}` : 
                   'Not specified'}
                </div>
              )}
            </div>
          </div>

          <div className="sc-meta-item">
            <span className="sc-meta-icon"><FontAwesomeIcon icon={faLocationDot} /></span>
            <div>
              <div className="sc-meta-label">Location:</div>
              {editing ? (
                <input 
                  className="sc-input-inline sc-input-small" 
                  value={local.location || ''} 
                  onChange={(e)=>setLocal({...local, location: e.target.value})}
                  placeholder="United States"
                />
              ) : (
                <div className="sc-meta-value">{data.location || 'Not specified'}</div>
              )}
            </div>
          </div>

          <div className="sc-meta-item">
            <span className="sc-meta-icon"><FontAwesomeIcon icon={faUsers} /></span>
            <div>
              <div className="sc-meta-label">Age Range:</div>
              {editing ? (
                <div style={{display: 'flex', gap: '8px'}}>
                  <input 
                    className="sc-input-inline sc-input-small" 
                    style={{width: '60px'}}
                    type="number"
                    value={local.ageMin || ''} 
                    onChange={(e)=>setLocal({...local, ageMin: e.target.value})}
                    placeholder="Min"
                  />
                  <input 
                    className="sc-input-inline sc-input-small" 
                    style={{width: '60px'}}
                    type="number"
                    value={local.ageMax || ''} 
                    onChange={(e)=>setLocal({...local, ageMax: e.target.value})}
                    placeholder="Max"
                  />
                </div>
              ) : (
                <div className="sc-meta-value">
                  {data.ageMin && data.ageMax ? `${data.ageMin} - ${data.ageMax} years` : 'Not specified'}
                </div>
              )}
            </div>
          </div>

          <div className="sc-meta-item">
            <span className="sc-meta-icon"><FontAwesomeIcon icon={faVenusMars} /></span>
            <div>
              <div className="sc-meta-label">Gender:</div>
              {editing ? (
                <select 
                  className="sc-input-inline sc-input-small" 
                  value={local.gender || 'Male'} 
                  onChange={(e)=>setLocal({...local, gender: e.target.value})}
                  style={{padding: '4px 8px', borderRadius: '4px', border: '1px solid #3a3a3a', background: '#1a1a1a', color: '#fff'}}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <div className="sc-meta-value">{data.gender || 'Male'}</div>
              )}
            </div>
          </div>

          <div className="sc-meta-item sc-meta-item-full">
            <span className="sc-meta-icon"><FontAwesomeIcon icon={faBullseye} /></span>
            <div>
              <div className="sc-meta-label">Audience:</div>
              {editing ? (
                <input 
                  className="sc-input-inline sc-input-small" 
                  value={local.target || ''} 
                  onChange={(e)=>setLocal({...local, target: e.target.value})}
                  placeholder="Tech-savvy professionals aged 25-45"
                />
              ) : (
                <div className="sc-meta-value">{data.target || 'Not specified'}</div>
              )}
            </div>
          </div>
        </div>

        {editing && (
          <button className="sc-save-btn" onClick={save}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}
