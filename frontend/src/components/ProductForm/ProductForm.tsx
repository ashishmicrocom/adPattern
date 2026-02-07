"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "@/lib/api";
import "./ProductForm.css";

// Jaipur Areas from Model (matching notebook exactly)
const JAIPUR_AREAS = [
  "Malviya Nagar","Vaishali Nagar","Mansarovar","Jagatpura","Pratap Nagar",
  "C Scheme","Civil Lines","Raja Park","Sanganer","Ajmer Road","Bapu Nagar",
  "Sodala","Durgapura","Gopalpura","Jhotwara","Bani Park","Shyam Nagar",
  "Tonk Road","Vidhyadhar Nagar","Nirman Nagar","Ambabari","Sirsi Road",
  "Mahesh Nagar","Lal Kothi","Transport Nagar","Sitapura","Chitrakoot",
  "Hasanpura","Patrakar Colony","Adarsh Nagar","Subhash Nagar","Brahmpuri",
  "Tilak Nagar","Shastri Nagar","Khatipura","Murlipura","Kalwar Road",
  "Harmada","Bhankrota","Mahapura","Sirsi Extension","Kukas","Amer Road",
  "Kanota","Achrol","Bagru","Phagi","Chaksu","Jobner Road","Bindayaka",
  "Vatika","Beelwa","Agra Road","Jamwa Ramgarh","Gandhi Path","Queens Road",
  "New Sanganer Road","Gopalpura Bypass","Triveni Nagar","SFS Mansarovar",
  "Heerapura","Kartarpura","Barkat Nagar"
];

// Progress Steps Component
interface Step {
  label: string;
  component: React.ComponentType<StepProps>;
  validationFields: string[];
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="pf-progress-wrapper">
      <div className="pf-progress-steps">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            {/* Step circle */}
            <div className="pf-step-item">
              <div
                className={`pf-step-circle ${
                  i < currentStep
                    ? "pf-step-circle--complete"
                    : i === currentStep
                    ? "pf-step-circle--active"
                    : "pf-step-circle--inactive"
                }`}
              >
                {i < currentStep ? (
                  <FontAwesomeIcon icon={faCheck} className="pf-step-check" />
                ) : (
                  <span className="pf-step-number">{i + 1}</span>
                )}
              </div>
              
              {/* Step label */}
              <div className="pf-step-label-wrapper">
                <span 
                  className={`pf-step-label ${
                    i <= currentStep ? 'pf-step-label--active' : 'pf-step-label--inactive'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div 
                className={`pf-step-connector ${
                  i < currentStep ? "pf-step-connector--complete" : "pf-step-connector--inactive"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Step Props Interface
interface StepProps {
  formData: Record<string, string>;
  updateFormData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  errors: Record<string, string>;
}

// Step 1: Product/Service Information
const ProductInfoStep: React.FC<StepProps> = ({ formData, updateFormData, errors }) => (
  <div className="pf-step-content">
    <div className="pf-field">
      <label htmlFor="productType" className="pf-label-new">
        What are you advertising?
      </label>
      <input
        type="text"
        id="productType"
        name="productType"
        value="Product"
        readOnly
        className="pf-input-new pf-input-readonly"
      />
      {errors.productType && <p className="pf-error-text">{errors.productType}</p>}
    </div>
    
    <div className="pf-field">
      <label htmlFor="name" className="pf-label-new">
        Enter Your Product Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name || ''}
        onChange={updateFormData}
        className={`pf-input-new ${errors.name ? 'pf-input-error' : ''}`}
        placeholder="e.g. QuickClean Laundry Service"
      />
      {errors.name && <p className="pf-error-text">{errors.name}</p>}
    </div>
    
    <div className="pf-field">
      <label htmlFor="category" className="pf-label-new">
        Category
      </label>
      <input
        type="text"
        id="category"
        name="category"
        value="Clothing"
        readOnly
        className="pf-input-new pf-input-readonly"
      />
    </div>
  </div>
);

// Step 2: Description & Details
const DescriptionStep: React.FC<StepProps> = ({ formData, updateFormData, errors }) => (
  <div className="pf-step-content">
    <div className="pf-field">
      <label htmlFor="description" className="pf-label-new">
        Enter Your Product Description
      </label>
      <textarea
        id="description"
        name="description"
        value={formData.description || ''}
        onChange={updateFormData}
        className={`pf-textarea-new ${errors.description ? 'pf-input-error' : ''}`}
        placeholder="Describe what you offer in simple words. Keep it short — 2-3 lines."
        maxLength={280}
        rows={4}
      />
      {errors.description && <p className="pf-error-text">{errors.description}</p>}
      <p className="pf-field-hint">{formData.description?.length || 0} / 280 characters</p>
    </div>
    
    <div className="pf-field">
      <label htmlFor="price" className="pf-label-new">
        Price
      </label>
      <input
        type="text"
        id="price"
        name="price"
        value={formData.price || ''}
        onChange={updateFormData}
        disabled={!!formData.priceMin || !!formData.priceMax}
        className={`pf-input-new ${errors.price ? 'pf-input-error' : ''} ${(formData.priceMin || formData.priceMax) ? 'pf-input-disabled' : ''}`}
        placeholder="e.g. ₹999"
      />
      {errors.price && <p className="pf-error-text">{errors.price}</p>}
    </div>
    
    <div className="pf-field">
      <label className="pf-label-new">
        Price Range
      </label>
      <div className="pf-field-grid">
        <div className="pf-field">
          <input
            type="text"
            id="priceMin"
            name="priceMin"
            value={formData.priceMin || ''}
            onChange={updateFormData}
            disabled={!!formData.price}
            className={`pf-input-new ${errors.priceMin ? 'pf-input-error' : ''} ${formData.price ? 'pf-input-disabled' : ''}`}
            placeholder="Min ₹"
          />
          {errors.priceMin && <p className="pf-error-text">{errors.priceMin}</p>}
        </div>
        
        <div className="pf-field">
          <input
            type="text"
            id="priceMax"
            name="priceMax"
            value={formData.priceMax || ''}
            onChange={updateFormData}
            disabled={!!formData.price}
            className={`pf-input-new ${errors.priceMax ? 'pf-input-error' : ''} ${formData.price ? 'pf-input-disabled' : ''}`}
            placeholder="Max ₹"
          />
          {errors.priceMax && <p className="pf-error-text">{errors.priceMax}</p>}
        </div>
      </div>
    </div>
  </div>
);

// Step 3: Target Audience & Location
const AudienceStep: React.FC<StepProps> = ({ formData, updateFormData, errors }) => {
  const [locationInput, setLocationInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    formData.location ? formData.location.split(',').map(l => l.trim()) : []
  );
  
  const filteredAreas = locationInput.length > 0
    ? JAIPUR_AREAS.filter(area => 
        area.toLowerCase().includes(locationInput.toLowerCase()) &&
        !selectedLocations.includes(area)
      )
    : [];
  
  const handleLocationSelect = (area: string) => {
    const newLocations = [...selectedLocations, area];
    setSelectedLocations(newLocations);
    
    // Update form data
    const event = {
      target: {
        name: 'location',
        value: newLocations.join(', ')
      }
    } as React.ChangeEvent<HTMLInputElement>;
    updateFormData(event);
    
    setLocationInput('');
    setShowSuggestions(false);
  };
  
  const handleLocationRemove = (area: string) => {
    const newLocations = selectedLocations.filter(loc => loc !== area);
    setSelectedLocations(newLocations);
    
    // Update form data
    const event = {
      target: {
        name: 'location',
        value: newLocations.join(', ')
      }
    } as React.ChangeEvent<HTMLInputElement>;
    updateFormData(event);
  };
  
  return (
    <div className="pf-step-content">
      <div className="pf-field">
        <label htmlFor="location" className="pf-label-new">
          Target Location (Jaipur Areas)
        </label>
        
        {/* Selected locations */}
        {selectedLocations.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '8px',
            padding: '8px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '6px'
          }}>
            {selectedLocations.map((area, idx) => (
              <span key={idx} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                fontSize: '13px',
                color: '#fff'
              }}>
                {area}
                <button
                  type="button"
                  onClick={() => handleLocationRemove(area)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    padding: '0',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        
        {/* Input field with autocomplete */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            id="location"
            value={locationInput}
            onChange={(e) => {
              setLocationInput(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowSuggestions(locationInput.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className={`pf-input-new ${errors.location ? 'pf-input-error' : ''}`}
            placeholder="Type to search Jaipur areas..."
          />
          
          {/* Suggestions dropdown */}
          {showSuggestions && filteredAreas.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              maxHeight: '200px',
              overflowY: 'auto',
              background: '#1a1a1a',
              border: '1px solid #3a3a3a',
              borderRadius: '6px',
              marginTop: '4px',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              {filteredAreas.slice(0, 10).map((area, idx) => (
                <div
                  key={idx}
                  onClick={() => handleLocationSelect(area)}
                  style={{
                    padding: '10px 12px',
                    cursor: 'pointer',
                    borderBottom: idx < filteredAreas.length - 1 ? '1px solid #2a2a2a' : 'none',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {area}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {errors.location && <p className="pf-error-text">{errors.location}</p>}
        <p className="pf-field-hint">Select from {JAIPUR_AREAS.length} available Jaipur areas</p>
      </div>
    
    <div className="pf-field-grid">
      <div className="pf-field">
        <label htmlFor="ageMin" className="pf-label-new">
          Min Age
        </label>
        <input
          type="number"
          id="ageMin"
          name="ageMin"
          value={formData.ageMin || ''}
          onChange={updateFormData}
          className="pf-input-new"
          placeholder="18"
          min="13"
          max="100"
        />
      </div>
      
      <div className="pf-field">
        <label htmlFor="ageMax" className="pf-label-new">
          Max Age
        </label>
        <input
          type="number"
          id="ageMax"
          name="ageMax"
          value={formData.ageMax || ''}
          onChange={updateFormData}
          className="pf-input-new"
          placeholder="65"
          min="13"
          max="100"
        />
      </div>
    </div>
    
    <div className="pf-field">
      <label htmlFor="gender" className="pf-label-new">
        Target Gender
      </label>
      <select
        id="gender"
        name="gender"
        value={formData.gender || 'Male'}
        onChange={updateFormData}
        className="pf-input-new"
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Transgender">Transgender</option>
        <option value="Other">Other</option>
      </select>
    </div>
    
    <div className="pf-field">
      <label htmlFor="target" className="pf-label-new">
        Target Customer Type (Optional)
      </label>
      <input
        type="text"
        id="target"
        name="target"
        value={formData.target || ''}
        onChange={updateFormData}
        className="pf-input-new"
        placeholder="e.g. Students, Working professionals, Parents"
      />
    </div>
  </div>
  );
};

// Step 4: Review
const ReviewStep: React.FC<StepProps> = ({ formData, updateFormData, errors }) => (
  <div className="pf-step-content">
    <div className="pf-review-section pf-review-section--product">
      <h3 className="pf-review-title">Product / Service Information</h3>
      <div className="pf-review-grid">
        <div className="pf-review-item">
          <p className="pf-review-label">Type</p>
          <p className="pf-review-value">{formData.productType || 'Product'}</p>
        </div>
        <div className="pf-review-item">
          <p className="pf-review-label">Name</p>
          <p className="pf-review-value">{formData.name || '—'}</p>
        </div>
        <div className="pf-review-item">
          <p className="pf-review-label">Category</p>
          <p className="pf-review-value">{formData.category || 'Clothing'}</p>
        </div>
      </div>
    </div>
    
    <div className="pf-review-section pf-review-section--description">
      <h3 className="pf-review-title">Description & Pricing</h3>
      <div className="pf-review-grid">
        <div className="pf-review-item pf-review-item--full">
          <p className="pf-review-label">Description</p>
          <p className="pf-review-value">{formData.description || '—'}</p>
        </div>
        {formData.price && (
          <div className="pf-review-item">
            <p className="pf-review-label">Price</p>
            <p className="pf-review-value">{formData.price}</p>
          </div>
        )}
        {(formData.priceMin || formData.priceMax) && (
          <div className="pf-review-item">
            <p className="pf-review-label">Price Range</p>
            <p className="pf-review-value">
              ₹{formData.priceMin || '—'} - ₹{formData.priceMax || '—'}
            </p>
          </div>
        )}
      </div>
    </div>
    
    <div className="pf-review-section pf-review-section--audience">
      <h3 className="pf-review-title">Target Audience</h3>
      <div className="pf-review-grid">
        <div className="pf-review-item pf-review-item--full">
          <p className="pf-review-label">Location</p>
          <p className="pf-review-value">{formData.location || '—'}</p>
        </div>
        <div className="pf-review-item">
          <p className="pf-review-label">Age Range</p>
          <p className="pf-review-value">
            {formData.ageMin || formData.ageMax 
              ? `${formData.ageMin || '—'} - ${formData.ageMax || '—'}` 
              : 'Not specified'}
          </p>
        </div>
        <div className="pf-review-item">
          <p className="pf-review-label">Gender</p>
          <p className="pf-review-value">{formData.gender || 'Male'}</p>
        </div>
        <div className="pf-review-item">
          <p className="pf-review-label">Customer Type</p>
          <p className="pf-review-value">{formData.target || 'Not specified'}</p>
        </div>
      </div>
    </div>
    
    <div className="pf-terms-wrapper">
      <label className="pf-terms-label">
        <input 
          type="checkbox" 
          className="pf-terms-checkbox" 
          id="terms"
          name="termsAccepted"
          checked={formData.termsAccepted === 'true'}
          onChange={(e) => {
            const event = {
              target: {
                name: 'termsAccepted',
                value: e.target.checked ? 'true' : ''
              }
            } as React.ChangeEvent<HTMLInputElement>;
            updateFormData(event);
          }}
        />
        <span className="pf-terms-text">
          I agree to the <a href="/terms" className="pf-terms-link" onClick={(e) => e.preventDefault()}>Terms of Service</a> and <a href="/privacy" className="pf-terms-link" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
        </span>
      </label>
      {errors.termsAccepted && <p className="pf-error-text">{errors.termsAccepted}</p>}
    </div>
  </div>
);

// Step 5: Success
const SuccessStep: React.FC = () => {
  const router = useRouter();
  
  return (
    <div className="pf-success-wrapper">
      <div className="pf-success-icon-wrapper">
        <FontAwesomeIcon icon={faCheck} className="pf-success-icon" />
      </div>
      <h3 className="pf-success-title">Your Details Submitted Successfully!</h3>
      <p className="pf-success-text">
        Your ad campaign has been created. Our AI will now generate compelling ad copy and visuals for you.
      </p>
      <button
        type="button"
        className="pf-success-button"
        onClick={() => router.push('/ads-dashboard')}
      >
        Go to Dashboard <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

// Main ProductForm Component
export default function ProductForm(): React.JSX.Element {
  const router = useRouter();
  
  const steps: Step[] = [
    { label: "Product", component: ProductInfoStep, validationFields: ['productType', 'name'] },
    { label: "Description", component: DescriptionStep, validationFields: ['description'] },
    { label: "Audience", component: AudienceStep, validationFields: ['location'] },
    { label: "Review", component: ReviewStep, validationFields: ['termsAccepted'] },
    { label: "Complete", component: SuccessStep, validationFields: [] }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({
    productType: 'Product',
    category: 'Clothing'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState<"right" | "left">("right");

  const validateStep = (): boolean => {
    const currentValidationFields = steps[currentStep].validationFields;
    const newErrors: Record<string, string> = {};
    
    currentValidationFields.forEach(field => {
      // Special handling for checkbox
      if (field === 'termsAccepted') {
        if (formData[field] !== 'true') {
          newErrors[field] = 'You must accept the terms and conditions';
        }
      } else if (!formData[field] || !formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
      
      // Email validation (if needed in future)
      if (field === 'email' && formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle mutual exclusivity for price and priceMin/priceMax
    if (name === 'price' && value) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        priceMin: '', // Clear price range when price is entered
        priceMax: ''
      }));
    } else if ((name === 'priceMin' || name === 'priceMax') && value) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        price: '' // Clear price when price range is entered
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (validateStep()) {
        setDirection("right");
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection("left");
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setIsSubmitting(true);
      
      // Prepare data for backend API (matching model structure)
      const campaignData = {
        // Model Field Mappings (matching notebook model exactly):
        category: formData.category || 'Clothing',                    // → Category (fixed: "Clothing")
        user_description: `${formData.name || ''} - ${formData.description || ''}`, // → User_Description
        price: formData.price || null,                               // → Price (single price value)
        price_range: formData.priceMin && formData.priceMax 
          ? `${formData.priceMin}-${formData.priceMax}` 
          : null,                                                     // → Price_Range (format: "min-max")
        gender: formData.gender || 'Male',                           // → Gender (Male/Female/Transgender/Other)
        age_min: formData.ageMin ? parseInt(formData.ageMin) : 1,   // → Age_Min (default: 1)
        age_max: formData.ageMax ? parseInt(formData.ageMax) : 100, // → Age_Max (default: 100)
        locations: formData.location || '',                          // → Locations (comma-separated areas)
        target_audience: formData.target || '',                      // Custom field for audience targeting
        
        // Additional form data (not directly in model but needed for frontend display)
        name: formData.name,
        description: formData.description,
        priceMin: formData.priceMin,
        priceMax: formData.priceMax,
      };
      
      // Save to localStorage for dashboard display
      try {
        localStorage.setItem('adpatterns_last_payload', JSON.stringify(formData));
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }
      
      // TODO: Integrate with backend API
      // Example API call (uncomment when backend endpoint is ready):
      /*
      try {
        const response = await fetch(API_ENDPOINTS.campaigns.create, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add authorization header if needed
            // 'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(campaignData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to create campaign');
        }
        
        const result = await response.json();
        console.log('Campaign created:', result);
        
        // Navigate to success step
        setIsSubmitting(false);
        setDirection("right");
        setCurrentStep(steps.length - 1);
      } catch (error) {
        console.error('Error creating campaign:', error);
        setIsSubmitting(false);
        // Show error message to user
        alert('Failed to create campaign. Please try again.');
      }
      */
      
      // Temporary: Simulate API submission (REMOVE when backend is integrated)
      console.log('Campaign Data for Model:', campaignData);
      setTimeout(() => {
        setIsSubmitting(false);
        setDirection("right");
        setCurrentStep(steps.length - 1);
      }, 1500);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  // Animation variants
  const slideVariants = {
    hidden: (direction: "right" | "left") => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      }
    },
    exit: (direction: "right" | "left") => ({
      x: direction === "right" ? -100 : 100,
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      }
    })
  };

  return (
    <div className="pf-main-wrapper">
      <div className="pf-form-card">
        <div className="pf-form-header">
          <h2 className="pf-form-title">Create Your Ad Campaign</h2>
          <p className="pf-form-subtitle">Fill out the form below to get started with AI-powered advertising.</p>
          
          <ProgressSteps steps={steps} currentStep={currentStep} />
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="pf-form-body">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <CurrentStepComponent
                  formData={formData}
                  updateFormData={handleInputChange}
                  errors={errors}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {currentStep !== steps.length - 1 && (
            <div className="pf-form-footer">
              <button
                type="button"
                className={`pf-btn-secondary ${currentStep === 0 ? 'pf-btn-disabled' : ''}`}
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              
              {currentStep === steps.length - 2 ? (
                <button
                  type="submit"
                  className="pf-btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="pf-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="pf-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="pf-spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit & Continue'
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  className="pf-btn-primary"
                  onClick={handleNext}
                >
                  Next <FontAwesomeIcon icon={faArrowRight} />
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
