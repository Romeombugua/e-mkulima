import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const RecommendationResults = ({ results }) => {
  const { t, language } = useLanguage();
  const {
    farmerName,
    location,
    topCrop,
    alternativeCrops,
    irrigationPlan,
    fertilizerPlan,
    marketAnalysis,
    climateWarnings
  } = results;

  return (
    <div className="results-container" key={language}>
      <LanguageToggle />
      {/* Header Section */}
      <div className="results-header">
        <h1>👋 {t('hello')}, {farmerName}!</h1>
        <h2>{t('yourRecommendation')}</h2>
        <div className="location-info">
          <span>📍 {t(location.state)} - {t(location.zone)}</span>
        </div>
      </div>

      {/* Climate Warnings */}
      {climateWarnings && climateWarnings.length > 0 && (
        <div className="climate-warnings">
          <div className="warning-icon">⚠️</div>
          <h3>{t('climateWarnings')}</h3>
          <ul>
            {climateWarnings.map((warning, idx) => (
              <li key={idx}>{t(warning.type)} {t(warning.risk)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Primary Recommendation */}
      <div className="primary-recommendation">
        <div className="crop-icon-large">🌾</div>
        <h2>{t('bestCropForYou')}</h2>
        <h3 className="crop-name">{t(topCrop.cropName)}</h3>
        
        <div className="crop-simple-details">
          <div className="simple-detail">
            <div className="detail-icon">⏱️</div>
            <div className="detail-content">
              <strong>{t('growingTime')}</strong>
              <span>{topCrop.growingPeriod} {t('days')}</span>
            </div>
          </div>
          
          <div className="simple-detail">
            <div className="detail-icon">📅</div>
            <div className="detail-content">
              <strong>{t('plantingTime')}</strong>
              <span>{t(topCrop.season)}</span>
            </div>
          </div>
          
          <div className="simple-detail">
            <div className="detail-icon">💧</div>
            <div className="detail-content">
              <strong>{t('waterNeeds')}</strong>
              <span>{t(topCrop.waterRequirement)}</span>
            </div>
          </div>
        </div>

        {/* Market Info */}
        <div className="market-simple">
          <h3>💰 {t('marketOpportunity')}</h3>
          <div className="market-badges">
            <div className="badge-large success">
              {t(marketAnalysis.marketOpportunity?.opportunity || 'Good')}
            </div>
            {marketAnalysis.marketOpportunity?.demandLevel === 'Very High' && (
              <div className="badge info">{t('goodDemand')}</div>
            )}
            {marketAnalysis.marketOpportunity?.marketAccess === 'Excellent' && (
              <div className="badge info">{t('easyToSell')}</div>
            )}
            {marketAnalysis.marketOpportunity?.storageLife?.includes('week') && (
              <div className="badge warning">{t('needsQuickSelling')}</div>
            )}
          </div>
          {marketAnalysis.marketOpportunity?.notes && (
            <p className="market-note">{t(marketAnalysis.marketOpportunity.notes)}</p>
          )}
        </div>
      </div>

      {/* What to Do Section */}
      <div className="action-guide">
        <h2>✅ {t('whatYouNeedToDo')}</h2>
        
        {/* Water Section */}
        <div className="guide-section">
          <div className="section-header">
            <span className="section-icon">💧</span>
            <h3>{t('waterYourCrop')}</h3>
          </div>
          
          <div className="guide-item">
            <strong>{t('howOften')}:</strong>
            <span>{t(irrigationPlan.frequency.frequency)}</span>
          </div>
          
          <div className="guide-item">
            <strong>{t('bestWay')}:</strong>
            <span>{t(irrigationPlan.method.method)}</span>
          </div>
          
          {irrigationPlan.criticalStages && irrigationPlan.criticalStages.length > 0 && (
            <div className="critical-stages-simple">
              <strong>{t('importantTimes')}:</strong>
              <ul>
                {irrigationPlan.criticalStages.slice(0, 3).map((stage, idx) => (
                  <li key={idx}>
                    {t(stage.stage)} ({stage.days})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Fertilizer Section */}
        <div className="guide-section">
          <div className="section-header">
            <span className="section-icon">🌱</span>
            <h3>{t('feedYourCrop')}</h3>
          </div>
          
          <div className="fertilizer-grid">
            {fertilizerPlan.recommendations.slice(0, 3).map((rec, idx) => (
              <div key={idx} className="fertilizer-simple">
                <strong>{t(rec.nutrient)}:</strong>
                <div className="fert-details">
                  <p><strong>{t('whatToUse')}:</strong> {rec.fertilizers.map(f => t(f)).join(', ')}</p>
                  <p><strong>{t('whenToApply')}:</strong> {t(rec.timing)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Advice */}
        {marketAnalysis.recommendations && marketAnalysis.recommendations.length > 0 && (
          <div className="guide-section">
            <div className="section-header">
              <span className="section-icon">💡</span>
              <h3>{t('marketAdvice')}</h3>
            </div>
            <ul className="advice-list">
              {marketAnalysis.recommendations.map((rec, idx) => (
                <li key={idx}>{t(rec)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Alternative Crops */}
      {alternativeCrops && alternativeCrops.length > 0 && (
        <div className="alternative-crops-simple">
          <h2>🌾 {t('otherGoodCrops')}</h2>
          <div className="crops-simple-grid">
            {alternativeCrops.map((crop, idx) => (
              <div key={idx} className="crop-simple-card">
                <div className="crop-icon">🌱</div>
                <h4>{t(crop.cropName)}</h4>
                <div className="suitability-simple">
                  {(crop.suitabilityScore * 100).toFixed(0)}% {t('suitable')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="action-buttons">
        <button onClick={() => {
          window.location.reload();
        }} className="btn-secondary btn-large">
          {t('startOver')}
        </button>
        <button onClick={() => window.print()} className="btn-primary btn-large">
          {t('print')}
        </button>
      </div>
    </div>
  );
};

export default RecommendationResults;
