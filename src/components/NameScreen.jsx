import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

function NameScreen({ onNext, onBack, initialName = '' }) {
  const { t, language } = useLanguage();
  const [name, setName] = useState(initialName);
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = 50;

  const handleNext = () => {
    if (name.trim()) {
      onNext(name.trim());
    }
  };

  const handleClear = () => {
    setName('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && name.trim()) {
      handleNext();
    }
  };

  return (
    <div className="screen name-screen" key={language} role="main" aria-label="Enter your name">
      <LanguageToggle />
      <div className="progress-indicator" aria-label="Progress: Step 2 of 4">
        <div className="progress-steps">
          <div className="progress-step completed"></div>
          <div className="progress-step active"></div>
          <div className="progress-step"></div>
          <div className="progress-step"></div>
        </div>
        <span className="progress-text">2/4</span>
      </div>
      <div className="screen-content">
        <div className="icon" role="img" aria-label="User icon">👤</div>
        <h2>{t('whatIsYourName')}</h2>
        <p className="subtitle">{t('nameSubtitle')}</p>
        
        <div className="input-group">
          <div className={`input-wrapper ${isFocused ? 'focused' : ''} ${name.trim() ? 'has-value' : ''}`}>
            <input
              type="text"
              className="input-large"
              placeholder={t('enterYourName')}
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, maxLength))}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus
              aria-label={t('enterYourName')}
              aria-describedby="name-help char-count"
              maxLength={maxLength}
            />
            {name && (
              <button 
                className="input-clear" 
                onClick={handleClear}
                aria-label="Clear name"
                type="button"
              >
                ✕
              </button>
            )}
          </div>
          <div className="input-meta">
            <span id="name-help" className="help-text">👋 {t('nameHelp')}</span>
            <span id="char-count" className="char-count" aria-live="polite">
              {name.length}/{maxLength}
            </span>
          </div>
        </div>
        
        <div className="button-group">
          <button 
            className="btn-secondary" 
            onClick={onBack}
            aria-label="Go back to previous step"
          >
            <span className="btn-icon">←</span>
            <span>{t('back')}</span>
          </button>
          <button 
            className="btn-primary" 
            onClick={handleNext}
            disabled={!name.trim()}
            aria-label={`Next: Go to location selection`}
            aria-disabled={!name.trim()}
          >
            <span>{t('next')}</span>
            <span className="btn-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NameScreen;
