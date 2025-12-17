import React, { useState } from 'react';
import { STATES_DATA } from '../data/locationData';

const UserInputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    farmerName: '',
    state: '',
    zone: '',
    farmSize: 'Small'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-set zone when state changes
      if (name === 'state' && value) {
        const stateData = STATES_DATA[value];
        updated.zone = stateData ? stateData.defaultZone : '';
      }
      
      return updated;
    });
    
    // Clear error for this field
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.farmerName.trim()) {
      newErrors.farmerName = 'Farmer name is required';
    }
    
    if (!formData.state) {
      newErrors.state = 'Please select a state';
    }
    
    if (!formData.farmSize) {
      newErrors.farmSize = 'Please select farm size';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  const states = Object.keys(STATES_DATA).sort();
  const zones = formData.state ? STATES_DATA[formData.state].zones : [];

  return (
    <div className="input-form-container">
      <div className="form-header">
        <h2>🌾 Mkulima Smart Crop Advisory</h2>
        <p>Get AI-powered crop recommendations tailored to your farm</p>
      </div>
      
      <form onSubmit={handleSubmit} className="input-form">
        <div className="form-group">
          <label htmlFor="farmerName">
            Farmer Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="farmerName"
            name="farmerName"
            value={formData.farmerName}
            onChange={handleChange}
            placeholder="Enter your name"
            className={errors.farmerName ? 'error' : ''}
          />
          {errors.farmerName && <span className="error-message">{errors.farmerName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="state">
            State <span className="required">*</span>
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? 'error' : ''}
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <span className="error-message">{errors.state}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="zone">
            Agro-Ecological Zone <span className="auto-label">(Auto-mapped)</span>
          </label>
          <select
            id="zone"
            name="zone"
            value={formData.zone}
            onChange={handleChange}
            disabled={!formData.state}
          >
            <option value="">Auto-selected</option>
            {zones.map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
          <small className="help-text">
            Default zone selected based on your state. You can change if needed.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="farmSize">
            Farm Size <span className="required">*</span>
          </label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="farmSize"
                value="Small"
                checked={formData.farmSize === 'Small'}
                onChange={handleChange}
              />
              <span className="radio-label">
                <strong>Small</strong>
                <small>Less than 2 hectares</small>
              </span>
            </label>
            
            <label className="radio-option">
              <input
                type="radio"
                name="farmSize"
                value="Medium"
                checked={formData.farmSize === 'Medium'}
                onChange={handleChange}
              />
              <span className="radio-label">
                <strong>Medium</strong>
                <small>2-5 hectares</small>
              </span>
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Get Crop Recommendations
        </button>
      </form>

      <div className="info-note">
        <p>
          <strong>ℹ️ Note:</strong> Our AI system will automatically analyze soil type, 
          climate conditions, and market data based on your location to provide 
          personalized recommendations.
        </p>
      </div>
    </div>
  );
};

export default UserInputForm;
