import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { STATES_DATA } from '../data/locationData';
import LanguageToggle from './LanguageToggle';

function LocationScreen({ onNext, onBack, initialState = '', initialZone = '' }) {
  const { t, language } = useLanguage();
  const [state, setState] = useState(initialState);
  const [zone, setZone] = useState(initialZone);

  const zones = state ? STATES_DATA[state]?.zones || [] : [];

  const handleNext = () => {
    if (state && zone) {
      onNext(state, zone);
    }
  };

  return (
    <div className="screen location-screen" key={language} role="main" aria-label="Select farm location">
      <LanguageToggle />
      <div className="progress-indicator" aria-label="Progress: Step 3 of 4">
        <div className="progress-steps">
          <div className="progress-step completed"></div>
          <div className="progress-step completed"></div>
          <div className="progress-step active"></div>
          <div className="progress-step"></div>
        </div>
        <span className="progress-text">3/4</span>
      </div>
      <div className="screen-content">
        <div className="icon" role="img" aria-label="Location pin icon">📍</div>
        <h2>{t('whereIsYourFarm')}</h2>
        <p className="subtitle">{t('locationSubtitle')}</p>
        
        <div className="input-group">
          <label htmlFor="state-select">{t('state')}</label>
          <div className={`select-wrapper ${state ? 'has-value' : ''}`}>
            <select
              id="state-select"
              className="input-large"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setZone('');
              }}
              aria-label={t('state')}
              aria-describedby="state-help"
            >
              <option value="">{t('chooseYourState')}</option>
              {Object.keys(STATES_DATA).map(stateKey => (
                <option key={stateKey} value={stateKey}>
                  {t(stateKey)}
                </option>
              ))}
            </select>
            {state && <span className="select-check">✓</span>}
          </div>
          <span id="state-help" className="help-text">🗺️ {t('stateHelp')}</span>
        </div>
        
        {state && (
          <div className="input-group animate-in">
            <label htmlFor="zone-select">{t('area')}</label>
            <div className={`select-wrapper ${zone ? 'has-value' : ''}`}>
              <select
                id="zone-select"
                className="input-large"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                aria-label={t('area')}
                aria-describedby="zone-help"
              >
                <option value="">{t('chooseYourArea')}</option>
                {zones.map(zoneKey => (
                  <option key={zoneKey} value={zoneKey}>
                    {t(zoneKey)}
                  </option>
                ))}
              </select>
              {zone && <span className="select-check">✓</span>}
            </div>
            <span id="zone-help" className="help-text">📌 {t('zoneHelp')}</span>
          </div>
        )}
        
        <div className="button-group">
          <button 
            className="btn-secondary" 
            onClick={onBack}
            aria-label="Go back to name entry"
          >
            <span className="btn-icon">←</span>
            <span>{t('back')}</span>
          </button>
          <button 
            className="btn-primary" 
            onClick={handleNext}
            disabled={!state || !zone}
            aria-label="Next: Select farm size"
            aria-disabled={!state || !zone}
          >
            <span>{t('next')}</span>
            <span className="btn-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocationScreen;
