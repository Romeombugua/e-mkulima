import React, { useState } from 'react';
import { useLanguage } from './contexts/LanguageContext';
import WelcomeScreen from './components/WelcomeScreen';
import NameScreen from './components/NameScreen';
import LocationScreen from './components/LocationScreen';
import FarmSizeScreen from './components/FarmSizeScreen';
import LoadingScreen from './components/LoadingScreen';
import RecommendationResults from './components/RecommendationResults';
import LocationIntelligence from './services/locationIntelligence';
import ModelSelector from './services/modelSelector';
import { IrrigationService, FertilizerService } from './services/recommendations';
import MarketAnalysisService from './services/marketAnalysis';
import { CROPS_DATABASE } from './data/cropsData';
import './App.css';

function App() {
  const { t } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [formData, setFormData] = useState({
    farmerName: '',
    state: '',
    zone: '',
    farmSize: ''
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const processRecommendations = (finalData) => {
    setLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Initialize location intelligence
      const locationIntel = new LocationIntelligence(
        finalData.state,
        finalData.zone
      );
      
      const locationSummary = locationIntel.getLocationSummary();
      
      // Initialize model selector and get recommendations
      const modelSelector = new ModelSelector(locationIntel, finalData.farmSize);
      const modelResults = modelSelector.getRecommendations(5);
      
      // Get top crop
      const topCropRec = modelResults.recommendations[0];
      const topCropKey = topCropRec.cropKey;
      const topCrop = CROPS_DATABASE[topCropKey];
      
      // Generate irrigation plan for top crop
      const irrigationService = new IrrigationService(locationIntel, topCrop);
      const irrigationPlan = irrigationService.generatePlan();
      
      // Generate fertilizer plan for top crop
      const fertilizerService = new FertilizerService(locationIntel, topCrop);
      const fertilizerPlan = fertilizerService.generatePlan();
      
      // Generate market analysis for top crop
      const marketService = new MarketAnalysisService(topCrop, locationIntel);
      const marketAnalysis = marketService.generateAnalysis();
      
      // Process alternative crops
      const alternativeCrops = modelResults.recommendations.slice(1, 4).map(rec => {
        const crop = CROPS_DATABASE[rec.cropKey];
        const marketServ = new MarketAnalysisService(crop, locationIntel);
        const market = marketServ.generateAnalysis();
        
        return {
          cropKey: rec.cropKey,
          cropName: rec.cropName,
          suitabilityScore: rec.suitabilityScore,
          yieldCategory: rec.yieldCategory || 'Good',
          marketRating: market.profitability.rating,
          riskLevel: market.risk.rating
        };
      });
      
      // Generate climate warnings
      const climateWarnings = [];
      if (locationSummary.climate?.riskFactors) {
        locationSummary.climate.riskFactors.forEach(risk => {
          if (['Extreme heat', 'Severe drought', 'Water scarcity'].includes(risk)) {
            climateWarnings.push({ type: 'watchOut', risk });
          } else {
            climateWarnings.push({ type: 'beAware', risk });
          }
        });
      }
      
      // Compile complete results
      const completeResults = {
        farmerName: finalData.farmerName,
        location: {
          state: finalData.state,
          zone: finalData.zone,
          soilProfile: locationSummary.soil,
          climateData: locationSummary.climate
        },
        modelInfo: {
          modelUsed: modelResults.modelUsed,
          modelJustification: modelResults.modelJustification,
          confidence: modelResults.confidence
        },
        topCrop: {
          ...topCrop,
          cropName: topCrop.name,
          suitabilityScore: topCropRec.suitabilityScore,
          yieldCategory: topCropRec.yieldCategory
        },
        alternativeCrops,
        irrigationPlan,
        fertilizerPlan,
        marketAnalysis,
        climateWarnings
      };
      
      setResults(completeResults);
      setLoading(false);
      setCurrentScreen('results');
    }, 1500);
  };

  const handleWelcomeNext = () => {
    setCurrentScreen('name');
  };

  const handleNameNext = (name) => {
    setFormData(prev => ({ ...prev, farmerName: name }));
    setCurrentScreen('location');
  };

  const handleLocationNext = (state, zone) => {
    setFormData(prev => ({ ...prev, state, zone }));
    setCurrentScreen('farmSize');
  };

  const handleFarmSizeNext = (size) => {
    const finalData = { ...formData, farmSize: size };
    setFormData(finalData);
    processRecommendations(finalData);
  };

  const handleBack = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="app">
      {currentScreen === 'welcome' && !loading && (
        <WelcomeScreen onNext={handleWelcomeNext} />
      )}
      
      {currentScreen === 'name' && !loading && (
        <NameScreen 
          onNext={handleNameNext} 
          onBack={() => handleBack('welcome')}
          initialName={formData.farmerName}
        />
      )}
      
      {currentScreen === 'location' && !loading && (
        <LocationScreen 
          onNext={handleLocationNext} 
          onBack={() => handleBack('name')}
          initialState={formData.state}
          initialZone={formData.zone}
        />
      )}
      
      {currentScreen === 'farmSize' && !loading && (
        <FarmSizeScreen 
          onNext={handleFarmSizeNext} 
          onBack={() => handleBack('location')}
          initialSize={formData.farmSize}
        />
      )}
      
      {loading && (
        <LoadingScreen />
      )}
      
      {currentScreen === 'results' && results && !loading && (
        <RecommendationResults results={results} />
      )}
    </div>
  );
}

export default App;
