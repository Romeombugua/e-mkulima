import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function LoadingScreen() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const steps = [
    { key: 'lookingAtSoil', icon: '🌱', delay: 0 },
    { key: 'checkingWeather', icon: '🌤️', delay: 300 },
    { key: 'findingCrops', icon: '🌾', delay: 600 },
    { key: 'checkingMarket', icon: '💰', delay: 900 },
    { key: 'creatingRecommendations', icon: '✨', delay: 1200 }
  ];

  useEffect(() => {
    // Animate through steps
    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
      }, step.delay);
    });

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="loading-container">
      {/* Animated Icon */}
      <div className="loading-icon-wrapper">
        <div className="loading-icon">🤖</div>
        <div className="loading-pulse"></div>
      </div>

      {/* Main Message */}
      <h2 className="loading-title">{t('thinkingAboutFarm')}</h2>
      <p className="loading-subtitle">{t('analyzingData')}</p>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          >
            <div className="progress-shine"></div>
          </div>
        </div>
        <div className="progress-text">{progress}%</div>
      </div>

      {/* Animated Steps */}
      <div className="loading-steps">
        {steps.map((step, index) => (
          <div 
            key={step.key}
            className={`loading-step ${index <= currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-content">
              <span className="step-text">{t(step.key)}</span>
              {index < currentStep && (
                <div className="step-check">✓</div>
              )}
              {index === currentStep && (
                <div className="step-dots">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="loading-particles">
        <div className="particle">🌾</div>
        <div className="particle">🌱</div>
        <div className="particle">💧</div>
        <div className="particle">☀️</div>
        <div className="particle">🍃</div>
      </div>
    </div>
  );
}

export default LoadingScreen;
