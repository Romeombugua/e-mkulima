import ANNModel from './annModel';
import LightGBMModel from './lightgbmModel';

/**
 * Model Selector - Chooses best performing model
 * Compares ANN and LightGBM outputs and selects winner
 */
export class ModelSelector {
  constructor(locationIntelligence, farmSize) {
    this.location = locationIntelligence;
    this.farmSize = farmSize;
    this.annModel = new ANNModel(locationIntelligence, farmSize);
    this.lightgbmModel = new LightGBMModel(locationIntelligence, farmSize);
  }

  // Evaluate model performance based on location characteristics
  evaluateModelPerformance() {
    const scores = {
      ann: 0,
      lightgbm: 0
    };
    
    // Factor 1: Data completeness
    if (this.location.soilProfile && this.location.climateData) {
      scores.ann += 0.2; // ANN works well with complete data
      scores.lightgbm += 0.15;
    }
    
    // Factor 2: Climate risk
    const climateRisk = this.location.getClimateRiskLevel();
    if (climateRisk > 0.6) {
      scores.lightgbm += 0.25; // LightGBM better for high-risk areas
      scores.ann += 0.15;
    } else {
      scores.ann += 0.2;
      scores.lightgbm += 0.2;
    }
    
    // Factor 3: Soil complexity
    const soilType = this.location.soilProfile?.type || '';
    if (soilType.includes('Black') || soilType.includes('Alluvial')) {
      scores.ann += 0.25; // ANN better for complex soil types
      scores.lightgbm += 0.2;
    } else {
      scores.lightgbm += 0.25; // LightGBM better for varied soils
      scores.ann += 0.2;
    }
    
    // Factor 4: Water availability variance
    const waterScore = this.location.getWaterAvailabilityScore();
    if (waterScore < 0.4 || waterScore > 0.8) {
      scores.lightgbm += 0.2; // LightGBM handles extremes better
      scores.ann += 0.15;
    } else {
      scores.ann += 0.2;
      scores.lightgbm += 0.15;
    }
    
    // Factor 5: Zone characteristics
    const zone = this.location.zone;
    const complexZones = ['Western Ghats', 'Hill Zone', 'Coastal Zone', 'Terai'];
    if (complexZones.includes(zone)) {
      scores.ann += 0.2; // ANN for complex patterns
      scores.lightgbm += 0.15;
    } else {
      scores.lightgbm += 0.2; // LightGBM for standard zones
      scores.ann += 0.15;
    }
    
    return scores;
  }

  // Select best model
  selectBestModel() {
    const scores = this.evaluateModelPerformance();
    
    const selectedModel = scores.ann > scores.lightgbm ? 'ANN' : 'LightGBM';
    const confidence = Math.abs(scores.ann - scores.lightgbm);
    
    let justification = '';
    
    if (selectedModel === 'ANN') {
      justification = 'ANN model selected due to: ';
      const reasons = [];
      
      if (this.location.soilProfile?.type.includes('Black') || 
          this.location.soilProfile?.type.includes('Alluvial')) {
        reasons.push('complex soil profile');
      }
      
      const complexZones = ['Western Ghats', 'Hill Zone', 'Coastal Zone', 'Terai'];
      if (complexZones.includes(this.location.zone)) {
        reasons.push('complex agro-ecological zone');
      }
      
      if (reasons.length === 0) {
        reasons.push('optimal for current environmental conditions');
      }
      
      justification += reasons.join(', ');
    } else {
      justification = 'LightGBM model selected due to: ';
      const reasons = [];
      
      const climateRisk = this.location.getClimateRiskLevel();
      if (climateRisk > 0.6) {
        reasons.push('high climate risk requiring robust decision rules');
      }
      
      const waterScore = this.location.getWaterAvailabilityScore();
      if (waterScore < 0.4 || waterScore > 0.8) {
        reasons.push('extreme water availability conditions');
      }
      
      if (reasons.length === 0) {
        reasons.push('optimal decision tree logic for the region');
      }
      
      justification += reasons.join(', ');
    }
    
    return {
      selectedModel,
      confidence: (confidence * 100).toFixed(1),
      scores,
      justification
    };
  }

  // Get recommendations from selected model
  getRecommendations(topN = 5) {
    const selection = this.selectBestModel();
    
    let recommendations;
    if (selection.selectedModel === 'ANN') {
      recommendations = this.annModel.getTopRecommendations(topN);
    } else {
      recommendations = this.lightgbmModel.getTopRecommendations(topN);
    }
    
    return {
      modelUsed: selection.selectedModel,
      modelJustification: selection.justification,
      confidence: selection.confidence,
      recommendations
    };
  }

  // Get comparison of both models (for analysis)
  getModelComparison(topN = 3) {
    const annRecs = this.annModel.getTopRecommendations(topN);
    const lgbmRecs = this.lightgbmModel.getTopRecommendations(topN);
    const selection = this.selectBestModel();
    
    return {
      selection,
      ann: {
        model: 'ANN',
        recommendations: annRecs
      },
      lightgbm: {
        model: 'LightGBM',
        recommendations: lgbmRecs
      }
    };
  }
}

export default ModelSelector;
