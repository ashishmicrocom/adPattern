"use client";

import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faImage, faThumbsUp, faComment, faShare, faCircleInfo, faDesktop, faMobileAlt, faTabletAlt, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./AdPreview.css";

type Props = { creative: any; campaignName?: string };

export default function AdPreview({ creative, campaignName }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = () => {
    setShowDropdown(false);
    alert('Delete functionality will be implemented');
  };

  const handlePreviewAllDevices = () => {
    setShowDropdown(false);
    setShowPreviewModal(true);
  };
  return (
    <div className="apv-root">
      <div className="apv-header">
        <h3 className="apv-title">Ad Preview</h3>
        <p className="apv-subtitle">How your ad will appear on Meta platforms</p>
      </div>

      <div className="apv-card">
        {/* Meta Post Header */}
        <div className="apv-post-header">
          <div className="apv-avatar">T</div>
          <div className="apv-post-info">
            <div className="apv-post-name">{campaignName || 'TechGadget Pro'}</div>
            <div className="apv-post-meta">Sponsored</div>
          </div>
          <div className="apv-dropdown-wrapper" ref={dropdownRef}>
            <button 
              className="apv-more-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            {showDropdown && (
              <div className="apv-dropdown-menu">
                <button className="apv-dropdown-item" onClick={handlePreviewAllDevices}>
                  <FontAwesomeIcon icon={faDesktop} />
                  <span>Preview All Devices</span>
                </button>
                <button className="apv-dropdown-item apv-dropdown-item--danger" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Ad Image */}
        <div className="apv-image-wrap">
          {creative?.image ? (
            <img src={creative.image} alt="ad preview" className="apv-image" />
          ) : (
            <div className="apv-placeholder">
              <span className="apv-placeholder-icon"><FontAwesomeIcon icon={faImage} /></span>
              <span className="apv-placeholder-text">AI-generated image will appear here</span>
            </div>
          )}
        </div>

        {/* Ad Content */}
        <div className="apv-content">
          <div className="apv-text">
            <div className="apv-headline">{creative?.headline || 'Your headline will appear here'}</div>
            <div className="apv-description">{creative?.description || 'Your description will appear here with more details about your product or service.'}</div>
          </div>

          <div className="apv-cta-wrap">
            <button className="apv-cta">{creative?.cta || 'Shop Now'}</button>
          </div>
        </div>

        {/* Engagement Section */}
        <div className="apv-engagement">
          <button className="apv-eng-btn"><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
          <button className="apv-eng-btn"><FontAwesomeIcon icon={faComment} /> Comment</button>
          <button className="apv-eng-btn"><FontAwesomeIcon icon={faShare} /> Share</button>
        </div>

        {/* Preview Note */}
        <div className="apv-note">
          <span className="apv-note-icon"><FontAwesomeIcon icon={faCircleInfo} /></span>
          <span>Preview updates automatically as you edit</span>
        </div>
      </div>

      {/* Preview All Devices Modal */}
      {showPreviewModal && (
        <div className="apv-modal-overlay" onClick={() => setShowPreviewModal(false)}>
          <div className="apv-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="apv-modal-header">
              <h2 className="apv-modal-title">Preview Across All Devices & Platforms</h2>
              <button className="apv-modal-close" onClick={() => setShowPreviewModal(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="apv-modal-body">
              {/* Facebook Feed - Desktop */}
              <div className="apv-preview-section">
                <div className="apv-preview-header">
                  <FontAwesomeIcon icon={faDesktop} className="apv-preview-icon" />
                  <div>
                    <h3 className="apv-preview-title">Facebook Feed - Desktop</h3>
                    <p className="apv-preview-subtitle">How your ad appears in Facebook news feed on desktop</p>
                  </div>
                </div>
                <div className="apv-device-frame apv-device-desktop">
                  <div className="apv-device-content">
                    <div className="apv-feed-post">
                      <div className="apv-post-header">
                        <div className="apv-avatar">T</div>
                        <div className="apv-post-info">
                          <div className="apv-post-name">{campaignName || 'TechGadget Pro'}</div>
                          <div className="apv-post-meta">Sponsored</div>
                        </div>
                      </div>
                      {creative?.image && (
                        <img src={creative.image} alt="ad preview" className="apv-feed-image" />
                      )}
                      <div className="apv-feed-content">
                        <div className="apv-headline">{creative?.headline || 'Your headline will appear here'}</div>
                        <div className="apv-description">{creative?.description || 'Your description will appear here'}</div>
                        <button className="apv-cta">{creative?.cta || 'Shop Now'}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facebook Feed - Mobile */}
              <div className="apv-preview-section">
                <div className="apv-preview-header">
                  <FontAwesomeIcon icon={faMobileAlt} className="apv-preview-icon" />
                  <div>
                    <h3 className="apv-preview-title">Facebook Feed - Mobile</h3>
                    <p className="apv-preview-subtitle">Mobile view in Facebook feed</p>
                  </div>
                </div>
                <div className="apv-device-frame apv-device-mobile">
                  <div className="apv-device-content">
                    <div className="apv-feed-post">
                      <div className="apv-post-header">
                        <div className="apv-avatar-sm">T</div>
                        <div className="apv-post-info">
                          <div className="apv-post-name-sm">{campaignName || 'TechGadget Pro'}</div>
                          <div className="apv-post-meta-sm">Sponsored</div>
                        </div>
                      </div>
                      {creative?.image && (
                        <img src={creative.image} alt="ad preview" className="apv-feed-image" />
                      )}
                      <div className="apv-feed-content-sm">
                        <div className="apv-headline-sm">{creative?.headline || 'Your headline will appear here'}</div>
                        <div className="apv-description-sm">{creative?.description || 'Your description will appear here'}</div>
                        <button className="apv-cta-sm">{creative?.cta || 'Shop Now'}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram Feed */}
              <div className="apv-preview-section">
                <div className="apv-preview-header">
                  <FontAwesomeIcon icon={faMobileAlt} className="apv-preview-icon" />
                  <div>
                    <h3 className="apv-preview-title">Instagram Feed</h3>
                    <p className="apv-preview-subtitle">How your ad appears in Instagram feed</p>
                  </div>
                </div>
                <div className="apv-device-frame apv-device-mobile apv-device-instagram">
                  <div className="apv-device-content">
                    <div className="apv-insta-post">
                      <div className="apv-insta-header">
                        <div className="apv-avatar-sm">T</div>
                        <div className="apv-post-name-sm">{campaignName || 'TechGadget Pro'}</div>
                        <span className="apv-insta-badge">Sponsored</span>
                      </div>
                      {creative?.image && (
                        <img src={creative.image} alt="ad preview" className="apv-insta-image" />
                      )}
                      <div className="apv-insta-actions">
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <FontAwesomeIcon icon={faComment} />
                        <FontAwesomeIcon icon={faShare} />
                      </div>
                      <div className="apv-insta-content">
                        <span className="apv-insta-name">{campaignName || 'TechGadget Pro'}</span>
                        <span className="apv-insta-text">{creative?.headline || 'Your headline will appear here'}</span>
                      </div>
                      <button className="apv-insta-cta">{creative?.cta || 'Shop Now'}</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram Stories */}
              <div className="apv-preview-section">
                <div className="apv-preview-header">
                  <FontAwesomeIcon icon={faMobileAlt} className="apv-preview-icon" />
                  <div>
                    <h3 className="apv-preview-title">Instagram Stories</h3>
                    <p className="apv-preview-subtitle">Full-screen story ad format</p>
                  </div>
                </div>
                <div className="apv-device-frame apv-device-mobile apv-device-story">
                  <div className="apv-device-content apv-story-content">
                    {creative?.image && (
                      <img src={creative.image} alt="story ad" className="apv-story-image" />
                    )}
                    <div className="apv-story-overlay">
                      <div className="apv-story-header">
                        <div className="apv-avatar-xs">T</div>
                        <div className="apv-story-name">{campaignName || 'TechGadget Pro'}</div>
                        <span className="apv-story-badge">Sponsored</span>
                      </div>
                      <div className="apv-story-cta">
                        <button className="apv-story-btn">{creative?.cta || 'Shop Now'}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram Reels */}
              <div className="apv-preview-section">
                <div className="apv-preview-header">
                  <FontAwesomeIcon icon={faMobileAlt} className="apv-preview-icon" />
                  <div>
                    <h3 className="apv-preview-title">Instagram Reels</h3>
                    <p className="apv-preview-subtitle">Short-form video ad in Reels feed</p>
                  </div>
                </div>
                <div className="apv-device-frame apv-device-mobile apv-device-reels">
                  <div className="apv-device-content apv-reels-content">
                    {creative?.image && (
                      <img src={creative.image} alt="reels ad" className="apv-reels-image" />
                    )}
                    <div className="apv-reels-overlay">
                      <div className="apv-reels-side">
                        <div className="apv-reels-icon"><FontAwesomeIcon icon={faThumbsUp} /></div>
                        <div className="apv-reels-icon"><FontAwesomeIcon icon={faComment} /></div>
                        <div className="apv-reels-icon"><FontAwesomeIcon icon={faShare} /></div>
                      </div>
                      <div className="apv-reels-bottom">
                        <div className="apv-reels-info">
                          <div className="apv-reels-name">{campaignName || 'TechGadget Pro'}</div>
                          <div className="apv-reels-text">{creative?.headline || 'Your headline'}</div>
                        </div>
                        <button className="apv-reels-cta">{creative?.cta || 'Shop Now'}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facebook Right Column - Desktop */}
              <div className="apv-preview-section">
                <div className="apv-preview-header">
                  <FontAwesomeIcon icon={faDesktop} className="apv-preview-icon" />
                  <div>
                    <h3 className="apv-preview-title">Facebook Right Column - Desktop</h3>
                    <p className="apv-preview-subtitle">Sidebar ad placement on desktop</p>
                  </div>
                </div>
                <div className="apv-device-frame apv-device-sidebar">
                  <div className="apv-device-content">
                    <div className="apv-sidebar-ad">
                      <div className="apv-sidebar-sponsored">Sponsored</div>
                      {creative?.image && (
                        <img src={creative.image} alt="sidebar ad" className="apv-sidebar-image" />
                      )}
                      <div className="apv-sidebar-content">
                        <div className="apv-sidebar-headline">{creative?.headline || 'Your headline'}</div>
                        <div className="apv-sidebar-description">{creative?.description?.substring(0, 80) || 'Your description'}...</div>
                        <button className="apv-sidebar-cta">{creative?.cta || 'Shop Now'}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messenger Inbox */}
              <div className="apv-preview-section">
                <div className="apv-preview-header">
                  <FontAwesomeIcon icon={faMobileAlt} className="apv-preview-icon" />
                  <div>
                    <h3 className="apv-preview-title">Messenger Sponsored Message</h3>
                    <p className="apv-preview-subtitle">Ad in Messenger inbox</p>
                  </div>
                </div>
                <div className="apv-device-frame apv-device-mobile">
                  <div className="apv-device-content apv-messenger-content">
                    <div className="apv-messenger-ad">
                      <div className="apv-messenger-header">
                        <div className="apv-avatar-sm">T</div>
                        <div>
                          <div className="apv-messenger-name">{campaignName || 'TechGadget Pro'}</div>
                          <div className="apv-messenger-badge">Sponsored</div>
                        </div>
                      </div>
                      {creative?.image && (
                        <img src={creative.image} alt="messenger ad" className="apv-messenger-image" />
                      )}
                      <div className="apv-messenger-text">
                        <div className="apv-messenger-headline">{creative?.headline || 'Your headline'}</div>
                        <div className="apv-messenger-desc">{creative?.description || 'Your description'}</div>
                      </div>
                      <button className="apv-messenger-cta">{creative?.cta || 'Shop Now'}</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tablet View */}
              <div className="apv-preview-section">
                <div className="apv-preview-header">
                  <FontAwesomeIcon icon={faTabletAlt} className="apv-preview-icon" />
                  <div>
                    <h3 className="apv-preview-title">Tablet View - Facebook Feed</h3>
                    <p className="apv-preview-subtitle">How your ad appears on tablet devices</p>
                  </div>
                </div>
                <div className="apv-device-frame apv-device-tablet">
                  <div className="apv-device-content">
                    <div className="apv-feed-post">
                      <div className="apv-post-header">
                        <div className="apv-avatar">T</div>
                        <div className="apv-post-info">
                          <div className="apv-post-name">{campaignName || 'TechGadget Pro'}</div>
                          <div className="apv-post-meta">Sponsored</div>
                        </div>
                      </div>
                      {creative?.image && (
                        <img src={creative.image} alt="ad preview" className="apv-feed-image" />
                      )}
                      <div className="apv-feed-content">
                        <div className="apv-headline">{creative?.headline || 'Your headline will appear here'}</div>
                        <div className="apv-description">{creative?.description || 'Your description will appear here'}</div>
                        <button className="apv-cta">{creative?.cta || 'Shop Now'}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
