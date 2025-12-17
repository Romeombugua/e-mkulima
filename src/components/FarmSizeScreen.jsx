import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

function FarmSizeScreen({ onNext, onBack, initialSize = '' }) {
  const { t, language } = useLanguage();
  const [farmSize, setFarmSize] = useState(initialSize);

  const sizeOptions = [
    { value: 'very_small', labelKey: 'verySmall', descKey: 'verySmallDesc', icon: '🌱' },
    { value: 'small', labelKey: 'small', descKey: 'smallDesc', icon: '🌾' },
    { value: 'medium', labelKey: 'medium', descKey: 'mediumDesc', icon: '🚜' },
    { value: 'large', labelKey: 'large', descKey: 'largeDesc', icon: '🏞️' }
  ];

  const handleSelect = (size) => {
    setFarmSize(size);
    // Auto-proceed after a short delay for better UX
    setTimeout(() => {
      onNext(size);
    }, 300);
  };

  return (
    <div className="screen farm-size-screen" key={language} role="main" aria-label="Select farm size">
      <LanguageToggle />
      <div className="progress-indicator" aria-label="Progress: Step 4 of 4">
        <div className="progress-steps">
          <div className="progress-step completed"></div>
          <div className="progress-step completed"></div>
          <div className="progress-step completed"></div>
          <div className="progress-step active"></div>
        </div>
        <span className="progress-text">4/4</span>
      </div>
      <div className="screen-content">
        <div className="icon" role="img" aria-label="Farm icon">🏡</div>
        <h2>{t('howBigIsYourFarm')}</h2>
        <p className="subtitle">{t('farmSizeSubtitle')}</p>
        
        <div className="size-options" role="radiogroup" aria-label="Farm size options">
          {sizeOptions.map(option => (
            <button
              key={option.value}
              className={`size-option ${farmSize === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
              role="radio"
              aria-checked={farmSize === option.value}
              aria-label={`${t(option.labelKey)}: ${t(option.descKey)}`}
            >
              <div className="size-icon" role="img" aria-label={`${t(option.labelKey)} icon`}>{option.icon}</div>
              <div className="size-label">{t(option.labelKey)}</div>
              <div className="size-description">{t(option.descKey)}</div>
              {farmSize === option.value && <span className="selection-check">✓</span>}
            </button>
          ))}
        </div>
        
        <div className="button-group">
          <button 
            className="btn-secondary" 
            onClick={onBack}
            aria-label="Go back to location selection"
          >
            <span className="btn-icon">←</span>
            <span>{t('back')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FarmSizeScreen;
