import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

function WelcomeScreen({ onNext }) {
  const { t, language } = useLanguage();
  
  return (
    <div className="screen welcome-screen" key={language} role="main" aria-label={t('appName')}>
      <LanguageToggle />
      <div className="progress-indicator" aria-label="Progress: Step 1 of 4">
        <div className="progress-steps">
          <div className="progress-step active"></div>
          <div className="progress-step"></div>
          <div className="progress-step"></div>
          <div className="progress-step"></div>
        </div>
        <span className="progress-text">1/4</span>
      </div>
      <div className="screen-content">
        <img src="/mkulima%20logo.png" alt={t('appName')} className="app-logo" />
        <h1>{t('appName')}</h1>
        <h2>{t('appSubtitle')}</h2>
        <p className="welcome-description">
          {t('welcomeDescription')}
        </p>
        <button 
          className="btn-primary btn-large" 
          onClick={onNext}
          aria-label={`${t('getStarted')} - Go to step 2`}
        >
          <span>{t('getStarted')}</span>
          <span className="btn-icon">→</span>
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen;
